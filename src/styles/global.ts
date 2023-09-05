import { StyleSheet } from 'react-native';

// todo: : a bunch of these are repeated in my_styles so consolidate

/**
 * @description styles for all the components in the global screens
 * and their children
 */
export const global_styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontFamily: 'Screen-Header',
        color: '#c6bfc9',
        alignSelf: 'center',
        marginTop: 10,
    },
    title_container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 10,
    },
    // sharedLetter styles
    button: { paddingRight: 0, marginRight: 0, },
    userBtn: { borderRadius: 10, padding: 10, },
    card: {
        borderWidth: 2,
        borderRadius: 10,
        marginTop: 40,
        borderColor: '#474115',
        backgroundColor: '#3d4b59',
        flexDirection: 'column',
        maxWidth: '85%',
        minWidth: '85%',
        alignSelf: 'center',
    },

    card_body: {
        borderBottomColor: '#c6bfc9',
        borderBottomWidth: 0.5,
        padding: 5,
        backgroundColor: '#3d4b59',
        alignItems: 'center',
    },
    card_footer: {
        flexDirection: 'row', justifyContent: 'space-between',
        paddingTop: 3,
        paddingBottom: 3,
    },
    card_footer_last: {
        flexDirection: 'row', justifyContent: 'center',
        paddingBottom: 3,
    },
    suffix_container: { justifyContent: 'flex-end', marginBottom: 5, fontFamily: 'Body-Reg', },
    fullTitle_container: { flexDirection: 'row', justifyContent: 'center', },
    value: {
        fontSize: 18, color: 'white',
        fontFamily: 'Reg-Italic',
    },
    share_container: { justifyContent: 'center', marginLeft: 5, },
    shared_by_container: {
        justifyContent: 'center', marginRight: 5,
    },
    shared_by: { fontSize: 12, color: '#c6bfc9', fontFamily: 'Body-Reg' },
    load_container: {
        padding: 10,
        marginBottom: 30,
        marginTop: 10,
        backgroundColor: '#c6bfc9',
        borderRadius: 10,
        alignItems: 'center',
        fontFamily: 'Body-Reg',
    },
});