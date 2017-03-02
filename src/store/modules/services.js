import service from './../../api/service-api'
import filter from './../../api/filtersApi'
import * as types from './../mutation-types'
const { Store } = require('yayson')()
const store = new Store()
import {findServiceItem, findByAddons, orderFilters, getFilters} from './../../components/filters.js';
const state = {
  Services: {
    active: 0,
    firstTime: true,
    servicesList: [],
    addons: [],
    addonsShow: false,
    retrieved: 0,
    loading: true,
    showtable: false,
    showModal: false,
    errorNotFound:false

  },
  pagination: {
      current_page: 1,
      total_pages: null,
      count: null,
      total: null,
      per_page: 25
  },
    // Information Needed for the Selects
  selects:{
    status: ['Enabled', 'Disabled'],
    services: [],
    plans: [],
    details: [],
    codePlan: [],
    carriers: [],
    cost: [],
  },



}

const getters = {
  getService:( state) => {return state.Services},
  getSelects:( state )=>{return  state.selects},
  getPagination:(state)=>{return state.pagination}
}

const actions = {

          setActive({commit},index){
                  commit(types.SET_ACTIVE_SERVICES, index)
          },
      Carriers({commit},pages){
        let params = {
            params: {
                'filter[active]':1,
                page:pages
            }
        };
          console.log(pages)
        filter.getCarriers(params, records => {

          commit(types.SERVICES_CARRIERS_GET_ALL, { records })

        }, (err) => {
                console.log(err)
        })

      },

    Services ({ commit },{pages,costMax,costMin,values}) {
  let params = {
      params: {
          include: 'serviceitems,carriers',
          page: pages,
          //sort: 'title'
      }
  };
          if (values.status != '') {
              let aux = values.status;
              if (values.status.length > 50) {
                  aux = aux.substring(0, 50) + '%';
              }
              params.params['filter[status]'] = aux;
          }

          if (values.plans != '') {
              let aux = values.plans;
              if (values.plans.length > 50) {
                  aux = aux.substring(0, 50) + '%';
              }
              params.params['filter[title][like]'] = aux;
          }

          if (values.details != '') {
              let aux = values.details;
              if (values.details.length > 50) {
                  aux = aux.substring(0, 50) + '%';
              }
              params.params['filter[description][like]'] = aux;
          }

          if (values.codePlan != '') {
              let aux = values.codePlan;
              if (values.codePlan.length > 50) {
                  aux = aux.substring(0, 50) + '%';
              }
              params.params['filter[planCode][like]'] = aux;
          }

          if (values.carrier.length > 0) {
              let aux = '';
              for (let carr of values.carrier) {
                  aux = aux + carr.id + ',';
              }
              aux = aux.substring(0, aux.length-1);
              params.params['filter[carrierId]'] = aux;
          }

          if (costMax != 0) {
              params.params['filter[cost][le]'] = costMax;
          }

          if (costMin != 0) {
              params.params['filter[cost][ge]'] = costMin;
          }
  //  commit(types.LOADING, 1)
    service.getAll(params, records => {

      commit(types.SERVICES_GET_ALL, { records })

    }, (err) => {
            console.log(err)
    })

},


}

const mutations = {
          [types.SET_ACTIVE_SERVICES](state,index){
            if(state.Services.active == index) {
                state.Services.servicesList[index].show = !state.Services.servicesList[index].show;
            } else {
              state.Services.servicesList[state.Services.active].show = false;
                state.Services.servicesList[index].show = true;
            }
            state.Services.active = index;
            state.Services.addons = [];
            for (let j = 0; j < state.Services.servicesList[index].serviceitems.length; j++) {
                if( state.Services.servicesList[index].serviceitems[j].category == 'addon') {
                    state.Services.addons.push(state.Services.servicesList[index].serviceitems[j]);
                }
            }
          },


      [types.SERVICES_CARRIERS_GET_ALL] (state, { records }) {
        state.selects.carriers = orderFilters(records, 'presentation', 'string', 'asc');
      },
  [types.SERVICES_GET_ALL] (state, { records }) {
        state.pagination = records.meta.pagination;
          records=store.sync(records);

    state.Services.showtable = false;
    state.Services.loading = false;
    state.Services.errorNotFound = false;

    state.Services.servicesList = [];

    if(records.length == 0){
        state.Services.showtable = true;
        state.Services.errorNotFound = true;
    } else {

      if (state.Services.firstTime) {
           //this.getCarriers(state);
                   state.selects.services = orderFilters(records, 'title', 'string', 'asc');

                   for (let serv of records) {
                       state.selects.status = getFilters(state.selects.status, serv.status, 'string');
                       state.selects.plans = getFilters(state.selects.plans, serv.title, 'string');
                       state.selects.details = getFilters(state.selects.details, serv.description, 'string');
                       state.selects.codePlan = getFilters(state.selects.codePlan, serv.planCode, 'number');
                   }


           state.Services.firstTime = false;
       }



        for (let service of records) {
            service = Object.assign(
                {},
                service,
                {
                    show: false,
                    hide: true
                }
            );

            /*
             *  Sometimes (error) we don't have a carrier assigned,
             *  so we need to put some value to prevent an
             *  issue loading information.
             */
            if (service.carriers.length == 0) {
                service.carriers[0] = {
                    presentation : ''
                }
            }

            state.Services.servicesList.push(service);
        }

        // At the end, we need to load the pagination option if we have more than one page of services.
        if(!state.Services.firstTime) {
            state.Services.loading = false;
        }


  }
},



export default {
  namespaced: true,
  strict:false,
  state,
  getters,
  actions,
  mutations
}
