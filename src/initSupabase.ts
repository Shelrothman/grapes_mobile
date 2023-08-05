import 'react-native-url-polyfill/auto'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User as userType, createClient } from "@supabase/supabase-js";


const public_url = "https://vvjtgmzgmrunbhvshgxy.supabase.co";
const public_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2anRnbXpnbXJ1bmJodnNoZ3h5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODgxNjIzNjUsImV4cCI6MjAwMzczODM2NX0.zVedsRhaxO2JKrP52Ng5UNPBdcVUlLUSOjhIW-yG0g8"


export const supabase = createClient(public_url, public_key, {
    auth: {
        storage: AsyncStorage,
        // below Prevents Supabase from evaluating window.location.href, breaking mobile
        detectSessionInUrl: false,
        persistSession: true,
        // autoRefreshToken: true,
    },
});

export type User = userType;