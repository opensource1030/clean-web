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
                if(response.data.data.length == 0){
                    context.showtable = false;
                    context.loading = false;
                } else {
                    context.showtable = true;
                    context.loading = false;

                    let event = store.sync(response.data);

                    context.pagination = response.data.meta.pagination;
                    if (response.data.meta.pagination.total_pages > 1){
                        context.loadpagination = true;
                    }

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

                    var ok = true;
                    for (let serv of services) {
                        if(serv.status == null || serv.status == '') { serv.status = ""; }
                        if(serv.title == null || serv.title == '') { serv.title = ""; }
                        if(serv.description == null || serv.description == '') { serv.description = ""; }
                        if(serv.cost == null || serv.cost == '') { serv.cost = ""; }

                        if(serv.carriers ==  null || serv.carriers.length == 0) {
                            serv.carriers.push({ presentation : ""});
                            context.error = "No Carrier Found. Please, Contact with the Administrator.";
                            ok = false;
                        }

                        if (serv.serviceitems == null || serv.serviceitems.length == 0){
                            context.error = "No ServiceItem Found. Please, Contact with the Administrator.";
                            ok = false;
                        }
                    }

                    if(ok){
                        context.services = services;
                        context.showtable = true;
                    } else {
                        context.showModal = true;
                    }
                }
            }, (response) => {
                context.error = "Unexpected Error. Please, Contact with the Administrator.";
                context.showModal = true;
            }
        );
    }
}
