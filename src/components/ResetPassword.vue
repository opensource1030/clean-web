<template>
  <div class="app flex-row align-items-center bg-primary">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="5">
          <div class="mb-3">
            <b-img center height="50" :src="require('@/assets/images/clean-logo-blue.png')" alt="CLEAN Platform" />
          </div>
          <b-card-group>
            <b-card no-body class="p-3">
              <b-card-body>
                <b-form v-on:submit.prevent="submit()">
                  <b-input-group class="mb-3">
                    <b-input-group-prepend><b-input-group-text><i class="icon-home"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input v-model="credentials.email" id="email" type="text" class="form-control" placeholder="Enter your company email" />
                  </b-input-group>
                  <b-row>
                    <b-col cols="12" class="text-center">
                      <p style="color: black;">
                      {{message}}
                      </p>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="12">
                      <b-alert show variant="danger" v-show="$store.getters['error/hasError']">{{ $store.getters['error/error'] }}</b-alert>
                      <b-alert show variant="success" v-show="variations.messageShow">{{ allOk }}</b-alert>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="12">
                      <b-button variant="primary" type="sumbit" class="px-4 w-100">{{ buttonMessage }}</b-button>
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
          <span v-if="version" class="version"> {{ version }}</span>
        </div>
  </div>
</template>

<script>
  import{ mapGetters } from 'vuex'

export default {
  beforeCreate() {
    this.$store.commit('auth/recoveryVariations');
  },
  computed: {
    ...mapGetters({
      variations: 'auth/getVariations'
    })
  },
  data() {
    return {
      credentials: {
        email: '',
      },
      allOk: 'The reset password message has been sent to your email, check it for new instructions.',
      messageShow: false,
      passwordType: false,
      buttonMessage: 'Send Password Reset Link',
      version: process.env.VERSION,
      message: 'If you don\'t know your password, please enter your corporate email address and click Send Password Reset Link',
      companyEmail: 'Enter your company email',
      version: 'v 4 . 1 . 1 3',

    }
  },
  mounted() {
    $(function () {
      $('email').bind('input', function () {
        $(this).val(function (_, v) {
          return v.replace(/\s+/g, '');
        })
      })
    })
  },
  methods: {
    submit() {
      console.log(this.credentials.email)
      if (this.variations.clickAgain) {
        this.$store.dispatch('error/clearAll')
        this.$store.dispatch('auth/resetPasswordEmail', {
          credentials: this.credentials
        })
      }
    }
  }
}
</script>
<style>
#version
{
     position: fixed;
     bottom: 20px;
     left: 50px;
}
</style>
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
