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


    return (
        <HomeGrapeContext.Provider value={{ homeSwipeEnabled, setHomeSwipeEnabled }}>
            {props.children}
        </HomeGrapeContext.Provider>
    )
};