<template>
        <iframe v-if="newStream"
    :src="url1+newStream+url3"
    height="600px"
    width="900px"
    allowfullscreen="true">
</iframe>
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