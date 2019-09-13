<template>
  <div>
    <div v-if="!!device">
      <div class="device-info d-flex justify-content-between mt-5">
        <div class="d-flex">
          <div class="device-info-thumb">
            <img :src="device.imageUrl" alt />
          </div>

          <div class="device-info-detail pl-3">
            <div class="order-title-label">Device Information</div>
            <div class="device-info-name">{{ device.name }}</div>
            <div class="device-info-variation">{{ deviceModification }}</div>
          </div>
        </div>

        <div class="device-info-price">${{ device.priceRetail }}</div>
      </div>
      <div class="text-right mt-3">
        <div class="order-total">
          <label class="mb-0 mr-3">Device/Accessories Subtotal</label>
          <span class="font-weight-bold">${{ device.priceRetail }}</span>
        </div>
      </div>
    </div>

    <div v-if="accessories && accessories.length > 0" class="accessory-info">
      <div v-for="accessory of accessories" class="accessory">
        <div class="d-flex align-items-center">
          <img
            v-if="getAccessoryImage(accessory)"
            class="accessory-thumb"
            :src="getAccessoryImage(accessory)"
          />
          <span v-else class="accessory-thumb">No thumb</span>
          <div class="accessory-name">{{ getAccessoryName(accessory) }}</div>
        </div>
        <div class="accessory-price">$ {{ accessory.price1 }}</div>
      </div>
    </div>

    <div v-if="!!service" class="usage-info mt-5">
      <h1>Usage Info</h1>

      <div v-if="domesticServices.length > 0">
        <div class="service-label">- Domestic Services</div>
        <table>
          <tr v-for="item in domesticServices">
            <td class="usage-info-name">{{ item.category | capitalize }}</td>
            <td v-if="!item.unlimited" class="usage-info-desc">{{ item.value }} {{ item.unit }}</td>
            <td v-else class="usage-info-desc">Unlimited</td>
          </tr>
        </table>
      </div>

      <div v-if="internationalServices.length > 0" class="mt-2">
        <div class="service-label">- International Services</div>
        <table>
          <tr v-for="item in internationalServices">
            <td class="usage-info-name">{{ item.category | capitalize }}</td>
            <td v-if="!item.unlimited" class="usage-info-desc">{{ item.value }} {{ item.unit }}</td>
            <td v-else class="usage-info-desc">Unlimited</td>
          </tr>
        </table>
      </div>

      <div class="text-right mt-3">
        <div class="order-total">
          <label class="mb-0 mr-3">Service Package Subtotal</label>
          <span class="font-weight-bold">${{ service.cost }}</span>
        </div>
      </div>

      <div v-if="addons.length > 0" class="mt-5">
        <div class="service-label">- Service Package Addons</div>

        <table>
          <tr v-for="item in addons">
            <td class="usage-info-name">{{ item.category | capitalize }}</td>
            <td class="usage-info-desc">{{ item.description }}</td>
            <td class="usage-info-price">${{ item.cost }}</td>
          </tr>
        </table>

        <div class="text-right mt-3">
          <div class="order-total">
            <label class="mb-0 mr-3">Service Addons Subtotal</label>
            <span class="font-weight-bold">${{ addonsCost }}</span>
          </div>
        </div>
      </div>
    </div>

    <hr />

    <div class="text-right mt-3">
      <div class="order-total">
        <label class="mb-0 mr-3">Order Total</label>
        <span class="font-weight-bold">${{ orderTotalCost }}</span>
      </div>
    </div>

    <div class="extra-details-container my-4">
      <table class="extra-info-table">
        <tr v-if="device == null">
          <td class="label-heading extra-info-name">Include new SIM Card</td>
          <td v-if="newSimCard">Yes</td>
          <td v-else>No</td>
        </tr>
        <tr v-if="device != null">
          <td class="label-heading extra-info-name">Include new SIM Card</td>
          <td>Yes - A new simcard is included when ordering or upgrading a device</td>
        </tr>
      </table>
    </div>

    <div class="mt-4">
      <div class="service-label mb-1">Additional Comments</div>
      <textarea placeholder="Your message..." @change="onCommentChange">{{ comment }}</textarea>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderSummary",

  props: ["device", "accessories", "service", "comment", "newSimCard"],

  computed: {
    deviceModification() {
      return _.join(_.values(this.device.modification), " | ");
    },

    domesticServices() {
      if (this.service) {
        return _.filter(this.service.serviceitems, ["domain", "domestic"]);
      }
      return null;
    },

    internationalServices() {
      if (this.service) {
        return _.filter(this.service.serviceitems, ["domain", "international"]);
      }
      return null;
    },

    addons() {
      if (this.service) {
        return _.filter(this.service.serviceitems, ["category", "addon"]);
      }
      return null;
    },

    addonsCost() {
      return _.sumBy(this.addons, "cost");
    },

    orderTotalCost() {
      const devicePrice = this.device ? this.device.priceRetail : 0;
      const serviceCost = this.service ? this.service.cost : 0;
      const addonsCost = this.addons ? this.addonsCost : 0;
      return devicePrice + serviceCost + addonsCost;
    }
  },

  methods: {
    getAccessoryName(accessory) {
      return _.get(accessory, "devices.0.name");
    },

    getAccessoryImage(accessory) {
      const imageUrl = _.get(accessory, "devices.0.images.0.links.self");
      return imageUrl ? `https://${imageUrl}` : imageUrl;
    },

    onCommentChange(event) {
      this.$emit("change", event.target.value);
    }
  }
};
</script>

<style lang="scss" scoped>
.order-title-label {
  color: #1f2027;
  font-size: 12px;
  font-weight: bold;
}

.service-label {
  color: #1f2027;
  font-size: 12px;
  font-weight: 600;
  margin-top: 16px;
}

textarea {
  font-size: 10px;
  border: 0.75px solid #afbad4;
  border-radius: 4px;
  width: 100%;
  padding: 0.5rem;
  height: 60px;
  resize: none;
  outline: none;
  line-height: 1.5;
}

.device-info {
  &-thumb {
    width: 120px;
    user-select: none;
    border: 0.75px solid #afbad4;
    border-radius: 3px;

    img {
      flex: 1;
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
    width: 50%;
  }
}

.extra-info {
  font-size: 11px;

  &-table {
    width: 100%;
  }
  &-name {
    color: #a9b5d1;
    text-transform: uppercase;
    width: 50%;
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

.usage-info-price {
  padding-right: 20px;
}

.usage-info-price,
.device-info-price,
.accessory-price {
  color: #1f2027;
  font-weight: 600;
  text-align: right;
}

.accessory {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 0.75px solid #afbad4;
  border-radius: 3px;
  padding: 0.5rem;
  margin-top: 1rem;

  &-thumb {
    height: 60px;
    user-select: none;
    height: 50px;
    margin-right: 1rem;

    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
}
</style>
