import Image from 'next/image';
import sbWave from '../public/sbWave.png';

export default function Logo({ className }: { className?: string }) {
  if (className) {
    return (
      <Image className={`max-w-[2rem] ${className}`} src={sbWave} alt="" />
    );
  }

  return <Image className="max-w-[2rem]" src={sbWave} alt="" />;
}
