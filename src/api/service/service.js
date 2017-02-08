import Vue from 'vue';
import auth from './../auth.js';
import Service from './../../models/Service';
import Carrier from './../carrier/carriers';
import {findServiceItem, findByAddons, orderFilters} from './../../components/filters.js';

const {Store} = require('yayson')();
const store = new Store();

export default {

    getService(context, id) {

        let params = {
            params: {
                include: 'serviceitems,carriers'
            }
        };

        context.$http.get(process.env.URL_API + '/services/' + id, params).then((response) => {

            event = store.sync(response.data);

            if (event.status === "Enabled") {
              context.serviceDetails.status = true;
            } else {
              context.serviceDetails.status = false;
            }

            context.serviceDetails.title = event.title;
            context.serviceDetails.code = event.planCode;
            context.serviceDetails.cost = event.cost;
            context.serviceDetails.description = event.description;
            context.serviceDetails.currency = event.currency;
            context.serviceDetails.carrier = event.carriers[0];
            context.serviceDetails.id = id;

            //domestic service
            context.domesticPlan.minutes = findServiceItem(event, "voice", "domestic");
            context.domesticPlan.data = findServiceItem(event, "data", "domestic");
            context.domesticPlan.sms = findServiceItem(event, "messaging", "domestic");

            //international service
            context.internationalPlan.minutes = findServiceItem(event, "voice", "international");
            context.internationalPlan.data = findServiceItem(event, "data", "international");
            context.internationalPlan.sms = findServiceItem(event, "messaging", "international");

            //addons
            let addOns = [];
            addOns = findByAddons(event.serviceitems, "addon", "");
            context.addons.splice(0, 1);
            for (let addOn of addOns) {
                context.addons.push(addOn);
            }

            if (context.addons.length == 0) {
                context.addons.push({id: "0", description: '', cost: '', add: false, delete: false});
            }

            context.reorderButtons();
            this.getCarriers(context);
        }, (response) => {});
    },

    addService(context, serviceDetails, domesticPlan, internationalPlan, addons) {
        let status = "";
        if (serviceDetails.status == true) { status = "Enabled"; } else { status = "Disabled"; }

        let service = new Service("services", null, status, serviceDetails.title, serviceDetails.code, serviceDetails.cost, serviceDetails.description, serviceDetails.currency, serviceDetails.carrierId)
        let items = this.checkPlan(service, serviceDetails, domesticPlan, internationalPlan, addons, context);

        if (items != false) {
            service.itemJson(items, service);
            context.$http.post(process.env.URL_API + '/services', {"data": service.toJSON()}).then((response) => {
                context.$router.push({name: 'List Services'});

            }, (response) => {});
        }
    },

    updateService(id, context, serviceDetails, domesticPlan, internationalPlan, addons) {

        let status = "";

        if (serviceDetails.status == true) {
            status = "Enabled"
        } else {
            status = "Disabled"
        }

        let service = new Service("services", id, status, serviceDetails.title, serviceDetails.code, serviceDetails.cost, serviceDetails.description, serviceDetails.currency, serviceDetails.carrierId)
        let plan = this.checkPlan(service, serviceDetails, domesticPlan, internationalPlan, addons, context);

        if (plan != false) {
            let serviceItems = service.itemJson(plan, service);

            context.$http.patch(process.env.URL_API + '/services/' + id, {
                "data":service.toJSON()
            })
            .then((response) => {
                context.$router.push({name: 'List Services'});
            },
            (response) => {});
        }
    },

    getCarriers(context) {

        Carrier.getCarriers(context, function(data) {
            
            if(context.carriers.length == 0){
                context.noCarriers = true;
            } else {
                context.carriers = context.orderFilters(context.carriers, 'presentation', 'string', 'asc');
                context.noCarriers = false;
            }

            if (data.meta.pagination.total == context.carriers.length) {
                if(context.carriers.length == 0){
                    context.noCarriers = true;
                } else {
                    context.carriers = context.orderFilters(context.carriers, 'presentation', 'string', 'asc');
                    context.noCarriers = false;
                }
                if(context.serviceDetails.id > 0) {
                    var selected = false;
                    for (let car of context.carriers) {
                        if(car.id == context.serviceDetails.carrier.id) {
                            context.serviceDetails.carrierId = context.serviceDetails.carrier.id;
                            selected = selected && false;
                        }
                    }
                    context.noCarrierSelected = selected;
                }
                context.loadedContent = true;
            }
        })
    },

    checkPlan(service, serviceDetails, domesticPlan, internationalPlan, addons, context) {

        let ok = true;

        context.errorsStyle.titleError = false;
        context.errorsStyle.planCodeError = false;
        context.errorsStyle.costError = false;
        context.errorsStyle.currencyError = false;
        context.errorsStyle.carrierError = false;
        context.errorsStyle.unitDomError = false;
        context.errorsStyle.unitIntError = false;

        if (service.title == "" || service.title == null){
            ok = false;
            context.errorsStyle.titleError = true;
        }

        if (service.planCode == "" || service.planCode == null){
            ok = false;
            context.errorsStyle.planCodeError = true;
        }

        if (service.cost == "" || service.cost == null ){
            ok = false;
            context.errorsStyle.costError = true;
        }

        if (service.currency == "" || service.currency == null){
            ok = false;
            context.errorsStyle.currencyError = true;
        }

        if (service.carrierId == 0){
            ok = false;
            context.errorsStyle.carrierError = true;
        }

        if (domesticPlan.data.unit == "" || domesticPlan.data.unit == null){
            ok = false;
            context.errorsStyle.unitDomError = true;
        }

        if (internationalPlan.data.unit == "" || internationalPlan.data.unit == null){
            ok = false;
            context.errorsStyle.unitIntError = true;
        }

        for (let addon of addons) {
            if(addon.description == "") {
                if(addon.cost != "") {
                    ok = false;
                }
            } else {
                if(addon.cost == "") {
                    ok = false;
                }
            }

            addon.unit = serviceDetails.currency;
        }

        if (ok) {
            context.error = false;
            return this.prepareItems(addons, domesticPlan, internationalPlan);
        }

        context.error = true;
        return false;
    },

    prepareItems(addons, domesticPlan, internationalPlan) {
        let items = [];

        items.push(domesticPlan.minutes);
        items.push(domesticPlan.data);
        items.push(domesticPlan.sms);

        items.push(internationalPlan.minutes);
        items.push(internationalPlan.data);
        items.push(internationalPlan.sms);

        for (let addon of addons) {
            if (addon.description != "" && addon.cost != "") {
                if(addon.id == null) {
                    addon.id = 0;
                }
                items.push(addon);
            }
        }

        return items;
    }
}
