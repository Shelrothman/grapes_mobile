
*****
<!-- *** WE ARE NOW READY TO START IMPLEMENTING REAL DATA -->
    starting with: lets start with the global feed i think itll be the simplest.
        <!--  // starting with the R of crud <--- did that and display_name -->
    <!-- // next: share to the global./.. the c of crud for to the global letters -->
    <!--// NEXT :  well the Users grapes... do this in one table -->
        <!-- // so working on this, the service file first then implement it in -->
    NEXT: just the cruding for the History page
        !!! do that next HISTORY and yep
<!-- ** and SET up the last setting pages- "about Grapes" --> <= ill do rhia lAST/later
*****
<!-- !!! All tHE "TODO"s throughout the src -->
<!-- ! go through and findf and remove ALL the stuff thats unused like files and parts and also uninstall any unused packages -->

UTC UTC UTC everywhere!
on insert on read on every SINGLE thing
only the TITLE string to be the users local. utc everythign else
<!-- TODO make only THE DISPLAY of the date titles be in local.. keeping everything else utc  -->

<!-- TODO remove all dependencies and imports for rapi-ui stufff.. get it out? -->

<!-- * ive begun setting up the context but not quite in use -->

<!-- remove crufdt and unused files -->

<!-- TODO maybe add CHECK contrainst to the grapes tables and stuff to not let it be too long and also contraints inside the TextINputs inhere -->

<!-- todo: SET UP policy to delete grapes after 30 days or something! https://supabase.com/blog/postgres-as-a-cron-server -->

<!-- TODO in THE WELCOME SCREEN will tell users, history only goes back 30 days...
? and then i need to make that policy happen in my backend
? in THE WELCOME SCREEN will tell users, history only goes back 30 days...
* yea maybe we dont go back farther than a month
* encourage users to save the ones they like as photos on their phone...
*    https://docs.expo.dev/tutorial/screenshot/
TODO so i need to set up a cron job to delete grapes older than 30 days
TODO and make those pages only fetch the first ten or so
TODO end --> 10 days or 2 weeks idk.. thinka about it... bc for peeps to show to their therapists and stuff


<!-- Maybe eventually for placeholder while wiating history to load: https://www.npmjs.com/package/react-native-easy-content-loader -->

<!-- TODO: go back in to grapes superbase and chage back the auth config that requiresd new users to confirm their email address before first login... AND THE CHANGE-EMAIL confirmation to be changed in Providers settings.
for  now i turned that off for testing -->

<!-- TODO to set up the subscribing to new posts... use https://supabase.com/docs/reference/javascript/subscribe -->

<!-- TODO: add a username field for during signup -->

<!-- TODO: will need to add approp RLS to supabase tables -->

<!-- TODO [future]: in top right header of grape_id page, have a button to save the day and it can export somewhere or better yet, Have it become a widget on their os... somehting... -->
<!-- * like an addToHomeScreen fucntion -->

<!-- !!!!!*************************** -->
<!-- TODO convert the site/redirect URLs to hold what im hosted on for when a password is changed .. or maybe not bc it still needs a confirm for ONLY the new one which is kind of nice if personno longer can access tehri old one..-->
<!-- ! Consider setting up a custom SMTP server for better email deliverability on your project "grapes-backend" (vvjtgmzgmrunbhvshgxy). Check our Production Readiness guide: https://supabase.com/docs/guides/platform/going-into-prod -->

// TODO limit fgield size like displayname and stuff 


<!-- TODO: convert the supabase sdk from v1 -> v2 -->
https://supabase.com/docs/reference/javascript/v1/upgrade-guide
<!--  TODO handle a user trying to ppick a userName that already exists -->


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





may consider using blobl storage as thuiis starts to get bigger but not yet