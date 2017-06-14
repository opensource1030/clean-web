<template>
<div id="app">
  <div class="off-canvas-wrapper">
    <sidemenu v-if="$store.getters['auth/isAuthenticated']"></sidemenu>

    <div :class="{ 'content-right ': $store.getters['auth/isAuthenticated'] }">
      <div class="expanded row">
        <headers v-if="$store.getters['auth/isAuthenticated']" :user="$store.state.auth.profile"></headers>
        <div class="clearfix"></div>
        <breadcrumb v-if="$store.getters['auth/isAuthenticated']"></breadcrumb>
        <router-view></router-view>
      </div>
    </div>

    <SupportRequest></SupportRequest>
    <foo v-if="$store.getters['auth/isAuthenticated']"></foo>
  </div>
</div>
</template>

<script>
import Sidemenu from './components/Sidemenu.vue'
import foo from './components/Footer.vue'
import headers from './components/header'
import breadcrumb from './components/breadcrumb'
import SupportRequest from './components/SupportRequest.vue'

require('script!jquery');
require('script!jquery-match-height');
require('script!jquery-validation');

export default {
  name: "App",
  components: {
    Sidemenu,
    foo,
    headers,
    breadcrumb,
    SupportRequest
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

    $(document).keyup(function (e) {
      if($('.support-form-holder').is(":visible") && e.keyCode == 27) {
        setTimeout(function() {
          $('#btn-close').click();
        }, 200);
      } else if($('.spent-info').hasClass('active') && e.keyCode == 27) {
        setTimeout(function() {
          history.back();
        },200)
      }
    })
  },
}
</script>
