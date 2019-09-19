<template>
  <div class="accessories pt-5">
    <template v-if="!availableAccessories || availableAccessories.length == 0">
      <h5 class="m-0 text-center">No accessory found</h5>
    </template>
    <template v-else>
      <div class="row">
        <div v-for="accessory of availableAccessories" class="col-4" :key="`accessory-${accessory.id}`">
          <div
            class="accessory-available mb-2"
            v-bind:class="{ selected: isSelectedAccessory(accessory) }"
            @click="onSelectAccessory(accessory)"
          >
            <img class="accessory-thumb" :src="deviceImageUrl(accessory)" />
            <div class="accessory-name">{{ deviceName(accessory) }}</div>
            <div class="accessory-price">$ {{ accessory.price1 }}</div>
            <div class="accessory-checkbox">
              <i class="fas fa-check"></i>
            </div>
          </div>
        </div>
      </div>

      <div class="row mt-3">
        <div class="col text-center">
          <b-btn variant="default" @click="onContinue" :disabled="!isValid">Continue</b-btn>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  name: "Accessories",

  props: ["availableAccessories", "selectedAccessories"],

  computed: {
    isValid() {
      return this.selectedAccessories && this.selectedAccessories.length > 0
    }
  },

  methods: {
    deviceName(accessory) {
      return _.get(accessory, "devices.0.name");
    },

    deviceImageUrl(accessory) {
      const imageUrl = _.get(accessory, "devices.0.images.0.links.self");

      return imageUrl ? `https://${imageUrl}` : imageUrl;
    },

    isSelectedAccessory(accessory) {
      return _.findIndex(this.selectedAccessories, { id: accessory.id }) !== -1;
    },

    onSelectAccessory(accessory) {
      this.$emit("selectAccessory", accessory);
    },

    onContinue() {
      this.$emit("continue");
    }
  }
};
</script>

<style lang="scss" scoped>
.accessories {
  h5 {
    text-transform: uppercase;
    color: #657089;
    font-size: 10px;
    font-weight: 600;
    line-height: 13px;
  }
}

.accessory {
  &-thumb {
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }

  &-price {
    color: #1f2027;
    font-size: 14px;
    font-weight: 600;
    line-height: 18px;
  }

  &-checkbox {
    height: 17px;
    width: 17px;
    border: 1px solid #20a8d8;
    border-radius: 17px;
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;

    i {
      color: white;
      font-size: 10px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      display: none;
    }
  }

  &-in-device {
    border: 0.75px solid #afbad4;
    border-radius: 3px;
    color: #1f2027;
    font-size: 11px;
    font-weight: 500;
    line-height: 14px;
    padding: 0.5rem;
    user-select: none;
    cursor: pointer;
  }

  &-available {
    border: 1px solid #20a8d8;
    border-radius: 3px;
    height: 120px;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    cursor: pointer;

    &.selected .accessory-checkbox {
      background-color: #20a8d8;

      i {
        display: block;
      }
    }
  }
}
</style>
