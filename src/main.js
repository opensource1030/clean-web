// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import 'core-js/es6/promise'
// import 'core-js/es6/string'
// import 'core-js/es7/array'
// import 'jquery-match-height'
// import 'select2'
// import 'jquery-validation'

import Vue from 'vue'
import VueCharts from './../node_modules/vue-charts/dist/vue-charts.js'
// import VueChartjs from 'vue-chartjs'
// import VueAnalytics from 'vue-analytics'
// import VueGoogleCharts from 'vue-google-charts'
// import {GoogleCharts} from 'google-charts'
import VeeValidate from 'vee-validate'
import Vue2Filters from 'vue2-filters'
import BootstrapVue from 'bootstrap-vue'
import Multiselect from 'vue-multiselect'
import VueSweetalert2 from 'vue-sweetalert2'
import Vue2Animate from 'vue2-animate/dist/vue2-animate.min.css'
import VueResource from 'vue-resource'
import DatePicker from 'vuejs-datepicker'
import Spinner from '@/components/spinner'

import App from './App'
import router from './router'
import store from './store'
import { sync } from 'vuex-router-sync'

import './filters/phone-formatter.js'

// import './assets/scss/support.scss'
import './../node_modules/vue-multiselect/dist/vue-multiselect.min.css'

import bugsnagVue from '@bugsnag/plugin-vue'
import { bugsnagClient } from '@/bugsnag'
bugsnagClient.use(bugsnagVue, Vue)
import swalSessionExpiredPopupOptions from '@/helpers/modules/swal-session-expired-popup'

sync(store, router)
window.$ = require('jquery')

var moment = require('moment')
var numeral = require('numeral')

// todo
Vue.filter('cleanDate', function (value) {
  if (value === 'N/A' || value === null || value === undefined) {
    return 'N/A'
  } else {
    let str = value + ''
    return value = moment(str, 'YYYY-MM-DD').format('MMM Y')
  }
})

Vue.filter('formatBytes', function (value) {
  if (value === null || value === undefined) {
    return value = '-'
  } else {
    // the source base value assumes 'KB' -- this gets it to bytes that numeral.js expects
    value *= 1000
    return numeral(value).format('0.00b')
  }
})

Vue.filter('formatCurrency', function (value, locale = 'us') {
  if (value === null || value === undefined) {
    return value = '-'
  } else {
    return numeral(value).format('$0,0.00')
  }
})

Vue.use(BootstrapVue)
Vue.use(VueCharts)
Vue.use(VeeValidate, {
  fieldsBagName: 'veeFields',
})
Vue.use(Vue2Filters)
Vue.use(VueSweetalert2, {
  confirmButtonColor: '#41b882',
  cancelButtonColor: '#ff7674'
})
Vue.use(Vue2Animate)
Vue.use(VueResource)

// This flag is in case there are multiple requests rejected because of
// session expire. If that's the case, display 'swal' popup just once.
let sessionExpiredFlag = false
Vue.http.interceptors.push(function(request,next){
  if (request.url == process.env.URL_API + "/oauth/personal-access-tokens") {
    next(function(response){
      if (response.status == 500 || response.status == 401) {
        if (!sessionExpiredFlag) {
          Vue.swal(swalSessionExpiredPopupOptions).then((res) => {
            store.dispatch('auth/logout', {router: router})
          })
          sessionExpiredFlag = true
        }
      }
    });
  }
})

// Vue.use(VueChartjs)
// Vue.use(VueGoogleCharts)
// Vue.use(GoogleCharts)
Vue.component('multiselect', Multiselect)
Vue.component('datepicker', DatePicker)
Vue.component('spinner', Spinner)

// const gaId = 'UA-42900219-2'
// Vue.use(VueAnalytics, {gaId, router})

// Vue.config.productionTip = false
// if (process.env.NODE_ENV == 'production') {
//   Vue.config.devtools = false
// }

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
