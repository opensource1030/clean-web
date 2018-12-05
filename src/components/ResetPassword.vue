<template>
  <div class="bg-login">
    <div class="login">
      <div class="large-4 large-centered columns login-form-holder">
        <h1 class="title"><img src="./../assets/clean-logo-blue.png" alt="CLEAN Platform"></h1>
        <div class="login-box">
          <div class="row">
            <div class="large-12 small-12 columns">
              <form v-on:submit.prevent="submit()">
                <div class="row">
                  <div class="large-12 small-12 columns">
                    <div class="input-group bg-orange">
                        <span class="input-group-label"> <i class="fa fa-home"> </i> </span>
                        <input id="email" class="input-group-field" type="text" v-model="credentials.email" :placeholder="companyEmail"/>
                    </div>
                  </div>
                </div>
                <div class="large-12 small-12 columns" style="text-align:center; color:black; padding-bottom: 20px;">
                  {{message}}
                </div>
                <div v-show="$store.getters['error/hasError']" class="large-12 small-12 columns" style="text-align:center; color:red; padding-bottom: 20px;">
                  {{$store.getters['error/error']}}
                </div>
                <div v-show="variations.messageShow" class="large-12 small-12 columns" style="text-align:center; color:green; padding-bottom: 20px;">
                  {{allOk}}
                </div>
                <div class="row">
                  <div class="large-12 large-centered small-12 columns" v-show="variations.clickAgain">
                    <input type="submit" class="button expanded" :value="buttonMessage"/>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <span v-if="version" class="version"> {{ version }}</span>
        <div class="powered-by">
          <span>Powered By</span>
          <img src="./../assets/wa-logo.png" alt="Wireless Analytics">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

export default {
  beforeCreate() {
    this.$store.commit('auth/recoveryVariations');
  },
  computed: {
    ...mapGetters({
      variations: 'auth/getVariations',
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
      companyEmail: 'Enter your company email'
    }
  },
  mounted() {
    $(function () {
      $('#email').bind('input', function () {
        $(this).val(function (_, v) {
          return v.replace(/\s+/g, '');
        });
      });
    });
  },
  methods: {
    submit() {
      if (this.variations.clickAgain) {
        this.$store.dispatch('error/clearAll')
        this.$store.dispatch('auth/resetPasswordEmail', {
          credentials: this.credentials
        });
      }
    }
  }
}
</script>
