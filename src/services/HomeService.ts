import { PostgrestError } from "@supabase/supabase-js";
import { supabase } from "../initSupabase";
import { GlobalGrape, RawGlobalGrape, GrapeResponse, RawGrapeDayLetter } from "../types";
import { getUTCDate } from "../utils";

// * i cuuuud just useGlobalService and like make it agnostic to the table name
// * but i think i like the idea of having a service for each table
// it wouldnt slow anything down bc import statements are cached and just need one service at a time

/**
 * @class HomeService
 * services for the home screen and children
 * handles all the crud for the user_grapes table
 */
export class HomeService {

    private handleError(error: PostgrestError) {
        console.log(error);
        throw new Error(error.message);
    }

    // private doesRowExist = async (user_id: string, created_at: string): Promise<boolean> => {
    //     const data = await this.getRow(user_id, created_at);
    //     return data ? true : false;
    // }

    private doesRowExist = async (user_id: string, utc_today: string): Promise<boolean> => {
        const { data, error } = await supabase
            .from('user_grapes')
            .select('created_at')
            .match({ user_id, created_at: utc_today })
        if (error) this.handleError(error);
        return data ? true : false;
    }


    getRow = async (user_id: string, created_at: string): Promise<GrapeResponse | null> => {
        const { data, error } = await supabase
            .from('user_grapes')
            .select('*')
            .match({ user_id, created_at })
        if (error) this.handleError(error);
        return data ? data[ 0 ] : null;
    };

    addRow = async (grape: Partial<RawGlobalGrape>): Promise<GrapeResponse | null> => {
        const { data, error } = await supabase
            .from('user_grapes')
            .insert(grape) // by default in v1 the new record is returned
        if (error) this.handleError(error);
        return data ? data[ 0 ] : null;
    };

    updateRow = async (grape: RawGlobalGrape): Promise<GrapeResponse | null> => {
        const { data, error } = await supabase
            .from('user_grapes')
            .update(grape)
            .match({ user_id: grape.user_id })
        if (error) this.handleError(error);
        return data ? data[ 0 ] : null;
    };

    updateLetter = async ({ letter, value, user_id }: RawGrapeDayLetter): Promise<GrapeResponse | null> => {
        const data = await this.upsertRow({ [ letter ]: value, user_id });
        // if (error) this.handleError(error);
        return data ? data : null;
    }

    deleteRow = async (user_id: string, created_at: string): Promise<GrapeResponse | null> => {
        const { data, error } = await supabase
            .from('user_grapes')
            .delete()
            .match({ user_id, created_at })
        if (error) this.handleError(error);
        return data ? data[ 0 ] : null;
    }

    /** 
     * @function upsertRow
     * @description inserts a row if it doesnt exist, updates it if it does
     */
    upsertRow = async (partialGrape: Partial<RawGlobalGrape>): Promise<GrapeResponse | null> => {
        // const row = await this.getRow(grape.user_id, grape.created_at);
        // return row ? this.updateRow(grape) : this.addRow(grape);


        const { data, error } = await supabase
            .from('user_grapes')
            .upsert(partialGrape)
        if (error) this.handleError(error);
        return data ? data[ 0 ] : null;
    }


    static getOrCreateToday = async (user_id: string): Promise<GrapeResponse | null> => {
        let resVal: GrapeResponse | null = null;
        const homeService = new HomeService();
        const today = getUTCDate();
        const existence = await homeService.doesRowExist(user_id, today);
        console.log('existence of todays grape', existence);
        if (existence) {
            resVal = await homeService.getRow(user_id, today);
        } else {
            resVal = await homeService.addRow({ user_id, });
        }
        return resVal;
    }

}