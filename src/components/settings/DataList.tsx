import { Ionicons, MaterialIcons } from '@expo/vector-icons';

/**
 * render this list into SectionList
 */
export const DataList: any = [
    // What is Grapes
    {
        title: 'What is G.R.A.P.E.S?',
        data: [
            {
                value: "***DISCLAIMER: Please note that this app is not a replacement for therapy; only a tool to go alongside your individual mental health plan. If you are feeling unwell, please contact a professional or call 911.***"
            },
            {
                title: "G.R.A.P.E.S is a daily practice", value: "Each day, choose a simple activity from each of the different categories. GRAPES is great for anyone, but particularly can help with those who experience anxiety and depression. It can help you to feel more balanced and improve your mood.",
            },
            {
                title: "G.R.A.P.E.S. stands for: ", value: [
                    { letter: "g", letterTitle: "G is Gentle with self", letterValue: "Be kind to yourself. Think about yourself with pride, acceptance, and forgiveness. Examples include taking time to think about all you are thankful for, or saying no to an inconvenient request." },
                    { letter: "r", letterTitle: "R is for Relaxation", letterValue: "Take time to relax and unwind from stress. Examples include taking a bath, reading a book, or playing with a pet." },
                    { letter: "a", letterTitle: "A is for Accomplishment", letterValue: "Commit to completing at least one task. Examples include doing the laundry or completing something from your to-do list." },
                    { letter: "p", letterTitle: "P is for Pleasure", letterValue: "Do something that you enjoy and makes you feel good. Examples include listening to your favorite music or treating yourself to a tasty snack." },
                    { letter: "e", letterTitle: "E is for Exercise", letterValue: "Get moving to improve your move and health. Examples include doing some stretches or going for a walk." },
                    { letter: "s", letterTitle: "S is for Social", letterValue: "Connect and interact with others. Examples include making small talk to a neighbor or having dinner with a friend." },
                ]
            },
            { title: "How to use G.R.A.P.E.S.", value: "Generally, it is recommended that you plan each category first thing in the morning. You can commit your GRAPES to your therapist, a trusted friend or family member, which will help you follow through on your commitment. ", },
            {
                title: "More on G.R.A.P.E.S.", value: [
                    {
                        linkTitle: "CogToolz",
                        link: "https://www.cogtoolz.com/pages/grapes-tool",
                    },
                    {
                        linkTitle: "GRAPES for depression",
                        link: "https://moderntherapy.online/blog-2/2022/2/7/grapes-for-depression-when-life-gives-you-lemons-make-grapes",
                    },
                    {
                        linkTitle: "IntegrityCounselingGroup",
                        link: "https://www.integritycounselinggroup.com/blog/2018/12/22/how-to-use-the-grapes-tool-daily-to-combat-depression",
                    },
                ]
            }
        ]
    },
    // How to use this App
    {
        title: 'How to use this App', expandableProp: true,
        data: [
            {
                title: "Home Screen", value: "The home screen is where you can edit your grape for the day. Tap on the text in the letter you want to edit, fill it in, then hit save! From the home screen, you can share any of your letters to the global feed. ",
                icon: <Ionicons name="home-outline" size={24} color="#cb9de2" />
            },
            {
                title: "Global Screen", value: "The global screen is where you can view other people's grapes for inspiration and ideas. You can copy any of the values directly and use.",
                icon: <Ionicons name="earth-outline" size={24} color="#cb9de2" />
            },
            {
                title: "History Screen", value: "The history screen is where you can view your past grapes. Keep in mind we don't store your data past one month.",
                icon: <MaterialIcons name="history" size={24} color="#cb9de2" />
            }
        ]
    },
    // Additional Resources
    {
        title: 'Additional Resources', data: [
            {
                title: "Learn more about the methodology behind G.R.A.P.E.S.", value: [
                    {
                        linkTitle: "Dialectical behaviour therapy (DBT)",
                        link: "https://behavioraltech.org/",
                    },
                    {
                        linkTitle: "Creator of DBT, Marsha M. Linehan",
                        link: "https://en.wikipedia.org/wiki/Marsha_M._Linehan",
                    },
                    {
                        linkTitle: "Helpful books",
                        link: "https://books.google.com.br/books?hl=en&lr=&id=xlzyDwAAQBAJ&oi=fnd&pg=PP1&dq=dialectical+behavior+therapy&ots=IN4XpK4uml&sig=3K7e8F_V6OWu4K2mbEl1Jp7rL78&redir_esc=y#v=onepage&q=dialectical%20behavior%20therapy&f=false",
                    },
                ]
            },
        ]
    },
    // App Info
    {
        title: 'App Info', data: [
            { title: "Version", value: "1.0.0" }, // TODO get this from package.json
            { title: "Expo SDK", value: "42.0.0" }, // TODO get this from package.json
            { title: "Bundle ID", value: "loremipsumbarfoo" }, // TODO get this 
            {
                title: "About the App Developer", value: [
                    { linkTitle: "LinkedIn", link: "https://www.linkedin.com/in/shelby-anne-rothman/" },
                    { linkTitle: "Github", link: "https://github.com/Q118" },
                    { linkTitle: "ShelbyRothman.com", link: "https://shelbyrothman.com/" }
                ]
            },
        ]
    },
    // Support GRAPES-app
    {
        title: "Support Grapes App", data: [
            {
                value: [
                    { linkTitle: "📝 Write a review", link: "https://jsonplaceholder.typicode.com/posts/2" }, // TODO use expo-store-review pkg
                    { linkTitle: "⭐ Star the project on Github", link: "" }, // TODO link to github
                    { linkTitle: "🐛 Report a bug", link: "" } // TODO link to github issues
                ]
            }
        ]
    }
];