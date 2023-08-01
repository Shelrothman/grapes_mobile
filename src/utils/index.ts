/**
 * @fileoverview miscellanious utility functions
 */

import { Grape, GrapeDayLetter, GrapeResponse } from "../types";


export function getUTCDate(next?: string) {
    const now = !next ? new Date() : new Date(next);
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
 * @function buildDateArray
 * @description builds an array of dates from today to the past 2 weeks
 * @returns {string[]} array of dates in the format YYYY-MM-DD in UTC
 */
export function buildDateArray(next?: string): string[] {
    let dateArray: string[] = [];
    // let startDay = new Date();
    const startDay = !next ? new Date() : new Date(next);
    for (let i = 0; i < 15; i++) {
        let date = getUTCDate(startDay.toISOString());
        if (startDay === new Date() && i === 0) continue; // skip today if on today 
        if (i !== 0) dateArray.push(date); // skip today if on next
        startDay.setDate(startDay.getDate() - 1);
    }
    return dateArray;
}