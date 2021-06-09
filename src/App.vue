<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import { onBeforeMount } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import * as firebase from 'firebase';

export default {
  setup () {
    const router = useRouter();
    const route = useRoute();

    onBeforeMount(() => {
      firebase.default.auth().onAuthStateChanged((user) => {
        if (!user) {
          router.replace('/');
        } else if (route.path == "/login" || route.path == "/register") {
          router.replace('/');
        }
      });
  });
  }
}

</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

</style>