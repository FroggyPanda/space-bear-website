import './globals.css';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';

import { Poppins } from 'next/font/google';
import Logo from '@/components/logo';

const poppins = Poppins({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Space Bear',
  description: 'Space Bear! The offical bot of Saviors',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} grid min-h-[100dvh] min-h-[100vh] grid-rows-1a1 bg-base-100 text-white`}>
        <nav className="navbar sticky top-0 z-50 bg-base-200/50 p-8 backdrop-blur-md lg:text-2xl">
          <div className="container mx-auto">
            <div className="flex-1">
              <Link href="/" className="flex items-center">
                <Logo />
                Space Bear
              </Link>
            </div>
            <div className="flex-none">
              <Link href="/">Home</Link>
            </div>
          </div>
        </nav>
        <main className="container m-auto h-full">{children}</main>
        <footer className="container m-auto flex justify-end p-2">
          <p>
            Made with 💜 by{' '}
            <Link
              className="underline"
              href="http://github.com/FroggyPanda"
              target="_blank">
              Panda
            </Link>
          </p>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
