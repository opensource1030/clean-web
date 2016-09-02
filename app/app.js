import Vue from 'vue'
import Resource from 'vue-resource'
import Router from 'vue-router'
import $  from 'jquery'
import NProgress from 'nprogress'

//foundation js
//require('../vendor/foundation-sites/dist/foundation')
//$j(document).foundation();
import App from './components/App.vue'
import Sso  from './components/Sso.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import LoginLocal from './components/LoginLocal.vue'
import Dashboard from './components/Dashboard.vue'
import Navbar from './components/Navbar.vue'
import auth from './api/auth.js'

// Install plugins
Vue.use(Router)
Vue.use(Resource)

// Set up a new router
export var router = new Router();

auth.checkAuth();

Vue.http.interceptors.push((request, next) => {
  NProgress.inc(0.2)
  next((response)=>{
    NProgress.done();
 });
});

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
  '/navbar':{
    name: 'navbar',
    component: Navbar
  },


})

// For every new route scroll to the top of the page
router.beforeEach(({ next }) => {
  window.scrollTo(0, 0)
  NProgress.start()

  next()
})

router.beforeEach(function (transition) {
  if (transition.to.auth && !auth.user.authenticated) {
    transition.redirect('/login')
  }
else{
    transition.next()
  }
})

router.afterEach(() => {
  NProgress.done()
})


// If no route is matched redirect home
router.redirect({
 '*': '/dashboard'
})

// Start up our app
router.start(App, '#app')
