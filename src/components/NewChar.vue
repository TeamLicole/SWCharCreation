<template>
  <div class = "home">
    <h1>Create A Character</h1>

    <div class="row">
      <div class="column" style="background-color: rgba(235, 233, 233, 0.5)">
        <form v-on:submit.prevent="createChar">
          <p>Character name</p>
          <input class="narrow" v-model="charName" placeholder="Character Name">

          <p>Select Gender: </p>
          <input type="radio" name="gender" id="Male" value="Male" v-model="genderPicked"> Male
          <input type="radio" name="gender" id="Female" value="Female"  v-model="genderPicked"> Female<br>

          <p>Select Species: </p>
          <input type="radio" name="species" id="Human" value="Human"  v-model="speciesPicked"> Human
          <input type="radio" name="species" id="NotHuman" value="NotHuman" v-model="speciesPicked"> Twi'lek<br>

          <p>Select Alignment: </p>
          <input type="radio" name="alignment" id="Light" value="Light" v-model="alignmentPicked"> Light Side
          <input type="radio" name="alignment" id="Dark" value="Dark" v-model="alignmentPicked"> Dark Side<br>
          <button class="alternate" type="submit">Create</button>
        </form>
      </div>
      <div class="column" style="background-color: rgba(235, 233, 233, 0.5)">
        <img v-attr="src= image">
        <br>
        <p v-bind:class="{charName}">{{charName}}</p>
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
       }
     },
     methods: {
       createChar: function() {
         image = "/static/images/" + genderPicked + speciesPicked + alignmentPicked + ".png";
       },
     },
   }
</script>
