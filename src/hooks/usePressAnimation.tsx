/**
 * @hook usePressAnimation
* @desc This hook is used to animate the press of a link/button/text.. anything pressable
* it sets the styling onPress and removes on PressOut
 */
import { useState } from 'react';
import { StyleSheet } from 'react-native';


export function usePressAnimation(color?: string) {

    const [ isPressed, setIsPressed ] = useState<boolean>(false);
    const handlePressIn = () => setIsPressed(true);
    const handlePressOut = () => setIsPressed(false);

    const pressStyle = StyleSheet.create({
        pressed: {
            backgroundColor: color ? color : '#4E1E66',
            borderRadius: 10,
            padding: 7,
        },
    });

    return {
        isPressed,
        setIsPressed,
        handlePressIn,
        handlePressOut,
        pressStyle: isPressed ? pressStyle.pressed : {},
    } as const;



}