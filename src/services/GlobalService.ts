import { PostgrestError } from "@supabase/supabase-js";
import { supabase } from "../initSupabase";
import { RawSharedLetter, SharedLetter } from "../types";
import { cleanStringNoExtraSpace } from "../utils";

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
        this.getLastTenRows = this.getLastTenRows.bind(this);
        this.getAllRowsWithPagination = this.getAllRowsWithPagination.bind(this);
        this.addRow = this.addRow.bind(this);
    };

    private handleError(error: PostgrestError) {
        console.log(error);
        throw new Error(error.message);
    }

    getLastTenRows = async (): Promise<SharedLetter[] | null> => {
        const shared_letters = await this.getAllRowsWithPagination(10);
        return shared_letters ? shared_letters : null;
    };

    /**
     * @function getAllRowsWithPagination
     * @description get the first n amounts of rows from the table, most recent first
     * starting at the @param page
    */
    getAllRowsWithPagination = async (
        perPage: number,
        nextPage?: number
    ): Promise<SharedLetter[] | null> => {
        const startingRange = nextPage ? nextPage * perPage : 0;
        let { data: shared_letters, error } = await supabase
            .from(this.tableName)
            .select('*')
            .order('created_at', { ascending: false })
            .range(startingRange, startingRange + perPage - 1)
        if (error) this.handleError(error);
        return shared_letters ? shared_letters : null;
    };

    addRow = async (letterToShare: RawSharedLetter): Promise<SharedLetter | null> => {
        const cleanLetterToShare = {
            ...letterToShare,
            letter: cleanStringNoExtraSpace(letterToShare.letter),
        }
        
        const { data: shared_letter, error } = await supabase
            .from(this.tableName)
            .insert(cleanLetterToShare) 
            .select() // in v2 you have to select the new record
        if (error) this.handleError(error);
        return shared_letter ? shared_letter[ 0 ] : null;
    };

}