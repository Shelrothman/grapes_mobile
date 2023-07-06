export type Grape = {
    item_id: number;
    creation_date: number;
    day: GrapeDayLetter[];
}

export type GrapeDayLetter = {
    letter: string;
    value: string;
}

// export type GrapeLetter = {
//     letter: string;
//     value: string;
// }