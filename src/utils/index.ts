/**
 * @fileoverview miscellanious utility functions
 */

import { Grape, GrapeDayLetter, GrapeResponse } from "../types";


export function getUTCDate() {
    const now = new Date();
    const year = now.getUTCFullYear();
    const month = String(now.getUTCMonth() + 1).padStart(2, '0');
    const day = String(now.getUTCDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

const avoidArray = [ 'grape_id', 'user_id', 'created_at' ];

export const resToGrape = (res: Partial<GrapeResponse>): Grape => {
    let dayArray: any[] = Object.entries(res).map(([ key, value ]) => {
        if (avoidArray.includes(key)) return;
        return { letter: key, value: value as string };
    }).filter((item) => item !== undefined);
    return {
        grape_id: res.grape_id!,
        day: dayArray as GrapeDayLetter[],
        creation_date: res.created_at!,
    }
};


/**
 * 
 * @param id {number} 
 * @returns {Grape}
 */
// export function getGrapeById(id: number): Grape | undefined {
//     return grapes.items.find(grape => grape.item_id === id);
// }
// * yea lets just always let them edit bc dealing with time is a pain unnessesarily
// export function isGrapeToday(grape: Grape): boolean {
//     const today = new Date();
//     const todayString = today.toDateString();
//     const grapeDate = new Date(grape.creation_date);
//     const grapeDateString = grapeDate.toDateString();
//     return todayString === grapeDateString;
// }
