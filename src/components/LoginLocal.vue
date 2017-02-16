<template>
  <div>
  <div class="bg-login">
    <div class="login">
  <div class="large-4 large-centered columns login-form-holder">
    <img src="./../assets/wa-logo.png" alt="Wireless Analytics">
<div v-if="error" v-show="error">
<div   class="is-error callout" data-closable>
<h5>{{error}}</h5>
</div>
  </div>
    <h1 class="title"><img src="./../assets/clean-logo-blue.png" alt="CLEAN Platform">  </h1>
    <div class="login-box">
      <div class="row">
        <div class="large-12 columns">
          <form v-on:submit.prevent="submit()">
            <div class="row">
              <div class="large-12 columns">
                <div class="input-group bg-orange">
                  <span class="input-group-label"> <i class="fa fa-home"> </i> </span>
                  <input id="email" class="input-group-field" type="text" v-model="credentials.email" placeholder="Enter your company email" readonly/>
                </div>

              </div>
            </div>
            <div class="row">
              <div class="large-12 columns">
                <div class="input-group bg-orange">
                  <span class="input-group-label"> <i class="fa fa-key"> </i> </span>
                <input class="input-group-field" type="password" v-model="credentials.password" placeholder="Password" />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="large-12 columns">
                <input id="checkbox3" type="checkbox"><label for="checkbox3">remember me</label>
              </div>
            </div>
            <div class="row">
              <div class="large-12 large-centered columns">
                <input type="submit" class="button expanded"  value="Sign In"/>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <span v-if="version" class="version"> {{ version }}</span>
  </div>
  </div>
  </div>
</div>
</template>

<script>

import auth from './../api/auth';

export default {
    name: "loginLocal",

data() {
  return {
    // We need to initialize the component with any
    // properties that will be used in it
    credentials: {
      email: localStorage.getItem('email'),
      password:''

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
    var credentials = {
      email: this.credentials.email,
      password:this.credentials.password

    }
    // We need to pass the component's this context
    // to properly make use of http in the auth service
    auth.loginLocal(this, credentials, 'dashboard')
  }
}

}

  </script>
