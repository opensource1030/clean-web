<template>
  <div class="user-select-form text-center">
    <h1>For whom you are ordering?</h1>

    <div class="user-select-form-section py-5">
      <h2>Ordering for my self</h2>
      <b-btn variant="default" @click="goNext('me')">Continue</b-btn>
    </div>

    <hr class="user-select-form-separator" data-text="or" />

    <div class="user-select-form-section pt-5">
      <h2>On behalf of other user</h2>

      <multiselect
        id="ajax"
        v-model="selectedEmployee"
        placeholder="Select user"
        track-by="id"
        label="username"
        :custom-label="customLabel"
        :options="employees"
        :multiple="false"
        :searchable="true"
        :show-labels="false"
        :select-label="''"
        :close-on-select="true"
        :clear-on-select="false"
        :hide-selected="false"
      >
        <span slot="noResult" style="dispay: block;">
          No users found.
          <router-link to="/employees/new" style="width: auto; float: right;">Create User</router-link>
        </span>
      </multiselect>

      <div v-if="selectedEmployee" class="user-select-form-employee-detail">
        <label>User email:</label>
        {{ selectedEmployee.email }}
        <br />
        <label>Supervisor:</label>
        {{ selectedEmployee.supervisorEmail }}
        <br />
        <label>Department:</label>
        {{ selectedEmployee.department }}
        <br />
        <label>Cost center:</label>
        {{ selectedEmployee.costCenter }}
        <br />
      </div>

      <b-btn variant="default" :disabled="disabledNextButton" @click="goNext('other')">Continue</b-btn>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
import _ from "lodash";
import employeeAPI from "@/api/employee-api";
import toggle from "@/components/toggle";

const { Store } = require("yayson")();
const store = new Store();

export default {
  name: "UserSelectForm",

  components: {
    toggle
  },

  computed: {
    disabledNextButton() {
      return this.selectedEmployee ? false : "disabled";
    },

    ...mapGetters({
      employees: "employee/allEmployees",
      currentUser: "auth/getProfile"
    })
  },

  data() {
    return {
      onBehalfOfUser: true,
      selectedEmployee: null
    };
  },

  created() {
    this.getAll();
  },

  methods: {
    customLabel({ firstName, lastName }) {
      return `${firstName} ${lastName}`;
    },

    goNext(type) {
      const user = type === "me" ? this.currentUser : this.selectedEmployee;

      this.$emit("selectUser", user);
    },

    ...mapActions({
      getAll: "employee/getAll"
    })
  }
};
</script>

<style lang="scss">
.user-select-form {
  width: 500px;
  height: 100%;
  background-color: white;
  font-family: Montserrat;
  padding: 4rem;
  font-weight: 600;

  .multiselect {
    font-size: 12px;
    margin: 1rem 0 2rem 0;
    font-weight: normal;
    font-weight: 500;
    width: 235px;

    &__tags {
      min-height: 38px;
      padding: 4px 40px 0 15px;
      font-size: 12px;
      border: 0.75px solid #afbad4;
    }

    &__placeholder {
      padding: 0;
      margin: 0;
      color: #1f2027;
    }

    &__input,
    &__single {
      font-size: 12px;
      margin-top: 4px;
      padding: 0;
      margin-bottom: 0;
    }

    &__select {
      height: 36px;

      &::before {
        border-color: #20a8d8 transparent transparent;
      }
    }
  }

  h1 {
    color: #1f2027;
    font-size: 16px;
    font-weight: 600;
  }

  &-section {
    display: flex;
    flex-direction: column;
    align-items: center;

    h2 {
      text-transform: uppercase;
      color: #657089;
      font-size: 10px;
      margin-bottom: 1rem;
    }

    button {
      height: 37px;
      width: 165px;
      border-radius: 3px;
      background-color: #20a8d8;
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
    width: 350px;
    color: #1f2027;
    font-size: 10px;
    text-align: left;
    padding: 1.5rem;
    margin-bottom: 2rem;
    background-color: rgba(32, 168, 216, 0.21);
    border-radius: 4px;

    label {
      width: 85px;
      margin-bottom: 0;
      color: #20a8d8;
    }
  }
}
</style>
