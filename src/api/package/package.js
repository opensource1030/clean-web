import Vue from 'vue';
import auth from './../auth.js';
import Package from './../../models/Package'

var {Store} = require('yayson')();
var store = new Store();

export default {

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

    getDataPackage(context, id) {

        context.package.id = id;

        let params = {
            params: {
                include: 'conditions,services,apps,address,companies,companies.udls,devicevariations,devicevariations.carriers,devicevariations.companies,devicevariations.devices,devicevariations.modifications'
            }
        };

        context.$http.get(process.env.URL_API + '/packages/' + id, params).then((response) => {

            event = store.sync(response.data);

            context.id = id;
            context.package.name = event.name;
            context.package.type = event.type;
            context.package.addressId = event.addressId;
            context.package.companyId = event.companyId;

            context.package.apps = event.apps;
            //context.package.companies = event.companies;
            context.package.conditions = event.conditions;
            context.reorderButtons();
            context.package.devicevariations = event.devicevariations;
            context.package.services = event.services;

            //console.log("CONTEXT.PACKAGE");
            //console.log(context.package);

            this.getUdlsFromCompanies(context, context.package.companyId);
        },
        (response) => {});
    },

    getUdlsFromCompanies(context, companyId) {

        let params = {
            params: {
                include: 'udls'
            }
        };

        context.$http.get(process.env.URL_API + '/companies/' + companyId, params).then((response) => {

            context.package.companies = store.sync(response.data);
            //console.log(context.package.companies);
            this.addConditionsOptions(context);
        },
        (response) => {});
    },    

    addConditionsOptions(context) {

        for (let udl of context.package.companies.udls) {

            let vals = []
            for (let values of udl.sections) {
                vals.push(values.name);
            }

            context.conditionsFieldsOptions.push(udl.label);

            let aux = {
                label: udl.label,
                conditions: context.allConditions,
                values: vals,
            }
            context.conditionsOptions.push(aux);
        }

        //console.log("CONTEXT.CONDITIONSOPTIONS");
        //console.log(context.conditionsOptions);
        //console.log(context.conditionsFieldsOptions);
        //console.log(context.package.conditions);
        
    },
    createThePackage(context) {

        let conditions = this.prepareConditionsForSend(context.package.conditions);

        let pack = new Package(
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

        context.$http.post(process.env.URL_API + '/packages', {"data": pack.toJSON()}).then((response) => {
            event = store.sync(response.data);
            //console.log(event);
        }, (response) => {});
    },
    updateThePackage(context) {
        //console.log("UPDATE");
    },
    prepareConditionsForSend(conditions) {
        let conditionsFinal = [];
        if(conditions[0].label != '') {
            for (let cond of conditions) {
                let aux = {
                    id: cond.id,
                    type: 'conditions',
                    name: cond.label,
                    condition: cond.condition,
                    value: cond.value,
                };
                conditionsFinal.push(aux);
            }
        }

        //console.log(conditionsFinal);
        return conditionsFinal;
    }
};
