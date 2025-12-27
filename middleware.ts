import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 1. Blocked Paths & Patterns
const BLOCKED_PATHS = [
  '/wp-admin', '/wordpress', '/wp-login.php', '/xmlrpc.php',
  '/.env', '/config', '/phpmyadmin', '/admin', '/server-status'
];

const BLOCKED_EXTENSIONS = ['.php'];
const BLOCKED_TRAVERSAL = ['..', '%2e%2e', '%2f', '//'];

// 2. Rate Limiting Configuration (In-memory for stateless-like behavior in middleware)
// In a real production environment with multiple instances, use Redis or a similar store.
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const GLOBAL_LIMIT = 120;
const EXPENSIVE_LIMIT = 10;
const ipCache = new Map<string, { count: number; lastReset: number }>();

function getRateLimit(ip: string, isExpensive: boolean) {
  const now = Date.now();
  const limit = isExpensive ? EXPENSIVE_LIMIT : GLOBAL_LIMIT;
  const record = ipCache.get(ip) || { count: 0, lastReset: now };

  if (now - record.lastReset > RATE_LIMIT_WINDOW) {
    record.count = 1;
    record.lastReset = now;
  } else {
    record.count++;
  }
  
  ipCache.set(ip, record);
  return record.count <= limit;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const ip = request.ip || '127.0.0.1';

  // A. Block scanner paths and patterns
  const isBlockedPath = BLOCKED_PATHS.some(path => pathname.startsWith(path));
  const isBlockedExtension = BLOCKED_EXTENSIONS.some(ext => pathname.endsWith(ext));
  const isBlockedTraversal = BLOCKED_TRAVERSAL.some(pattern => pathname.includes(pattern));

  if (isBlockedPath || isBlockedExtension || isBlockedTraversal) {
    console.log(`[BLOCKED PROBE] Path: ${pathname} | IP: ${ip} | UA: ${request.headers.get('user-agent')}`);
    return new NextResponse(null, { status: 410, statusText: 'Gone' });
  }

  // B & C. Rate Limiting
  const isExpensive = pathname.startsWith('/api') || pathname === '/';
  if (!getRateLimit(ip, isExpensive)) {
    console.log(`[RATE LIMIT] Path: ${pathname} | IP: ${ip}`);
    if (request.headers.get('accept')?.includes('application/json')) {
      return NextResponse.json({ error: 'Too Many Requests' }, { status: 429 });
    }
    return new NextResponse('<h1>429 Too Many Requests</h1>', { 
      status: 429, 
      headers: { 'Content-Type': 'text/html' } 
    });
  }

  // E. Bot Heuristics (Lightweight)
  const ua = request.headers.get('user-agent');
  if (!ua || ua.length < 10) {
    // Basic bot check, don't block major search engines (already handled by common UAs)
    if (!ua?.toLowerCase().includes('googlebot') && !ua?.toLowerCase().includes('bingbot')) {
       return new NextResponse(null, { status: 403 });
    }
  }

  const response = NextResponse.next();

  // F. Security Headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://i.nostr.build; connect-src 'self' https://api.coingecko.com;");

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
