<template>
  <div class = "charFeed">
    <h1>Characters That Have Been Created</h1>

    <div v-for="item in charFeed" class="item">
      <p class="char">{{item.name}}{{item.gender}}{{item.species}}{{item.alignment}}</p>
    </div>

    <button v-on:click="newChar" type="button">Create A New Character</button>
  </div>
</template>

<script>
  export default {
    name: 'ViewChars',
    data() {
       return {
       }
     },
     created: function() {
       this.$store.dispatch('getCharFeed');
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
