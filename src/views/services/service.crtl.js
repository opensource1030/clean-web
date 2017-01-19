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
            errorMessage: 'Error, empty values. Please, check the inputs and complete it.',
            errorAddon: '',
            noCarriers: false,
            noCarrierMessageError: 'Error, no enabled carriers provided. Please, create or enable a carrier first.',
            noCarrierSelected: false,
            carrierMessageError: 'Error, no carrier selected or it may be disabled. Please, select another one.',
            addAddon: true,
            errorsStyle : {
                titleError: 'border:1px solid #cacaca;',
                planCodeError: 'border:1px solid #cacaca;',
                costError: 'border:1px solid #cacaca;',
                carrierError: 'border:1px solid #cacaca;',
                unitDomError: 'border:1px solid #cacaca;',
                unitIntError: 'border:1px solid #cacaca;',
                currencyError: 'border:1px solid #cacaca;',
            },
            names: {
                managePlan: 'Manage Plan',
                planDetails: 'Plan Details',
                title: 'Title',
                titleMessage: 'Service Name',
                planCode: 'Plan Code',
                planCodeMessage: 'Service Code',
                cost: 'Cost',
                costMessage: 'Service Cost',
                description: 'Description',
                descriptionMessage: 'Service Descrition',
                carriers: 'Carriers',
                carriersMessage: 'Service Carriers',
                selectCarrierName: 'Select Carrier',
                domesticServices: 'Domestic Services',
                minutes: 'Minutes',
                data: 'Data',
                sms: 'SMS',
                description: 'Description',
                amount: 'Amount',
                name: 'Name',
                internationalServices: 'International Services',
                status: 'Status',
                statusMessage: 'Check this option to ENABLE the Service.',
                addons: 'Add-ons',
                addonsNameMessage: 'Add-ons Name',
                addonsCostMessage: 'Add-ons Price',
                saveChanges: 'Save Changes',
                deleteButton: 'Delete the selected Add-on.',
                addButton: 'Add another Add-on.',
                unit: {
                    tera: 'Tb',
                    giga: 'Gb',
                    mega: 'Mb'
                },
                currency: {
                    usd: 'USD',
                    eur: 'EUR',
                    gbp: 'GBP'
                }
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
                    addonNameError: 'border:1px solid #cacaca;',
                    addonPriceError: 'border:1px solid #cacaca;',
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
            this.addons[this.addons.length-1].add = false;
            this.addons[this.addons.length-1].delete = false;
        },
        deleteAddOns(index) {
            this.addons.splice(index, 1);
            if (this.addons.length == 0) {
                this.addons.push({id: this.id, description: '', cost: '', add: false, delete: false});
            } else {
                this.reorderButtons();
            }
        },
        updateAddon(i, e, type) {
            if (type == 'name'){
                var value = e.target.value;
                if (value == null || value == ''){
                    this.addons[i].addonNameError = 'border:1px solid red;';
                } else {
                    var addon = this.addons[i];
                    var extending = Object.assign({}, addon, {description: value});
                    Vue.set(this.addons, i, extending);
                    this.addons[i].addonNameError = 'border:1px solid #cacaca;';
                }
            }

            if (type == 'price'){
                var value = e.target.value;
                if (value == null || value == ''){
                    this.addons[i].addonPriceError = 'border:1px solid red;';
                } else {
                    var addon = this.addons[i];
                    var extending = Object.assign({}, addon, {cost: value});
                    Vue.set(this.addons, i, extending);
                    this.addons[i].addonPriceError = 'border:1px solid #cacaca;';
                }
            }

            if(this.addons[i].description != '' && this.addons[i].cost != '') {
                this.addons[i].add = true;
                this.addons[i].delete = true;
            }
        },
        reorderButtons () {
            for ( let add of this.addons) {
                add.add = false;
                add.delete = true;
            }
            this.addons[this.addons.length-1].add = true;
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
