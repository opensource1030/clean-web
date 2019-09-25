<template>
  <div class="dashboard-form pt-4">
    <div class="row">
      <div class="detail-summary col-12">
        <div>
          <label>Existing Carrier:</label>
          {{ details.carrierInfo}}
        </div>
        <div>
          <label>Phone Number:</label>
          {{ details.wirelessNo }}
        </div>
        <div>
          <label>Account Name:</label>
          {{ details.accountName }}
        </div>
        <div>
          <label>Account Number:</label>
          {{ details.accoutNumber }}
        </div>
        <div>
          <label>Billing Password:</label>
          {{ details.billingPassword }}
        </div>
      </div>
    </div>

    <hr class="my-5" />

    <div class="row">
      <div class="col-12">
        <div class="item d-flex flex-column align-items-center">
          <label>Need a new device?</label>
          <div class="mt-2">
            <toggle :active="needNewDevice" @change="setNeedNewDevice" />
          </div>
        </div>
      </div>

      <div class="col-6 offset-6 mt-5">
        <b-btn variant="default w-100" @click="onNext">Next</b-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Toggle from "@/components/toggle";

export default {
  name: "DetailSummary",

  components: {
    Toggle
  },

  computed: {
    ...mapGetters({
      details: "placeOrder/transferDetails",
      needNewDevice: "placeOrder/transferNeedNewDevice"
    })
  },

  methods: {
    ...mapActions({
      setNeedNewDevice: "placeOrder/setTransferNeedNewDevice"
    }),

    onNext() {
      this.$emit("next");
    }
  }
};
</script>

<style lang="scss" scoped>
.detail-summary {
  font-size: 12px;

  label {
    color: #a9b5d1;
  }
}
</style>
