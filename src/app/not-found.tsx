import Image from 'next/image';
import sbCry from '@/../public/sbCry.png';

export default function NotFound() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="t-7 min-h-fit min-w-fit rounded-lg bg-base-300 p-5 text-center">
        <div className="mt-7 flex flex-row items-center justify-center">
          <Image className="max-w-[5rem]" src={sbCry} alt="" />
          <p className="text-7xl font-bold">404</p>
        </div>
        <p className="mt-7">Page not found</p>
      </div>
    </div>
  );
}
