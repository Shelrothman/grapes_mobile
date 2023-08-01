import { StyleSheet } from "react-native";


export const nav_styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: '#a8e4a0',
        borderRadius: 20,
        padding: 25,
        alignItems: 'center',
        elevation: 5,
        position: 'relative',
    },
    welcomeText: {
        fontSize: 18,
    },
    helpText: {
        fontSize: 12,
        fontStyle: 'italic',
        marginTop: 5,
    },
    modalHeader: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        position: 'relative',
        marginBottom: 5,
        // overflow: 'visible',
    },
    x_pressable: {
        borderRadius: 30,
        padding: 9,
        borderWidth: 2,
        // borderColor: '#4E1E66',
        position: 'absolute',
        top: -30,
        right: -50,
        backgroundColor: '#9CAF88',
    }
})