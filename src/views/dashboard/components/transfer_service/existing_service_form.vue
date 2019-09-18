<template>
  <div class="dashboard-form pt-4">
    <b-form @submit.prevent="validateBeforeSubmit">
      <div class="row">
        <div class="col-12">
          <div class="item d-flex flex-column align-items-center">
            <label>Keep existing wireless service provider?</label>
            <div class="pt-1">
              <toggle :active="form.keepExistingService" @change="setKeepExistingService"></toggle>
            </div>
          </div>
        </div>
      </div>

      <hr class="my-4" />

      <div class="row">
        <div class="col-6">
          <div class="row mb-3">
            <div class="col item" :class="{'is-danger': errors.has('serviceImei') }">
              <label>Previous IMEI *</label>
              <div>
                <b-input name="serviceImei" v-model="form.serviceImei" v-validate="'required'"></b-input>
                <span v-show="errors.has('serviceImei')" class="error">Required</span>
              </div>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col item" :class="{'is-danger': errors.has('servicePhoneNo') }">
              <label>Device Mobile Number *</label>
              <div>
                <b-input
                  name="servicePhoneNo"
                  placeholder="e.g. T-Mobile"
                  v-model="form.servicePhoneNo"
                  v-validate="'required'"
                ></b-input>
                <span v-show="errors.has('servicePhoneNo')" class="error">Required</span>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col item" :class="{'is-danger': errors.has('serviceSim') }">
              <label>ICCID / SIM Card Number *</label>
              <div>
                <b-input
                  name="serviceSim"
                  placeholder="If there's no existing card. add N/A"
                  v-model="form.serviceSim"
                  v-validate="'required'"
                ></b-input>
                <span v-show="errors.has('serviceSim')" class="error">Required</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-6"></div>
        <div class="col-6">
          <b-btn variant="default w-100" type="submit">Next</b-btn>
        </div>
      </div>
    </b-form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Toggle from "@/components/toggle";

export default {
  name: "ExistingServiceForm",

  components: {
    Toggle
  },

  data() {
    return {
      form: {
        serviceImei: null,
        servicePhoneNo: null,
        serviceSim: null,
        keepExistingService: false
      }
    };
  },

  created() {
    this.form = { ...this.existingServiceInfo };
  },

  computed: {
    ...mapGetters({
      existingServiceInfo: "placeOrder/transferExistingServiceInfo"
    })
  },

  methods: {
    ...mapActions({
      setExistingServiceInfo: "placeOrder/setTransferExistingServiceInfo"
    }),

    setKeepExistingService(keepExistingService) {
      this.form.keepExistingService = keepExistingService;
    },

    validateBeforeSubmit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          let values = {};

          Object.keys(this.form).forEach(key => {
            if (!!this.form[key]) {
              values[key] = this.form[key];
            }
          });

          this.setExistingServiceInfo(this.form);
          this.$emit("next");
          return;
        }
      });
    }
  }
};
</script>
