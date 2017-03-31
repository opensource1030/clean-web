import preset from './../../../api/preset-api'
import Preset from './../../../models/Service';
import * as types from './../../mutation-types'
const {Store} = require('yayson')()
const store = new Store()
import {findServiceItem, findByAddons, orderFilters} from './../../../components/filters.js';
const state = {
  preset:{
    name:'',
    companyId:null,
    variations:[]
  },
  variations:[],
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

  getOne({
    dispatch,
    commit,
    state
  }, id) {

    return new Promise((resolve, reject) => {
      let params = {
        params: {
          include: 'devicevariations,devicevariations.companies,devicevariations.carriers,devicevariations.modifications,devicevariations.images'
        }
      }
      preset.getOne(params, id, res => {

        commit(types.PRESETS_GET_PRESET, {records: res})
        resolve(preset)
      }, err => {
        console.log('preset  err', err)
        reject(err)
      })
    })

  },
  update({
    dispatch,
    commit,
    state
  }, {preset}) {
    let result = JSON.parse(localStorage.getItem("userProfile"));
    preset.companyId=result.companyId;

    let check = this.checkPreset(context,preset)

    if(check==true){
    let presetObj = new Preset('presets', id, preset.name, preset.companyId,);
    presetObj.deviceVariationsJson(preset.variations,presetObj);

        return new Promise((resolve, reject) => {
          preset.update(presetObj.toJSON(), id, res => {
            commit(types.SERVICE_UPDATE, {router})
            resolve(service)
          }, err => {
            console.log('service err', err)
            reject(err)
          })
        })

      }


  },

  add({
    dispatch,
    commit,
    state
  }, {preset}) {
    let result = JSON.parse(localStorage.getItem("userProfile"));
    preset.companyId=result.companyId;
    let check = this.checkPreset(context,preset)
    if(check==true){
      let presetObj = new Preset('presets', null, preset.name, preset.companyId,);
      presetObj.deviceVariationsJson(preset.variations,presetObj);




    }



  },
  checkPreset({dispatch,commit,state},{preset}){



  },
  checkVariation({dispatch,commit,state},{}){


  }




}



const mutations = {

  [types.PRESET_GET_PRESET](state, {records,id}) {
    state.id=id;

state.preset.name=  reocords.name;
state.devicevariations=records.devicevariations;
for (let v of records.devicevariations){
v.checks=true;
}
state.variations=records.devicevariations;
//context.checkvariation();

  },
  [types.PRESET_UPDATE](state, {router}) {
    router.push({name: 'List Presets'});
  },

  [types.PRESET_ADD_NEW](state, {router}) {
      router.push({name: 'List Presets'});
  },
  [types.PRESET_PREPARE_VARIATIONS](state, {router}) {

  //  router.push({name: 'List Presets'});

  }
}

function presetaaa(state) {


}

export default {
  namespaced : true,
  strict: process.env.NODE_ENV !== 'production',
  state,
  getters,
  actions,
  mutations
}
