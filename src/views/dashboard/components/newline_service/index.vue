<template>
  <drawer open="true" @close="toggleDrawer">
    <div class="dashboard-drawer">
      <order-form
        v-if="isReviewStep"
        :user="selectedEmployee"
        :addresses="addresses"
        :show-shipping-form="needNewDevice"
        @submit="onSubmit"
      ></order-form>

      <user-select-form
        v-if="!selectedEmployee"
        @selectUser="setEmployee"
      ></user-select-form>

      <div v-else class="dashboard-drawer-main">
        <h1 class="text-center">Order a New Line of Service</h1>

        <steps
          :steps="steps"
          :active-step="step"
          @back="onStepBack"
        ></steps>

        <my-details-form
          v-if="isMyDetailStep"
          @next="onNextStep"
        ></my-details-form>

        <device-info-form
          v-if="isSelectingDeviceStep && !needNewDevice"
          @next="onNextStep"
        ></device-info-form>

        <div v-if="isSelectingDeviceStep && needNewDevice">
          <b-tabs class="wa-tabs pt-3">
            <b-tab title="Subsided Device">
              <devices
                :devices="devices"
                :selected-device="selectedDevice"
                @requestDevice="onNextStep"
                @selectDevice="onSelectDevice"
              ></devices>
            </b-tab>
          </b-tabs>
        </div>

        <div v-if="isSelectingServiceStep">
          <b-tabs class="wa-tabs pt-3">
            <b-tab title="Category">
              <services :services="services" @requestService="onSelectService"></services>
            </b-tab>
          </b-tabs>
        </div>

        <order-summary
          v-if="isReviewStep"
          :device="needNewDevice ? selectedDevice : null"
          :service="selectedService"
        ></order-summary>
      </div>
    </div>
  </drawer>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Drawer from "@/components/drawer";
import Steps from "@/components/steps";
import Devices from "@/components/devices";
import Services from "@/components/services";
import UserSelectForm from "@/components/user_select_form";
import OrderForm from "@/components/order_form";
import OrderSummary from "@/components/order_summary";
import MyDetailsForm from "./my_details_form";
import DeviceInfoForm from "./device_info_form";

export default {
  components: {
    Drawer,
    Steps,
    Devices,
    Services,
    UserSelectForm,
    MyDetailsForm,
    DeviceInfoForm,
    OrderForm,
    OrderSummary
  },

  data() {
    return {
      steps: [
        { key: "my-details", text: "My Details" },
        { key: "select-device", text: "Select Device" },
        { key: "select-service", text: "Select Service" },
        { key: "preview", text: "Preview" }
      ]
    };
  },

  created() {
    if (this.userPackages.length <= 0) {
      const { id } = this.currentUser;
      this.getUserPackages(id);
    }
  },

  computed: {
    ...mapGetters({
      currentUser: "auth/getProfile",
      userPackages: "placeOrder/userPackages",
      step: "placeOrder/newlineStep",
      selectedEmployee: "placeOrder/newlineSelectedEmployee",
      selectedDevice: "placeOrder/newlineSelectedDevice",
      selectedService: "placeOrder/newlineSelectedService",
      details: "placeOrder/newlineDetails",
      needNewDevice: "placeOrder/newlineNeedNewDevice",
      needNewSim: "placeOrder/newlineNeedNewSim",
      deviceInfo: "placeOrder/newlineDeviceInfo",
      hasOrder: "placeOrder/newlineHasOrder",
      devices: "placeOrder/newlineDevices",
      accessories: "placeOrder/allAccessories",
      services: "placeOrder/newlineServices",
      addresses: "placeOrder/newlineAddresses"
    }),

    isMyDetailStep() {
      return this.step === 0;
    },

    isSelectingDeviceStep() {
      return this.step === 1;
    },

    isSelectingServiceStep() {
      return this.step === 2;
    },

    isReviewStep() {
      return this.step === 3;
    }
  },

  methods: {
    ...mapActions({
      getUserPackages: "placeOrder/getUserPackages",
      setStep: "placeOrder/setNewlineStep",
      setEmployee: "placeOrder/setNewlineSelectedEmployee",
      setDevice: "placeOrder/setNewlineSelectedDevice",
      setService: "placeOrder/setNewlineSelectedService",
      setDetails: "placeOrder/setNewlineDetails",
      setNeedNewDevice: "placeOrder/setNewlineNeedNewDevice",
      setNeedNewSim: "placeOrder/setNewlineNeedNewSim",
      setDeviceInfo: "placeOrder/setNewlineDeviceInfo",
      createOrder: "placeOrder/createNewlineOrder"
    }),

    toggleDrawer() {
      this.$router.push({ path: "/dashboard" });
    },

    onStepBack() {
      if (this.step > 0) {
        this.setStep(this.step - 1);
      }
      // console.log(this.devices);
    },

    onNextStep() {
      this.setStep(this.step + 1);
    },

    onSelectDevice(devicevariation) {
      this.setDevice(devicevariation);
    },

    onSelectService(service) {
      this.setService(service);
      this.onNextStep();
    },

    onSubmit(values) {
      let orderData = {
        data: {
          type: "orders",
          attributes: {
            status: "New",
            orderType: "NewLineOfService",
            userId: this.selectedEmployee.id,
            serviceId: this.selectedService.id
          },
          relationships: {
            apps: {
              data: []
            },
            devicevariations: {
              data: []
            }
          }
        }
      };

      if (this.needNewDevice) {
        orderData.data.relationships.devicevariations.data.push({
          type: "devicevariations",
          id: this.selectedDevice.id
        });
      } else {
        orderData.data.attributes = {
          ...orderData.data.attributes,
          ...this.deviceInfo
        };
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
    }
  }
};
</script>
