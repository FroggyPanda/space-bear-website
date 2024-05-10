import Logo from '@/components/logo';
import { supabase } from '@/lib/supabase';

export default async function Home() {
  const res = await supabase.from('member').select();

  return (
    <div className="flex h-full items-center justify-center">
      <Logo className="mr-5 !max-w-[8rem]" />
      <h1 className="text-4xl lg:text-6xl">Space Bear</h1>
    </div>
  );
}
