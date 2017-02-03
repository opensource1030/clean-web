import Vue from 'vue';
import auth from './../auth.js';
import Device from './../../models/Device'
import {filterByFilters} from './../../components/filters.js';
const {Store} = require('yayson')();
const store = new Store();

export default {
  /*-------------------------------update device-----------------*/
  carriersCheck : {
    data: []
  },
  companiesCheck : {
    data: []
  },
  modificationsCheck : {
    data: []
  },

  updateDevice(id, context, price, style, capacity, device, image) {
    let deviceObj = new Device('devices', id, parseInt(device.defaultPrice), device.name, device.description, device.type, 1, image.id, device.make, device.model, device.money);
    let check = this.checkDevice(deviceObj, style, capacity, price, context, id)
    if (check.staus == false) {
      context.message = "Error in field " + check.field;
      context.showModal = true;
    } else {

      context.$http.patch(process.env.URL_API + '/devices/' + id, {data: deviceObj.toJSON()}).then((response) => {

        context.$router.push({name: 'List Devices'});

      }, (response) => {
        context.message = "code error    " + response.status;
        context.showModal = true;
      });
    }

  },

  getDataDevice(context, id) {
    let params = {
      params: {
        include: 'modifications,devicevariations,devicevariations.companies,devicevariations.carriers,devicevariations.modifications,devicevariations.images,images'
      }
    };
    if (context.companyFilter !== "" || context.companyFilter != null) {
      params.params['filter[name][like]'] = context.companyFilter;
    }
    context.$http.get(process.env.URL_API + '/devices/' + id, params).then((response) => {

      event = store.sync(response.data);
      if (event.images != null && event.images.length > 0) {
        context.image.url = process.env.URL_API + '/images/' + event.images[0].id;
        context.image.id = event.images[0].id;
      } else {
        context.image.url = '/assets/img/logo.a521535.png';
      }

      context.id = id;

      context.d.name = event.name;
      context.d.description = event.properties;
      context.d.currency = event.currency;
      context.d.make = event.make;
      context.d.model = event.model;
      context.d.defaultPrice = event.defaultPrice;
      context.d.type = event.devicetypes[0].id;
      context.d.make = event.make;
      context.d.model = event.model;

      this.carrierCheck(context, filterByFilters(response.data.included, 'carriers'));
      context.carriers = this.carriersCheck;
      context.vCarriers = this.carriersCheck;
      this.companyCheck(context, filterByFilters(response.data.included, 'companies'));
      context.companies = this.companiesCheck;

      if (event.modifications != null && event.modifications.length > 0) {
        this.modificationCheck(context, event.modifications);
        context.modifications = this.modificationsCheck;
      }
      if (event.devicevariations != null && event.devicevariations.length > 0) {
        context.priceData = event.devicevariations;
      }
      context.checkcarrier();

    }, (response) => {});

  },

  carrierCheck(context, carriersD) {

    for (let carrier of this.carriersCheck.data) {

      carrier.check = false;
      //  console.log(carrier)
      for (let carrierData of carriersD) {
        if (carrier.id == carrierData.id) {
          carrier.check = true;

          break;
        }
      }

    }
  },

  companyCheck(context, companiesD) {

    for (let company of this.companiesCheck.data) {
      company.check = false;
      for (let companyData of companiesD) {
        if (company.id == companyData.id) {
          company.check = true;

          break;
        }
      }

    }

    context.companies = [];

  },

  modificationCheck(context, modificationsD) {

    for (let modification of this.modificationsCheck.data) {

      modification.check = false;
      for (let modificationData of modificationsD) {
        if (modification.id == modificationData.id) {

          modification.check = true;

          break;
        }
      }

    }

    context.modifications = [];

  },
  /*---------------------------------create device---------------------------------------*/

  getDevice(context, page) {

    let params = {
      params: {
        page: page,

        /*,filter[][like]:deviceType*/
      }
    };
    if (context.companyFilter !== "" || context.companyFilter != null) {
      params.params['filter[name][like]'] = context.companyFilter;
    }

    context.$http.get(process.env.URL_API + '/devicetypes', {

      params: {
        page: page
      }
    }).then((response) => {

      context.deviceType = response.data;

    }, (response) => {});

    context.$http.get(process.env.URL_API + '/modifications', {

      params: {
        page: page
      }
    }).then((response) => {
      for (let modification of response.data.data) {
        this.modificationsCheck.data.push(modification);
        modification.check = false;

      }

      context.modifications = response.data;

    }, (response) => {});

    context.$http.get(process.env.URL_API + '/carriers', {

      params: {
        page: page,
        'filter[active]': 1,
        include: 'images'
      }
    }).then((response) => {
      let event = store.sync(response.data);
      console.log(event);

      //process.env.URL_API

      for (let carrier of event) {

        this.carriersCheck.data.push(carrier);
        carrier.check = false;

      }

      context.carriers.data = event;
    }, (response) => {});

    context.$http.get(process.env.URL_API + '/companies', params).then((response) => {
      context.pagination = response.data.meta.pagination;
      for (let company of response.data.data) {

        this.companiesCheck.data.push(company);
        company.check = false;

      }

      context.companies = response.data;

    }, (response) => {});

  },

  addModifications(context, obj) {
    context.$http.post(process.env.URL_API + '/modifications', {

      data: {
        type: 'modifications',
        attributes: {
          modType: obj.type,
          value: obj.value
        }
      }
    }).then((response) => {
      this.getDevice(context);

    }, (response) => {});
  },
  checkDevice(device, style, capacity, price, context, id) {
    let check = true;
    if (device.name == "" || device.name == null) {
      check = false
      let error = {
        field: "Name",
        status: false
      }
      return error;
    }
    if (isNaN(device.defaultPrice) || device.defaultPrice == "" || device.defaultPrice == null || device.defaultPrice == 0) {

      check = false;
      let error = {
        field: "Price",
        status: false
      }
      return error;
    }

    if (device.properties == "" || device.properties == null) {

      check = false
      let error = {
        field: "Description",
        status: false
      }
      return error;
    }
    if (device.deviceTypeId == null) {
      check = false;
      let error = {
        field: "Device Type",
        status: false
      }
      return error;
    }
    if (device.imageId == 0) {
      context.message = "Error in field Image";
      check = false;
      let error = {
        field: "Image",
        status: false
      }
      return error;
    }
    if (device.imageId != 0) {
      device.imagesJson(device);
    }
    if (device.make == null || device.make == "") {
      check = false;
      let error = {
        field: "Manufactured",
        status: false
      }
      return error;
    }
    if (device.model == null || device.model == "") {

      check = false;
      let error = {
        field: "Model",
        status: false
      }
      return error;
    }
    if (check == true && style.length === 0 && capacity.length === 0) {

      let error = {
        field: "",
        status: true
      }
      return error;

    }
    if (price.length != 0 && check == true) {
      //  device.pricesUpdateJson(price,device);
      let c = true;
      for (let p of price) {
        if (p.style == null || p.capacity == null || p.carrierId == null || p.companyId == null || (p.priceRetail == 0 || isNaN(p.priceRetail)) || (p.price1 == 0 || isNaN(p.price1)) || (p.price2 == 0 || isNaN(p.price2)) || (p.priceOwn == 0 || isNaN(p.priceOwn))) {
          c = false;
          let error = {
            field: "Table Prices",
            status: false
          }
          return error;

        }
      }
      if (c == true) {
        device.modificationsJson(capacity, style, device);
        if (id == null) {
          device.pricesJson(price, device);
        } else {
          device.pricesUpdateJson(price, device)
        }
        let error = {
          field: "",
          status: true
        }
        return error;
      }
    }
    if (check == true && style.length != 0 && capacity.length == 0) {
      device.modificationsJson(capacity, style, device);
      let error = {
        field: "",
        status: true
      }
      return error;
    }
    if (check == true && style.length == 0 && capacity.length != 0) {
      device.modificationsJson(capacity, style, device);
      let error = {
        field: "",
        status: true
      }
      return error;
    }
    if (check == true && style.length != 0 && capacity.length != 0) {
      device.modificationsJson(capacity, style, device);
      let error = {
        field: "",
        status: true
      }
      return error;
    }

  },

  addDevice(context, price, style, capacity, device, image) {
    let deviceObj = new Device('devices', null, device.defaultPrice, device.name, device.description, device.type, 1, image.id, device.make, device.model, device.money);

    let check = this.checkDevice(deviceObj, style, capacity, price, context, null)
    if (check.status == false) {
      context.message = "Error in field " + check.field;
      context.showModal = true;
    } else {
      context.$http.post(process.env.URL_API + '/devices', {data: deviceObj.toJSON()}).then((response) => {

        context.$router.push({name: 'List Devices'});

      }, (response) => {
        context.message = response;
        context.showModal = true;

      });
    }

  },

  createImage(context, file) {
    context.$http.post(process.env.URL_API + '/images', file).then((response) => {
      context.image.url = 'http://' + response.data.data.links.self;
      context.image.id = response.data.data.id;

    }, (response) => {});

  },
  createImageVariation(context, file, index) {
    context.$http.post(process.env.URL_API + '/images', file).then((response) => {
      if (context.id == null) {
        context.price[index].imageVariations.url = 'http://' + response.data.data.links.self;
        context.price[index].imageVariations.id = response.data.data.id;
      } else {
        context.pricess[index].imageVariations.url = 'http://' + response.data.data.links.self;
        context.pricess[index].imageVariations.id = response.data.data.id;

      }
    }, (response) => {});

  }
}
