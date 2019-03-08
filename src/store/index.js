import Vue from "vue";
import Vuex from "vuex";
import * as actions from "./actions";
import * as getters from "./getters";
import auth from "./modules/auth";
import error from "./modules/error";
import device from "./modules/device";
import device_type from "./modules/device_type";
import modification from "./modules/modification";
import carrier from "./modules/carrier";
import company from "./modules/company";
import employee from "./modules/employee";
import employee_bulk from "./modules/employee_bulk_users";
import order from "./modules/order";
import preset from "./modules/preset";
import file from "./modules/file";
import scope_token from "./modules/scope_token";

import services from "./modules/services/services";
import service from "./modules/services/service";
// import presets from './modules/presets/presets'
// import preset from './modules/presets/preset'
import packages from "./modules/packages";
import placeOrder from "./modules/place_order";

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions: {},
  getters: {},
  modules: {
    auth,
    error,
    device,
    device_type,
    modification,
    carrier,
    company,
    employee,
    employee_bulk,
    preset,
    order,
    file,
    scope_token,

    services,
    service,
    // presets,
    // preset,
    packages,
    placeOrder
  },
  strict: debug,
  plugins: [
    // createPersistedState({ storage: window.sessionStorage }),
  ]
})
