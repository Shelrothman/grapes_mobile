/**
 * @hook usePressAnimation
* @desc This hook is used to animate the press of a link/button/text.. anything pressable
* it sets the styling onPress and removes on PressOut
 */
import { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';


export function usePressAnimation() {

    const [ isPressed, setIsPressed ] = useState<boolean>(false);
    const handlePressIn = () => setIsPressed(true);
    const handlePressOut = () => setIsPressed(false);

    const pressStyle = StyleSheet.create({
        pressed: {
            backgroundColor: '#4E1E66',
            borderRadius: 10,
            padding: 7,
        },
    });

    // const GrapePressable = ({ children }: { children: JSX.Element }) => {
    //     return (
    //         <Pressable onPressOut={handlePressOut}
    //             onPress={onPressHandler} onPressIn={handlePressIn}
    //             style={isPressed ? pressStyles.pressed : {}}
    //         > {children}
    //         </Pressable>
    //     )
    // };


    return {
        isPressed,
        setIsPressed,
        handlePressIn,
        handlePressOut,
        pressStyle: isPressed ? pressStyle.pressed : {},
        // GrapePressable,
    } as const;



}