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
                        <input class="input-group-field" type="text" v-model="credentials.firstName" placeholder="First Name" />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="large-12 columns">
                      <div class="input-group bg-orange">
                        <span class="input-group-label"> <i class="fa fa-user"> </i> </span>
                        <input class="input-group-field" type="text" v-model="credentials.lastName" placeholder="Last Name" />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="large-12 columns">
                      <div class="input-group bg-orange">
                        <span class="input-group-label"> <i class="fa fa-key"> </i> </span>
                        <input class="input-group-field" type="email" v-model="credentials.email" placeholder="email" readonly/>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="large-12 columns">
                      <div class="input-group bg-orange">
                        <span class="input-group-label"> <i class="fa fa-key"> </i> </span>
                        <input v-if="passwordType" id="password1" class="input-group-field" type="text" v-model="credentials.password1" :placeholder="newPassword"/>
                        <input v-if="!passwordType" id="password1" class="input-group-field" type="password" v-model="credentials.password1" :placeholder="newPassword"/>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="large-12 columns">
                      <div class="input-group bg-orange">
                        <span class="input-group-label"> <i class="fa fa-key"> </i> </span>
                        <input v-if="passwordType" id="password2" class="input-group-field" type="text" v-model="credentials.password2" :placeholder="repeatPassword"/>
                        <input v-if="!passwordType" id="password2" class="input-group-field" type="password" v-model="credentials.password2" :placeholder="repeatPassword"/>
                      </div>
                    </div>
                  </div>
                  <div class="large-6 end small-6 columns"  style="text-align: left;">
                    <input id="checkbox3" type="checkbox" v-model="passwordType"><label for="checkbox3">show passwords</label>
                  </div>
                  <div class="large-12 columns" style="color: red; padding-bottom: 10px; font-weight: bold;">
                    {{error}}
                  </div>
                  <div class="row">
                    <div class="large-12 large-centered columns">
                      <input type="submit" class="button expanded"   value="Sign In"/>
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
      error: ''
    }
  },
  methods: {
    submit() {
      this.error = '';
      if (this.credentials.firstName == '') {
        this.error = 'The First Name must not be empty, please, fill it properly.';
      }
      if (this.credentials.lastName == '') {
        this.error = 'The Last Name must not be empty, please, fill it properly.';
      }
      if (this.credentials.password1 == '' || this.credentials.password2 == '') {
        this.error = 'The Passwords must not be empty, please, fill it properly.';
      }
      if (this.credentials.password1 !=  this.credentials.password2) {
        this.error = 'The Passwords must be equals, please, fill it properly.';
      }

      if (this.error == '') {
        let credentials = {
          firstName: this.credentials.firstName,
          password:this.credentials.lastName,
          email:this.credentials.email,
          password1: this.credentials.password1,
          password2: this.credentials.password2,
        }
        auth.register(this, credentials, 'dashboard');
      }
    }
  }
}
</script>
