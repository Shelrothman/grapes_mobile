import { Grape } from "../types"


/**
 * @interface MyMap is a type that is a map of strings to strings
 * used to allow the key string to be used as a variable to find the value string
 */
export interface MyMap {
    [ key: string ]: string | undefined
}

export interface MyNumMap {
    [ key: string ]: number | undefined
}



export const GRAPE_DAY: MyMap = {
    g: 'entle with self',
    r: 'elaxation',
    a: 'ccomplishment',
    p: 'leasure',
    e: 'xercise',
    s: 'ocial Activity',
}

//user_id,created_at,g,r,a,p,e,s,grape_id
// e66d98fc-a039-4997-883f-447f66fd9754,2023-07-26,an activity that provides self-care for me,a relaxing and calming activity,some thing that give me a sense of accomplishment,a pleasurable activity that's just for fun,some activity involving exercise and movement,call mom,77af7a95-f9ef-4b6f-a642-31fcadf2ee78

/** default Grape object */
export const defaultGrape = {
    g: 'an activity that provides self-care for me',
    r: 'a relaxing and calming activity',
    a: 'some thing that give me a sense of accomplishment',
    p: 'a pleasurable activity that\'s just for fun',
    e: 'some activity involving exercise and movement',
    s: 'a social activity involving other people'
}

/* default graoe object for the UI rendering */
export const defaultGrape_UI: Grape = {
    grape_id: '',
    creation_date: '',
    day: Object.entries(defaultGrape).map(([ letter, value ]) => ({ letter, value }))
}