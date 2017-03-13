import Vue from 'vue';
import packageid from './../../models/Packageid';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import { concatenateAttribute, deleteRepeated } from './../../components/filters.js';

var {Store} = require('yayson')();
var store = new Store();

export default {
  // GET USER INFORMATION.
  getUserInformation(context) {

    let params = {
      params: {

      }
    };

    context.$http.get(process.env.URL_API + '/users/2', params).then((response) => {

      event = store.sync(response.data);
      context.packages.companyId = event.companyId

      this.getUdlsFromCompanies(context, context.packages.companyId);
    },
    (response) => {
      if(response.status == 500) {
        //context.packages.names.errors.textError = 'Internal Server Error, Please Contact the Administrator';
      }
      context.errors.generalError = true;
    });
  },
  // GET packages INFORMATION.
  getDataPackages(context, id) {

    let params = {
      params: {
        include: 'conditions,services,apps,address,companies,companies.udls,devicevariations,devicevariations.carriers,devicevariations.companies,devicevariations.devices,devicevariations.modifications,devicevariations.images,services.serviceitems'
      }
    };

    context.$http.get(process.env.URL_API + '/packages/' + id, params).then((response) => {
      event = store.sync(response.data);
      context.packages.id = id;
      context.packages.name = event.name;
      context.packages.type = event.type;
      //context.packages.addressId = event.addressId;
      context.packages.companyId = event.companyId;
      //context.packages.apps = event.apps;
      context.packages.conditions = event.conditions;
      context.packages.devicevariations = event.devicevariations;
      context.retrieveTheValuesOfTheDevices();
      context.packages.services = event.services;
      this.getUdlsFromCompanies(context, context.packages.companyId);
      context.addOptionsToRetrievedConditions();
    },
    (response) => {
      if(response.status == 500) {
        //packages.names.errors.textError = 'Internal Server Error, Please Contact the Administrator';
      }
      context.errors.generalError = true;
    });
  },
  // GET UDLS FROM THE COMPANY OF THE USER.
  getUdlsFromCompanies(context, companyId) {

    let params = {
      params: {
        include: 'udls,devicevariations,devicevariations.images,devicevariations.devices'
      }
    };

    context.$http.get(process.env.URL_API + '/companies/' + companyId, params).then((response) => {
      context.packages.companies = store.sync(response.data);
      context.addConditionsOptions();
      this.getPresets(context, companyId, 1);
      this.getCarriers(context, companyId, 1);
    },
    (response) => {});
  },
  // GET PRESETS RELATED TO THE COMPANY OF THE USER.
  getPresets(context, companyId, pages) {
    let params = {
      params: {
        page: pages,
      }
    };

    params.params['filter[devicevariations.companyId]'] = companyId;

    context.$http.get(process.env.URL_API + '/presets', params).then((response) => {
      let event = store.sync(response.data);
      context.packages.presetsPagination = response.data.meta.pagination;
      context.addPresetsToTheArray(event);
      this.loadContent(context);
    },
    (response) => {});
  },
  // GET DEVICEVARIATIONS FROM THE PRESET SELECTED BY THE USER.
  getDeviceVariationsFromPresets(context, presetId) {

    let params = {
      params: {
        include: 'devicevariations,devicevariations.images,devicevariations.devices'
      }
    };

    context.$http.get(process.env.URL_API + '/presets/' + presetId, params).then((response) => {
      let event = store.sync(response.data);
      context.packages.presetSelected = event;
      context.devicevariationList();
    },
    (response) => {});
  },
  // GET CARRIERS RELATED TO THE COMPANY OF THE USER.
  getCarriers(context, pages) {
    let params = {
      params: {
        include: 'images',
        page: pages,
      }
    };

    context.$http.get(process.env.URL_API + '/carriers', params).then((response) => {
      let event = store.sync(response.data);
      context.packages.carriersPagination = response.data.meta.pagination;
      context.addCarriersToTheArray(event);
    },
    (response) => {});
  },
  // GET SERVICES FROM THE CARRIER SELECTED BY THE USER.
  getServicesFromCarriers(context, carrierId, pages) {

    let params = {
      params: {
        include: 'serviceitems',
        page: pages,
      }
    };

    params.params['filter[carrierId]'] = carrierId;

    context.$http.get(process.env.URL_API + '/services', params).then((response) => {
      let event = store.sync(response.data);
      context.packages.servicesPagination = response.data.meta.pagination;
      context.addServicesToTheArray(event);
    },
    (response) => {});
  },
  // CREATE packages.
  createThePackages(context) {

    let conditions = this.prepareConditionsForSend(context.packages.conditions);

    let pack = this.getTheModel(context.packages.id, context.packages.type, context.packages.name, 1,
            context.packages.companyId, conditions, [], [], []);

    context.$http.post(process.env.URL_API + '/packages', {"data": pack.toJSON()}).then((response) => {
      event = store.sync(response.data);
      //context.$router.push({name: 'packages'});
    }, (response) => {});
  },
  // UPDATE packages
  updateThePackages(context) {
    let conditions = this.prepareConditionsForSend(context.packages.conditions);

    let pack = this.getTheModel(context.packages.id, context.packages.type, context.packages.name, 1,
            context.packages.companyId, conditions, [], [], []);

    context.$http.patch(process.env.URL_API + '/packages/' + context.packages.id, {"data": pack.toJSON()}).then((response) => {
      event = store.sync(response.data);
            //context.$router.push({name: 'packages'});
          }, (response) => { });
  },
  // Prepare the Model
  getTheModel(id, type, name, addressId, companyId, conditions, apps, devicevariations, services) {
    return new packageid(
      id,
      type,
      name,
      addressId,
      companyId,
      conditions,
      apps,
      devicevariations,
      services
    );
  },
  // PREPARE THE CONDITIONS FOR THE SEND REQUEST (deleting all the options that are not needed.)
  prepareConditionsForSend(conditions) {
    let conditionsFinal = [];
    if(conditions[0].name != '') {
      for (let cond of conditions) {
        let aux = {
          id: cond.id,
          type: 'conditions',
          nameCond: cond.nameCond,
          condition: cond.condition,
          value: cond.value,
          inputType: cond.inputType
        };
        conditionsFinal.push(aux);
      }
    }

    return conditionsFinal;
  },
  loadContent(context) {
    context.loadedContent = true;
  }
};
