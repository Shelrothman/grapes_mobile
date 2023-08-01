// import { useState } from 'react';
import { View, Text, SectionList, SafeAreaView } from 'react-native';
import { A } from '@expo/html-elements';
import { setting_styles } from '../../styles/settings';
import { MaterialCommunityIcons, Ionicons, MaterialIcons } from '@expo/vector-icons';
// import { isConditionalExpression } from 'typescript';
import { GrapeIcons } from '../../utils/Icons';
import { DataList } from './DataList';

type renderItemProps = {
    title?: string;
    value?: string;
    icon?: JSX.Element;
}


// TODO this will also need to be displayed to the user on their first login only.. the whole page just display it... and a note that they can view it in ther..

// TODO research on whats needed for Some kind of disclaimer that this app does not replace a real therapist and to call 911 if feeeling bad.. blalala thang




function RenderItem({
    title = "",
    value,
    icon,
}: renderItemProps) {

    if (title === "Additonal Resources") alert(value)

    const renderItem = () => {
        if (typeof value !== undefined) {
            if (Array.isArray(value)) {
                return <View>
                    {value.filter(Boolean).map((item: any, index: number) => {
                        if (Object.keys(item).includes("letter")) {
                            return <View key={index}>
                                <Text style={{ fontWeight: "bold", color: "white", fontSize: 16 }}>
                                    <GrapeIcons letter={item.letter} color="#cb9de2" size={25} />{` `}{item.letterTitle}
                                </Text>
                                <Text style={{ color: "white", fontSize: 16, marginLeft: 20, }}>
                                    {item.letterValue}{'\n'}
                                </Text>
                            </View>
                        } else if (Object.keys(item).includes("link")) {
                            return <View key={index}>
                                <A href={`${item.link}`} style={{ color: "#a8e4a0", fontSize: 16, marginLeft: 20, marginBottom: 10 }}>
                                    {item.linkTitle}{` `}<MaterialCommunityIcons name="open-in-new" size={20} color="#a8e4a0" />
                                </A>
                            </View>
                        }
                    })}
                </View>
            }
            return <Text style={{ fontSize: 16, color: "white" }}>{value}</Text>;
        }
    };

    return (
        <View>
            {title && <Text style={setting_styles.sub_header}>{title}{' '}{icon && icon}</Text>}
            <View style={{ paddingHorizontal: 24, paddingVertical: 12, }}>
                {renderItem()}
            </View>
        </View>
    )
};


export function About() {


    return (
        <SafeAreaView style={setting_styles.container}>
            {/* <Text>About</Text> */}
            <SectionList
                sections={DataList}
                renderSectionHeader={({ section: { title } }) => (
                    <View style={{ backgroundColor: "#4E1E66", alignItems: 'center' }}>
                        <Text style={setting_styles.header}>{title}</Text>
                    </View>
                )}
                keyExtractor={(item) => item.title}
                renderItem={({ item, index }) => <RenderItem {...item} />}

            />
        </SafeAreaView>
    )
}