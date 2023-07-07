import { TouchableWithoutFeedback, Keyboard, View } from 'react-native';


// inspo: https://stackoverflow.com/a/34779467/13073026

// *the accessible={false} is required to make the input form continue to be accessible through VoiceOver. Visually impaired people will thank you!

// KeyboardAvoidingView.props = {
//     ...KeyboardAvoidingView.defaultProps,
//     behavior: 'padding',
// };


/*
        <KeyboardAvoidingView style={{ flex: 1, marginRight: 10, marginLeft: 10 }}
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 70}
            >
            <View style={{ flex: 1 }}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView
                        contentContainerStyle={{ justifyContent: 'flex-end', flex: 1 }}
                    >
                        <View>
                            <MyGrapeLetter grape_day={grape.day[ 0 ]} />
                            <MyGrapeLetter grape_day={grape.day[ 1 ]} />
                            <MyGrapeLetter grape_day={grape.day[ 2 ]} />
                            <MyGrapeLetter grape_day={grape.day[ 3 ]} />
                            <MyGrapeLetter grape_day={grape.day[ 4 ]} />
                            <MyGrapeLetter grape_day={grape.day[ 5 ]} />
                        </View>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </View>
        </KeyboardAvoidingView>
*/

const DismissKeyboardHOC = (Comp: any) => {
    return ({ children, ...props }: any) => (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <Comp {...props}>
                {children}
            </Comp>
        </TouchableWithoutFeedback>
    );
};

export const DismissKeyboardView = DismissKeyboardHOC(View as any);