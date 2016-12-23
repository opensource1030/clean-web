import Vue from 'vue';
import company from './../../api/company/company';
var {Store} = require('yayson')()
var  store = new Store()

Vue.directive('f-accordion', {
  bind: function(el) {
    Vue.nextTick(function() {
      $(el).foundation();
    });
  }
});

export default {
  name: "Settings",
  beforeCreate() {
    var self = this
    
    this.$http.get(process.env.URL_API + '/users/'+ localStorage.userId, {
    }).then((response) => {
      var event = store.sync(response.data);
      self.id = event.companyId;
      if (self.id != null) {
        company.getDataCompany(self, self.id);
      }
    });
    
  },

  computed: {
    
  },

  methods : {
    submit() {
      if (this.id != null) {
        company.updateCompany(this.id, this, this.customFields, this.d);
      }
    },
    showFalse() {
      this.show = false;
    },
    addCustomField() {
      if (this.label == '' || this.label == null) {
        this.error = 'Incorrect label';
      } else {
        this.error = '';
        if (!this.customFields)
          this.customFields = [];

        var customField = {
          label: this.label,
          value: this.value,
        };
        this.customFields.push(customField);
      }
    },
    removeCustomField(index) {
      this.customFields.splice(index, 1);
    }
  },
  data() {
    return {
      d: {
        name: '',
        label: '',
        id: null,
      },
      id: null,
      show: false,
      label: '',
      value: '',
      error: '',
      customFields: [],
    };
  }
}