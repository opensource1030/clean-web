import Vue from 'vue';
import employee from './../../api/employee/employee';

export default {
  name: 'UpdateProfile',

  data () {
    return {
      uiemployee:null,
    }
  },

  created () {
    this.id = this.$route.params.id;
    employee.dataEmployee(this);
  },

  methods: {
    save () {
      employee.updateProfile(this,this.uiemployee);
    }
  }
}