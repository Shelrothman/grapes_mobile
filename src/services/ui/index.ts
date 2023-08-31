import { Home_Grape } from "../../types";
import { resToHomeGrape } from "../../utils";
import { HomeService } from "../HomeService";
import { defaultGrape } from "../../utils/constants";


// todo: tests and make files liek this for the other screens

/**
 * @class HomePageService
 * methods for ui, home screen decoupled
 */
export class HomePageService {


    static async fetchDataOnFocus(
        user_uid: string,
        setGrapeFormState: React.Dispatch<React.SetStateAction<Home_Grape | null>>,
        setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
        setIsError: React.Dispatch<React.SetStateAction<boolean>>,
    ) {
        try {
            const response = await HomeService.getOrCreateToday(user_uid);
            // todo: caching mechanism or something around here or in HomeService
            if (response !== null) return setGrapeFormState(resToHomeGrape(response));
            else console.error('response was null wha?');
            //FIXME:  lets figure ^^this out over next few days
        } catch (error) {
            setIsLoading(false);
            console.error('Error fetching data:', error);
            setIsError(true);
        }
    }


    static handleOnEndEditing(
        formState: Home_Grape,
        setFormState: React.Dispatch<React.SetStateAction<Home_Grape | null>>,
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