

<template>
  <div>
  <div class=class="bg-login">
    <div class="login">
  <div class="large-4 large-centered columns login-form-holder">
    <img src="/dest/images/wa_logo.png" alt="Wireless Analytics">
    <div style="color:black">
          {{error}}

</div>

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
    error: ''
  }
},
methods: {
    name: "Login",
  submit() {
    var credentials = {
      email: this.credentials.email

    }
    // We need to pass the component's this context
    // to properly make use of http in the auth service
    auth.login(this, credentials, 'dashboard')
  }
}

}



  </script>
