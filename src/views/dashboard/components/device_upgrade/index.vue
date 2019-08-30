<template>
  <drawer open="true" @close="toggleDrawer">
    <div class="device-upgrade">
      <device-upgrade-form
        v-if="isReviewStep"
        :user="selectedEmployee"
        :addresses="addresses"
        @submit="onSubmit"
      ></device-upgrade-form>

      <user-select-form v-if="!selectedEmployee" @selectUser="selectEmployee"></user-select-form>

      <div v-else class="device-upgrade-main pt-5">
        <h1 class="text-center">Upgrade Device</h1>

        <steps
          :steps="steps"
          :active-step="upgradeStep"
          :show-back-button-on-first-step="true"
          @back="onStepBack"
        ></steps>

        <div v-if="isSelectingDeviceStep" class="device-upgrade-device-step">
          <div class="device-upgrade-carrier-toggle pt-3">
            <span>Change carrier?</span>
            <toggle :active="changeCarrier" @change="setChangeCarrier"></toggle>
          </div>

          <b-tabs class="wa-tabs pt-3">
            <b-tab title="Subsided Device">
              <devices
                :devices="devices"
                :selected-device="selectedDevice"
                @requestDevice="onRequestDevice"
                @selectDevice="onSelectDevice"
              ></devices>
            </b-tab>
          </b-tabs>
        </div>

        <div v-if="isSelectingServiceStep" class="device-upgrade-service-step">
          <b-tabs class="wa-tabs pt-3">
            <b-tab title="Category">
              <services :services="services" @requestService="onSelectService"></services>
            </b-tab>
          </b-tabs>
        </div>

        <order-summary
          v-if="isReviewStep"
          :device="selectedDevice"
          :service="selectedService"
          :carrierOn="changeCarrier"
        ></order-summary>
      </div>
    </div>
  </drawer>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import _ from "lodash";
import packageAPI from "@/api/package-api";
import addressAPI from "@/api/address-api";
import Drawer from "@/components/drawer";
import Steps from "@/components/steps";
import Toggle from "@/components/toggle";
import Devices from "@/components/devices";
import UserSelectForm from "@/components/user_select_form";
import Services from "./services";
import DeviceUpgradeForm from "./upgrade_form";
import OrderSummary from "./order_summary";

const { Store } = require("yayson")();
const store = new Store();

export default {
  name: "DeviceUpgrade",

  components: {
    Drawer,
    Steps,
    Toggle,
    Devices,
    Services,
    UserSelectForm,
    DeviceUpgradeForm,
    OrderSummary
  },

  created() {
    if (this.packages.length <= 0) {
      const { id } = this.currentUser;
      this.getUserPackages(id);
    }
  },

  computed: {
    isSelectingDeviceStep() {
      return this.upgradeStep === 0;
    },

    isSelectingServiceStep() {
      return this.changeCarrier && this.upgradeStep === 1;
    },

    isReviewStep() {
      return this.upgradeStep === this.steps.length - 1;
    },

    steps() {
      if (this.changeCarrier) {
        return [
          { key: "select-device", text: "Select Device" },
          { key: "select-service", text: "Select Service" },
          { key: "preview", text: "Preview" }
        ];
      } else {
        return [
          { key: "select-device", text: "Select Device" },
          { key: "preview", text: "Preview" }
        ];
      }
    },

    ...mapGetters({
      currentUser: "auth/getProfile",
      selectedEmployee: "employee/selectedEmployee",
      packages: "placeOrder/packages",
      devices: "placeOrder/devices",
      services: "placeOrder/services",
      addresses: "placeOrder/addresses",
      selectedDevice: "placeOrder/selectedDevice",
      selectedService: "placeOrder/selectedService",
      upgradeStep: "placeOrder/upgradeStep",
      changeCarrier: "placeOrder/changeCarrier"
    })
  },

  methods: {
    toggleDrawer() {
      this.$router.push({ path: "/dashboard" });
    },

    onSubmit(values) {
      let orderData = {
        data: {
          type: "orders",
          attributes: {
            status: "New",
            orderType: "UpgradeDevice",
            userId: this.selectedEmployee.id
          },
          relationships: {
            apps: {
              data: []
            },
            devicevariations: {
              data: [
                {
                  type: "devicevariations",
                  id: this.selectedDevice.id
                }
              ]
            }
          }
        }
      };

      if (this.selectedService) {
        orderData.data.attributes["serviceId"] = this.selectedService.id;
      }

      const addressInPackage = _.find(this.addresses, { ...values });

      if (addressInPackage) {
        orderData.data.attributes["addressId"] = addressInPackage.id;
        this.placeOrder(orderData);
      } else {
        const addressPayload = {
          data: {
            type: "addresses",
            attributes: values
          }
        };

        addressAPI.create(
          addressPayload,
          res => {
            const newAddress = store.sync(res.data);
            orderData.data.attributes["addressId"] = newAddress.id;
            this.placeOrder(orderData);
          },
          () => {}
        );
      }
    },

    placeOrder(orderData) {
      this.createOrder(orderData).then(res => {
        this.$router.push({ path: "/dashboard" });
      });
    },

    onStepBack() {
      if (this.upgradeStep > 0) {
        this.setUpgradeStep(this.upgradeStep - 1);
      } else {
        this.selectEmployee(null);
      }
    },

    onSelectDevice(devicevariation) {
      this.setDevice(devicevariation);
    },

    onRequestDevice() {
      this.setUpgradeStep(this.upgradeStep + 1);
    },

    onSelectService(service) {
      this.setService(service);
      this.setUpgradeStep(this.upgradeStep + 1);
    },

    ...mapActions({
      getUserPackages: "placeOrder/getUserPackages",
      selectEmployee: "employee/selectEmployee",
      setDevice: "placeOrder/setDevice",
      setService: "placeOrder/setService",
      createOrder: "placeOrder/createOrder",
      setUpgradeStep: "placeOrder/setUpgradeStep",
      setChangeCarrier: "placeOrder/setChangeCarrier"
    })
  }
};
</script>

<style lang="scss" scoped>
.device-upgrade {
  font-family: Montserrat;
  display: flex;
  height: 100%;

  &-carrier-toggle {
    span {
      text-transform: uppercase;
      color: #657089;
      font-weight: 600;
      font-size: 10px;
    }
  }

  &-main {
    width: 500px;
    height: 100%;
    background-color: white;
    padding-left: 2.5rem;
    padding-right: 2.5rem;
    overflow-x: hidden;

    h1 {
      color: #1f2027;
      font-size: 16px;
      font-weight: 600;
    }
  }
}
</style>
