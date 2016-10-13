<template>
<div>
  <div class="bg-login">
    <div class="login">
  <div class="large-4 large-centered columns login-form-holder">
    <img src="/assets/wa_logo.png" alt="Wireless Analytics">
    <div v-if="error" v-show="error">
    <div   class="is-error callout" data-closable >
      <div class="container">
        <h5>{{error}}</h5>
      </div>

    </div>
      </div>
    <h1 class="title">CLEAN <sup class="version">v4.0.0</sup> </h1>
    <div class="login-box">
      <div class="row">
        <div class="large-12 columns">
          <form   v-on:submit.prevent="submit()">
            <div class="large-12 columns">
              <div class="input-group bg-orange">
                <span class="input-group-label"> <i class="fa fa-user"> </i> </span>
                <input class="input-group-field" type="text" v-model="credentials.email" placeholder="Username" />
              </div>
            </div>
            <div class="large-12 large-centered columns">
              <input type="submit" class="button expanded"  value="Sign In"/>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  </div>
  </div>
</div>

</template>

<script>
import auth from './../api/auth';
export default {
  name: "Login",
data() {
  return {
    // We need to initialize the component with any
    // properties that will be used in it
    credentials: {
      email: ''

    },
    error: ''
  }
},
methods: {

  submit() {



    auth.login(this,this.credentials, 'dashboard')
  }
}

}



  </script>
