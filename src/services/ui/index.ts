import { TextInputProps } from "react-native";
import { Home_Grape } from "../../types";
import { resToHomeGrape } from "../../utils";
import { HomeService } from "../HomeService";
import { defaultGrape } from "../../utils/constants";


// Todo tests

/**
 * @class HomePageService
 * methods for ui, home screen decoupled
 */
export class HomePageService {
    /** static props for the textInputs */
    textInputProps: TextInputProps | Readonly<TextInputProps>

    constructor(aboutToFocus: boolean) {
        this.textInputProps = {
            style: {
                color: "white",
                height: 'auto',
                width: '90%', // give room to the clearBtn
                padding: 10,
                backgroundColor: aboutToFocus ? '#3d5945' : undefined, // little effect for accessibility
            },
            selectionColor: '#cb9de2', placeholderTextColor: '#cb9de2',
            maxLength: 250, // between 35 words and 63 words👌
            multiline: true,
            /**
             * this is the hack that makes it work WITH multiline 
             * * keep in mind it only works for ios
             *  @link https://github.com/facebook/react-native/issues/16826 
             * */
            scrollEnabled: false,
            returnKeyLabel: 'done', // ? this is for ios only and isnt even working?
            // enablesReturnKeyAutomatically: true,
            keyboardType: 'default',
        };
    }


    static async fetchDataOnFocus(
        user_uid: string,
        setGrapeFormState: React.Dispatch<React.SetStateAction<Home_Grape | null>>,
        setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
        setIsError: React.Dispatch<React.SetStateAction<boolean>>,
    ) {
        try {
            const response = await HomeService.getOrCreateToday(user_uid);
            // TODO caching mechanism around here
            if (response !== null) setGrapeFormState(resToHomeGrape(response));
            // else setIsError(true); //? do we need this?
        } catch (error) {
            setIsLoading(false);
            console.error('Error fetching data:', error);
            setIsError(true);
        }
    }


    static handleOnEndEditing(
        formState: Home_Grape,
        setFormState: React.Dispatch<React.SetStateAction<Home_Grape|null>>,
        subKey: string,
        user_uid: string,
    ) {
        const inputValue = formState[ subKey ] || defaultGrape[ subKey ];
        if (inputValue.length <= 3) return; // dont send a blank thing
        if (inputValue === defaultGrape[ subKey ]) return; // its the same
        const homeService = new HomeService();
        const toSend = {
            letter: subKey,
            value: inputValue,
            user_id: user_uid,
        };
        homeService.updateLetter(toSend).then((res) => {
            if (res !== null) {
                return setFormState(resToHomeGrape(res)); // set the grape in Home so that it updates before the refetch
            };
        }).catch((err: any) => {
            console.error(err);
            alert('Error updating grape, please try again.');
            return setFormState({ ...formState, [ subKey ]: defaultGrape[ subKey ] });
        });

    }




}