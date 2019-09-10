<template>
  <div class="device">
    <div class="device-thumb mr-4">
      <img v-if="deviceImageUrl" :src="deviceImageUrl" alt />
      <span v-else>No thumb</span>
    </div>
    <div class="device-info">
      <div class="device-name">{{ deviceName }}</div>

      <div v-for="(values, key) in allVariations" class="d-flex align-items-center mt-3">
        <div
          v-for="value of values"
          :class="getModClass(key, value)"
          @click="toggleDeviceMod(key, value)"
        >
          <span v-if="key !== 'color'">{{ value }}</span>
        </div>
      </div>

      <div class="device-order mt-4">
        <b-btn
          variant="default"
          size="sm"
          :disabled="!selectedDevice"
          @click="onRequestDevice"
        >Request Device</b-btn>
      </div>
    </div>

    <div class="device-price">
      <template v-if="selectedDevice">
        <div class="device-price-item">
          <span>Price</span>
          <span>
            <b>$ {{ selectedDevice.price1 }}</b>
          </span>
        </div>

        <div class="device-price-item">
          <span>Retail</span>
          <span>$ {{ selectedDevice.priceRetail }}</span>
        </div>
      </template>
      <span v-else class="device-price-not-available">Not available</span>
    </div>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  name: "Device",

  props: ["variations", "initialValue"],

  data() {
    return {
      selected: {}
    };
  },

  computed: {
    deviceName() {
      return _.get(this.variations, "0.devices.0.name");
    },

    deviceImageUrl() {
      const imageUrl = _.get(
        this.variations,
        "0.devices.0.images.0.links.self"
      );

      return imageUrl ? `https://${imageUrl}` : imageUrl;
    },

    allVariations() {
      let allVariations = {};
      this.variations.forEach(variation => {
        const { modifications } = variation;

        modifications.forEach(modification => {
          const { modType, value } = modification;

          if (Object.keys(allVariations).indexOf(modType) === -1) {
            allVariations[modType] = [];
          }

          if (allVariations[modType].indexOf(value) === -1) {
            allVariations[modType].push(value);
          }
        });
      });

      return allVariations;
    },

    selectedDevice() {
      if (Object.values(this.selected).indexOf(null) !== -1) {
        return null;
      }

      const device = this.deviceWithMods.find(device =>
        _.isEqual(device.modification, this.selected)
      );

      return device;
    },

    deviceWithMods() {
      let devices = [];

      this.variations.forEach(variation => {
        let device = _.pick(variation, [
          "deviceId",
          "id",
          "price1",
          "price2",
          "priceOwn",
          "priceRetail"
        ]);

        device["modification"] = {};

        variation.modifications.forEach(modification => {
          const { modType, value } = modification;
          device["modification"][modType] = value;
        });

        devices.push(device);
      });

      return devices;
    }
  },

  created() {
    this.populateSelected(this.initialValue);
  },

  watch: {
    initialValue(newVal) {
      this.populateSelected(newVal);
    }
  },

  methods: {
    onRequestDevice() {
      this.$emit("requestDevice");
    },

    populateSelected(value) {
      if (value) {
        this.selected = { ...value.modification };
      } else {
        let availableModTypes = {};
        this.variations[0].modifications.forEach(modification => {
          availableModTypes[modification.modType] = null;
        });

        this.selected = { ...availableModTypes };
      }
    },

    toggleDeviceMod(key, value) {
      this.selected[key] = value === this.selected[key] ? null : value;

      if (!!this.selectedDevice) {
        this.$emit("selectDevice", {
          ...this.selectedDevice,
          imageUrl: this.deviceImageUrl,
          name: this.deviceName
        });
      }
    },

    getModClass(key, value) {
      return Object.assign(
        {
          [`device-${key}`]: true,
          [`device-${key}--active`]: this.selected[key] === value
        },
        key === "color" && { [`mod-${_.kebabCase(value)}`]: true }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.device {
  display: flex;
  margin: 3rem 0;  

  &-thumb {
    width: 120px;
    height: 150px;
    border: 1px solid #e2e2e2;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;

    img {
      flex: 1;
      max-width: 100%;
      max-height: 100%;
    }
  }

  &-name {
    color: #1f2027;
    font-weight: 600;
    font-size: 14px;
  }

  &-color,
  &-capacity {
    user-select: none;
    cursor: pointer;
  }

  &-color {
    width: 12px;
    height: 12px;
    background-color: #ffbdbd;
    box-sizing: content-box;
    border-radius: 100%;
    border: 2px solid transparent;
    position: relative;

    &:not(:last-of-type) {
      margin-right: 10px;
    }

    &--active,
    &:hover {
      &:before {
        content: "";
        position: absolute;
        left: -5px;
        top: -5px;
        right: -5px;
        bottom: -5px;
        background-color: transparent;
        border: 1px solid #20a8d8;
        border-radius: 100%;
      }
    }
  }

  &-capacity {
    color: #20a8d8;
    padding: 5px;
    font-weight: 600;
    border-radius: 5px;
    border: 1px solid #20a8d8;

    &:not(:last-of-type) {
      margin-right: 6px;
    }

    &--active,
    &:hover {
      background-color: rgba(32, 168, 216, 0.21);
    }
  }

  &-price {
    color: #657089;
    font-size: 10px;
    display: flex;
    flex-direction: column;
    margin-left: auto;
    min-width: 120px;

    &-item {
      display: flex;
      align-items: baseline;
      white-space: nowrap;

      span {
        width: 50%;
        text-align: end;
      }

      span:last-child {
        font-weight: 600;
        font-size: 12px;
        padding-left: 5px;
        text-align: start;
      }

      b {
        color: #1f2027;
      }
    }

    &-not-available {
      text-align: end;
    }
  }
}
</style>
