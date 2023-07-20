
*****
<!-- *** WE ARE NOW READY TO START IMPLEMENTING REAL DATA -->
<!-- ** and SET up the last setting pages- "about Grapes" -->
*****
<!-- !!! All tHE "TODO"s throughout the src -->

<!-- * ive begun setting up the context but not quite in use -->

<!-- remove crufdt and unused files -->


<!-- Maybe eventually for placeholder while wiating history to load: https://www.npmjs.com/package/react-native-easy-content-loader -->

<!-- TODO: go back in to grapes superbase and chage back the auth config that requiresd new users to confirm their email address before first login... AND THE CHANGE-EMAIL confirmation to be changed in Providers settings.
for  now i turned that off for testing -->

<!-- TODO to set up the subscribing to new posts... use https://supabase.com/docs/reference/javascript/subscribe -->

<!-- TODO: add a username field for during signup -->


<!-- TODO [future]: in top right header of grape_id page, have a button to save the day and it can export somewhere or better yet, Have it become a widget on their os... somehting... -->
<!-- * like an addToHomeScreen fucntion -->

<!-- !!!!!*************************** -->
<!-- TODO convert the site/redirect URLs to hold what im hosted on for when a password is changed .. or maybe not bc it still needs a confirm for ONLY the new one which is kind of nice if personno longer can access tehri old one..-->
<!-- ! Consider setting up a custom SMTP server for better email deliverability on your project "grapes-backend" (vvjtgmzgmrunbhvshgxy). Check our Production Readiness guide: https://supabase.com/docs/guides/platform/going-into-prod -->




<!-- TODO: convert the supabase sdk from v1 -> v2 -->

- timeZone should be set in settings per user? ...option to be and by default use the device time zone
[expo]https://docs.expo.dev/versions/latest/sdk/date-time-picker/

// const currentTimeStampInMilliseconds = (new Date()).getTime();

- a customizavle widget for their homescreen that displays their current days agenda or displays urge to go mke ojne for today if they havent yet


- show option in the filling out form for a user to view suggestions from teh global feed

- use this for auth:
https://github.com/codingki/react-native-expo-template/tree/master/template-typescript-bottom-tabs-supabase-auth-flow
- perhaps starting with this template is a good idea

- once frontend is mostly initially done then use supabase like bring it in.
- https://supabase.com/dashboard/project/vvjtgmzgmrunbhvshgxy



{/* <Link href="/Edit">
<FontAwesome name="edit" size={20} color="#4E1E66" />
</Link> */}
{/*  <Link href="/share">
<FontAwesome name="share-square" size={20} color="#4E1E66" />
</Link> */}

    buttonWrapper: {
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'space-between',
        gap: 6,
    },


*/}