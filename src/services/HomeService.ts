import { PostgrestError } from "@supabase/supabase-js";
import { supabase } from "../initSupabase";
import { RawGlobalGrape, GrapeResponse, RawGrapeDayLetter } from "../types";
import { getUTCDate } from "../utils";
import { cleanStringNoExtraSpace } from "../utils";

/**
 * @class HomeService
 * services for the home screen and children
 * handles all the crud for the user_grapes table
 */
export class HomeService {
    tableName: string;

    constructor() {
        this.tableName = 'user_grapes';
        this.doesRowExist = this.doesRowExist.bind(this);
        this.getRow = this.getRow.bind(this);
        this.addRow = this.addRow.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
        this.updateLetter = this.updateLetter.bind(this);
        this.upsertRow = this.upsertRow.bind(this);
    };

    private handleError(error: Partial<PostgrestError>) {
        console.log(error);
        throw new Error(error.message);
    }

    private doesRowExist = async (user_id: string, utc_today: string): Promise<boolean> => {
        const { data, error } = await supabase
            .from(this.tableName)
            .select('created_at')
            .match({ user_id: user_id, created_at: utc_today })
        if (error) this.handleError(error);
        if (data) return data.length > 0 ? true : false;
        return false;
    }

    private getRow = async (user_id: string, created_at: string): Promise<GrapeResponse | null> => {
        const { data, error } = await supabase
            .from(this.tableName)
            .select('*')
            .match({ user_id, created_at })
        if (error) this.handleError(error);
        return data ? data[ 0 ] : null;
    };

    private addRow = async (grape: Partial<GrapeResponse>): Promise<GrapeResponse | null> => {
        const { data, error } = await supabase
            .from(this.tableName)
            .insert(grape) 
            .select() // in v2 you have to select the new record
        if (error) this.handleError(error);
        return data ? data[ 0 ] : null;
    };

    updateLetter = async ({ letter, value, user_id }: RawGrapeDayLetter): Promise<GrapeResponse | null> => {
        const trimmedValue = cleanStringNoExtraSpace(value);
        const data = await this.upsertRow({ [ letter ]: trimmedValue, user_id });
        return data ? data : null;
    }

    deleteRow = async (user_id: string, created_at: string): Promise<GrapeResponse | null> => {
        const { data, error } = await supabase
            .from(this.tableName)
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
            .from(this.tableName)
            .update(partialGrape)
            .match({ user_id: partialGrape.user_id, created_at: getUTCDate() })
            .select()
        if (error) this.handleError(error);
        return data ? data[ 0 ] : null;
    }

    static getOrCreateToday = async (user_id: string): Promise<GrapeResponse | null> => {
        let resVal: GrapeResponse | null = null;
        try {
            const homeService = new HomeService();
            const today = getUTCDate();
            const existence = await homeService.doesRowExist(user_id, today);
            // console.log('existence of todays grape', existence);
            if (existence) {
                resVal = await homeService.getRow(user_id, today);
            } else {
                // console.log("existence," , existence)
                resVal = await homeService.addRow({ user_id, created_at: today });
            }
        } catch (error) {
            // this should really only catch if duplcation is attempted but we catch to be sure
            // console.error(error);
        }
        return resVal;
    }

}