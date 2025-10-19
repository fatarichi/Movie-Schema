// src/app/layout.tsx

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';
import {
  FavoritesProvider,
  ToastNotification,
} from '@/providers/FavoritesProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Movie | Challenge-9 | Fatar',
  description:
    'Movie adalah Platform untuk Anda dapat melihat rekomendasi dan rating Film',
  icons: {
    icon: '/images/MetaLogo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased max-w-7xl mx-auto`}
      >
        <FavoritesProvider>
          <Header />
          {children}
          <Footer />
          <ToastNotification />
        </FavoritesProvider>
      </body>
    </html>
  );
}
