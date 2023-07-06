/**
 * mostly temporary utility functions
 * for development with dummy data
 *
 */

import { Grape, GrapeDayLetter } from '../types';
import * as grapes from '../data/dummyGrapes.json';



/**
 * 
 * @param id {number} 
 * @returns {Grape}
 */
export function getGrapeById(id: number): Grape | undefined {
    return grapes.items.find(grape => grape.item_id === id);
}
// * yea lets just always let them edit bc dealing with time is a pain unnessesarily
// export function isGrapeToday(grape: Grape): boolean {
//     const today = new Date();
//     const todayString = today.toDateString();
//     const grapeDate = new Date(grape.creation_date);
//     const grapeDateString = grapeDate.toDateString();
//     return todayString === grapeDateString;
// }