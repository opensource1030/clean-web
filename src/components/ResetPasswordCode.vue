<template>
  <div class="bg-login">
    <div class="login">
      <div class="large-4 large-centered columns login-form-holder">
        <img src="./../assets/wa-logo.png" alt="Wireless Analytics">
        <h1 class="title"><img src="./../assets/clean-logo-blue.png" alt="CLEAN Platform"></h1>
        <div class="login-box">
          <div class="row">
            <div class="large-12 small-12 columns">
              <form v-on:submit.prevent="submit()">
                <div class="row">
                  <div class="large-12 small-12 columns">
                    <div style="color: black; text-align: center; padding-bottom: 20px;">
                      <h6>{{resetPasswordMessage}}</h6>
                    </div>
                    <div class="row">
                      <div class="large-12 columns">
                        <div class="input-group bg-orange">
                          <span class="input-group-label"> <i class="fa fa-key"> </i> </span>
                          <input v-show="passwordType" id="password1"
                          class="input-group-field" type="text"
                          v-model="credentials.password1" :placeholder="newPassword"/>
                          <input v-show="!passwordType" id="password1"
                          class="input-group-field" type="password"
                          v-model="credentials.password1" :placeholder="newPassword"/>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="large-12 columns">
                        <div class="input-group bg-orange">
                          <span class="input-group-label"> <i class="fa fa-key"> </i> </span>
                          <input v-show="passwordType" id="password2"
                          class="input-group-field" type="text"
                          v-model="credentials.password2"
                          :placeholder="repeatPassword"/>
                          <input v-show="!passwordType" id="password2"
                          class="input-group-field" type="password"
                          v-model="credentials.password2"
                          :placeholder="repeatPassword"/>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="large-6 end small-6 columns" style="padding-left: 30px;">
                    <input id="checkbox3" type="checkbox" v-model="passwordType"><label
                    for="checkbox3">show passwords</label>
                  </div>
                </div>
                <div class="large-12 small-12 columns" style="color:black; padding-bottom: 20px;">
                  {{message}}
                </div>
                <div v-show="$store.getters['error/hasError']" class="large-12 small-12 columns"
                style="color:red; padding-bottom: 20px;">
                {{$store.getters['error/error']}}
              </div>
              <div class="row">
                <div class="large-12 large-centered small-12 columns">
                  <input type="submit" class="button expanded" :value="sendRequest"/>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <span v-if="version" class="version"> {{ version }}</span>
    </div>
  </div>
</div>
</template>

<script>
  import {
    mapGetters,
  } from 'vuex'
  export default {
    created() {
      this.$store.commit('auth/recoveryVariations');
      this.credentials.identification = this.$route.params.identification;
      this.credentials.code = this.$route.params.code;
    },
    computed: {
      ...mapGetters({
        variations: 'auth/getVariations',
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
          });
        });
      });
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
