import Vue from 'vue';
import auth from './../auth.js';
import Service from './../../models/Service';

var {Store} = require('yayson')();
var store = new Store();
import {findByService, findByAddons} from './../../components/filters.js';

export default {

  checkPlan(serviceDetails, domesticPlan, internationalPlan, addons, context) {

    if (domesticPlan.minutes.value != "" && domesticPlan.data.value != "" && domesticPlan.sms.value != "" && internationalPlan.minutes.value != "" && internationalPlan.data.value != "" && internationalPlan.sms.value != "") {
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
      items.push(internationalPlan.sms)

      for (let addon of addons) {
        if (addon.description != "" && addon.cost != "") {
          items.push(addon);
          console.log(addon.id)

        }

      }

      return items;

    }

    context.error = "Error Empty Values";

    return false;

  },

  updateService(id, context, serviceDetails, domesticPlan, internationalPlan, addons) {

    console.log(addons)

    let plan = this.checkPlan(serviceDetails, domesticPlan, internationalPlan, addons, context);

    console.log(plan)

    let status = "";

    if (serviceDetails.status == true) {
      status = "Enabled"
    } else {
      status = "Disabled"
    }

    let service = new Service("services", id, status, serviceDetails.title, serviceDetails.code, serviceDetails.cost, serviceDetails.description, serviceDetails.carrierId)

    if (plan != false) {

      service.itemUpdateJson(plan, service);

    context.$http.patch(process.env.URL_API + '/services/' + id, {

    "data":service.toJSON()


  })
    .then((response) => {
      context.$router.push({name: 'services'});



    }, (response) => {

    });

    }

  },

  getDataService(context, id) {

    context.$http.get(process.env.URL_API + '/services/' + id, {
      params: {
        include: 'serviceitems'
      }
    }).then((response) => {

      event = store.sync(response.data);
      console.log(event);
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
      //domestic service
      context.domesticPlan.minutes = findByService(event.serviceitems, "voice", "domestic");
      context.domesticPlan.data = findByService(event.serviceitems, "data", "domestic");
      context.domesticPlan.sms = findByService(event.serviceitems, "messaging", "domestic");
      //international service
      context.internationalPlan.minutes = findByService(event.serviceitems, "voice", "international");
      context.internationalPlan.data = findByService(event.serviceitems, "data", "international");
      context.internationalPlan.sms = findByService(event.serviceitems, "messaging", "international");

      //addons
      let addOns = []
      addOns = findByAddons(event.serviceitems, "addon", "")
      context.addons.splice(0, 1);
      for (let addOn of addOns) {

        addOn.delete = true;
        addOn.add = false;
        context.addons.push(addOn);

      }

      context.addons.push({id: 0, description: '', cost: '', add: true, delete: false});

    }, (response) => {});

  },

  addService(context, serviceDetails, domesticPlan, internationalPlan, addons) {
    let id = null;

    let status = "";

    if (serviceDetails.status == true) {
      status = "Enabled"
    } else {
      status = "Disabled"
    }
    let service = new Service("services", id, status, serviceDetails.title, serviceDetails.code, serviceDetails.cost, serviceDetails.description, serviceDetails.carrierId)

    let items = this.checkPlan(serviceDetails, domesticPlan, internationalPlan, addons, context);

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

      //process.env.URL_API

      /*    for (let carrier of event) {

        this.carriersCheck.data.push(carrier);
        carrier.check = false;

      }*/

      context.carriers = event;
    }, (response) => {});

  }
}
