import { StyleSheet } from 'react-native';

/** each row has these default */
const grape_box_styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderColor: '#4E1E66',
        borderBottomWidth: 0.5,
        alignItems: 'center',
        marginRight: 0,
    },
});


/**
 * @description styles for all the components in the home/my screens
 * and their children
 */
export const history_styles = StyleSheet.create({
    container: { backgroundColor: '#1a1e47', alignItems: 'center', height: '100%', width: '100%' },
    title: { fontSize: 20, fontWeight: 'bold', color: '#a8e4a0', fontFamily: 'Screen-Header' },
    title_container: { flexDirection: 'column', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginTop: 10, },
    /** subcontainer holdiong the tablish grape */
    box_container: { borderRadius: 10, borderColor: '#4E1E66', backgroundColor: '#8ABDAA', alignContent: 'center', minWidth: '95%', maxWidth: '95%', },
    // ! important that if ya wanna change these widths, have to change in HomeGrapeBox.tsx too
    /** Grape Box styles */
    row: { ...grape_box_styles.row, },
    alt_row: { ...grape_box_styles.row, backgroundColor: '#A0E4BA' },
    noop_row: { ...grape_box_styles.row, padding: 10, },
    last_row: { ...grape_box_styles.row, backgroundColor: '#A0E4BA', borderBottomEndRadius: 10, borderBottomStartRadius: 10, },
    letterColumn: { width: 50, borderRightWidth: 0.5, borderColor: '#4E1E66', justifyContent: 'center', padding: 10, alignItems: 'center', },
    letterColText: { color: '#4E1E66', fontSize: 20, fontFamily: 'Grape-Header-a', },
    //* make it so the inner words wrap: https://stackoverflow.com/questions/42284429/how-to-make-text-wrap-inside-a-view-in-react-native
    letterValue: { marginLeft: 10, wordWrap: 'break-all', wordBreak: 'break-all', flex: 1, },
    letterValueText: { fontFamily: 'Bold-Italic', color: '#4E1E66', },
    shareCol: { width: 40, alignSelf: 'flex-start', alignItems: 'flex-end', marginRight: 0, paddingTop: 5, },
    date_text: { color: '#c6bfc9', fontFamily: 'Grape-Header-a', },
    date_container: {
        alignItems: 'center', marginBottom: 10, backgroundColor: '#4E1E66', maxWidth: '95%', minWidth: '95%', padding: 10,
        borderColor: '#c6bfc9', borderWidth: 1, borderRadius: 10, flexDirection: 'row', justifyContent: 'space-between',
    },
    expander: { marginHorizontal: 10, },
    load_container: { padding: 10, margin: 10, backgroundColor: '#a8e4a0', borderRadius: 10, fontFamily: 'Body-Reg', },
});