<template>
  <div class="bg-login">
    <div class="login">
      <div class="large-4 large-centered columns login-form-holder">
        <h1 class="title"><img src="./../assets/clean-logo-blue.png" alt="CLEAN Platform">  </h1>
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
                <div v-show="errorShow" class="large-12 small-12 columns" style="text-align:center; color:red; padding-bottom: 20px;">
                  {{error}}
                </div>
                <div v-show="messageShow" class="large-12 small-12 columns" style="text-align:center; color:green; padding-bottom: 20px;">
                  {{allOk}}
                </div>
                <div class="row">
                  <div class="large-12 large-centered small-12 columns">
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
import auth from './../api/auth';
export default {
  data() {
    return {
      // We need to initialize the component with any
      // properties that will be used in it
      credentials: {
        email: '',
        emailSSO: 'data1@wirelessanalytics.com',
        emailPass: 'wiegand.tiara@example.com',
      },
      error: '',
      allOk: 'The reset password message has been sent to your email, check it for new instructions.',
      errorShow: false,
      messageShow: false,
      buttonMessage: 'Send Password Reset Link',
      version : '4.0.0-rc.1',
      message: 'If you don\'t know your password, please enter your corporate email address and click Send Password Reset Link',
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
      let params = {params:{
        'url': process.env.URL
      }};
      this.errorShow = false;
      this.messageShow = false;
      this.error = '';
      if (this.credentials.email != '') {
        console.log(this.credentials.email);
        this.$http.get(process.env.URL_API + '/resetPassword/' + this.credentials.email, params).then((response) => {
          if (response.data.message == 'email sent') {
            this.messageShow = true;
          }
        }, (response) => {
          console.log(response.data);
          if (response.data.message == 'not valid email') {
            this.error = 'The email retrieved is not valid, please, try again with another one.';
          }
          if (response.data.message == 'company not found') {
            this.error = 'The email retrieved has not any Company associated, please, try again with another one.';
          }
          if (response.data.message == 'user not found') {
            this.error = 'The email retrieved has not any User associated, please, try again with another one.';
          }
          if (response.data.message == 'company has sso') {
            this.error = 'The user has Single Sign On associated, please, use the login page.';
          }
          if (response.status == 500) {
            this.error = 'Server error, please, try again later.';
          }
          if (this.error == '') {
            this.error = 'Unexpected error, please, try again later.';
          }
          this.errorShow = true;
        });
      } else {
        this.error = 'The email field must not be null, please, enter a valid email.';
        this.errorShow = true;
      }
    }
  }
}
</script>
