<template>
  <div>
    <div v-if="!!device" class="device-info d-flex justify-content-between mt-5">
      <div class="d-flex">
        <div class="device-info-thumb">
          <img :src="device.imageUrl" alt />
        </div>

        <div class="device-info-detail pl-3">
          <h1>Device Info</h1>
          <div class="device-info-name">{{ device.name }}</div>
          <div class="device-info-variation">{{ deviceModification }}</div>
        </div>
      </div>

      <div class="device-info-price">${{ device.price1 }}</div>
    </div>

    <div v-if="!!service" class="usage-info mt-5">
      <h1>Usage Info</h1>

      <table>
        <tr v-for="item of service.serviceitems">
          <td class="usage-info-name">{{ item.category | capitalize }}</td>
          <td class="usage-info-desc">{{ item.value }} {{ item.unit }}</td>
          <td class="usage-info-price">${{ item.cost }}</td>
        </tr>
      </table>
    </div>

    <div class="text-right mt-3">
      <div class="order-total">
        <label class="mb-0 mr-3">Total</label>
        <span class="font-weight-bold">${{ total }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  name: "OrderSummary",

  props: ["device", "service"],

  computed: {
    deviceModification() {
      return _.join(_.values(this.device.modification), " | ");
    },

    total() {
      const servicePrice = this.service
        ? _.sumBy(this.service.serviceitems, "cost")
        : 0;

      const devicePrice = this.device ? this.device.price1 : 0;

      return servicePrice + devicePrice;
    }
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
</style>
