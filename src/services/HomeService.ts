import { PostgrestError } from "@supabase/supabase-js";
import { supabase } from "../initSupabase";
import { RawGlobalGrape, GrapeResponse, RawGrapeDayLetter } from "../types";
import { getUTCDate } from "../utils";
import useCachedResources from "react-native-rapi-ui/hooks/useCachedResources";
// TODO some caching would be helpful here


// * i cuuuud just useGlobalService and like make it agnostic to the table name
// * but i think i like the idea of having a service for each table

// ? I do wonder.. should i get all my logic and helpers like this into a grpahql server? and just hit those endpoints in the lightwight client?...

/**
 * @class HomeService
 * services for the home screen and children
 * handles all the crud for the user_grapes table
 */
export class HomeService {

    private handleError(error: Partial<PostgrestError>) {
        console.log(error);
        throw new Error(error.message);
    }

    private doesRowExist = async (user_id: string, utc_today: string): Promise<boolean> => {
        const { data, error } = await supabase
            .from('user_grapes')
            .select('created_at')
            .match({ user_id: user_id, created_at: utc_today })
        if (error) this.handleError(error);
        if (data) return data.length > 0 ? true : false;
        return false;
    }

    private getRow = async (user_id: string, created_at: string): Promise<GrapeResponse | null> => {
        const { data, error } = await supabase
            .from('user_grapes')
            .select('*')
            .match({ user_id, created_at })
        if (error) this.handleError(error);
        return data ? data[ 0 ] : null;
    };

    // private getRowByGrapeId = async (grape_id: string): Promise<GrapeResponse | null> => {
    //     const { data, error } = await supabase
    //         .from('user_grapes')
    //         .select('*')
    //         .match({ grape_id })
    //     if (error) this.handleError(error);
    //     return data ? data[ 0 ] : null;
    // };

    private addRow = async (grape: Partial<GrapeResponse>): Promise<GrapeResponse | null> => {
        const { data, error } = await supabase
            .from('user_grapes')
            .insert(grape) // by default in v1 the new record is returned
        if (error) this.handleError(error);
        return data ? data[ 0 ] : null;
    };

    // private updateRow = async (grape: RawGlobalGrape): Promise<GrapeResponse | null> => {
    //     const { data, error } = await supabase
    //         .from('user_grapes')
    //         .update(grape)
    //         .match({ user_id: grape.user_id })
    //     if (error) this.handleError(error);
    //     return data ? data[ 0 ] : null;
    // };

    updateLetter = async ({ letter, value, user_id }: RawGrapeDayLetter): Promise<GrapeResponse | null> => {
        const data = await this.upsertRow({ [ letter ]: value, user_id });
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
    private upsertRow = async (partialGrape: Partial<RawGlobalGrape>): Promise<GrapeResponse | null> => {
        if (!partialGrape.user_id) this.handleError({ message: 'user_id is required' });
        const existence = await this.doesRowExist(partialGrape.user_id!, getUTCDate());
        if (!existence) {
            return await this.addRow({ ...partialGrape, created_at: getUTCDate() });
        }
        const { data, error } = await supabase
            .from('user_grapes')
            .update(partialGrape)
            .match({ user_id: partialGrape.user_id, created_at: getUTCDate() })
        if (error) this.handleError(error);
        return data ? data[ 0 ] : null;
    }


    static getOrCreateToday = async (user_id: string): Promise<GrapeResponse | null> => {
        let resVal: GrapeResponse | null = null;
        try {
            const homeService = new HomeService();
            const today = getUTCDate();
            const existence = await homeService.doesRowExist(user_id, today);
            console.log('existence of todays grape', existence);
            if (existence) {
                resVal = await homeService.getRow(user_id, today);
            } else {
                resVal = await homeService.addRow({ user_id, created_at: today });
            }
        } catch (error) {
            // this should really only catch if duplcation is attempted but we catch to be sure
        }
        return resVal;
    }

}