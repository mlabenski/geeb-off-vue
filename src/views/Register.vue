<template>
    <div class="register">
      <h1>Register</h1>
      <form @submit.prevent="Register">
        <input type="text" placeholder="Email" v-model="email" />
        <input type="text" placeholder="Password" v-model="password" />
        <input type="submit" value="Login">
        <p>Have an account? <router-link to="/login"> Login Here</router-link></p>
      </form>
    </div>
</template>

<script>
import { ref } from 'vue';
import * as firebase from 'firebase';
export default {
    setup () {
        const email = ref("");
        const password=ref("");
        
        const Register = () => {
            firebase.default.auth()
            .createUserWithEmailAndPassword(email.value, password.value)
            .then(user => {
                alert(user);
            })
            .catch(err => alert(err.message));
        }

        return {
            Register,
            email,
            password
        }
    }
}
</script>

<style lang="scss" scoped>

</style>