import Link from 'next/link';
import { Poppins } from 'next/font/google';
import Logo from './Logo';
import './globals.css';

export const metadata = {
  title: 'Space Bear',
};

const poppins = Poppins({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} bg-neutral-800 text-white min-h-screen`}>
        <header className="bg-neutral-900/50 backdrop-blur-md sticky top-0 z-50">
          <nav className="container m-auto p-8 flex justify-between text-2xl items-center h-8">
            <Link href="/" className="flex items-center">
              <Logo className="mr-1 w-full" />
              Space Bear
            </Link>
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
            </ul>
          </nav>
        </header>
        <main className="container m-auto h-full">{children}</main>
        <footer className="container m-auto flex justify-end p-2">
          <p>
            Made with 💜 by{' '}
            <a
              className="underline"
              href="http://github.com/FroggyPanda"
              target="_blank"
              rel="noopener noreferrer">
              Panda
            </a>
          </p>
        </footer>
      </body>
    </html>
  );
}

