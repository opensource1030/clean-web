import preset from './../../../api/preset-api'
import * as types from './../../mutation-types'
const {Store} = require('yayson')()
const store = new Store()
import {findServiceItem, findByAddons, orderFilters, getFilters} from './../../../components/filters.js';
const state = {
  presets:[],
  pagination: {
    current_page: 1,
    total_pages: null,
    count: null,
    total: null,
    per_page: 25
  },
  variations:{
  loading: true,
  loadtable: false,
}
}

const getters = {
  getPreset: (state) => {
    return state.presets
  },
  getPagination: (state) => {
    return state.pagination
  },
  getVariation:(state) =>{
     return state.variations
  }
}

const actions = {

  prevPage({dispatch, commit, state}) {
    if (state.pagination.current_page > 1) {
      commit(types.PRESET_PREV_PAGE)
      dispatch('search')
    }
  },

  nextPage({dispatch, commit}) {
    if (state.pagination.current_page < state.pagination.total_pages) {
      commit(types.PRESET_NEXT_PAGE)
      dispatch('search')
    }
  },

  deletePreset ({ dispatch, commit, state }, presetId) {
    return new Promise((resolve, reject) => {
      preset.remove(presetId, res => {
        let results = res;
        resolve(results);
      }, err => {
        reject(err)
      })
    })
  },

  search({ dispatch, commit }) {
    let params = {
      params: {
        include: 'devicevariations,devicevariations.devices,devicevariations.modifications',
        page: state.pagination.current_page,
      }
    };

    //  commit(types.LOADING, 1)
    preset.search(params, res => {
      let records = store.sync(res.data)
      let pagination = res.data.meta.pagination
      commit(types.PRESET_GET_ALL, { records: records, pagination: pagination })
    }, (err) => {
      console.log(err)
    })
  }
}

const mutations = {

  [types.PRESET_PREV_PAGE](state) {
    // if (state.pagination.current_page > 1)
    state.pagination.current_page--
  },

  [types.PRESET_NEXT_PAGE](state) {
    // if (state.pagination.current_page < state.pagination.total_pages)
    state.pagination.current_page++
  },
  [types.PRESET_GET_ALL](state, {records, pagination}) {
    state.variations.loading=false;
    state.variations.loadtable=true;
    state.pagination = pagination;
    let event = records;
    let presets = [];
    let total=0;

      for (let preset of event) {
        if(  preset.devicevariations==null || preset.devicevariations.length==0){
          dispatch('error/addNew', {
            message: 'Error, Empty Device Variations'
          }, {root: true})
        } else{

          preset = Object.assign({}, preset, {
            show: false,
            hide: true,
            devices:preset.devicevariations.length
          });
                let  modifications =[];
            for(let variation of preset.devicevariations){
              total+=variation.priceRetail

              if(variation.modifications[0]==null){

                variation.modifications[0]={value:"32gb"}

              }
              if(variation.modifications[1]==null){

                variation.modifications[1]={value:"white"};
              }

            }
              preset.total=total;

        presets.push(preset);
      }
      }

      state.presets = presets;
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
