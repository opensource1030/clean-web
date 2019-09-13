<template>
  <drawer open="true" @close="toggleDrawer">
    <div class="dashboard-drawer">
      <order-form
        v-if="isReviewStep"
        :user="selectedEmployee"
        :addresses="addresses"
        :show-shipping-form="true"
        @submit="onSubmit"
      ></order-form>

      <user-select-form
        v-if="!selectedEmployee || userPackagesLoading"
        @selectUser="onSelectEmployee"
      ></user-select-form>

      <div v-else class="dashboard-drawer-main">
        <h1 class="text-center">Upgrade Device</h1>

        <steps
          :steps="steps"
          :active-step="step"
          :show-back-button-on-first-step="true"
          @back="onStepBack"
        ></steps>

        <div v-if="isSelectingDeviceStep" class="device-upgrade-device-step">
          <div class="device-upgrade-carrier-toggle pt-3">
            <span>Change carrier?</span>
            <toggle :active="changeCarrier" @change="setChangeCarrier"></toggle>
          </div>

          <devices
            :devices="devices"
            :selected-device="selectedDevice"
            :device-accessories="deviceAccessories"
            :available-accessories="availableAccessories"
            :selected-accessories="selectedAccessories"
            @requestDevice="onNextStep"
            @selectDevice="setDevice"
            @selectAccessory="setAccessory"
          ></devices>
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
          :service="changeCarrier ? selectedService : null"
          :comment="comment"
          @change="setComment"
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
import Services from "@/components/services";
import UserSelectForm from "@/components/user_select_form";
import OrderForm from "@/components/order_form";
import OrderSummary from "@/components/order_summary";

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
    OrderForm,
    OrderSummary
  },

  created() {
    // if (this.userPackages.length <= 0) {
    //   const { id } = this.currentUser;
    //   this.getUserPackages(id);
    // }
  },

  computed: {
    isSelectingDeviceStep() {
      return this.step === 0;
    },

    isSelectingServiceStep() {
      return this.changeCarrier && this.step === 1;
    },

    isReviewStep() {
      return this.step === this.steps.length - 1;
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
      userRole: "auth/getRole",
      step: "placeOrder/upgradeStep",
      userPackages: "placeOrder/upgradeUserPackages",
      userPackagesLoading: "placeOrder/upgradeUserPackagesLoading",
      selectedEmployee: "placeOrder/upgradeSelectedEmployee",
      selectedDevice: "placeOrder/upgradeSelectedDevice",
      selectedService: "placeOrder/upgradeSelectedService",
      deviceAccessories: "placeOrder/upgradeDeviceAccessories",
      availableAccessories: "placeOrder/upgradeAvailableAccessories",
      selectedAccessories: "placeOrder/upgradeSelectedAccessories",
      comment: "placeOrder/upgradeComment",
      changeCarrier: "placeOrder/upgradeChangeCarrier",
      devices: "placeOrder/upgradeDevices",
      services: "placeOrder/upgradeServices",
      addresses: "placeOrder/upgradeAddresses"
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

      if (this.comment) {
        orderData.data.attributes["notes"] = this.comment;
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
      if (this.step > 0) {
        this.setStep(this.step - 1);
      } else {
        this.setEmployee(null);
      }
    },

    onNextStep() {
      this.setStep(this.step + 1);
    },

    onSelectService(service) {
      this.setService(service);
      this.onNextStep();
    },

    onSelectEmployee(user) {
      // console.log('upgrade onSelectEmployee', user)
      this.getUserPackages(user.id).then(res => {
        // console.log('upgrade getUserPackages', res)
        // console.log(this.userPackages)
      })
      this.setEmployee(user)
    },

    ...mapActions({
      setStep: "placeOrder/setUpgradeStep",
      getUserPackages: "placeOrder/getUpgradeUserPackages",
      setEmployee: "placeOrder/setUpgradeSelectedEmployee",
      setDevice: "placeOrder/setUpgradeSelectedDevice",
      setAccessory: "placeOrder/setUpgradeSelectedAccessory",
      setService: "placeOrder/setUpgradeSelectedService",
      setComment: "placeOrder/setUpgradeComment",
      setChangeCarrier: "placeOrder/setUpgradeChangeCarrier",
      createOrder: "placeOrder/createUpgradeOrder"
    })
  }
};
</script>
