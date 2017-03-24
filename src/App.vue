<template>
<div id="app">
  <div class="off-canvas-wrapper">
    <sidemenu v-if="$store.getters['auth/isAuthenticated']"> </sidemenu>

    <div :class="{ 'content-right test': $store.getters['auth/isAuthenticated'] }" >
      <div class="expanded row">
        <headers v-if="$store.getters['auth/isAuthenticated']" :user="$store.state.auth.profile"></headers>
        <div class="clearfix"></div>
        <breadcrumb v-if="$store.getters['auth/isAuthenticated']"></breadcrumb>

        <router-view></router-view>
      </div>
    </div>

    <foo v-if="$store.getters['auth/isAuthenticated']"></foo>
  </div>
</div>
</template>

<script>
import Sidemenu from './components/Sidemenu.vue'
import foo from './components/Footer.vue'
import headers from './components/header'
import breadcrumb from './components/breadcrumb'
export default {
  name: "App",
  
  components: {
    Sidemenu,
    foo,
    headers,
    breadcrumb
  },
  data () {
    return {
      company: {}
    }
  },
  created () {
  },
  mounted () {
    $(function() {
      $(window).on("scroll", function() {
        if ($(window).scrollTop() > 50) {
          $(".top-bar-section").addClass("sticky-top");
          $('body').addClass('sticky-header');
        } else {
          //remove the background property so it comes transparent again (defined in your css)
          $(".top-bar-section").removeClass("sticky-top");
          $('body').removeClass('sticky-header');
        }
      });
    });
  },
  methods: {
  }
}
</script>

<style src="./../node_modules/vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
  .multiselect__tag { display: none; }
  .multiselect__option--selected { background-color: #ff690a; }
  .multiselect__option--highlight { background-color: #ffffff; color: #35495E; }
</style>
