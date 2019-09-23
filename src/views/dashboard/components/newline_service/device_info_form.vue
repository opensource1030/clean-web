<template>
  <div class="dashboard-form pt-4">
    <b-form @submit.prevent="validateBeforeSubmit">
      <div class="row">
        <div class="col-6">
          <div class="row mb-3">
            <div class="col item" :class="{'is-danger': errors.has('deviceImei') }">
              <label>IMEI</label>
              <div>
                <b-input name="deviceImei" v-model="form.deviceImei" v-validate="'required'"></b-input>
                <span v-show="errors.has('deviceImei')" class="error">Required</span>
              </div>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col item" :class="{'is-danger': errors.has('deviceCarrier') }">
              <label>Carrier</label>
              <div>
                <b-input
                  name="deviceCarrier"
                  placeholder="e.g. T-Mobile"
                  v-model="form.deviceCarrier"
                  v-validate="'required'"
                ></b-input>
                <span v-show="errors.has('deviceCarrier')" class="error">Required</span>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col item" :class="{'is-danger': errors.has('deviceSim') }">
              <label>Sim Card (ICCID)</label>
              <div>
                <b-input
                  name="deviceSim"
                  placeholder="If there's no existing card. add N/A"
                  v-model="form.deviceSim"
                  v-validate="'required'"
                ></b-input>
                <span v-show="errors.has('deviceSim')" class="error">Required</span>
              </div>
            </div>
          </div>
        </div>

        <div class="col-6 d-flex flex-column justify-content-end">
          <div class="item">
            <label>Need a new sim?</label>
            <div>
              <toggle :active="form.needNewSim" @change="setNeedNewSim"></toggle>
            </div>
          </div>
        </div>
      </div>

      <hr />

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
import HelpPop from "@/components/help_pop";

export default {
  name: "DeviceInfo",

  components: {
    Toggle,
    HelpPop
  },

  data() {
    return {
      form: {
        deviceImei: null,
        deviceCarrier: null,
        deviceSim: null,
        needNewSim: false
      }
    };
  },

  created() {
    this.form = { ...this.deviceInfo };
  },

  computed: {
    ...mapGetters({
      deviceInfo: "placeOrder/newlineDeviceInfo"
    })
  },

  methods: {
    ...mapActions({
      setDeviceInfo: "placeOrder/setNewlineDeviceInfo"
    }),

    setNeedNewSim(needNewSim) {
      this.form.needNewSim = needNewSim;
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

          this.setDeviceInfo(this.form);
          this.$emit("next");
          return;
        }
      });
    }
  }
};
</script>
