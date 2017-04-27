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
import AcceptUser from './../components/AcceptUser.vue'

// routes main
import Dashboard from './../components/Dashboard.vue'
import Sidemenu from './../components/Sidemenu.vue'
import ChargeInfo from './../components/ChargeInfo.vue'

// routes devices
import Devices from './../views/devices/Devices.vue'
import Device from './../views/devices/Device.vue'

// companies
import Companies from './../views/companies/Companies.vue'
import Company from './../views/companies/Company.vue'

// employees
import EmployeeIndex from './../views/employees/EmployeeIndex.vue'
import EmployeeEdit from './../views/employees/EmployeeEdit.vue'
import EmployeeBulkAdd from './../views/employees/EmployeeBulkAdd.vue'

// routes presets
import Presets from './../views/presets/Presets.vue'
import Preset from './../views/presets/Preset.vue'

// routes services
import Services from './../views/services/Services.vue'
import Service from './../views/services/Service.vue'

// routes Packages
import Packages from './../views/packages/Packages.vue'
import Packageid from './../views/packages/Packageid.vue'

// routes Employees
import Profile from './../views/employees/Profile.vue'
import AddDevice from './../views/employees/AddDevice.vue'
import AddService from './../views/employees/AddService.vue'
import UpdateProfile from './../views/employees/UpdateProfile.vue'

// routes Settings
import Settings from './../views/settings/Settings.vue'

// popover
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
    { path: '/acceptUser/:identification/:code', component: AcceptUser, name: 'Accept User' },

    // main
    {
      path: '/dashboard', component: Dashboard, name: 'dashboard', breadcrumb: 'Dashboard', meta: { requiresAuth: true },
      children: [
        { path: 'charge/:id', component: SpentInfo, name : 'Mobile Charges' },
        { path: 'procurement/', component: LegacyInfo, name : 'legacyInfo' }
      ]
    },
    { path: '/sso/:id', component: Sso, name: 'sso' },
    { path: '/sidemenu', component: Sidemenu },

    // devices
    {path: '/devices', component: Devices, name: 'List Devices', meta: {requiresAuth: true}},
    { path: '/device/:id', component: Device, name: 'Update Device', meta: { requiresAuth: true } },
      {path: '/device', component: Device, name: 'Add Device', meta: {requiresAuth: true}},

    // companies
    // { path: '/companies', component: Companies, name: 'List Companies', meta: { requiresAuth: true } },
    // { path: '/company/:id', component: Company, name: 'Update Company', meta: { requiresAuth: true } },
    // { path: '/company', component: Company, name: 'Add Company', meta: { requiresAuth: true } },
    {
      path: '/companies', component: { template: '<router-view></router-view>' }, meta: { requiresAuth: true, label: 'Companies' },
      children: [
        { path: '', component: Companies, name: 'List Companies', meta: { label: 'All' } },
        { path: 'new', component: Company, name: 'Add Company', meta: { label: 'Create'} },
        { path: ':id', component: Company, name: 'Update Company', meta: { label: 'Edit'} },
      ]
    },

    // employees
    {
      path: '/employees',
      component: {template: '<router-view></router-view>'},
      meta: {requiresAuth: true, label: 'Employees'},
      children: [
        {path: '', component: EmployeeIndex, name: 'List Employees', meta: {label: 'All'}},
        {path: 'bulk', component: EmployeeBulkAdd, name: 'Bulk Add Employee', meta: {label: 'Bulk Add'}},
        {path: 'new', component: EmployeeEdit, name: 'Add Employee', meta: {label: 'Create'}},
        {path: ':id', component: EmployeeEdit, name: 'Update Employee', meta: {label: 'Edit'}},
      ]
    },

    // presets
    { path: '/presets', component: Presets, name: 'List Presets', meta: { requiresAuth: true } },
    { path: '/preset/:id', component: Preset, name: 'Update Preset', meta: { requiresAuth: true } },
    { path: '/preset', component: Preset, name: 'Add Preset', meta: { requiresAuth: true } },

    // services
    // { path: '/services', component: Services, name: 'List Services', meta: { requiresAuth: true } },
    // { path: '/service/:id', component: Service, name: 'Update Service', meta: { requiresAuth: true } },
    // { path: '/service', component: Service, name: 'Add Service', meta: { requiresAuth: true } },

      {
      path: '/services',
      component: {template: '<router-view></router-view>'},
      meta: {requiresAuth: true, label: 'Services'},
      children: [
        { path: '', component: Services, name: 'List Services', meta: { label: 'All' } },
        { path: '/service', component: Service, name: 'Add Service', meta: { label: 'Create' } },
        { path: '/service/:id', component: Service, name: 'Update Service', meta: { label: 'Edit' } },
      ]
    },

    // profile
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

// Vue.http.interceptors.push((request, next) => {
//   next((response) => {
//     if (response.status==401) {
//       store.dispatch('auth/logout')
//       router.push('login');
//     }
//   })
// })

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
