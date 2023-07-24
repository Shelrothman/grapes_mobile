import { useContext, createContext, useState } from 'react';


type ContextProps = {
    /** flag to show when to disable and hide the tab bar */
    homeSwipeEnabled: boolean;
    setHomeSwipeEnabled: React.Dispatch<React.SetStateAction<boolean>>;
    // setHomeSwipeEnabled: (enabled: boolean) => void;
};


const HomeGrapeContext = createContext<Partial<ContextProps>>({});

interface Props { children: React.ReactNode; }

export function useHomeGrapeContext() {
    return useContext(HomeGrapeContext);
}


export const HomeGrapeProvider = (props: Props) => {

    const [ homeSwipeEnabled, setHomeSwipeEnabled ] = useState<boolean>(true); 




    return (
        <HomeGrapeContext.Provider value={{ homeSwipeEnabled, setHomeSwipeEnabled }}>
            {props.children}
        </HomeGrapeContext.Provider>
    )
};