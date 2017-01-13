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
                context.loading = false;
                context.showtable = true;
                let event = store.sync(response.data);
                context.pagination = response.data.meta.pagination;

                for (let service of event) {
                    service = Object.assign(
                        {},
                        service, {
                            show: false,
                            hide: true
                        }
                    );
                    services.push(service);
                }

                var ok = true;

                for (let serv of services) {

                    if(serv.carriers ==  null || serv.carriers.length == 0) {
                        context.error = "Unexpected Error. Contact with the Administrator.";
                        ok = false;
                    } else if (serv.serviceitems == null || serv.serviceitems.length == 0){
                        context.error = "Unexpected Error. Contact with the Administrator.";
                        ok = false;
                    }

                    if(ok){
                        context.services = services;
                    } else {
                        context.showModal = true;
                    }
                }

            }, (response) => {
                context.error = "Response Error";
                context.showModal = true;
            }
        );
    }
}
