import { PostgrestError } from "@supabase/supabase-js";
import { supabase } from "../../../initSupabase";
import { RawSharedLetter, SharedLetter } from "../../../types";







/**
 * @class GlobalService
 * services for cruding the global shared_letters table
 * to handle any errors in here, just throw an Error if there is one and then 
 * in the calling function, catch it and handle it there
 */
export class GlobalService {

    private handleError(error: PostgrestError) {
        console.log(error);
        throw new Error(error.message);
    }

    // ! PU here
    private getUserNameFromId = async (user_id: string): Promise<string> => {
        // const { data: users, error } = await supabase.auth.u
        
        // if (error) this.handleError(error);
        // if (user) return user[0].username;
        return '';
    }

    getAllRows = async (): Promise<SharedLetter[] | null> => {
        let { data: shared_letters, error } = await supabase
            .from('shared_letters')
            .select('*')
        if (error) this.handleError(error);
        return shared_letters;
    };


    /** could use this for like the infinite scroll */
    getAllRowsWithPagination = async (page: number, perPage: number): Promise<SharedLetter[] | null> => {
        let { data: shared_letters, error } = await supabase
            .from('shared_letters')
            .select('*')
            .range(page * perPage, (page + 1) * perPage - 1)
        if (error) this.handleError(error);
        // TODO this needs testing and error handling and shiz
        return shared_letters;
    };

    getRowByUser = async (user_id: string) => {
        let { data: shared_letter, error } = await supabase
            .from('shared_letters')
            .select('*')
            .eq('user_id', user_id)
        if (error) this.handleError(error);
        return shared_letter;
    }

    addRow = async (letterToShare: RawSharedLetter): Promise<SharedLetter | null> => {
        const { data: shared_letter, error } = await supabase
            .from('shared_letters')
            .insert(letterToShare) // by default in v1 the new record is returned
        if (error) this.handleError(error);
        // if (shared_letter) return shared_letter[0];
        if (shared_letter) return shared_letter[ 0 ];
        return null;
    };

    updateRow = async (letterToUpdate: SharedLetter): Promise<SharedLetter | null> => {
        const { data: shared_letter, error } = await supabase
            .from('shared_letters')
            .upsert(letterToUpdate); // by default in v1 the updated record is returned
        // .select() <= need v2 to do this. and it would return it
        if (error) this.handleError(error);
        if (shared_letter) return shared_letter[ 0 ];
        return null;
    }

    // TODO bulk updates?


    // TODO delete row?

}