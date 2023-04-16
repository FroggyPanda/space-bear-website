import { createClient } from '@supabase/supabase-js';
import { Database } from './schema';

if (!process.env.SUPABASE_URL) throw new Error('Could not get Supabase URL');
if (!process.env.SUPABASE_ANON_KEY)
  throw new Error('Could not get Supabase Key');

export const supabase = createClient<Database>(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);
