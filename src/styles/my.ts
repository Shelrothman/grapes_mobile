import { StyleSheet } from 'react-native';

// TODO remove the ones i dont use


/**
 * @description styles for all the components in the home/my screens
 * and their children
 */
export const my_styles = StyleSheet.create({
    share_container: {
        flexDirection: 'row',
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10,
        paddingBottom: 10,
    },
    clearButtonParent: {
        justifyContent: "center",
        alignItems: "center",
        marginRight: 5,
        borderRadius: 50,
    },
    inputParent: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: '#3d4b59',
        borderRadius: 10,
        paddingRight: 5,
    },
    share_container_edit: { flexDirection: 'row', justifyContent: 'center', },
    card: {
        borderWidth: 2,
        borderRadius: 10,
        marginTop: 40,
        borderColor: '#cb9de2',
        backgroundColor: '#3d4b59',
        // backgroundColor: '#ebe6f0', //? may be more accessible?
        flexDirection: 'column',
        maxWidth: '85%',
        minWidth: '85%',
        alignSelf: 'center',
        // marginBottom: 3,
    },
    account_card: {
        // backgroundColor: '#3d4b59',
        flexDirection: 'column',
        maxWidth: '85%',
        minWidth: '85%',
        alignSelf: 'center',
        marginTop: 20,
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
    titleLetterText: { fontSize: 26, color: '#cb9de2', fontStyle: 'italic', fontWeight: 'bold', },
    titleText: { fontWeight: 'bold', fontStyle: 'italic', color: '#cb9de2', },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#4E1E66',
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        paddingBottom: 10,
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

    /**this is the button itself */
    shareBtn: {
        flexDirection: 'row',
        borderColor: '#4E1E66', borderWidth: 2,
        borderRadius: 10,
        backgroundColor: '#a8e4a0',
        padding: 2,
    },
    bottomInEditContainer: {
        flexDirection: 'column',
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10,
        color: '#f3f0f5',
    },
    main_container: { height: '100%', backgroundColor: '#2E3944', width: '85%', },
    date_title: {
        fontSize: 18, fontWeight: 'bold', color: '#a8e4a0',
        alignSelf: 'center',
        marginTop: 10,
        // marginBottom: 10, 
    },
    icon_title: {
        marginBottom: 10, fontSize: 18,
        fontWeight: 'bold', color: '#a8e4a0',
    },
    header_container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 10,
    },
    home_container: { backgroundColor: '#2E3944', alignItems: 'center', height: '100%', width: '100%' }
});