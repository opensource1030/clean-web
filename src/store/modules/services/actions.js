import service from './../../api/service-api'

export const getAll = function({ commit }, page) {
  let params = {
      params: {
          include: 'serviceitems,carriers',
          page: pages,
          //sort: 'title'
      }
  };

          if (state.values.status != '') {
              let aux = state.values.status;
              if (state.values.status.length > 50) {
                  aux = aux.substring(0, 50) + '%';
              }
              params.params['filter[status]'] = aux;
          }

          if (state.values.plans != '') {
              let aux = state.values.plans;
              if (state.values.plans.length > 50) {
                  aux = aux.substring(0, 50) + '%';
              }
              params.params['filter[title][like]'] = aux;
          }

          if (state.values.details != '') {
              let aux = state.values.details;
              if (state.values.details.length > 50) {
                  aux = aux.substring(0, 50) + '%';
              }
              params.params['filter[description][like]'] = aux;
          }

          if (state.values.codePlan != '') {
              let aux = state.values.codePlan;
              if (state.values.codePlan.length > 50) {
                  aux = aux.substring(0, 50) + '%';
              }
              params.params['filter[planCode][like]'] = aux;
          }

          if (state.values.carrier.length > 0) {
              let aux = '';
              for (let carr of state.values.carrier) {
                  aux = aux + carr.id + ',';
              }
              aux = aux.substring(0, aux.length-1);
              params.params['filter[carrierId]'] = aux;
          }

          if (state.search.costMax != 0) {
              params.params['filter[cost][le]'] = state.search.costMax;
          }

          if (state.search.costMin != 0) {
              params.params['filter[cost][ge]'] = state.search.costMin;
          }
  //  commit(types.LOADING, 1)
    service.getAll(params, records => {

      commit(types.SERVICE_GET_ALL, { records })
    }=> {
            console.log(records)
    })

}
