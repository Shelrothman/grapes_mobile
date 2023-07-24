export type Grape = {
    item_id: number;
    creation_date: number;
    day: GrapeDayLetter[];
}

export type GrapeDayLetter = {
    letter: string;
    value: string;
}

/** resource type for updating a user grape's Letter */
export type RawGrapeDayLetter = {
    user_id: string;
} & GrapeDayLetter;

export type GlobalGrape = {
    // userName: string;
    user_name: string;
    letter: string;
    value: string;
}

/** resource type for inserting new Grape */
export type RawGlobalGrape = {
    user_id: string;
    g: string;
    r: string;
    a: string;
    p: string;
    e: string;
    s: string;
}

/** resource type on response for grape */
export type GrapeResponse = RawGlobalGrape & {
    created_at: string;
    grape_id: string;
};


/** resource type for inserting , id and created_at are system generated */
export type RawSharedLetter = {
    letter: string;
    value: string;
    user_name: string;
};


/** resource type on response */
export type SharedLetter = RawSharedLetter & {
    created_at: string | null;
    id: string;
};