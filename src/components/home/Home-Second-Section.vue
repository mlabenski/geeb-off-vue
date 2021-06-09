<template>
    <div>
        <v-container fluid v-if="isMounted">   
            <v-row class="row-check md-6" id="landing-page2" style="background-color: #ececee; padding-top: 30px;">
            <v-col           
  xs="12" 
  sm="12" 
  md="6"
          >
                <h2>Create an Account on Geeboff.com</h2>
            <p>There are stat trackers to see your progression in the community. Creating an account 
                is free, and is intergrated with twitch.tv to stream the matches.</p> 
            </v-col>
            <v-col   xs="12" 
  sm="12" 
  md="6">
                 <v-img src="https://www.digitalartsonline.co.uk/cmsdata/features/3783331/lobby_boy_sss_1.jpg" style="height: 600px; width: 1000px;"> </v-img>
            </v-col>
            </v-row>
            <v-row class="row-check" id="landing-page3" dense style="background-color:#1C9E86; padding-top: 70px; padding-left: 30px; padding-bottom: 100px;">
            <v-col   xs="12" 
  sm="12" 
  md="6">
                <h2>A new match begins every 30 minutes: at the top and bottom of the hour.</h2>
            <p>Be sure to join the queue prior to the start, and have your stream setup! There will
                be a rotation starting with the first one who queued.</p> 
            </v-col>
            <v-col   xs="12" 
  sm="12" 
  md="6">
                 <v-img src="https://www.digitalartsonline.co.uk/cmsdata/features/3783331/jt_1.gif" style="height: 600px; width: 1000px;"> </v-img>
            </v-col>
            </v-row>
            <v-row class="row-check" id="landing-page3" dense style="background-color:#B5968E; padding-top: 70px; padding-left: 30px; padding-bottom: 100px;">
            <v-col   xs="12" 
  sm="12" 
  md="6">
                <h2>The rules are as follows:</h2>
            <p>At the start of your turn, you'll be granted 2 minutes of air-time. The floor is you're for any
                entertainment outside of the requirements. As per the requirements, rip the fattest geeb; and 
                add style points to ensure the victory.</p> 
            </v-col>
            <v-col   xs="12" 
  sm="12" 
  md="6">
                 <v-img src="https://www.digitalartsonline.co.uk/cmsdata/features/3783331/klo_05.gif" style="height: 600px; width: 1000px;"> </v-img>
            </v-col>
            </v-row>
        </v-container>

    <v-card height="200px">
      <v-footer
        v-bind="localAttrs"
        :padless="padless"
      >
        <v-card
          flat
          tile
          width="100%"
          class="red lighten-1 text-center"
        >
          <v-card-text>
            <v-btn
              v-for="icon in icons"
              :key="icon"
              class="mx-4"
              icon
            >
              <v-icon size="24px">
                {{ icon }}
              </v-icon>
            </v-btn>
          </v-card-text>
  
          <v-divider></v-divider>
  
          <v-card-text class="white--text">
            {{ new Date().getFullYear() }} — <strong>Geeboff.com</strong>
          </v-card-text>
        </v-card>
      </v-footer>
    </v-card>
        </div>
</template>

<script>

export default {
    props: [],
    components: {
    },
  data() {
      return {
          isMounted : false,
        icons: [
        'mdi-home',
        'mdi-email',
        'mdi-calendar',
        'mdi-delete',
        ],
    items: [
      'default',
      'absolute',
      'fixed',
    ],
    padless: false,
    variant: 'default',      
    }
  },
  mounted() {
      this.isMounted = true;
  },
  methods: {
  },
    computed: {
        mobile: function () {
            return this.isMounted && ['xs', 'sm'].includes(this.$vuetify.breakpoint.name);
        },
    localAttrs () {
      const attrs = {}

      if (this.variant === 'default') {
        attrs.absolute = false
        attrs.fixed = false
      } else {
        attrs[this.variant] = true
      }
      return attrs
    },
  },
}
</script>

<style>
    #landing-page {
        background-image: url('../background.jpg');
          /* background-color: #8f2c2c; */
        height: 80vh;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        position: relative;
        z-index: -1;
    }
    .bannerText {
        font-size: 2.3em;
    }
    @media only screen and (max-width: 900px) {
        .row-check {
        padding-top: 0px; 
        padding-left: 0px;
        padding-bottom: 0px;
        }
        .bannerText {
            font-size: 1.8em;
        }
        .z-index-check {
            width: 300px;
            height: 400px;
        }
        #landing-page {
            height: 60vh;
        }
        .computer-resize {
            padding-left: 0px;
        }
    }
    .z-index-check {
        z-index: 10;
        background-color: rgba(255, 255, 255, 0.753);
    }
    .computer-resize{
        margin-left: 24%;
    }
    .v-row
    {
    display: flex;
    align-items: center; 
    }
    .row-check {
        padding-top: 70px; 
        padding-left: 30px; 
        padding-bottom: 100px;
    }
</style>