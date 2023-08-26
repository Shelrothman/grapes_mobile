import { View, ActivityIndicator } from "react-native";

// TODO customize this loading screen further.. 🍇

export default function () {
    return (
        <View style={{
            flex: 1, alignItems: "center", justifyContent: "center",
            backgroundColor: "#2E3944",
            height: "100%",
            width: "100%",
        }}>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center", }} >
                <ActivityIndicator size="large" color='#8031A7' />
            </View>
        </View>
    );
}
