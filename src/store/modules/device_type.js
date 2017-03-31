import _ from 'lodash'
import devicetypeAPI from './../../api/device_type-api'
import * as types from './../mutation-types'

const { Store } = require('yayson')()
const store = new Store()

// initial state
const state = {
  onePage:[]
}

// getters
const getters = {
  getOnePage: (state) =>{
    return _.chain(state.onePage).sortBy([ 'presentation' ]).value()
  }
}

// actions
const actions = {
  getOnePage ({ dispatch, commit, state }) {
    return new Promise((resolve, reject) => {

      devicetypeAPI.getOnePage(res => {
        const device_types = store.sync(res.data)
        // console.log('device_type res', device_types)
        commit(types.DEVICE_TYPE_GET_ONE_PAGE, { records: device_types })
        resolve(device_types)
      }, err => {
        // console.log('device_type err', err)
        reject(err)
      })
    })
  },
searchDeviceType({ dispatch, commit, state },{query}) {
    return new Promise((resolve, reject) => {
      let params={
        params:{
        }
      };
       params.params['filter[name][like]']= '%'+query+'%';


      devicetypeAPI.getOnePage(params,res => {
        const types = store.sync(res.data)
        // console.log('device_type res', device_types)
        commit(types.DEVICE_TYPE_FILTER, { records: types })
        resolve(types)
      }, err =>  {
        // console.log('device_type err', err)
        reject(err)
      })
    })
  }
}

// mutations
const mutations = {
  [types.DEVICE_TYPE_GET_ONE_PAGE] (state, { records }) {
    state.onePage = records
  },
  [types.DEVICE_TYPE_FILTER] (state, {records}) {
    state.onePage = records
  },
}

export default {
  namespaced: true,
  strict: process.env.NODE_ENV !== 'production',
  state,
  getters,
  actions,
  mutations
}
