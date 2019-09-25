<template>
  <div>
    <!-- <div v-for="dv in accessories" class="device-info d-flex justify-content-between mt-5">
      <div class="d-flex">
        <div class="device-info-thumb">
          <img :src="deviceImageUrl(dv)" alt />
        </div>
        <div class="device-info-detail pl-3">
          <h1>Device Info</h1>
          <div class="device-info-name">{{ deviceName(dv) }}</div>
          <div class="device-info-variation">{{ deviceModification(dv) }}</div>
        </div>
      </div>
      <div class="device-info-price">${{ dv.price1 }}</div>
    </div>-->

    <div class="mt-5">
      <div v-for="dv of accessories" class="row align-items-center mt-3">
        <div class="col-10 offset-1">
          <div class="d-flex justify-content-between align-items-center accessory-selected">
            <div>
              <img class="accessory-thumb" :src="deviceImageUrl(dv)" alt />
              <span class="accessory-name">{{ deviceName(dv) }}</span>
            </div>
            <div class="accessory-price mr-3">${{ dv.price1 }}</div>
          </div>
        </div>
        <div class="col-1">
          <b-btn-close v-if="accessories.length > 1" @click="setAccessory(dv)">
            <i class="fa fa-times" />
          </b-btn-close>
        </div>
      </div>
    </div>

    <div class="row mt-3">
      <div class="col-10 offset-1 text-right">
        <div class="order-total">
          <label class="mb-0 mr-3">Total</label>
          <span class="font-weight-bold">${{ total }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "OrderSummary",

  // props: ["accessories"],

  computed: {
    ...mapGetters({
      accessories: "placeOrder/accessorySelectedAccessories"
    }),

    total() {
      return this.accessories.reduce((total, dv) => total + dv.price1, 0);
    }
  },

  methods: {
    ...mapActions({
      setAccessory: "placeOrder/setAccessorySelectedAccessory"
    }),

    deviceName(dv) {
      return _.get(dv, "devices.0.name");
    },

    deviceImageUrl(dv) {
      const imageUrl = _.get(dv, "devices.0.images.0.links.self");

      return imageUrl ? `https://${imageUrl}` : imageUrl;
    },

    deviceModification(dv) {
      return _.join(_.values(dv.modification), " | ");
    }
  },

  created() {
    // console.log('accessory order_summary')
    // console.log(this.accessories)
  }
};
</script>

<style lang="scss" scoped>
h1 {
  color: #1f2027;
  font-size: 12px;
  font-weight: bold;
}

.device-info {
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
      max-width: 100%;
      max-height: 100%;
    }
  }
}

.usage-info {
  font-size: 11px;

  table {
    width: 100%;
  }

  &-name {
    color: #a9b5d1;
    text-transform: uppercase;
  }
}

.order-total {
  padding: 6px 20px;
  background-color: rgba(53, 91, 185, 0.08);
  color: #1f2027;
  display: inline-block;
  font-size: 12px;

  label {
    color: #a9b5d1;
  }
}

.usage-info-price,
.device-info-price {
  color: #1f2027;
  font-weight: 600;
  text-align: right;
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

  &-selected {
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
}
</style>
