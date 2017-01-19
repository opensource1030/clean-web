import Vue from 'vue';
import auth from './../auth.js';
import Service from './../../models/Service';

const {Store} = require('yayson')();
const store = new Store();
import {findByService, findByAddons} from './../../components/filters.js';

export default {

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

        if (service.carrierId == "" || service.carrierId == null){
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
        }

        if (ok) {
            context.error = false;
            return this.prepareItems(addons, domesticPlan, internationalPlan);
        }

        context.error = true;
        return false;
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
                context.$router.push({name: 'services'});
            },
            (response) => {});
        }
    },
    getDataService(context, id) {

        context.$http.get(process.env.URL_API + '/services/' + id, {
            params: {
               include: 'serviceitems'
            }
        }).then((response) => {

            context.id = id;

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
            context.serviceDetails.carrierId = event.carriers[0].id;

            context.noCarrierSelected = this.checkIfNoCarrierSelected(context);

            //domestic service
            context.domesticPlan.minutes = findByService(event.serviceitems, "voice", "domestic");
            context.domesticPlan.data = findByService(event.serviceitems, "data", "domestic");
            context.domesticPlan.sms = findByService(event.serviceitems, "messaging", "domestic");
            //international service
            context.internationalPlan.minutes = findByService(event.serviceitems, "voice", "international");
            context.internationalPlan.data = findByService(event.serviceitems, "data", "international");
            context.internationalPlan.sms = findByService(event.serviceitems, "messaging", "international");

            //addons
            let addOns = [];
            addOns = findByAddons(event.serviceitems, "addon", "");
            context.addons.splice(0, 1);
            for (let addOn of addOns) {
                addOn.delete = true;
                addOn.add = false;
                context.addons.push(addOn);
            }

            if (context.addons.length == 0) {
                context.addons.push({id: "0", description: '', cost: '', add: false, delete: false});
            }

            context.reorderButtons();
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
                context.$router.push({name: 'services'});

            }, (response) => {});
        }
    },
    getCarrier(context) {
      context.$http.get(process.env.URL_API + '/carriers', {
          params: {
              page: 1,
              'filter[active]': 1
          }
      }).then((response) => {
          event = store.sync(response.data);
          context.carriers = event;

          if(context.carriers.length == 0){
              context.noCarriers = true;
          } else {
              context.noCarriers = false;
          }
      }, (response) => {});
    },
    checkIfNoCarrierSelected (context) {
        for (let car of context.carriers) {
            if(car.id == context.serviceDetails.carrierId) {
                return false;
            }
        }
        return true;
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
