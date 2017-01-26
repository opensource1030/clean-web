import Vue from 'vue';
import auth from './../auth.js';
const {Store} = require('yayson')();
const store = new Store();

export default {

    getServices(context, pages) {

        let services = [];

        let params = {
            params: {
                include: 'serviceitems,carriers',
                page: pages
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
                        services.push(service);
                    }

                    context.pagination = response.data.meta.pagination;
                    if (response.data.meta.pagination.total_pages > 1){
                        context.loadpagination = true;
                    }

                    context.services = services;
                    context.loading = false;
                    context.showtable = true;

                    if (context.firstTime) {

                        for (let serv of context.services) {

                            // Retrieve all Status options.
                            if( context.filter.status.length == 0) {
                                context.filter.status.push(serv.status)
                            } else {
                                let ok = true;
                                for (let a of context.filter.status) {
                                    if (a == serv.status) {
                                        ok = false;
                                    }
                                }

                                if (ok) {
                                    context.filter.status.push(serv.status);
                                }
                            }
                            context.filter.status = context.orderFilters(context.filter.status, '', 'string', 'asc');

                            // Retrieve all Status options.
                            if( context.filter.plans.length == 0) {
                                context.filter.plans.push(serv.title)
                            } else {
                                let ok = true;
                                for (let a of context.filter.plans) {
                                    if (a == serv.title) {
                                        ok = false;
                                    }
                                }

                                if (ok) {
                                    context.filter.plans.push(serv.title);
                                }
                            }
                            context.filter.plans = context.orderFilters(context.filter.plans, '', 'string', 'asc');

                            // Retrieve all Status options.
                            if( context.filter.details.length == 0) {
                                if (serv.description != '') {
                                    context.filter.details.push(serv.description)    
                                }                
                            } else {
                                let ok = true;
                                for (let a of context.filter.details) {
                                    if (a == serv.description) {
                                        ok = false;
                                    }
                                }

                                if (ok) {
                                    if (serv.description != '') {
                                        context.filter.details.push(serv.description);
                                    }
                                }
                            }
                            context.filter.details = context.orderFilters(context.filter.details, '', 'string', 'asc');

                            // Retrieve all Status options.
                            if( context.filter.codePlan.length == 0) {
                                context.filter.codePlan.push(serv.planCode)
                            } else {
                                let ok = true;
                                for (let a of context.filter.codePlan) {
                                    if (a == serv.planCode) {
                                        ok = false;
                                    }
                                }

                                if (ok) {
                                    context.filter.codePlan.push(serv.planCode);
                                }
                            }
                            context.filter.codePlan = context.orderFilters(context.filter.codePlan, '', 'number', 'asc');
                        }
                        context.firstTime = false;
                    }
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
                    
                    let i = 1;
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
    }
}
