import { StyleSheet } from 'react-native';

/**
 * @description styles for all the components in the home/my screens
 * and their children
 */
export const history_styles = StyleSheet.create({
    container: { backgroundColor: '#2E3944', alignItems: 'center', height: '100%', width: '100%', },
    title: { fontSize: 18, fontWeight: 'bold', color: '#a8e4a0', },
    title_container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 10,
    },
    /** subcontainer holdiong the tablish grape */
    box_container: {
        borderRadius: 10,
        borderColor: '#4E1E66',
        backgroundColor: '#8ABDAA',
        alignContent: 'center',
        borderWidth: 2.5,
        minWidth: '95%',
        maxWidth: '95%',
        // ! important that if ya wanna change these widths, have to change in HomeGrapeBox.tsx too
    },
    /** Grape Box styles */
    row: {
        flexDirection: 'row',
        borderColor: '#4E1E66',
        borderBottomWidth: 0.5,
    },
    alt_row: {
        flexDirection: 'row',
        borderColor: '#4E1E66',
        borderBottomWidth: 0.5,
    },
    letterColumn: {
        width: 50,
        borderRightWidth: 0.5,
        borderColor: '#4E1E66',
        justifyContent: 'center',
        padding: 10,
        alignItems: 'center',
    },
    letterColText: {
        color: '#4E1E66',
        fontSize: 20,
        fontWeight: 'bold',
    },
    letterValue: {
        // padding: 10,
        marginLeft: 10,
        // make it so the inner words wrap: https://stackoverflow.com/questions/42284429/how-to-make-text-wrap-inside-a-view-in-react-native
        wordWrap: 'break-all',
        wordBreak: 'break-all',
        flex: 1,
    },
    letterValue_alt: {
        wordWrap: 'break-word',
        padding: 10,
    },
    letterValueText: {
        fontStyle: 'italic',
        fontWeight: 'bold',
        color: '#4E1E66',
    }
});