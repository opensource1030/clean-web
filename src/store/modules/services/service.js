import service from './../../../api/service-api'
import * as types from './../../mutation-types'
const {Store} = require('yayson')()
const store = new Store()
import {findServiceItem, findByAddons, orderFilters} from './../../../components/filters.js';
const state = {
  serviceDetails: {
      id : 0,
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
          id : 0,
          domain: "domestic",
          category: "voice",
          value: 0,
          unit: "minutes",
      },
      data: {
          id : 0,
          domain: "domestic",
          category: "data",
          value: 0,
          unit: 'Gb',
      },
      sms: {
          id : 0,
          domain: "domestic",
          category: "messaging",
          value: 0,
          unit: "messages",
      }
  },
  internationalPlan: {
      minutes: {
          id : 0,
          domain: "international",
          category: "voice",
          value: 0,
          unit: "minutes",
      },
      data: {
          id : 0,
          domain: "international",
          category: "data",
          value: 0,
          unit: 'Gb',
      },
      sms: {
          id : 0,
          domain: "international",
          category: "messaging",
          value: 0,
          unit: "messages",
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
          addonPriceError: false,
      }
  ]



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
  }

}

const actions = {

  getOne({ dispatch, commit, state },id){


      return new Promise((resolve, reject) => {
        let params = {
          params: {
            include: 'serviceitems,carriers'
          }
        }
        service.getOne(params,id,res => {

          commit(types.SERVICES_GET_SERVICE , {records:res})
        resolve(service)
        }, err => {
          console.log('service err', err)
          reject(err)
        })
      })

  },
  update({ dispatch, commit, state }){
    return new Promise((resolve, reject) => {
      service.update(params,id,res => {
          commit(types.SERVICES_UPDATE, {res})
        resolve(service)
      }, err => {
        console.log('service err', err)
        reject(err)
      })
    })


  },
  add({ dispatch, commit, state }){
    return new Promise((resolve, reject) => {
      service.add(params,res => {
        commit(types.SERVICES_ADD_NEW , {res})
        resolve(service)
      }, err => {
        console.log('service err', err)
        reject(err)
      })
    })


  }
}

const mutations = {

          [types.SERVICES_GET_SERVICE ](state, {records}) {


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



          },
            [types.SERVICES_UPDATE](state, {records}) {



            },
            [types.SERVICES_ADD_NEW](state, {records}) {

            },



}

export default {
  namespaced : true,
  state,
  getters,
  actions,
  mutations
}
