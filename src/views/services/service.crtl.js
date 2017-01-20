import Vue from 'vue';
import service from './../../api/service/service';
import modal from './../../components/modal.vue';
import inputValidate from './../../components/inputValidate.vue'

export default {
    name : 'Service',
    components: {
        modal,
        inputValidate
    },
    beforeCreate() {
        service.getCarrier(this);
        this.id = this.$route.params.id;
        if (this.id != null) {
            service.getDataService(this, this.id);
        }
    },
    data() {
        return {
            id: null,
            error: false,
            errorMessage: 'Error, empty or invalid values. Please, check the inputs and complete it correctly.',
            errorAddon: '',
            noCarriers: false,
            noCarrierMessageError: 'Error, no enabled carriers provided. Please, create or enable a carrier first.',
            noCarrierSelected: false,
            carrierMessageError: 'Error, no carrier selected or it may be disabled. Please, select another one.',
            addAddon: true,
            errorsStyle : {
                titleError: false,
                planCodeError: false,
                costError: false,
                carrierError: false,
                unitDomError: false,
                unitIntError: false,
                currencyError: false,
            },
            names: {
                managePlan: 'Manage Plan',
                planDetails: 'Plan Details',
                title: 'Title',
                planCode: 'Plan Code',
                cost: 'Cost',
                currency: {
                    usd: 'USD',
                    eur: 'EUR',
                    gbp: 'GBP'
                },
                description: 'Description',       
                carriers: 'Carriers',
                selectCarrierName: 'Select Carrier',
                status: 'Status',
                domesticServices: 'Domestic Services',
                minutes: 'Minutes',
                amount: 'Amount',
                data: 'Data',
                unit: {
                    tera: 'Tb',
                    giga: 'Gb',
                    mega: 'Mb'
                },
                sms: 'SMS',
                internationalServices: 'International Services',
                addons: 'Add-ons',
                name: 'Name',
                titleMessage: 'Service Name',
                planCodeMessage: 'Service Code',
                costMessage: 'Service Cost',
                descriptionMessage: 'Service Descrition',
                carriersMessage: 'Service Carriers',
                statusMessage: 'Check this option to ENABLE the Service.',
                ammountMessage: 'Enter a valid number, the default value is 0',
                addonsNameMessage: 'Add-ons Name',
                addonsCostMessage: 'Add-ons Price',
                deleteButton: 'Delete the selected Add-on.',
                addButton: 'Add another Add-on.',
                saveChanges: 'Save Changes'
            },
            serviceDetails: {
                title: '',
                carrierId: null,
                status: '',
                code: '',
                cost: '',
                description: '',
                currency: ''
            },
            domesticPlan: {
                minutes: {
                    value: ''
                },
                data: {
                    value: '',
                    unit: '',
                },
                sms: {
                    value: ''
                }
            },
            internationalPlan: {
                minutes: {
                    value: ''
                },
                data: {
                    value: '',
                    unit: '',
                },
                sms: {
                    value: ''
                }
            },
            carriers: [],
            addons: [
                {
                    description: '',
                    cost: '',
                    add: true,
                    delete: false,
                    addonNameError: false,
                    addonPriceError: false,
                }
            ]
        }
    },
    methods : {
        save() {
            if (this.id != null) {
                service.updateService(this.id, this, this.serviceDetails, this.domesticPlan, this.internationalPlan, this.addons);
            } else {
                service.addService(this, this.serviceDetails, this.domesticPlan, this.internationalPlan, this.addons);
            }
        },
        hideAndPush(index) {
            if (this.id != null) {
                this.addons.push({id: "0", description: '', cost: '', add: true, delete: false});
            } else {
                this.addons.push({description: '', cost: '', add: true, delete: false});
            }

            this.reorderButtons();
        },
        deleteAddOns(index) {
            this.addons.splice(index, 1);
            if (this.addons.length == 0) {
                this.addons.push({id: this.id, description: '', cost: '', add: false, delete: false});
            }

            this.reorderButtons();
        },
        updateAddon(i, e, type) {
            if (type == 'name'){
                var value = e.target.value;
                if (value == null || value == ''){
                    this.addons[i].addonNameError = true;
                } else {
                    var addon = this.addons[i];
                    var extending = Object.assign({}, addon, {description: value});
                    Vue.set(this.addons, i, extending);
                    this.addons[i].addonNameError = false;
                }
            }

            if (type == 'price'){
                var value = e.target.value;
                if (value == null || value == ''){
                    this.addons[i].addonPriceError = true;
                } else {
                    var addon = this.addons[i];
                    var extending = Object.assign({}, addon, {cost: value});
                    Vue.set(this.addons, i, extending);
                    this.addons[i].addonPriceError = false;
                }
            }

            this.reorderButtons();
        },
        reorderButtons () {
            for (let add of this.addons) {
                add.add = false;
                add.delete = true;
            }

            if (this.addons[this.addons.length-1].description != '' && this.addons[this.addons.length-1].cost != '') {
                this.addons[this.addons.length-1].add = true;
            } else if (this.addons[this.addons.length-1].description == '' && this.addons[this.addons.length-1].cost == ''){
                this.addons[this.addons.length-1].delete = false;
            }
        },
        onSelectCarrier (id) {
            if(id >= 0) {
                this.noCarrierSelected = false;
            } else {
                this.noCarrierSelected = true;
            }
        }
    }
}
