<template>
  <div class = "home">
    <div v-if="loggedIn">
      <h1>Welcome to the Star Wars Character Creation Page!</h1>
      <div class = "subhome" style="background-color: rgba(235, 233, 233, 0.5); padding-top: 10px; padding-bottom: 20px;">
        <h2>About</h2>
        <p>This website can be used to create and view custom Star Wars characters!</p>
        <p>To get started you can either create a new character or view your characters already created</p>
        <button v-on:click="newChar" type="button">Create A New Character</button>
        <button v-on:click="viewChars" type="button">View Characters Already Created</button>
      </div>
    </div>
    <div v-else>
      <welcome-page/>
    </div>
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

<style scoped>
  h1 {
    color: white;
  }
  h2 {
    color: black;
  }
  p {
    color: black;
    font-weight: bold;
    font-size: 20px;
  }
</style>
