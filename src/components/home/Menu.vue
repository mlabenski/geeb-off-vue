<template>
<v-app-bar density="compact"  dark>
  <v-app-bar-nav-icon @click.stop="openMobileNavBar = !openMobileNavBar" v-if="showMobileNav"></v-app-bar-nav-icon>

<v-img  src="https://i.ibb.co/KGv8hBF/geeb-off-logo-text.png" class="logoGeeb" max-height="160" max-width="225" @click="$router.push('/')"></v-img>
    <v-spacer v-if="!showMobileNav"></v-spacer>
    <v-btn v-show="showOverlay =='false'" @click="Logout">Log out </v-btn>
    <v-btn v-if="!showMobileNav"  @click="$router.push('game-room')" text>Spectate</v-btn>
    <v-btn v-if="!showMobileNav"  class="mr-3">Help</v-btn>
    <v-btn v-if="!showMobileNav" v-show="showOverlay=='false'" class="mr-3" @click="$router.push('account-details')" >Account Details</v-btn>
    <v-divider v-if="!showMobileNav" inset vertical ></v-divider>
          <v-btn
        class="mr-4 ml-5"
        color="primary"
        v-show="showOverlay == 'true'"
        plain
      >
        <span v-if="showOverlay == 'true'" class="login" @click="login">Log in</span>
      </v-btn>
                <v-btn
        class="mr-4 ml-5"
        color="primary"
        plain
        v-if="!showMobileNav && !showOverlay"
      >
        <span  @click="showQueueModal">Enter Queue</span>
              </v-btn>
                <v-btn
        class="mr-4 ml-5"
        color="primary"
        v-show="showOverlay == 'true'"
        plain
      >
        <span v-show="showOverlay == 'true'" class="createAcc" v-if="!showMobileNav" @click="showCreateAccountModal">Create Account</span>
        <span v-show="showOverlay == 'true'" class="createAcc"  v-if="showMobileNav" @click="showCreateAccountModal">Create Acc</span>
      </v-btn>
</v-app-bar>

<v-navigation-drawer
        v-model="openMobileNavBar"
        absolute
        bottom
        temporary
        style="background-color: transparent"
      >
      <v-container>
      <v-row style="padding-bottom: 10%;">
              <v-btn
        flat
        size="large"
        color="green"
        @click="$router.push('game-room')"
      >
        Spectate Match
      </v-btn>
      </v-row>
      <v-row style="padding-bottom: 10%;" >
              <v-btn
        flat
        color="green"
        size="large"
      >
        Join Queue
      </v-btn>
      </v-row>
      <v-row style="padding-bottom: 10%;">
              <v-btn
        flat
        color="green"
        size="large"
        v-show="showOverlay == 'false'"
      >
        Logout
      </v-btn>
      </v-row>
      </v-container>

      </v-navigation-drawer>


</template>
<style>
     @media only screen and (max-width: 1250px) {
        v-btn {
          font-size: 10px;
        }
        .createAcc {
          font-size: .95em;
          padding: 0,0,0,0;
          margin: 0,0,0,25px;
        }
        .login {
          font-size: .95em;
          margin-left:15px;
          margin-right:0px;
          padding: 0,0,0,0;
          float: right;
          color: black;
        }
        .logoGeeb {
          width: 145px;
          height: 45px;
        }
    }
</style>

<script>
// either shrink the menu (collapse) for smaller phones, or we change the font size.
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
    mounted() {
      this.windowWidth = window.innerWidth
      window.addEventListener('resize', () => {
        this.windowWidth = window.innerWidth
      })
    },
    data: function() {
        return { 
          openMobileNavBar: false,
          group: null,
          windowWidth: null,
          showMobileNav: false,
        }
    },
    watch: {
      group() {
        this.openMobileNavBar = false;
      },
      windowWidth(){
        if(this.windowWidth < 800){
          this.showMobileNav = true;
        } else {
          this.showMobileNav = false;
        }
      }
    },
    methods: {
        showQueueModal() {
            this.$emit('send','data');
        },
        showCreateAccountModal() {
          this.$emit('createAccount', 'true')
        },
        login() {
          this.$emit('login', 'true')
        },
    }
}
</script>
