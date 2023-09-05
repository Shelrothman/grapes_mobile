import { Home_Grape } from "../../types";
import { resToHomeGrape } from "../../utils";
import { HomeService } from "../HomeService";
import { defaultGrape } from "../../utils/constants";



/**
 * @class HomePageService
 * methods for ui, home screen decoupled
 */
export class HomePageService {


    static async fetchDataOnFocus(
        user_uid: string,
        setGrapeFormState: React.Dispatch<React.SetStateAction<Home_Grape | null>>,
    ) {
        try {
            const response = await HomeService.getOrCreateToday(user_uid);
            if (response) return setGrapeFormState(resToHomeGrape(response));
        } catch (error) {
            // shouldn't get to here but in the chance it does, set it to the default grape
            return setGrapeFormState(resToHomeGrape(defaultGrape));
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
        // FIXME: this needs to check if the value is the same as it just was, if so dont send
        // TODO: so make a state for that..
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