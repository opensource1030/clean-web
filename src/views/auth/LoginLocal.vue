<template>
  <div class="page auth-page flex-row align-items-center bg-primary">
    <div class="container-fluid">
      <b-alert show variant="danger" v-if="$store.getters['error/hasError']">{{ $store.getters['error/error'] }}</b-alert>
      <b-row class="justify-content-center">
        <b-col lg="5">
          <div class="mb-3">
            <b-img center height="50" :src="require('@/assets/images/clean-logo-blue.png')" alt="CLEAN Platform" />
          </div>
          <b-card-group>
            <b-card no-body>
              <b-card-body>
                <b-form v-on:submit.prevent="submit()">
                  <b-input-group class="mb-3">
                    <b-input-group-prepend><b-input-group-text><i class="fa fa-home"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input type="text" id="email" ref="email" v-model.trim="credentials.email" class="form-control" placeholder="Enter your company email" />
                  </b-input-group>
                  <b-input-group class="mb-4">
                    <b-input-group-prepend><b-input-group-text><i class="fa fa-key"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input type="password" ref="password" v-model="credentials.password" class="form-control" placeholder="Password" autocomplete="current-password" />
                  </b-input-group>
                  <b-row class="mb-3">
                    <b-col cols="6">
                      <b-form-checkbox
                        id="checkbox1"
                        style="color: black;"
                      >remember me</b-form-checkbox>
                    </b-col>
                    <b-col cols="6">
                      <a @click="resetPassword()" style="cursor: pointer; color: black;"><strong>Forgot Password?</strong></a>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="12">
                      <b-button variant="primary" type="submit" class="px-4 w-100">Sign In</b-button>
                    </b-col>
                  </b-row>
                </b-form>
              </b-card-body>
            </b-card>
          </b-card-group>
          <div class="powered-by">
            <span class="align-middle text-white">Powered By</span>
            <img src="@/assets/images/wa-logo.png" alt="Wireless Analytics">
          </div>
        </b-col>
      </b-row>
    </div>
    <div id="version">
      <span v-if="version" class="version">{{ version }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'loginLogin',
  data () {
    return {
      credentials: {
        email: this.$route.params.email,
        password: ''
      },
      deskpro: '',
      error: '',
      // version: 'v 4 . 1 . 1 3',
      version: process.env.VERSION,
    }
  },

  methods: {
    submit() {
      this.$store.dispatch('auth/loginLocal', {
        router: this.$router,
        credentials: this.credentials,
        returnUrl: this.deskpro
      })
    },

    resetPassword(){
      this.$router.push({
        name: 'Reset Password'
      })
    },

    focusPassword() {
      this.$refs.password.focus()
    }
  },

  mounted () {
    let currentLocation = decodeURIComponent(window.location.href);
    if (currentLocation.split('return=').length > 1) {
      this.deskpro = currentLocation.split('return=')[1];
      $('input[name="email"]').focus()
    } else {
      $('input[name="password"]').focus()
    }

    if (this.$route.params.email != null) {
      this.$nextTick(() => this.focusPassword())
    }
  },
}
</script>
