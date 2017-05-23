import SelectPackage from './Placeorder.selectpackage.vue';
import SelectDevice from './Placeorder.selectdevice.vue';
import Review from './Placeorder.review.vue';
import {mapGetters, mapActions} from 'vuex';

export default {
  name : 'PlaceOrder',
  components : {
    select_package: SelectPackage,
    select_device: SelectDevice,
    order_review: Review
  },
  computed: {
    ...mapGetters({
      currentView: 'placeOrder/getCurrentView',
    })
  }
}
