import { useContext, createContext, useState, useEffect } from 'react';
import { HomeService } from '../services/HomeService';
import { useAuthContext } from './AuthProvider';
// import { getUTCDate } from '../utils';
import { defaultGrape } from '../utils/constants';
import { GrapeResponse } from '../types';
// import Home from '../components/my/Home';

type ContextProps = {
    /** flag to show when to disable and hide the tab bar */
    homeSwipeEnabled: boolean;
    setHomeSwipeEnabled: React.Dispatch<React.SetStateAction<boolean>>;
    // setHomeSwipeEnabled: (enabled: boolean) => void;
    /** unique identifier for todays grape */
    // todaysGrape_id: string;

    today_grape: GrapeResponse;
    setToday_grape: React.Dispatch<React.SetStateAction<GrapeResponse>>;
};


const HomeGrapeContext = createContext<Partial<ContextProps>>({});

interface Props { children: React.ReactNode; }

export function useHomeGrapeContext() {
    return useContext(HomeGrapeContext);
}


export const HomeGrapeProvider = (props: Props) => {
    // const homeService = new HomeService();
    const { sessionUser, session } = useAuthContext();
    const [ homeSwipeEnabled, setHomeSwipeEnabled ] = useState<boolean>(true);

    const [ today_grape, setToday_grape ] = useState<Partial<GrapeResponse>>(defaultGrape);

    // new grape at the start of the app... the app needs to either grab the existing one or create a new one... 
    // const [ todaysGrape_id, setTodaysGrape_id ] = useState<string>('');


    // todays date in the format of 2021-08-01
    // bc supabase uses UTC
    // so lets make it UTC also bc uts is the same everywhere so if checking for it here or there to compare to sb it will all be the same bc its UTC
    // const todaysDate = new Date().toISOString().split('T')[0];


    useEffect(() => {
        console.log('useEffect in HomeGrapeProvider onMount');
        if (!sessionUser) return;
        HomeService.getOrCreateToday(sessionUser!.user_uid).then((res) => {
            if (res) setToday_grape(res);
        }).catch((err) => {
            console.error(err);
            setToday_grape(defaultGrape);
        });
        // return () => { // console.log('useEffect in HomeGrapeProvider onUnmount'); // }
    }, [ sessionUser]);


    useEffect(() => {
        console.log('change to today_grape', today_grape);
    }, [ today_grape ]);



    return (
        <HomeGrapeContext.Provider value={{ homeSwipeEnabled, setHomeSwipeEnabled }}>
            {props.children}
        </HomeGrapeContext.Provider>
    )
};