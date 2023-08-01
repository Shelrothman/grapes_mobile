import { useState } from 'react';
import { NativeScrollEvent } from 'react-native';


type LoadMoreProps<T> = {
    initialDataValue: T,
    loadMoreCallback: () => void,
};

/**
 * @hook useLoadMoreOption
 * @desc This hook is used to display a fixexd amount of data until the user scrolls to 
 * the bottom of the screen, at which point the btn appears to load more data
 */
export function useLoadMoreOption<T>( initialDataValue: T ) {
    const [ data, setData ] = useState<T[]>(initialDataValue as T[]);
    /** flag signifying if the loadMore btn is visible */
    const [ loadMoreVisibility, setLoadMoreVisibility ] = useState<boolean>(false);

    const scrollOptions = {
        showsVerticalScrollIndicator: false,
        alwaysBounceVertical: false,
        bounces: false, // No flickering!
    };

    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }: any) => {
        const paddingToBottom = 30;
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    };
    

    const handleOnScroll = (nativeEvent: NativeScrollEvent) => {
        if (isCloseToBottom(nativeEvent)) {
            setLoadMoreVisibility(true);
        } else {
            setLoadMoreVisibility(false);
            // setNoMoreVisibility(false); //! aight just pause on this hook lets see what i need in global anywhoishisfh
        }
    };



    return {
        data,
        setData,
        loadMoreVisibility,
        setLoadMoreVisibility,
        scrollOptions,
    };
}