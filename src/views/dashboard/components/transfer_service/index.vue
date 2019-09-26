<template>
  <drawer :open="true" :show-close-confirm="true" @close="toggleDrawer">
    <div class="dashboard-drawer">
      <order-form
        v-if="isReviewStep"
        :user="selectedEmployee"
        :addresses="addresses"
        :show-shipping-form="needNewDevice || deviceInfo.needNewSim"
        @submit="onSubmit"
      />

      <user-select-form
        v-if="!selectedEmployee || userPackagesLoading"
        @selectUser="onSelectEmployee"
      />

      <div v-else class="dashboard-drawer-main">
        <div class="dashboard-drawer-title">Transfer Wireless Service Liability</div>

        <steps
          :steps="steps"
          :active-step="step"
          :show-back-button-on-first-step="true"
          @back="onStepBack"
        />

        <my-details-form v-if="isMyDetailStep" @next="onNextStep" />

        <template v-if="isSelectingServiceStep">
          <detail-summary v-if="details.keepExistingService" @next="onNextStep" />

          <div v-else class="dashboard-form pt-4">
            <div class="item d-flex flex-column align-items-center">
              <label>Need a new device?</label>
              <div class="mt-2">
                <toggle :active="needNewDevice" @change="setNeedNewDevice" />
              </div>
            </div>

            <b-tabs class="wa-tabs">
              <b-tab title="Category">
                <services :services="services" @requestService="onSelectService" />
              </b-tab>
            </b-tabs>
          </div>
        </template>

        <template v-if="isSelectingDeviceStep">
          <devices
            v-if="needNewDevice"
            :devices="devices"
            :step="stepInDevice"
            :selected-device="selectedDevice"
            :available-accessories="availableAccessories"
            :selected-accessories="selectedAccessories"
            @continue="onDeviceContinue"
            @selectDevice="setDevice"
            @selectAccessory="setAccessory"
          />

          <device-info-form v-else @next="onNextStep" />
        </template>

        <order-summary
          v-if="isReviewStep"
          :device="needNewDevice ? selectedDevice : null"
          :accessories="needNewDevice ? selectedAccessories : null"
          :service="selectedService"
          :comment="comment"
          :newSimCard="deviceInfo.needNewSim"
          @change="setComment"
        />
      </div>
    </div>
  </drawer>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Drawer from "@/components/drawer";
import Steps from "@/components/steps";
import Toggle from "@/components/toggle";
import Devices from "@/components/devices";
import Services from "@/components/services";
import UserSelectForm from "@/components/user_select_form";
import OrderForm from "@/components/order_form";
import OrderSummary from "@/components/order_summary";
import ExistingServiceForm from "./existing_service_form";
import MyDetailsForm from "./my_details_form";
import DeviceInfoForm from "./device_info_form";
import DetailSummary from "./detail_summary";
import addressAPI from "@/api/address-api";

export default {
  name: "TransferService",

  components: {
    Drawer,
    Steps,
    Toggle,
    Devices,
    Services,
    UserSelectForm,
    ExistingServiceForm,
    MyDetailsForm,
    DeviceInfoForm,
    OrderForm,
    OrderSummary,
    DetailSummary
  },

  data() {
    return {
      steps: [
        { key: "my-details", text: "My Details" },
        { key: "select-service", text: "Select Service" },
        { key: "select-device", text: "Select Device" },
        { key: "preview", text: "Preview" }
      ],
      stepInDevice: "device"
    };
  },

  created() {
    // if (this.userPackages.length <= 0) {
    //   const { id } = this.currentUser;
    //   this.getUserPackages(id);
    // }
  },

  computed: {
    ...mapGetters({
      currentUser: "auth/getProfile",
      step: "placeOrder/transferStep",
      userPackages: "placeOrder/transferUserPackages",
      userPackagesLoading: "placeOrder/transferUserPackagesLoading",
      selectedEmployee: "placeOrder/transferSelectedEmployee",
      selectedDevice: "placeOrder/transferSelectedDevice",
      selectedService: "placeOrder/transferSelectedService",
      availableAccessories: "placeOrder/transferAvailableAccessories",
      selectedAccessories: "placeOrder/transferSelectedAccessories",
      comment: "placeOrder/transferComment",
      needNewDevice: "placeOrder/transferNeedNewDevice",
      details: "placeOrder/transferDetails",
      deviceInfo: "placeOrder/transferDeviceInfo",
      hasOrder: "placeOrder/transferHasOrder",
      devices: "placeOrder/transferDevices",
      services: "placeOrder/transferServices",
      addresses: "placeOrder/transferAddresses"
    }),

    isMyDetailStep() {
      return this.step === 0;
    },

    isSelectingServiceStep() {
      return this.step === 1;
    },

    isSelectingDeviceStep() {
      return this.step === 2;
    },

    isReviewStep() {
      return this.step === 3;
    }
  },

  methods: {
    ...mapActions({
      setStep: "placeOrder/setTransferStep",
      getUserPackages: "placeOrder/getTransferUserPackages",
      setNeedNewDevice: "placeOrder/setTransferNeedNewDevice",
      setEmployee: "placeOrder/setTransferSelectedEmployee",
      setDevice: "placeOrder/setTransferSelectedDevice",
      setAccessory: "placeOrder/setTransferSelectedAccessory",
      setService: "placeOrder/setTransferSelectedService",
      setComment: "placeOrder/setTransferComment",
      createOrder: "placeOrder/createTransferOrder",
      resetOrder: "placeOrder/resetTransfer"
    }),

    toggleDrawer() {
      this.resetOrder(true);
      this.$router.push({ path: "/dashboard" });
    },

    onStepBack() {
      if (
        this.isSelectingDeviceStep &&
        this.needNewDevice &&
        this.stepInDevice === "accessory"
      ) {
        this.stepInDevice = "device";
        return;
      }

      if (this.step > 0) {
        this.setStep(this.step - 1);
      } else {
        this.setEmployee(null);
      }
    },

    onDeviceContinue() {
      if (
        this.stepInDevice === "device" &&
        this.availableAccessories.length > 0
      ) {
        this.stepInDevice = "accessory";
      } else {
        this.onNextStep();
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
      this.getUserPackages(user.id);
      this.setEmployee(user);
    },

    onSubmit(values) {
      let orderData = {
        data: {
          type: "orders",
          attributes: {
            status: "New",
            orderType: "TransferServiceLiability",
            userId: this.selectedEmployee.id,
            extraInfo: JSON.stringify(
              _.omit(this.details, "keepExistingService")
            )
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

      if (this.comment) {
        orderData.data.attributes["notes"] = this.comment;
      }

      if (!this.details.keepExistingService) {
        orderData.data.attributes.serviceId = this.selectedService.id;
      }

      if (this.needNewDevice) {
        orderData.data.relationships.devicevariations.data.push({
          type: "devicevariations",
          id: this.selectedDevice.id
        });

        if (this.selectedAccessories && this.selectedAccessories.length > 0) {
          this.selectedAccessories.forEach(accessory => {
            orderData.data.relationships.devicevariations.data.push({
              type: "devicevariations",
              id: accessory.id
            });
          });
        }

        const addressInPackage = _.find(this.addresses, { ...values });

        // console.log('transfer_service/onSubmit', values, addressInPackage);

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
              orderData.data.attributes["addressId"] = parseInt(
                res.data.data.id
              );
              this.placeOrder(orderData);
            },
            err => {
              console.log(err);
            }
          );
        }
      } else {
        orderData.data.attributes = {
          ...orderData.data.attributes,
          ...this.deviceInfo
        };

        this.placeOrder(orderData);
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
