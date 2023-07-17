import { ParamListBase, RouteProp } from "@react-navigation/native";

export type MainStackParamList = {
    MainTabs: undefined;
    SecondScreen: undefined;
};

export type AuthStackParamList = {
    Login: undefined;
    Register: undefined;
    ForgetPassword: undefined;
};

export type MainTabsParamList = {
    Home: undefined;
    Profile: undefined;
    About: undefined;
};

export type ScreenComponentType<ParamList extends ParamListBase, RouteName extends keyof ParamList> = React.ComponentType<{
    route: RouteProp<ParamList, RouteName>;
    navigation: any;
}> | React.ComponentType<{}>;

// ScreenComponentType<ParamListBase, "Login">