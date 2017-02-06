import Vue from 'vue';
import packaging from './../../api/package/package';
import modal from './../../components/modal.vue';
import inputValidate from './../../components/inputValidate.vue'

Vue.directive('f-accordion', {
    bind: function(el) {
        Vue.nextTick(function() {
            $(el).foundation();
        });
    }
});

export default {
    name : 'Package',
    components: {
        modal,
        inputValidate
    },
    beforeCreate() {
        if (this.$route.params.id != null) {
            packaging.getDataPackage(this, this.$route.params.id);
        } else {
            packaging.getUserInformation(this);
        }
    },
    methods : {
        updatePackageCondition(index, value, type) {

            for (let aux of this.conditionsOptions) {
                if (aux.label == value) {
                    this.package.conditions[index].conditionsConditionsOptions = aux.conditions;
                    this.package.conditions[index].conditionsValuesOptions = aux.values;
                    this.package.conditions[index].labelError = false;
                }
            }

            if (type == 'condition' && value != '') {
                this.package.conditions[index].conditionError = false;
            }

            if (type == 'value' && value != '') {
                this.package.conditions[index].valueError = false;
            }

            this.reorderButtons();
        },
        pushCondition(index) {
            this.package.conditions.push({id: "0", label: '', value: '', condition: '', add: false, delete: false});
            this.reorderButtons();
        },
        deleteCondition(index) {
            this.package.conditions.splice(index, 1);
            if (this.package.conditions.length == 0) {
                this.package.conditions.push({id: "0", label: '', value: '', condition: '', add: false, delete: false});
            }

            this.reorderButtons();
        },
        reorderButtons() {
            for (let cond of this.package.conditions) {
                cond.add = false;
                cond.delete = true;
            }

            let aux = this.package.conditions[this.package.conditions.length-1];

            if (aux.label != '' && aux.value != '' && aux.condition != '') {
                this.package.conditions[this.package.conditions.length-1].add = true;
            } else if (aux.label == '' && aux.value == '' && aux.condition == '') {
                this.package.conditions[this.package.conditions.length-1].delete = false;
            }
        },
        submit() {

            let submitOk = true;

            submitOk = submitOk && this.checkTitle();
            submitOk = submitOk && this.checkConditions();
            //submitOk = submitOk && this.checkServices();
            //submitOk = submitOk && this.checkDevices();
            //submitOk = submitOk && this.checkAddress();


            if(submitOk) {
                this.errors.generalError = false;
                if (this.package.id > 0) {
                    packaging.updateThePackage(this);
                } else {
                    packaging.createThePackage(this);
                }                
            } else {
                this.errors.generalError = true;
            }
        },
        checkTitle() {
            let submitOk = true;
            if (this.package.name == '') {
                this.package.nameError = true;
                submitOk = false;
            } else {
                this.package.nameError = false;
            }
            return submitOk;
        },
        checkConditions() {

            let submitOk = true;
            if(this.package.conditions[0].label != '') {
                for (let cond of this.package.conditions) {                
                    if (cond.label == '') {
                        cond.labelError = true;
                        submitOk = false;
                    } else {
                        cond.labelError = false;
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

        // This function allow to show/hide the different zones.
        showAndTell(type) {
            if (type == 'condition') {
                this.showZones.showConditions = !this.showZones.showConditions;
            }
            if (type == 'service') {
                this.showZones.showServices = !this.showZones.showServices;
            }
            if (type == 'device') {
                this.showZones.showDevices = !this.showZones.showDevices;
            }
            if (type == 'address') {
                this.showZones.showAddress = !this.showZones.showAddress;
            }
        }
    },

    data() {
        return {
            package: {
                id: 0,
                name: '',
                nameError: false,
                type: 'packages',
                addressId: 0,            
                companyId: 0,
                apps: [
                    {
                        id: 0,
                        description: '',
                        image: '',
                        type: 'apps'
                    }
                ],
                companies: [
                    {
                        active: 1,
                        assetPath: '',
                        currentBillMonth: '',
                        defaultLocation: '',
                        id: 0,
                        isCensus: null,
                        label: '',
                        name: '',
                        shortName: '',
                        type: 'companies',
                        udlPathRule: null,
                        udlpath: null,
                        udls: [
                            {
                                companyId: 0,
                                id: 0,
                                label: '',
                                legacyUdlField: null,
                                name: '',
                                sections: [
                                    {
                                        externalId: 0,
                                        id: 0,
                                        name: '',
                                        udlId: 0
                                    }
                                ]
                            }
                        ]
                    }
                ],
                conditions: [
                    {
                        id: 0,
                        type: 'conditions',
                        label: '',
                        condition: '',
                        value: '',
                        typeCond: '',
                        conditionsConditionsOptions: [],
                        conditionsValuesOptions: [],
                        add: false,
                        delete: false,
                        labelError: false,
                        conditionError: false,
                        valueError: false,
                    }
                ],
                devicevariations: [
                    {
                        carrierId: 0,
                        companyId: 0,
                        deviceId: 0,
                        id: 0,
                        price1: 0,
                        price2: 0,
                        priceOwn: 0,
                        priceRetail: 0,
                        type: "devicevariations",
                        devices: [
                            {
                                externalId: 0,
                                id: 0,
                                identification: 0,
                                make: null,
                                model: null,
                                name: '',
                                properties: '',
                                statusId: 0,
                                syncId: 0,
                                type: 'devices',
                            }
                        ],
                        modifications: [
                            {
                                id: 0,
                                modType: '',
                                type: 'modifications',
                                unit: '',
                                value: ''
                            }
                        ],
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
                        companies: [
                            {
                                active: 1,
                                assetPath: '',
                                currentBillMonth: '',
                                defaultLocation: '',
                                id: 0,
                                isCensus: null,
                                label: '',
                                name: '',
                                type: 'companies',
                                udlPathRule: null,
                                udlpath: null,
                                udls: [],
                            }
                        ]
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
            },
            allConditions: ['contains', 'greater than', 'greater or equal', 'less than', 'less or equal', 'equal', 'not equal'],
            conditionsOptions : [
                {
                    label: 'Supervisor?',
                    conditions: ['equal'],
                    values: ['Yes', 'No'],  //SELECT
                },
                {
                    label: 'Hierarchy',
                    conditions: ['contains', 'greater than', 'greater or equal', 'less than', 'less or equal', 'equal', 'not equal'],
                    values: [], // INPUT
                },
                {
                    label: 'Level',
                    conditions: ['greater than', 'greater or equal', 'less than', 'less or equal', 'equal', 'not equal'],
                    values: [1,2,3,4,5,6,7,8,9,10],
                },
                {
                    label: 'Country',
                    conditions: ['contains', 'equal', 'not equal'],
                    values: ['Spain', 'Catalonia', 'EEUU', 'Canada', 'Germany', 'United Kingdom'],
                },
                {
                    label: 'State',
                    conditions: ['contains', 'equal', 'not equal'],
                    values: ['state1', 'state2', 'state3'],
                },
                {
                    label: 'City',
                    conditions: ['contains', 'equal', 'not equal'],
                    values: ['Barcelona', 'New York', 'Berlin', 'London'],
                }
            ],
            conditionsFieldsOptions: ['Supervisor?', 'Hierarchy', 'Level', 'Country', 'State', 'City'],
            showZones: {
                showConditions: true,
                showServices: false,
                showDevices: false,
                showAddress: false,
            },
            errors : {
                generalError : false,
            }
        }
    }
}
