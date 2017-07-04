import Vue from "vue";
import VueAnalytics from "vue-analytics";
import "script!jquery";
import "script!select2";
import "script!jquery.cookie";

import "./modules/jquery.tag-editor/jquery.caret.min.js";
import "./modules/jquery.tag-editor/jquery.tag-editor.js";

import VueCharts from "./../node_modules/vue-charts/dist/vue-charts.js";

import "./../node_modules/slicknav/dist/jquery.slicknav.js";
import "./../node_modules/stacktable.js/stacktable.js";
// stylesheets
import "./styles/app.scss";
import "./../node_modules/font-awesome/scss/font-awesome.scss";
import "./../node_modules/sweetalert2/src/sweetalert2.scss";

import "script!what-input";
import "script!foundation-sites/dist/js/foundation.min";

import App from "./App.vue";
import VeeValidate from "vee-validate";
import Vue2Filters from "vue2-filters";
import store from "./store";
import router from "./router";
import {sync} from "vuex-router-sync";
sync(store, router)

// filter
var moment = require('moment');
var numeral = require('numeral');

Vue.filter('cleanDate', function (value) {
  if (value === 'N/A' || value === null || value === undefined) {
    return 'N/A'
  } else {
    let str = value + '';
    return value = moment(str, 'YYYY-MM-DD').format('MMM Y');
  }
});

Vue.filter('formatBytes', function (value) {
  if (value === null || value === undefined) {
    return value = '-'
  }
  else {
    value *= 1000; // the source base value assumes "KB" -- this gets it to bytes that numeral.js expects
    return numeral(value).format('0.00b')
  }
})

Vue.filter('formatCurrency', function (value, locale = "us") {
  if (value === null || value === undefined) {
    return value = '-'
  }
  else {
    return numeral(value).format('$0,0.00')
  }
})

// install plugins
Vue.use(VeeValidate)
Vue.use(Vue2Filters)
Vue.use(VueCharts)

const gaId = 'UA-42900219-2'
Vue.use(VueAnalytics, {gaId, router});

// config
Vue.config.productionTip = false
if (process.env.NODE_ENV == 'production') {
  Vue.config.devtools = false;
}

// start up our app
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
