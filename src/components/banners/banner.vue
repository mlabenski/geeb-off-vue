<template>
        <v-banner
        single-line
        :sticky="sticky"
        top
        elevation="20"
      >
        {{bannerOptions.error1.text}}
  
        <template v-slot:actions>
          <v-btn
            text
            color="deep-purple accent-4"
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
            bannerOptions: {
                error1: {
                    text: 'You must be logged in for this action',
                    button: 'Log in'
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
    }
}
</script>

<style>

</style>