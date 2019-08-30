<template>
  <div class="devices">
    <device
      v-for="variations in devices"
      :key="variations.id"
      :variations="variations"
      :initial-value="getInitialValue(variations)"
      @requestDevice="onRequestDevice"
      @selectDevice="onSelectDevice"
    ></device>
  </div>
</template>

<script>
import _ from "lodash";
import Device from "@/components/device";

export default {
  name: "Devices",

  components: {
    Device
  },

  props: ["devices", "selectedDevice"],

  methods: {
    onRequestDevice() {
      this.$emit("requestDevice");
    },

    onSelectDevice(devicevariation) {
      this.$emit("selectDevice", devicevariation);
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
