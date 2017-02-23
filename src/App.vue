<script>

    import Sidemenu from './components/Sidemenu.vue'
    import foo from './components/Footer.vue'
    import headers from './components/header'
    import breadcrumb from './components/breadcrumb'
    import auth from './api/auth'
    export default {
        name: "App",
          created(){
            this.getUser();


        },
        mounted(){
            $(function() {
                $(window).on("scroll", function() {
                    if($(window).scrollTop() > 50) {
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

        components: {
            Sidemenu,
            foo,
            headers,
            breadcrumb
        },
        data() {
            return {
                user: auth.user,
                company: {}
            }
        },
        methods:{
            getUser(){
              if(this.user.authenticated){
                  let result = JSON.parse(localStorage.getItem("userProfile"));
                  this.user.email= result.email;
                  this.user.firstName= result.firstName;
                  this.user.lastName= result.lastName;
                  this.user.alternateEmail= result.alternateEmail;
                  this.user.supervisorEmail= result.supervisorEmail;
              }
            }

        }

    }
</script>

<template>

<div id="app">
    <div class="off-canvas-wrapper">

      <sidemenu v-if="user.authenticated"> </sidemenu>

      <div :class="{'content-right test' : user.authenticated}" >
        <div class="expanded row">
      <headers  v-if="user.authenticated" :user="user" >  </headers>
          <div class="clearfix"></div>
        <breadcrumb v-if="user.authenticated"  ></breadcrumb>

      <router-view></router-view>

</div>

    </div>
      <foo  v-if="user.authenticated"></foo>
    </div>
</div>


</template>
