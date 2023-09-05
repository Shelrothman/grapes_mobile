import { PostgrestError } from "@supabase/supabase-js";
import { supabase } from "../initSupabase";
import { GrapeResponse } from "../types";

const TABLE_NAME = 'user_grapes';


/**
 * @class HistoryService
 * services for history screens and children
 * responsible for cruding user history
 */
export class HistoryService {
    tableName: string;

    constructor() {
        this.tableName = TABLE_NAME;
        this.getGrapeByDate = this.getGrapeByDate.bind(this);
    };

    private handleError(error: PostgrestError) {
        console.error(error);
        throw new Error(error.message);
    }

    /**
     * @function getGrapeByDate
     * @description get a grape by date and user_id which are unique
     * @param {string} date
     * @returns {Promise<GrapeResponse|null>}
     **/
    async getGrapeByDate(date: string): Promise<GrapeResponse|null> {
        const user_id = (await supabase.auth.getSession()).data.session?.user?.id;
        const { data, error } = await supabase
            .from(this.tableName)
            .select('*')
            .match({ created_at: date, user_id: user_id })
        if (error) this.handleError(error);
        return data ? data[ 0 ] : null;
    };

}