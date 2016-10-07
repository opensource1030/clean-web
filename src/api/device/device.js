import {router} from 'vue-router'
import auth from './../auth.js'


export default {

    carriersCheck: {
        data: []
    },
    companiesCheck: {
        data: []
    },
    modificationsCheck: {
        data: []
    },


    getDataDevice(context, id){

        context.$http.get(process.env.URL_API + '/devices/' + id, {
            params: {include: 'modifications,carriers,companies,prices'}

        }).then((response) => {

                event = store.sync(response.data)

                console.log(event.prices);
                context.$set('priceData', event.prices)
                this.modificationCheck(context, event.modifications)
                this.carrierCheck(context, event.carriers)
                this.companyCheck(context, event.companies)
                context.$set('modifications', this.modificationsCheck);
                context.$set('companies', this.companiesCheck);
                context.$set('carriers', this.carriersCheck);


            },
            (response) => {

            });


    },
    carrierCheck(context, carriersD){

        var i = 0;
        for (let carrier of this.carriersCheck.data) {
            carrier.check = '';
            for (let carrierData of carriersD) {
                if (carrier.id == carrierData.id) {
                    carrier.check = 'checked';
                    context.changeStatusCarrier('active', i);
                    break;
                }
            }
            i++;
        }
        //   context.carriers=[];

    },
    companyCheck(context, companiesD){


        for (let company of this.companiesCheck.data) {
            company.check = '';
            for (let companyData of companiesD) {
                if (company.id == companyData.id) {
                    company.check = 'checked';

                    break;
                }
            }

        }
        context.companies = [];

    },
    modificationCheck(context, modificationsD){


        for (let modification of this.modificationsCheck.data) {
            modification.check = '';
            for (let modificationData of modificationsD) {
                if (modification.id == modificationData.id) {
                    modification.check = 'checked';

                    break;
                }
            }

        }
        context.modifications = [];

    },


    getDevice(context) {

        context.$http.get(process.env.URL_API + '/modifications', {

            params: {page: 1}

        }).then((response) => {


                for (let modification of response.data.data) {

                    this.modificationsCheck.data.push(modification);


                }
                context.$set('modifications', response.json());

            }, {
                // Attach the JWT header
                headers: auth.getAuthHeader()
            },

            (response) => {

            });
        context.$http.get(process.env.URL_API + '/carriers', {

            params: {page: 1, 'filter[active]': 1}

        }).then((response) => {


                for (let carrier of response.data.data) {

                    this.carriersCheck.data.push(carrier);


                }
                context.$set('carriers', response.json());
            },
            (response) => {
            });

        context.$http.get(process.env.URL_API + '/companies', {

            params: {'page[10]': 1, 'filter[active]': 1}

        }).then((response) => {

                for (let company of response.data.data) {

                    this.companiesCheck.data.push(company);


                }
                context.$set('companies', response.json());

            },

            {
                headers: auth.getAuthHeader()
            },

            (response) => {

            });
    },
    addModifications(context, obj) {
        context.$http.post(process.env.URL_API + '/modifications', {

            "data": {
                "type": "modifications",
                "attributes": {
                    "type": obj.type,
                    "value": obj.value
                }
            }
        })
            .then((response) => {
                this.getDevice(context)

            }, (response) => {
            });
    },

    addDevice(context, price, style, capacity, carriers, companies, device){

        context.$http.post(process.env.URL_API + '/devices', {

            "data": {
                "type": "devices",
                "attributes": {
                    "name": device.name,
                    "properties": device.description,
                    "deviceTypeId": 1,
                    "statusId": 1,
                    "identification": device.id
                },
                "relationships": {
                    "modifications": {
                        "data": this.modificationsJson(capacity, style)
                    },
                    "carriers": {
                        "data": this.carriersJson(carriers)
                    },
                    "companies": {
                        "data": this.companiesJson(companies)
                    },
                    "prices": {
                        "data": this.pricesJson(price)
                    }
                }
            }

        })
            .then((response) => {


                console.log(response.data);

            }, (response) => {
            });


    },
    modificationsJson(capacity, style){
        var modifications = [];
        var mData = []

        for (let c of capacity) {
            modifications.push(c)


        }
        for (let sty of style) {
            modifications.push(sty)
        }
        modifications.forEach(function (m, index) {
            mData[index] =
            {"type": "modifications", "id": m.id}


        });

        return mData;

    },

    carriersJson(carriers){
        var mData = []
        carriers.forEach(function (c, index) {
            mData[index] =
            {"type": "carriers", "id": c.id}

        });

        return mData;


    },
    companiesJson(companies){
        var mData = []
        companies.forEach(function (c, index) {
            mData[index] =
            {"type": "companies", "id": c.id}


        });
        return mData;


    },
    pricesJson(price){
        var mData = []
        price.forEach(function (p, index) {
            mData[index] =
            {
                "type": "prices",
                "capacityId": p.capacity.id,
                "styleId": p.style.id,
                "carrierId": p.carrier.id,
                "companyId": p.id,
                "priceRetail": p.retail,
                "price1": p.priceOne,
                "price2": p.priceTwo,
                "priceOwn": p.priceOwn
            }


        });

        return mData;


    }


}
