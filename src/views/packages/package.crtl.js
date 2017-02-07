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
        // Function that changes the ConditionsOptions and ValuesOptions when the Name is changed.
        updatePackageCondition(index, value, type) {

            for (let aux of this.conditionsOptions) {
                if (aux.name == value) {
                    this.package.conditions[index].conditionsConditionsOptions = aux.conditions;
                    this.package.conditions[index].condition = '';
                    this.package.conditions[index].conditionsValuesOptions = aux.values;
                    this.package.conditions[index].value = '';
                    this.package.conditions[index].inputType = aux.inputType;
                    this.package.conditions[index].nameError = false;
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
        // Function that adds another empty element to the package.conditions list.
        pushCondition(index) {
            this.package.conditions.push({id: "0", name: '', value: '', condition: '', add: false, delete: false});
            this.reorderButtons();
        },
        // Function that deletes the selected element from the package.conditions list.
        deleteCondition(index) {
            this.package.conditions.splice(index, 1);
            if (this.package.conditions.length == 0) {
                this.package.conditions.push({id: "0", name: '', value: '', condition: '', add: false, delete: false});
            }

            this.reorderButtons();
        },
        // Retrieve from the package.companies.udls all the information and add it to the conditionsOptions.
        addConditionsOptions() {
            for (let udl of this.package.companies.udls) {
                console.log(udl.inputType);

                let vals = [];
                if (udl.sections > 0) {
                    for (let values of udl.sections) {
                        vals.push(values.name);
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
                    name: udl.name,
                    conditions: condition,
                    values: vals,
                    inputType: udl.inputType
                }
                this.conditionsOptions.push(aux);
            }
        },
        // Check the package.conditions array and add to each element the information needed.
        addOptionsToRetrievedConditions() {

            if (this.package.conditions.length == 0) {
                this.package.conditions.push({id: "0", name: '', value: '', condition: '', add: false, delete: false});
            } else {
                for (let cond of this.package.conditions) {
                    cond.id = cond.id;
                    cond.name = cond.name;
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
        },
        // Retrieve all the information of the condition retrieved checking it from the conditionsOptions array.
        retrieveInformation(condition) {
            for (let opt of this.conditionsOptions) {
                if (condition.name == opt.name) {
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
        // Reorder the ADD and DELETE buttons in the array of package.conditions.
        reorderButtons() {
            for (let cond of this.package.conditions) {
                cond.add = false;
                cond.delete = true;
            }
            
            let aux = this.package.conditions[this.package.conditions.length-1];

            if (aux.name != '' && aux.value != '' && aux.condition != '') {
                aux.add = true;
            } else if (aux.name == '' && aux.value == '' && aux.condition == '') {
                aux.delete = false;
            }
        },
        // Submit all the changes.
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
        // Check if the title has content and returns error if not.
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
        // Check if the conditions are not empty.
        checkConditions() {

            let submitOk = true;
            if(this.package.conditions[0].name != '') {
                for (let cond of this.package.conditions) {                
                    if (cond.name == '') {
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
                values : {
                    usersConditions: 0,
                },
                names: {
                    managePackage: 'Manage Package',
                    title: 'Title',
                    employees: 'Employees',
                    saveButton: 'Save Changes',
                    packagePrices: {
                        minimum: 'Min: 449.00 USD once - 28.10 USD monthly',
                        maximum: 'Max: 649.00 USD once - 35.10 USD monthly'
                    },
                    conditions: {
                        title: 'CONDITIONS',
                        name: 'Name (select a Name first)',
                        condition: 'Condition',
                        value: 'Value',
                        selectName: 'Select a Name',
                        selectCondition: 'Select a Condition',
                        selectValue: 'Select a Value',
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
                        name: '',
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
            allConditionsForBoolean: ['equal'],
            allConditionsForString: ['contains', 'equal', 'not equal'],
            allConditionsForNumber: ['greater than', 'greater or equal', 'less than', 'less or equal', 'equal', 'not equal'],
            conditionsOptions : [
                {
                    name: 'Supervisor?',
                    conditions: ['equal'],
                    values: ['Yes', 'No'],  //SELECT
                    inputType: 'boolean'
                },
                {
                    name: 'Hierarchy',
                    conditions: ['contains', 'greater than', 'greater or equal', 'less than', 'less or equal', 'equal', 'not equal'],
                    values: [], // INPUT
                    inputType: 'string'
                },
                {
                    name: 'Level',
                    conditions: ['greater than', 'greater or equal', 'less than', 'less or equal', 'equal', 'not equal'],
                    values: [],
                    inputType: 'number'
                },
                {
                    name: 'Country',
                    conditions: ['contains', 'equal', 'not equal'],
                    values: ['Spain', 'Catalonia', 'EEUU', 'Canada', 'Germany', 'United Kingdom'],
                    inputType: 'string'
                },
                {
                    name: 'State',
                    conditions: ['contains', 'equal', 'not equal'],
                    values: ['state1', 'state2', 'state3'],
                    inputType: 'string'
                },
                {
                    name: 'City',
                    conditions: ['contains', 'equal', 'not equal'],
                    values: ['Barcelona', 'New York', 'Berlin', 'London'],
                    inputType: 'string'
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
