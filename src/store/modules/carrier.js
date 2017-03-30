import _ from 'lodash'
import carrierAPI from './../../api/carrier-api'
import * as types from './../mutation-types'

const { Store } = require('yayson')()
const store = new Store()

// initial state
const state = {
  all: [],
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
      let params = {
        params: {
          'filter[active]': 1,
          include: 'images',
        }
      };
      carrierAPI.getOnePage(params, res => {
        // console.log('carrier res', res)
        const carriers = store.sync(res.data)
        // console.log('carrier', carriers)
        commit(types.CARRIER_GET_ONE_PAGE, { records: carriers })
        resolve(carriers)
      }, err => {
        console.log('carrier err', err)
        reject(err)
      })
    })
  },
  searchCarriers({ dispatch, commit, state },{query}) {
    return new Promise((resolve, reject) => {
      let params = {
        params: {
          'filter[active]': 1,
          include: 'images',

        }
      };
        params.params['filter[presentation][like]']= '%'+query+'%';

      carrierAPI.getOnePage(params, res => {

        const carriers = store.sync(res.data)

        commit(types.CARRIER_FILTER, { records: carriers })
        resolve(carriers)
      }, err => {
        console.log('carrier err', err)
        reject(err)
      })
    })
  },

}

// mutations
const mutations = {
  [types.CARRIER_FILTER] (state, { records }) {
    state.onePage = records
  },
  [types.CARRIER_GET_ONE_PAGE](state,{records}){
      state.onePage = records
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
