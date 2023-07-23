import { StyleSheet } from 'react-native';

/**
 * @description styles for all the components in the home/my screens
 */
export const my_styles = StyleSheet.create({
    share_container: {
        flexDirection: 'row',
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10,
        paddingBottom: 10,
    },
    card: {
        borderWidth: 2,
        borderRadius: 10,
        marginTop: 20,
        borderColor: '#cb9de2',
        backgroundColor: '#3d4b59',
        flexDirection: 'column',
    },
    iconOne_container: { justifyContent: 'center', marginLeft: 5, },
    iconTwo_container: { justifyContent: 'center', marginRight: 5, },
    pressable: {
        borderTopEndRadius: 0,
        borderTopStartRadius: 0,
        height: "100%",
        justifyContent: 'center',
    },
    pressed: { backgroundColor: '#4E1E66', padding: 7, },
    buttons: { paddingLeft: 15 },
    row: { flexDirection: 'row', justifyContent: 'space-between', },
    titleLetterText: {
        fontSize: 26,
        color: '#cb9de2',
        fontStyle: 'italic',
        fontWeight: 'bold',
    },
    titleText: { fontWeight: 'bold', fontStyle: 'italic', color: '#cb9de2', },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#4E1E66',
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
    },
    input_text: { marginLeft: 10, color: '#f3f0f5', },
    bottomRowContainer: {
        flexDirection: 'row',
        flex: 1,
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10,
        color: '#f3f0f5',
        justifyContent: 'space-between',
        alignItems: 'center',
        // paddingTop: 5,
    },
    bottomInEditContainer: {
        flexDirection: 'column',
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10,
        color: '#f3f0f5',
    },
});