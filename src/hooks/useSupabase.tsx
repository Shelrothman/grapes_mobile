import { supabase } from "../initSupabase";




export function useSupabase() {

    const changeEmail = async (emailVal: string) => {
        const { user, error } = await supabase.auth.update({
            email: emailVal,
        });
        if (error) console.log(error);
        // console.log(user);
        return user;
    };

    const changePassword = async (passwordVal: string) => {
        const { user, error } = await supabase.auth.update({
            password: passwordVal, // will just keep the old one if unchanged
        });
        if (error) console.log(error);
        // console.log(user);
        return user;
    };

    const changeDisplayName = async (displayVal: string) => {
        const { user, error } = await supabase.auth.update({
            data: { display_name: displayVal },
        });
        if (error) console.log(error);
        // console.log(user);
        return user;
    };



    return {
        changeEmail,
        changePassword,
        changeDisplayName,
    } as const;
}

