/**
 * MyGrapeContext.tsx
 * Context for the individual grape at hand for the user to edit/view/share
 * in grape_id route
 */
import { useContext, createContext, ReactNode, useState, useEffect } from 'react';
import { Grape, GrapeDayLetter } from "../types";


type MyGrapeProviderProps = {
    children: ReactNode;
};

type MyGrapeContextType = {
    /** set the provided letter to the provided value */
    setMyGrapeLetter: ({ letter, value }: GrapeDayLetter) => void;
    
    /** currentGrape that is being viewed/edited */
    currentGrape_id: number|null;
    /** setCurrentGrapeDate sets the date of the grape that is currently being viewed/edited */
    setCurrentGrape_id: React.Dispatch<React.SetStateAction<number|null>>;
    
    /** current letter that is being edited */
    // currentLetter_edit: GrapeDayLetter|null;
    /** setCurrentLetter_edit sets the current letter that is being edited */
    // setCurrentLetter_edit: React.Dispatch<React.SetStateAction<GrapeDayLetter|null>>;
    /** grape_g is the value of the gentle with self letter */
    grape_g: string;
    setGrape_g: React.Dispatch<React.SetStateAction<string>>;
    /** grape_r is the value of the relaxation letter */
    grape_r: string;
    setGrape_r: React.Dispatch<React.SetStateAction<string>>;
    /** grape_a is the value of the accomplishment letter */
    grape_a: string;
    setGrape_a: React.Dispatch<React.SetStateAction<string>>;
    /** grape_p is the value of the pleasure letter */
    grape_p: string;
    setGrape_p: React.Dispatch<React.SetStateAction<string>>;
    /** grape_e is the value of the exercise letter */
    grape_e: string;
    setGrape_e: React.Dispatch<React.SetStateAction<string>>;
    /** grape_s is the value of the social activity letter */
    grape_s: string;
    setGrape_s: React.Dispatch<React.SetStateAction<string>>;
};

const MyGrapeContext = createContext({} as MyGrapeContextType);

export function useMyGrapeContext() {
    return useContext(MyGrapeContext);
}

//? do i want it to all be one object instead.. no i dont think so bc lie iw wanna be able to listen to indiviual letters

export function MyGrapeProvider({ children }: MyGrapeProviderProps) {
    // const [ currentGrapeDate, setCurrentGrapeDate ] = useState<number>(0);

    const [ currentGrape_id, setCurrentGrape_id ] = useState<number|null>(null);
    const [ currentLetter_edit, setCurrentLetter_edit ] = useState<GrapeDayLetter|null>(null);


    const [ grape_g, setGrape_g ] = useState<string>('new self-care');
    const [ grape_r, setGrape_r ] = useState<string>('default relaxation');
    const [ grape_a, setGrape_a ] = useState<string>('default accomplishment');
    const [ grape_p, setGrape_p ] = useState<string>('default pleasure');
    const [ grape_e, setGrape_e ] = useState<string>('default exercise');
    const [ grape_s, setGrape_s ] = useState<string>('default social activity');


    // useEffect(() => {
    //     console.log('currentLetter_edit', currentLetter_edit);
    // }, [ currentLetter_edit ]);


    function setMyGrapeLetter({ letter, value }: GrapeDayLetter) {
        const _letter = letter.toLowerCase();
        switch (_letter) {
            case 'g': setGrape_g(value); break;
            case 'r': setGrape_r(value); break;
            case 'a': setGrape_a(value); break;
            case 'p': setGrape_p(value); break;
            case 'e': setGrape_e(value); break;
            case 's': setGrape_s(value); break;
            default: break;
        }
    }


    return (
        <MyGrapeContext.Provider value={{
            // currentGrapeDate,
            // setCurrentGrapeDate,
            // currentLetter_edit, // ! we handle this locally in the MyGrapeLetter component
            // setCurrentLetter_edit,
            currentGrape_id,
            setCurrentGrape_id,
            setMyGrapeLetter,
            grape_g,
            setGrape_g,
            grape_r,
            setGrape_r,
            grape_a,
            setGrape_a,
            grape_p,
            setGrape_p,
            grape_e,
            setGrape_e,
            grape_s,
            setGrape_s,
        }}>
            {children}
        </MyGrapeContext.Provider>
    )
}