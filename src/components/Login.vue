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
                    <b-input-group-prepend><b-input-group-text><i class="icon-user"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input type="text" v-model.trim="credentials.email" class="form-control" placeholder="Enter your company email" />
                  </b-input-group>
                  <b-row>
                    <b-col cols="12">
                      <b-button type="submit" variant="primary" class="px-4 w-100 ">Sign In</b-button>
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
  name: 'Login',
  data () {
    return {
      credentials: {
        email: ''
      }
    }
  },
  mounted() {
    $('input[name="email"]').focus()
  },

  methods: {
    submit(){
      this.$store.dispatch('error/clearAll')
      this.$store.dispatch('auth/login', {
        router: this.$router,
        email: this.credentials.email
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

  .bg-login{
    background: #066199;
  }

}
</style>
