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
        // borderColor: '#c6bfc9',
        borderColor: '#474115',
        backgroundColor: '#3d4b59',
        flexDirection: 'column',
        maxWidth: '85%',
        minWidth: '85%',
        alignSelf: 'center',
    },
    account_card: {
        flexDirection: 'column',
        maxWidth: '85%',
        minWidth: '85%',
        alignSelf: 'center',
        marginTop: 10,
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
        color: '#c6bfc9', 
        // fontStyle: 'italic', fontWeight: 'bold',
        fontFamily: 'Grape-Header-a'
    },
    titleText: { fontFamily: 'Grape-Header-b', fontSize: 20, color: '#c6bfc9', },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#4E1E66',
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        borderBottomColor: '#c6bfc9',
        borderBottomWidth: 0.3,
    },
    main_container: { height: '100%', backgroundColor: '#1a1e47', width: '85%', },
    date_title: {
        fontSize: 20, 
        fontFamily: 'Screen-Header',
        color: '#c6bfc9',
        alignSelf: 'center',
        marginTop: 10,
    },
});