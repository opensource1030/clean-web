<script>
//imports

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


  <router-view></router-view>

</div>
</template>
