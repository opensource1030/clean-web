import { Storage, Utils } from "@/helpers"

var { Store } = require('yayson')()
var store = new Store()

export default {
  name: "LegacyInfo",

  data(){
    return {
      token: localStorage.token
    }
  },

  computed: {
    iframeUrl : function (){
      return process.env.LEGACY_URL + "/app/wrf/default.asp?token=" + JSON.parse(this.token)['access_token'] + "&version=v4"
    }
  },

  methods: {
    backLegacy() {
      history.back();
    },

    closeLegacy() {
      this.$router.push('/dashboard');
    },
  },

  mounted() {
    let legacySpaceHeight = $('.legacy-form-holder .pop-content').height() - $('.legacy-form-holder .form-header').outerHeight() - $('.legacy-heading').outerHeight() - 30
    $('.legacy-form-holder .iframe-wrapper').css('height', legacySpaceHeight + 'px') // Set content height
  }
}
