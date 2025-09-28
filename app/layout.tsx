import type { Metadata } from "next";
import { Inter } from "next/font/google";
import './globals.css';
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ultimate Mortgage Calculator',
  description: 'An advanced open-source mortgage calculator app built with Next.js. Estimate monthly payments, compare scenarios, and visualize your mortgage details.',
  keywords: 'mortgage calculator, loan calculator, financial planning, Next.js app',
  authors: [{ name: 'Your Name', url: 'https://yourwebsite.com' }],
  openGraph: {
    title: 'Ultimate Mortgage Calculator',
    description: 'Advanced mortgage calculations and visualizations',
    url: 'https://your-app-url.com',
    siteName: 'Ultimate Mortgage Calculator',
    images: [
      {
        url: 'https://your-app-url.com/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ultimate Mortgage Calculator',
    description: 'Advanced mortgage calculations and visualizations',
    creator: '@yourtwitterhandle',
    images: ['https://your-app-url.com/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}