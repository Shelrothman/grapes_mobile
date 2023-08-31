/**
 * @fileoverview miscellanious utility functions
 */

import { Grape, GrapeDayLetter, GrapeResponse, Home_Grape } from "../types";
import Toast from 'react-native-toast-message';
import * as Clipboard from 'expo-clipboard';
import { getCalendars } from 'expo-localization';
export type dateTitleProps = {
    year: number;
    month: number;
    day: number;
};

export const copyToClipboard = async (text: string) => {
    await Clipboard.setStringAsync(text);
    Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Copied Text to Clipboard!',
        visibilityTime: 2000,
    });
};

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

export const resToHomeGrape = (res: Partial<GrapeResponse>): Home_Grape => {
    let dayArray: any[] = Object.entries(res).map(([ key, value ]) => {
        if (avoidArray.includes(key)) return;
        return { [ key ]: value }
    }).filter((item) => item !== undefined);

    return dayArray.reduce((acc, curr) => {
        return { ...acc, ...curr, }
    });
};

/**
 * @function buildDateArray
 * @description builds an array of dates from today to the past 2 weeks
 * @returns {string[]} array of dates in the format YYYY-MM-DD in UTC
 * * it takes here the utc date as thats whats in the db to identidy them and they get converted to local time in their components
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


/**
 * @function isCloseToBottom
 * @description checks if the user is close to the bottom of the scrollview
 * @returns {boolean}
 */
export const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }: any): boolean => {
    const paddingToBottom = 40; // the higher this number the sooner to the bottom it will trigger
    return layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom;
};


export const cleanStringNoExtraSpace = (str: string) => str.replace(/\s{2,}/, '').trim()

/**
 * @function getDayIndex
 *  calculates the day of the week using the Zeller's Congruence algorithm.
 * @param {dateTitleProps} { year, month, day }
 */
const getDayIndex = ({ year, month, day }: dateTitleProps) => {
    return (year + Math.floor(year / 4) - Math.floor(year / 100) + Math.floor(year / 400) + Math.floor((13 * month + 8) / 5) + day) % 7;
}


export function getLocalDateForTitle(date?: string) {
    if (date) return formatDateToTitle(new Date(date).toLocaleString('en-US', { timeZone: getCalendars()[ 0 ].timeZone! }));
    return formatDateToTitle(new Date().toLocaleString('en-US', { timeZone: getCalendars()[ 0 ].timeZone! }));
}



/**
 * format local date for title
 *  this version avoids using any Date object instantiation and 
 
 * @link https://www.geeksforgeeks.org/zellers-congruence-find-day-date/
 */
function formatDateToTitle(inputDate: string) {
    const daysOfWeek = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ];
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const [ month, day, year ] = inputDate.split('/').map(part => parseInt(part, 10));
    const dayOfWeekIndex = getDayIndex({ year, month, day })
    const dayOfWeek = daysOfWeek[ dayOfWeekIndex ];
    const formattedDate = `${dayOfWeek}, ${day} ${months[ month - 1 ]} ${year}`;
    return formattedDate;
}