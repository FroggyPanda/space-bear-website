import Image from 'next/image';
import { Inter } from 'next/font/google';
import Logo from './Logo';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <h1 className="flex justify-center items-center h-full text-4xl lg:text-6xl">
      <Logo className="mr-5 !max-w-[8rem]" />
      Space Bear
    </h1>
  );
}

