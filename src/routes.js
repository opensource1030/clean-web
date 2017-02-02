// routes auth
import Sso from './components/Sso.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import LoginLocal from './components/LoginLocal.vue'

//rutes main
import Dashboard from './components/Dashboard.vue'
import Sidemenu from './components/Sidemenu.vue'
import ChargeInfo from './components/ChargeInfo.vue'

//routes devices
import Devices from './views/devices/Devices.vue'
import Device from './views/devices/Device.vue'

//routes services
import Services from './views/services/Services.vue'
import Service from './views/services/Service.vue'

//routes Employees
import Profile from './views/employees/Profile.vue'
import AddDevice from './views/employees/AddDevice.vue'
import AddService from './views/employees/AddService.vue'
import UpdateProfile from './views/employees/UpdateProfile.vue'

//routes Settings
import Settings from './views/settings/Settings.vue'

//popover

import SpentInfo from './components/SpentInfo.vue'
import LegacyInfo from './components/LegacyInfo.vue'

/**
 * The routes
 *
 * @type {object} The routes
 */
 export default [
  //auth
  {
    path: '/login',
    component: Login,
    name: 'login'
  },
  {
    path: '/register',
    component: Register,
    name: 'register'
  },
  {
    path: '/loginLocal',
    component: LoginLocal,
    name: 'loginlocal'
  },
  //main
  {
    path: '/dashboard',
    component: Dashboard,
    breadcrumb: 'Dashboard',
    meta: {
      requiresAuth: true
    },
    name: 'dashboard',
    children : [
      {
        path: 'charge/:id',
        name : 'spentInfo',
        component: SpentInfo
      },
      {
        path: 'procurement/',
        name : 'legacyInfo',
        component: LegacyInfo
      }
    ]
  },
  {
    path: '/sso/:id',
    component: Sso,
    name: 'sso'
  },
  {
    path: '/sidemenu',
    component: Sidemenu
  },
  //devices
  {
    path: '/devices',
    component: Devices,
    name: 'List Devices',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/device/:id',
    component: Device,
    name: 'Update Device',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/device',
    component: Device,
    name: 'Add Device',
    meta: {
      requiresAuth: true
    }
  },
  //services
  {
    path: '/services',
    component: Services,
    name: 'List Services',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/service/:id',
    component: Service,
    name: 'Update Service',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/service',
    component: Service,
    name: 'Add Service',
    meta: {
      requiresAuth: true
    }
  },
  //Employees
  {
    path: '/profile',
    component: Profile,
    name: 'profile',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/updateprofile/:id',
    component: UpdateProfile,
    name: 'UpdateProfile',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/addservice',
    component: AddService,
    name: 'addService',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/adddevice',
    component: AddDevice,
    name: 'addDevice',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/configuration',
    component: Settings,
    name: 'configuration',
    meta: {
      requiresAuth: true
    }
  },
  //redirect
  {
    path: '*',
    redirect: '/dashboard'
  }
]
