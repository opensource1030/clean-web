<template>
  <div class="accessories pt-5">
    <h5 class="mb-3">Accessories that go with the device:</h5>

    <div class="row">
      <div v-for="accessory of selectedAccessories" class="col-6">
        <div class="accessory-in-device mb-2">
          <img class="accessory-thumb" :src="accessory.thumb" />
          <span class="accessory-name">{{ accessory.name }}</span>
        </div>
      </div>
    </div>

    <h5 class="mt-5 mb-3">Need any additional accessories?</h5>

    <div class="row">
      <div v-for="accessory of availableAccessories" class="col-4">
        <div
          class="accessory-available mb-2"
          v-bind:class="{ selected: isSelectedAccessory(accessory) }"
          @click="onSelectAccessory(accessory)"
        >
          <img class="accessory-thumb" :src="accessory.thumb" />
          <div class="accessory-name">{{ accessory.name }}</div>
          <div class="accessory-price">$ {{ accessory.price }}</div>
          <div class="accessory-checkbox">
            <i class="fas fa-check"></i>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-3">
      <div class="col text-center">
        <b-btn variant="default" @click="onContinue">Continue</b-btn>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  name: "Accessories",

  props: ["availableAccessories", "selectedAccessories"],

  methods: {
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
