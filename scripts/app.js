import Vue from 'vue'
import Resource from 'vue-resource'
import Router from 'vue-router'
import $j  from 'jquery'
//foundation js
//require('../vendor/foundation-sites/dist/foundation')
//$j(document).foundation();
import App from './components/App.vue'

import Sso  from './components/Sso.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import LoginLocal from './components/LoginLocal.vue'
import Dashboard from './components/Dashboard.vue'
import auth from './api/auth.js'

// Install plugins
Vue.use(Router)
Vue.use(Resource)

// Set up a new router
export var router = new Router();

auth.checkAuth();



// Route config
router.map({
  '/login':{
    name: 'login',
    component: Login
  },
  '/register':{
    name: 'register',
    component: Register
  },
  '/loginLocal':{
    name: 'loginLocal',
    component: LoginLocal
  },
  '/dashboard':{
    name: 'dashboard',
    component: Dashboard,
    auth: true
  },
  '/sso/:id':{
    name: 'sso',
    component: Sso
  },



})

// For every new route scroll to the top of the page
router.beforeEach(function () {
  window.scrollTo(0, 0)
})
router.beforeEach(function (transition) {
  if (transition.to.auth && !auth.user.authenticated) {
    transition.redirect('/login')
  }
else{

    transition.next()
  }

})



// If no route is matched redirect home
router.redirect({
 '*': '/login'
})


// Start up our app
router.start(App, '#app')
