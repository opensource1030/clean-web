import Vue from 'vue';
import {findServiceItem, findByAddons, orderFilters, getFilters} from './../../components/filters.js';
const {Store} = require('yayson')();
const store = new Store();

export default {
  // GET USER INFORMATION.
  getUserInformation(context) {
    let params = { params: { } };

    let userId = localStorage.getItem('userId');

    context.$http.get(process.env.URL_API + '/users/' + userId, params).then((response) => {
      event = store.sync(response.data);
      context.companyId = event.companyId;

      // PACKAGES
      this.getPackagesPage(context, 1);
    },
    (response) => {
      context.errorNotFound = true;
    });
  },
  // GET PACKAGES
  getPackagesPage(context, pages) {

    let params = {
      params: {
        include: 'devicevariations,services,conditions,devicevariations.devices',
        page: pages,
        //sort: 'title'
      }
    };

    params.params['filter[companyId]'] = context.companyId;

    if (context.values.name.length > 0) {
      for (let val of context.values.name) {
        params.params['filter[name][like]'] = '%' + val + '%';
      }
    }

    context.$http.get(process.env.URL_API + '/packages', params).then((response) =>
    {
      context.showtable = false;
      context.loading = false;
      context.errorNotFound = false;

      context.packagesList = [];

      let event = store.sync(response.data);

      if(event.length == 0){
        context.showtable = true;
        context.errorNotFound = true;
      } else {

        let event = store.sync(response.data);

        for (let pack of event) {
          pack = Object.assign(
            {},
            pack,
            {
              show: false,
              hide: true
            }
          );

          context.packagesList.push(pack);
        }

        for (let pack of context.packagesList) {
          pack.valuesOnce = this.getTheValuesFromInclude(pack.devicevariations, 'once');
          pack.valuesMonth = this.getTheValuesFromInclude(pack.services, 'month')
        }

        context.pagination = response.data.meta.pagination;
        context.loading = false;
      }
    }, (response) => {});
  },
  getPackages(context, callback) {

    let params1 = {
      params: {
      }
    };

    let i = context.pagination.current_page;
    while (i <= context.pagination.total_pages) {
      let params1 = {
        params: {
          page: i
        }
      };

      context.$http.get(process.env.URL_API + '/packages', params1).then((response) =>
      {
        let event = store.sync(response.data);

        for (let pack of event) {
          context.packages.push(pack);
        }

        if (callback != null) {
          callback(context);
        }
      }, (response) => {});

      i++;
    }
  },
  getTheValuesFromInclude(packIncludeList, type) {
    let min = -1;
    let currencyMin = 'USD';
    let max = -1;
    let currencyMax = 'USD';

    for (let inc of packIncludeList) {
      if (type == 'month') {
        if(min == -1 && max == -1) {
          min = inc.cost;
          max = inc.cost;
          currencyMin = inc.currency;
          currencyMax = inc.currency;
        }
        if (min > inc.cost) {
          min = inc.cost;
          currencyMin = inc.currency;
        }
        if (max < inc.cost) {
          max = inc.cost;
          currencyMax = inc.currency;
        }
      } else if (type == 'once') {
        if(min == -1 && max == -1) {
          min = inc.priceRetail;
          max = inc.priceRetail;
          currencyMin = inc.devices[0].currency;
          currencyMax = inc.devices[0].currency;
        }
        if (min > inc.priceRetail) {
          min = inc.priceRetail;
          currencyMin = inc.devices[0].currency;
        }
        if (max < inc.priceRetail) {
          max = inc.priceRetail;
          currencyMax = inc.devices[0].currency;
        }
      } else {
        // NOTHING
      }
    }

    if(min == -1) {
      min = 0;
    }
    if(max == -1) {
      max = 0;
    }

    return {
      min : min,
      currencyMin : currencyMin,
      max : max,
      currencyMax : currencyMax
    };
    //'From ' + min + ' ' + currencyMin + ' to ' + max + ' ' + currencyMax ;
  },
  updateTheUsersThatAccomplishesTheConditions(context, conditions) {
    context.$http.post(process.env.URL_API + '/packages/forUser', { "data": {"conditions": conditions, "companyId": context.companyId}}).then((response) => {
      context.numberOfUsers = response.body.number;
    }, (response) => {});
  },
}
