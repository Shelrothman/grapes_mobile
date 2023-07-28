import { useCallback, useRef } from "react";
import { useFocusEffect } from '@react-navigation/native'

// !!! DO NOT USE THIS

// it keeps reruning and reruniong for every and ever which would be great for somehting like a live feed but not for this dsuuuuuug

/**
 * @description this hook will call the provided refresh function
 * when the scren is focused.
 *  refetch is skipped the first time because 
 *  useFocusEffect calls our callback on mount in addition to screen focus.
 */
export function useRefreshOnFocus<T>(
    refetch: () => Promise<T>,
) {
    const firstTimeRef = useRef(true)
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