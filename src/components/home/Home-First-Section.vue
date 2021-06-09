<template>
    <div>
        <v-container >
            <v-row id="landing-page" style="padding-bottom: 50px; padding-top: 2%">
                <v-col>
                </v-col>
                <v-col>
                    <v-card  v-if="displayCreateAccount == false && displayLoginAccount == false" class="pa-5 z-index-check" title max-width="600" elevation="24">
                        <v-img
                        lazy-src="https://i.ibb.co/nQy9135/gravity-Bong.png"
                        max-height="400"
                        max-width="500"
                        src="https://i.ibb.co/nQy9135/gravity-Bong.png"
                        ></v-img>
                    <v-card-text class="bannerText">Virtual Smoking Competition</v-card-text>
                    <v-divider class="mx-4"></v-divider>
                      <v-card-actions>
                        <v-btn class="computer-resize">In Queue: 20</v-btn>
                        <v-btn class="computer-resize" style="align:center;">In game: 6</v-btn>
                    </v-card-actions>
                    </v-card>
                    <v-card id="createAccount" v-if="displayCreateAccount" class="pa-5 z-index-check" title max-width="600" elevation="24">
                        <v-img class="leftbox"
                        lazy-src="https://i.ibb.co/nQy9135/gravity-Bong.png"
                        max-height="120"
                        max-width="90"
                        src="https://i.ibb.co/nQy9135/gravity-Bong.png"
                        ></v-img>
                    <v-card-title class="bannerText rightbox" style="max-height: 150px">Create an Account</v-card-title>
                     <form @submit.prevent="Register">
                     <v-card-header-text>  <v-card-text style="margin-top: 125px; margin-left: 86px; font-size: 25px; font-weight: 800; text-align:center;">Email</v-card-text>
                           
                     <input type="text" v-model="email" style="margin-left: 219px;" placeholder="Press tab to enter data:"/>
                     </v-card-header-text>
                     <v-card-header-text>  <v-card-text style="margin-top: 20px; margin-left: 72px; font-size: 25px; font-weight: 800; text-align:center;">Password</v-card-text>
                     <input type="password" v-model="password1" style="margin-left: 205px;" placeholder="Press tab to enter password:"/>
                     </v-card-header-text>
                           <v-btn
        flat
        color="secondary"
        style="margin-left: 40%; margin-bottom: 25px;"
      >
        Submit w/ Enter
      </v-btn>   <input type="submit" value="Register"></form><v-btn style="margin-left:70px; margin-bottom: 20px; z-index:30"
          icon="mdi-exit-to-app"
          color="red"> </v-btn>
            <v-divider class="mx-4"></v-divider>
        </v-card>

        <v-card id="createAccount" v-if="displayLoginAccount" class="pa-5 z-index-check" title max-width="600" elevation="24">
                        <v-img class="leftbox"
                        lazy-src="https://i.ibb.co/nQy9135/gravity-Bong.png"
                        max-height="120"
                        max-width="90"
                        src="https://i.ibb.co/nQy9135/gravity-Bong.png"
                        ></v-img>
                    <form @submit.prevent="Login">
                    <v-card-title class="bannerText rightbox" style="max-height: 150px">Login to Geeboff</v-card-title>
                     <v-card-header-text>  <v-card-text style="margin-top: 125px; margin-left: 86px; font-size: 25px; font-weight: 800; text-align:center;">Email</v-card-text>
                     <input type="text" v-model="loginEmail" style="margin-left: 219px;" placeholder="Press tab to enter data:"/>
                     </v-card-header-text>
                     <v-card-header-text>  <v-card-text style="margin-top: 20px; margin-left: 72px; font-size: 25px; font-weight: 800; text-align:center;">Password</v-card-text>
                     <input type="password" v-model="loginPassword" style="margin-left: 205px; margin-bottom: 50px" placeholder="Press tab to enter password:"/>
                     </v-card-header-text>
                           <v-btn
        flat
        color="secondary"
        style="margin-left: 40%; margin-bottom: 25px;"
      >
        Submit w/ Enter
      </v-btn>     <input type="submit" value="Login"></form><v-btn style="margin-left:70px; margin-bottom: 20px; z-index:30"
          icon="mdi-exit-to-app"
          color="red"
        />
            <v-divider class="mx-4"></v-divider>
        </v-card>
                </v-col>
                <v-col>  
                </v-col>
            </v-row >

            <v-row style="background-color: #1F7087; padding-top: 70px; padding-left: 30px; padding-bottom: 100px;">
                <v-col>
                    <v-card class="pa-2" title max-width="370" color="white" elevation="24" shaped rounded>
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
import {ref} from 'vue';
import * as firebase from 'firebase';

export default {
    props: ['queuedPlayers', 'currentPlayers', 'displayCreateAccount', 'displayLoginAccount'],
    components: {
        BaseTimer,
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
    }
  },
  methods: {
      onLoginSubmit() {

      },
      onRegisterSubmit(){

      }
  }
}
</script>

<style>
    #landing-page {
        background-image: url('../background.jpg');
          /* background-color: #8f2c2c; */
        height: 80vh;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        position: relative;
        z-index: 1;
    }
    .bannerText {
        font-size: 2.3em;
    }
    @media only screen and (max-width: 900px) {
        .bannerText {
            font-size: 1.8em;
        }
        .z-index-check {
            width: 300px;
            height: 400px;
        }
        #landing-page {
            height: 60vh;
        }
        .computer-resize {
            left: -55px;
        }
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
                .middlebox{
                float:left; 
                background:Green;
                width:50%;
                height:280px;
            }
</style>