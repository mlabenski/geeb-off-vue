<template>
  <playerNavBar v-if="currentPlayerList" :newStream="'rupturexx'" :playersArray="currentMatchPlayersList"></playerNavBar>
  <v-container v-if="currentPlayerList" fluid>
    <v-row>
      <v-sheet color="red" elevation="1" height="75px" :width="timerLength">
        <h2 style="color: white">Time remaining</h2>
      </v-sheet>
    </v-row>
    <v-row>
      <v-sheet color="red" elevation="1" height="75px" width="100%">
        <h2 style="color: white">Number of votes</h2>
      </v-sheet>
    </v-row>
        <v-row>
          <v-col>
          </v-col>
          <v-col>
                      <twitchVideo v-if="currentPlayerList" :newStream="'rupturexx'"></twitchVideo>
          </v-col>
          <v-col>
          </v-col>

        </v-row>
  </v-container>
</template>

<script>
import twitchVideo from '../../components/game-room/twitch';
import playerNavBar from '../../components/game-room/players-menu';
import { db } from '../../main';
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
      snapshotChange.forEach((doc) => {
              this.newTurn = true;
        this.currentPlayerList.push({
          key: doc.id,
          name: doc.data().user,
          round: doc.data().round,
          failed: doc.data().failed,
          votes: doc.data().votes
        })
      })
    })
  },

  components: {
    twitchVideo,
    playerNavBar
  },
  props: {
    // we either populate with this one, but we lose the realtime data stream
    // or just recreate the firebase stream here
  },
  watch: {
    newTurn(value){
      //this should run anytime a new player is sent to the firebase server.
      if(value){
        this.timerLength = "100%";
        this.calculateTimerLength();
        //maybe we reset the timer? 
        //reset the time limit, and store it inside a setTimeout to give the server time to reset?

      }
    }
  },
  methods: {
      calculateTimerLength(){
        var countdownPercent = 100;
        setTimeout(() => {
          if(this.timer > 1) {
          this.timer = this.timer-1;
          countdownPercent = this.timer*.8333;
          this.timerLength = countdownPercent.toString()+'%';
          this.calculateTimerLength()
          }
        }, 1000)
      },
  },
  data() {
    return {
     currentMatchPlayersList: [],
     newStream: null,
     currentPlayerList: [],
     timer: 120,
     currentUserNumber: null,
     newTurn: false,
     timerLength: '100%',
    }
  }
}
</script>

<style>

</style>