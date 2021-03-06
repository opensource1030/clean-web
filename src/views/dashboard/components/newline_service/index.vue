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
        <div class="dashboard-drawer-title">Order a New Line of Service</div>

        <steps
          :steps="steps"
          :active-step="step"
          :show-back-button-on-first-step="true"
          @back="onStepBack"
        />

        <my-details-form v-if="isMyDetailStep" @next="onNextStep" />

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

        <div v-if="isSelectingServiceStep">
          <b-tabs class="wa-tabs pt-3">
            <b-tab title="Category">
              <services :services="services" @requestService="onSelectService" />
            </b-tab>
          </b-tabs>
        </div>

        <order-summary
          v-if="isReviewStep"
          :device="needNewDevice ? selectedDevice : null"
          :accessories="needNewDevice ? selectedAccessories: null"
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
import addressAPI from "@/api/address-api";
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
      ],
      stepInDevice: "device"
    };
  },

  computed: {
    ...mapGetters({
      currentUser: "auth/getProfile",
      step: "placeOrder/newlineStep",
      userPackages: "placeOrder/newlineUserPackages",
      userPackagesLoading: "placeOrder/newlineUserPackagesLoading",
      selectedEmployee: "placeOrder/newlineSelectedEmployee",
      selectedDevice: "placeOrder/newlineSelectedDevice",
      availableAccessories: "placeOrder/newlineAvailableAccessories",
      selectedAccessories: "placeOrder/newlineSelectedAccessories",
      selectedService: "placeOrder/newlineSelectedService",
      comment: "placeOrder/newlineComment",
      details: "placeOrder/newlineDetails",
      needNewDevice: "placeOrder/newlineNeedNewDevice",
      deviceInfo: "placeOrder/newlineDeviceInfo",
      hasOrder: "placeOrder/newlineHasOrder",
      devices: "placeOrder/newlineDevices",
      accessories: "placeOrder/newlineAccessories",
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
      setStep: "placeOrder/setNewlineStep",
      getUserPackages: "placeOrder/getNewlineUserPackages",
      setEmployee: "placeOrder/setNewlineSelectedEmployee",
      setDevice: "placeOrder/setNewlineSelectedDevice",
      setAccessory: "placeOrder/setNewlineSelectedAccessory",
      setService: "placeOrder/setNewlineSelectedService",
      setComment: "placeOrder/setNewlineComment",
      setDetails: "placeOrder/setNewlineDetails",
      setNeedNewDevice: "placeOrder/setNewlineNeedNewDevice",
      setDeviceInfo: "placeOrder/setNewlineDeviceInfo",
      createOrder: "placeOrder/createNewlineOrder",
      resetOrder: "placeOrder/resetNewline",
      getEmployee: "employee/getOne",
      updateSpecificEmployee: "employee/updateSpecificEmployee"
    }),

    toggleDrawer() {
      this.resetOrder(true);
      this.$router.push({ path: "/dashboard" });
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
            orderType: "NewLineOfService",
            userId: this.selectedEmployee.id,
            serviceId: this.selectedService.id,
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

      if (values != null) {
        if (values.supervisor.needsChange) {
          this.getEmployee(values.supervisor.userId).then(res => {
            let rawEmployee = res.data.data
            let params = {
              data: {
                type: "users",
                id: parseInt(rawEmployee.id),
                attributes: {
                  supervisorEmail: values.supervisor.email,
                }
              }
            }
            this.updateSpecificEmployee(params).then(res => {
              this.$store.dispatch('placeOrder/updateSupervisorEmailNewline', params.data.attributes.supervisorEmail)
              this.$store.dispatch('auth/getProfileAfterUpdate').then(res => resolve(res), err => reject(err))
              delete values["supervisor"]
            })
          })
        } else {
          delete values["supervisor"]
        }
      }

      if (this.comment) {
        orderData.data.attributes["notes"] = this.comment;
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
