<script setup>
import { RouterView } from 'vue-router'
</script>


<template>
  <div id="app">
    <Navbar />
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Navbar from './components/navbar.vue'
export default{
  name:'app',
  components:{
    Navbar
  }
}
</script>

<style>
  nav {
    margin-bottom:10px;
  }
</style>