import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import store from '@/store'
// import NProgress from 'nprogress'

// Containers
import DefaultContainer from '@/containers/DefaultContainer'

// Views
import Dashboard from '@/views/dashboard/dashboard'

// View Auth
import Login from '@/views/auth/Login'
import LoginLocal from '@/views/auth/LoginLocal'
import ResetPassword from '@/views/auth/ResetPassword'
import ResetPasswordCode from '@/views/auth/ResetPasswordCode'
import Register from '@/views/auth/Register'
import AcceptUser from '@/views/auth/AcceptUser'
import Sso from '@/views/auth/Sso'

// Views Devices
import DeviceIndex from '@/views/devices/device_list'
import DeviceEdit from '@/views/devices/device_edit'

// Views employees
import EmployeeIndex from '@/views/employees/employee_index'
import EmployeeEdit from '@/views/employees/employee_edit'

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
          // children: [
          //   { path: 'charge/:id', component: SpentInfo, name: 'Mobile Charges' },
          //   { path: 'procurement/', component: LegacyInfo, name: 'legacyInfo' }
          // ]
        },
        //devices
        {
          path: 'devices',
          component: { template: '<router-view></router-view>' },
          meta: { requiresAuth: true, label: 'Devices' },
          children: [
            { path: '', component: DeviceIndex, name: 'List Devices', meta: { label: 'All' } }
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
      ]
    },

    //redirect
    { path: '*', redirect: '/dashboard' }
  ]
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

  if (to.name === 'login' || to.name === 'loginLocal') {
    if (authenticated) {
        next({name: 'Dashboard'})
    }
  } else {
    // if (to.meta.requiresAuth && !authenticated) {
    if (to.matched.some(m => m.meta.requiresAuth) && !authenticated) {
      next({name: 'login'})
      // next({name: 'loginLocal'})
    }
  }

  if (to.name === 'legacyInfo') {
    $('html').addClass('w1')
  } else {
    $('html').removeClass('w1')
  }
  next()
})

// Vue.http.interaction.push((request, next) => {
//   NProgress.inc(0.2)
//   next((response) => {
//     NProgress.done()
//   })
// })

// Router.afterEach(() => {
//   NProgress.done()
// })

export default router