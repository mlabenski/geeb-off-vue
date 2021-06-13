<template>
    <div class="queue-form" style="width: 700px; padding-top: 20px;" @mouseover="hover = true"
        @mouseleave="hover = false">
        <v-container class="grey lighten-5" >
        <v-row no-gutters>
        <span v-if="hover" style="color: red">Warning! The username you'll sign up with is: <span style="font-size: 16px">{{username}}</span></span>
    </v-row>
    <v-row no-gutters>
    <v-col           cols="12"
          sm="6"
          md="8">
    <v-btn
        rounded="pill"
        color="primary"
        @click="signupUser"
      >Join Queue
      </v-btn>
        <v-btn style="margin-left: 15px"
        rounded="pill"
        color="primary"
        @click="$router.push('account-details')"
      >Change Username
      </v-btn>
              <v-btn @click="closeModel"
            style="margin-left:10px;"
          icon="mdi-backspace-reverse"
          color="red"
        />

        </v-col>
    </v-row>
    </v-container>
    </div>
</template>

<script>
import { functions } from 'C:/Users/coca_cola/Desktop/vue/geeb-off-vue-new/src/main.js';
import { auth } from 'C:/Users/coca_cola/Desktop/vue/geeb-off-vue-new/src/main.js';
import { db } from 'C:/Users/coca_cola/Desktop/vue/geeb-off-vue-new/src/main.js';

export default {
    name: "QueueForm",
    data() {
        return {
            userJoiningQueue: [],
            username: '',
            hover: false,
        }
    },
      created() {
          //this is def broken cuz we dont check for a user clicking button
            const user = auth.currentUser.uid;
             var docRef= db.collection('users').doc(user);
            docRef.get().then((doc) => {
                 if (doc.exists) {
                     console.log(doc.data());
                     this.username = doc.data().displayName
                 } else {
                     console.log('no such document')
                 }
             }).catch((error) => {
                 console.log("Error getting document: ", error)
             });
             console.log(this.username);
      },
    methods: {
            signupUser() {

                var addUserToQueue = functions.httpsCallable('request');
                addUserToQueue({user: this.username}).then((res) => {
                    const alert = alert(`${this.username} was added to the queue`+ res)
                     }).catch(err => {
                 console.log(err)
                     })
            },
            closeModel() {
                this.$emit('leaveModel', 'fake data')
            }
    }
}

</script>

<style>

</style>