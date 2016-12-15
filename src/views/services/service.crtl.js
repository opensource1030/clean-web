import Vue from 'vue';
import service from './../../api/service/service';

export default {
  name : 'Services',
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
      error: '',
      serviceDetails: {
        title: '',
        carrierId: null,
        status: '',
        code: '',
        cost: '',
        description: ''
      },
      domesticPlan: {
        minutes: {
          value: ''
        },

        data: {
          value: ''
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
          value: ''
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
          delete: false
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
      this.addons[index].add = false;
      this.addons[index].delete = true;
      if (this.id != null) {
        this.addons.push({id: 0, description: '', cost: '', add: true, delete: false});
      } else {
        this.addons.push({description: '', cost: '', add: true, delete: false});
      }

    },
    deleteAddOns(index) {
      this.addons.splice(index, 1);
    },
    updateName(i, e) {
      var value = e.target.value;
      var addon = this.addons[i];
      var extending = Object.assign({}, addon, {description: value});
      Vue.set(this.addons, i, extending)

    },
    updatePrice(i, e) {
      var value = e.target.value;
      var addon = this.addons[i];
      var extending = Object.assign({}, addon, {cost: value});
      Vue.set(this.addons, i, extending)

    }

  }

}
