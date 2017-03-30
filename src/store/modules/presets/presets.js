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
      dispatch('getAll')
    }
  },

  nextPage({dispatch, commit}) {

    if (state.pagination.current_page < state.pagination.total_pages) {
      commit(types.PRESET_NEXT_PAGE)
      dispatch('getAll')
    }
  },

  getAll({
    dispatch,
    commit
  }) {
    let params = {
      params: {
        include: 'devicevariations,devicevariations.devices,devicevariations.modifications',
        page: state.pagination.current_page,
      }
    };

    //  commit(types.LOADING, 1)
    preset.getAll(params, records => {


      commit(types.PRESET_GET_ALL, {records:records,dispatch:dispatch})

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
  [types.PRESET_GET_ALL](state, {records}) {
    state.variations.loading=false;
    state.variations.loadtable=true;
      state.pagination = records.meta.pagination;
    let  event = store.sync(records);
     let presets = [];
     let total=0;

      for (let preset of event) {
        if(  preset.devicevariations==null || preset.devicevariations.length==0){
          dispatch('error/addNew', {
            message: 'Error, Empty Device Variations'
          }, {root: true})

        }
else{

          preset = Object.assign({}, preset, {
            show: false,
            hide: true,
            devices:preset.devicevariations.length
          });

            for(let variation of preset.devicevariations){
              total+=variation.priceRetail

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
  state,
  getters,
  actions,
  mutations
}
