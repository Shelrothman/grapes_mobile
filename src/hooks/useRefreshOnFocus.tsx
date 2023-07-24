import { useCallback, useRef } from "react";
import { useFocusEffect } from '@react-navigation/native'



/**
 * @description this hook will call the provided refresh function
 * when the scren is focused.
 *  refetch is skipped the first time because 
 *  useFocusEffect calls our callback on mount in addition to screen focus.
 */
export function useRefreshOnFocus<T>(
    refetch: () => Promise<T>,
    setLoading?: React.Dispatch<React.SetStateAction<boolean>>
) {
    const firstTimeRef = useRef(true)
    // if (setLoading) setLoading(true);

    useFocusEffect(
        useCallback(() => {
            if (firstTimeRef.current) {
                firstTimeRef.current = false;
                return;
            }
            refetch()
        }, [ refetch ])
    )
}