import Vue from 'vue';
//import service from './../../api/service/service';
import modal from './../../components/modal.vue';
import inputValidate from './../../components/inputValidate.vue'
import {findServiceItem, findByAddons, orderFilters} from './../../components/filters.js';
import {mapGetters, mapActions} from 'vuex'
export default {

    components: {
        modal,
        inputValidate
    },
    beforeCreate() {

        if (this.$route.params.id > 0) {
          //  service.getService(this, this.$route.params.id);
            this.$store.dispatch('service/getOne',this.$route.params.id)
                    this.$store.dispatch('carrier/getAll')
        }
    },
    computed:{
            ...mapGetters({serviceDetails:'service/getServiceDetails',
                    domesticPlan:'service/getDomesticPlan',
                    internationalPlan:'service/getInternationalPlan',
                      addons:'service/getAddons',
                      carriers: 'carrier/allCarriers'


          })
    },
    data() {
        return {
            id: 0,
            loadedContent: true,
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
            }

        }
    },
    methods : {
        findServiceItem,
        orderFilters,
        ...mapActions(['carrier/getAll', 'service/getOne','service/update','service/add']),
        save() {
            if (this.serviceDetails.id > 0) {
                this.$store.dispatch('service/update')
            } else {
                this.$store.dispatch('service/add')
            }
        },
        hideAndPush(index) {
            if (this.serviceDetails.id > 0) {
                this.addons.push({id: "0", description: '', cost: '', add: true, delete: false});
            } else {
                this.addons.push({description: '', cost: '', add: true, delete: false});
            }

            this.reorderButtons();
        },
        deleteAddOns(index) {
            this.addons.splice(index, 1);
            if (this.addons.length == 0) {
                this.addons.push({id: this.serviceDetails.id, description: '', cost: '', add: false, delete: false});
            }

            this.reorderButtons();
        },
        updateAddon(i, e, type) {
            if (type == 'name'){
                let value = e.target.value;
                if (value == null || value == ''){
                    this.addons[i].addonNameError = true;
                } else {
                    let addon = this.addons[i];
                    let extending = Object.assign({}, addon, {description: value});
                    Vue.set(this.addons, i, extending);
                    this.addons[i].addonNameError = false;
                }
            }

            if (type == 'price'){
                let value = e.target.value;
                if (value == null || value == ''){
                    this.addons[i].addonPriceError = true;
                } else {
                    let addon = this.addons[i];
                    let extending = Object.assign({}, addon, {cost: value});
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
        },
        showFalse() {
            this.show = false;
        },
    }
}
