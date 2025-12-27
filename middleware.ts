import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 1. Blocked Paths & Patterns
const BLOCKED_PATHS = [
  '/wp-admin', '/wordpress', '/wp-login.php', '/xmlrpc.php',
  '/.env', '/config', '/phpmyadmin', '/admin', '/server-status'
];

const BLOCKED_EXTENSIONS = ['.php'];
const BLOCKED_TRAVERSAL = ['..', '%2e%2e', '%2f', '//'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const ip = request.ip || '127.0.0.1';

  // A. Block scanner paths and patterns (Stateless)
  const isBlockedPath = BLOCKED_PATHS.some(path => pathname.startsWith(path));
  const isBlockedExtension = BLOCKED_EXTENSIONS.some(ext => pathname.endsWith(ext));
  const isBlockedTraversal = BLOCKED_TRAVERSAL.some(pattern => pathname.includes(pattern));

  if (isBlockedPath || isBlockedExtension || isBlockedTraversal) {
    console.log(`[BLOCKED PROBE] Path: ${pathname} | IP: ${ip} | UA: ${request.headers.get('user-agent')}`);
    return new NextResponse(null, { status: 410, statusText: 'Gone' });
  }

  // E. Bot Heuristics (Lightweight & Stateless)
  const ua = request.headers.get('user-agent');
  if (!ua || ua.length < 10) {
    // Basic bot check, don't block major search engines (already handled by common UAs)
    if (!ua?.toLowerCase().includes('googlebot') && !ua?.toLowerCase().includes('bingbot')) {
       return new NextResponse(null, { status: 403 });
    }
  }

  const response = NextResponse.next();

  // F. Security Headers (Stateless)
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://i.nostr.build; connect-src 'self' https://api.coingecko.com;");

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
