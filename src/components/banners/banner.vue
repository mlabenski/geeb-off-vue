<template v-if="bannerOneLocal">
        <v-banner
        single-line
        :sticky="sticky"
        top
        right
        elevation="20"
        style="padding-left:35%"
      >
        {{bannerOptions.error1.text}}
  
        <template v-slot:actions>
          <v-btn
            text
            color="deep-purple accent-4"
            style="float: right"
          >
         {{bannerOptions.error1.button}}
          </v-btn>
        </template>
      </v-banner>
</template>

<script>
export default {
    data() {
        return {
            sticky: false,
            bannerOneLocal: true,
            isBannerTwo: false,
            bannerOptions: {
                error1: {
                    text: 'Hello,  log in or learn more down below.',
                    button: ''
                },
                error2: {
                    text: 'The username or password isnt correct',
                    button: 'Retry'
                },
                error3: {
                    text: 'Account has been created, follow the setup guide!',
                    button: 'Set up'
                },
                error4: {
                    text: 'You are logged in, enjoy!',
                    button: 'Spectate match'
                }
            }
        }
    },
    methods: {
        tutOne() {
            this.bannerOneLocal = false;
            var self = this;
            setTimeout(function() {
                self.bannerOneLocal = true;
            }, 2000)
            this.bannerOneLocal = false;
        },
        tutTwo(){
        }
    },
    mounted() {
        this.tutOne();
    }
}
</script>

<style>

</style>