import Vue from 'vue';
import packaging from './../../api/packages/packageid';
import modal from './../../components/modal.vue';
import inputValidate from './../../components/inputValidate.vue';
//import vueSlider from 'vue-slider-component';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import { deleteRepeated } from './../../components/filters.js';

Vue.directive('f-accordion', {
    bind: function(el) {
        Vue.nextTick(function() {
            $(el).foundation();
        });
    }
});

export default {
    name : 'package',
    components: {
        modal,
        inputValidate,
        swiper,
        swiperSlide,
    },

    beforeCreate() {
        if (this.$route.params.id != null) {
            packaging.getDataPackages(this, this.$route.params.id);
        } else {
            packaging.getUserInformation(this);
        }
    },
    computed: {
        swiper() {
            if (this.$refs.mySwiperA) {
                return this.$refs.mySwiperA.swiper;
            }
        }
    },
    mounted() {
        // you can use current swiper object to do something(swiper methods)
        if (this.$refs.mySwiperA) {
            this.swiper.slideTo(3, 1000, false);
        }
    },
    methods : {
        deleteRepeated,
        // Function that changes the ConditionsOptions and ValuesOptions when the Name is changed.
        updatePackageCondition(index, value, type) {

            for (let aux of this.conditionsOptions) {
                if (aux.nameCond == value) {
                    this.packages.conditions[index].conditionsConditionsOptions = aux.conditions;
                    this.packages.conditions[index].condition = '';
                    this.packages.conditions[index].conditionsValuesOptions = aux.values;
                    this.packages.conditions[index].value = '';
                    this.packages.conditions[index].inputType = aux.inputType;
                    this.packages.conditions[index].nameError = false;
                }
            }

            if (type == 'condition' && value != '') {
                this.packages.conditions[index].conditionError = false;
            }

            if (type == 'value' && value != '') {
                this.packages.conditions[index].valueError = false;
            }

            this.reorderButtons();
        },
        // Function that adds another empty element to the packages.conditions list.
        pushCondition(index) {
            this.packages.conditions.push({id: "0", nameCond: '', value: '', condition: '', add: false, delete: false});
            this.reorderButtons();
        },
        // Function that deletes the selected element from the packages.conditions list.
        deleteCondition(index) {
            this.packages.conditions.splice(index, 1);
            if (this.packages.conditions.length == 0) {
                this.packages.conditions.push({id: "0", nameCond: '', value: '', condition: '', add: false, delete: false});
            }

            this.reorderButtons();
        },
        // Retrieve from the packages.companies.udls all the information and add it to the conditionsOptions.
        addConditionsOptions() {
            for (let udl of this.packages.companies.udls) {
                let vals = [];
                if (udl.sections > 0) {
                    for (let values of udl.sections) {
                        vals.push(values.nameCond);
                    }
                }

                this.conditionsFieldsOptions.push(udl.name);

                let condition = [];

                if (udl.inputType == 'boolean') {
                    condition = this.allConditionsForBoolean;
                    vals = ['Yes', 'No'];
                } else if (udl.inputType == 'number') {
                    condition = this.allConditionsForNumber;
                } else {
                    // STRING (default)
                    condition = this.allConditionsForString;
                }

                let aux = {
                    nameCond: udl.name,
                    conditions: condition,
                    values: vals,
                    inputType: udl.inputType
                }
                this.conditionsOptions.push(aux);
            }
        },
        // Check the packages.conditions array and add to each element the information needed.
        addOptionsToRetrievedConditions() {

            if (this.packages.conditions.length == 0) {
                this.packages.conditions.push({id: "0", nameCond: '', value: '', condition: '', add: false, delete: false});
            } else {
                for (let cond of this.packages.conditions) {
                    cond.id = cond.id;
                    cond.nameCond = cond.nameCond;
                    cond.condition = cond.condition;
                    cond.value = cond.value;
                    cond.type = 'conditions';
                    let aux = this.retrieveInformation(cond);
                    cond.inputType = aux.inputType;
                    cond.conditionsConditionsOptions = aux.conditions;
                    cond.conditionsValuesOptions = aux.values;
                    cond.add = false;
                    cond.delete = false;
                    cond.nameError = false;
                    cond.conditionError = false;
                    cond.valueError = false;
                }
            }
            this.reorderButtons();
        },
        // Retrieve all the information of the condition retrieved checking it from the conditionsOptions array.
        retrieveInformation(condition) {
            for (let opt of this.conditionsOptions) {
                if (condition.nameCond == opt.nameCond) {
                    return {
                        inputType : opt.inputType,
                        conditions: opt.conditions,
                        values: opt.values
                    }
                }
            }
            return {
                inputType : 'string',
                conditions: this.allConditions,
                values: []
            }
        },
        // Reorder the ADD and DELETE buttons in the array of packages.conditions.
        reorderButtons() {
            for (let cond of this.packages.conditions) {
                cond.add = false;
                cond.delete = true;
            }

            let aux = this.packages.conditions[this.packages.conditions.length-1];

            if (aux.nameCond != '' && aux.value != '' && aux.condition != '') {
                aux.add = true;
            } else if (aux.nameCond == '' && aux.value == '' && aux.condition == '') {
                aux.delete = false;
            }
        },
        // Submit all the changes.
        submit() {

            let submitOk = true;

            submitOk = submitOk && this.checkTitle();
            submitOk = submitOk && this.checkConditions();
            //submitOk = submitOk && this.checkServices();
            //submitOk = submitOk && this.checkAddress();

            if(submitOk) {
                this.errors.generalError = false;
                if (this.packages.id > 0) {
                    packaging.updateThePackages(this);
                } else {
                    packaging.createThePackages(this);
                }
            } else {
                this.errors.generalError = true;
            }
        },
        // Check if the title has content and returns error if not.
        checkTitle() {
            let submitOk = true;
            if (this.packages.name == '') {
                this.packages.nameError = true;
                submitOk = false;
            } else {
                this.packages.nameError = false;
            }
            return submitOk;
        },
        // Check if the conditions are not empty.
        checkConditions() {
            let submitOk = true;
            if(this.packages.conditions[0].nameCond != '') {
                for (let cond of this.packages.conditions) {
                    if (cond.nameCond == '') {
                        cond.nameError = true;
                        submitOk = false;
                    } else {
                        cond.nameError = false;
                    }

                    if (cond.condition == '') {
                        cond.conditionError = true;
                        submitOk = false;
                    } else {
                        cond.conditionError = false;
                    }

                    if (cond.value == '') {
                        cond.valueError = true;
                        submitOk = false;
                    } else {
                        cond.valueError = false;
                    }
                }
            }

            return submitOk;
        },
        getUrlOfImageSelected(object) {
            if (object.selected) {
                return 'http://a.rgbimg.com/cache1s6IGK/users/x/xy/xymonau/300/nrmoM6g.jpg';
            } else {
                return 'http://a.rgbimg.com/cache1s6IGX/users/x/xy/xymonau/300/nrmoNS6.jpg';
            }
        },
        getUrlOfImage(object) {
            if (object.images.length > 0 ) {
                for (let i of object.images) {
                    if (i.id > 0) {
                        return process.env.URL_API + '/images/' + i.id;
                    }
                }
            }

            return 'http://www.clker.com/cliparts/D/R/j/x/a/q/blank-page-md.png';
        },
        getNameIfNoImage(imageId, name) {
            if (imageId == 0) {
                return name;
            }
        },
        presetSelected(preset) {
            this.packages.variablesShow.presetSelected = true;
            this.packages.variablesShow.presetSelectedName = preset.name;
            for (let pres of this.packages.presets) {
                pres.selected = false;
            }
            preset.selected = true;
            this.devicevariationList();
        },
        carrierSelected(carrier) {
            this.packages.variablesShow.carrierSelected = true;
            this.packages.variablesShow.carrierSelectedName = carrier.presentation;
            for (let carr of this.packages.carriers) {
                carr.selected = false;
            }
            carrier.selected = true;
            this.servicesList();
        },
        devicevariationSelected(devvar, index) {
            this.packages.devicevariations.push(devvar);
            this.retrieveTheNewDevicesSelectedList();
            this.devicevariationList();
        },
        serviceSelected(service, index) {
            //this.packages.services.push(service);
            this.packages.service = service;
            this.packages.service.show = true;
            //this.retrieveTheNewServicesSelectedList();
            //this.servicesList();
        },
        devicevariationNoSelected(devvar, index) {
            this.packages.devicevariations.splice(index,1);
            this.retrieveTheNewDevicesSelectedList();
            this.devicevariationList();
        },
        retrieveTheNewDevicesSelectedList() {
            for (let dv of this.packages.devicevariations) {
                dv.preset = '';
                for (let pres of this.packages.presets) {
                    for (let dvsel of pres.devicevariations) {
                        if(dvsel.id == dv.id) {
                            dv.preset = dv.preset + pres.name + ', ';
                        }
                    }
                }
                dv.preset = dv.preset.substring(0, dv.preset.length-2);
            }

            if (this.packages.devicevariations.length > 1) {
                this.packages.devicevariations = deleteRepeated(this.packages.devicevariations, 'id', 'name', 'number', 'asc');
            }
            this.retrieveTheValuesOfTheDevices(this.packages.devicevariations);
        },
        retrieveTheNewServicesSelectedList() {
            for (let serv of this.packages.services) {
                serv.carrier = '';
                for (let carr of this.packages.carriers) {
                    for (let servsel of carr.services) {
                        if(servsel.id == serv.id) {
                            serv.carrier = serv.carrier + carr.presentation + ', ';
                        }
                    }
                }
                serv.carrier = serv.carrier.substring(0, serv.carrier.length-2);
            }

            if (this.packages.services.length > 1) {
                this.packages.services = deleteRepeated(this.packages.services, 'id', 'planCode', 'number', 'asc');
            }
            this.retrieveTheValuesOfTheDevices(this.packages.services);
        },
        devicevariationList(){
            this.packages.devicevariationsList = [];
            for (let pres of this.packages.presets) {
                if (pres.selected) {
                    for (let dv of pres.devicevariations) {
                        let ok = true;
                        for (let dvsel of this.packages.devicevariations) {
                            if (dv.id == dvsel.id) {
                                ok = false;
                            }
                        }
                        if(ok) {
                            this.packages.devicevariationsList.push(dv);
                        }
                    }
                }
            }
        },
        servicesList(){
            this.packages.servicesList = [];
            for (let carr of this.packages.carriers) {
                if (carr.selected) {
                    for (let serv of carr.services) {
                        let ok = true;
                        for (let servsel of this.packages.services) {
                            if (serv.id == servsel.id) {
                                ok = false;
                            }
                        }
                        if(ok) {
                            this.packages.servicesList.push(serv);
                        }
                    }
                }
            }
        },
        retrieveTheValuesOfTheDevices(devicevariations) {
            this.packages.names.devices.minPrice = 0;
            this.packages.names.devices.maxPrice = 0;

            for (let dv of devicevariations) {
                if(this.packages.names.devices.minPrice == 0 && this.packages.names.devices.maxPrice == 0) {
                    this.packages.names.devices.minPrice = dv.price1;
                    this.packages.names.devices.maxPrice = dv.price1;
                } else {
                    if(this.packages.names.devices.minPrice > dv.price1) {
                        this.packages.names.devices.minPrice = dv.price1;
                    }
                    if (this.packages.names.devices.maxPrice < dv.price1) {
                        this.packages.names.devices.maxPrice = dv.price1;
                    }
                }
            }
            // Variable that allows the goForward to retrieve more information.
            this.packages.retrieveMore = true;
        },
        showFalse() {
            this.show = false;
        },
        goBack() {
            console.log("BACK");
        },
        goForward() {
            this.packages.position++;
            console.log("FORWARD: " +
                this.packages.position + ' - ' +
                this.packages.position % 25 + ' - ' +
                Math.floor(this.packages.position / 25) + ' - ' +
                this.packages.retrieveMore
            );

            if(this.packages.position > this.packages.presets.length) {
                this.packages.position = this.packages.presets.length;
            }

            let page = Math.floor(this.packages.position / 25);

            if(this.packages.position % 25 == 0) {
                if(this.packages.retrieveMore) {
                    this.packages.retrieveMore = false;
                    packaging.getDeviceVariationsFromPresets(this, this.packages.companyId, page + 1);

                    if(page > 1) {
                        this.deleteTheFirstTwentyFiveOfPresets();
                    }
                }
            }
        },
        addMorePresetsToTheArray(presets) {
            //console.log(presets);
            if (this.packages.presets.length == 0) {
                this.packages.presets = presets;
            } else {
                for (let pre of presets) {
                    this.packages.presets.push(pre);
                }
            }
            console.log(this.packages.presets.length);
            this.retrieveTheNewDevicesSelectedList();
        },
        deleteTheFirstTwentyFiveOfPresets() {
            let i = 0;
            let j = this.packages.presets.length;
            console.log("FORWARD: " + i + ' - ' + j);
            let result = [];
            for (let pres of this.packages.presets) {
                if(i > 25) {
                    result.push(pres);
                }

                i++;
            }
        }
    },

    data() {
        return {
            loadedContent: false,
            packages: {
                id: 0,
                position: 5,
                retrieveMore: true,
                name: '',
                nameError: false,
                type: 'packages',
                addressId: 0,
                companyId: 0,
                values : {
                    usersConditions: 0,
                },
                variablesShow: {
                    presetSelected: false,
                    presetSelectedName: '',
                    carrierSelected: false,
                    carrierSelectedName: '',
                },
                names: {
                    managePackage: 'Manage Packages',
                    title: 'Title',
                    employees: 'Employees',
                    saveButton: 'Save Changes',
                    prices: {
                        minimum: 'Min:', // 'Min: 449.00 USD once - 28.10 USD monthly',
                        maximum: 'Max:', // 'Max: 649.00 USD once - 35.10 USD monthly'
                        once: 'once',
                        monthly: 'monthly',
                        currency: 'USD'
                    },
                    conditions: {
                        title: 'CONDITIONS',
                        nameCond: '',
                        condition: '',
                        value: '',
                        selectName: 'Select a Name',
                        selectCondition: 'Select a Condition',
                        selectValue: 'Select a Value',
                    },
                    services: {
                        title: 'SERVICES',
                        carriersAvailable: 'Carriers Available',
                        servicesAvailable: 'Services Available From ',
                        servicesSelected: 'Services Selected',
                        minPrice: '28.10',
                        maxPrice: '35.10',
                    },
                    devices:  {
                        title: 'DEVICES',
                        presetsAvailable: 'Presets Available',
                        devicesAvailable: 'Devices Available From ',
                        devicesSelected: 'Devices Selected',
                        minPrice: 0,
                        maxPrice: 0,
                    },
                    errors: {
                        textError: 'Some Fields need to be filled! Please, check the conditions!'
                    }
                },
                apps: [
                    {
                        id: 0,
                        description: '',
                        image: '',
                        type: 'apps'
                    }
                ],
                companies: [],
                conditions: [
                    {
                        id: 0,
                        type: 'conditions',
                        nameCond: '',
                        condition: '',
                        value: '',
                        typeCond: '',
                        inputType: '',
                        conditionsConditionsOptions: [],
                        conditionsValuesOptions: [],
                        add: false,
                        delete: false,
                        nameError: false,
                        conditionError: false,
                        valueError: false,
                    }
                ],
                carriers : [],
                presets: [],
                devicevariations:  [],
                devicevariationsList: [],
                servicesList: [],
                noinformation: [
                    {
                        url: 'http://b9225bd1cc045e8ddfee-28c20014b7dd8678b4fc08c3466d5dd7.r99.cf2.rackcdn.com/product-hugerect-8124-379-1439234303-4d13a7e2d925af99e752b40b4491454a.jpg',
                    }
                ],
                services: [
                    {
                        carrierId: 0,
                        carriers: [
                            {
                                active: 1,
                                id: 0,
                                locationId: 0,
                                name: '',
                                presentation: '',
                                shortName: '',
                                type: 'carriers'
                            }
                        ],
                        cost: 0,
                        description: '',
                        id: 0,
                        planCode: 0,
                        status: 'Enabled',
                        title: '',
                        type: 'services'
                    }
                ],
                service: [
                    {
                        show: false,
                        title: 'EXAMPLE TITLE',
                        planCode: 0,
                        cost: 0,
                        description: '',
                        currency: '',
                        serviceitems: [],
                    }
                ],
            },
            allConditions: ['contains', 'greater than', 'greater or equal', 'less than', 'less or equal', 'equal', 'not equal'],
            allConditionsForBoolean: ['equal'],
            allConditionsForString: ['contains', 'equal', 'not equal'],
            allConditionsForNumber: ['greater than', 'greater or equal', 'less than', 'less or equal', 'equal', 'not equal'],
            conditionsOptions : [
                {
                    nameCond: 'Supervisor?',
                    conditions: ['equal'],
                    values: ['Yes', 'No'],  //SELECT
                    inputType: 'boolean'
                },
                {
                    nameCond: 'Country',
                    conditions: ['contains', 'equal', 'not equal'],
                    values: ['Spain', 'Catalonia', 'EEUU', 'Canada', 'Germany', 'United Kingdom'],
                    inputType: 'string'
                },
                {
                    nameCond: 'State',
                    conditions: ['contains', 'equal', 'not equal'],
                    values: ['state1', 'state2', 'state3'],
                    inputType: 'string'
                },
                {
                    nameCond: 'City',
                    conditions: ['contains', 'equal', 'not equal'],
                    values: ['Barcelona', 'New York', 'Berlin', 'London'],
                    inputType: 'string'
                }
            ],
            conditionsFieldsOptions: ['Supervisor?', 'Country', 'State', 'City'],
            errors : {
                generalError : false,
            },
            swiperOption: {
                //notNextTick: true,
                //autoplay: 3000,
                //direction : 'vertical',
                //grabCursor : true,
                //setWrapperSize :true,
                //autoHeight: true,
                pagination : '.swiper-pagination',
                paginationClickable :true,
                prevButton:'.swiper-button-prev',
                nextButton:'.swiper-button-next',
                //scrollbar:'.swiper-scrollbar',
                //mousewheelControl : true,
                //observeParents:true,
                slidesPerView: 5,
                spaceBetween: 10,
                breakpoints: {
                    1024: {
                        slidesPerView: 5,
                        //spaceBetween: 10
                    },
                    768: {
                        slidesPerView: 5,
                        //spaceBetween: 10
                    },
                    640: {
                        slidesPerView: 2,
                        //spaceBetween: 10
                    },
                    320: {
                        slidesPerView: 1,
                        //spaceBetween: 10
                    }
                }
            }
        }
    }
}
