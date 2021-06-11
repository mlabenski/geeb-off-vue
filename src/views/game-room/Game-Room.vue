<template>
  <playerNavBar v-on:switch-stream="newStream = $event" :playersArray="currentMatchPlayersList"></playerNavBar>
  
  <h2>New stream {{newStream}}</h2>
  <twitchVideo :newStream="newStream"></twitchVideo>
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
  data() {
    return {
     currentMatchPlayersList: [],
     newStream: 'ruptureXX'
    }
  }
}
</script>

<style>

</style>