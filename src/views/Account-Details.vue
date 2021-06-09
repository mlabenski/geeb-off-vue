<template>
  <Menu></Menu>
    <div>
        <detailedList :userDataUploaded="userDataUploaded" v-on:new_username_submit="eventChild"></detailedList>
    </div>
</template>

<script>

import Menu from '../components/home/Menu.vue'
import { ref, onBeforeMount } from 'vue';
import { db } from '../main';
import { auth } from '../main';
import detailedList from '../components/account-details/detailed-list.vue';
export default {

    setup () {
        const name = ref("");
    onBeforeMount(() => {
      const user = auth.currentUser;
      console.log(user);
      if (user) {
        name.value = user.email.split('@')[0];
      }
    });
        return {
            name,
            auth
        }
    },
      data() {
        return {
        userDataUploaded: []
        }
    },
      created() {
          //build the initial database for this user
          function createUserProfile() {
                        db.collection("users").doc(auth.currentUser.uid).set({
              displayName: auth.currentUser.email.split('@')[0],
              stats: {
                  matches: 0,
                  totalGeebs: 0,
                  totalWins: 0
              },
              premium: false,
              profilePictureURL: 'https://i.ibb.co/nQy9135/gravity-Bong.png'
          }).then(function() {
              console.log('Profile created')
          })
          }
              var docRef = db.collection("users").doc(auth.currentUser.uid);
              docRef.get().then((doc) => {
                  if(doc.exists) {
                      var userData = doc.data();
                      //console.log(doc.data());
                      this.userDataUploaded.push({
                          username:doc.data().displayName, 
                          premium:doc.data().premium, 
                          profilePicture:doc.data().profilePictureURL, 
                          matches:doc.data().stats.matches, 
                          totalGeebs:doc.data().stats.totalGeebs, 
                          totalWins:doc.data().stats.totalWins});
                      console.log('added userdata to variable in data ' + userData.toString());
                    //maybe we pass them into a user document at this point?
                  } else {
                      console.log(' no such document, lets create one here');
                      createUserProfile();
                  }
              }).catch((error) => {
                  console.log("error getting doc info: ", error);
              })
      },
        components: {
        Menu,
        detailedList
        },
        methods: {
            eventChild(value) {
                //edit the username
                var docRef = db.collection("users").doc(auth.currentUser.uid);
                return docRef.update({
                    displayName: value
                }).then(() => {
                    console.log("Document successfully updated!")
                })
                .catch((error)=> {
                    console.log("error updating document ", error);
                })
            }
        }
}
</script>

<style lang="scss" scoped>

</style>