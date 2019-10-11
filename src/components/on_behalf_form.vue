<template>
  <div class="on-behalf-form">
    <div class="on-behalf-form-wrapper">
      <!--      <div class="on-behalf-form-title">For whom you are ordering?</div>-->
      <div class="on-behalf-form-title">Search Users</div>

      <div class="on-behalf-form-section pt-1">
        <!--        <span>Upgrade another user</span>-->

        <multiselect
          id="user-select"
          placeholder="User's email address"
          track-by="id"
          label="username"
          :loading="isGettingEmployees"
          :value="selectedEmployee"
          :custom-label="customLabel"
          :options="employees"
          :multiple="false"
          :searchable="true"
          :internal-search="false"
          :show-labels="false"
          :select-label="''"
          :close-on-select="true"
          :clear-on-select="false"
          :hide-selected="false"
          @select="selectEmployee"
          @search-change="asyncSearch"
        />

        <div v-if="selectedEmployee" class="on-behalf-form-employee-detail my-4">
          <div>
            <label>User email:</label>
            {{ selectedEmployee.email }}
          </div>

          <div v-if="selectedEmployee.supervisorEmail">
            <label>Supervisor:</label>
            {{ selectedEmployee.supervisorEmail }}
          </div>

          <div v-for="udl of selectedEmployee.udlvalues">
            <label>{{ udl.udlName }}:</label>
            {{ udl.udlValue }}
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="allocations.length === 0 && !isGettingAllocations && selectedEmployee"
      class="device-container"
    >
      <h4 class="mt-3 no-devices-message">No Devices for this employee</h4>
    </div>

    <div v-if="allocations.length > 0" class="device-container">
      <h4 class="mt-3">Devices</h4>
      <ul class="device-list list-unstyled mt-3 mx-0">
        <li
          v-for="(allocation, index) in allocations"
          :key="`device-item-${index}`"
          class="device-item"
          :class="{ 'active':  activeAllocation && allocation.mobile_number == activeAllocation.mobile_number }"
          no-body
        >
          <label @click="setAllocation(allocation)">
            <input type="checkbox" />
            <div>
              <b>{{ allocation.device }}</b>
            </div>
            <div>
              <b>ATT</b>
              {{ allocation.mobile_number | phone }}
            </div>
            <i class="fa fa-angle-right"></i>
          </label>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
import employeeAPI from "@/api/employee-api";
import Toggle from "@/components/toggle";

export default {
  name: "OnBehalfForm",

  components: {
    Toggle
  },

  data() {
    return {
      employees: [],
      allocations: [],
      udlvalues: {},
      activeAllocation: null,
      isGettingEmployees: false,
      isGettingAllocations: false
    };
  },

  props: ["selectedEmployee"],

  computed: {
    ...mapGetters({
      allEmployees: "employee/allEmployees",
      profile: "auth/getProfile",
      udls: "auth/getUdls"
    })
  },

  watch: {
    selectedEmployee(newVal) {
      this.allocations = [];
      this.activeAllocation = null;
      this.udlvalues = {};
      this.isGettingEmployees = false;
      this.isGettingAllocations = false;

      if (newVal) {
        this.getAllocations(newVal.id);
        this.getUserPackages(newVal.id);
      }
    }
  },

  methods: {
    customLabel({ firstName, lastName, email }) {
      return `${firstName} ${lastName} (${email})`;
    },

    selectEmployee(employee) {
      this.$emit("selectEmployee", employee);
    },

    getAllocations(employeeId) {
      this.allocations = [];

      this.isGettingAllocations = true;

      this.getEmployeeAllocations(employeeId)
        .then(allocations => {
          this.allocations = allocations;
          this.isGettingAllocations = false;
        })
        .catch(err => {
          this.isGettingAllocations = false;
          this.allocations = [];
        });
    },

    asyncSearch(query) {
      this.isGettingEmployees = true;

      this.searchEmployees({ query: query })
        .then(res => {
          this.employees = [...res];
          this.isGettingEmployees = false;
        })
        .catch(err => {
          console.log(err);
          this.isGettingEmployees = false;
        });
    },

    getValue(udlName) {
      return _.get(this.udlvalues, udlName);
    },

    selectUdlValue(udl) {
      this.udlvalues[udl.udlName] = udl;
      this.$forceUpdate();
    },

    setAllocation(allocation) {
      this.activeAllocation = allocation;
      this.$emit("setAllocation", allocation);
    },

    ...mapActions({
      searchEmployees: "employee/searchByEmail",
      getEmployeeAllocations: "employee/getEmployeeAllocations",
      getUserPackages: "placeOrder/getUpgradeUserPackages"
    })
  }
};
</script>

<style lang="scss">
.on-behalf-form {
  font-family: Montserrat;
  padding: 10px 0;
  margin: 0 -40px;

  &-wrapper {
    padding: 0 40px;
  }

  .multiselect {
    font-size: 10px;
    font-weight: normal;
    font-weight: 500;
    color: #1f2027;
    line-height: 13px;

    &__content-wrapper {
      border: 0.75px solid #afbad4;
      border-top: none;
      max-height: 290px;
      background: #355bb9;
    }

    &__option {
      padding: 12px;
      min-height: initial;
      color: white !important;

      &--highlight,
      &--selected {
        background: transparent !important;
        font-weight: normal !important;
      }

      &--highlight {
        color: inherit;
      }

      &--selected,
      &:hover {
        color: #20a8d8 !important;
      }
    }

    &__tags {
      min-height: 38px;
      padding: 12px 40px 0 12px;
      font-size: 10px;
      border: 0.75px solid #afbad4;
      background: transparent;
    }

    &__placeholder {
      padding: 0;
      margin: 0;
      color: white;
    }

    &__input,
    &__single {
      font-size: 10px;
      margin-top: -3px;
      padding: 0;
      margin-bottom: 0;
      background: transparent;
      color: white;
    }

    &__select {
      height: 36px;

      &::before {
        border-color: #20a8d8 transparent transparent;
      }
    }

    &__spinner {
      background: #355bb9;
      border-radius: 5px;
    }

    &__input::placeholder {
      color: white;
    }
  }

  &-title {
    text-align: center;
    color: white;
    font-size: 13px;
    font-weight: 600;
  }

  &-section {
    display: flex;
    flex-direction: column;
    align-items: center;

    & > span {
      text-transform: uppercase;
      font-size: 10px;
      margin-bottom: 1rem;
    }

    button {
      height: 37px;
      width: 165px;
      border-radius: 3px;
      font-size: 11px;
    }
  }

  &-separator {
    position: relative;
    border-color: #afbad4;
    color: #afbad4;

    &::after {
      position: absolute;
      left: 50%;
      top: 50%;
      background-color: white;
      content: attr(data-text);
      transform: translate(-50%, -50%);
      padding: 0 1.5rem;
    }
  }

  &-employee-detail {
    font-size: 10px;
    text-align: left;
    padding: 1.5rem;
    background-color: rgba(32, 168, 216, 0.21);
    border-radius: 4px;

    label {
      width: 85px;
      margin-bottom: 0;
      color: #20a8d8;
      line-height: 1.3;
    }
  }

  .device-container {
    h4 {
      padding: 0 40px;
    }

    .no-devices-message {
      font-size: 10px;
      text-align: center;
    }
  }
}
</style>
