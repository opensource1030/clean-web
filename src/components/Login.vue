<template>
<div>
  <div class="bg-login">
    <div class="login">
      <div class="large-4 large-centered medium-8 medium-centered  columns login-form-holder">
        <div v-if="error" v-show="error">
          <div class="is-error callout" data-closable>
            <div class="container">
              <h5>{{error}}</h5>
            </div>
          </div>
        </div>
        <h1 class="title"><img src="./../assets/clean-logo-blue.png" alt="CLEAN Platform"></h1>
        <div class="login-box">
          <div class="row">
            <div class="large-12 columns">
              <form v-on:submit.prevent="submit()">
                <div class="large-12  columns">
                  <div class="input-group bg-orange">
                    <span class="input-group-label"> <i class="fa fa-user"> </i> </span>
                    <input name="email" id="email" class="input-group-field" type="text" v-model.trim="credentials.email" v-validate="'required|email'" placeholder="Enter your company email" />
                  </div>
                </div>
                <div class="large-12 large-centered columns">
                  <input type="submit" class="button expanded"  value="Sign In"/>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="powered-by">
          <span>Powered By</span>
          <img src="./../assets/wa-logo.png" alt="Wireless Analytics">
        </div>

        <!--<div id="version">-->
          <!--<span v-if="version" class="version"> v{{ version }}</span>-->
        <!--</div>-->
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      credentials: {
        email: ''
      },
      error: '',
      version : '4.0.0-rc.1'
    }
  },

  mounted () {
    // $(function() {
    //   $('input[name="email"]').bind('input', function() {
    //     $(this).val(function(_, v) {
    //       return v.replace(/\s+/g, '');
    //     });
    //   });
    // });

    $('input[name="email"]').focus()
  },

  methods: {
    submit () {
      // auth.login(this, this.credentials, 'dashboard')
      // console.log(this.$store)
      // console.log(this.$validator)
      // if (this.errors.has('email')) {
      //   console.log(this.errors.first('email'))
      // }

      // console.log(this.$store.state.route)
      if (this.errors.errors.length == 0) {
        this.$set(this, 'error', null)
        this.$store.dispatch('auth/login', this.credentials).then((res) => {
          // console.log('login res', res)
          if (res.data.error === 'User Not Found, Register Required') {
            this.$router.push('register')
          } else if (res.data.error == 'User Found, Password Required') {
            this.$router.push({ name: 'loginLocal', params: this.credentials })
          } else if (res.data.error === 'Invalid Email') {;
            this.$set(this, 'error', 'Invalid Email')
          } else {
            this.$set(this, 'error', 'Unexpected server error. Please contact the administrator.')
          }
        }).catch((err) => {
          // console.log('login err', err)
        })
      } else {
        this.$set(this, 'error', this.errors.first('email'));
      }
    },
  }
}
</script>
