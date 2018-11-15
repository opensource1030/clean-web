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
        var waitForFinalEvent = (function () {
          var timers = {};
          return function (callback, ms, uniqueId) {
            if (!uniqueId) {
              uniqueId = "Don't call this twice without a uniqueId";
            }
            if (timers[uniqueId]) {
              clearTimeout(timers[uniqueId]);
            }
            timers[uniqueId] = setTimeout(callback, ms);
          };
        })();
        $(function () {
          $(window).resize(function () {
            waitForFinalEvent(function () {
              let Elm = $('.step-container');
              let contentRight = $('.content-right').width();
              Elm.css({
                "width": contentRight + 'px',
                "top": $('.top-bar-section').height() + 13 + 'px'
              })
            }, 500, "unique");
          });
        })

        $(window).on("scroll", function() {
          if ($(window).scrollTop() > 50) {
            $(".top-bar-section").addClass("sticky-top");
            $('body').addClass('sticky-header');
            if ($('.step-container').length) {
              let Elm = $('.step-container');
              let contentRight = $('.content-right').width();
              let menuLeft = $('.menu-left').width();
              /*  Elm.width(contentRight + 'px');*/
              Elm.css({
                "position": 'fixed',
                "width": contentRight + 'px',
                "top": $('.top-bar-section').height() + 12 + 'px',
                "background": 'white',
                "z-index": '999',
                "height": "75px"
              })


            }


          }
          else {
            //remove the background property so it comes transparent again (defined in your css)
            $(".top-bar-section").removeClass("sticky-top");
            $('body').removeClass('sticky-header');
            $('.step-container').css({
              "position": "static",
              "width": "auto",
              "top": "auto",
              "z-index": "inherit",
              "height": "auto"

            })
          }
        });
      });

      $(document).keyup(function (e) {
        if($('.support-form-holder').is(":visible") && e.keyCode == 27) {
          setTimeout(function() {
            $('.support-form-holder .btn-close').click();
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
