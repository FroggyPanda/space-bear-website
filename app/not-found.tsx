import Image from 'next/image';
import sbCry from '../public/sbCry.png';

export default function NotFound() {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="t-7 text-center min-w-fit min-h-fit bg-neutral-900 p-5 rounded-lg">
        <div className="mt-7 flex flex-row justify-center items-center">
          <Image className="max-w-[5rem]" src={sbCry} alt="" />
          <p className="text-7xl font-bold">404</p>
        </div>
        <p className="mt-7">Page not found</p>
      </div>
    </div>
  );
}
