<template>
  <div class = "home">
    <h1>Create A Character</h1>

    <div class="row" style="background-color: rgba(235, 233, 233, 0.5)">
      <div class="column">
        <form v-on:submit.prevent="createChar">
          <p>Character name
          <input class="narrow" v-model="charName" placeholder="Character Name"></p><br>

          <p>Select Gender:
          <input type="radio" name="gender" id="Female" value="Female"  v-model="genderPicked"> Female
          <input type="radio" name="gender" id="Male" value="Male" v-model="genderPicked"> Male</p><br>

          <p>Select Species:
          <input type="radio" name="species" id="NotHuman" value="NotHuman" v-model="speciesPicked" checked> Twi'lek
          <input type="radio" name="species" id="Human" value="Human"  v-model="speciesPicked"> Human</p><br>

          <p>Select Alignment:
          <input type="radio" name="alignment" id="Dark" value="Dark" v-model="alignmentPicked" checked> Dark Side
          <input type="radio" name="alignment" id="Light" value="Light" v-model="alignmentPicked"> Light Side</p><br>
          <button class="alternate" type="submit">Create</button>
        </form>
      </div>
      <div class="column">
        <img :src="image">
        <br>
        <h2 v-bind:class="{charName}">{{charName}}</h2>
      </div>
    </div>


  </div>
</template>

<script>
  export default {
    name: 'NewChar',
    data() {
       return {
         charName: '??',
         genderPicked: '',
         speciesPicked: '',
         alignmentPicked: '',
         image: '/static/images/unknown.png',
         created: 'nope',
       }
     },
     methods: {
       createChar: function() {
         this.image = "/static/images/" + this.genderPicked + this.speciesPicked + this.alignmentPicked + ".png";
         if (this.created === "nope") {
           this.created = "yup";
           this.$store.dispatch('addChar',{
  	         name: this.charName,
             gender: this.genderPicked,
             species: this.speciesPicked,
  	         alignment: this.alignmentPicked,
           }).then(tweet => {
    	       this.text = "";
           });
         }
         else {
          console.log("put update here");
         }

       },
     },
   }
</script>

<style>
* {
box-sizing: border-box;
}

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

button {
  font-size: 20px;
}

.column {
  float: left;
  width: 50%;
  padding: 100px;
}

.row:after {
  content: "";
  display: table;
  clear: both;
}
</style>
