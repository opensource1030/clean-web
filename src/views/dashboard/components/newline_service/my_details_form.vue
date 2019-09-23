<template>
  <div class="dashboard-form pt-4">
    <b-form @submit.prevent="validateBeforeSubmit">
      <div class="row">
        <div class="col-6">
          <div class="item mb-3">
            <label>User email:</label>
            <div>{{ selectedEmployee.email }}</div>
          </div>
          <div class="item mb-3">
            <label>Supervisor:</label>
            <div>{{ selectedEmployee.supervisorEmail }}</div>
          </div>
          <div class="item mb-3">
            <label>Department:</label>
            <div>{{ selectedEmployee.department }}</div>
          </div>
          <div class="item mb-3">
            <label>Cost center:</label>
            <div>{{ selectedEmployee.costCenter }}</div>
          </div>
        </div>
      </div>

      <hr />

      <div class="row">
        <div class="col-6">
          <div class="item">
            <label>Need a new device?</label>
            <div>
              <toggle :active="needNewDevice" @change="setNeedNewDevice"></toggle>
            </div>
          </div>
        </div>
        <div class="col-6">
          <b-btn variant="default w-100" type="submit">Next</b-btn>
        </div>
      </div>
    </b-form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Toggle from "@/components/toggle";
import HelpPop from "@/components/help_pop";

export default {
  components: {
    Toggle,
    HelpPop
  },

  data() {
    return {
      form: {
        existingCarrier: null,
        phone: null,
        name: null,
        password: null
      }
    };
  },

  created() {
    this.form = { ...this.details };
  },

  computed: {
    ...mapGetters({
      details: "placeOrder/newlineDetails",
      selectedEmployee: "placeOrder/newlineSelectedEmployee",
      needNewDevice: "placeOrder/newlineNeedNewDevice"
    })
  },

  methods: {
    ...mapActions({
      setDetails: "placeOrder/setNewlineDetails",
      setNeedNewDevice: "placeOrder/setNewlineNeedNewDevice"
    }),

    validateBeforeSubmit() {
      if (this.needNewDevice) {
        this.$emit("next");
        return;
      } else {
        this.$validator.validateAll().then(result => {
          if (result) {
            let values = {};

            Object.keys(this.form).forEach(key => {
              if (!!this.form[key]) {
                values[key] = this.form[key];
              }
            });

            this.setDetails(this.form);
            this.$emit("next");
            return;
          }
        });
      }
    }
  }
};
</script>
