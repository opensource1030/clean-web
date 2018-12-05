<template>
<div>
  <div class="bg-login">
    <div class="login">
      <div class="large-4 large-centered medium-8 medium-centered  columns login-form-holder">
        <div v-if="$store.getters['error/hasError']">
          <div class="is-error callout" data-closable>
            <div class="container">
              <h5>{{ $store.getters['error/error'] }}</h5>
            </div>
          </div>
        </div>
        <h1 class="title"><img src="./../assets/clean-logo-blue.png" alt="CLEAN Platform"></h1>
        <div class="login-box">
          <div class="row">
            <div class="large-12 columns">
              <form v-on:submit.prevent="submit()">
                <div class="large-12  columns">
                  <div class="input-group bg-orange">
                    <span class="input-group-label"> <i class="fa fa-user"> </i> </span>
                    <input name="email" id="email" class="input-group-field" type="text"
                           v-model.trim="credentials.email" v-validate="'required|email'"
                           placeholder="Enter your company email"/>
                  </div>
                </div>
                <div class="large-12 large-centered columns">
                  <input type="submit" class="button expanded" value="Sign In"/>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="powered-by">
          <span>Powered By</span>
          <img src="./../assets/wa-logo.png" alt="Wireless Analytics">
        </div>

        <div id="version">
        <span v-if="version" class="version"> {{ version }}</span>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      credentials: {
        email: ''
      },
      version: process.env.VERSION
    }
  },

  mounted() {
    $('input[name="email"]').focus()
  },

  methods: {
    submit() {
      this.$store.dispatch('error/clearAll')
      this.$store.dispatch('auth/login', {
        router: this.$router,
        email: this.credentials.email
      })
    },
  }
}
</script>
