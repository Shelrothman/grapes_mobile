export type Grape = {
    item_id: number;
    creation_date: number;
    day: GrapeDay[];
}

export type GrapeDay = {
    letter: string;
    value: string;
}