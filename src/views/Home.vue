<template>
  <Menu v-on:send="clickedQueue" v-on:createAccount="clickedCreateAccount" v-on:login="clickedLogin"></Menu>
  <QueueForm v-if="displayQueueModal===true" @leaveModel="clickedLeaveModel"></QueueForm>
  <FirstSection :displayLoginAccount="displayLoginAccount" :queuedPlayers="queuedPlayersList" :currentPlayers="currentMatchPlayersList" :displayCreateAccount="displayCreateAccount"></FirstSection>
  <SecondSection></SecondSection>

      <button class="logout" @click="Logout" />
</template>

<script>
import  QueueForm  from '../components/home/QueueForm.vue';
import Menu from '../components/home/Menu.vue';
import FirstSection from '../components/home/Home-First-Section.vue';
import SecondSection from '../components/home/Home-Second-Section.vue';
import { ref, onBeforeMount } from 'vue';
import  { db } from '@/main';
import { auth } from '@/main';

export default {

  data() {
    return {
      queuedPlayersList: [],
      currentMatchPlayersList: [],
      displayQueueModal: false,
      displayCreateAccount: false,
      displayLoginAccount: false
    }
  },
  created() {
    db.collection('queue').onSnapshot((snapshotChange) => {
      this.queuedPlayersList = [];
      snapshotChange.forEach((doc) => {
        this.queuedPlayersList.push({
          key: doc.id,
          name: doc.data().user
        })
      })
    })
    db.collection('match').onSnapshot((snapshotChange) => {
      this.currentMatchPlayersList = [];
      snapshotChange.forEach((doc) => {
        console.log(doc.data());
        this.currentMatchPlayersList.push({
          key: doc.id,
          name: doc.data().user,
          round: doc.data().round
        })
      })
    })
  },
  methods: {
    clickedQueue() {
      console.log("data is being sent at this point")
      this.displayQueueModal = true;
    },
    clickedCreateAccount() {
      if(this.displayLoginAccount == true) {
        this.displayLoginAccount = false;
        this.displayCreateAccount = true;
      }
      else if(this.displayCreateAccount == true){
        this.displayCreateAccount = false;
      }
      else {
        this.displayCreateAccount = true;
      }
    },
    clickedLeaveModel() {
      console.log("left model")
      this.displayQueueModal = false
      this.displayLoginAccount = false;
    },
    clickedLogin(){
      console.log("logging in to dis bitch")
      if(this.displayCreateAccount == true) {
        this.displayCreateAccount = false;
        this.displayLoginAccount = true;
      }
      else if(this.displayLoginAccount == true){
        this.displayLoginAccount = false;
      }
      else {
        this.displayLoginAccount = true;
      }
    }
  },
  components: {
    Menu,
    FirstSection,
    QueueForm,
    SecondSection
  },
  setup () {
    const name = ref("");
    onBeforeMount(() => {
      const user = auth.currentUser;
      if (user) {
        name.value = user.email.split('@')[0];
      }
    });
  const Logout = () => {
    auth
    .signOut()
    .then(() => console.log("signed out"))
    .catch(err => alert(err.message));
  }

    return {
      name,
      Logout
    }
  }
}
</script>
