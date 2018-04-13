<template>
    <nav>
    	<label for="show-menu" class="show-menu">Show Menu</label>
    	<input type="checkbox" id="show-menu" role="button">
      <ul id="menu">
  	    <li><router-link to="./">HomePage</router-link></li>
  	    <li><router-link to="./NewChar">Create Character</router-link></li>
        <li><router-link to="./ViewChars">View Characters</router-link></li>
	    </ul>
    </nav>
</template>

<script>
   export default {
       name: 'AppHeader',
       data() {
          return {
          }
        },
   }
</script>

<style scoped>
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
