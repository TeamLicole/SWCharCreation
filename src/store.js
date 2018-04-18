import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    loggedIn: false,
    loginError: '',
    registerError: '',
    charError: '',
    charFeed: [],
    currChar: '',
  },
  getters: {
    user: state => state.user,
    loggedIn: state => state.loggedIn,
    loginError: state => state.loginError,
    registerError: state => state.registerError,
    charError: state => state.charError,
    charFeed: state => state.charFeed,
    currChar: state => state.currChar,
  },
  mutations: {
    setUser (state, user) {
      state.user = user;
    },
    setLogin (state, status) {
      state.loggedIn = status;
    },
    setLoginError (state, message) {
      state.loginError = message;
    },
    setRegisterError (state, message) {
      state.registerError = message;
    },
    setCharError (state, message) {
      state.charError = message;
    },
    setCharFeed (state, charFeed) {
      state.charFeed = charFeed;
    },
    setCurrChar (state, currChar) {
      state.currChar = currChar;
    },
  },
  actions: {
    // Registration, Login //
    updateCurrChar(context, char) {
      context.commit('setCurrChar', char);
    },
    register(context,user) {
      axios.post("/api/users",user).then(response => {
      	context.commit('setUser', response.data.user);
      	context.commit('setLogin',true);
      	context.commit('setRegisterError',"");
      	context.commit('setLoginError',"");
      }).catch(error => {
      	context.commit('setLoginError',"");
      	context.commit('setLogin',false);
      	if (error.response) {
      	  if (error.response.status === 403)
      	    context.commit('setRegisterError',"That username is already taken.");
      	  else if (error.response.status === 409)
      	    context.commit('setRegisterError',"That username is already taken.");
      	  return;
      	}
      	context.commit('setRegisterError',"Sorry, your request failed. We will look into it.");
      });
    },
    login(context,user) {
      axios.post("/api/login",user).then(response => {
      	context.commit('setUser', response.data.user);
      	context.commit('setLogin',true);
      	context.commit('setRegisterError',"");
      	context.commit('setLoginError',"");
      }).catch(error => {
      	context.commit('setRegisterError',"");
      	if (error.response) {
      	  if (error.response.status === 403 || error.response.status === 400)
      	    context.commit('setLoginError',"Invalid login.");
      	  context.commit('setRegisterError',"");
      	  return;
      	}
      	context.commit('setLoginError',"Sorry, your request failed. We will look into it.");
      });
    },
    logout(context,user) {
      context.commit('setUser', {});
      context.commit('setLogin',false);
    },
    getCharFeed(context) {
      axios.get("/api/users/" + context.state.user.id + "/chars").then(response => {
	       context.commit('setCharFeed',response.data.chars);
      }).catch(err => {
	       console.log("getCharFeed failed:",err);
      });
    },
    addChar(context,char) {
      context.commit('setCurrChar', char);
      console.log("currChar = ", this.currChar);
      console.log("going to call server");
      axios.post("/api/users/" + context.state.user.id + "/chars",char).then(response => {
         console.log("here");
         context.commit('setCharError',"Your character has been created! You can edit it from the View Characters page.");
         // context.dispatch('getCharFeed');
         // console.log("\n\n", this.charFeed);
	       return context.dispatch('getCharFeed');
      }).catch(err => {
	       // console.log("addChar failed:",err);
       	 context.commit('setCharError',"That character name  is already taken.");
         // console.log("\ncharError is now: ", this.charError, "\n");
       	 return;
      });
    },
    deleteChar(context,name) {
      console.log("name = ", name.name);
      axios.delete("/api/users/" + context.state.user.id + "/chars/" + name.name).then(response => {
        return context.dispatch('getCharFeed');
      }).catch(err => {
	       console.log("deleteChar failed:",err);
       	 return;
      });
    }
  }
});
