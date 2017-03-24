<template>
  <div class="bg-login">
    <div class="login">
      <div class="large-4 large-centered columns login-form-holder">
        <img src="./../assets/wa-logo.png" alt="Wireless Analytics">
        <h1 class="title"><img src="./../assets/clean-logo-blue.png" alt="CLEAN Platform"></h1>
        <div class="login-box">
          <div class="row">
            <div class="large-12 small-12 columns">
              <div v-show="messageShow" class="large-12 small-12 columns" style="text-align:center; color:green; padding-bottom: 20px;">
                {{message}}
              </div>
              <div v-show="errorShow" class="large-12 small-12 columns" style="text-align:center; color:red; padding-bottom: 20px;">
                {{error}}
              </div>
              <div v-show="messageShow" class="row">
                <div class="large-12 large-centered small-12 columns">
                  <input  @click="submit()" type="submit" class="button expanded" :value="buttonMessage"/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <span v-if="version" class="version"> {{ version }}</span>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  created() {
    this.credentials.identification = this.$route.params.identification;
    this.credentials.code = this.$route.params.code;
    if (this.credentials.identification != '' && this.credentials.code != '') {
      this.$http.get(process.env.URL_API + '/acceptUser/' + this.credentials.identification + '/' + this.credentials.code)
        .then((response) => {
          this.messageShow = true;
        }, (response) => {
          if (response.data.message == 'User is already Active') {
            this.messageShow = true;
            this.message = response.data.message;
          } else {
            this.errorShow = true;
          }

        });
    } else {
      this.errorShow = true;
    }
  },
  data() {
    return {
      credentials: {
        identification: '',
        code: '',
      },
      message: 'Your account has been created! Please, enter the login page and enjoy!',
      messageShow: false,
      error: 'The User has not been created properly, try again later, sorry for the inconvenience.',
      errorShow: false,
      buttonMessage: 'Redirect to Login Page',
      version : '4.0.0-rc.1',
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
      this.$router.push({name: 'login'});
    }
  }
}

</script>
