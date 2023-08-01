import { useContext, createContext, useState } from 'react';

type ContextProps = {
    /** flag to show when to disable and hide the tab bar */
    tabBarEnabled: boolean;
    setTabBarEnabled: React.Dispatch<React.SetStateAction<boolean>>;
};


const HomeGrapeContext = createContext<Partial<ContextProps>>({});

interface Props { children: React.ReactNode; }

export function useHomeGrapeContext() {
    return useContext(HomeGrapeContext);
}
// &* haveing a useEffect inside here is causing the db to create two rows for the same user on mount    na djust too many requests in general
export const HomeGrapeProvider = (props: Props) => {
    // const { sessionUser } = useAuthContext();
    const [ tabBarEnabled, setTabBarEnabled ] = useState<boolean>(true);
    // const [ today_grape, setToday_grape ] = useState<Partial<GrapeResponse>>(defaultGrape);


    return (
        <HomeGrapeContext.Provider value={{ tabBarEnabled: tabBarEnabled, setTabBarEnabled: setTabBarEnabled }}>
            {props.children}
        </HomeGrapeContext.Provider>
    )
};