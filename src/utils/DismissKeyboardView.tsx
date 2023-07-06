import { TouchableWithoutFeedback, Keyboard, View } from 'react-native';


// inspo: https://stackoverflow.com/a/34779467/13073026

// *the accessible={false} is required to make the input form continue to be accessible through VoiceOver. Visually impaired people will thank you!

// KeyboardAvoidingView.props = {
//     ...KeyboardAvoidingView.defaultProps,
//     behavior: 'padding',
// };

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