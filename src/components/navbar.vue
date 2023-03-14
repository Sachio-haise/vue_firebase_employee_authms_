<template>
  <nav>
    <div class="nav-wrapper green">
      <div class="container">
        <router-link to="/" class="brand-logo">Employee Manager</router-link>
        <a href="#" data-activates="mobile-demo" class="button-collapse"
          ><i class="material-icons">menu</i></a
        >
        <ul class="right hide-on-med-and-down">
          <li>
            <span class="email white-text">{{ currentUser ? currentUser.email : '' }}</span>
          </li>
          <li v-if="isLoggedIn"><router-link to="/">Dashboard</router-link></li>
          <li v-if="!isLoggedIn"><router-link to="/login">Login</router-link></li>
          <li v-if="!isLoggedIn"><router-link to="/register">Register</router-link></li>
          <li v-if="isLoggedIn"><button v-on:click="logout" class="btn black">Logout</button></li>
        </ul>
        <ul class="side-nav" id="mobile-demo">
          <li v-if="isLoggedIn"><router-link to="/">Dashboard</router-link></li>
          <li v-if="!isLoggedIn"><router-link to="/login">Login</router-link></li>
          <li v-if="!isLoggedIn"><router-link to="/register">Register</router-link></li>
          <li v-if="!isLoggedIn"><a href="#" class="divider"></a></li>
          <li v-if="isLoggedIn"><button v-on:click="logout" class="btn">Logout</button></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { getAuth, signOut } from 'firebase/auth'
import {auth} from './firebaseInit'
export default {
  name: 'employees_navbar',
  data() {
    return {
      isLoggedIn: false,
      currentUser: false
    }
  },
  methods: {
    logout() {
      const auth = getAuth()
      signOut(auth)
        .then(() => {
          this.isLoggedIn = false;
          this.currentUser = auth.currentUser
          this.$router.push('/login')
        })
        .catch((error) => {
          alert(error.message)
        })
    }
  }, 
  watch:{
    $route (to, from){
      if(auth.currentUser){
      this.isLoggedIn = true;
      this.currentUser = auth.currentUser
    }
    }
} 
}
</script>
