import { StyleSheet } from 'react-native';

/**
 * @description styles for all the components in the global screens
 * and their children
 */
export const global_styles = StyleSheet.create({
    global_container: {
        backgroundColor: '#1a1e47',
        alignItems: 'center',
        height: '100%',
        width: '100%',
    },
    title: { fontSize: 18, fontWeight: 'bold', color: '#a8e4a0', },
    title_container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 10,
        // bottomBorderWidth: 1,
        // borderBottomColor: '#c6bfc9',
    },
    // sharedLetter styles
    button: { paddingRight: 0, marginRight: 0, },
    userBtn: { borderRadius: 10, padding: 10, },
    card: {
        backgroundColor: '#a8e4a0',
        borderRadius: 10,
        borderColor: '#c6bfc9',
        borderWidth: 2,
        marginTop: 20,
        marginBottom: 10,
        minWidth: '85%',
        maxWidth: '85%',
        alignSelf: 'center',
    },
    card_header: {
        backgroundColor: '#4E1E66',
        borderTopEndRadius: 8,
        borderTopStartRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    iconOne_container: { justifyContent: 'center', marginLeft: 5, },
    iconTwo_container: { justifyContent: 'center', marginRight: 5, },
    card_body: {
        borderBottomColor: '#c6bfc9',
        borderBottomWidth: 0.5,
        padding: 10,
        backgroundColor: '#3d4b59',
        alignItems: 'center',
    },
    card_footer: { flexDirection: 'row', justifyContent: 'space-between', padding: 5, },
    suffix_container: { justifyContent: 'flex-end', marginBottom: 5, },
    fullTitle_container: { flexDirection: 'row', justifyContent: 'center', },
    letter: { fontSize: 30, color: '#c6bfc9', },
    value: { fontSize: 15, color: '#f3f0f5', },
    share_container: { justifyContent: 'center', marginLeft: 5, },
    shared_by_container: { justifyContent: 'center', marginRight: 5, maxWidth: '50%', },
    shared_by: { fontSize: 12, color: '#1a1e47', },
    load_container: {
        padding: 10,
        marginBottom: 30,
        marginTop: 10,
        backgroundColor: '#c6bfc9',
        borderRadius: 10,
        alignItems: 'center',
    },
});