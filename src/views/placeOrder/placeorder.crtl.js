import SelectOption from './Placeorder.selectoption.vue';
import SelectPackage from './Placeorder.selectpackage.vue';
import SelectDevice from './Placeorder.selectdevice.vue';
import Review from './Placeorder.review.vue';
import {mapGetters, mapActions} from 'vuex';

export default {
  name : 'PlaceOrder',
  components : {
    selectoption: SelectOption,
    selectpackage: SelectPackage,
    selectdevice: SelectDevice,
    review: Review
  },
  computed: {
    ...mapGetters({
      currentView: 'placeOrder/getCurrentView',
    })
  }
}
