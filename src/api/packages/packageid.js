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
    (response) => {});
  },
  // GET packages INFORMATION.
  getDataPackages(context, id) {

    let params = {
      params: {
        include: 'conditions,services,apps,address,companies,companies.udls,devicevariations,devicevariations.carriers,devicevariations.companies,devicevariations.devices,devicevariations.modifications,devicevariations.images'
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
            context.packages.services = event.services;
            this.getUdlsFromCompanies(context, context.packages.companyId);
            this.getDeviceVariationsFromPresets(context, context.packages.companyId);
            context.addOptionsToRetrievedConditions();
          },
          (response) => {});
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
      this.getCarriersFromAnywhere(context, companyId);
    },
    (response) => {});
  },
  // GET DEVICEVARIATIONS FROM THE CARRIERS RELATED TO THE COMPANY OF THE USER.
  getPresets(context, companyId, pages) {
    let params = {
      params: {
        //include: 'devicevariations,devicevariations.images,devicevariations.devices',
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
  // GET DEVICEVARIATIONS FROM THE CARRIERS RELATED TO THE COMPANY OF THE USER.
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
  getCarriersFromAnywhere(context, companyId) {

    let service1Verizon = {
      id: 1,
      status: 'Enabled',
      title: 'Pooled Domestic Voice Plan',
      planCode: '55555',
      cost: '70',
      description: '',
      currency: 'USD',
      carrierId: 1,
      serviceitems: this.getRandomServiceItems(1),
    };

    let service2Verizon = {
      id: 2,
      status: 'Enabled',
      title: 'Another Magnific Service',
      planCode: '55333',
      cost: '80',
      description: '',
      currency: 'USD',
      carrierId: 1,
      serviceitems: this.getRandomServiceItems(1),
    };

    let service3Verizon = {
      id: 3,
      status: 'Enabled',
      title: 'Domestic Plan Service',
      planCode: '33555',
      cost: '110',
      description: '',
      currency: 'USD',
      carrierId: 1,
      serviceitems: this.getRandomServiceItems(1),
    };

    let image1Verizon = {
      id: 5,
      originalName: 'verizon.jpg',
      filename: 'phpiicQ3z',
      mimeType: 'image/jpeg',
      extension: 'jpg',
      size: 5099,
      url: 'phpiicQ3z.jpg',
    }

    let carrierVerizon = {
      id: 1,
      name: 'verizon',
      presentation: 'Verizon',
      active: 1,
      locationId: 236,
      shortName: 'Ver',
      images: [image1Verizon],
      services: [service1Verizon, service2Verizon, service3Verizon]
    }

    context.packages.carriers = [carrierVerizon];
  },
  getRandomServiceItems(idService) {

    let arrayServiceItems = []

    let serviceitems1service = {
      serviceId: idService,
      category: 'voice',
      description: '',
      value: Math.floor((Math.random() * 200) + 1),
      unit: 'minutes',
      cost: Math.floor((Math.random() * 10) + 1),
      domain: 'domestic',
    }

    arrayServiceItems.push(serviceitems1service);

    let serviceitems2service = {
      serviceId: idService,
      category: 'data',
      description: '',
      value: Math.floor((Math.random() * 200) + 1),
      unit: 'Gb',
      cost: Math.floor((Math.random() * 10) + 1),
      domain: 'domestic',
    }

    arrayServiceItems.push(serviceitems2service);

    let serviceitems3service = {
      serviceId: idService,
      category: 'messaging',
      description: '',
      value: Math.floor((Math.random() * 200) + 1),
      unit: 'messages',
      cost: Math.floor((Math.random() * 10) + 1),
      domain: 'domestic',
    }

    arrayServiceItems.push(serviceitems3service);

    let serviceitems4service = {
      serviceId: idService,
      category: 'voice',
      description: '',
      value: Math.floor((Math.random() * 200) + 1),
      unit: 'minutes',
      cost: Math.floor((Math.random() * 10) + 1),
      domain: 'international',
    }

    arrayServiceItems.push(serviceitems4service);

    let serviceitems5service = {
      serviceId: idService,
      category: 'data',
      description: '',
      value: Math.floor((Math.random() * 200) + 1),
      unit: 'Gb',
      cost: Math.floor((Math.random() * 10) + 1),
      domain: 'international',
    }

    arrayServiceItems.push(serviceitems5service);

    let serviceitems6service = {
      serviceId: idService,
      category: 'messaging',
      description: '',
      value: Math.floor((Math.random() * 200) + 1),
      unit: 'messages',
      cost: Math.floor((Math.random() * 10) + 1),
      domain: 'international',
    }

    arrayServiceItems.push(serviceitems6service);

    return arrayServiceItems;
  },
  loadContent(context) {
    context.loadedContent = true;
  }
};
