import { AuthError, PostgrestError } from "@supabase/supabase-js";
import { supabase, User } from "../initSupabase";
import { GrapesUser } from "../types";
import { cleanStringNoExtraSpace } from "../utils";
/**
 * @class AccountService - services cruding the authenticated user's account configuration
 * ! to handle any errors in here, just throw an Error if there is one and then 
 * in the calling function, catch it and handle it there
 */

const TABLE_NAME = 'user_names';

export class AccountService {
    userNameTable: string;


    constructor() {
        this.userNameTable = TABLE_NAME;
        this.changeConfig = this.changeConfig.bind(this);
        this.changeDisplayName = this.changeDisplayName.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.changePassword = this.changePassword.bind(this);
    }

    private changeEmail = async (emailVal: string): Promise<User | AuthError | null> => {
        const {
            data: { user },
            error,
        } = await supabase.auth.updateUser({ email: emailVal })
        if (error) return error;
        return user;
    };

    private getTotalRows = async (): Promise<number> => {
        const { data, count } = await supabase
            .from(this.userNameTable)
            .select('*', { count: 'exact', head: true })
        return count ? count : 0;
    }

    private changePassword = async (passwordVal: string): Promise<User | AuthError | null> => {
        const {
            data: { user },
            error,
        } = await supabase.auth.updateUser({ password: passwordVal })
        if (error) return error;
        return user;
    };

    private changeDisplayName = async (displayVal: string): Promise<User | PostgrestError | null> => {
        const user_id = (await supabase.auth.getSession()).data.session?.user?.id;
        if (user_id) {
            const { data, error } = await supabase
                .from(this.userNameTable)
                .upsert({ id: user_id, user_name: displayVal })
                .select();
            if (error) return error;
            return data ? data[ 0 ] : null;
        }
        return null;
    };

    /** used during reset password */
    static getUserByEmail = async (email: string): Promise<GrapesUser | null | PostgrestError> => {
        const { data, error } = await supabase
            .from(TABLE_NAME)
            .select('*')
            .eq('email_val', email);
        if (error) return error;
        return data ? data[ 0 ] : null;
    };

    setUpNewUser = async (email: string, id: string): Promise<any> => {
        const count = await this.getTotalRows();
        const user_name = `user00g${count + 1}`;
        const { data, error } = await supabase.from(this.userNameTable)
            .insert({ id, user_name, email_val: email })
            .select();
        if (error) return error;
        return data ? data[ 0 ] : null;
    };


    changeConfig = async (configVal: string = "", configKey: string): Promise<User | null | AuthError | PostgrestError> => {
        try {
            if (configVal.length === 0) throw new Error("Cannot send an empty value");
            if (configVal === '********' && configKey === 'password') throw new Error("Password value not changed!");
            let retVal: User | null | AuthError | PostgrestError = null;
            switch (configKey) {
                case "email": retVal = await this.changeEmail(cleanStringNoExtraSpace(configVal));
                    break;
                case "password": retVal = await this.changePassword(cleanStringNoExtraSpace(configVal));
                    break;
                case "display": retVal = await this.changeDisplayName(cleanStringNoExtraSpace(configVal))
                    break;
            }
            return retVal;
        } catch (error: any) {
            console.error(error);
            throw new Error(error);
        }

    };



}