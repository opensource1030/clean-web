<template>
<div>
  <div class="bg-login">
    <div class="login">
      <div class="large-4 large-centered columns login-form-holder">
        <div v-if="$store.getters['error/hasError']">
          <div class="is-error callout" data-closable>
            <h5>{{ $store.getters['error/error'] }}</h5>
          </div>
        </div>
        <h1 class="title"><img src="./../assets/clean-logo-blue.png" alt="CLEAN Platform"></h1>
        <div class="login-box">
          <div class="row">
            <div class="large-12 columns">
              <form v-on:submit.prevent="submit()">
                <div class="row">
                  <div class="large-12 columns">
                    <div class="input-group bg-orange">
                      <span class="input-group-label"><i class="fa fa-home"></i></span>
                      <input name="email" id="email" class="input-group-field" type="text"
                          v-model.trim="credentials.email" placeholder="Enter your company email" />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="large-12 columns">
                    <div class="input-group bg-orange">
                      <span class="input-group-label"> <i class="fa fa-key"></i></span>
                      <input name="password" class="input-group-field" type="password" v-model="credentials.password"
                          v-validate="'required'" placeholder="Password"/>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="large-6 small-12 columns">
                    <input id="checkbox3" type="checkbox"><label for="checkbox3">remember me</label>
                  </div>
                  <div class="large-6 small-12 columns">
                    <a @click="resetPassword()" id="button"><strong>Forgot Password?</strong></a>
                  </div>
                </div>
                <div class="row">
                  <div class="large-12 large-centered columns">
                    <input type="submit" class="button expanded" value="Sign In"/>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <span v-if="version" class="version">{{ version }}</span>
        <div class="powered-by">
          <span>Powered By</span>
          <img src="./../assets/wa-logo.png" alt="Wireless Analytics">
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "loginLocal",

  data() {
    return {
      credentials: {
        // email: localStorage.getItem('email'),
        email: this.$route.params.email,
        password: ''
      },
      deskpro: '',
      error: '',
      version: process.env.VERSION
    }
  },

  mounted() {
    let currentLocation = decodeURIComponent(window.location.href);
    if(currentLocation.split('return=').length > 1) {
      this.deskpro = currentLocation.split('return=')[1];
      $('input[name="email"]').focus()
    } else
      $('input[name="password"]').focus()
  },

  methods: {
    submit() {
      this.$store.dispatch('auth/loginLocal', {
        router: this.$router,
        credentials: this.credentials,
        returnUrl: this.deskpro
      })
    },

    resetPassword() {
      this.$router.push({
        name: 'Reset Password'
      });
    }
  },
}
</script>
