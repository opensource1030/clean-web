import service from './../../../api/service-api'
import * as types from './../../mutation-types'
const {Store} = require('yayson')()
const store = new Store()
import {findServiceItem, findByAddons, orderFilters, getFilters} from './../../../components/filters.js';
const state = {
  Services: {
    firstTime: true,
    servicesList: [],
    addons: [],
    addonsShow: false,
    retrieved: 0,
    loading: true,
    showtable: false,
    showModal: false,
    errorNotFound: false

  },
  pagination: {
    current_page: 1,
    total_pages: null,
    count: null,
    total: null,
    per_page: 25
  },
  // Information Needed for the Selects
  selects: {
    status: [
      'Enabled', 'Disabled'
    ],
    services: [],
    plans: [],
    details: [],
    codePlan: [],
    cost: []
  },
  //FILTERS
  filter: {
      status: '',
      plan:'',
      details: '',
      codePlan:'',
      carriers:[],
      cost:''
  },
}

const getters = {
  getService: (state) => {
    return state.Services
  },
  getSelects: (state) => {
    return state.selects
  },
  getPagination: (state) => {
    return state.pagination
  }
}

const actions = {
  prevPage({dispatch, commit, state}) {
    if (state.pagination.current_page > 1) {
      commit(types.SERVICE_PREV_PAGE)
      dispatch('getAll')
    }
  },

  nextPage({dispatch, commit, state}) {
    if (state.pagination.current_page < state.pagination.total_pages) {
      commit(types.SERVICE_NEXT_PAGE)
      dispatch('getAll')
    }
  },

  getAll({ dispatch, commit, state }) {
    let params = {
      params: {
        include: 'serviceitems,carriers',
        page: state.pagination.current_page,
        //sort: 'title'
      }
    };

    /*
    if (state.filter.status != '') {
      let aux = state.filter.status;
      if (state.filter.status.length > 50) {
        aux = aux.substring(0, 50) + '%';
      }
      params.params['filter[status]'] = aux;
    }

    if (state.filter.plans != '') {
      let aux = state.filter.plans;
      if (state.plans.length > 50) {
        aux = aux.substring(0, 50) + '%';
      }
      params.params['filter[title][like]'] = aux;
    }

    if (state.filter.details != '') {
      let aux = state.filter.details;
      if (state.details.length > 50) {
        aux = aux.substring(0, 50) + '%';
      }
      params.params['filter[description][like]'] = aux;
    }

    if (state.filter.codePlan != '') {
      let aux = state.filter.codePlan;
      if (state.codePlan.length > 50) {
        aux = aux.substring(0, 50) + '%';
      }
      params.params['filter[planCode][like]'] = aux;
    }

    if (state.filter.carriers.length > 0) {
      let aux = '';
      for (let carr of state.filter.carriers) {
        aux = aux + carr.id + ',';
      }
      aux = aux.substring(0, aux.length - 1);
      params.params['filter[carrierId]'] = aux;
    }

    if (costMax != 0) {
      params.params['filter[cost][le]'] = costMax;
    }

    if (costMin != 0) {
      params.params['filter[cost][ge]'] = costMin;
    }
    */

    //  commit(types.LOADING, 1)
    service.getAll(params, records => {
      commit(types.SERVICES_GET_ALL, {records})
    }, (err) => {
      console.log(err)
    })
  },

  addFilter ({dispatch,commit}, {type, records}) {
    commit(types.SERVICE_ADD_FILTER, {type, records})
    dispatch('getAll')
 },
}

const mutations = {
  [types.SERVICE_PREV_PAGE](state) {
    // if (state.pagination.current_page > 1)
    state.pagination.current_page--
  },

  [types.SERVICE_NEXT_PAGE](state) {
    // if (state.pagination.current_page < state.pagination.total_pages)
    state.pagination.current_page++
  },

  [types.SERVICE_ADD_FILTER] (state, {type, records}) {
    switch (type) {
      case 'status':
        state.filter.status = records
        break
      case 'plan':
        state.filter.plan = records
        break
      case 'carriers':
        state.filter.carriers = records
        break
      case 'details':
        state.filter.details= records
        break
      case 'codePlan':
        state.filter.codePlan= records
        break
      case 'cost':
        state.filter.cost = records
        break
    }
  },

  [types.SERVICES_GET_ALL](state, {records}) {
    state.pagination = records.meta.pagination;
    records = store.sync(records);

    state.Services.showtable = false;
    state.Services.loading = false;
    state.Services.errorNotFound = false;

    state.Services.servicesList = [];

    if (records.length == 0) {
      state.Services.showtable = true;
      state.Services.errorNotFound = true;
    } else {

      if (state.Services.firstTime) {
        //this.getCarriers(state);
        state.selects.services = orderFilters(records, 'title', 'string', 'asc');

        for (let serv of records) {
          if (serv.status != null) {
            state.selects.status = getFilters(state.selects.status, serv.status, 'string');
          }
          if (serv.title != null) {
            state.selects.plans = getFilters(state.selects.plans, serv.title, 'string');
          }
          if (serv.description != null) {
            state.selects.details = getFilters(state.selects.details, serv.description, 'string');
          }
          if (serv.planCode != null) {
            state.selects.codePlan = getFilters(state.selects.codePlan, serv.planCode, 'number');
          }
        }

        state.Services.firstTime = false;
      }

      for (let service of records) {
        service = Object.assign({}, service, {
          show: false,
          hide: true
        });

        if (service.status === "Enabled") {
          service.status = true;
        } else {
          service.status = false;
        }

        /*
         *  Sometimes (error) we don't have a carrier assigned,
         *  so we need to put some value to prevent an
         *  issue loading information.
         */
        if (service.carriers.length == 0) {
          service.carriers[0] = {
            presentation: ''
          }
        }

        state.Services.servicesList.push(service);
      }

      // At the end, we need to load the pagination option if we have more than one page of services.
      if (!state.Services.firstTime) {
        state.Services.loading = false;
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