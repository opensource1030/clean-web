import Vue from 'vue';
import auth from './../auth.js';
import Packageid from './../../models/Packageid'

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
            context.package.companyId = event.companyId

            this.getUdlsFromCompanies(context, context.package.companyId);
        },
        (response) => {});
    },
    // GET PACKAGE INFORMATION.
    getDataPackage(context, id) {

        let params = {
            params: {
                include: 'conditions,services,apps,address,companies,companies.udls,devicevariations,devicevariations.carriers,devicevariations.companies,devicevariations.devices,devicevariations.modifications'
            }
        };

        context.$http.get(process.env.URL_API + '/packages/' + id, params).then((response) => {

            event = store.sync(response.data);

            context.package.id = id;
            context.package.name = event.name;
            context.package.type = event.type;
            //context.package.addressId = event.addressId;
            context.package.companyId = event.companyId;

            //context.package.apps = event.apps;
            //context.package.companies = event.companies;
            context.package.conditions = event.conditions;
            context.package.devicevariations = event.devicevariations;
            context.package.services = event.services;

            this.getUdlsFromCompanies(context, context.package.companyId);
            context.addOptionsToRetrievedConditions();
            context.reorderButtons();
        },
        (response) => {});
    },
    // GET UDLS FROM THE COMPANY OF THE USER.
    getUdlsFromCompanies(context, companyId) {

        let params = {
            params: {
                include: 'udls'
            }
        };

        context.$http.get(process.env.URL_API + '/companies/' + companyId, params).then((response) => {
            context.package.companies = store.sync(response.data);
            context.addConditionsOptions();
        },
        (response) => {});
    },    
    // CREATE PACKAGE.
    createThePackage(context) {

        let conditions = this.prepareConditionsForSend(context.package.conditions);

        let pack = new Packageid(
                context.package.id,
                context.package.type,
                context.package.name,
                1, // context.package.addressId,
                context.package.companyId,
                conditions,
                [], // context.package.apps,
                [], // context.package.devicevariations,
                [], // context.package.services
            );

        context.$http.post(process.env.URL_API + '/packages', {"data": pack.toJSON()}).then((response) => {
            event = store.sync(response.data);
        }, (response) => {});
    },
    // UPDATE PACKAGE
    updateThePackage(context) {
        let conditions = this.prepareConditionsForSend(context.package.conditions);

        let pack = new Packageid(
                context.package.id,
                context.package.type,
                context.package.name,
                1, //context.package.addressId,
                context.package.companyId,
                conditions,
                [], // context.package.apps,
                [], // context.package.devicevariations,
                [], // context.package.services
            );

        context.$http.patch(process.env.URL_API + '/packages/' + context.package.id, {"data": pack.toJSON()}).then((response) => {
            event = store.sync(response.data);
        }, (response) => {});
    },
    // PREPARE THE CONDITIONS FOR THE SEND REQUEST (deleting all the options that are not needed.)
    prepareConditionsForSend(conditions) {
        let conditionsFinal = [];
        if(conditions[0].name != '') {
            for (let cond of conditions) {
                let aux = {
                    id: cond.id,
                    type: 'conditions',
                    name: cond.name,
                    condition: cond.condition,
                    value: cond.value,
                    inputType: cond.inputType
                };
                conditionsFinal.push(aux);
            }
        }

        return conditionsFinal;
    }
};
