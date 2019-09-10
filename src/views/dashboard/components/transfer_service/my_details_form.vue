<template>
  <div class="dashboard-drawer-form pt-4">
    <b-form @submit.prevent="validateBeforeSubmit">
      <div class="row">
        <div class="col-6">
          <div class="row mb-3">
            <div class="col item" :class="{'is-danger': errors.has('carrierInfo') }">
              <label>Existing Carrier *</label>
              <div>
                <b-input
                  name="carrierInfo"
                  placeholder="e.g. T Mobile"
                  v-model="form.carrierInfo"
                  v-validate="'required'"
                ></b-input>
                <span v-show="errors.has('carrierInfo')" class="error">Requird</span>
              </div>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col item" :class="{'is-danger': errors.has('wirelessNo') }">
              <label>Phone Number *</label>
              <div>
                <b-input
                  name="wirelessNo"
                  placeholder="e.g. 199-902-5522"
                  v-model="form.wirelessNo"
                  v-validate="'required'"
                ></b-input>
                <span v-show="errors.has('wirelessNo')" class="error">Requird</span>
              </div>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col item" :class="{'is-danger': errors.has('accountName') }">
              <label class="d-flex align-items-center">
                Account Name *
                <help-pop helpText="Name of person or business the account belongs to" />
              </label>
              <div>
                <b-input name="accountName" v-model="form.accountName" v-validate="'required'"></b-input>
                <span v-show="errors.has('accountName')" class="error">Requird</span>
              </div>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col item" :class="{'is-danger': errors.has('accountNumber') }">
              <label class="d-flex align-items-center">
                Account Number *
                <help-pop helpText="Number that identifies your account for billing purposes" />
              </label>
              <div>
                <b-input
                  name="accountNumber"
                  v-model="form.accountNumber"
                  v-validate="'required'"
                ></b-input>
                <span v-show="errors.has('accountNumber')" class="error">Requird</span>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col item" :class="{'is-danger': errors.has('billingPassword') }">
              <label>Billing Password *</label>
              <div>
                <b-input
                  type="password"
                  name="billingPassword"
                  v-model="form.billingPassword"
                  v-validate="'required'"
                ></b-input>
                <span v-show="errors.has('billingPassword')" class="error">Requird</span>
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
            <div :class="{'is-danger': errors.has('transferType') }">
              <b-radio-group
                name="transferType"
                :options="transferTypes"
                v-model="form.transferType"
                v-validate="'required'"
              ></b-radio-group>
              <span v-show="errors.has('transferType')" class="error">Requird</span>
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
      details: "placeOrder/transferDetails"
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
