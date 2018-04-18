<template>
  <div class = "charFeed">
    <h1>Characters That Have Been Created</h1>

    <div class="subCharFeed" style="background-color: rgba(235, 233, 233, 0.5); padding: 20px;">
      <div style="padding:10px" v-for="item in charFeed" class="item">
        <img :src="'/static/images/' + item.gender + item.species + item.alignment + '.png'" />
        <h2 class="char">{{item.name}}</h2>
        <hr />
      </div>
      <button v-on:click="newChar" type="button">Create A New Character</button>
    </div>
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
       setImage: function(gender, species, alignment) {
        this.image = "/static/images/" + gender + species + alignment + ".png";
       }
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
