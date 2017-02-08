import Vue from 'vue';
import auth from './../auth.js';
import Carrier from './../carrier/carriers';
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
                        context.servicesList.push(service);
                    }

                    /*
                     *  Sometimes we don't have a carrier assigned,
                     *  so we need to put some value to prevent an
                     *  issue loading information.
                     */
                    for (let serv of context.servicesList) {
                        if (serv.carrierId == 0) {
                            serv.carriers[0] = {
                                presentation : ''
                            }
                        }
                    }

                    // The first time we need to retrieve all options.
                    if (context.firstTime) {
                        this.getCarriers(context);
                        this.getServices(context, function(context, service){
                            if (response.data.meta.pagination.count == context.services.length) {
                                context.services = context.orderFilters(context.services, 'title', 'string', 'asc');

                                for (let serv of context.services) {
                                    service.getFilters(context, context.status, serv.status, 'string');
                                    service.getFilters(context, context.plans, serv.title, 'string');
                                    service.getFilters(context, context.details, serv.description, 'string');
                                    service.getFilters(context, context.codePlan, serv.planCode, 'number');
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
                                    callback(context, this);
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
            context.carriers = context.orderFilters(context.carriers, 'presentation', 'string', 'asc');
        })
    },

    /*
     *  This function receives a list and a sentence, the list is filled with the sentences that have not been insered yet.
     *  Then, we order the list.
     *  Example: this.getFilters(context, context.filter.status, serv.status, 'string');
     *
     *  @context: Is the Context.
     *  @list: Is the list of the filters.
     *  @value: Is the value that we need to insert into the list.
     *  @order: Is the order for the orderFilters function.
     *
     *  @return: returns an ordered list with the values.
     *
     */
    getFilters (context, list, value, order) {

        let aux = value;
        if(aux.length >= 50){
            aux = aux.substring(0, 50);
            aux = aux + '...';
        }

        if (list.length == 0) {
            list.push(aux)
        } else {
            let ok = true;
            for (let a of list) {
                if (a == aux) {
                    ok = false;
                }
            }

            if (ok) {
                list.push(aux);
            }
        }
        list = context.orderFilters(list, '', order, 'asc');
    }
}
