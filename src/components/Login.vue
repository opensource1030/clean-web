<template>
<div>
  <div class="bg-login">
    <div class="login">
  <div class="large-4 large-centered medium-8 medium-centered  columns login-form-holder">
    <div v-if="error" v-show="error">
    <div   class="is-error callout" data-closable >
      <div class="container">
        <h5>{{error}}</h5>
      </div>

    </div>
      </div>
    <h1 class="title"><img src="./../assets/clean-logo-blue.png" alt="CLEAN Platform"> </h1>
    <div class="login-box">
      <div class="row">
        <div class="large-12 columns">
          <form   v-on:submit.prevent="submit()">
            <div class="large-12  columns">
              <div class="input-group bg-orange">
                <span class="input-group-label"> <i class="fa fa-user"> </i> </span>
                <input id="email" class="input-group-field" type="text" v-model="credentials.email" placeholder="Enter your company email" />
              </div>
            </div>
            <div class="large-12 large-centered columns">
              <input type="submit" class="button expanded"  value="Sign In"/>
            </div>

          </form>
        </div>
      </div>
    </div>
    <div class="powered-by">
      <span>Powered By</span>
      <img src="./../assets/wa-logo.png" alt="Wireless Analytics">
    </div>

    <!--<div id="version">-->
      <!--<span v-if="version" class="version"> v{{ version }}</span>-->
    <!--</div>-->
  </div>

  </div>
  </div>

</div>

</template>

<script>
import auth from './../api/auth';
export default {

data() {
  return {
    // We need to initialize the component with any
    // properties that will be used in it
    credentials: {
      email: ''

    },
    error: '',
    version : '4.0.0-rc.1'
  }
},
  mounted(){
    $(function(){
      $('#email').bind('input', function(){
        $(this).val(function(_, v){
          return v.replace(/\s+/g, '');
        });
      });
    });
  },
methods: {

  submit() {

    auth.login(this,this.credentials, 'dashboard')
  },
  fetchUserData : function(){
    this.$http.get('http://dev.api.wirelessanalytics.com/', {

    }).then((response) => {

      var event = store.sync(response.data);

    });
  }
}

}



  </script>
