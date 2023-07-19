import { useContext, createContext, useState, useEffect } from 'react';
import { supabase } from '../initSupabase';
import { Session, User } from '@supabase/supabase-js';

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
    // changeEmail: (emailVal: string) => Promise<null | User>;
    // changePassword: (passwordVal: string) => Promise<null | User>;
    // changeDisplayName: (displayVal: string) => Promise<null | User>;
};

const AuthContext = createContext<Partial<ContextProps>>({});

interface Props {
    children: React.ReactNode;
}

export function useAuthContext() {
    return useContext(AuthContext);
}

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

    const sessionToUser = (session: Session | null): AuthUser | null => {
        if (session == null) return null;
        return {
            user_uid: session.user!.id,
            display_name: session.user!.user_metadata.display_name,
            email: session.user!.email as string,
        }
    };

    // const changeConfig = async (key: string, value: string) => {
    //     const { user, error } = await supabase.auth.update({
    //         ...key === 'display_name' && { data: { display_name: value } },
    //         ...key !== 'display_name' && { [ key ]: value },
    //     });
    //     if (error) console.log(error);
    //     // console.log(user);
    //     return user;
    // };

    // /**  change all three configs */
    // const changeConfigs = async (displayVal: string, emailVal: string, passwordVal: string ) => {
    //     const { user, error } = await supabase.auth.update({
    //         data: { display_name: displayVal },
    //         email: emailVal,
    //         password: passwordVal, // will just keep the old one if unchanged
    //     });
    //     if (error) console.log(error);
    //     // console.log(user);
    //     return user;
    // };

    // TODO move these three functions to the file their used in.




    return (
        <AuthContext.Provider
            value={{
                user,
                session,
                sessionUser: sessionToUser(session), // ? do we really need this? we cant do it locally in the component instead?.. would that be better?... would it be more efficient?
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
