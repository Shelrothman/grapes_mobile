import AsyncStorage from "@react-native-async-storage/async-storage";
import { SupabaseClient, createClient } from "@supabase/supabase-js";
import { config } from "./config";


//TODO Better put your these secret keys in .env file
const SUPABASE_URL = config.supabase_url
const SUPABASE_KEY = config.supabase_key;



export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
    localStorage: AsyncStorage as any,
    // below Prevents Supabase from evaluating window.location.href, breaking mobile
    detectSessionInUrl: false 
});
