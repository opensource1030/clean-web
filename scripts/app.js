import Vue from 'vue'
import Resource from 'vue-resource'
import Router from 'vue-router'

import App from './components/App.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import LoginLocal from './components/LoginLocal.vue'
import Dashboard from './components/Dashboard.vue'

// Install plugins
Vue.use(Router)
Vue.use(Resource)

// Set up a new router
export var router = new Router()

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
    component: Dashboard
  },



})

// For every new route scroll to the top of the page
router.beforeEach(function () {
  window.scrollTo(0, 0)
})

// If no route is matched redirect home
router.redirect({
  '*': '/login'
})

// Start up our app
router.start(App, '#app')
