import Avatar from 'vue-avatar/dist/Avatar';
import placeOrderWizard from './../../components/placeOrderWizard';
import {mapGetters, mapActions} from 'vuex';

export default {
  name : 'SelectOption',
  components : {
    Avatar,
    placeOrderWizard
  },
  data() {
    return {
      user: {},
      selectedOrder: 'service'
    }
  },
  beforeCreate() {
    this.user = JSON.parse(localStorage.getItem('userProfile'));
  },
  methods : {
    selectOrderType(type) {
      this.$set(this, 'selectedOrder', type);
    },
    placeOrder() {
      switch(this.selectedOrder) {
        case 'service':
          this.$store.dispatch('placeOrder/setCurrentView', 'selectpackage');
          break;
        case 'device':
          break;
        case 'transfer':
          break;
        case 'accessories':
          break;
      }
    }
  }
}
