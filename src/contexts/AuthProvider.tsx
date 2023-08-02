import { useContext, createContext, useState, useEffect } from 'react';
import { supabase } from '../initSupabase';
import { Session, User } from '@supabase/supabase-js';

// !! Dont forget u are using the supabase js SDK **V1**
// TODO update to V2

type AuthUser = {
    /** the unique identifier for the user matching supabase */
    user_uid: string;
    /** the user's display name */
    display_name: string;
    /** the user's email */
    email: string;
};

type ContextProps = {
    user: null | boolean;
    session: Session | null;
    sessionUser: AuthUser | null;
    /** is it user's first time login */
    firstTimeLogin: boolean;
    setFirstTimeLogin: React.Dispatch<React.SetStateAction<boolean>>;
};

const AuthContext = createContext<Partial<ContextProps>>({});

interface Props { children: React.ReactNode; }

export function useAuthContext() {
    return useContext(AuthContext);
}


/** helpers */
const getDisplayName = async (user_id: string): Promise<string | null> => {
    const { data, error } = await supabase
        .from('user_names').select('user_name')
        .eq('id', user_id).single();
    //* okay to use single bc each col is unique
    if (error) return null;
    return data?.user_name || null;
};
const sessionToUser = (session: Session | null): any => {
    if (session == null) return null;
    return getDisplayName(session.user!.id).then((displayName) => {
        return {
            user_uid: session.user!.id,
            //* if userName is null, use email 
            display_name: displayName || session.user!.email || '',
            email: session.user!.email as string,
        };
    });
};


const AuthProvider = (props: Props) => {
    // user null = loading
    const [ user, setUser ] = useState<null | boolean>(null);
    const [ session, setSession ] = useState<Session | null>(null);
    const [ sessionUser, setSessionUser ] = useState<AuthUser | null>(null);

    const [ firstTimeLogin, setFirstTimeLogin ] = useState<boolean>(false);

    useEffect(() => {
        const session = supabase.auth.session();
        setSession(session);
        setUser(session ? true : false);
        // * set the sessionUser:
        handleSessionUser(session);
        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                console.log(`Supabase auth event: ${event}`);
                setSession(session);
                setUser(session ? true : false);
                handleSessionUser(session);
            }
        ); 
        // this is called when the user logs out
        return () => { 
            authListener!.unsubscribe(); 
            setFirstTimeLogin(false);
        }; 
    }, [ user ]);

    function handleSessionUser(session: Session | null) {
        if (!session) {
            setSessionUser(null);
        } else {
            sessionToUser(session).then((user: AuthUser) => {
                setSessionUser(user);
            }).catch((err: any) => setSessionUser(null));
        }
    };

    return (
        <AuthContext.Provider value={{ user, session, sessionUser, firstTimeLogin, setFirstTimeLogin }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
