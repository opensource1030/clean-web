import Vue from 'vue'
import Resource from 'vue-resource'
import VueRouter from 'vue-router'
import 'script!jquery'
import NProgress from 'nprogress'
import Breadcrumb from 'vue-breadcrumbs'
import './styles/app.scss'
import './../node_modules/font-awesome/scss/font-awesome.scss'
//foundation js
import 'script!what-input'
import 'script!foundation-sites'



$(document).foundation();
//initial routes
import App from './App.vue'
import Sso from './components/Sso.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import LoginLocal from './components/LoginLocal.vue'
import Dashboard from './components/Dashboard.vue'
import Sidemenu from './components/Sidemenu.vue'
//auth router
import auth from './api/auth.js'
//views
import Devices from './views/devices/Devices.vue'
import Device from './views/devices/Device.vue'


// Install plugins
Vue.use(VueRouter)
Vue.use(Resource)
Vue.use(Breadcrumb)



// Set up a new router


auth.checkAuth();

Vue.http.interceptors.push((request, next) => {
  NProgress.inc(0.2)
  next((response) => {
    NProgress.done();
  });
});
const routes = [{
  path: '/login',
  component: Login,
  name: 'login'
}, {
  path: '/register',
  component: Register,
  name: 'register'
}, {
  path: '/loginLocal',
  component: LoginLocal,
  name: 'loginlocal'
}, {
  path: '/dashboard',
  component: Dashboard,
  breadcrumb: 'Dashboard',
  meta: {
    requiresAuth: true
  },
  name: 'dashboard'
}, {
  path: '/sso/:id',
  component: Sso,
  name: 'sso'
}, {
  path: '/sidemenu',
  component: Sidemenu
}, {
  path: '/devices',
  component: Devices,
  name: 'devices',
  meta: {
    requiresAuth: true
  }
}, {
  path: '/device/:id',
  component: Device,
  name: 'devicem',
  meta: {
    requiresAuth: true
  }
}, {
  path: '/device',
  component: Device,
  name: 'device',
  meta: {
    requiresAuth: true
  }
}, {
  path: '*',
  redirect: '/dashboard'
}]

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


// If no route is matched redirect home


// Start up our app
new Vue({
  router,
  render: h => h(App)

}).$mount('#app')
