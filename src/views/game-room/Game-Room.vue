<template>
  <playerNavBar v-if="currentPlayerList" :newStream="currentPlayerName" :playersArray="currentMatchPlayersList"></playerNavBar>
  <v-container v-if="currentPlayerList" fluid>
    <v-row>
      <RoundTimer  :numberOfRounds="numberOfRounds"></RoundTimer>
    </v-row>
    <v-row>
      <VoteBar></VoteBar>
    </v-row>
    <v-row>
        <v-btn flat @click="voteNo">Vote No</v-btn>
        <v-btn flat @click="voteYes">Vote Yes</v-btn>
    </v-row>
        <v-row>
          <v-col>
          </v-col>
          <v-col>
                <twitchVideo v-if="currentPlayerList" :newStream="currentPlayerName"></twitchVideo>
          </v-col>
          <v-col>
          </v-col>

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
        db.collection('currentPlayerDB').doc(this.currentPlayerName).get().then(doc => {
          var currentNumVotes = doc.data().votes;
          db.collection("currentPlayerDB").doc(this.currentPlayerName).update({
            "votes": currentNumVotes-1
          }).then(() => {
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
        db.collection('currentPlayerDB').doc(this.currentPlayerName).get().then(doc => {
          var currentNumVotes = doc.data().votes;
          db.collection("currentPlayerDB").doc(this.currentPlayerName).update({
            "votes": currentNumVotes+1
          }).then(() => {
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
     localUserName: '',
     localUserData: '',
     allowedVote: false,
     halfwayUpdate: false,
     userVoted: false
    }
  }
}
</script>

<style>

</style>