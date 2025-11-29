import type { Metadata } from "next";
import { Inter } from "next/font/google";
import './globals.css';
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Free Mortgage Calculator | Elite Home Loan Analysis',
  description: 'The elite free mortgage calculator featuring amortization schedules, payment breakdowns, Bitcoin insights, and advanced financial visualizations. Make smarter mortgage decisions.',
  keywords: 'mortgage calculator, free mortgage calculator, best mortgage calculator, loan calculator, amortization schedule, monthly payment calculator, mortgage payment calculator, home loan calculator, interest calculator, financial planning, bitcoin mortgage',
  authors: [{ name: 'Conor Chepenik', url: 'https://github.com/conorchepenik' }],
  creator: 'Conor Chepenik',
  metadataBase: new URL('https://mortgagecalculator.replit.dev'),
  alternates: {
    canonical: 'https://mortgagecalculator.replit.dev',
  },
  openGraph: {
    title: 'Free Mortgage Calculator | Detailed Payment Analysis',
    description: 'Calculate mortgage payments, visualize amortization, compare scenarios, and make smarter financial decisions with our free online mortgage calculator.',
    url: 'https://mortgagecalculator.replit.dev',
    siteName: 'Ultimate Mortgage Calculator',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Mortgage Calculator | Payment & Interest Analysis',
    description: 'Free online mortgage calculator with detailed amortization schedules and financial visualizations',
    creator: '@conorchepenik',
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
    name: 'Ultimate Mortgage Calculator',
    description: 'Free online mortgage calculator with detailed amortization schedules, payment analysis, and financial visualizations',
    applicationCategory: 'FinanceApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      ratingCount: '10',
    },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
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