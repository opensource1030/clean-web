import Vue from 'vue';
import auth from './../auth.js';
import packageid from './../../models/Packageid';
import { swiper, swiperSlide } from 'vue-awesome-swiper';

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
                include: 'conditions,services,apps,address,companies,companies.udls,devicevariations,devicevariations.carriers,devicevariations.companies,devicevariations.devices,devicevariations.modifications'
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
            //context.packages.companies = event.companies;
            context.packages.conditions = event.conditions;
            context.packages.devicevariations = event.devicevariations;
            context.packages.services = event.services;

            this.getUdlsFromCompanies(context, context.packages.companyId);
            this.getDeviceVariationsFromCarriers(context, context.packages.companyId);
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
            context.packages.companies = store.sync(response.data);
            context.addConditionsOptions();
        },
        (response) => {});
    },
    // GET DEVICEVARIATIONS FROM THE CARRIERS RELATED TO THE COMPANY OF THE USER.
    getDeviceVariationsFromCarriers(context, companyId) {

        let params = {
            params: {
                include: 'devicevariations'
            }
        };

        params.params['filter[devicevariations.companyId]'] = companyId;

        context.$http.get(process.env.URL_API + '/carriers', params).then((response) => {
            event = store.sync(response.data);
            console.log(event);
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
        }, (response) => {});
    },
    // UPDATE packages
    updateThePackages(context) {
        let conditions = this.prepareConditionsForSend(context.packages.conditions);

        let pack = this.getTheModel(context.packages.id, context.packages.type, context.packages.name, 1, 
            context.packages.companyId, conditions, [], [], []);

        context.$http.patch(process.env.URL_API + '/packages/' + context.packages.id, {"data": pack.toJSON()}).then((response) => {
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