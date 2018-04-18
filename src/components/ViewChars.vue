<template>
  <div class = "charFeed">

    <h1>Characters That Have Been Created</h1>
    <div class="subCharFeed" style="background-color: rgba(235, 233, 233, 0.5); padding: 20px;">
      <div style="padding:10px" v-for="item in charFeed" class="item">
        <img :src="'/static/images/' + item.gender + item.species + item.alignment + '.png'" />
        <h2 class="char">{{item.name}}</h2>
        <button v-on:click="editChar(item)" type="button">Edit</button>
        <button v-on:click="deleteChar(item.name)" type="button">Delete</button>
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
       if (!(this.loggedIn)) {
         this.$router.push("HomePage");
       }
       this.$store.dispatch('getCharFeed');
     },
     computed: {
       charFeed: function() {
         return this.$store.getters.charFeed;
       },
       loggedIn: function() {
         return this.$store.getters.loggedIn;
       },
     },
     methods: {
       newChar: function() {
        this.$router.push("NewChar");
       },
       setImage: function(gender, species, alignment) {
        this.image = "/static/images/" + gender + species + alignment + ".png";
       },
       editChar: function(item) {
         this.$store.dispatch('updateCurrChar',{
           name: item.name,
           gender: item.gender,
           species: item.species,
           alignment: item.alignment,
           id: item.id
         });
         this.$router.push("EditChar");
       },
       deleteChar: function(name) {
         this.$store.dispatch('deleteChar',{name}).then(tweet => {});
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
