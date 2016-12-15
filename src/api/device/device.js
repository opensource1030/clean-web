
import Vue from 'vue';
import auth from './../auth.js';
import Device from './../../models/Device'

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

      let deviceObj = new Device('devices',id, device.id, device.name, device.description, device.type, 1, image.id);
    if(capacity.length===0 && style.length===0 && carrriers.length===0 && companies.length===0 && price.length===0){
      context.showModal=true;
    }else{
      deviceObj.modificationsJson(capacity,style,deviceObj);
      deviceObj.carriersJson(carriers,deviceObj);
      deviceObj.companiesJson(companies,deviceObj);
      deviceObj.pricesJson(price,deviceObj);
}



    context.$http.patch(process.env.URL_API + '/devices/' + id, {

      data: deviceObj.toJSON()


    })
      .then((response) => {

        context.$router.push({name: 'devices'});

      }, (response) => {

        context.showModal=true;
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


  let deviceObj = new Device('devices',null,device.id, device.name, device.description, device.type, 1, image.id);
    if(capacity.length===0 && style.length===0 && carriers.length===0 && companies.length===0 && price.length===0){
      context.showModal=true;
    }else{
    deviceObj.modificationsJson(capacity,style,deviceObj);
    deviceObj.carriersJson(carriers,deviceObj);
    deviceObj.companiesJson(companies,deviceObj);
    deviceObj.pricesUpdateJson(price,deviceObj);
  }

    context.$http.post(process.env.URL_API + '/devices', {

      data: deviceObj.toJSON()

    })
      .then((response) => {

          context.$router.push({name: 'devices'});

      }, (response) => {
          context.showModal=true;

      });

  },

  createImage(context, file) {
    context.$http.post(process.env.URL_API + '/images', file)

      .then((response) => {
        context.image.url = 'http://' + response.data.data.links.self;
        context.image.id = response.data.data.id;

      }, (response) => {
      });

  },
  filterCompanies(context,page,companyName){
    context.$http.get(process.env.URL_API + '/companies', {

      params: {
        page: page,
        'filter[name][like]': companyName
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


  }

};
