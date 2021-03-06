<template>
  <drawer :open="true" :show-close-confirm="true" @close="toggleDrawer">
    <div class="dashboard-drawer">
      <order-form
        v-if="isReviewStep"
        :user="selectedEmployee"
        :addresses="addresses"
        :show-shipping-form="true"
        @submit="onSubmit"
      />

      <user-select-form
        v-if="!selectedEmployee || userPackagesLoading"
        @selectUser="onSelectEmployee"
      />

      <div v-else class="dashboard-drawer-main">
        <div class="dashboard-drawer-title">Order Accessories</div>

        <steps
          :steps="steps"
          :active-step="step"
          :show-back-button-on-first-step="true"
          @back="onStepBack"
        />

        <accessories
          v-if="isSelectingAccessoriesStep"
          :available-accessories="accessories"
          :selected-accessories="selectedAccessories"
          @selectAccessory="setAccessory"
          @continue="onNextStep"
        />

        <order-summary v-if="isReviewStep" :accessories="accessories" />
      </div>
    </div>
  </drawer>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import addressAPI from "@/api/address-api";
import Drawer from "@/components/drawer";
import Steps from "@/components/steps";
import UserSelectForm from "@/components/user_select_form";
import OrderForm from "@/components/order_form";
import Accessories from "./accessories";
import OrderSummary from "./order_summary";

export default {
  components: {
    Drawer,
    Steps,
    Accessories,
    UserSelectForm,
    OrderForm,
    OrderSummary
  },

  data() {
    return {
      steps: [
        { key: "select-accessories", text: "Select Accessories" },
        { key: "review", text: "Review" }
      ]
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
      step: "placeOrder/accessoryStep",
      userPackages: "placeOrder/accessoryUserPackages",
      userPackagesLoading: "placeOrder/accessoryUserPackagesLoading",
      selectedEmployee: "placeOrder/accessorySelectedEmployee",
      selectedAccessories: "placeOrder/accessorySelectedAccessories",
      hasOrder: "placeOrder/accessoryHasOrder",
      accessories: "placeOrder/accessoryAccessories",
      addresses: "placeOrder/accessoryAddresses"
    }),

    isSelectingAccessoriesStep() {
      return this.step === 0;
    },

    isReviewStep() {
      return this.step === 1;
    }
  },

  methods: {
    ...mapActions({
      setStep: "placeOrder/setAccessoryStep",
      getUserPackages: "placeOrder/getAccessoryUserPackages",
      setEmployee: "placeOrder/setAccessorySelectedEmployee",
      setAccessory: "placeOrder/setAccessorySelectedAccessory",
      createOrder: "placeOrder/createAccessoryOrder",
      resetOrder: "placeOrder/resetAccessory",
      getEmployee: "employee/getOne",
      updateSpecificEmployee: "employee/updateSpecificEmployee"
    }),

    toggleDrawer() {
      this.resetOrder(true);
      this.$router.push({ path: "/dashboard" });
    },

    onStepBack() {
      if (this.step > 0) {
        this.setStep(this.step - 1);
      } else {
        this.setEmployee(null);
      }
      // console.log(this.accessories);
    },

    onNextStep() {
      this.setStep(this.step + 1);
      // console.log(this.accessories);
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
            orderType: "Accessories",
            userId: this.selectedEmployee.id
            // serviceId: this.selectedService.id
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
              this.$store.dispatch('placeOrder/setAccessoryUpdateSupervisorEmail', params.data.attributes.supervisorEmail)
              this.$store.dispatch('auth/getProfileAfterUpdate').then(res => resolve(res), err => reject(err))
              delete values["supervisor"]
            })
          })
        } else {
          delete values["supervisor"]
        }
      }

      for (let accessory of this.selectedAccessories) {
        orderData.data.relationships.devicevariations.data.push({
          type: "devicevariations",
          id: accessory.id
        });
      }

      const addressInPackage = _.find(this.addresses, { ...values });

      // console.log('accessories/onSubmit', values, addressInPackage);

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
            orderData.data.attributes["addressId"] = parseInt(res.data.data.id);
            this.placeOrder(orderData);
          },
          err => {
            console.log(err);
          }
        );
      }
    },

    placeOrder(orderData) {
      // console.log('accessories placeOrder', orderData);
      this.createOrder(orderData).then(res => {
        this.$router.push({ path: "/dashboard" });
      });
    }
  }
};
</script>
