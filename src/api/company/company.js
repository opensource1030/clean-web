
import Vue from 'vue';
import Company from './../../models/Company'

var {
  Store,
} = require('yayson')();
var store = new Store();

export default {
  updateCompany(id, context, customFields, company) {
    debugger;
    let companyObj = new Company('companies', company.id, company.name, company.label, company.active, company.isCensus, company.logo);
    companyObj.customFieldsJson(customFields, companyObj);

    context.$http.patch(process.env.URL_API + '/companies/' + id, {
      data: companyObj.toJSON()
    }).then((response) => {
      
    }, (response) => {
    });
  },

  getDataCompany(context, id) {
    context.$http.get(process.env.URL_API + '/companies/' + id, {
      params: {
        include: 'customFields',
      },
    }).then((response) => {
      event = store.sync(response.data);

      context.d.id = event.id;
      context.d.name = event.name;
      context.d.label = event.label;
      context.d.active = event.active;
      context.d.isCensus = event.isCensus;
      context.d.logo = event.logo;

      context.customFields = event.customFields;
    }, (response) => {
    });
  },

  addCompany(context, company) {
    let companyObj = new Company('companies', company.id, company.name, company.label, company.active, company.isCensus, company.logo);
    context.$http.post(process.env.URL_API + '/companies', {
      data: companyObj.toJSON()
    })
    .then((response) => {
    }, (response) => {
    });
  },

  // getCompany(context, companyId) {
  //   context.$http.get(process.env.URL_API + '/companies/' + companyId + '/custom_fields', {
  //     params: {
  //     },
  //   }).then((response) => {
  //     context.customFields = response.data;
  //   },
  //   (response) => {
  //   });
  // },

  // addCustomFields(context, companyId, obj) {
  //   context.$http.post(process.env.URL_API + '/companies/' + companyId + '/custom_fields', {
  //     data: {
  //       type: 'custom_fields',
  //       attributes: {
  //         label: obj.label,
  //         value: obj.value,
  //       },
  //     },
  //   })
  //     .then((response) => {
  //       this.getCompany(context, companyId);
  //     }, (response) => {
  //       context.customFields.push({
  //         label: obj.label,
  //         value: obj.value,
  //       });
  //     });
  // },
};
