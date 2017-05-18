import Vue from 'vue'
import supportRequest from './support-request'
import { format, parse } from 'libphonenumber-js'
let {Store} = require('yayson')()
let store = new Store()

export default {
  name: "SpentInfo",
  data(){
    return {
      userInfo: {},
      allocation: {},
      popOver: true,
    }
  },
  created(){
    this.userInfo = JSON.parse(localStorage.userProfile);

    this.$http.get(process.env.URL_API + '/allocations/' + this.$route.params.id).then((response) => {
      this.allocation = store.sync(response.data);
    });
  },
  mounted () {
    setTimeout(supportRequest, 500);
    
    $('.has-tip').foundation();

    $('.scrollup').click(function () {
      $("html, body").animate({
        scrollTop: 0
      }, 600);

      $(".pop-content").scrollTop(0);
      return false;
    });
  },
  computed: {
    mobileNumber: function () {
      return this.allocation.mobile_number ? format(this.allocation.mobile_number,'US','National') : '-'
    }
  }
}