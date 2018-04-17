<template>
    <nav>
      <ul id="menu">
        <li><router-link to="/">Home</router-link></li>
        <li v-if="loggedIn"><router-link to="./NewChar">Create Character</router-link></li>
        <li v-if="loggedIn"><router-link to="./ViewChars">View Characters</router-link></li>
        <li class="right" v-if="loggedIn"><a @click="logout" href="#">Logout</a></li>
        <li class="right" v-if="loggedIn">{{user.username}}</li>

        <form v-else class="right" v-on:submit.prevent="login">
          <input v-model="username" placeholder="Username">
          <input v-model="password" placeholder="Password">
          <button class="primary" type="submit">Login</button>
        </form>
      </ul>
      <div class="flexWrapper errorPlace">
        <p v-if="loginError" class="flexRight error">{{loginError}}</p>
      </div>
    </nav>

</template>

<script>
   export default {
       name: 'AppHeader',
       data() {
          return {
           username: '',
           password: '',
          }
        },
        computed: {
         user: function() {
           return this.$store.getters.user;
         },
         loggedIn: function() {
           return this.$store.getters.loggedIn;
         },
         loginError: function() {
           return this.$store.getters.loginError;
         },
       },
       methods: {
         login: function() {
           this.$store.dispatch('login',{
             email: this.email,
             password: this.password,
           }).then(user => {
          	 this.username = '';
          	 this.password = '';
           });
         },
         logout: function() {
           this.$store.dispatch('logout');
         }
       }
   }
</script>

<style scoped>
   .right {
     float: right;
   }
   /*Strip the ul of padding and list styling*/
   .clear {
       float: clear;
   }
   nav ul {
     list-style-type: none;
     margin: 0;
     padding: 0;
  	 overflow: hidden;
  	 background-color: grey;
   }
   /*Create a horizontal list with spacing*/
   nav li {
	   float: left;
   }
   /*Style for menu links*/
   nav li a {
  	 display: block;
  	 color: white;
  	 text-align: center;
  	 padding: 14px 16px;
  	 text-decoration: none;
   }
   /*Active color*/
   nav a.active {
     background-color: darkgrey;
     color: black;
   }
   /*Hover state for top level links*/
   nav li a:hover {
  	 background-color: #111;
     color: white;
   }
   /*Style 'show menu' label button and hide it by default*/
   .show-menu {
       text-decoration: none;
       color: #fff;
       background: #FF5035;
       text-align: center;
       padding: 10px 0;
       display: none;
   }
   /*Hide checkbox*/
   input[type=checkbox]{
       display: none;
   }

   /*Show menu when invisible checkbox is checked*/
   input[type=checkbox]:checked ~ #menu{
       display: block;
   }
</style>
