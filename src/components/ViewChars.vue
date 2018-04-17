<template>
  <div class = "charFeed">
    <h1>Characters That Have Been Created</h1>
    <div v-for="item in charFeed" class="item">
      <img :src="/static/images/" + "item.gender" + "item.species" + "item.alignment" + ".png">
      <br>
      <h2 class="name">{{item.name}}</h2>
   </div>
    <button v-on:click="newChar" type="button">Create A New Character<></button>
    <button v-on:click="viewChars" type="button">View Characters Already Created</button>
  </div>
</template>

<script>
  export default {
    name: 'ViewChars',
    data() {
       return {
       }
     },
     computed: {
       charFeed: function() {
         return this.$store.getters.charFeed;
       },
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
