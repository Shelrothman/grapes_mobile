import { PostgrestError } from "@supabase/supabase-js";
import { supabase } from "../initSupabase";
import { RawSharedLetter, SharedLetter } from "../types";

const TABLE_NAME = 'shared_letters';
/**
 * @class GlobalService
 * services for cruding the global shared_letters table
 * to handle any errors in here, just throw an Error if there is one and then 
 * in the calling function, catch it and handle it there
 */
export class GlobalService {
    tableName: string;

    constructor() {
        this.tableName = TABLE_NAME;
        this.getAllRows = this.getAllRows.bind(this);
        this.addRow = this.addRow.bind(this);
        this.updateRow = this.updateRow.bind(this);
    };


    private handleError(error: PostgrestError) {
        console.log(error);
        throw new Error(error.message);
    }

    getAllRows = async (): Promise<SharedLetter[] | null> => {
        let { data: shared_letters, error } = await supabase
            .from(this.tableName)
            .select('*')
            .order('created_at', { ascending: false })
        if (error) this.handleError(error);
        return shared_letters;
    };

    getLastTenRows = async (): Promise<SharedLetter[] | null> => {
        const shared_letters = await this.getAllRowsWithPagination(10);
        return shared_letters;
    };


    /**
     * @function getAllRowsWithPagination
     * @description get the first n amounts of rows from the table, most recent first
     * when it is called again, it will get the next n rows, and so on
     * starting at the @param page
    */
    getAllRowsWithPagination = async (
        perPage: number,
        nextPage?: number
    ): Promise<SharedLetter[] | null> => {
        // if (nextPage) alert(nextPage)
        // fnjkajkasdhjkASDKLAHd baf
        const startingRange = nextPage ? nextPage * perPage : 0;
        let { data: shared_letters, error } = await supabase
            .from(this.tableName)
            .select('*')
            .order('created_at', { ascending: false })
            // .range(0, 10) 
            .range(startingRange, startingRange + perPage - 1)
        if (error) this.handleError(error);
        // TODO this needs testing and error handling and shiz
        return shared_letters;
    };

    getRowByUser = async (user_id: string) => {
        let { data: shared_letter, error } = await supabase
            .from(this.tableName)
            .select('*')
            .eq('user_id', user_id)
        if (error) this.handleError(error);
        return shared_letter;
    }

    addRow = async (letterToShare: RawSharedLetter): Promise<SharedLetter | null> => {
        const { data: shared_letter, error } = await supabase
            .from(this.tableName)
            .insert(letterToShare) // by default in v1 the new record is returned
        if (error) this.handleError(error);
        if (shared_letter) return shared_letter[ 0 ];
        return null;
    };

    updateRow = async (letterToUpdate: SharedLetter): Promise<SharedLetter | null> => {
        const { data: shared_letter, error } = await supabase
            .from(this.tableName)
            .upsert(letterToUpdate); // by default in v1 the updated record is returned
        // .select() <= need v2 to do this. and it would return it
        if (error) this.handleError(error);
        if (shared_letter) return shared_letter[ 0 ];
        return null;
    }



    // TODO bulk updates?


    // TODO delete row?

}