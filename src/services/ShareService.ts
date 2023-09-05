import React from 'react';
import Toast, { ToastShowParams } from 'react-native-toast-message';
import { GlobalService } from './GlobalService';
import { GrapeDayLetter } from '../types';
import { defaultGrape } from '../utils/constants';
import { cleanStringNoExtraSpace } from '../utils';

const toastProps: ToastShowParams = { position: 'top', visibilityTime: 4000, };

/*
 * *     constraint unique_shared_letters unique (user_id, letter_int, value),
 * 
 *                 if ((_user.message && _user.message.includes('unique constraint')) && key === 'display') {
                    handleCancelClick(key); // reset the value back
                    return alert(`Display Name already exists, please choose another.`);
                }
 */

/**
 * @class ShareService
 * @description handles all the logic for sharing a grape activity
 */
export class ShareService {

    static handleSharePress(setLoading: React.Dispatch<React.SetStateAction<boolean>>, sessionUser: any, grape_day_letter: GrapeDayLetter) {
        const globalService = new GlobalService();
        const toShare = {
            letterString: grape_day_letter.letter,
            letterValue: grape_day_letter.value, // clean it up in the next function
            user_id: sessionUser!.user_uid,
        };
        globalService.addRow(toShare).then((res) => {
            return Toast.show({
                type: 'success',
                text1: 'Shared to the Global feed!',
                text2: 'Go check it out!',
                ...toastProps,
            });
        }).catch((err: any) => {
            setLoading(false);
            if (err.message.includes('unique constraint')) {
                return Toast.show({
                    type: 'error',
                    text1: 'Duplicate value error!',
                    text2: 'You cannot share the same value twice.',
                    ...toastProps,
                });
            }
            return Toast.show({
                type: 'error',
                text1: 'Error sharing to the Global feed!',
                text2: 'Try again later',
                ...toastProps,
            });
        }).finally(() => setLoading(false));
    }


    static handleUnchangedValue() {
        return Toast.show({
            type: 'error',
            text1: 'Cannot share the default value!',
            text2: 'Please choose a custom value to share.',
            ...toastProps,
        });
    }


}