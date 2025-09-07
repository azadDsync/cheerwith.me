import type { Metadata } from "next";
import "./globals.css";
import { Cabin_Sketch } from 'next/font/google';
import ContentProtection from '@/components/ContentProtection';

const cabinSketch = Cabin_Sketch({
  weight: ['700'],  
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Cheer With Me - Digital Greenboard for All Celebrations | School Spirit",
  description: "Celebrate everything the school way! Birthdays, festivals, achievements, and special moments with interactive digital greenboard celebrations. Relive the joy of school celebrations with confetti, music, and heartfelt messages.",
  keywords: "school celebrations, birthday celebration, festival wishes, digital greenboard, school memories, interactive celebration, student birthdays, teacher appreciation, national festivals, school spirit, doodle celebrations",
  authors: [{ name: "Cheer With Me" }],
  creator: "Cheer With Me",
  publisher: "Cheer With Me",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://cheerwith.me'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Cheer With Me - Digital Greenboard for All Celebrations",
    description: "Celebrate everything the school way! Birthdays, festivals, achievements with interactive digital greenboard celebrations just like we used to do in school.",
    url: 'https://cheerwith.me',
    siteName: 'Cheer With Me',
    images: [
      {
        url: '/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'Cheer With Me - Digital Greenboard Celebrations',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Cheer With Me - Digital Greenboard Celebrations",
    description: "Celebrate everything the school way! Interactive digital celebrations for birthdays, festivals, and special moments.",
    images: ['/images/logo.png'],
    creator: '@cheerwithme',
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
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/favicon.ico',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="referrer" content="no-referrer" />
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" href="/sound/happy-teacher-day.mp3" as="audio" />
        <link rel="preload" href="/sound/Voicy_Celebration sound effect.mp3" as="audio" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Cheer With Me",
              "description": "Digital greenboard celebration platform for all occasions - birthdays, festivals, achievements, and special moments",
              "url": "https://cheerwith.me",
              "applicationCategory": "Entertainment",
              "audience": {
                "@type": "Audience",
                "audienceType": "Students, Teachers, Educational Community"
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://cheerwith.me/?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>
      <body className={cabinSketch.className}>
        {/* <ContentProtection /> */}
        {children}
      </body>
    </html>
  );
}
