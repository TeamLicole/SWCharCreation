<template>
  <div class="welcome">
    <h1>Welcome to the Star Wars Character Creation Page!</h1>
    <div class="subwelcome" style="background-color: rgba(235, 233, 233, 0.5); padding-top: 10px; padding-bottom: 20px;">
      <h2>About</h2>
      <p>This website can be used to create and view custom Star Wars characters!</p>
      <p>To get started you can either create an account or login</p>

        <input class="narrow" v-model="username" placeholder="Username">
        <input class="narrow" type="password" v-model="password" placeholder="Password">
        <button v-on:click="register" type="button">Register</button>
        <button v-on:click="login" type="button">Login</button>

      <h1>{{registerError}}</h1>
    </div>
  </div>
</template>

<script>
 export default {
   name: 'WelcomePage',
   data () {
     return {
       username: '',
       password: '',
     }
   },
   computed: {
     registerError: function() {
       return this.$store.getters.registerError;
     },
   },
   methods: {
     register: function() {
       this.$store.dispatch('register',{
	       username: this.username,
         password: this.password,
       });
     },
     login: function() {
       this.$store.dispatch('login',{
	       username: this.username,
         password: this.password,
       });
     }
   }
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
  p2 {
    color: red;
  }
</style>
