import Vue from 'vue'
import Device from './../../models/Device'
import {filterByFilters} from './../../components/filters.js'
const {Store} = require('yayson')()
const store = new Store()


import $store from './../../store'


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
        $store.dispatch('error/addNew', {message: 'Error in field ' + check.field})
    } else {
      context.$http.patch(process.env.URL_API + '/devices/' + id, {data: deviceObj.toJSON()}).then((response) => {
        context.$router.push({name: 'List Devices'});
      }, (response) => {
          $store.dispatch('error/addNew', {message: 'code error ' + response.status})
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
    context.render=true;


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
        // console.log(event);

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

      if(context.id==null){
        context.render=true;
      }

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
      let error = { field: "", status: false };

      if (price.length != 0) {
          for (let p of price) {
              if (p.style == null || p.capacity == null || p.carrierId == null || p.companyId == null || (p.priceRetail == 0 || isNaN(p.priceRetail)) || (p.price1 == 0 || isNaN(p.price1)) || (p.price2 == 0 || isNaN(p.price2)) || (p.priceOwn == 0 || isNaN(p.priceOwn))) {
                  error.field = "Table Prices";
              }
          }
      }

      if (style.length === 0 || capacity.length === 0) {
          error.field = "Attributes";
      }

      if (device.properties == "" || device.properties == null) {
          error.field = "Tecnical Information";
      }

      if (device.model == null || device.model == "") {
          error.field = "Model";
      }

      if (device.make == null || device.make == "") {
          error.field = "Manufactured";
      }

      if (device.deviceTypeId == null) {
          error.field = "Device Type";
      }

      if (isNaN(device.defaultPrice) || device.defaultPrice == "" || device.defaultPrice == null || device.defaultPrice == 0) {
          error.field = "Default Price";
      }

      if (device.imageId == 0) {
          error.field = "Image";
      } else {
          device.imagesJson(device);
      }

      if (device.name == "" || device.name == null) {
          error.field = "Name";
      }

      if (error.field == "") {
          error.status = true;
          device.pricesJson(price, device);
          device.modificationsJson(capacity, style, device);
      }

      return error;
  },

  addDevice(context, price, style, capacity, device, image) {
    let deviceObj = new Device('devices', null, device.defaultPrice, device.name, device.description, device.type, 1, image.id, device.make, device.model, device.money);

    let check = this.checkDevice(deviceObj, style, capacity, price, context, null)
    if (check.status == false) {
        $store.dispatch('error/addNew', {message: 'Error in field ' + check.field})
    } else {
      context.$http.post(process.env.URL_API + '/devices', {data: deviceObj.toJSON()}).then((response) => {
        context.$router.push({name: 'List Devices'});
      }, (response) => {
          $store.dispatch('error/addNew', {message: 'code error ' + response.status})
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
