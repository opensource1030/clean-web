import Vue from 'vue';
import packageid from './../../models/Packageid';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import { concatenateAttribute, deleteRepeated } from './../../components/filters.js';

var {Store} = require('yayson')();
var store = new Store();

export default {
  // GET USER INFORMATION.
  getUserInformation(context) {

    let params = { params: { } };

    context.$http.get(process.env.URL_API + '/users/2', params).then((response) => {
      event = store.sync(response.data);
      context.packages.companyId = event.companyId;
      // CONDITIONS
      this.getUdlsFromCompanies(context, context.packages.companyId);
      // PRESETS -> DEVICEVARIATIONS
      this.getPresets(context, context.packages.companyId, 1);
      // ĈARRIERS -> SERVICES
      this.getCarriers(context, context.packages.companyId, 1);
      // ADDRESS
      this.getAddressFromCompany(context, context.packages.companyId, 1);
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
      context.packages.companyId = event.companyId;

      context.packages.conditions = event.conditions;
      context.packages.devicevariations = event.devicevariations;
      context.packages.services = event.services;
      context.packages.addressSelected = event.address;
      //context.packages.apps = event.apps;

      context.retrieveTheValues(context.packages.names.devices, context.packages.devicevariations, 'price1');
      context.retrieveTheValues(context.packages.names.services, context.packages.services, 'cost');
      context.addOptionsToRetrievedConditions();
      this.updateTheUsersThatAccomplishesTheConditions(context);
      this.getUserInformation(context);
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
      context.packages.presets = context.addElementsToTheArray(event, context.packages.presets, context.packages.presetsController, context.$refs.swPreset.swiper);
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
      context.packages.carriers = context.addElementsToTheArray(event, context.packages.carriers, context.packages.carriersController, context.$refs.swCarrier.swiper);
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
      context.addElementsToTheArray(event, context.packages.services, context.packages.servicesController, context.$refs.swServicesList.swiper);
    },
    (response) => {});
  },
  // GET UDLS FROM THE COMPANY OF THE USER.
  getAddressFromCompany(context, companyId, pages) {

    let params = {
      params: {
        include: 'address',
        page: pages,
      }
    };

    context.$http.get(process.env.URL_API + '/companies/' + companyId, params).then((response) => {
      let event = store.sync(response.data);
      context.packages.addressList = event.address;
      let aux = [];

      if (context.packages.addressSelected.length > 0) {
        for (let eva of context.packages.addressList) {
          let ok = true;
          for (let addsel of context.packages.addressSelected) {
            if (eva.id == addsel.id) {
              ok = false;
            }
          }
          if (ok) {
            aux.push(eva);
          }
        }
        context.packages.address = aux;
      } else {
        context.packages.address = context.packages.addressList;
      }
    },
    (response) => {});
  },
  updateTheUsersThatAccomplishesTheConditions(context) {
    let conditions = this.prepareConditionsForSend(context.packages.conditions);

    context.$http.post(process.env.URL_API + '/packages/forUser', { "data": {"conditions": conditions, "companyId": context.packages.companyId}}).then((response) => {
      context.packages.values.usersConditions = response.body.number;
    }, (response) => {});
  },
  // CREATE packages.
  createThePackages(context) {
    let pack = this.prepareTheModel(context);

    context.$http.post(process.env.URL_API + '/packages', {"data": pack.toJSON()}).then((response) => {
      event = store.sync(response.data);
      context.$router.push({name: 'packages'});
    }, (response) => {});
  },
  // UPDATE packages
  updateThePackages(context) {
    let pack = this.prepareTheModel(context);

    context.$http.patch(process.env.URL_API + '/packages/' + context.packages.id, {"data": pack.toJSON()}).then((response) => {
      event = store.sync(response.data);
      context.$router.push({name: 'packages'});
    }, (response) => { });
  },
  // Prepare the Model
  prepareTheModel(context) {
    let conditions = this.prepareConditionsForSend(context.packages.conditions);
    let devicevariations = this.prepareIdsForSend(context.packages.devicevariations, 'devicevariations');
    let services = this.prepareIdsForSend(context.packages.services, 'services');
    let address = this.prepareIdsForSend(context.packages.addressSelected, 'address');

    return new packageid(
      context.packages.id,
      'packages',
      context.packages.name,
      context.packages.companyId,
      conditions,
      [], // apps
      devicevariations,
      services,
      address
    );
  },
  // PREPARE THE CONDITIONS FOR THE SEND REQUEST (deleting all the options that are not needed.)
  prepareConditionsForSend(conditions) {
    let conditionsFinal = [];
    if (conditions.length > 0) {
      for (let cond of conditions) {
        if (cond.nameCond != '' && cond.condition != '' && cond.value != '') {
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
    }
    return conditionsFinal;
  },
  // PREPARE THE IDS FOR THE SEND REQUEST.
  prepareIdsForSend(array, ty) {
    let arrayFinal = [];
    if (array.length > 0) {
      for (let a of array) {
        let aux = {
          id: a.id,
          type: ty
        };
        arrayFinal.push(aux);
      }
    }
    return arrayFinal;
  },
  loadContent(context) {
    context.loadedContent = true;
  }
};
