## Future ToDos


### 1.0.0

<!-- TODO [future]: in top right header of grape_id page, have a button to save the day and it can export somewhere or better yet, Have it become a widget on their os... somehting... -->
<!-- * like an addToHomeScreen fucntion -->

<!-- ?[FUTURE] a customizavle widget for their homescreen that displays their current days agenda or displays urge to go mke ojne for today if they havent yet -->

<!-- *
* encourage users to save the ones they like as photos on their phone...
*    https://docs.expo.dev/tutorial/screenshot/ -->
<!--? [FUTURE] may consider using blobl storage as thuiis starts to get bigger but not yet -->


 <!-- TODO add option to delete a grape from the global feed if its their own? -->

 <!-- TODO remove all dependencies and imports for rapi-ui stufff.. replace with native -->

<!--?? TODO clear out shared_letters at a certain interval? -->

### Lets wait and see how users respond to the app before we do these:
<!-- TODO make only THE DISPLAY of the date titles be in local.. keeping everything else utc  -->
<!-- TODO make the edit pressable be a full width button underneath each letter in Home-> Edit -->

#### If things are SLOW: 
<!-- TODO: some caching may be helpful for Homeservices... if needed --> 
    - import useCachedResources from "react-native-rapi-ui/hooks/useCachedResources";

 <!-- ? I do wonder.. should i get all my logic and helpers like this into a grpahql server? and just hit those endpoints in the lightwight client?... wait and see how users respond if its too slow ort anythign -->
<!--* also.. if seems slow.. consider:   -->
    - i cuuuud just useGlobalService and like make it agnostic to the table name
    - but i think i like the idea of having a service for each table
 <!-- TODO i could prob just have one Serivec fil;e like DBservice and combine all of these services into one file with multiple classes... -->