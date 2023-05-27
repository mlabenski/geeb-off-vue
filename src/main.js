import { createApp } from 'vue'
//import vuetify from './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase';
import LoadScript from 'vue-plugin-load-script';


console.log(process.env.VUE_APP_API_KEY)
firebase.initializeApp({
    apiKey: process.env.VUE_APP_API_KEY,
    authDomain: process.env.VUE_APP_AUTH_DOMAIN,
    databaseURL: process.env.VUE_APP_DATABASE_URL,
    projectId: process.env.VUE_APP_PROJECT_ID,
    storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.VUE_APP_SENDER_ID,
    appId: process.env.VUE_APP_APP_ID
});


export const auth = firebase.auth();
export const db = firebase.firestore();
export const functions = firebase.functions();
const app = createApp(App)

app.use(router)
app.use(store)
app.use(LoadScript)
app.mount('#app')
