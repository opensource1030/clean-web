<script>
  import Navbar from './Navbar.vue'
  export default {
    name: "App",
    components: {
      Navbar
    }
  }
</script>

<template>
   <div id="app">
  <navbar></navbar>
  <router-view></router-view>
</div>
</template>
