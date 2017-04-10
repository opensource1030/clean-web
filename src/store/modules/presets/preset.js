import _ from 'lodash'
import presetApi from './../../../api/preset-api'
import Preset from './../../../models/Service';
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

  getOne({
    dispatch,
    commit,
    state
  }, {id}) {

    return new Promise((resolve, reject) => {
      let params = {
        params: {
          include: 'devicevariations,devicevariations.companies,devicevariations.carriers,devicevariations.modifications,devicevariations.images'
        }
      }

      presetApi.getOne(params, id, res => {

        commit(types.PRESETS_GET_PRESET, {records: res,id:id})
        resolve(presetApi)
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
  }, {preset,router}) {
    let result = JSON.parse(localStorage.getItem("userProfile"));
  //  preset.companyId=result.companyId;
    commit('PRESET_COMPANY',{id:preset.companyId})
    console.log("hola")
      dispatch('checkPreset', {
        preset:preset,
        }).then(response => {
          console.log(response)
   if (response) {

  let presetObj = new Preset('presets', id, preset.name, preset.companyId,);
        //  commit(types.PRESET_PREPARE_VARIATIONS, {router})
        presetObj.deviceVariationsJson(preset.variations,presetObj);
        return new Promise((resolve, reject) => {
          presetApi.update(presetObj.toJSON(), id, res => {
            console.log("hola")
            commit(types.PRESET_UPDATE, {router})
            resolve(presetApi)
          }, err => {
            console.log('preset err', err)
            reject(err)
          })
        })

      }

 })


  },

  add({dispatch,commit,state}, {preset}) {
    let result = JSON.parse(localStorage.getItem("userProfile"));
    //preset.companyId=result.companyId;
    dispatch('checkPreset', {
       preset:preset,
     }).then(response => {
      if (response) {
     let presetObj = new Preset('presets', null, preset.name, preset.companyId,);
  /*    presetObj.deviceVariationsJson(preset.variations,presetObj);
      return new Promise((resolve, reject) => {
            presetApi.add(preset.toJSON(), res => {
          commit(types.PRESET_ADD_NEW, {router})
          resolve(presetApi)
        }, err => {
          console.log('preset err', err)
          reject(err)
        })
      })*/

    }
          })


  },
  checkPreset({dispatch,commit,state},{preset}){

    if(preset.name==null || preset.name==""){
      dispatch('error/addNew', {
        message: 'Error, empty field Name'
      }, {root: true})

        return false;
    }
    if(preset.companyId==null || preset.companyId==""){
          dispatch('error/addNew', {
            message: 'Error, empty field Name'
          }, {root: true})

        return false;
    }

    if(preset.variations==null || preset.variations.length==0){
        dispatch('error/addNew', {
          message: 'You don´t have selected any devicevariations'
        }, {root: true})

              return false;
    }

        return true;

  },
  checkDeviceVariations({dispatch,commit,state},{price}){

    if(state.devicevariations!=null){
        for (let variation of state.devicevariations){
    if(variation.id==price.id && variation.deviceId==price.deviceId){
        //price.check=true;
        commit('device/checkPrice',{price:price,value:true},{root:true})
    }
      }
    if(price.check==null){
            //price.check=false;
            commit('device/checkPrice',{price:price,value:false},{root:true})
          }

            }
            else{
              //price.check=false;
              commit('device/checkPrice',{price:price,value:false},{root:true})

            }


  }


}



const mutations = {

  [types.PRESETS_GET_PRESET](state, {records,id}) {
state.preset.id=id;
state.preset.name=  records.name;
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
  [types.PRESET_COMPANY](state,{id}){
    state.preset.companyId=id;

  },

  [types.PRESET_ADD_NEW](state, {router}) {

      router.push({name: 'List Presets'});
  },
  [types.PRESET_PREPARE_VARIATIONS](state, {router}) {

  //  router.push({name: 'List Presets'});

},
updateVariations(state, {e, type,i}){

  state.variations[i]=e.target.checked;
  if(e.target.checked){
    state.preset.variations.push(state.variations[i])
  }else{
      state.preset.variations.splice(i, 1);
  }
},
updateField(state, {e, type}){
  state.preset[type]=e.target.value;
},
updateDeviceVariations(state,{e,price}){
  let p =  _.cloneDeep(price);
if (e.target.checked) {
  p.checks = false;
  state.variations.push(p)

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
