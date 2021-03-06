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
import DeviceUpgrade from '@/views/dashboard/components/device_upgrade'
import DeviceUpgradeAdmin from '@/views/dashboard/components/device_upgrade/upgrade_admin'
import TransferService from '@/views/dashboard/components/transfer_service'
import NewlineService from '@/views/dashboard/components/newline_service'
import Accessory from '@/views/dashboard/components/accessory'
import DeviceBillInfo from '@/views/dashboard/components/device_bill_info'

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
import ServiceIndex from '@/views/services/index'
import ServiceEdit from '@/views/services/edit'

// order
import OrderIndex from '@/views/orders/index'
import OrderDetail from '@/views/orders/show'

// package
import PackageIndex from '@/views/package/index'
import PackageEdit from '@/views/package/edit'
// Views Reports
import ReportCharge from '@/views/reports/charge'

import swalWarningPopupOptions from '@/helpers/modules/swal-warning-popup'

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
      path: '/',
      component: DefaultContainer,
      meta: { requiresAuth: true },
      children: [
        {
          path: 'dashboard',
          component: Dashboard,
          name: 'Dashboard',
          children: [
            // { path: 'charge/:id', component: SpentInfo, name: 'Mobile Charges' },
            { path: 'procurement', component: LegacyInfo, name: 'legacyInfo' },
            { path: 'device-upgrade', component: DeviceUpgrade, name: 'deviceUpgrade' },
            { path: 'device-upgrade-admin', component: DeviceUpgradeAdmin, name: 'deviceUpgradeAdmin' },
            { path: 'newline-service', component: NewlineService, name: 'newlineService' },
            { path: 'transfer-service', component: TransferService, name: 'transferService' },
            { path: 'accessory', component: Accessory, name: 'accessory' },
            { path: ':mobile_number/details', component: DeviceBillInfo, name: 'device_bill_info' },
          ],
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
          ],
        },
        // services
        {
          path: 'services',
          component: { template: '<router-view></router-view>' },
          meta: { requiresAuth: true, label: 'Services' },
          children: [
            { path: '', component: ServiceIndex, name: 'List Services', meta: { label: 'All' } },
            { path: 'new', component: ServiceEdit, name: 'Add Service', meta: { label: 'Create' } },
            { path: ':id', component: ServiceEdit, name: 'Update Service', meta: { label: 'Edit' } },
          ],
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
          ],
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
          ],
        },

        // orders
        {
          path: '/orders',
          component: { template: '<router-view></router-view>' },
          meta: { requiresAuth: true, label: 'Orders' },
          children: [
            { path: '', component: OrderIndex, name: 'List Orders', meta: { label: 'All' } },
            { path: ':id', component: OrderDetail, name: 'Order Detail', meta: { label: 'Detail' } },
          ],
        },

        // packages
        {
          path: '/packages',
          component: { template: '<router-view></router-view>' },
          meta: { requiresAuth: true, label: 'Packages' },
          children: [
            { path: '', component: PackageIndex, name: 'List Packages', meta: { label: 'All' } },
            { path: 'new', component: PackageEdit, name: 'Add Package', meta: { label: 'Create' } },
            { path: ':id', component: PackageEdit, name: 'Update Package', meta: { label: 'Edit' } },
          ],
        },
        // reports
        {
          path: '/report-charge',
          component: ReportCharge,
          name: 'ReportCharge',
        },
      ],
    },

    //redirect
    { path: '*', redirect: '/dashboard' },
  ],
})

// ===============================
// WARNING POPUP IMPLEMENTATION
// ===============================

router.beforeEach((to, from, next) => {

  // Each component that has warning popup:
  // 1. Needs to be inside the conditional 'componentsWithWarningPopup' array below
  // 2. Inside the component template, add @click and @keyup.tab
  //    interactions to the root HTML template component.
  //    Those actions make the popup trigger-able.
  // 3. To avoid the warning popup when pressing saving/updating button
  //    Look where the redirection happens ( router.push() ) and
  //    before that line add 'this.$store.commit('auth/warningPopupFlagOff')'

  let componentsWithWarningPopup = [
    "Add Service", "Update Service",
    "Add Device" , "Update Device" ,
    "Add Preset" , "Update Preset" ,
    "Add Package", "Update Package",
  ]

  let componentFoundFlag = false

  componentsWithWarningPopup.forEach(componentName => {
    if (from.name == componentName) {
      componentFoundFlag = true
      if (store.getters['auth/getWarningPopupFlag']) {
        Vue.swal(swalWarningPopupOptions).then(result => {
          if (result.value) {
            store.commit('auth/warningPopupFlagOff')
            next()
          }
          if (result.dismiss == "cancel") {
            next(false)
          }
        })
      }
      if (!store.getters['auth/getWarningPopupFlag']) {
        next()
      }
    }
  })

  if (!componentFoundFlag) {
    next()
  }
  
})

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0)
  NProgress.start()
  next()
})

router.beforeEach((to, from, next) => {
  if (to.name === 'legacyInfo') {
    $('html').addClass('overflow-hidden')
  } else {
    $('html').removeClass('overflow-hidden')
  }

  const authenticated = store.getters['auth/isAuthenticated']
  const currentLocation = decodeURIComponent(window.location.href)

  if (authenticated) {
    store.dispatch('auth/getProfile').then(
      res => {
        if (currentLocation.split('return=').length > 1 && authenticated) {
          const currentUser = store.getters['auth/getProfile']
          location.href = currentLocation.split('return=')[1] + '?jwt=' + currentUser.deskproJwt
        }

        const toPath = to.path.split('/')
        const { enabled_equipment, enabled_service, enabled_package, enabled_package_edit, enabled_dashboard_legacy, enabled_dashboard_nextgen } = store.state.feature
        const expired = store.getters['auth/isExpired']
        // console.log('routing: ' + from.name + ' -> ' + to.name, to.meta.requiresAuth, store.state.auth.userId, store.state.auth.token, store.state.auth.isAuthenticating )
        // console.log('routing: ' + from.name + ' -> ' + to.name, from, to)

        if (expired) {
          store.dispatch('auth/logout', {router: router})
          next()
        }
        // Redirect to dashboard if route is '/'
        else if (to.name == undefined && from.name == null) {
          next({ name: 'Dashboard' })
        } else if (to.name === 'login' || to.name === 'loginLocal') {
          next({ name: 'Dashboard' })
        } else if (
          ((toPath[1] === 'devices' && !enabled_equipment) ||
            (toPath[1] === 'services' && !enabled_service) ||
            (toPath[1] === 'packages' && !enabled_package) ||
            (toPath[2] && !enabled_package_edit)) &&
          !enabled_dashboard_legacy &&
          !enabled_dashboard_nextgen
        ) {
          if (from.name === 'Dashboard') {
            history.go(0)
          }

          // Prevent bad redirection when resetting password...
          if (to.name !== 'Reset Password Code') {
            router.go(-1)
          }
          // } else {
          //   // if (to.meta.requiresAuth && !authenticated) {
          //   if (to.matched.some(m => m.meta.requiresAuth) && !authenticated) {
          //     next({ name: 'login' })
          //   }
          next()
        } else {
          next()
        }
      },
      err => {
        store.dispatch('auth/logout', {router: router})
        next()
      },
    )
    // } else if (to.meta.requiresAuth) {
  } else if (to.matched.some(m => m.meta.requiresAuth)) {
    next({ name: 'login' })
  } else {
    next()
  }
})

Vue.http.interceptors.push((request, next) => {
  NProgress.inc(0.2)
  next(response => {
    NProgress.done()
  })
})

router.afterEach(() => {
  NProgress.done()
})

export default router
