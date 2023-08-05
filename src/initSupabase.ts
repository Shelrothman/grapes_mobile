import AsyncStorage from "@react-native-async-storage/async-storage";
import { User as userType, createClient } from "@supabase/supabase-js";


// console.log(process.env)
// const SUPABASE_URL = process.env.SUPABASE_URL || process.env.EXPO_PUBLIC_SUPABASE_URL || '';
// const SUPABASE_KEY = process.env.SUPABASE_KEY || process.env.EXPO_PUBLIC_SUPABASE_KEY || '';

const public_url = "https://vvjtgmzgmrunbhvshgxy.supabase.co";
const public_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2anRnbXpnbXJ1bmJodnNoZ3h5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODgxNjIzNjUsImV4cCI6MjAwMzczODM2NX0.zVedsRhaxO2JKrP52Ng5UNPBdcVUlLUSOjhIW-yG0g8"


export const supabase = createClient(public_url, public_key, {
    auth: {
        storage: AsyncStorage,
        // below Prevents Supabase from evaluating window.location.href, breaking mobile
        detectSessionInUrl: false,
    },
});

export type User = userType;