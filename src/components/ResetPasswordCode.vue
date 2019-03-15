<template>
  <div class="app flex-row align-items-center bg-primary">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="5">
           <div class="mb-3">
            <b-img center height="50" :src="require('./../assets/wa-logo.png')" alt="Wireless Analytics" />
          </div>
          <div class="mb-3">
            <b-img center height="50" :src="require('./../assets/clean-logo-blue.png')" alt="CLEAN Platform" />
          </div>
          <b-card-group>
            <b-card no-body class="p-3">
              <b-card-body>
                <b-form v-on:submit.prevent="submit()">
                  <b-row class="mb-2">
                    <b-col cols="12" class="text-center">
                      <p><strong>{{resetPasswordMessage}}</strong></p>
                    </b-col>
                  </b-row>
                 <b-input-group class="mb-3">
                    <b-input-group-prepend><b-input-group-text><i class="icon-key"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input type="text" v-model="credentials.password1" v-show="passwordType" id="password1" class="form-control" :placeholder="newPassword" autocomplete="Enter your password" />
                    <b-form-input type="password" v-show="!passwordType" id="password1" v-model="credentials.password1" class="form-control" :placeholder="newPassword" autocomplete="Enter your password" />
                  </b-input-group>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend><b-input-group-text><i class="icon-key"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input type="text" v-model="credentials.password2" v-show="passwordType" id="password2" class="form-control" :placeholder="repeatPassword" autocomplete="Reprat your password" />
                    <b-form-input type="password" v-model="credentials.password2" v-show="!passwordType" id="password2" class="form-control" :placeholder="repeatPassword" autocomplete="Reprat your password" />
                  </b-input-group>
                  <b-row class="mb-3">
                    <b-col cols="6">
                        <b-form-checkbox
                        id="checkbox1"
                        v-model="passwordType"
                        >
                        show passwords
                      </b-form-checkbox>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="12" class="text-center">
                      <p>
                      {{message}}
                      </p>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="12">
                      <b-button variant="primary">{{sendRequest}}</b-button>
                    </b-col>
                  </b-row>
                </b-form>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

export default {
  created() {
    this.$store.commit('auth/recoveryVariations');
    this.credentials.identification = this.$route.params.identification;
    this.credentials.code = this.$route.params.code;
  },
  computed: {
    ...mapGetters({
      variations: 'auth/getVariations'
    })
  },
  data() {
    return {
        credentials: {
          identification: '',
          code: '',
          password1: '',
          password2: '',
        },
        passwordType: false,
        newPassword: 'Enter a new password',
        repeatPassword: 'Repeat the password',
        sendRequest: 'change my password',
        resetPasswordMessage: 'Change your password below.',
        version: '4.0.0-rc.1',
        message: 'Here you can reset your password, if it is not valid, you should see an error, if it is correct, you will be redirected to the Login Page.',
        companyEmail: 'Enter your company email'
    }
  },

  mounted() {
    $(function () {
      $('#email').bind('input', function () {
        $(this).val(function (_, v) {
            return v.replace(/\s+/g, '');
          })
      })
    })
  },
  methods: {
    submit() {
      if (this.variations.clickAgain) {
          this.$store.dispatch('error/clearAll')
          this.$store.dispatch('auth/resetPasswords', {
            credentials: this.credentials,
            router:this.$router
          })
        }
    }
  }
}
</script>

<style lang="scss">
</style>
