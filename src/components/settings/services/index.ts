import { ApiError } from "@supabase/supabase-js";
import { supabase, User } from "../../../initSupabase";



export class AccountService {

    private changeEmail = async (emailVal: string) => {
        const { user, error } = await supabase.auth.update({
            email: emailVal,
        });
        if (error) console.log(error);
        return user;
    };

    private changePassword = async (passwordVal: string) => {
        const { user, error } = await supabase.auth.update({
            password: passwordVal, // will just keep the old one if unchanged
        });
        if (error) console.log(error);
        return user;
    };

    private changeDisplayName = async (displayVal: string) => {
        const { user, error } = await supabase.auth.update({
            data: { display_name: displayVal },
        });
        // if (error) console.log(error);
        if (error) return error;
        return user;
    };

    changeConfig = async (configVal: string = "", configKey: string): Promise<User | null | ApiError> => {
        // TODO: more reasons that the value is no good.. maybe not unique or too short.. etc
        if (configVal.length === 0) throw new Error("Cannot send an empty value"); 
        if (configVal === '********' && configKey === 'password') throw new Error("Password value not changed!");
        switch (configKey) {
            case "email":
                return await this.changeEmail(configVal);
            case "password":
                return await this.changePassword(configVal);
            case "display":
                return await this.changeDisplayName(configVal);
            default:
                return null;
        }
    };



}