<template>
        <iframe v-if="newStream"
    :src="url1+newStream+url3"
    height="100%"
    width="100%"
    allowfullscreen="true">
</iframe>
</template>

<script>

export default {
  props: [
    'newStream',
  ],
    data() {
        //cycle thru da streams
        return {
            url1: 'https://player.twitch.tv/?channel=',
            url3: '&parent=localhost',
            currentStream: 'rupturexx',
            frameWidth: '400px',
            frameHeight: '250px'
        }
        //c
    },
    watch: {
    }

}
</script>

<style>

</style>