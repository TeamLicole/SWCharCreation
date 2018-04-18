<template>
  <div class = "home">

    <h1>Edit A Character</h1>
    <div class="row" style="background-color: rgba(235, 233, 233, 0.5)">
      <div class="column">
        <form v-on:submit.prevent="editChar">
          <p>Select Gender:
          <input type="radio" name="gender" id="Female" value="Female"  v-model="genderPicked"> Female
          <input type="radio" name="gender" id="Male" value="Male" v-model="genderPicked"> Male</p><br>

          <p>Select Species:
          <input type="radio" name="species" id="NotHuman" value="NotHuman" v-model="speciesPicked" checked> Twi'lek
          <input type="radio" name="species" id="Human" value="Human"  v-model="speciesPicked"> Human</p><br>

          <p>Select Alignment:
          <input type="radio" name="alignment" id="Dark" value="Dark" v-model="alignmentPicked" checked> Dark Side
          <input type="radio" name="alignment" id="Light" value="Light" v-model="alignmentPicked"> Light Side</p><br>
          <button class="alternate" type="submit">Update</button>
          <p v-model="editError">{{editError}}</p>
          <p class="error">{{charError}}</p>
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

<script scoped>
  export default {
    name: 'EditChar',
    data() {
       return {
        editError: '',
         charName: '',
         genderPicked: '',
         speciesPicked: '',
         alignmentPicked: '',
         image: '/static/images/unknown.png',
       }
     },
     created: function() {
       if (!(this.loggedIn)) {
         this.$router.push("HomePage");
       }
       else {
         let currChar = '';
         currChar = this.$store.getters.currChar;
         console.log("currChar in edit = ", currChar);
         this.charName = currChar.name;
         this.image = "/static/images/" + currChar.gender + currChar.species + currChar.alignment + ".png";
         console.log("this.image = ", this.image);
         this.genderPicked = currChar.gender;
         this.speciesPicked = currChar.species;
         this.alignmentPicked = currChar.alignment;
       }
     },
     computed: {
       loggedIn: function() {
         return this.$store.getters.loggedIn;
       },
       charError: function() {
         return this.$store.getters.charError;
       },
     },
     methods: {
       editChar: function() {
           if (this.charName !== '' && this.genderPicked !== '' && this.speciesPicked !== '' && this.alignmentPicked !== '') {
               this.image = "/static/images/" + this.genderPicked + this.speciesPicked + this.alignmentPicked + ".png";
               this.createError = '';
               let name = this.charName;
               this.$store.dispatch('deleteChar',{name}).then(tweet => {});
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
              this.createError = "missing character attributes";
           }
         },
       },
   }
</script>

<style scoped>
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
