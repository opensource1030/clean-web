
// routes auth
import Sso from './components/Sso.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import LoginLocal from './components/LoginLocal.vue'

//rutes main
import Dashboard from './components/Dashboard.vue'
import Sidemenu from './components/Sidemenu.vue'

//routes devices
import Devices from './views/devices/Devices.vue'
import Device from './views/devices/Device.vue'

//routes services
import Services from './views/services/Services.vue'
import Service from './views/services/Service.vue'


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
  name: 'dashboard'
}, {
  path: '/sso/:id',
  component: Sso,
  name: 'sso'
}, {
  path: '/sidemenu',
  component: Sidemenu
},
//devices
{
  path: '/devices',
  component: Devices,
  name: 'devices',
  meta: {
    requiresAuth: true
  }

},
{
  path: '/device/:id',
  component: Device,
  name: 'devicem',
  meta: {
    requiresAuth: true
  }
},
 {
  path: '/device',
  component: Device,
  name: 'device',
  meta: {
    requiresAuth: true
  }
},
//services
{
  path: '/services',
  component: Services,
  name: 'services',
  meta: {
    requiresAuth: true
  }

},
{
  path: '/service/:id',
  component: Service,
  name: 'service',
  meta: {
    requiresAuth: true
  }
},
 {
  path: '/service',
  component: Service,
  name: 'service',
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
