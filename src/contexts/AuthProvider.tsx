import { useContext, createContext, useState, useEffect } from 'react';
import { supabase } from '../initSupabase';
import { Session, User } from '@supabase/supabase-js';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

// !! Dont forget u are using the supabase js SDK **V1**


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
};

const AuthContext = createContext<Partial<ContextProps>>({});

interface Props {
    children: React.ReactNode;
}

export function useAuthContext() {
    return useContext(AuthContext);
}

const getDisplayName = async (user_id: string): Promise<string | null> => {
    const { data, error } = await supabase
        .from('user_names').select('user_name')
        .eq('id', user_id).single();
    //* okay to use single bc each col is unique
    if (error) return null;
    return data?.user_name || null;
};

const AuthProvider = (props: Props) => {
    // user null = loading
    const [ user, setUser ] = useState<null | boolean>(null);
    const [ session, setSession ] = useState<Session | null>(null);

    useEffect(() => {
        const session = supabase.auth.session();
        setSession(session);
        // console.log("metadata: ", session?.user?.user_metadata);
        setUser(session ? true : false);
        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                console.log(`Supabase auth event: ${event}`);
                setSession(session);
                setUser(session ? true : false);
            }
        );
        return () => {
            authListener!.unsubscribe();
        };
    }, [ user ]);


    const sessionToUser = (session: Session | null): any => {
        if (session == null) return null;
        // let sessionUser;
        return getDisplayName(session.user!.id).then((displayName) => {
            return {
                user_uid: session.user!.id,
                //* if userName is null, use email 
                display_name: displayName || session.user!.email || '',
                email: session.user!.email as string,
            };
        });
    };


    return (
        <AuthContext.Provider
            value={{
                user,
                session,
                // ? do we really need this? we cant do it locally in the component instead?.. would that be better?... would it be more efficient?
                sessionUser: sessionToUser(session),
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
