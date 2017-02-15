import Vue from 'vue';
import auth from './../auth.js';
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
            //context.packages.companies = event.companies;
            context.packages.conditions = event.conditions;
            context.packages.devicevariations = event.devicevariations;
            context.packages.services = event.services;
            this.getUdlsFromCompanies(context, context.packages.companyId);
            this.getDeviceVariationsFromPresets(context, context.packages.companyId);
            context.addOptionsToRetrievedConditions();
            context.reorderButtons();
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
            this.getDeviceVariationsFromPresets(context, companyId);
        },
        (response) => {});
    },
    // GET DEVICEVARIATIONS FROM THE CARRIERS RELATED TO THE COMPANY OF THE USER.
    getDeviceVariationsFromPresets(context, companyId) {

        let params = {
            params: {
                include: 'devicevariations,devicevariations.images,devicevariations.devices'
            }
        };

        params.params['filter[devicevariations.companyId]'] = companyId;

        context.$http.get(process.env.URL_API + '/presets', params).then((response) => {
            context.packages.presets = store.sync(response.data);

            let auxArray = [];
            for (let cpdv of context.packages.companies.devicevariations) {
                let ok = true;
                for (let pres of context.packages.presets) {
                    for (let dv of pres.devicevariations) {
                        if (cpdv.id == dv.id) {
                            ok = false;
                        }
                    }
                }
                if (ok) {
                    auxArray.push(dv);
                }
            }

            if(auxArray.length > 0){
                let defaultPreset = {
                    name: 'Default',
                    devicevariations: [],
                    companyId: companyId
                };
                context.packages.presets.push(defaultPreset);
            }

            context.retrieveTheNewDevicesSelectedList();
            this.loadContent(context);
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
    loadContent(context) {
        context.loadedContent = true;
    }
};
