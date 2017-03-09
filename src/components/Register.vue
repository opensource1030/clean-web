<template>
  <div>
    <div class="bg-login">
      <div class="login">
        <div class="large-4 large-centered columns login-form-holder">
          <img src="./../assets/wa-logo.png" alt="Wireless Analytics">
          <div class="login-box">
            <div class="row">
              <div class="large-12 columns">
                <form  v-on:submit.prevent="submit()">
                  <div class="row">
                    <div class="large-12 columns">
                      <div class="input-group bg-orange">
                        <span class="input-group-label"> <i class="fa fa-user"> </i> </span>
                        <input v-show="allowChanges" class="input-group-field" type="text" v-model="credentials.firstName" placeholder="First Name" />
                        <input v-show="!allowChanges" class="input-group-field" type="text" v-model="credentials.firstName" placeholder="First Name" disabled/>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="large-12 columns">
                      <div class="input-group bg-orange">
                        <span class="input-group-label"> <i class="fa fa-user"> </i> </span>
                        <input v-show="allowChanges" class="input-group-field" type="text" v-model="credentials.lastName" placeholder="Last Name" />
                        <input v-show="!allowChanges" class="input-group-field" type="text" v-model="credentials.lastName" placeholder="Last Name" disabled/>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="large-12 columns">
                      <div class="input-group bg-orange">
                        <span class="input-group-label"> <i class="fa fa-user"> </i> </span>
                        <input class="input-group-field" type="email" v-model="credentials.email" placeholder="email" disabled/>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="large-12 columns">
                      <div class="input-group bg-orange">
                        <span class="input-group-label"> <i class="fa fa-key"> </i> </span>
                        <input v-show="passwordType && allowChanges" id="password1" class="input-group-field" type="text" v-model="credentials.password1" :placeholder="newPassword"/>
                        <input v-show="!passwordType && allowChanges" id="password1" class="input-group-field" type="password" v-model="credentials.password1" :placeholder="newPassword"/>
                        <input v-show="passwordType && !allowChanges" id="password1" class="input-group-field" type="text" v-model="credentials.password1" :placeholder="newPassword" disabled/>
                        <input v-show="!passwordType && !allowChanges" id="password1" class="input-group-field" type="password" v-model="credentials.password1" :placeholder="newPassword" disabled/>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="large-12 columns">
                      <div class="input-group bg-orange">
                        <span class="input-group-label"> <i class="fa fa-key"> </i> </span>
                        <input v-show="passwordType && allowChanges" id="password2" class="input-group-field" type="text" v-model="credentials.password2" :placeholder="repeatPassword"/>
                        <input v-show="!passwordType && allowChanges" id="password2" class="input-group-field" type="password" v-model="credentials.password2" :placeholder="repeatPassword"/>
                        <input v-show="passwordType && !allowChanges" id="password2" class="input-group-field" type="text" v-model="credentials.password2" :placeholder="repeatPassword" disabled/>
                        <input v-show="!passwordType && !allowChanges" id="password2" class="input-group-field" type="password" v-model="credentials.password2" :placeholder="repeatPassword" disabled/>
                      </div>
                    </div>
                  </div>
                  <div class="large-6 end small-6 columns"  style="text-align: left;">
                    <input id="checkbox3" type="checkbox" v-model="passwordType"><label for="checkbox3">show passwords</label>
                  </div>
                  <div class="large-12 columns" style="color: red; padding-bottom: 10px; font-weight: bold;">
                    {{error}}
                  </div>
                  <div class="large-12 columns" style="color: green; padding-bottom: 10px; font-weight: bold;">
                    {{message}}
                  </div>
                  <div class="row">
                    <div v-show="allowChanges" class="large-12 large-centered columns">
                      <input type="submit" class="button expanded" :value="buttonMessage"/>
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
  name: "register",
  data() {
    return {
      clickAgain: true,
      allowChanges: true,
      credentials: {
        firstName: '',
        lastName:'',
        email: localStorage.getItem('email'),
        password1: '',
        password2: '',
      },
      newPassword: 'Enter your password',
      repeatPassword: 'Repeat your password',
      passwordType: false,
      buttonMessage: 'Register New User',
      message: '',
      error: '',
    }
  },
  methods: {
    submit() {
      if (this.clickAgain) {
        auth.register(this, this.credentials);
      }
    }
  }
}
</script>
