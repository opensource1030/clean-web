/*import Vue from 'vue';

import {findServiceItem, findByAddons, orderFilters, getFilters} from './../../components/filters.js';
const {Store} = require('yayson')();
const store = new Store();

export default {

    getServicesPage(context, pages) {

        let params = {
            params: {
                include: 'serviceitems,carriers',
                page: pages,
                //sort: 'title'
            }
        };

        if (context.values.status != '') {
            let aux = context.values.status;
            if (context.values.status.length > 50) {
                aux = aux.substring(0, 50) + '%';
            }
            params.params['filter[status]'] = aux;
        }

        if (context.values.plans != '') {
            let aux = context.values.plans;
            if (context.values.plans.length > 50) {
                aux = aux.substring(0, 50) + '%';
            }
            params.params['filter[title][like]'] = aux;
        }

        if (context.values.details != '') {
            let aux = context.values.details;
            if (context.values.details.length > 50) {
                aux = aux.substring(0, 50) + '%';
            }
            params.params['filter[description][like]'] = aux;
        }

        if (context.values.codePlan != '') {
            let aux = context.values.codePlan;
            if (context.values.codePlan.length > 50) {
                aux = aux.substring(0, 50) + '%';
            }
            params.params['filter[planCode][like]'] = aux;
        }

        if (context.values.carrier.length > 0) {
            let aux = '';
            for (let carr of context.values.carrier) {
                aux = aux + carr.id + ',';
            }
            aux = aux.substring(0, aux.length-1);
            params.params['filter[carrierId]'] = aux;
        }

        if (context.search.costMax != 0) {
          console.log(context.search.costMax+'df')
            params.params['filter[cost][le]'] = context.search.costMax;
        }

        if (context.search.costMin != 0) {
            params.params['filter[cost][ge]'] = context.search.costMin;
        }

        context.$http.get(process.env.URL_API + '/services', params).then((response) =>
            {
                context.showtable = false;
                context.loading = false;
                context.errorNotFound = false;

                context.servicesList = [];

                if(response.data.data.length == 0){
                    context.showtable = true;
                    context.errorNotFound = true;
                } else {

                    let event = store.sync(response.data);

                    for (let service of event) {
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
                    /*    if (service.carriers.length == 0) {
                            service.carriers[0] = {
                                presentation : ''
                            }
                        }

                        context.servicesList.push(service);
                    }

                    // The first time we need to retrieve all options.
                    if (context.firstTime) {
                        this.getCarriers(context);

                        this.getServices(context, function(context){
                            if (response.data.meta.pagination.count == context.services.length) {
                                context.services = orderFilters(context.services, 'title', 'string', 'asc');

                                for (let serv of context.services) {
                                    context.status = getFilters(context.status, serv.status, 'string');
                                    context.plans = getFilters(context.plans, serv.title, 'string');
                                    context.details = getFilters(context.details, serv.description, 'string');
                                    context.codePlan = getFilters(context.codePlan, serv.planCode, 'number');
                                }
                            }
                        });
                        context.firstTime = false;
                    }

                    // At the end, we need to load the pagination option if we have more than one page of services.
                    if(!context.firstTime) {
                        context.loading = false;
                    }

                    context.pagination = response.data.meta.pagination;
                }
            }, (response) => {}
        );
    },

    getServices(context, callback) {

        let params1 = {
            params: {

            }
        };

        context.$http.get(process.env.URL_API + '/services', params1).then((response) =>
            {
                if(response.data.data.length == 0){
                    context.errorNotFound = true;
                } else {
                    let i = response.data.meta.pagination.current_page;
                    while (i <= response.data.meta.pagination.total_pages) {

                        let params2 = {
                            params: {
                                page: i
                            }
                        };

                        context.$http.get(process.env.URL_API + '/services', params2).then((response) =>
                            {
                                let event = store.sync(response.data);

                                for (let serv of event) {
                                    context.services.push(serv);
                                }

                                if (callback != null) {
                                    callback(context);
                                }
                            }, (response) => {}
                        );

                        i++;
                    }
                }
            }, (response) => {}
        );
    },

    getCarriers(context) {

        Carrier.getCarriers(context, function() {
            context.carriers = orderFilters(context.carriers, 'presentation', 'string', 'asc');
        })
    },
}*/
