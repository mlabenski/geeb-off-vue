<template>
    <div>
        <v-container fluid >
            <v-row id="landing-page" style="z-index: 1">
                <Banner v-if="displayBanner"></Banner>
                <v-col>
                </v-col>
                <v-col  style="z-index: 2">
                    <v-card  v-if="displayCreateAccount == false && displayLoginAccount == false" class="pa-5 z-index-check" title max-width="800" min-width="3" elevation="24">
                        <v-img
                        lazy-src="https://i.ibb.co/nQy9135/gravity-Bong.png"
                        max-height="400"
                        max-width="500"
                        src="https://i.ibb.co/nQy9135/gravity-Bong.png"
                        ></v-img>
                    <v-card-text class="bannerText">Virtual Toking Circle</v-card-text>
                    <v-divider class="mx-4"></v-divider>
                      <v-card-actions>
                        <v-btn class="computer-resize">In Queue: 20</v-btn>
                        <v-btn class="computer-resize" style="align:center;">In game: 6</v-btn>
                    </v-card-actions>
                    </v-card>
        <v-card style="z-index: 3" id="createAccount" v-if="displayCreateAccount" class="pa-5 z-index-check" title max-width="600" elevation="24">
                        <v-img class="leftbox"
                        id="geeb-off-login-img"
                        lazy-src="https://i.ibb.co/nQy9135/gravity-Bong.png"
                        max-height="120"
                        max-width="90"
                        src="https://i.ibb.co/nQy9135/gravity-Bong.png"
                        ></v-img>
                    <v-card-title class="bannerText rightbox" style="max-height: 150px">Register an Acc</v-card-title>
                    <form @submit.prevent="Register">
                     <v-card-header-text>  <v-card-text class="email-text">
                         Email</v-card-text>
                     <input type="text" v-model="email" class="email-form" placeholder="Press tab to enter data:"/>
                     </v-card-header-text>
                     <v-card-header-text>  <v-card-text class="password-text">
                         Password</v-card-text>
                     <input type="password" v-model="password1" class="password-form" placeholder="Press tab to enter password:"/>
                     </v-card-header-text>
                           <v-btn
        flat
        type="submit"
        color="secondary"
        class="login-btn-submit"
      >
        Submit w/ Enter
      </v-btn></form>
            <v-divider class="mx-4"></v-divider>
        </v-card>

        <v-card id="login" style="z-index: 3" v-if="displayLoginAccount" class="pa-5 z-index-check" title max-width="600" elevation="24">
                        <v-img class="leftbox"
                        id="geeb-off-login-img"
                        lazy-src="https://i.ibb.co/nQy9135/gravity-Bong.png"
                        max-height="120"
                        max-width="90"
                        src="https://i.ibb.co/nQy9135/gravity-Bong.png"
                        ></v-img>
                    <v-card-title class="bannerText rightbox" style="max-height: 150px">Login to Geeboff</v-card-title>
                    <form @submit.prevent="Login">
                     <v-card-header-text>  <v-card-text class="email-text">
                         Email</v-card-text>
                     <input type="text" v-model="loginEmail" class="email-form" placeholder="Press tab to enter data:"/>
                     </v-card-header-text>
                     <v-card-header-text>  <v-card-text class="password-text">
                         Password</v-card-text>
                     <input type="password" v-model="loginPassword" class="password-form" placeholder="Press tab to enter password:"/>
                     </v-card-header-text>
                           <v-btn
        flat
        type="submit"
        color="secondary"
        class="login-btn-submit"
      >
        Submit w/ Enter
      </v-btn></form>
            <v-divider class="mx-4"></v-divider>
        </v-card>
                </v-col>
                <v-col>  
                </v-col>
            </v-row >

            <v-row class="secondLanding" >
                <v-col>
                    <v-card class="pa-2 secondLandingPush" title max-width="370" color="white" elevation="24" shaped rounded>
                    <v-card-text style="font-size: 2.1em; text-align:center; font-weight:500;">Next match</v-card-text>
                    <v-divider class="mx-8"></v-divider>
                    <v-card-subtitle><BaseTimer/></v-card-subtitle>
                                        <v-divider class="mx-8"></v-divider>
                      <v-card-actions>
                        <v-btn>Join Queue</v-btn>

                        <v-btn>Learn the Game</v-btn>
                    </v-card-actions>
                    </v-card>
                </v-col>
<v-col>
                    <v-card class="pa-2" title max-width="370" color="white" elevation="24" shaped rounded>
                    <v-card-text style="font-size: 2.1em; text-align:center; font-weight:500;">Queue</v-card-text>
                    <v-divider class="mx-8"></v-divider>
                    <v-card-text>
                        <v-simple-table fixed-header>
                            <template v-slot:default>
                            <thead>
                                <tr>
                                    <th class="text-left">Name</th>
                                </tr>
                            </thead>
                            <tbody>
                            <tr v-for="player in queuedPlayers" :key="player.name">
                                <td> {{player.name}}
                                </td>
                            </tr>
                            </tbody>
                            </template>
                        </v-simple-table>
                    </v-card-text>
                                        <v-divider class="mx-8"></v-divider>
                      <v-card-actions>
                        <v-btn>Join Queue</v-btn>

                        <v-btn>Learn the Game</v-btn>
                    </v-card-actions>
                    </v-card>
                </v-col>
                <v-col>
                    <v-card class="pa-2" title max-width="370" color="white" elevation="24" shaped rounded>
                    <v-card-text style="font-size: 2.1em; text-align:center; font-weight:500;">Current Match</v-card-text>
                    <v-divider class="mx-4"></v-divider>
                    <v-card-text>
                        <v-simple-table fixed-header>
                            <template v-slot:default>
                            <thead>
                                <tr>
                                    <th class="text-left">Name</th>
                                     <th class="text-right">Round #</th>
                                </tr>
                            </thead>
                            <tbody>
                            <tr v-for="player in currentPlayers" :key="player.name">
                                <td> {{player.name}}
                                </td>
                                <td> {{player.round}}
                                </td>
                            </tr>
                            </tbody>
                            </template>
                        </v-simple-table>
                    </v-card-text>
                                        <v-divider class="mx-8"></v-divider>
                      <v-card-actions>
                        <v-btn center>Spectate</v-btn>
                    </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
</v-container>
</div>
</template>

<script>
import BaseTimer from "./BaseTimer"
import Banner from "../banners/banner"
import {ref} from 'vue';
import * as firebase from 'firebase';
export default {
    props: ['queuedPlayers', 'currentPlayers', 'displayCreateAccount', 'displayLoginAccount'],
    components: {
        BaseTimer,
        Banner
    },
    setup() {
        const email = ref("");
        const password1 =ref("");
        const loginEmail =ref("");
        const loginPassword = ref("");
        const Login = () => {
          firebase.default.auth()
          .signInWithEmailAndPassword(loginEmail.value,loginPassword.value)
          .then(data => console.log(data))
          .catch(err => alert(err.message));
        }
        const Register = () => {
            firebase.default.auth()
            .createUserWithEmailAndPassword(email.value, password1.value)
            .then(user => {
                alert(user);
            })
            .catch(err => alert(err.message));
        }
    return {
        Login,
        loginEmail,
        loginPassword,
        Register,
        email,
        password1
    }
    },
  data() {
    return {
      alignments: [
      'start',
      'center',
      'end',
    ],
    timeUntilMatch: "15:00",
    minutesUntilMatch: 0,
    secondsUntilMatch: 0,
    displayBanner: true
    }
  },
  methods: {
      onLoginSubmit() {
      },
      onRegisterSubmit(){
      },
      removeBanner() {
          this.displayBanner = true;
          setTimeout(() => this.displayBanner = false, 5000);
      }
  },
  mounted() {
      this.removeBanner();
  }
}
</script>

<style>
    #landing-page {
        background-image: url('../background.jpg');
          /* background-color: #8f2c2c; */
        height: 100vh;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        position: relative;
        padding-bottom: 5%; 
        padding-top: 2%
    }
    .secondLanding {
        background-color: #1F7087; 
        margin-top: 5%; 
        padding-left: 30px; 
        padding-bottom: 100px;
    }
    .bannerText {
        font-size: 1.9em!important;
        line-height: 1.8;
        text-align:center;
    }
    .z-index-check {
        z-index: 1;
        background-color: rgba(255, 255, 255, 0.753);
    }
    .computer-resize{
        margin-left: 24%;
    }
    .leftbox {
        float: left;
        width: 25%;
        height: 200px;
        z-index: 10;
    }
    .rightbox {
        float: right;
        width: 69%;
        height: 200px;
        z-index: 10;
    }
    .email-text {
    margin-top: 125px; 
    margin-left: 16.9%; 
    font-size: 25px; 
    font-weight: 800; 
    text-align:center;
    }
    .password-text {
    margin-top: 20px; 
    margin-left: 16.0%; 
    font-size: 25px; 
    font-weight: 800; 
    text-align:center;
    }
    .email-form {
    margin-left: 42%;
    }
    .password-form {
    margin-left: 42%; 
    margin-bottom: 5%;
    }
    .login-btn-submit {
      left: 43%;
    }
    .login-btn-exit {
        
        margin-left:70px; 
        z-index:30;
    }
    @media only screen and (max-width: 1600px) {
        .bannerText{
          font-size: 1.9em!important;
          line-height: 1.8;
          text-align:center;
        }
        .rightbox {
        float: right;
        width: 60%;
        height: 200px;
        z-index: 10;
        }
        .email-text {
        margin-left: 22.9%; 
        }
        .password-text {
        margin-left: 22.0%; 
        }
    }
    @media only screen and (max-width: 1250px) {
        .computer-resize {
            left: -45px;
        }
        .email-text {
        margin-left: 0%; 
        }
        #geeb-off-login-img {
            display: none;
        }
        .rightbox {
        width: 100%;
        padding-left: 28%;
        height: 200px;
        z-index: 10;
        }
        .password-text {
        margin-top: 20px; 
        margin-left: 0%; 
        }
        .email-form {
        margin-left: 26%;
        }
        .password-form {
        margin-left: 26%;
        margin-bottom: 5%;
        }
        .login-btn-submit {
            left: 25%;
    }
    }
    @media only screen and (max-width: 900px) {
        .first-landing-page {
            padding-bottom: 15%;
        }
    }
        @media only screen and (max-width: 900px) {
        .bannerText {
          font-size: 1.9em!important;
          line-height: 1.8;
          text-align:center;
        }
        #landing-page {
            background-size: 900px, 800px;
            min-height: 570px;
          padding-bottom: 120px;
            margin-bottom: 50px;
        }

          #landing-page {
            height: 120vh;
          }

          .computer-resize {
            left: -55px;
        }
        .secondLanding {
        margin-top: 0%; 
        padding-left: 1%; 
        }
        .secondLandingPush{
            margin-top:50px;
        }
    }
</style>