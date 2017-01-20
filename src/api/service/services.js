import Vue from 'vue';
import auth from './../auth.js';
var {Store} = require('yayson')();
var store = new Store();

export default {

    getServices(context, pages) {

        var services = [];

        context.$http.get(process.env.URL_API + '/services', {
            params: {
                include: 'serviceitems,carriers',
                page: pages,
                /*,filter[][like]:deviceType*/
            }
        }).then((response) =>
            {
                context.showtable = false;
                context.loading = false;

                if(response.data.data.length == 0){
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
                        services.push(service);
                    }

                    for (let serv of services) {
                        if(serv.carriers ==  null || serv.carriers.length == 0) {
                            context.errorNotFound = true;
                        }

                        if (serv.serviceitems == null || serv.serviceitems.length == 0){
                            context.errorNotFound = true;
                        }
                    }

                    if (!context.errorNotFound) {

                        context.showtable = true;
                        context.loading = false;

                        context.pagination = response.data.meta.pagination;
                        if (response.data.meta.pagination.total_pages > 1){
                            context.loadpagination = true;
                        }

                        context.services = services;
                        context.showtable = true;
                    }
                }
            }, (response) => {
                context.error = "Unexpected Error. Please, Contact with the Administrator.";
                context.showModal = true;
            }
        );
    }
}
