import { View, ActivityIndicator } from "react-native";

export default function () {
    return (
        <View style={{
            flex: 1, alignItems: "center", justifyContent: "center",
            backgroundColor: "#1a1e47",
            height: "100%",
            width: "100%",
        }}>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center", }} >
                <ActivityIndicator size="large" color='#8031A7' />
            </View>
        </View>
    );
}
