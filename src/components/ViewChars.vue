<template>
  <div class = "home">
    <h1>Characters That Have Been Created</h1>
    <h1>FIXME PUT CHARACTERS HERE</h1>
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
