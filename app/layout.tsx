import type { Metadata } from "next";
import { Inter } from "next/font/google";
import './globals.css';
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sound Money Mortgage | Free Bitcoin-Integrated Mortgage Calculator',
  description: 'Sound Money Mortgage - The elite free mortgage calculator with Bitcoin insights, amortization schedules, payment breakdowns, and advanced financial visualizations. Make smarter home financing decisions aligned with sound money principles.',
  keywords: 'mortgage calculator, bitcoin mortgage, sound money, free mortgage calculator, best mortgage calculator, loan calculator, amortization schedule, monthly payment calculator, mortgage payment calculator, home loan calculator, interest calculator, financial planning, bitcoin',
  authors: [{ name: 'Conor Chepenik', url: 'https://soundmoneymortgage.com' }],
  creator: 'Conor Chepenik',
  metadataBase: new URL('https://soundmoneymortgage.com'),
  alternates: {
    canonical: 'https://soundmoneymortgage.com',
  },
  openGraph: {
    title: 'Sound Money Mortgage | Elite Home Loan Analysis',
    description: 'Calculate mortgage payments with Bitcoin insights. Visualize amortization, compare scenarios, and make smarter financial decisions with Sound Money Mortgage.',
    url: 'https://soundmoneymortgage.com',
    siteName: 'Sound Money Mortgage',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: 'https://i.nostr.build/FJegWmejLseJPFC6.png',
        width: 1200,
        height: 630,
        alt: 'Sound Money Mortgage - Bitcoin vs Home Equity Wealth Comparison',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sound Money Mortgage | Bitcoin-Integrated Calculator',
    description: 'The elite free mortgage calculator with Bitcoin insights and advanced financial analysis',
    creator: '@conorchepenik',
    images: ['https://i.nostr.build/FJegWmejLseJPFC6.png'],
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
  verification: {
    google: 'google-site-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Sound Money Mortgage',
    description: 'Elite free mortgage calculator with Bitcoin insights, amortization schedules, payment analysis, and financial visualizations',
    url: 'https://soundmoneymortgage.com',
    applicationCategory: 'FinanceApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      ratingCount: '100',
    },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          key="structured-data"
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}