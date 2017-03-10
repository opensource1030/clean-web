import Vue from 'vue'

import 'script!jquery'
import 'script!select2'

import 'script!jquery.cookie'

import VueCharts from './../node_modules/vue-chartjs/dist/vue-chartjs.js'
import './../node_modules/slicknav/dist/jquery.slicknav.js'

import './../node_modules/stacktable.js/stacktable.js'

import './styles/app.scss'
import './../node_modules/font-awesome/scss/font-awesome.scss'

import 'script!what-input'
import 'script!foundation-sites'

import App from './App.vue'
import VeeValidate from 'vee-validate'
import store from './store'
import router from './router'
import { sync } from 'vuex-router-sync'
sync(store, router)

$(document).foundation();

// filter
var moment = require('moment');
var numeral = require('numeral');

Vue.filter('cleanDate', function (value) {
  var str = value + '';
  return value = moment(str, 'YYYY-MM-DD').format('MMM Y');
})

Vue.filter('formatBytes', function (value) {
  if (value === null || value === undefined) {
    return value = '-'
    // } else if (value >= 1024) {
    //   return numeral(value).format('0.00b');
  }
  else {
    value *= 1024; // the source base value assumes "KB" -- this gets it to bytes that numeral.js expects
    return numeral(value).format('0.00b')
  }
});

Vue.filter('formatCurrency', function (value, locale = "us") {
  if (value === null || value === undefined) {
    return value = '-'

  }
  else {
    return numeral(value).format('$0,0.00')
  }
})

// event
const eventHub = new Vue()
exports.eventHub = eventHub

// install plugins
Vue.use(VueCharts)
Vue.use(VeeValidate)

// start up our app
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
