<template>
  <div class="dashboard-form pt-4">
    <b-form @submit.prevent="validateBeforeSubmit">
      <div class="row">
        <div class="col-6">
          <div class="row mb-3">
            <div class="col item" :class="{'is-danger': errors.has('Existing Carrier') }">
              <label>Existing Carrier *</label>
              <div class="item-field-wrapper">
                <b-form-select
                  class="mb-1"
                  name="Existing Carrier"
                  v-model="form.carrierInfo"
                  :options="carriers"
                  value-field="presentation"
                  text-field="presentation"
                  v-validate="'required'"
                ></b-form-select>
                <span
                  v-show="errors.has('Existing Carrier')"
                  class="error"
                >{{ errors.first('Existing Carrier') }}</span>
              </div>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col item" :class="{'is-danger': errors.has('Phone Number') }">
              <label>Phone Number *</label>
              <div class="item-field-wrapper">
                <b-input
                  class="mb-1"
                  name="Phone Number"
                  placeholder="e.g. 199-902-5522"
                  v-model="form.wirelessNo"
                  v-validate="{ required: true , numeric: true }"
                />
                <span
                  v-show="errors.has('Phone Number')"
                  class="error"
                >{{ errors.first('Phone Number') }}</span>
              </div>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col item" :class="{'is-danger': errors.has('Account Name') }">
              <label class="d-flex align-items-center">
                Account Name *
                <help-pop helpText="Name of person or business the account belongs to" />
              </label>
              <div class="item-field-wrapper">
                <b-input
                  name="Account Name"
                  v-model="form.accountName"
                  v-validate="'required'"
                  class="mb-1"
                />
                <span
                  v-show="errors.has('Account Name')"
                  class="error"
                >{{ errors.first('Account Name') }}</span>
              </div>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col item" :class="{'is-danger': errors.has('Account Number') }">
              <label class="d-flex align-items-center">
                Account Number *
                <help-pop helpText="Number that identifies your account for billing purposes" />
              </label>
              <div class="item-field-wrapper">
                <b-input
                  class="mb-1"
                  name="Account Number"
                  v-model="form.accountNumber"
                  v-validate="{ required: true , numeric: true }"
                />
                <span
                  v-show="errors.has('Account Number')"
                  class="error"
                >{{ errors.first('Account Number') }}</span>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col item" :class="{'is-danger': errors.has('Billing Password') }">
              <label>Billing Password *</label>
              <div class="item-field-wrapper">
                <b-input
                  class="mb-1"
                  type="password"
                  name="Billing Password"
                  v-model="form.billingPassword"
                  v-validate="'required'"
                />
                <span
                  v-show="errors.has('Billing Password')"
                  class="error"
                >{{ errors.first('Billing Password') }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="col-6 d-flex flex-column justify-content-end">
          <div class="item px-2">
            <label class="d-flex align-items-center">
              Transfer Type *
              <help-pop helpText="Transfer Type"></help-pop>
            </label>
            <div :class="{'is-danger': errors.has('Transfer Type') }">
              <b-radio-group
                class="mb-1"
                name="Transfer Type"
                :options="transferTypes"
                v-model="form.transferType"
                v-validate="'required'"
              />
              <span
                v-show="errors.has('Transfer Type')"
                class="error"
              >{{ errors.first('Transfer Type') }}</span>
            </div>
          </div>
        </div>
      </div>

      <hr class="my-5" />

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

      <div class="row mt-5">
        <div class="col-6 offset-6">
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
  name: "MyDetails",

  components: {
    Toggle,
    HelpPop
  },

  data() {
    return {
      form: {
        carrierInfo: null,
        wirelessNo: null,
        accountName: null,
        accountNumber: null,
        billingPassword: null,
        keepExisitingService: false
      },
      transferTypes: [
        { text: "Personal to corporate", value: "personal" },
        { text: "Corporate to corporate", value: "corporate" }
      ]
    };
  },

  created() {
    this.form = { ...this.details };
  },

  computed: {
    ...mapGetters({
      details: "placeOrder/transferDetails",
      carriers: "placeOrder/transferCarriers"
    })
  },

  methods: {
    ...mapActions({
      setDetails: "placeOrder/setTransferDetails"
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

          this.setDetails(this.form);
          this.$emit("next");
          return;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.dashboard-form {
  .custom-select {
    background: none;
  }
}
</style>
