<template>
  <playerNavBar v-if="currentPlayerList" :newStream="currentPlayerName" :playersArray="currentMatchPlayersList"></playerNavBar>
  <v-container v-if="currentPlayerList" fluid>
    <v-row>
      <RoundTimer  :numberOfRounds="numberOfRounds"></RoundTimer>
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
        this.numberOfRounds = this.numberOfRounds+1;
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
  },

  components: {
    twitchVideo,
    playerNavBar,
    RoundTimer
  },
  props: {
    // we either populate with this one, but we lose the realtime data stream
    // or just recreate the firebase stream here
  },
  watch: {
  },
  methods: {
  },
  data() {
    return {
     currentMatchPlayersList: [],
     newStream: null,
     currentPlayerList: [],
     numberOfRounds: 0,
     currentPlayerName: ''
    }
  }
}
</script>

<style>

</style>