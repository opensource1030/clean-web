import * as getters from './getters'
import * as actions from './actions'

// initial state
const initialState = {
  all: {
    pagination: {
        current_page: 1,
        total_pages: null,
        count: null,
        total: null,
        per_page: 25
    },
    active: 0,
    firstTime: true,
    servicesList: [],
    addons: [],
    addonsShow: false,

    retrieved: 0,
    loading: true,
    showtable: false,
    showModal: false,
    errorNotFound:false,



  },
  selects:{
    status: ['Enabled', 'Disabled'],
    services: [],
    plans: [],
    details: [],
    codePlan: [],
    carriers: [],
    cost: [],
  },
  // Selected Values
  values: {
      status: '',
      plans: '', // service.title
      details: '', // service.descriptions
      codePlan: '', // service.codePlan
      carrier: [], // carriers.presentation
      cost: '', // service.cost
  },




}

// getters


// actions


// mutations
const mutations = {
  [types.SERVICE_GET_ALL] (state, { records }) {
    state.all.showtable = false;
    state.all.loading = false;
    state.all.errorNotFound = false;

    state.all.servicesList = [];

    if(records.length == 0){
        state.all.showtable = true;
        state.all.errorNotFound = true;
    } else {



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

            state.all.servicesList.push(service);
        }

        // The first time we need to retrieve all options.
      /*  if (state.all.firstTime) {
            this.getCarriers(state);

            this.getServices(state, function(state){
                if (response.data.meta.pagination.count == state.services.length) {
                    state.services = orderFilters(state.services, 'title', 'string', 'asc');

                    for (let serv of state.all.services) {
                        state.status = getFilters(state.status, serv.status, 'string');
                        state.plans = getFilters(state.plans, serv.title, 'string');
                        state.details = getFilters(state.details, serv.description, 'string');
                        state.codePlan = getFilters(state.codePlan, serv.planCode, 'number');
                    }
                }
            });
            state.all.firstTime = false;
        }*/

        // At the end, we need to load the pagination option if we have more than one page of services.
        if(!state.all.firstTime) {
            state.all.loading = false;
        }

        state.all.pagination = records.meta.pagination;


  }
}
},

export default {
  namespaced: true,
 state: {...initialState},
  getters,
  actions,
  mutations
}
