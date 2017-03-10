var {Store} = require('yayson')()
var store = new Store()
import {format, parse} from 'libphonenumber-js'
require('script!jquery');
require('script!jquery-match-height');
require('script!jquery-validation');
var Analytics = require('analytics-node');
const analytics = new Analytics('Dy0QNnCp8KikotmDFBXziH1LqHtSVpVt');
import _ from 'lodash';
import auth from './../api/auth'
import supportRequest from './support-request'
import Vue from 'vue'
import Avatar from 'vue-avatar/dist/Avatar'
import Breadcrumb from 'vue-bulma-breadcrumb'
import ClientInfo from './ClientInfo.vue'
import ChargeInfo from './ChargeInfo.vue'
import Morphsearch from './Morphsearch.vue'
import Piechart from './Piechart.vue'
import Trendchart from './Trendchart.vue'
import SpentInfo from './SpentInfo.vue'
import LegacyInfo from './LegacyInfo.vue'
const Flatpickr = require("flatpickr");

export default {
  name: "Dashboard",
  components: {
    Breadcrumb,
    Morphsearch,
    ClientInfo,
    ChargeInfo,
    Piechart,
    Trendchart,
    Avatar,
    SpentInfo,
    LegacyInfo
  },
  mounted(){
    $(document).keyup(function (e) {
      if ($('.spent-info').hasClass('active') && e.keyCode == 27) {
        setTimeout(function () {
          history.back();
        }, 200)
      } else if ($('.support-form-holder').is(":visible") && e.keyCode == 27) {
        setTimeout(function () {
          $('#btn-close').click();
        }, 200)
      }
    });

    $('.redirect-link a').each(function (e) {
      $(this).click(function (e) {
        var link = this.href;
        var $modalredirect = $('#modal');
        e.preventDefault();
        $modalredirect.addClass('is-error').html("<h5 class='text-center'>You will now be redirected to this section in our legacy app</h5>").foundation('open');
        setTimeout(function () {
          $('.for-dashboard').hide(100);
          $modalredirect.foundation('close');
          window.location = link;
        }, 2000);
      });
    });

    this.$http.get(process.env.URL_API + '/users/' + localStorage.userId + '?include=companies,companies.contents,companies.currentBillMonths,allocations&filter[allocations.billMonth]=[currentBillMonths.last:3]', {}).then((response) => {
      var event = store.sync(response.data);
      if (event.companies.length > 0) {
        var clientdata = event.companies[0].contents[0].content;
        this.$http.get(clientdata, {}).then((response) => {
          this.data = response.data;
        });
      }
    }, (response) => {
    });

    this.$http.get(process.env.URL_API + '/users/' + localStorage.userId + '?include=companies,companies.contents,companies.currentBillMonths,allocations&filter[allocations.billMonth]=[currentBillMonths.last:1]', {}).then((response) => {
      var event = store.sync(response.data);
      if (event.allocations && event.allocations.length > 0) {
        this.$set(this, 'piechartData', event.allocations);
      }
      if (event.allocations && event.allocations.length > 0) {
        this.$set(this, 'trendchartData', event.allocations);
      }
    }, (response) => {
    });
    setTimeout(supportRequest, 2500);
    chmln.identify({
      uid: localStorage.userId /* A stable, unique identifier */,
      email: JSON.parse(localStorage.getItem("userProfile")).email, /*created: user.created_at*/ /* Timestamp when the user was added to your system */
    });
    analytics.identify({
      userId: 'localStorage.userId',
      traits: {
        name: JSON.parse(localStorage.getItem("userProfile")).first_name,
        email: JSON.parse(localStorage.getItem("userProfile")).email
      }
    });


  },
  methods: {
    logout() {
      auth.logout()
    }
  },
  data(){
    return {
      data: {},
      version: null,
      user: auth.user,
      piechartData: [],
      trendchartData: [],
      LegacyData: ''
    }
  }
}
