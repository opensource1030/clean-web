var {Store} = require('yayson')()
var store = new Store()
import {format, parse} from "libphonenumber-js";
import supportRequest from "./support-request";
import Avatar from "vue-avatar/dist/Avatar";
import Breadcrumb from "vue-bulma-breadcrumb";
import ClientInfo from "./ClientInfo.vue";
import ChargeInfo from "./ChargeInfo.vue";
import Morphsearch from "./Morphsearch.vue";
import Piechart from "./Piechart.vue";
import Trendchart from "./Trendchart.vue";
import SpentInfo from "./SpentInfo.vue";
import LegacyInfo from "./LegacyInfo.vue";
import swal from "sweetalert2";
require('script!jquery');
require('script!jquery-match-height');
require('script!jquery-validation');
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

  data () {
    return {
      data: {},
      version: null,
      piechartData: [],
      trendchartData: [],
      LegacyData: ''
    }
  },

  mounted () {
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
        let link = this.href;
        e.preventDefault();
        swal({
          title: 'Are you sure?',
          text: "You will be redirected to our Legacy Reports",
          type: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, redirect !'
        }).then(function () {
          swal(
            'Hurray!',
            'Your have been redirected',
            'success'
          )
          window.location = (link);
        }, function (dismiss) {
          // dismiss can be 'cancel', 'overlay',
          // 'close', and 'timer'
          if (dismiss === 'cancel') {
            swal(
              'Cancelled',
              'You have cancelled redirect',
              'error'
            )
          }
        });
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

  },

  methods: {},
}
