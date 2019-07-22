import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import store from '@/store'
import NProgress from 'nprogress'

// Containers
import DefaultContainer from '@/containers/DefaultContainer'

// auth
import Login from '@/views/auth/Login'
import LoginLocal from '@/views/auth/LoginLocal'
import ResetPassword from '@/views/auth/ResetPassword'
import ResetPasswordCode from '@/views/auth/ResetPasswordCode'
import Register from '@/views/auth/Register'
import AcceptUser from '@/views/auth/AcceptUser'
import Sso from '@/views/auth/Sso'

// dashboard
import Dashboard from '@/views/dashboard/dashboard'
import LegacyInfo from '@/components/legacy_info'

// employee
import EmployeeIndex from '@/views/employees/employee_index'
import EmployeeEdit from '@/views/employees/employee_edit'

// device
import DeviceIndex from '@/views/device/index'
import DeviceEdit from '@/views/device/edit'

// preset
import PresetIndex from '@/views/preset/index'
import PresetEdit from '@/views/preset/edit'

// service
import ServiceIndex from '@/views/services/service_index'
import ServiceEdit from '@/views/services/service_edit'

// order
import OrderIndex from '@/views/orders/order_index'
import OrderDetail from '@/views/orders/order_detail'

Vue.use(VueResource)
Vue.use(Router)

const router = new Router({
  mode: 'history', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    // auth
    { path: '/login', component: Login, name: 'login' },
    { path: '/loginLocal', component: LoginLocal, name: 'loginLocal' },
    { path: '/resetPassword', component: ResetPassword, name: 'Reset Password' },
    { path: '/resetPassword/:identification/:code', component: ResetPasswordCode, name: 'Reset Password Code' },
    { path: '/register', component: Register, name: 'register' },
    { path: '/acceptUser/:identification/:code', component: AcceptUser, name: 'Accept User' },

    // main
    { path: '/sso/:id', component: Sso, name: 'sso' },
    {
      path: '/', component: DefaultContainer, meta: { requiresAuth: true },
      children: [
        {
          path: 'dashboard', component: Dashboard, name: 'Dashboard',
          children: [
            // { path: 'charge/:id', component: SpentInfo, name: 'Mobile Charges' },
            { path: 'procurement', component: LegacyInfo, name: 'legacyInfo' }
          ]
        },
        // employees
        {
          path: 'employees',
          component: { template: '<router-view></router-view>' },
          meta: { label: 'Employees' },
          children: [
            { path: '', component: EmployeeIndex, name: 'List Employees', meta: { label: 'All' } },
            // { path: 'bulk/add', component: EmployeeBulkAdd, name: 'Bulk Add Employee', meta: { label: 'Bulk Add' } },
            // { path: 'bulk/udlmapping', component: EmployeeBulkUDLMapping, name: 'Mapping UDL', meta: { label: 'Mapping UDL' } },
            // { path: 'bulk/mapping', component: EmployeeBulkMapping, name: 'Mapping Fields', meta: { label: 'Mapping Fields' } },
            // { path: 'bulk/review', component: EmployeeBulkReview, name: 'Review Bulk Employees', meta: { label: 'Review' } },
            { path: 'new', component: EmployeeEdit, name: 'Add Employee', meta: { label: 'Create' } },
            { path: ':id', component: EmployeeEdit, name: 'Update Employee', meta: { label: 'Edit' } },
            // { path: 'review/:id', component: EmployeeReview, name: 'Review Employee', meta: { label: 'Review' } },
          ]
        },
        // services
        {
          path: 'services',
          component: { template: '<router-view></router-view>' },
          meta: { requiresAuth: true, label: 'Services' },
          children: [
            { path: '', component: ServiceIndex, name: 'List Services', meta: { label: 'All' } },
            { path: 'new', component: ServiceEdit, name: 'Add Service', meta: { label: 'Create' }},
            { path: ':id', component: ServiceEdit, name: 'Update Service', meta: {label: 'Edit'}},
          ]
        },
        // devices
        {
          path: 'devices',
          component: { template: '<router-view></router-view>' },
          meta: { requiresAuth: true, label: 'Devices' },
          children: [
            { path: '', component: DeviceIndex, name: 'List Devices', meta: { label: 'All' } },
            { path: 'new', component: DeviceEdit, name: 'Add Device', meta: { label: 'Create' } },
            { path: ':id', component: DeviceEdit, name: 'Update Device', meta: { label: 'Edit' } },
          ]
        },
        // presets
        {
          path: '/presets',
          component: { template: '<router-view></router-view>' },
          meta: { requiresAuth: true, label: 'Presets' },
          children: [
            { path: '', component: PresetIndex, name: 'List Presets', meta: { label: 'All' } },
            { path: 'new', component: PresetEdit, name: 'Add Preset', meta: { label: 'Create' } },
            { path: ':id', component: PresetEdit, name: 'Update Preset', meta: { label: 'Edit' } },
          ]
        },
        // orders
        {
          path: '/orders',
          component: { template: '<router-view></router-view>' },
          meta: { requiresAuth: true, label: 'Orders' },
          children: [
            { path: '', component: OrderIndex, name: 'List Orders', meta: { label: 'All' } },
            { path: ':id', component: OrderDetail, name: 'Order Detail', meta: { label: 'Detail' } }
          ]
        }
      ]
    },

    //redirect
    { path: '*', redirect: '/dashboard' }
  ]
})

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0)
  NProgress.start()
  next()
})

router.beforeEach((to, from, next) => {
  let authenticated = store.getters['auth/isAuthenticated']
  let currentLocation = decodeURIComponent(window.location.href)

  if (currentLocation.split('return=').length > 1 && authenticated) {
    let profile = store.getters['auth/getProfile']
    location.href = currentLocation.split('return=')[1] + '?jwt=' + profile.deskproJwt
  }
  let expired = store.getters['auth/isExpired']
  // console.log('routing: ' + from.name + ' -> ' + to.name, to.meta.requiresAuth, store.state.auth.userId, store.state.auth.token, store.state.auth.isAuthenticating )
  // console.log('routing: ' + from.name + ' -> ' + to.name, from, to)

  if (expired) {
    document.cookie = "nav-item=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    document.cookie = "nav-inner=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"

    store.dispatch('auth/logout').then(res => {
      console.log('expire logout')
      history.go(0)
      next({name: 'Dashboard'})
    })
  }

  const toPath = to.path.split('/')
  // console.log('rotuer.beforeEach', toPath[1], store.state.feature.enabled_equipment)
  console.log(store.state.feature)
  console.log("store.state.feature")

  if (to.name === 'login' || to.name === 'loginLocal') {
    if (authenticated) {
      next({name: 'Dashboard'})
    }
  } else if ((toPath[1] === 'devices' && !store.state.feature.enabled_equipment) ||
             (toPath[1] === 'services' && !store.state.feature.enabled_service )) {
    // debugger
    if (from.name === 'Dashboard') {
      history.go(0)
    } else {
      next({name: 'Dashboard'})
    }
  } else {
    // if (to.meta.requiresAuth && !authenticated) {
    if (to.matched.some(m => m.meta.requiresAuth) && !authenticated) {
      // next({name: 'login'})
      next({name: 'login'})
    }
  }

  if (to.name === 'legacyInfo') {
    $('html').addClass('overflow-hidden')
  } else {
    $('html').removeClass('overflow-hidden')
  }

  next()
})

Vue.http.interceptors.push((request, next) => {
  NProgress.inc(0.2)
  next((response) => {
    NProgress.done()
  })
})

router.afterEach(() => {
  NProgress.done()
})

export default router
