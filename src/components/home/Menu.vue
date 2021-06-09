<template>
<v-app-bar density="compact"  dark>
<v-img src="https://i.ibb.co/KGv8hBF/geeb-off-logo-text.png" max-height="160" max-width="225" @click="$router.push('/')"></v-img>
    <v-spacer></v-spacer>
    <v-btn v-show="showOverlay =='false'" @click="Logout">Log out </v-btn>
    <v-btn text>Spectate</v-btn>
    <v-btn class="mr-3">Help</v-btn>
    <v-btn v-show="showOverlay=='false'" class="mr-3" @click="$router.push('account-details')" >Account Details</v-btn>
    <v-divider inset vertical></v-divider>
          <v-btn
        class="mr-4 ml-5"
        color="primary"
        plain
      >
        <v-icon left icon="mdi-handshake-outline"></v-icon>
  
        <span v-show="showOverlay == 'false'" @click="showQueueModal">Join Queue</span>
        <span v-show="showOverlay == 'true'" @click="$router.push('register')">Create Account</span>
      </v-btn>
</v-app-bar>
</template>

<script>
import { ref, onBeforeMount } from 'vue';
import * as firebase from 'firebase';
export default{
    setup() {
        var showOverlay = ref("");
        onBeforeMount(() => {
          firebase.default.auth().onAuthStateChanged((user) => {
              console.log(user);
            if (user) {
            showOverlay.value ='false';
            }else if (!user) {
            showOverlay.value = 'true';
            }
          });
      });
    const Logout = () => {
    firebase.default.auth()
    .signOut()
    .then(() => console.log("signed out"))
    .catch(err => alert(err.message));
  }
    return {
      showOverlay,
      Logout
    }
    },
    data: function() {
        return { 
        }
    },
    methods: {
        showQueueModal() {
            this.$emit('send','data');
        }
    }

}
</script>
