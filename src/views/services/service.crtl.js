import Vue from 'vue';
//import service from './../../api/service/service';
import _ from 'lodash';
import multiselect from 'vue-multiselect'
import modal from './../../components/modal.vue';
import inputValidate from './../../components/inputValidate.vue'
import {findServiceItem, findByAddons, orderFilters} from './../../components/filters.js';
import {mapGetters, mapActions} from 'vuex'
export default {

  components : {
    modal,
    inputValidate,
    multiselect
  },
  beforeCreate() {
    this.$store.dispatch('carrier/getOnePage')
    if (this.$route.params.id > 0) {
      //  service.getService(this, this.$route.params.id);

      this.$store.dispatch('service/getOne', this.$route.params.id)

    }
  },
  mounted() {},
  computed : {
    ...mapGetters({serviceDetails: 'service/getServiceDetails', domesticPlan: 'service/getDomesticPlan', internationalPlan: 'service/getInternationalPlan', addons: 'service/getAddons', carriers: 'carrier/getOnePage'})
  },
  data() {
    return {
      names: {
        managePlan: 'Manage Plan',
        planDetails: 'Plan Details',
        title: 'Title',
        planCode: 'Plan Code',
        cost: 'Cost',
        currency: [
          'USD', 'EUR', 'GBP'
        ],
        description: 'Description',
        carriers: 'Carriers',
        selectCarrierName: 'Select Carrier',
        status: 'Status',
        domesticServices: 'Domestic Services',
        minutes: 'Minutes',
        amount: 'Amount',
        data: 'Data',
        unit: [
          'Tb', 'Gb', 'Mb'
        ],
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
    ...mapActions(['carrier/getAll', 'service/getOne', 'service/update', 'service/add']),
    save() {
      if (this.serviceDetails.id > 0) {
        this.$store.dispatch('error/clearAll')
        this.$store.dispatch('service/update', {
          serviceDetails: this.serviceDetails,
          domesticPlan: this.domesticPlan,
          internationalPlan: this.internationalPlan,
          addons: this.addons,
          router: this.$router
        })
      } else {
        this.$store.dispatch('error/clearAll')
        this.$store.dispatch('service/add', {
          serviceDetails: this.serviceDetails,
          domesticPlan: this.domesticPlan,
          internationalPlan: this.internationalPlan,
          addons: this.addons,
          router: this.$router
        })
      }
    },

    onSelectCarrier(id) {
      if (id >= 0) {
        this.noCarrierSelected = false;
      } else {
        this.noCarrierSelected = true;
      }
    },
    showFalse() {
      this.show = false;
    }
  }
}
