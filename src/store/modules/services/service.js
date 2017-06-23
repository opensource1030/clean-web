import serviceAPI from "./../../../api/service-api";
import Services from "./../../../models/Service";
import * as types from "./../../mutation-types";
import {findByAddons, findServiceItem} from "./../../../components/filters.js";

const {Store} = require('yayson')()
const store = new Store()

const state = {
  serviceDetails: {
    id: 0,
    title: '',
    carrierId: 0,
    status: '',
    code: '',
    cost: '',
    description: '',
    currency: 'USD'
  },
  domesticPlan: {
    minutes: {
      id: 0,
      domain: "domestic",
      category: "voice",
      value: 0,
      unit: "minutes"
    },
    data: {
      id: 0,
      domain: "domestic",
      category: "data",
      value: 0,
      unit: 'Gb'
    },
    sms: {
      id: 0,
      domain: "domestic",
      category: "messaging",
      value: 0,
      unit: "messages"
    }
  },
  internationalPlan: {
    minutes: {
      id: 0,
      domain: "international",
      category: "voice",
      value: 0,
      unit: "minutes"
    },
    data: {
      id: 0,
      domain: "international",
      category: "data",
      value: 0,
      unit: 'Gb'
    },
    sms: {
      id: 0,
      domain: "international",
      category: "messaging",
      value: 0,
      unit: "messages"
    }
  },
  addons: [
    {
      description: '',
      cost: '',
      unit: 'USD',
      add: true,
      delete: false,
      addonNameError: false,
      addonPriceError: false
    }
  ],
  items: []
}

const getters = {
  getServiceDetails: (state) => {
    return state.serviceDetails
  },

  getDomesticPlan: (state) => {
    return state.domesticPlan
  },

  getInternationalPlan: (state) => {
    return state.internationalPlan
  },

  getAddons: (state) => {
    return state.addons
  },
}

const actions = {
  getOne ({ dispatch, commit, state }, id) {

    return new Promise((resolve, reject) => {
      let params = {
        params: {
          include: 'serviceitems,carriers'
        }
      }

      serviceAPI.getOne(params, id, res => {
        commit(types.SERVICES_GET_SERVICE, {records: res})
        resolve(res)
      }, err => {
        console.log('service err', err)
        reject(err)
      })
    })
  },

  update ({ dispatch, commit, state }, { serviceDetails, domesticPlan, internationalPlan, addons, router }) {
    let status = '';
    if (serviceDetails.status == true) {
      status = 'Enabled'
    } else {
      status = 'Disabled'
    }

    let serviceo = new Services("services", serviceDetails.id, status, serviceDetails.title, serviceDetails.code, serviceDetails.cost, serviceDetails.description, serviceDetails.currency, serviceDetails.carrierId.id)

    dispatch('checkPlan', {
      serviceo: serviceo,
      addons: addons
    }).then(response => {
      if (response) {
        //  dispatch('prepareItems',{addons:addons,domesticPlan:domesticPlan,internationalPlan:internationalPlan,currency:serviceDetails.currency}).then(items => {

        commit(types.SERVICE_PREPARE_ITEMS)
        commit(types.SERVICE_PREPARE_JSON_ITEM,{serviceo:serviceo})
        return new Promise((resolve, reject) => {
          serviceAPI.update(serviceDetails.id, {data: serviceo.toJSON()}, res => {
            commit(types.SERVICE_UPDATE, {router})
            resolve(service)
          }, err => {
            console.log('service err', err)
            reject(err)
          })
        })
      }
    })
  },

  add ({ dispatch, commit, state }, { serviceDetails, domesticPlan, internationalPlan, addons, router }) {
    let status = '';
    if (serviceDetails.status == true) {
      status = 'Enabled'
    } else {
      status = "Disabled"
    }

    let serviceo = new Services("services", serviceDetails.id, status, serviceDetails.title, serviceDetails.code, serviceDetails.cost, serviceDetails.description, serviceDetails.currency, serviceDetails.carrierId.id)
    // console.log('serviceo', serviceo)
    dispatch('checkPlan', {
      serviceo: serviceo,
      addons: addons
    }).then(response => {
      // console.log('service/add', response)
      if (response) {
        //  dispatch('prepareItems',{addons:addons,domesticPlan:domesticPlan,internationalPlan:internationalPlan,currency:serviceDetails.currency}).then(items => {
        commit(types.SERVICE_PREPARE_ITEMS)
        commit(types.SERVICE_PREPARE_JSON_ITEM,{serviceo:serviceo})
        return new Promise((resolve, reject) => {
          serviceAPI.create({data: serviceo.toJSON()}, res => {
            commit(types.SERVICE_ADD_NEW, {router})
            resolve(service)
          }, err => {
            console.log('service create err', err)
            reject(err)
          })
        })
      } else {
        dispatch('error/addNew', {
          message: 'Error, empty or invalid values. Please, check the inputs and complete it correctly.'
        }, {root: true})
      }
    }, err => {
      console.log('service add err')
    })
  },

  checkPlan ({ dispatch, commit, state }, { serviceo, addons }) {
    if (serviceo.title == "") {
      // dispatch('error/addNew', { message: 'titleError' })
      return false
    }

    if (serviceo.planCode == "") {
      // dispatch('error/addNew', { message: 'planCodeError' })
      return false
    }

    if (serviceo.cost == "") {
      // dispatch('error/addNew', { message: 'costError' })
      return false
    }

    if (serviceo.description == "") {
      // dispatch('error/addNew', { message: 'description' })
      return false
    }

    for (let addon of addons) {
      if (addon.description == "") {
        if (addon.cost != "") {
          return false
        }
      } else {
        if (addon.cost == "") {
          return false
        }
      }
    }

    return true
  }
}

const mutations = {
  [types.SERVICES_GET_SERVICE] (state, { records }) {
    if (records.status === "Enabled") {
      state.serviceDetails.status = true;
    } else {
      state.serviceDetails.status = false;
    }

    state.serviceDetails.title = records.title;
    state.serviceDetails.code = records.planCode;
    state.serviceDetails.cost = records.cost;
    state.serviceDetails.description = records.description;
    state.serviceDetails.currency = records.currency;
    state.serviceDetails.carrierId = records.carriers[0];
    state.serviceDetails.id = records.id;

    //domestic service
    state.domesticPlan.minutes = findServiceItem(records, "voice", "domestic");
    state.domesticPlan.data = findServiceItem(records, "data", "domestic");
    state.domesticPlan.sms = findServiceItem(records, "messaging", "domestic");

    //international service
    state.internationalPlan.minutes = findServiceItem(records, "voice", "international");
    state.internationalPlan.data = findServiceItem(records, "data", "international");
    state.internationalPlan.sms = findServiceItem(records, "messaging", "international");

    //addons
    let addOns = [];
    addOns = findByAddons(records.serviceitems, "addon", "");
    state.addons.splice(0, 1);
    for (let addOn of addOns) {
      state.addons.push(addOn);
    }

    if (state.addons.length == 0) {
      state.addons.push({id: "0", description: '', cost: '', add: false, delete: false});
    }

    reorderButtons(state)
  },

  hideAndPush (state, index) {
    if (state.serviceDetails.id > 0) {
      state.addons.push({id: "0", description: '', cost: '', add: true, delete: false});
    } else {
      state.addons.push({description: '', cost: '', add: true, delete: false});
    }

    reorderButtons(state)
  },

  deleteAddOns (state, index) {
    state.addons.splice(index, 1);
    if (state.addons.length == 0) {
      state.addons.push({id: state.serviceDetails.id, description: '', cost: '', add: false, delete: false});
    }

    for (let add of state.addons) {
      add.add = false;
      add.delete = true;
    }

    reorderButtons(state)
  },

  updateServiceDetail (state, { e, type }) {
    // console.log('updateServiceDetail', e, state.serviceDetails)
    switch (type) {
      case 'status':
        state.serviceDetails[type] = e.target.checked
        break
      case 'currency':
      case 'carrierId':
        state.serviceDetails[type] = e
        break
      default:
        state.serviceDetails[type] = e.target.value
        break
    }
  },

  updateDomesticplan (state, { e, type }) {
    if (type == "unit") {
      state.domesticPlan.data[type] = e;
    } else {
      state.domesticPlan[type].value = e.target.value;
    }
  },

  updateInternationalplan (state, { e, type }) {
    if (type == "unit") {
      state.internationalPlan.data[type] = e;
    } else {
      state.internationalPlan[type].value = e.target.value;
    }
  },

  updateAddon(state, {i, e, type}) {
    if (type == 'name') {
      state.addons[i].description = e.target.value;
      let value = e.target.value;
      if (value == null || value == '') {
        state.addons[i].addonNameError = true;
      }
      state.addons[i].addonNameError = false;
    }

    if (type == 'price') {
      state.addons[i].cost = parseInt(e.target.value);
      let value = e.target.value;
      if (value == null || value == '') {
        state.addons[i].addonPriceError = true;
      }
      state.addons[i].addonPriceError = false;
    }

    for (let add of state.addons) {
      add.add = false;
      add.delete = true;
    }

    if (state.addons[state.addons.length - 1].description != '' && state.addons[state.addons.length - 1].cost != '') {
      state.addons[state.addons.length - 1].add = true;
    } else if (state.addons[state.addons.length - 1].description == '' && state.addons[state.addons.length - 1].cost == '') {
      state.addons[state.addons.length - 1].delete = false;
    }
  },

  [types.SERVICE_PREPARE_JSON_ITEM] (state, { serviceo }) {
    serviceo.itemJson(state.items, serviceo);
  },

  [types.SERVICE_UPDATE] (state, { router }) {
    router.push({name: 'List Services'});
  },

  [types.SERVICE_ADD_NEW](state, { router }) {
    router.push({name: 'List Services'});
  },

  [types.SERVICE_PREPARE_ITEMS](state) {

    state.items.push(state.domesticPlan.minutes);
    state.items.push(state.domesticPlan.data);
    state.items.push(state.domesticPlan.sms);

    state.items.push(state.internationalPlan.minutes);
    state.items.push(state.internationalPlan.data);
    state.items.push(state.internationalPlan.sms);

    for (let addon of state.addons) {
      if (addon.description != "" && addon.cost != "") {
        if (addon.id == null) {
          addon.id = 0;
        }
        state.items.push(addon);
      }
      addon.unit = state.serviceDetails.currency;
    }
  }
}

function reorderButtons(state) {
  for (let add of state.addons) {
    add.add = false;
    add.delete = true;
  }

  if (state.addons[state.addons.length - 1].description != '' && state.addons[state.addons.length - 1].cost != '') {
    state.addons[state.addons.length - 1].add = true;
  } else if (state.addons[state.addons.length - 1].description == '' && state.addons[state.addons.length - 1].cost == '') {
    state.addons[state.addons.length - 1].delete = false;
  }
}

export default {
  namespaced : true,
  strict: process.env.NODE_ENV !== 'production',
  state,
  getters,
  actions,
  mutations
}
