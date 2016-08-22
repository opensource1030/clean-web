

<template>
  <div class="top-bar">
  <div class="top-bar-left">
    <ul class="dropdown menu" data-dropdown-menu>
      <li class="menu-text">Vue</li>
      <li><a v-link="{name: 'login'}" v-if="!user.authenticated" >Login</a></li>
          <li><a v-link="{name:'dashboard'}"   v-if="user.authenticated" >Dashboard</a></li>
        <li><a @click="logout()"  v-if="user.authenticated" >Logout</a></li>
    </ul>
  </div>
  <div class="top-bar-right">
    <ul class="menu">

    </ul>
  </div>
</div>
</template>
<script>
import auth from './../api/auth'
export default {
    name: "Navbar",

  data() {
    return {
      user: auth.user
    }
  },
  methods: {
    logout() {
      auth.logout()
    }


  }
}
</script>
