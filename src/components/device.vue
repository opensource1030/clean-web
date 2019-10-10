<template>
  <div class="device">
    <div class="d-flex">
      <div class="device-thumb mr-4" :class="{'no-thumb': !deviceImageUrl}">
        <img v-if="deviceImageUrl" :src="deviceImageUrl" alt />
        <span v-else>No thumb</span>
      </div>

      <div class="device-info">
        <div class="d-flex justify-content-between">
          <h3>{{ deviceName }}</h3>
          <div>
            <span>Start from</span>
            <h3>{{ startVariation.price1 }}</h3>
          </div>

          <!-- <div v-for="(values, key) in allVariations" class="d-flex align-items-center mt-3">
            <div
              v-for="value of values"
              class="device-mod mr-2"
              :class="getModClass(key, value)"
              @click="toggleDeviceMod(key, value)"
            >
              <span v-if="key !== 'style'">{{ value }}</span>
            </div>
          </div> -->
        </div>

        <div class="device-price">
          <div v-if="selectedDevice" class="device-price-item">
            <span>Retail</span>
            <span>$ {{ selectedDevice.priceRetail }}</span>
          </div>
          <div v-else class="device-price-item">
            <span>Retail</span>
            <span class="device-price-not-available">$ {{ startVariation.priceRetail }}</span>
          </div>
        </div>

        <div class="row mt-3">
          <div class="col pr-0">
            <b-form-select
              class="mb-1"
              name="color"
              v-model="selected.color"
              :options="colors"
              value-field="id"
              text-field="value"
              @input="toggleDeviceMod"
            >
              <template v-slot:first>
                <option :value="null" disabled>Select color</option>
              </template>
            </b-form-select>
          </div>
          <div class="col pl-2">
            <b-form-select
              class="mb-1"
              name="capacity"
              v-model="selected.capacity"
              :options="capacities"
              value-field="id"
              text-field="value"
              @input="toggleDeviceMod"
            >
              <template v-slot:first>
                <option :value="null" disabled>Select capacity</option>
              </template>
            </b-form-select>
          </div>
        </div>

        <div class="device-order mt-3">
          <b-btn
            variant="default"
            size="sm"
            :disabled="!selectedDevice"
            class="w-100"
            @click="onRequestDevice"
          >Choose device</b-btn>
        </div>

        <div class="text-right mt-2">
          <span class="device-toggle-property" @click="toggleProperty">
            {{ showDeviceProperty ? 'Hide info' : 'Show info' }}
            <i
              v-if="showDeviceProperty"
              class="fas fa-chevron-up"
            />
            <i v-else class="fas fa-chevron-down" />
          </span>
        </div>
      </div>
    </div>
    <div v-if="deviceProperty && showDeviceProperty" class="device-property">{{ deviceProperty }}</div>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  name: "Device",

  props: ["variations", "initialValue"],

  data() {
    return {
      selected: {
        color: null,
        capacity: null
      },
      showDeviceProperty: false
    };
  },

  computed: {
    deviceName() {
      return _.get(this.variations, "0.devices.0.name");
    },

    deviceProperty() {
      return _.get(this.variations, "0.devices.0.properties");
    },

    deviceImageUrl() {
      const imageUrl = _.get(
        this.variations,
        "0.devices.0.images.0.links.self"
      );

      return imageUrl ? `https://${imageUrl}` : imageUrl;
    },

    // allVariations() {
    //   let allVariations = {};
    //   this.variations.forEach(variation => {
    //     const { modifications } = variation;
    //     modifications.forEach(modification => {
    //       const { modType, value } = modification;
    //       if (Object.keys(allVariations).indexOf(modType) === -1) {
    //         allVariations[modType] = [];
    //       }
    //       if (allVariations[modType].indexOf(value) === -1) {
    //         allVariations[modType].push(value);
    //       }
    //     });
    //   });
    //   return allVariations;
    // },

    colors() {
      return _.chain(this.variations).flatMap('modifications').uniq('id').filter({modType: 'style'}).value()
    },

    capacities() {
      return _.chain(this.variations).flatMap('modifications').uniq('id').filter({modType: 'capacity'}).value()
    },

    startVariation() {
      return _.get(this.variations, "0");
    },

    selectedDevice() {
      if (!this.selected.color || !this.selected.capacity) {
        return null;
      }

      const device = this.variations.find(dv => {
        return _.find(dv.modifications, { id: this.selected.color }) && _.find(dv.modifications, { id: this.selected.capacity })
      });

      // console.log('selectedDevice', device)
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
    // console.log('device')
    // console.log(this.variations)
    // console.log(this.initialValue)
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
      // if (value) {
      //   this.selected = { ...value.modification };
      // } else {
      //   let availableModTypes = {};
      //   this.variations[0].modifications.forEach(modification => {
      //     availableModTypes[modification.modType] = null;
      //   });
      //   this.selected = { ...availableModTypes };
      // }
      if (value) {
        this.selected.color = _.get(_.find(value.modifications, { modType: 'style' }), 'id')
        this.selected.capacity = _.get(_.find(value.modifications, { modType: 'capacity' }), 'id')
      }
    },

    toggleDeviceMod() {
      if (!!this.selectedDevice) {
        this.$emit("selectDevice", {
          ...this.selectedDevice,
          imageUrl: this.deviceImageUrl,
          name: this.deviceName
        });
      }
    },

    // getModClass(key, value) {
    //   return Object.assign(
    //     {
    //       [`device-${key}`]: true,
    //       [`device-${key}--active`]: this.selected[key] === value
    //     },
    //     key === "style" && { [`mod-${_.kebabCase(value)}`]: true }
    //   );
    // },

    toggleProperty() {
      this.showDeviceProperty = !this.showDeviceProperty;
    }
  }
};
</script>

<style lang="scss" scoped>
.device {
  margin: 3rem 0;

  h3 {
    display: inline-block;
    color: #1f2027;
    font-weight: 600;
    font-size: 14px;
  }

  select {
    padding: 6px 15px 6px 6px;
    font-size: 11px;
    background: none;
  }

  // .btn.disabled, .btn:disabled {
  //   opacity: 0.65;
  //   background-color: #a0a0a0;
  //   border-color: #a0a0a0;
  //   &:hover {
  //     background-color: #a0a0a0;
  //     border-color: #a0a0a0;
  //   }
  // }

  &-thumb {
    width: 170px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;

    &.no-thumb {
      border: 1px solid #e2e2e2;
    }

    img {
      flex: 1;
      max-width: 100%;
      max-height: 100%;
    }
  }

  &-info {
    width: 100%;
  }

  // &-mod {
  //   user-select: none;
  //   cursor: pointer;
  // }

  // &-style {
  //   width: 12px;
  //   height: 12px;
  //   background-color: #ffbdbd;
  //   box-sizing: content-box;
  //   border-radius: 100%;
  //   border: 2px solid transparent;
  //   position: relative;
  //   &:not(:last-of-type) {
  //     margin-right: 10px;
  //   }
  //   &--active,
  //   &:hover {
  //     &:before {
  //       content: "";
  //       position: absolute;
  //       left: -5px;
  //       top: -5px;
  //       right: -5px;
  //       bottom: -5px;
  //       background-color: transparent;
  //       border: 1px solid #20a8d8;
  //       border-radius: 100%;
  //     }
  //   }
  // }

  // &-capacity {
  //   color: #20a8d8;
  //   padding: 5px;
  //   font-weight: 600;
  //   border-radius: 5px;
  //   &:not(:last-of-type) {
  //     margin-right: 6px;
  //   }
  //   &--active,
  //   &:hover {
  //     background-color: rgba(32, 168, 216, 0.21);
  //   }
  // }

  // &-price {
  //   color: #657089;
  //   font-size: 10px;
  //   display: flex;
  //   flex-direction: column;
  //   min-width: 120px;
  //   &-item {
  //     display: flex;
  //     align-items: baseline;
  //     white-space: nowrap;
  //     span {
  //       width: 50%;
  //       text-align: end;
  //     }
  //     span:last-child {
  //       font-weight: 600;
  //       font-size: 12px;
  //       padding-left: 5px;
  //       text-align: start;
  //     }
  //     b {
  //       color: #1f2027;
  //     }
  //   }
  //   &-not-available {
  //     text-align: end;
  //   }
  // }

  &-price {
    &-not-available {
      text-decoration: line-through;
    }
  }

  &-order {
    display: flex;
    align-items: center;
  }

  &-property {
    padding-top: 20px;
    color: black;
    font-size: 12px;
    font-weight: 500;
    line-height: 18px;
  }

  &-toggle-property {
    color: #20a8d8;
    user-select: none;
    cursor: pointer;

    i {
      font-size: 10px;
      margin-left: 5px;
    }
  }
}
</style>
