<template>
  <div class = "home">
    <h1>Welcome to the Star Wars Character Creation Page!</h1>
    <h2>About</h2>
    <p>This website can be used to create and view custom Star Wars characters!</p>
    <p>To get started you can either create a new character or view your characters already created</p>
    <button v-on:click="newChar" type="button">Create A New Character</button>
    <button v-on:click="viewChars" type="button">View Characters Already Created</button>
  </div>
</template>

<script>
  import WelcomePage from './WelcomePage';
  export default {
    name: 'HomePage',
    components: {WelcomePage},
    computed: {
      loggedIn: function() {
        return this.$store.getters.loggedIn;
      },
    },
    data() {
       return {
       }
     },
     methods: {
       newChar: function() {
        this.$router.push("NewChar");
       },
       viewChars: function() {
        this.$router.push("ViewChars");
       },
     },
   }
</script>

<style>
  h1 {
    color: white;
  }
  h2 {
    color: white;
  }
  p {
    color: white;
  }
</style>
