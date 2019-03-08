import _ from 'lodash'
import presetAPI from './../../../api/preset-api'
import Preset from './../../../models/Preset';
import * as types from './../../mutation-types'
const {Store} = require('yayson')()
const store = new Store()
import {findServiceItem, findByAddons, orderFilters} from './../../../components/filters.js';
const state = {
  preset:{
    id:null,
    name:'',
    companyId:null,
    variations:[]
  },
  variations:[],
  devicevariations:[]
}

const getters = {
  getPreset: (state) => {
    return state.preset
  },
  getVariations: (state) => {
    return state.variations
  },
}

const actions = {
  getOne({ dispatch, commit, state }, { id }) {
    return new Promise((resolve, reject) => {
      let params = {
        params: {
          include: 'devicevariations,devicevariations.companies,devicevariations.carriers,devicevariations.modifications,devicevariations.images'
        }
      }

      presetAPI.getOne(params, id, res => {
        commit(types.PRESETS_GET_PRESET, {records: res,id:id})
        resolve(presetAPI)
      }, err => {
        console.log('preset  err', err)
        reject(err)
      })
    })
  },

  update({ dispatch, commit, state, rootState }, { preset, router }) {
    commit('PRESET_COMPANY',{ id: rootState.auth.profile.companyId })
    dispatch('checkPreset', { preset: preset }).then(response => {

      if (response) {
        let presetObj = new Preset('presets', preset.id, preset.name, preset.companyId,);
        //  commit(types.PRESET_PREPARE_VARIATIONS, {router})
        presetObj.deviceVariationsJson(preset.variations,presetObj);
        return new Promise((resolve, reject) => {
          presetAPI.update(presetObj.toJSON(), preset.id, res => {
            commit(types.PRESET_UPDATE, {router})
            resolve(presetAPI)
          }, err => {
            console.log('preset err', err)
            reject(err)
          })
        })
      }
    })
  },

  add({ dispatch, commit, state, rootState }, { preset }) {
    commit('PRESET_COMPANY',{ id: rootState.auth.profile.companyId })
    dispatch('checkPreset', { preset:preset }).then(response => {
      if (response) {
        let presetObj = new Preset('presets', null, preset.name, preset.companyId,);
        presetObj.deviceVariationsJson(preset.variations,presetObj);
        return new Promise((resolve, reject) => {
          presetAPI.add(presetObj.toJSON(), res => {
            commit(types.PRESET_ADD_NEW, {router})
            resolve(presetAPI)
          }, err => {
            console.log('preset err', err)
            reject(err)
          })
        })
      }
    })
  },

  checkPreset({ dispatch, commit, state }, { preset }) {
    if (preset.name==null || preset.name=="") {
      console.log(preset.name)
      dispatch('error/addNew', {
        message: 'Error, empty field Name'
      }, {root: true})
      return false;
    }

    if (preset.companyId==null || preset.companyId=="") {
      dispatch('error/addNew', {
        message: 'Error, empty field Name'
      }, {root: true})
      return false;
    }

    if (preset.variations==null || preset.variations.length==0) {
      dispatch('error/addNew', {
        message: 'You don´t have selected any devicevariations'
      }, {root: true})
      return false;
    }
    return true;
  },

  checkDeviceVariations({ dispatch, commit, state }, { price }){
    if (state.devicevariations != null) {
      for (let variation of state.devicevariations) {
        if (variation.id==price.id && variation.deviceId==price.deviceId) {
          commit('device/checkPrice',{price:price,value:true},{root:true})
          commit('addVariation',{price:price})
        }
      }
      if (price.check==null) {
        commit('device/checkPrice',{price:price,value:false},{root:true})
      }
    } else {
      commit('device/checkPrice',{price:price,value:false},{root:true})
    }
  }
}

const mutations = {

  [types.PRESETS_GET_PRESET](state, {records,id}) {
    state.preset.id=id;
    state.preset.name=  records.name;
    state.devicevariations=records.devicevariations;

    for (let v of records.devicevariations) {
      v.checks=true;
    }

    //state.variations=records.devicevariations;
    //state.preset.variations=records.devicevariations;
    //context.checkvariation();
  },

  [types.PRESET_UPDATE](state, {router}) {
    router.push({name: 'List Presets'});
  },

  [types.PRESET_COMPANY](state,{id}){
    state.preset.companyId=id;
  },

  [types.PRESET_ADD_NEW](state, {router}) {
    router.push({name: 'List Presets'});
  },

  [types.PRESET_PREPARE_VARIATIONS](state, {router}) {
    //  router.push({name: 'List Presets'});
  },

  updateVariations(state, {e, type, i}){
    state.variations[i].checks=e.target.checked;

    if(e.target.checked){
      state.preset.variations.push(state.variations[i])
    }else{
        state.preset.variations.splice(i, 1);
    }
  },

  updateField(state, {e, type}){
    state.preset[type]=e.target.value;
  },

  addVariation(state,{price}){
    price.checks=true;
    state.variations.push(price);
    state.preset.variations.push(price);
  },

  updateDeviceVariations(state,{e,price}){
    if (e.target.checked) {
      price.checks = false;
      console.log(price.checks)
      state.variations.push(price)

    } else {
      let i = 0;
      for (let v of state.variations) {
        state.variations.splice(i, 1);
        i++;
      }
    }
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
