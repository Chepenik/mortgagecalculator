import type { Metadata } from "next";
import { Inter } from "next/font/google";
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mortgage Calculator App',
  description:
    'An open-source mortgage calculator app built with Next.js to estimate monthly payments based on loan amount, interest rate, and term.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}