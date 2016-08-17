
<script>
  export default {
    name: "Navbar"
  }
</script>

<template>
  <div class="top-bar">
  <div class="top-bar-left">
    <ul class="dropdown menu" data-dropdown-menu>
      <li class="menu-text">Vue </li>
      <li><a v-link="{name: 'login'}">Login</a></li>
      <li><a v-link="{name: 'loginLocal'}">Login Local</a></li>

      <li><a v-link="{name: 'register'}">Register</a></li>
    </ul>
  </div>
  <div class="top-bar-right">
    <ul class="menu">

    </ul>
  </div>
</div>
</template>
