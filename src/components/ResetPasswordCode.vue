<template>
  <div class="bg-login">
    <div class="login">
      <div class="large-4 large-centered columns login-form-holder">
        <img src="./../assets/wa-logo.png" alt="Wireless Analytics">
        <h1 class="title"><img src="./../assets/clean-logo-blue.png" alt="CLEAN Platform">  </h1>
        <div class="login-box">
          <div class="row">
            <div class="large-12 small-12 columns">
              <form v-on:submit.prevent="submit()">
                <div class="row">
                  <div class="large-12 small-12 columns">
                    <div style="color: black; text-align: center; padding-bottom: 20px;">
                      <h6>{{resetPasswordMessage}}</h6>
                    </div>
                    <div class="input-group bg-orange">
                      <span class="input-group-label"> <i class="fa fa-key"> </i> </span>
                      <input id="password1" class="input-group-field" type="password" v-model="credentials.password1" :placeholder="newPassword"/>
                    </div>
                    <div class="input-group bg-orange">
                      <span class="input-group-label"> <i class="fa fa-key"> </i> </span>
                      <input id="password2" class="input-group-field" type="password" v-model="credentials.password2" :placeholder="repeatPassword"/>
                    </div>
                  </div>
                </div>
                <div class="large-12 small-12 columns" style="color:black; padding-bottom: 20px;">
                  {{message}}
                </div>
                <div v-show="errorShow" class="large-12 small-12 columns" style="color:red; padding-bottom: 20px;">
                  {{error}}
                </div>
                <div class="row">
                  <div class="large-12 large-centered small-12 columns">
                    <input type="submit" class="button expanded"  :value="sendRequest"/>
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
import auth from './../api/auth';
export default {
  created() {
    this.credentials.identification = this.$route.params.identification;
    this.credentials.code = this.$route.params.code;
  },
  data() {
    return {
      // We need to initialize the component with any
      // properties that will be used in it
      credentials: {
        identification: '',
        code: '',
        password1: '',
        password2: '',
      },
      error: '',
      errorShow: false,
      newPassword: 'Enter a new password',
      repeatPassword: 'Repeat the password',
      sendRequest: 'change my password',
      resetPasswordMessage: 'Change your password below.',
      version : '4.0.0-rc.1',
      message: 'Here you can reset your password, if it is not valid, you should see an error, if it is correct, you will be redirected to the Login Page.',
      companyEmail: 'Enter your company email'
    }
  },
  mounted(){
    $(function(){
      $('#email').bind('input', function(){
        $(this).val(function(_, v){
          return v.replace(/\s+/g, '');
        });
      });
    });
  },
  methods: {
    submit() {
      let params = {
        params:{
          password1: this.credentials.password1,
          password2: this.credentials.password2,
        }
      };
      this.errorShow = false;
      this.messageShow = false;
      if(this.credentials.password1 == this.credentials.password2 && this.credentials.password1 != '' && this.credentials.password2 != '') {
        this.$http.get(process.env.URL_API + '/resetPassword/' + this.credentials.identification + '/' + this.credentials.code, params).then((response) => {
          console.log(response);
          if(response.body == 'Ok') {
            this.$router.push({name: 'login'});
          }
        }, (response) => {
          if (response.status == 404) {
            this.error = 'Please Enter a Valid Email';
            this.errorShow = true;
          }
          if (response.status == 500) {
            this.error = 'Unexpected error, please, try again later.'
            this.errorShow = true;
          }
        });
      } else {
        this.error = 'The password fields must be equal and not empty, please, try again.'
        this.errorShow = true;
      }
    }
  }
}
</script>
