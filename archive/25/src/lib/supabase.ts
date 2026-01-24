import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Event {
  start: string;
  end: string;
  name: string;
  description: string;
  location: string;
  type: string;
}