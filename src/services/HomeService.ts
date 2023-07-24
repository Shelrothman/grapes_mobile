import { PostgrestError } from "@supabase/supabase-js";
import { supabase } from "../initSupabase";
import { GlobalGrape, RawGlobalGrape, GrapeResponse, RawGrapeDayLetter } from "../types";


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


    // ! PU in heree.. bring in to BottomEditContainer and stuff and get it working


    addRow = async (grape: RawGlobalGrape): Promise<GrapeResponse | null> => {
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
        const { data, error } = await supabase
            .from('user_grapes')
            .update({ [ letter ]: value })
            .match({ user_id })
        if (error) this.handleError(error);
        return data ? data[ 0 ] : null;
    }

    deleteRow = async (user_id: string, created_at: string): Promise<GrapeResponse | null> => {
        const { data, error } = await supabase
            .from('user_grapes')
            .delete()
            .match({ user_id, created_at })
        if (error) this.handleError(error);
        return data ? data[ 0 ] : null;
    }

}