<template>
        <iframe v-if="currentStream"
    :src="url1+currentStream+url3"
    height="600px"
    width="900px"
    allowfullscreen="true">
</iframe>
      <v-btn
        outlined
        color="primary"
      >
        Outlined Button
      </v-btn>
</template>

<script>

export default {
  props: [
    'newStream'
  ],
    data() {
        //cycle thru da streams
        return {
            url1: 'https://player.twitch.tv/?channel=',
            url3: '&parent=localhost',
            currentStream: 'rupturexx',
        }
        //c
    },

}
</script>

<style>

</style>