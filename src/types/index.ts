export type Grape = {
    item_id: number;
    creation_date: number;
    day: GrapeDayLetter[];
}

export type GrapeDayLetter = {
    letter: string;
    value: string;
}

export type GlobalGrape = {
    userName: string;
    letter: string;
    value: string;
}


/** resource type for inserting , id and created_at are system generated */
export type RawSharedLetter = {
    letter: string;
    /** user_id comes from auth user */
    user_id: string;
    value: string;
};


/** resource type on response */
export type SharedLetter = RawSharedLetter & {
    created_at: string | null;
    id: string;
};