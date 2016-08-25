<template>
  <div class=class="bg-login">
    <div class="login">
  <div class="large-4 large-centered columns login-form-holder">
      <img src="../../dest/images/wa_logo.png" alt="Wireless Analytics">
    <h1 class="title">Clean <sup class="version">beta 3.0</sup> </h1>
<h3 class="error">{{error}}<h3>
    <div class="login-box">
      <div class="row">
        <div class="large-12 columns">
          <form>
            <div class="row">
              <div class="large-12 columns">
                <div class="input-group">
                  <span class="input-group-label"> <i class="fa fa-home"> </i> </span>
                  <input class="input-group-field" type="text" v-model="credentials.firstName" placeholder="First Name" />
                </div>

              </div>
            </div>
            <div class="row">
              <div class="large-12 columns">
                <div class="input-group">
                  <span class="input-group-label"> <i class="fa fa-key"> </i> </span>
                <input class="input-group-field" type="password" v-model="credentials.lastName" placeholder="Last Name" />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="large-12 columns">
                <div class="input-group">
                  <span class="input-group-label"> <i class="fa fa-key"> </i> </span>
                <input class="input-group-field" type="email" v-model="credentials.email" placeholder="email" />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="large-12 large-centered columns">
                <input type="submit" class="button expanded" @click="submit()"  value="Sign In"/>
              </div>
            </div>
          </form>
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
data() {
  return {
    // We need to initialize the component with any
    // properties that will be used in it
    credentials: {
      firstName: '',
      lastName:'',
      email:''

    },
    error: ''
  }
},
methods: {
    name: "loginLocal",
  submit() {
    var credentials = {
      firstName: this.credentials.firstName,
      password:this.credentials.lastName,
      email:this.credentials.email

    }
    // We need to pass the component's this context
    // to properly make use of http in the auth service
    auth.loginLocal(this, credentials, 'dashboard')
  }
}

}

  </script>
