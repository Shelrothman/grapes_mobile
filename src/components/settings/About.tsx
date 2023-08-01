import { useState } from 'react';
import { View, Text, StyleSheet, SectionList, Pressable } from 'react-native';
import { A } from '@expo/html-elements';
import { setting_styles } from '../../styles/settings';
import { MaterialCommunityIcons, Ionicons, MaterialIcons } from '@expo/vector-icons';


type renderItemProps = {
    title?: string;
    exapandableProp?: boolean;
    value?: string;
    link?: string;
    linkTitle?: string;
    icon?: JSX.Element;
}

// TODO this will also need to be displayed to the user on their first login only

// TODO research on whats needed for Some kind of disclaimer that this app does not replace a real therapist and to call 911 if feeeling bad.. blalala thang


const ExpandDownIcon = () => <MaterialCommunityIcons name="arrow-expand-down" size={24} color="#cb9de2" />
const ExpandLeftIcon = () => <MaterialCommunityIcons name="arrow-expand-left" size={24} color="#cb9de2" />

function RenderItem({
    title,
    exapandableProp = false,
    value,
    link,
    linkTitle,
    icon,
}: renderItemProps) {
    const [ expanded, setExpanded ] = useState<boolean>(exapandableProp ? false : true); // default leave expanded if not expandable


    const renderItem = () => {
        if (typeof value !== "undefined") return <Text style={{ fontSize: 16, color: "white" }}>{value}</Text>;
        if (link && linkTitle) return <A href={`${link}`}>
            {linkTitle}{` `}<MaterialCommunityIcons name="open-in-new" size={24} color="white" />
        </A>;
    };

    return (
        <View>
            {(title && exapandableProp) && (
                <Pressable onPress={() => setExpanded(expanded => !expanded)}>
                    <Text>
                        {title}
                        {expanded ? <ExpandDownIcon /> : <ExpandLeftIcon />}
                    </Text>
                </Pressable>
            )}
            {title && <Text>{title}</Text>}
            <View style={{ display: expanded ? 'flex' : 'none' }}>
                {renderItem()}
                {icon && icon}
            </View>
        </View>
    )
};


const DATA = [
    // What is Grapes
    {
        title: 'What is G.R.A.P.E.S?', expandable: true,
        data: [
            {
                title: "G.R.A.P.E.S is a daily practice", value: "Each day, choose a simple activity from each of the different categories. GRAPES is great for anyone, but particularly can help with those who experience anxiety and depression. It can help you to feel more balanced and improve your mood.",
            },
            {
                title: "GRAPES stands for: ", expandable: true, data: [
                    { title: "G is Gentle with self", value: "Be kind to yourself. Think about yourself with pride, acceptance, and forgiveness. Examples include taking time to think about all you are thankful for, or saying no to an inconvenient request." },
                    { title: "R stands for Relaxation", value: "Take time to relax and unwind from stress. Examples include taking a bath, reading a book, or playing with a pet." },
                    { title: "A stands for Accomplishment", value: "Commit to completing at least one task. Examples include doing the laundry or completing something from your to-do list." },
                    { title: "P stands for Pleasure", value: "Do something that you enjoy and makes you feel good. Examples include listening to your favorite music or treating yourself to a tasty snack." },
                    { title: "E stands for Exercise", value: "Get moving to improve your move and health. Examples include doing some stretches or going for a walk." },
                    { title: "S stands for Social", value: "Connect and interact with others. Examples include making small talk to a neighbor or having dinner with a friend." },
                ]
            },
            { title: "How to use GRAPES", value: "Generally, it is recommended that you plan each category first thing in the morning. You can commit your GRAPES to your therapist, a trusted friend or family member, which will help you follow through on your commitment. Please note that this app is not a replacement for therapy, only a tool to go alongside your individual mental health plan. If you are feeling unwell, please contact a professional or call 911.", },
            {
                title: "More about GRAPES", expandable: true, data: [
                    {
                        linkTitle: "CogToolz GRAPES",
                        link: "https://www.cogtoolz.com/pages/grapes-tool",
                    },
                    {
                        linkTitle: "Blog from ModernTherapy on Grapes for Depression",
                        link: "https://moderntherapy.online/blog-2/2022/2/7/grapes-for-depression-when-life-gives-you-lemons-make-grapes",
                    },
                    {
                        linkTitle: "IntegrityCounselingGroup on using the Grapes tool",
                        link: "https://www.integritycounselinggroup.com/blog/2018/12/22/how-to-use-the-grapes-tool-daily-to-combat-depression",
                    },
                ]
            }
        ],

    },
    // How to use this App
    {
        title: 'How to use this App', expandable: true,
        data: [
            {
                title: "Home Screen", value: "The home screen is where you can edit your grape for the day. Tap on the text in the letter you want to edit, fill it in, then hit save! From the home screen, you can share any of your letters to the global feed. Tap this icon to go to the home screen: ",
                icon: <Ionicons name="home-outline" size={24} color="#cb9de2" />
            },
            {
                title: "Global Screen", value: "The global screen is where you can view other people's grapes for inspiration and ideas. You can copy any of the values directly and use. Tap this icon to go to the global screen: ",
                icon: <Ionicons name="earth-outline" size={24} color="#cb9de2" />
            },
            {
                title: "History Screen", value: "The history screen is where you can view your past grapes. Keep in mind we don't store your data past one month. Tap this icon to go to the history screen: ",
                icon: <MaterialIcons name="history" size={24} color="#cb9de2" />
            }
        ]
    },
    // Additional Resources
    {
        title: 'Additional Resources', expandable: true, data: [
            {
                linkTitle: "Dialectical behaviour therapy (DBT)",
                link: "https://behavioraltech.org/",
            },
            {
                linkTitle: "Creator or DBT, Marsha M. Linehan",
                link: "https://en.wikipedia.org/wiki/Marsha_M._Linehan",
            },
            {
                linkTitle: "Helpful books",
                link: "https://books.google.com.br/books?hl=en&lr=&id=xlzyDwAAQBAJ&oi=fnd&pg=PP1&dq=dialectical+behavior+therapy&ots=IN4XpK4uml&sig=3K7e8F_V6OWu4K2mbEl1Jp7rL78&redir_esc=y#v=onepage&q=dialectical%20behavior%20therapy&f=false",
            },
        ]
    },
    // App Info
    {
        title: 'App Info', expandable: true, data: [
            { title: "Version", value: "1.0.0" }, // TODO get this from package.json
            { title: "Expo SDK", value: "42.0.0" }, // TODO get this from package.json
            { title: "Bundle ID", value: "loremipsumbarfoo" }, // TODO get this 
            {
                title: "About the App Developer", data: [
                    { linkTitle: "LinkedIn", link: "https://www.linkedin.com/in/shelby-anne-rothman/" },
                    { linkTitle: "Github", link: "https://github.com/Q118" },
                    { linkTitle: "Portfolio", link: "https://shelbyrothman.com/" }
                ]
            },
        ]
    },
    // Support GRAPES-app
    {
        title: "Support Grapes App", expandable: true, data: [
            { linkTitle: "📝 Write a review", link: "https://jsonplaceholder.typicode.com/posts/2" }, // TODO use expo-store-review pkg
            { linkTitle: "⭐ Star the project on Github", link: "" }, // TODO link to github
            { linkTitle: "🐛 Report a bug", link: "" } // TODO link to github issues
        ]
    }
];

export function About() {


    // TODO this in its own file?



    return (
        <View>
            <Text>About</Text>

        </View>
    )
}