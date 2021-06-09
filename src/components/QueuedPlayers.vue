<template>
    <div class="queuedPlayers">
        <table class="table table-dark">
  <thead>
    <tr>
      <th scope="col">Username</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="user in players" v-bind:players="user" v-bind:key="user.key">
      <td>{{ user.name }}</td>
    </tr>
  </tbody>
</table>
    </div>
</template>

<script>
export default {
  props: ['players'],
    data: function() {
        return { 
        }
    }
}
</script>

<style>

</style>