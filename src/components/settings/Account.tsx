import { View, Text, SafeAreaView, Button } from 'react-native';
import { supabase } from '../../initSupabase';
// import {  } from 'react-native-safe-area-context';

// Display name defaults to their email and then they have optuon in here to customize it

export function Account() {
    return (
        <SafeAreaView>

            <View>
                <Text>Account</Text>
            </View>


            <Button
                title="Logout"
                // this works 
                onPress={async () => {
                    const { error } = await supabase.auth.signOut();
                    if (!error) alert("Signed out!");
                    if (error) alert(error.message);
                }}
            />
        </SafeAreaView>
    )
}