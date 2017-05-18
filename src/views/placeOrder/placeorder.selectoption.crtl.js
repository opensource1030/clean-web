import Avatar from 'vue-avatar/dist/Avatar';
import {mapGetters, mapActions} from 'vuex';

export default {
  name : 'SelectOption',
  components : {
    Avatar
  },
  data() {
    return {
      user: {},
      selectedOrder: ''
    }
  },
  beforeCreate() {
    this.user = JSON.parse(localStorage.getItem('userProfile'));
  },
  computed: {
    ...mapGetters({
      currentOrderType: 'placeOrder/getCurrentOrderType'
    }),
  },
  created() {
    this.selectedOrder = this.currentOrderType;
  },
  methods: {
    selectOrderType(type) {
      this.$set(this, 'selectedOrder', type);
    },
    placeOrder() {
      switch(this.selectedOrder) {
        case 'newService':
          this.$store.dispatch('placeOrder/setCurrentOrderType', 'newService');
          this.$store.dispatch('placeOrder/setCurrentView', 'selectpackage');
          break;
        case 'upgradeDevice':
          this.$store.dispatch('placeOrder/setCurrentOrderType', 'upgradeDevice');
          this.$store.dispatch('placeOrder/setCurrentView', 'selectpackage');
          break;
        case 'transferService':
          break;
        case 'orderAccessory':
          break;
      }
    }
  }
}
