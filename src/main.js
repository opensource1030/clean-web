import Vue from 'vue'
import Resource from 'vue-resource'
import VueRouter from 'vue-router'
import 'script!jquery'
import 'script!select2'

import 'script!jquery.cookie'

import VueCharts from './../node_modules/vue-charts/dist/vue-charts.js'
import './../node_modules/slicknav/dist/jquery.slicknav.js'

import './../node_modules/stacktable.js/stacktable.js'

import NProgress from 'nprogress'
import './styles/app.scss'
import './../node_modules/font-awesome/scss/font-awesome.scss'
//foundation js
import 'script!what-input'
import 'script!foundation-sites'
import App from './App.vue'
import auth from './api/auth.js'

$(document).foundation();

// filter

var moment = require('moment');
var numeral = require('numeral');

Vue.filter('cleanDate', function (value) {
  var str = value + '';
  return value = moment(str, 'YYYY-MM-DD').format('MMM Y');
});

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
});

const eventHub = new Vue()
exports.eventHub = eventHub

// Install plugins
Vue.use(VueRouter);
Vue.use(Resource);
Vue.use(VueCharts);

// Set auth

auth.checkAuth();

Vue.http.interceptors.push((request, next) => {
  NProgress.inc(0.2)
  next((response) => {
    NProgress.done();
  });
});
//import routes
import routes from './routes';
// Route config
const router = new VueRouter({
  mode: 'history',
  routes
})
// For every new route scroll to the top of the page
router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0)
  NProgress.start()
  next()

})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const authUser = auth.user.authenticated;
    if (authUser == true) {
      next()
    } else {
      next({
        name: 'login'
      })
    }
  }
  next()
})

router.afterEach(() => {
  NProgress.done()
})

// Start up our app
new Vue({
  router,
  render: h => h(App)

}).$mount('#app')
