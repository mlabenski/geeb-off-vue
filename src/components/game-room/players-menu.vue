<template>
    <v-app-bar :extension-height="height">
        <v-app-bar-title>Current Geeber</v-app-bar-title>
        <v-app-bar-title>RuptureXX</v-app-bar-title>
        <v-divider inset vertical></v-divider>
        <v-btn @click="$emit('switch-stream', player.name)" v-for="(player, playerKey) in playersArray" :player="player" :key="playerKey" text>{{player.name}}</v-btn>
        <template v-slot:extension>
            <h2>Account Details for name</h2>
        </template>
    </v-app-bar>
</template>

<script>
export default {
    props: [
        'playersArray'
    ],
    data() {
        return {
            extended: false,
            height: '0px'
        }
    },
    methods: {
        openExtension() {
            if(this.extended){
                console.log('closing extra nav bar');
                this.height = '0px';
                this.extended = false;
            }
            else if(!this.extended){
                console.log('opening nav bar')
                this.height = '100px'
                this.extended = true;
            }

        }
    }
}
</script>

<style>

</style>