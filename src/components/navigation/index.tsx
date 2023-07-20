import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';

import { NavigationContainer } from '@react-navigation/native';


import Main from './MainStack';
import Auth from './AuthStack';
import Loading from '../../utils/Loading';

//* ..  i think we may not need like the Client/provider stff bc we are using the AuthContext from the AuthProvider and initSubabase from the SubabaseProvider


export default () => {
    const auth = useContext(AuthContext);
    const user = auth.user;
    // <NavigationContainer independent={true}>
    return (
        <NavigationContainer>
            {user == null && <Loading />}
            {user == false && <Auth />}
            {user == true && <Main />}
        </NavigationContainer>
    );
};
