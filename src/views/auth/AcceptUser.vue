<template>
  <div class="page auth-page flex-row align-items-center bg-primary">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="5">
           <div class="mb-3">
            <b-img center height="50" :src="require('@/assets/images/wa-logo.png')" alt="Wireless Analytics" />
          </div>
          <div class="mb-3">
            <b-img center height="50" :src="require('@/assets/images/clean-logo-blue.png')" alt="CLEAN Platform" />
          </div>
          <b-card-group>
            <b-card no-body class="p-3">
              <b-card-body>
                <b-card-text class="text-center" v-show="messageShow"><p class="messageAcceptUser">{{message}}</p></b-card-text>
                <b-card-text class="text-center" v-show="errorShow"><p class="errorAcceptUser">{{error}}</p></b-card-text>
                <b-row v-show="messageShow">
                  <b-col cols="12">
                      <b-button block variant="primary" @click="submit()" type="submit">{{buttonMessage}}</b-button>
                    </b-col>
                </b-row>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
    <div id="version">
      <span v-if="version" class="version"> {{ version }}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// var config = require('@/../config/dev.env')
// const API_BASE_URL = config.URL_API
const API_BASE_URL = process.env.URL_API

export default {
  created() {
    console.log("created")

    this.credentials.identification = this.$route.params.identification;
    this.credentials.code = this.$route.params.code;
    if (this.credentials.identification != '' && this.credentials.code != '') {
      this.$http.get(API_BASE_URL + '/acceptUser/' + this.credentials.identification + '/' + this.credentials.code).then((response) => {
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
      version: '4 . 0 . 0 - r c . 1',
    }
  },

  methods: {
    submit() {
      this.$router.push({name: 'login'});
    }
  },

  mounted() {
    console.log("mounted")
    $(function () {
      $('#email').bind('input', function () {
        $(this).val(function (_, v) {
          return v.replace(/\s+/g, '');
        })
      })
    })
  }
}
</script>

<style lang="scss">
.messageAcceptUser {
  color: green;
}
.errorAcceptUser {
  color: red;
}
</style>
