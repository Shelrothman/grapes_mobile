import AsyncStorage from "@react-native-async-storage/async-storage";
import { User as userType, createClient } from "@supabase/supabase-js";



const SUPABASE_URL = process.env.SUPABASE_URL || require("../config").supabase_url;
const SUPABASE_KEY = process.env.SUPABASE_KEY || require("../config").supabase_key;



export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
    auth: {
        storage: AsyncStorage,
        // below Prevents Supabase from evaluating window.location.href, breaking mobile
        detectSessionInUrl: false,
    },
});

export type User = userType;