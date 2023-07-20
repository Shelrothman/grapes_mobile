import { View, ActivityIndicator } from "react-native";
import { Layout } from "react-native-rapi-ui";

export default function () {
    return (
        <Layout backgroundColor="#2E3944">
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center", }} >
                <ActivityIndicator size="large" color='#8031A7' />
            </View>
        </Layout>
    );
}
