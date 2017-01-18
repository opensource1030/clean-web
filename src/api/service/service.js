import Vue from 'vue';
import auth from './../auth.js';
import Service from './../../models/Service';

var {Store} = require('yayson')();
var store = new Store();
import {findByService, findByAddons} from './../../components/filters.js';

export default {

    checkPlan(service, serviceDetails, domesticPlan, internationalPlan, addons, context) {

        var ok = true;

        if (service.title == "" || service.title == null){
            ok = false;
            context.titleError = 'border:1px solid red;';
        } else {
            ok = ok && true;
            context.titleError = 'border:1px solid #cacaca;';
        }

        if (service.planCode == "" || service.planCode == null){
            ok = false;
            context.planCodeError = 'border:1px solid red;';
        } else {
            ok = ok && true;
            context.planCodeError = 'border:1px solid #cacaca;';
        }

        if (service.cost == "" || service.cost == null){
            ok = false;
            context.costError = 'border:1px solid red;';
        } else {
            ok = ok && true;
            context.costError = 'border:1px solid #cacaca;';
        }

        if (service.carrierId == "" || service.carrierId == null){
            ok = false;
            context.carrierError = 'border:1px solid red;';
        } else {
            ok = ok && true;
            context.carrierError = 'border:1px solid #cacaca;';
        }

        if (domesticPlan.data.unit == "" || domesticPlan.data.unit == null){
            ok = false;
            context.unitDomError = 'border:1px solid red;';
        } else {
            ok = ok && true;
            context.unitDomError = 'border:1px solid #cacaca;';
        }

        if (internationalPlan.data.unit == "" || internationalPlan.data.unit == null){
            ok = false;
            context.unitIntError = 'border:1px solid red;';
        } else {
            ok = ok && true;
            context.unitIntError = 'border:1px solid #cacaca;';
        }

        for (let addon of addons) {
            if (addon.description == "") { ok = false; }
            if (addon.cost == "") { ok = false; }
            if (addon.description == "" && addon.cost == "") { ok = true; }
        }

        if (ok) {
          context.error = "";
          let items = [];

          domesticPlan.minutes.domain = "domestic";
          domesticPlan.data.domain = "domestic";
          domesticPlan.sms.domain = "domestic";
          domesticPlan.minutes.category = "voice";
          domesticPlan.data.category = "data";
          domesticPlan.sms.category = "messaging";

          items.push(domesticPlan.minutes);
          items.push(domesticPlan.data);
          items.push(domesticPlan.sms);

          internationalPlan.minutes.domain = "international";
          internationalPlan.data.domain = "international";
          internationalPlan.sms.domain = "international";
          internationalPlan.minutes.category = "voice";
          internationalPlan.data.category = "data";
          internationalPlan.sms.category = "messaging";

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

        context.error = "Error, empty values. Please, check the inputs and complete it.";
        return false;
    },

    updateService(id, context, serviceDetails, domesticPlan, internationalPlan, addons) {

        let status = "";

        if (serviceDetails.status == true) {
            status = "Enabled"
        } else {
            status = "Disabled"
        }

        let service = new Service("services", id, status, serviceDetails.title, serviceDetails.code, serviceDetails.cost, serviceDetails.description, serviceDetails.carrierId)
        let plan = this.checkPlan(service, serviceDetails, domesticPlan, internationalPlan, addons, context);

        if (plan != false) {
            var serviceItems = service.itemJson(plan, service);
            console.log(service.toJSON());


            context.$http.patch(process.env.URL_API + '/services/' + id, {
                "data":service.toJSON()
            })
            .then((response) => {
                context.$router.push({name: 'services'});
                console.log(response);
            },
            (response) => {console.log(response);});
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
                context.addAddon = true;
            } else {
                context.addons[context.addons.length-1].add = true;
                context.addAddon = false;
            }
        }, (response) => {});
    },

    addService(context, serviceDetails, domesticPlan, internationalPlan, addons) {
        let status = "";
        if (serviceDetails.status == true) { status = "Enabled"; } else { status = "Disabled"; }

        let service = new Service("services", null, status, serviceDetails.title, serviceDetails.code, serviceDetails.cost, serviceDetails.description, serviceDetails.carrierId)
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
    }
}
