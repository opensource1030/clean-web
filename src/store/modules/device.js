import _ from 'lodash'
import device from './../../api/device-api'
import * as types from './../mutation-types'

const {Store} = require('yayson')()
const store = new Store()

// initial state
const state = {
    all: [],
    types: [],
    manufactures: [],
    prices: [],

    filter: {
        styles: [],
        capacities: [],
        carriers: [],
        type:[],
        manufactured:[],
        price:[],
    },

    pagination: {
        current_page: 1,
        total_pages: 0,
        count: 0,
        total: 0,
        per_page: 25
    },
}

// getters
const getters = {
    allDevices: (state) => {
        return state.all
    },

    search: (state, getters) => {
        let devices = state.all

        if (state.filter.capacities.length > 0) {
            devices = _.filter(devices, (device) => {
                let intersects = _.intersectionBy(device.modifications, state.filter.capacities, 'id')
                return intersects.length > 0
            })
        }

        if (state.filter.styles.length > 0) {
            devices = _.filter(devices, (device) => {
                let intersects = _.intersectionBy(device.modifications, state.filter.styles, 'id')
                return intersects.length > 0
            })
        }

        return devices
    },
}

// actions
const actions = {
    getAll ({dispatch, commit, state},{search:search}) {
        // commit(types.DEVICE_GET_ALL, await device.getAll({}))
        return new Promise((resolve, reject) => {
            /*
             building params with filters and pagination
             this params has been updated by any component, guess vuex-router-sync
             */
            let params = {
                params: {
                    include: 'modifications,devicevariations,devicevariations.companies,devicevariations.carriers,images,devicevariations.modifications,devicevariations.images',
                    page: state.pagination.current_page,
                }
            }
            // console.log(params)


          dispatch('filterApi',{params:params,search:search}).then(response => {



            device.getAll(response, res => {
                // console.log('devices res', res)
                const devices = store.sync(res.data)
                for (let device of devices) {
                    if (device.images.length > 0) {
                        _.extend(device, {
                            priceName: [],
                            image: process.env.URL_API + '/images/' + device.images[0].id,
                        })
                    } else {
                        _.extend(device, {
                            priceName: [],
                            image: '/assets/img/logo.a521535.png'
                        })
                    }


                    for (let price of device.devicevariations) {
                      var max = Math.max(price.priceRetail,price.price1,price.price2,price.priceOwn);

                      _.extend(device, {
                          pricemax:max
                      })
                      for (let company of price.companies) {
                          _.extend(price, {
                              company:company.name
                          })
                      }

                      for (let carrier of price.carriers) {
                        if(price.carrierId==carrier.id){
                        _.extend(price, {
                            carrier:carrier.presentation
                        })
                          }
                          //price.carrier=carrier.presentation;
                      }
                        for (let m of price.modifications) {
                          if (m.modType == "capacity") {
                            _.extend(price, {
                                capacity:m
                            })

                          }else{
                            _.extend(price, {
                                style:m
                            })

                          }
                      }
                  //    dispatch('preset/checkDeviceVariations', {
                    //    price: price
                    //  }, {root: true})

                  //  let prices= preset.checkDeviceVariations(price);
                        device.priceName.push(price);
                    }

                }
                // console.log('all devices', devices)
                commit(types.DEVICE_GET_ALL, {records: devices})
                // commit(types.DEVICE_SET_PAGINATION, { pagination: res.data.meta.pagination })
                dispatch('setPagination', {pagination: res.data.meta.pagination})
                resolve(devices)
            }, err => {
                // console.log('devices err', err)
                reject(err)
            })
            })
        })
    },
    filterApi({dispatch, commit,state},{params,search}){
       
      if (state.filter.type.length !== 0) {
        let aux = '';
        for (let ty of state.filter.type) {
            aux = aux + ty + ',';
        }
        aux = aux.substring(0, aux.length-1);
       params.params['filter[name][like]'] = aux+'%';

       }
       if (state.filter.manufactured.length !== 0) {
         let aux = '';
         for (let manu of state.filter.manufactured) {
             aux = aux + manu + ',';
         }

         aux = aux.substring(0, aux.length-1);
           params.params['filter[make][like]'] =aux+'%';


       }

       if (state.filter.price.length != 0) {
         let aux = '';
         for (let p of state.filter.price) {
             aux = aux + p + ',';
         }
         aux = aux.substring(0, aux.length-1);
         params.params['filter[defaultPrice][like]'] = aux;

       }

       if (state.filter.carriers.length > 0) {
             let aux = '';
             for (let carr of state.filter.carriers) {
                 aux = aux + carr.id + ',';
             }
             aux = aux.substring(0, aux.length-1);
           params.params['filter[devicevariations.carrierId][like]'] = aux;

       }

       if (state.filter.capacities.length != 0) {
         let aux = '';
         for (let capa of state.filter.capacities) {
             aux = aux + capa.id + ',';
         }
         aux = aux.substring(0, aux.length-1);
           params.params['filter[modifications.id]'] = aux;

       }

       if (state.filter.styles.length != 0) {
         let aux = '';
         for (let sty of state.filter.styles) {
             aux = aux + sty.id + ',';
         }
         aux = aux.substring(0, aux.length-1);
           params.params['filter[modifications.id]'] = aux;

       }
       if (search.costMax != 0 && search!=0) {
           params.params['filter[cost][le]'] = search.costMax;

       }

       if (search.costMin != 0 && search!=0) {
           params.params['filter[cost][ge]'] = search.costMin;

       }
       return params

    },
    searchDeviceType({dispatch, commit, state},{query}) {
      return new Promise((resolve, reject) => {
          /*
           building params with filters and pagination
           this params has been updated by any component, guess vuex-router-sync
           */
           let params={
             params:{

             }
           };
           params.params['filter[name][like]']='%'+query+'%';
          // console.log(params)

          device.getAll(params, res => {
              // console.log('devices res', res)
              const devices = store.sync(res.data)

              // console.log('all devices', devices)
              commit(types.DEVICE_FILTER_TYPE, {records: devices})
              // commit(types.DEVICE_SET_PAGINATION, { pagination: res.data.meta.pagination })
              dispatch('setPagination', {pagination: res.data.meta.pagination})
              resolve(devices)
          }, err => {
              // console.log('devices err', err)
              reject(err)
          })
      })



  },
  searchManufactures({dispatch, commit, state},{query}) {
    return new Promise((resolve, reject) => {
        /*
         building params with filters and pagination
         this params has been updated by any component, guess vuex-router-sync
         */
         let params={
           params:{

           }
         };
         params.params['filter[make][like]']= '%'+query+'%';
        // console.log(params)

        device.getAll(params, res => {
            // console.log('devices res', res)
            const devices = store.sync(res.data)

            // console.log('all devices', devices)
            commit(types.DEVICE_FILTER_MANUFACTURES, {records: devices})
            // commit(types.DEVICE_SET_PAGINATION, { pagination: res.data.meta.pagination })
            dispatch('setPagination', {pagination: res.data.meta.pagination})
            resolve(devices)
        }, err => {
            // console.log('devices err', err)
            reject(err)
        })
    })



},
searchPrice({dispatch,commit,state},{query}){
  return new Promise((resolve, reject) => {
      /*
       building params with filters and pagination
       this params has been updated by any component, guess vuex-router-sync
       */
       let params={
         params:{
         }
       };
       params.params['filter[defaultPrice][like]']='%'+query+'%';
      // console.log(params)

      device.getAll(params, res => {
          // console.log('devices res', res)
          const devices = store.sync(res.data)

          // console.log('all devices', devices)
          commit(types.DEVICE_FILTER_PRICE, {records: devices})
          // commit(types.DEVICE_SET_PAGINATION, { pagination: res.data.meta.pagination })
          dispatch('setPagination', {pagination: res.data.meta.pagination})
          resolve(devices)
      }, err => {
          // console.log('devices err', err)
          reject(err)
      })
  })

},
    addNew ({commit}, {name}) {
        device.add(params, record => {
            commit(types.DEVICE_ADD_NEW, {record})
        })
    },

    setPagination ({commit}, {pagination}) {
        commit(types.DEVICE_SET_PAGINATION, {pagination})
    },

    prevPage ({dispatch, commit, state}) {
        // console.log('device prevPage')
        if (state.pagination.current_page > 1) {
            commit(types.DEVICE_PREV_PAGE)
            dispatch('getAll',{search:0})
        }
    },

    nextPage ({dispatch, commit}) {
        // console.log('device nextPage')
        if (state.pagination.current_page < state.pagination.total_pages) {
            commit(types.DEVICE_NEXT_PAGE)
            dispatch('getAll',{search:0})
        }
    },
    addFilter ({dispatch,commit}, {type, records}) {
        commit(types.DEVICE_ADD_FILTER, {type, records})
          dispatch('getAll',{search:0})
    },
}

// mutations
const mutations = {
    [types.DEVICE_GET_ALL] (state, {records}) {
        state.all = records
        state.types = _.chain(state.all).sortBy('name').map('name').compact().uniq().value()
        state.manufactures = _.chain(state.all).sortBy('make').map('make').compact().uniq().value()
        state.prices = _.chain(state.all).sortBy('defaultPrice').map('defaultPrice').uniq().value()

    },
    [types.DEVICE_FILTER_TYPE](state,{records}){
      state.types = _.chain(records).sortBy('name').map('name').compact().uniq().value()
    },
    [types.DEVICE_FILTER_MANUFACTURES](state,{records}){
        state.manufactures = _.chain(records).sortBy('make').map('make').compact().uniq().value()
    },
    [types.DEVICE_FILTER_PRICE](state,{records}){
      state.prices = _.chain(records).sortBy('defaultPrice').map('defaultPrice').uniq().value()
    },
    [types.DEVICE_ADD_NEW] (state, {record}) {
        state.all.push(record)
    },

    [types.DEVICE_SET_PAGINATION] (state, {pagination}) {
        _.extend(state.pagination, pagination)
    },

    [types.DEVICE_PREV_PAGE] (state) {
        // if (state.pagination.current_page > 1)
        state.pagination.current_page--
    },

    [types.DEVICE_NEXT_PAGE] (state) {
        // if (state.pagination.current_page < state.pagination.total_pages)
        state.pagination.current_page++
    },

    [types.DEVICE_ADD_FILTER] (state, {type, records}) {
        switch (type) {
            case 'style':
                state.filter.styles = records
                break
            case 'capacity':
                state.filter.capacities = records
                break
            case 'carrier':
                state.filter.carriers = records
            case 'type':
                state.filter.type= records
                break
            case 'manufactured':
                state.filter.manufactured= records
                break
            case 'price':
                state.filter.price = records
                break
        }
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
