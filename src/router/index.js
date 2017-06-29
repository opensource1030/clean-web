import Vue from "vue";
import VueRouter from "vue-router";
import VueResource from "vue-resource";
import store from "./../store";
import NProgress from "nprogress";
// routes auth
import Sso from "./../components/Sso.vue";
import Login from "./../components/Login.vue";
import Register from "./../components/Register.vue";
import LoginLocal from "./../components/LoginLocal.vue";
import ResetPassword from "./../components/ResetPassword.vue";
import ResetPasswordCode from "./../components/ResetPasswordCode.vue";
import AcceptUser from "./../components/AcceptUser.vue";
// routes main
import Sidemenu from "./../components/Sidemenu.vue";
import Dashboard from "./../views/dashboard/Dashboard.vue";
// routes devices
import Devices from "./../views/devices/Devices.vue";
import Device from "./../views/devices/Device.vue";
// companies
import Companies from "./../views/companies/Companies.vue";
import Company from "./../views/companies/Company.vue";
// employees
import EmployeeIndex from './../views/employees/EmployeeIndex.vue'
import EmployeeEdit from './../views/employees/EmployeeEdit.vue'
import EmployeeBulkAdd from './../views/employees/EmployeeBulkAdd.vue'
import EmployeeBulkMapping from './../views/employees/EmployeeBulkMapping.vue'
import EmployeeBulkReview from './../views/employees/EmployeeBulkReview.vue'

// orders
import OrderIndex from './../views/orders/OrderIndex.vue'

// routes presets
import Presets from "./../views/presets/Presets.vue";
import Preset from "./../views/presets/Preset.vue";
// routes services
import Services from "./../views/services/Services.vue";
import Service from "./../views/services/Service.vue";
// routes Packages
import Packages from "./../views/packages/Packages.vue";
import Packageid from "./../views/packages/Packageid.vue";
// routes Employees
import Profile from "./../views/employees/Profile.vue";
import AddDevice from "./../views/employees/AddDevice.vue";
import AddService from "./../views/employees/AddService.vue";
import UpdateProfile from "./../views/employees/UpdateProfile.vue";
import EmployeeReview from "./../views/employees/EmployeeReview.vue";
// routes Settings
import Settings from './../views/settings/Settings.vue'

// routes placeOrder
import PlaceOrder from './../views/placeOrder/Placeorder.vue'

// popover
import SpentInfo from "./../components/SpentInfo.vue";
import LegacyInfo from "./../components/LegacyInfo.vue";

Vue.use(VueResource)
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  scrollBehavior: () => ({y: 0}),
  routes: [
    // auth
    {path: '/login', component: Login, name: 'login'},
    {path: '/register', component: Register, name: 'register'},
    {path: '/loginLocal', component: LoginLocal, name: 'loginLocal'},
    {path: '/resetPassword', component: ResetPassword, name: 'Reset Password'},
    {path: '/resetPassword/:identification/:code', component: ResetPasswordCode, name: 'Reset Password Code'},
    {path: '/acceptUser/:identification/:code', component: AcceptUser, name: 'Accept User'},

    // main
    {path: '/sso/:id', component: Sso, name: 'sso'},
    {path: '/sidemenu', component: Sidemenu},
    {
      path: '/dashboard', component: Dashboard, name: 'dashboard', breadcrumb: 'Dashboard', meta: {requiresAuth: true},
      children: [
        {path: 'charge/:id', component: SpentInfo, name: 'Mobile Charges'}
      ]
    },

    // { path: '/devices', component: Devices, name: 'List Devices', meta: { requiresAuth: true } },
    // { path: '/device/:id', component: Device, name: 'Update Device', meta: { requiresAuth: true } },
    // { path: '/device', component: Device, name: 'Add Device', meta: { requiresAuth: true } },
    {
      path: '/devices',
      component: {template: '<router-view></router-view>'},
      meta: {requiresAuth: true, label: 'Devices'},
      children: [
        {path: '', component: Devices, name: 'List Devices', meta: {label: 'All'}},
        {path: 'new', component: Device, name: 'Add Device', meta: {label: 'Create'}},
        {path: ':id', component: Device, name: 'Update Device', meta: {label: 'Edit'}},
      ]
    },

    // companies
    // { path: '/companies', component: Companies, name: 'List Companies', meta: { requiresAuth: true } },
    // { path: '/company/:id', component: Company, name: 'Update Company', meta: { requiresAuth: true } },
    // { path: '/company', component: Company, name: 'Add Company', meta: { requiresAuth: true } },
    {
      path: '/companies',
      component: {template: '<router-view></router-view>'},
      meta: {requiresAuth: true, label: 'Companies'},
      children: [
        {path: '', component: Companies, name: 'List Companies', meta: {label: 'All'}},
        {path: 'new', component: Company, name: 'Add Company', meta: {label: 'Create'}},
        {path: ':id', component: Company, name: 'Update Company', meta: {label: 'Edit'}},
      ]
    },

    // employees
    {
      path: '/employees',
      component: {template: '<router-view></router-view>'},
      meta: {requiresAuth: true, label: 'Employees'},
      children: [
        {path: '', component: EmployeeIndex, name: 'List Employees', meta: {label: 'All'}},
        {path: 'bulk/add', component: EmployeeBulkAdd, name: 'Bulk Add Employee', meta: {label: 'Bulk Add'}},
        {path: 'bulk/mapping', component: EmployeeBulkMapping, name: 'Mapping Fields', meta: {label: 'Mapping Fields'}},
        {path: 'bulk/review', component: EmployeeBulkReview, name: 'Review', meta: {label: 'Review'}},
        {path: 'new', component: EmployeeEdit, name: 'Add Employee', meta: {label: 'Create'}},
        {path: ':id', component: EmployeeEdit, name: 'Update Employee', meta: {label: 'Edit'}},
        {path: 'review/:id', component: EmployeeReview, name: 'Review Employee', meta: {label: 'Review'}},
      ]
    },

    // orders
    {
      path: '/orders',
      component: { template: '<router-view></router-view>' },
      meta: { requiresAuth: true, label: 'Procurements' },
      children: [
        { path: '', component: OrderIndex, name: 'List Orders', meta: { label: 'All' } },
      ]
    },

    // order
    {
      path: '/order',
      component: { template: '<router-view></router-view>' },
      meta: { requiresAuth: true, label: 'Order' },
      children: [
        { path: 'new', component: PlaceOrder, name: 'New Order', meta: { label: 'New' }},
        { path: 'upgrade', component: PlaceOrder, name: 'Upgrade Device', meta: { label: 'Upgrade' }},
        { path: 'transfer', component: PlaceOrder, name: 'Transfer Service', meta: { label: 'Transfer' }},
        { path: 'accessories', component: PlaceOrder, name: 'Accessories', meta: { label: 'Accessory' }},
      ]
    },

    // presets
    {
      path: '/presets',
      component: {template: '<router-view></router-view>'},
      meta: {requiresAuth: true, label: 'Presets'},
      children: [
        {path: '', component: Presets, name: 'List Presets', meta: {label: 'All'}},
        {path: 'new', component: Preset, name: 'Add Preset', meta: {label: 'Create'}},
        {path: ':id', component: Preset, name: 'Update Preset', meta: {label: 'Edit'}},
      ]
    },

    // services
    {
      path: '/services',
      component: {template: '<router-view></router-view>'},
      meta: {requiresAuth: true, label: 'Services'},
      children: [
        {path: '', component: Services, name: 'List Services', meta: {label: 'All'}},
        {path: 'new', component: Service, name: 'Add Service', meta: {label: 'Create'}},
        {path: ':id', component: Service, name: 'Update Service', meta: {label: 'Edit'}},
      ]
    },

    // profile
    {path: '/profile', component: Profile, name: 'profile', meta: {requiresAuth: true}},
    {path: '/updateprofile/:id', component: UpdateProfile, name: 'UpdateProfile', meta: {requiresAuth: true}},
    {path: '/addservice', component: AddService, name: 'addService', meta: {requiresAuth: true}},
    {path: '/adddevice', component: AddDevice, name: 'addDevice', meta: {requiresAuth: true}},
    {path: '/configuration', component: Settings, name: 'configuration', meta: {requiresAuth: true}},

    // packages
    // { path: '/packages', component: Packages, name: 'packages', meta: { requiresAuth: true } },
    // { path: '/package/:id', component: Packageid, name: 'packageEdit', meta: { requiresAuth: true } },
    // { path: '/package', component: Packageid, name: 'package', meta: { requiresAuth: true } },
    {
      path: '/packages',
      component: {template: '<router-view></router-view>'},
      meta: {requiresAuth: true, label: 'Packages'},
      children: [
        {path: '', component: Packages, name: 'List Packages', meta: {label: 'All'}},
        {path: 'new', component: Packageid, name: 'Add Package', meta: {label: 'Create'}},
        {path: ':id', component: Packageid, name: 'Update Package', meta: {label: 'Edit'}},
      ]
    },

    //redirect
    {path: '*', redirect: '/dashboard'}
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
  let authenticated = store.getters['auth/isAuthenticated']
  // console.log('routing: ' + from.name + ' -> ' + to.name, to.meta.requiresAuth, store.state.auth.userId, store.state.auth.token, store.state.auth.isAuthenticating )

  if (to.name === 'login' || to.name === 'loginLocal') {
    if (authenticated) {
      next({ name: 'dashboard' })
    }
  } else {
    // if (to.meta.requiresAuth && !authenticated) {
    if (to.matched.some(m => m.meta.requiresAuth) && !authenticated) {
      next({ name: 'login' })
    }
  }
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
