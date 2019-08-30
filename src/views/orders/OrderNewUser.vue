<template>
  <b-modal
    id="orders-new-modal"
    modal-class="orders-new-modal"
    size="lg"
    :visible="true"
    :hide-header="true"
    :hide-footer="true"
    @hidden="cancel()"
  >
    <div class="container px-4 py-5">
      <div class="row">
        <div class="col-md-4 my-auto">
          <h5>Ordering on behalf of a user?</h5>
        </div>
        <div class="col-md-8">
          <toggle :active="onBehalfOfUser" @change="onBehalfToggleChange"></toggle>
        </div>
      </div>

      <div class="row mt-4" v-if="onBehalfOfUser">
        <div class="col-md-4 my-auto">
          <h5>Select a user</h5>
        </div>
        <div class="col-md-8">
          <multiselect
            id="ajax"
            v-model="selectedEmployee"
            placeholder="Employee Name - Email"
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
        </div>
      </div>

      <div class="row mt-4">
        <div class="col text-right">
          <b-btn class="mr-3" variant="default" @click="cancel()">Cancel</b-btn>
          <b-btn variant="default" :disabled="disabledNextButton" @click="goNext()">Next</b-btn>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
import _ from "lodash";
import employeeAPI from "@/api/employee-api";
import toggle from "@/components/toggle";

const { Store } = require("yayson")();
const store = new Store();

export default {
  components: {
    toggle
  },

  props: {
    next: {
      type: Function,
      required: true
    },

    cancel: {
      type: Function,
      required: true
    }
  },

  computed: {
    disabledNextButton() {
      return !this.onBehalfOfUser ||
        (this.onBehalfOfUser && this.selectedEmployee)
        ? false
        : "disabled";
    }
  },

  data() {
    return {
      onBehalfOfUser: true,
      selectedEmployee: null,
      employees: []
    };
  },

  created() {
    employeeAPI.search({}, res => {
      this.employees = store
        .sync(res.data)
        .filter(employee => employee.id !== this.$store.state.auth.userId);
    });
  },

  methods: {
    customLabel({ firstName, lastName, email }) {
      return `${firstName} ${lastName} – ${email}`;
    },

    onBehalfToggleChange(value) {
      this.onBehalfOfUser = value;
    },

    goNext() {
      const userId = this.onBehalfOfUser
        ? this.selectedEmployee.id
        : this.$store.state.auth.userId;

      this.$store.dispatch("placeOrder/setUserId", userId);
      this.next();
    }
  }
};
</script>

<style lang="scss">
.orders-new-modal {
  .multiselect {
    font-size: 12px;

    &__tags {
      min-height: 38px;
      padding: 4px 40px 0 8px;
      font-size: 12px;
    }

    &__placeholder {
      padding: 0;
      margin: 0;
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
    }
  }

  h5 {
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 0;
  }
}
</style>
