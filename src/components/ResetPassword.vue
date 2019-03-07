<template>
  <div class="app flex-row align-items-center bg-login">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="5">
          <div class="mb-3">
            <b-img center height="50" :src="require('./../assets/clean-logo-blue.png')" alt="CLEAN Platform" />
          </div>
          <b-card-group>
            <b-card no-body class="p-3">
              <b-card-body>
                <b-form>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend><b-input-group-text><i class="icon-home"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input type="text" class="form-control" placeholder="Enter your company email" />
                  </b-input-group>
                  <b-row>
                    <b-col cols="12" class="text-center">
                      <p>
                      {{message}}
                      </p>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="12">
                      <b-button variant="primary" class="px-4 w-100">{{buttonMessage}}</b-button>
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
      message: 'If you don\'t know your password, please enter your corporate email address and click Send Password Reset Link',
      companyEmail: 'Enter your company email',
      buttonMessage: 'Send Password Reset Link',
      allOk: 'The reset password message has been sent to your email, check it for new instructions.'

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
