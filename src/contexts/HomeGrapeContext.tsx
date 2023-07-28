import { useContext, createContext, useState, useEffect } from 'react';
// import { HomeService } from '../services/HomeService';
// import { supabase } from '../initSupabase';


// import { useAuthContext } from './AuthProvider';
// import { defaultGrape } from '../utils/constants';
import { GrapeResponse } from '../types';

type ContextProps = {
    /** flag to show when to disable and hide the tab bar */
    homeSwipeEnabled: boolean;
    setHomeSwipeEnabled: React.Dispatch<React.SetStateAction<boolean>>;
    /** the grape for today for the user */
    // today_grape: Partial<GrapeResponse>;
    // setToday_grape: React.Dispatch<React.SetStateAction<Partial<GrapeResponse>>>;
};


const HomeGrapeContext = createContext<Partial<ContextProps>>({});

interface Props { children: React.ReactNode; }

export function useHomeGrapeContext() {
    return useContext(HomeGrapeContext);
}
// &* haveing a useEffect inside here is causing the db to create two rows for the same user on mount    na djust too many requests in general
export const HomeGrapeProvider = (props: Props) => {
    // const { sessionUser } = useAuthContext();
    const [ homeSwipeEnabled, setHomeSwipeEnabled ] = useState<boolean>(true);
    // const [ today_grape, setToday_grape ] = useState<Partial<GrapeResponse>>(defaultGrape);

    // // TODO figure out why this attempts to creates two rows in the db and not one
    // // * the db now has constraints to prevent this but it still shouldn't be happening

    // useEffect(() => {
    //     // console.log('useEffect in HomeGrapeProvider onMount');
    //     if (!sessionUser) return;
    //     HomeService.getOrCreateToday(sessionUser!.user_uid).then((res) => {
    //         if (res !== null) setToday_grape(res);
    //     }).catch((err) => {
    //         // console.error(err);
    //         // catching but not doing anything with it...
    //     });
    //     // return () => { // console.log('useEffect in HomeGrapeProvider onUnmount'); // }
    // }, [ sessionUser ]);

    // useEffect(() => {
    //     console.log('change to today_grape', today_grape)
    // }, [ today_grape ]);


    return (
        <HomeGrapeContext.Provider value={{ homeSwipeEnabled, setHomeSwipeEnabled }}>
            {props.children}
        </HomeGrapeContext.Provider>
    )
};