<template>
    <v-app-bar :extension-height="height" density="compact"  dark>
      <v-app-bar-nav-icon @click.stop="openMobileNavBar = !openMobileNavBar" v-if="showMobileNav" right></v-app-bar-nav-icon>
        <v-app-bar-title style="color: green;">Current Geeber</v-app-bar-title>
        <v-app-bar-title style="color: green;" v-if="newStream">{{newStream}}</v-app-bar-title>
        <v-divider inset vertical></v-divider>
        <v-container v-if="!showMobileNav" style="padding-bottom: 10px">
            <v-btn @click="openExtension" v-for="(player, playerKey) in playersArray" :player="player" :key="playerKey" text>{{player.name}}</v-btn>
        </v-container>
        
        <template v-slot:extension v-if="extended">
            <h2>Account Details for name</h2>
        </template>
    </v-app-bar>
<v-navigation-drawer
        v-model="openMobileNavBar"
        absolute
        bottom
        temporary
        style="background-color: transparent"
      >
      <v-container>
      <v-row style="padding-bottom: 10%;" v-for="(player, playerKey) in playersArray" :player="player" :key="playerKey">
        <v-btn
        flat
        size="large"
        color="green"
      >
        {{player.name}}
      </v-btn>
      </v-row>
      </v-container>

      </v-navigation-drawer>
</template>

<script>
export default {
    props: [
        'playersArray',
        'newStream'
    ],
    data() {
        return {
            extended: false,
            height: '0px',
            openMobileNavBar: false,
            windowWidth: null,
            showMobileNav: false,
        }
    },
    mounted() {
      this.windowWidth = window.innerWidth
      window.addEventListener('resize', () => {
        this.windowWidth = window.innerWidth
      })
    },
    watch: {
      windowWidth(){
        if(this.windowWidth < 800){
          this.showMobileNav = true;
        } else {
          this.showMobileNav = false;
        }
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