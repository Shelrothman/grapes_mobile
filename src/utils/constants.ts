

/**
 * @interface MyMap is a type that is a map of strings to strings
 * used to allow the key string to be used as a variable to find the value string
 */
export interface MyMap {
    [ key: string ]: string | undefined
}



export const GRAPE_DAY: MyMap = {
    g: 'entle with self',
    r: 'elaxation',
    a: 'ccomplishment',
    p: 'leasure',
    e: 'xercise',
    s: 'ocial Activity',
}
