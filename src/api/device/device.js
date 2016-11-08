// import {
//   router
// } from 'vue-router'
import Vue from 'vue';
import auth from './../auth.js';

var {
  Store,
} = require('yayson')();
var store = new Store();

export default {
  /*-------------------------------update device-----------------*/
  carriersCheck: {
    data: [],
  },
  companiesCheck: {
    data: [],
  },
  modificationsCheck: {
    data: [],
  },

  updateDevice(id, context, price, style, capacity, carriers, companies, device, image) {
    context.$http.put(process.env.URL_API + '/devices/' + id, {

      data: {
        type: 'devices',
        attributes: {
          name: device.name,
          properties: device.description,
          deviceTypeId: device.type,
          statusId: 1,
          identification: device.id,
        },
        relationships: {
          modifications: {
            data: this.modificationsJson(capacity, style),
          },
          carriers: {
            data: this.carriersJson(carriers),
          },
          companies: {
            data: this.companiesJson(companies),
          },
          prices: {
            data: this.pricesUpdateJson(price),
          },
          images: {
            data: [{
              type: 'images',
              id: image.id,
            },
            ],
          },

        },
      },

    })
      .then((response) => {

        console.log(response.data);

      }, (response) => {
      });

  },

  getDataDevice(context, id) {

    context.$http.get(process.env.URL_API + '/devices/' + id, {
      params: {
        include: 'modifications,carriers,companies,prices,images',
      },

    }).then((response) => {

        event = store.sync(response.data);

        //context.image.url=process.env.URL_API+'/images/'+event.images[0].id;
        //  context.image.id=event.images[0].id;

        context.d.name = event.name;
        context.d.description = event.properties;
        context.d.id = event.identification;
        context.d.type = event.devicetypes[0].id;

        context.carriers = this.carriersCheck;
        context.priceData = event.prices;
        this.modificationCheck(context, event.modifications);
        this.carrierCheck(context, event.carriers);
        this.companyCheck(context, event.companies);
        context.modifications = this.modificationsCheck;

        context.companies = this.companiesCheck;
        context.vCompanies = this.companiesCheck;
        context.checkcarrier();

      },

      (response) => {

      });

  },

  carrierCheck(context, carriersD) {

    var i = 0;
    for (let carrier of this.carriersCheck.data) {

      carrier.check = false;

      for (let carrierData of carriersD) {
        if (carrier.id == carrierData.id) {

          carrier.check = true;

          break;
        }
      }

      i++;
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

    context.$http.get(process.env.URL_API + '/devicetypes', {

      params: {
        page: page,
      },

    }).then((response) => {

        context.deviceType = response.data;

      },

      (response) => {

      });

    context.$http.get(process.env.URL_API + '/modifications', {

      params: {
        page: page,
      },

    }).then((response) => {
        for (let modification of response.data.data) {
          this.modificationsCheck.data.push(modification);
          modification.check = false;

        }

        context.modifications = response.data;

      },

      (response) => {

      });

    context.$http.get(process.env.URL_API + '/carriers', {

      params: {
        page: page,
        'filter[active]': 1,
        include: 'images',
      },

    }).then((response) => {
        event = store.sync(response.data);
        console.log(event);

        //process.env.URL_API

        for (let carrier of event) {

          this.carriersCheck.data.push(carrier);
          carrier.check = false;

        }

        context.carriers.data = event;
      },

      (response) => {
      });

    context.$http.get(process.env.URL_API + '/companies', {

      params: {
        page: page,
        'filter[active]': 1,
      },

    }).then((response) => {
        context.pagination = response.data.meta.pagination;
        for (let company of response.data.data) {

          this.companiesCheck.data.push(company);
          company.check = false;

        }

        context.companies = response.data;

      },

      (response) => {

      });
  },

  addModifications(context, obj) {
    context.$http.post(process.env.URL_API + '/modifications', {

      data: {
        type: 'modifications',
        attributes: {
          modType: obj.type,
          value: obj.value,
        },
      },
    })
      .then((response) => {
        this.getDevice(context);

      }, (response) => {
      });
  },

  addDevice(context, price, style, capacity, carriers, companies, device, image) {

    context.$http.post(process.env.URL_API + '/devices', {

      data: {
        type: 'devices',
        attributes: {
          name: device.name,
          properties: device.description,
          deviceTypeId: device.type,
          statusId: 1,
          identification: device.id,
        },
        relationships: {
          modifications: {
            data: this.modificationsJson(capacity, style),
          },
          carriers: {
            data: this.carriersJson(carriers),
          },
          companies: {
            data: this.companiesJson(companies),
          },
          prices: {
            data: this.pricesJson(price),
          },
          images: {
            data: [{
              type: 'images',
              id: image.id,
            },
            ],
          },
        },
      },

    })
      .then((response) => {

        console.log(response.data);

      }, (response) => {
      });

  },

  modificationsJson(capacity, style) {
    var modifications = [];
    var mData = [];

    for (let c of capacity) {
      modifications.push(c);

    }

    for (let sty of style) {
      modifications.push(sty);
    }

    modifications.forEach(function (m, index) {
      mData[index] = {
        type: 'modifications',
        id: m.id,
      };

    });

    return mData;

  },

  carriersJson(carriers) {
    var mData = [];
    carriers.forEach(function (c, index) {
      mData[index] = {
        type: 'carriers',
        id: c.id,
      };

    });

    return mData;

  },

  companiesJson(companies) {
    var mData = [];
    companies.forEach(function (c, index) {
      mData[index] = {
        type: 'companies',
        id: c.id,
      };

    });

    return mData;

  },

  pricesJson(price) {
    var mData = [];
    price.forEach(function (p, index) {
      mData[index] = {
        type: 'prices',
        capacityId: p.capacity.id,
        styleId: p.style.id,
        carrierId: p.carrier.id,
        companyId: p.company.id,
        priceRetail: p.retail,
        price1: p.priceOne,
        price2: p.priceTwo,
        priceOwn: p.Own,
      };

    });

    return mData;

  },

  pricesUpdateJson(price) {
    var mData = [];
    price.forEach(function (p, index) {
      mData[index] = {
        type: 'prices',
        id: p.id,
        capacityId: p.capacity.id,
        styleId: p.style.id,
        carrierId: p.carrier.id,
        companyId: p.company.id,
        priceRetail: p.retail,
        price1: p.priceOne,
        price2: p.priceTwo,
        priceOwn: p.Own,
      };

    });

    return mData;

  },

  createImage(context, file) {
    context.$http.post(process.env.URL_API + '/images', file)

      .then((response) => {
        context.image.url = 'http://' + response.data.data.links.self;
        context.image.id = response.data.data.id;

      }, (response) => {
      });

  },

};
