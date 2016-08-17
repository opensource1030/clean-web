<template>
  <div class=class="bg-login">
    <div class="login">
  <div class="large-4 large-centered columns login-form-holder">

    <h1 class="title">Clean <sup class="version">beta 3.0</sup> </h1>

    <div class="login-box">
      <div class="row">
        <div class="large-12 columns">
          <form>
            <div class="row">
              <div class="large-12 columns">
                <div class="input-group">
                  <span class="input-group-label"> <i class="fa fa-home"> </i> </span>
                  <input class="input-group-field" type="text" v-model="credentials.email" placeholder="Username" />
                </div>

              </div>
            </div>
            <div class="row">
              <div class="large-12 columns">
                <div class="input-group">
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
                <input type="submit" class="button expanded" @click="submit()" value="Sign In"/>
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
      email: '',
      password:''

    },
    error: ''
  }
},
methods: {
    name: "Register",
  submit() {
    var credentials = {
      email: this.credentials.email,
      password:this.credentials.password

    }
    // We need to pass the component's this context
    // to properly make use of http in the auth service
    auth.register(this, credentials, 'dashboard')
  }
}

}

  </script>
