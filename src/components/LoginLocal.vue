<template>
  <div class="app flex-row align-items-center bg-primary">
    <div class="container">
      <b-alert show variant="danger" v-if="$store.getters['error/hasError']">{{ $store.getters['error/error'] }}</b-alert>
      <b-row class="justify-content-center">
        <b-col md="5">
          <div class="mb-3">
            <b-img center height="50" :src="require('./../assets/clean-logo-blue.png')" alt="CLEAN Platform" />
          </div>
          <b-card-group>
            <b-card no-body class="p-3">
              <b-card-body>
                <b-form v-on:submit.prevent="submit()">
                  <b-input-group class="mb-3">
                    <b-input-group-prepend><b-input-group-text><i class="icon-home"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input type="text" id="email" v-model.trim="credentials.email" class="form-control" placeholder="Enter your company email" />
                  </b-input-group>
                  <b-input-group class="mb-4">
                    <b-input-group-prepend><b-input-group-text><i class="icon-key"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input type="password" v-model="credentials.password" class="form-control" placeholder="Password" autocomplete="current-password" />
                  </b-input-group>
                  <b-row class="mb-3">
                    <b-col cols="6">
                        <b-form-checkbox
                        id="checkbox1"
                        style="color: black;"
                        >
                        remember me
                        </b-form-checkbox>
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
            <img src="./../assets/wa-logo.png" alt="Wireless Analytics">
          </div>
        </b-col>
      </b-row>
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
      error: ''
    }
  },

  mounted () {
    let currentLocation = decodeURIComponent(window.location.href);
    if(currentLocation.split('return=').length > 1){
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

    resetPassword(){
      this.$router.push({
        name: 'Reset Password'
      })
    }
  }
}
</script>

<style lang="scss">
.powered-by{
  max-width: 210px;
  margin: 3rem auto 0;
  overflow: hidden;
  span{
    float: left;
    line-height:2rem;
    font-size: 0.82rem;
  }
  img{
    float: right;
    max-width: 130px;
    border-left:1px solid lighten(black,45%);
    padding-left: 0.5rem ;
  }

}
</style>
