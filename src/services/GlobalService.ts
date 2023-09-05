import { PostgrestError } from "@supabase/supabase-js";
import { supabase } from "../initSupabase";
import { RawSharedLetter, SharedLetter, SharedLetterUI } from "../types";
import { cleanStringNoExtraSpace } from "../utils";

const TABLE_NAME = 'shared_letters';

type addRowParams = {
    letterString: string;
    letterValue: string;
    user_id: string;
};

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
        this.handleError = this.handleError.bind(this);
        this.convertRowsToUI = this.convertRowsToUI.bind(this);
        this.getLetterFromInt = this.getLetterFromInt.bind(this);
        this.getIntFromLetter = this.getIntFromLetter.bind(this);
        this.getTotalRows = this.getTotalRows.bind(this);
    };

    getTotalRows = async (): Promise<number> => {
        const { data, count } = await supabase
            .from(this.tableName)
            .select('*', { count: 'exact', head: true })
        return count ? count : 0;
    }

    private handleError(error: PostgrestError) {
        console.error(error);
        throw new Error(error.message);
    }

    getLastTenRows = async (): Promise<SharedLetterUI[] | null> => {
        const shared_letters = await this.getAllRowsWithPagination(10);
        return shared_letters ? shared_letters : null;
    };

    /**
     * @function getAllRowsWithPagination
     * @description get the first n amounts of rows from the table, most recent first
     * starting at the @param page
    */
    getAllRowsWithPagination = async (perPage: number, nextPage?: number): Promise<SharedLetterUI[] | null> => {
        const startingRange = nextPage ? nextPage * perPage : 0;
        let { data: shared_letters, error } = await supabase
            .from(this.tableName)
            .select('*')
            .order('created_at', { ascending: false })
            .range(startingRange, startingRange + perPage - 1)
        // console.log('shared_letters', shared_letters);
        if (!shared_letters || shared_letters.length < 1) return null;
        if (error) this.handleError(error);
        const shared_letters_with_user_names = await this.convertRowsToUI(shared_letters);
        return shared_letters_with_user_names;
    };



    addRow = async ({ letterString, letterValue, user_id }: addRowParams): Promise<SharedLetter | null> => {
        const cleanLetterToShare = {
            user_id: user_id,
            value: cleanStringNoExtraSpace(letterValue),
            letter_int: this.getIntFromLetter(letterString),
        };
        const { data: shared_letter, error } = await supabase
            .from(this.tableName)
            .insert(cleanLetterToShare)
            .select() // in v2 you have to select the new record
        if (error) this.handleError(error);
        return shared_letter ? shared_letter[ 0 ] : null;
    };

    /**
     * @method getUserNameForRows
     * @description get the user_name for each row in the array of shared_letters
     * @param shared_letters
     * @returns the same array of shared_letters but with the user_name added to each row
     */
    private convertRowsToUI = async (shared_letters: SharedLetter[]): Promise<SharedLetterUI[]> => {
        const user_ids = shared_letters.map((letter) => letter.user_id);
        const { data: user_names, error } = await supabase
            .from('user_names')
            .select('*')
            .in('id', user_ids);
        if (error) this.handleError(error);
        return shared_letters.map((sharedLetterRow) => {
            const letterString = this.getLetterFromInt(sharedLetterRow.letter_int);
            if (!user_names || user_names.length < 1) {
                return { ...sharedLetterRow, letter: letterString, user_name: 'unknown' };
            }
            const _user = user_names.find((name) => name.id === sharedLetterRow.user_id);
            if (!_user || !_user.user_name || _user.user_name.length < 1) {
                return { ...sharedLetterRow, letter: letterString, user_name: 'unknown' };
            }
            return { ...sharedLetterRow, letter: letterString, user_name: _user.user_name };
        });
    };

    private getLetterFromInt = (letterInt: number): string => {
        switch (letterInt) {
            case 1: return 'g';
            case 2: return 'r';
            case 3: return 'a';
            case 4: return 'p';
            case 5: return 'e';
            case 6: return 's';
            default: return '';
        }
    };

    private getIntFromLetter = (letter: string): number => {
        const _letter = letter.toLowerCase();
        switch (_letter) {
            case 'g': return 1;
            case 'r': return 2;
            case 'a': return 3;
            case 'p': return 4;
            case 'e': return 5;
            case 's': return 6;
            default: return 0;
        }
    }


}