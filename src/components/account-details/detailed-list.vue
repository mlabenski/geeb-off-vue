<template>
    <div class="detailedList">
        <v-row v-if="userDataUploaded.length" style="padding-bottom: 50px; padding-top: 2%">
                <v-col>

                </v-col>
                <v-col>
                    <v-card class="pa-2" title max-width="600">
                    <v-card-text style="font-size: 2.3em">{{userDataUploaded[0].username}}
                    <v-btn right size="small" class="ma-2" color="purple" dark v-on:click="editUserDetails">
          <v-icon dark> mdi-wrench</v-icon>
        </v-btn>
        <input v-if="displayEditWindow" v-model="newUsername" placeholder="edit twitch name" />
        <v-btn v-if="displayEditWindow" right size="small" class="ma-2" color="green" dark v-on:click="submitNewUsername">
          <v-icon dark> mdi-wrench</v-icon>
        </v-btn>
                    </v-card-text>
                    <v-divider class="mx-4"></v-divider>
                      <v-card-actions>
                        <v-btn ># of matches: {{userDataUploaded[0].matches}}</v-btn>
                        <v-btn style="align:center;"># of geebs: {{userDataUploaded[0].totalGeebs}}</v-btn>
                        <v-btn style="align:center;"># of wins: {{userDataUploaded[0].totalWins}}</v-btn>
                    </v-card-actions>
                    </v-card>
                </v-col>
                <v-col>  
                </v-col>
            </v-row >
    </div>

</template>

<script>
export default {
    props: ['userDataUploaded'],
        data: function() {
        return { 
            displayEditWindow: false,
            newUsername: ''
        }
    },
    methods: {
        editUserDetails() {
            this.displayEditWindow = true;
            this.$emit('event_child', 'someValue')
        },
        submitNewUsername() {
            if(this.newUsername.length<=4){
                alert("Your new username isn't long enough!");
            }else {
                this.$emit('new_username_submit', this.newUsername)
            }
        }
    }
}
</script>

<style>

</style>