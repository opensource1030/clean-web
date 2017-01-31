import Vue from 'vue';
import auth from './../auth.js';
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

        if (context.values.status !== '') {
            params.params['filter[status]'] = context.values.status;
        }

        if (context.values.plans != '') {
            params.params['filter[title][like]'] = context.values.plans;
        }

        if (context.values.details != '') {
            params.params['filter[description][like]'] = context.values.details;
        }

        if (context.values.codePlan != '') {
            params.params['filter[planCode][like]'] = context.values.codePlan;
        }
        
        if (context.values.carrier != 0) {
            params.params['filter[carrierId]'] = context.values.carrier.id;
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

                if(response.data.data.length == 0){
                    context.showtable = true;    
                    context.errorNotFound = true;
                    context.services = [];
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
                        context.services.push(service);
                    }

                    // Order the Services by title.
                    //context.services = context.orderFilters(context.services, 'title', 'string', 'asc');

                    /*
                     *  Sometimes we don't have a carrier assigned,
                     *  so we need to put some value to prevent an
                     *  issue loading information.
                     */
                    for (let serv of context.services) {
                        if (serv.carrierId == 0) {
                            serv.carriers[0] = {
                                presentation : ''
                            }
                        }
                    }

                    // The first time we need to retrieve all options.
                    if (context.firstTime) {
                        this.getCarriers(context);
                        this.getServices(context);
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

    getCarriers (context) {

        let params1 = {
            params: {
                'filter[active]':1,
            }
        };

        context.$http.get(process.env.URL_API + '/carriers', params1).then((response) =>
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

                        context.$http.get(process.env.URL_API + '/carriers', params2).then((response) =>
                            {
                                let event = store.sync(response.data);
                                   
                                for (let carr of event) {
                                    context.filter.carriers.push(carr);
                                }

                                context.filter.carriers = context.orderFilters(context.filter.carriers, 'presentation', 'string', 'asc');
                            }, (response) => {}
                        );

                        i++;
                    }
                }
            }, (response) => {}
        );
    },

    getServices (context) {

        let params1 = {
            params: {}
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
                                    context.filter.services.push(serv);
                                }

                                if (response.data.meta.pagination.count == context.filter.services.length) {
                                    context.filter.services = context.orderFilters(context.filter.services, 'title', 'string', 'asc');

                                    for (let serv of context.filter.services) {
                                        this.getFilters(context, context.filter.status, serv.status, 'string');
                                        this.getFilters(context, context.filter.plans, serv.title, 'string');
                                        this.getFilters(context, context.filter.details, serv.description, 'string');
                                        this.getFilters(context, context.filter.codePlan, serv.planCode, 'number');
                                    }
                                }
                            }, (response) => {}
                        );

                        if(i == response.data.meta.pagination.total_pages) {
                            context.loading = false;
                        }

                        i++;
                    }
                }
            }, (response) => {}
        );
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
        if(aux.length >= 40){
            aux = aux.substring(0, 40);
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
