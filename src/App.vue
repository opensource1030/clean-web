<script>
    //imports


    import Sidemenu from './components/Sidemenu.vue'
    import foo from './components/Footer.vue'
    import auth from './api/auth'
    export default {
        name: "App",

        components: {
            Sidemenu,
            foo
        },
        data() {
            return {
                user: auth.user
            }
        }

    }
</script>

<template>

<div id="app">
    <div class="off-canvas-wrapper">
      <sidemenu v-if="user.authenticated"> </sidemenu>

      <router-view></router-view>
      <foo  v-if="user.authenticated"></foo>
    </div>
</div>


</template>
