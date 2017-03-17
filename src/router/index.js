import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import store from './../store'

Vue.use(VueResource)
Vue.use(VueRouter)

import NProgress from 'nprogress'

// routes auth
import Sso from './../components/Sso.vue'
import Login from './../components/Login.vue'
import Register from './../components/Register.vue'
import LoginLocal from './../components/LoginLocal.vue'
import ResetPassword from './../components/ResetPassword.vue'
import ResetPasswordCode from './../components/ResetPasswordCode.vue'

//rutes main
import Dashboard from './../components/Dashboard.vue'
import Sidemenu from './../components/Sidemenu.vue'
import ChargeInfo from './../components/ChargeInfo.vue'

//routes devices
import Devices from './../views/devices/Devices.vue'
import Device from './../views/devices/Device.vue'

//routes presets
import Presets from './../views/presets/Presets.vue'
import Preset from './../views/presets/Preset.vue'

//routes services
import Services from './../views/services/Services.vue'
import Service from './../views/services/Service.vue'

//routes Packages
import Packages from './../views/packages/Packages.vue'
import Packageid from './../views/packages/Packageid.vue'

//routes Employees
import Profile from './../views/employees/Profile.vue'
import AddDevice from './../views/employees/AddDevice.vue'
import AddService from './../views/employees/AddService.vue'
import UpdateProfile from './../views/employees/UpdateProfile.vue'

//routes Settings
import Settings from './../views/settings/Settings.vue'

//popover
import SpentInfo from './../components/SpentInfo.vue'
import LegacyInfo from './../components/LegacyInfo.vue'

const router = new VueRouter({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    // auth
    { path: '/login', component: Login, name: 'login' },
    { path: '/register', component: Register, name: 'register' },
    { path: '/loginLocal', component: LoginLocal, name: 'loginLocal' },
    { path: '/resetPassword', component: ResetPassword, name: 'Reset Password' },
    { path: '/resetPassword/:identification/:code', component: ResetPasswordCode, name: 'Reset Password Code' },
    // main
    { 
      path: '/dashboard', component: Dashboard, name: 'dashboard', breadcrumb: 'Dashboard', meta: { requiresAuth: true }, 
      children : [
        { path: 'charge/:id', component: SpentInfo, name : 'Mobile Charges' },
        { path: 'procurement/', component: LegacyInfo, name : 'legacyInfo' }
      ]
    },
    { path: '/sso/:id', component: Sso, name: 'sso' },
    { path: '/sidemenu', component: Sidemenu },
    // devices
    { path: '/devices', component: Devices, name: 'List Devices', meta: { requiresAuth: true } },
    { path: '/device/:id', component: Device, name: 'Update Device', meta: { requiresAuth: true } },
    { path: '/device', component: Device, name: 'Add Device', meta: { requiresAuth: true } },
    // presets
    { path: '/presets', component: Presets, name: 'List Presets', meta: { requiresAuth: true } },
    { path: '/preset/:id', component: Preset, name: 'Update Preset', meta: { requiresAuth: true } },
    { path: '/preset', component: Preset, name: 'Add Preset', meta: { requiresAuth: true } },
    // services
    { path: '/services', component: Services, name: 'List Services', meta: { requiresAuth: true } },
    { path: '/service/:id', component: Service, name: 'Update Service', meta: { requiresAuth: true } },
    { path: '/service', component: Service, name: 'Add Service', meta: { requiresAuth: true } },
    // employees
    { path: '/profile', component: Profile, name: 'profile', meta: { requiresAuth: true } },
    { path: '/updateprofile/:id', component: UpdateProfile, name: 'UpdateProfile', meta: { requiresAuth: true } },
    { path: '/addservice', component: AddService, name: 'addService', meta: { requiresAuth: true } },
    { path: '/adddevice', component: AddDevice, name: 'addDevice', meta: { requiresAuth: true } },
    { path: '/configuration', component: Settings, name: 'configuration', meta: { requiresAuth: true } },
    //packages
    { path: '/packages', component: Packages, name: 'packages', meta: { requiresAuth: true } },
    { path: '/package/:id', component: Packageid, name: 'packageEdit', meta: { requiresAuth: true } },
    { path: '/package', component: Packageid, name: 'package', meta: { requiresAuth: true } },
    //redirect
    { path: '*', redirect: '/dashboard' }
  ]
})

Vue.http.interceptors.push((request, next) => {
  NProgress.inc(0.2)
  next((response) => {
    NProgress.done()
  })
})

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0)
  NProgress.start()
  next()
})

router.beforeEach((to, from, next) => {
  // console.log('routing: ' + to + ' -> ' + from)
  const authenticated = store.getters['auth/isAuthenticated']

  if (to.name === 'login') {
    if (authenticated) {
      next({ name: 'dashboard' })
    }
  } else {
    if (to.meta.requiresAuth && !authenticated) {
      next({ name: 'login' })
    }
  }
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router