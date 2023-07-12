import Toast, { BaseToast, BaseToastProps } from 'react-native-toast-message';


export const ToastConfig = {
    success: ({ text1, ...rest }: BaseToastProps) => (
        <BaseToast
            {...rest}
            style={{ borderLeftColor: '#cb9de2', backgroundColor: '#a8e4a0' }}
            text1={text1}
        />
    )
};