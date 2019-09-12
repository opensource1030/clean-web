<template>
  <div class="devices">
    <b-tabs v-if="currentStep === 'device'" class="wa-tabs pt-3">
      <b-tab title="Subsidized Device">
        <device
          v-for="variations in devices"
          :key="variations.id"
          :variations="variations"
          :initial-value="getInitialValue(variations)"
          @requestDevice="onRequestDevice"
          @selectDevice="onSelectDevice"
        />
      </b-tab>
    </b-tabs>
    <accessories
      v-if="currentStep === 'accessory'"
      :available-accessories="availableAccessories"
      :selected-accessories="selectedAccessories"
      @selectAccessory="onSelectAccessory"
      @continue="onContinue"
    />
  </div>
</template>

<script>
import _ from "lodash";
import Device from "@/components/device";
import Accessories from "@/components/accessories";

export default {
  name: "Devices",

  components: {
    Device,
    Accessories
  },

  props: [
    "devices",
    "selectedDevice",
    "availableAccessories",
    "selectedAccessories"
  ],

  data() {
    return {
      currentStep: "device"
    };
  },

  methods: {
    onRequestDevice() {
      this.currentStep = "accessory";
    },

    onSelectDevice(devicevariation) {
      this.$emit("selectDevice", devicevariation);
    },

    onContinue() {
      this.$emit("requestDevice");
    },

    onSelectAccessory(accessory) {
      this.$emit("selectAccessory", accessory);
    },

    getInitialValue(variations) {
      return this.selectedDevice &&
        variations[0].deviceId === this.selectedDevice.deviceId
        ? this.selectedDevice
        : null;
    }
  }
};
</script>

<style lang="scss" scoped>
.devices {
  width: 100%;
  line-height: initial;
  font-family: Montserrat;
}
</style>
