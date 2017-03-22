import Vue from 'vue';
import packageid from './../../models/Packageid';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import { concatenateAttribute, deleteRepeated } from './../../components/filters.js';

var {Store} = require('yayson')();
var store = new Store();

export default {
  agree: 0,
  // GET USER INFORMATION.
  getUserInformation(context) {

    this.getValuesForTheFirstTime(context);

    let params = { params: { } };

    context.$http.get(process.env.URL_API + '/users/2', params).then((response) => {
      event = store.sync(response.data);

      // CONDITIONS
      this.getUdlsFromCompanies(context);
      // PRESETS -> DEVICEVARIATIONS
      this.getPresets(context, 1);
      // ĈARRIERS -> SERVICES
      this.getCarriers(context, 1);
      // ADDRESS
      this.getAddressFromCompany(context, 1);
    },
    (response) => {
      if(response.status == 500) {
        //context.package.errors.textError = 'Internal Server Error, Please Contact the Administrator';
      }
      context.package.errors.generalError = true;
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
      context.package.id = id;
      context.package.name = event.name;
      context.package.type = event.type;
      context.package.companyId = event.companyId;

      // CONDITIONS
      context.conditions.selected = context.addOptionsToRetrievedConditions(event.conditions);
      context.reorderButtons();

      // DEVICEVARIATIONS
      context.devicevariations.selected = event.devicevariations;
      context.retrieveTheValues(context.devicevariations.names, context.devicevariations.selected, 'price1');

      // SERVICES
      context.services.selected = event.services;
      context.retrieveTheValues(context.services.names, context.services.selected, 'cost');

      // ADDRESS
      context.address.selected = event.address;

      this.getUserInformation(context);

    },
    (response) => {
      if(response.status == 500) {
        context.package.errors.text = 'Internal Server Error, Please Contact the Administrator';
      }
      context.package.errors.generalError = true;
    });
  },
  // GET UDLS FROM THE COMPANY OF THE USER.
  getUdlsFromCompanies(context) {

    let params = {
      params: {
        include: 'udls,devicevariations,devicevariations.images,devicevariations.devices'
      }
    };

    context.$http.get(process.env.URL_API + '/companies/' + context.package.companyId, params).then((response) => {
      context.company = store.sync(response.data);
      context.addConditionsOptions();
      this.loadContent(context, 1);
    },
    (response) => {});
  },
  // GET PRESETS RELATED TO THE COMPANY OF THE USER.
  getPresets(context, pages) {

    let params = {
      params: {
        page: pages,
      }
    };

    params.params['filter[devicevariations.companyId]'] = context.package.companyId;

    context.$http.get(process.env.URL_API + '/presets', params).then((response) => {
      let event = store.sync(response.data);
      context.presets.pagination = response.data.meta.pagination;
      context.presets.list = context.addElementsToTheArray(event, context.presets.list, context.presets.controller, context.$refs.swPresets.swiper);

      context.reloadArrows(context.presets.pagination, context.presets.controller, context.$refs.swPresets.swiper);
      this.loadContent(context, 2);
    },
    (response) => {});
  },
  // GET DEVICEVARIATIONS FROM THE PRESET SELECTED BY THE USER.
  getDeviceVariationsFromPresets(context, pages) {

    let params = {
      params: {
        include: 'devicevariations,devicevariations.images,devicevariations.devices'
      }
    };

    context.$http.get(process.env.URL_API + '/presets/' + context.presets.selected.id, params).then((response) => {
      let event = store.sync(response.data);
      context.devicevariations.list = event.devicevariations;
      context.devicevariations.filtered = context.deleteSelectedFromList(context.devicevariations.list, context.devicevariations.selected);
      context.reloadArrows(context.devicevariations.pagination, context.devicevariations.controller.filtered, context.$refs.swDevicevariationsFiltered.swiper);
      this.retrieveMoreTrue(context);
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
      context.carriers.pagination = response.data.meta.pagination;
      context.carriers.list = context.addElementsToTheArray(event, context.carriers.list, context.carriers.controller, context.$refs.swCarriers.swiper);
      context.reloadArrows(context.carriers.pagination, context.carriers.controller, context.$refs.swCarriers.swiper);
      this.loadContent(context, 3);
    },
    (response) => {});
  },
  // GET SERVICES FROM THE CARRIER SELECTED BY THE USER.
  getServicesFromCarriers(context, pages) {

    let params = {
      params: {
        include: 'serviceitems',
        page: pages,
      }
    };

    params.params['filter[carrierId]'] = context.carriers.selected.id;
    context.$http.get(process.env.URL_API + '/services', params).then((response) => {
      let event = store.sync(response.data);
      context.services.pagination.filtered = response.data.meta.pagination;
      context.services.list = context.addElementsToTheArray(event, context.services.list, context.services.controller.filtered, context.$refs.swServicesFiltered.swiper);
      context.services.filtered = context.deleteSelectedFromList(context.services.list, context.services.selected);
      context.reloadArrows(context.services.pagination, context.services.controller.filtered, context.$refs.swServicesFiltered.swiper);
      this.retrieveMoreTrue(context);
    },
    (response) => {});
  },
  // GET UDLS FROM THE COMPANY OF THE USER.
  getAddressFromCompany(context, pages) {

    let params = {
      params: {
        include: 'address',
        page: pages,
      }
    };

    context.$http.get(process.env.URL_API + '/companies/' + context.package.companyId, params).then((response) => {
      let event = store.sync(response.data);
      context.address.list = context.addElementsToTheArray(event.address, context.address.list, context.address.controller.filtered, context.$refs.swAddressFiltered.swiper);
      context.address.filtered = context.deleteSelectedFromList(context.address.list, context.address.selected);
      context.reloadArrows(context.address.pagination, context.address.controller.filtered, context.$refs.swAddressFiltered.swiper);
      this.loadContent(context, 4);
    },
    (response) => {});
  },
  updateTheUsersThatAccomplishesTheConditions(context) {
    let conditions = this.prepareConditionsForSend(context.conditions.selected);
    context.$http.post(process.env.URL_API + '/packages/forUser', { "data": {"conditions": conditions, "companyId": context.package.companyId}}).then((response) => {
      context.conditions.numberOfUsers = response.body.number;
      this.loadContent(context, 5);
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

    context.$http.patch(process.env.URL_API + '/packages/' + context.package.id, {"data": pack.toJSON()}).then((response) => {
      event = store.sync(response.data);
      context.$router.push({name: 'packages'});
    }, (response) => { });
  },
  // Prepare the Model
  prepareTheModel(context) {
    let conditions = this.prepareConditionsForSend(context.conditions.selected);
    let devicevariations = this.prepareIdsForSend(context.devicevariations.selected, 'devicevariations');
    let services = this.prepareIdsForSend(context.services.selected, 'services');
    let address = this.prepareIdsForSend(context.address.selected, 'address');

    return new packageid(
      context.package.id,
      'packages',
      context.package.name,
      context.package.companyId,
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
  getValuesForTheFirstTime(context) {
    let controllerVar = {
      goForwardBoolean: true,
      goBackBoolean: false,
      current_value: 1,
      option: 'forward',
    };

    let paginationVar = {
      count: 25,
      current_page: 1,
      per_page: 25,
      total: 1,
      total_pages: 1,
    };

    context.presets.controller = controllerVar;
    context.presets.pagination = paginationVar;
    context.devicevariations.controller.filtered = controllerVar;
    context.devicevariations.controller.selected = controllerVar;
    context.devicevariations.pagination.filtered = paginationVar;
    context.devicevariations.pagination.selected = paginationVar;
    context.carriers.controller = controllerVar;
    context.carriers.pagination = paginationVar;
    context.services.controller.filtered = controllerVar;
    context.services.controller.selected = controllerVar;
    context.services.pagination.filtered = paginationVar;
    context.services.pagination.selected = paginationVar;
    context.address.controller.filtered = controllerVar;
    context.address.controller.selected = controllerVar;
    context.address.pagination.filtered = paginationVar;
    context.address.pagination.selected = paginationVar;
/*
    let swiperVar = {
      prevButton:'.swiper-button-prev',
      nextButton:'.swiper-button-next',
      slidesPerView: 5,
      spaceBetween: 10,
      breakpoints: {
        1100: {
          slidesPerView: 4,
        },
        860: {
          slidesPerView: 3,
        },
        560: {
          slidesPerView: 2,
        },
        380: {
          slidesPerView: 1,
        }
      }
    };

    context.swiperOption.preset = swiperVar;
    context.swiperOption.preset.onReachEnd = this.goForwardPreset;
    context.swiperOption.preset.onReachBeginning = this.goBackPreset;
    context.swiperOption.preset.onSlideChangeStart = this.reloadArrowsForPresetsSwiper;

    context.swiperOption.devicevariationsFiltered = swiperVar;
    context.swiperOption.devicevariationsFiltered.onSlideChangeStart = this.reloadArrowsForDevicevariationsFilteredSwiper;

    context.swiperOption.devicevariationsSelected = swiperVar;
    context.swiperOption.devicevariationsSelected.onSlideChangeStart = this.reloadArrowsForDevicevariationsSelectedSwiper;

    context.swiperOption.carrier = swiperVar;
    context.swiperOption.carrier.onReachEnd = this.goForwardCarrier;
    context.swiperOption.carrier.onReachBeginning = this.goBackCarrier;
    context.swiperOption.carrier.onSlideChangeStart = this.reloadArrowsForCarriersSwiper;

    context.swiperOption.serviceFiltered = swiperVar;
    context.swiperOption.serviceFiltered.onReachEnd = this.goForwardService;
    context.swiperOption.serviceFiltered.onReachBeginning = this.goBackService;
    context.swiperOption.serviceFiltered.onSlideChangeStart = this.reloadArrowsForServicesFilteredSwiper;

    context.swiperOption.serviceSelected = swiperVar;
    context.swiperOption.serviceSelected.onSlideChangeStart = this.reloadArrowsForServicesSelectedSwiper;

    context.swiperOption.addressFiltered = swiperVar;
    context.swiperOption.addressFiltered.onReachEnd = this.goForwardAddress;
    context.swiperOption.addressFiltered.onReachBeginning = this.goBackAddress;
    context.swiperOption.addressFiltered.onSlideChangeStart = this.reloadArrowsForAddressFilteredSwiper;

    context.swiperOption.addressSelected = swiperVar;
    context.swiperOption.addressSelected.onSlideChangeStart = this.reloadArrowsForAddressSelectedSwiper;
*/
  },
  loadContent(context, value) {
    this.agree = this.agree + value;
    if (this.agree >= 15) {
      context.loadedContent = true;
      this.retrieveMoreTrue(context);
    }
  },
  retrieveMoreTrue(context) {
    context.retrieveMore = true;
  }
};
