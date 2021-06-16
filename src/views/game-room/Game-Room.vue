<template>
  <playerNavBar v-if="currentPlayerList" :newStream="currentPlayerName" :playersArray="currentMatchPlayersList"></playerNavBar>
      <v-row>
      <RoundTimer  :numberOfRounds="numberOfRounds"></RoundTimer>
    </v-row>
  <v-container v-if="currentPlayerList" fluid>
            <v-row id="background-img" align-content="center">
              <v-col xs="0" sm="0" md="1" lg="2" xl="2" ></v-col>
          <v-col xs="12" sm="12" md="10" lg="8" xl="8" cols="12" >
                <twitchVideo class="determineHeight" v-if="currentPlayerList" :newStream="currentPlayerName"></twitchVideo>
          </v-col>
          <v-col xs="0" sm="0" md="1" lg="2" xl="2"></v-col>

          <v-col sm="0" xl="4"></v-col>
      <v-col cols="12" sm="12" xl="4" align="center" class="voteButtons"  >
        <v-btn flat @click="voteNo" width="49%" left='true' style="background-color: red">Vote No</v-btn>
        <v-btn flat @click="voteYes" width="49%" right='true' style="background-color: green">Vote Yes</v-btn>
      </v-col>
      <v-col  sm="0" xl="4"></v-col>
      
        </v-row>
    <v-row class="element">
      <VoteBar :currentPlayerNumberOfVotes="currentPlayerNumberOfVotes"></VoteBar>
    </v-row>
  </v-container>
</template>

<script>
import twitchVideo from '../../components/game-room/twitch';
import playerNavBar from '../../components/game-room/players-menu';
import RoundTimer from '../../components/game-room/round-timer';
import { db } from '../../main';
import { auth } from '../../main.js';
import { VoteBar } from '../../components/game-room/vote-bar'

export default {

  created() {
    db.collection('match').onSnapshot((snapshotChange) => {
      this.currentMatchPlayersList = [];
      snapshotChange.forEach((doc) => {
        console.log(doc.data());
        this.currentMatchPlayersList.push({
          key: doc.id,
          name: doc.data().user,
          round: doc.data().round,
          failed: doc.data().failed,
          votes: doc.data().votes
        })
      })
    });
    db.collection('currentPlayerDB').onSnapshot((snapshotChange) => {
      this.currentPlayerList = [];
      this.currentPlayerName = '';
      snapshotChange.forEach((doc) => {
        if(this.halfwayUpdate == false) {
          this.numberOfRounds = this.numberOfRounds+1;
          this.userVoted = false;
        }
        this.halfwayUpdate = false;
        this.currentPlayerList.push({
          key: doc.id,
          name: doc.data().user,
          round: doc.data().round,
          failed: doc.data().failed,
          votes: doc.data().votes
        })
        this.currentPlayerName = doc.data().user;
        this.currentPlayerNumberOfVotes = doc.data().votes;
      })
    })
    auth.onAuthStateChanged((user) => {
            console.log(`user is ${user}`)
            if (user) {
              this.localUserData = auth.currentUser.uid;
              var userRef = auth.currentUser.uid;
              var docRef= db.collection('users').doc(userRef);
              docRef.get().then((doc) => {
                 if (doc.exists) {
                     console.log(doc.data());
                     this.localUserName = doc.data().displayName;
                     this.allowedVote = true;
                 } else {
                     console.log('no such document')
                 }
             }).catch((error) => {
                 console.log("Error getting document: ", error)
             });
            }else if (!user) {
              console.log('no user')
            }
            console.log(this.localUserName);
          });
  },

  components: {
    twitchVideo,
    playerNavBar,
    RoundTimer,
    VoteBar
  },
  beforeCreate() {
        this.$options.components.VoteBar = require('../../components/game-room/vote-bar').default;
  },
  watch: {
  },
  methods: {
    isAuthInMatch() {

    },
    //pass the result of the votes into the component, or we listen to firebase and sync the votes together
    // it may be better to sync the voting thru a component so we dont have to authenticate everyone here
    /*
     Only authenticated users should have perms to vote
    Those users should also be apart of the current game
    A user only has one vote, and it can be a positive or negative one.
    At the conclusion of the round, a player with negative votes shall be removed.
  */
    voteNo() {
      if(this.allowedVote && !this.userVoted){
        this.userVoted = true;
        this.halfwayUpdate = true;
        var currentNumVotes = 0;
        db.collection('currentPlayerDB').doc(this.currentPlayerName).get().then(doc => {
          currentNumVotes = doc.data().votes;
          db.collection("currentPlayerDB").doc(this.currentPlayerName).update({
            "votes": currentNumVotes-1
          }).then(() => {
            this.currentPlayerNumberOfVotes=  currentNumVotes-1;
            console.log("Number of votes has been added");
          })
        });
    }
    else if (!this.allowedVote)
    {
      console.log("You must be logged in for this feature")
    }
    else if (this.userVoted){
        console.log('You have already voted for this round:')
      }
    },
    voteYes() {
      if(this.allowedVote && !this.userVoted){
        this.halfwayUpdate = true;
        this.userVoted = true;
        var currentNumVotes = 0;
        db.collection('currentPlayerDB').doc(this.currentPlayerName).get().then(doc => {
          currentNumVotes = doc.data().votes;
          db.collection("currentPlayerDB").doc(this.currentPlayerName).update({
            "votes": currentNumVotes+1
          }).then(() => {
            this.currentPlayerNumberOfVotes=  currentNumVotes+1;
            console.log("Number of votes has been added");
          })
        });
    }
    else if (!this.allowedVote)
    {
      console.log("You must be logged in for this feature")
    }
    else if (this.userVoted){
        console.log('You have already voted for this round:')
      }
    }
  },
  data() {
    return {
     currentMatchPlayersList: [],
     newStream: null,
     currentPlayerList: [],
     numberOfRounds: 0,
     currentPlayerName: '',
     currentPlayerNumberOfVotes: '',
     localUserName: '',
     localUserData: '',
     allowedVote: false,
     halfwayUpdate: false,
     userVoted: false,
     width: window.innerWidth,
     height: window.innerHeight

    }
  }
}
</script>

<style>
    #background-img {
        background-image: url('../../assets/background-img-geeboff.png');
          /* background-color: #8f2c2c; */
        height: 84vh;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        position: relative;
        z-index: 1;
        padding-top: 13%;
    }
    .sizeIndication{
        background-color: greenyellow;
      }
    .determineHeight {
      height: 650px;
    }
    .voteButtons {
      margin-bottom: 15%;
    }
    
        @media only screen and (max-width: 1500px) {
      .determineHeight {
        height: 525px;
      }
      #background-img {
        height: 80vh;
      }
            .sizeIndication{
        background-color: yellow;
      }
    }
        @media only screen and (max-width: 1364px) {
      .determineHeight {
        height: 495px;
      }
      #background-img {
        height: 80vh;
      }
            .sizeIndication{
        background-color: green;
      }
    }
        @media only screen and (max-width: 960px) {
      .determineHeight {
        height: 420px;
      }
      #background-img {
        height: 80vh;
      }
      .sizeIndication{
        background-color: red;
      }
    }

    @media only screen and (max-width: 600px) {
      .determineHeight {
        height: 330px;
      }
      #background-img {
        height: 75vh;
        padding-top: 25%;
      }
      .sizeIndication{
        background-color: orange;
      }
      .voteButtons {
      margin-bottom: 20%;
    }

    }

.element {
  position:fixed;
  bottom:0;
  width:100%;
}



</style>