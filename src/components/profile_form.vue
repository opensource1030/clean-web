<template>
  <div class="profile-form dashboard-form">
    <h1 class="mb-3">Edit Profile</h1>

    <i class="fas fa-times" @click="onClose" />

    <b-form @submit.prevent="validateBeforeSubmit">
      <div class="row mb-3">
        <div class="col item" :class="{'is-danger': errors.has('firstName') }">
          <label>First name *</label>
          <div>
            <b-input name="firstName" v-model="form.firstName" v-validate="'required'"></b-input>
            <span v-show="errors.has('firstName')" class="error">Required</span>
          </div>
        </div>
      </div>

      <div class="row mb-3">
        <div class="col item" :class="{'is-danger': errors.has('lastName') }">
          <label>Last name *</label>
          <div>
            <b-input name="lastName" v-model="form.lastName" v-validate="'required'"></b-input>
            <span v-show="errors.has('lastName')" class="error">Required</span>
          </div>
        </div>
      </div>

      <div class="row mb-3">
        <div class="col item" :class="{'is-danger': errors.has('email') }">
          <label>Email *</label>
          <div>
            <b-input name="email" v-model="form.email" v-validate="'required'"></b-input>
            <span v-show="errors.has('email')" class="error">Required</span>
          </div>
        </div>
      </div>

      <div class="row mb-3">
        <div class="col item" :class="{'is-danger': errors.has('supervisorEmail') }">
          <label>Supervisor Email *</label>
          <div>
            <b-input name="supervisorEmail" v-model="form.supervisorEmail" v-validate="'required'"></b-input>
            <span v-show="errors.has('supervisorEmail')" class="error">Required</span>
          </div>
        </div>
      </div>

      <div v-for="udl of udls" class="row mb-3">
        <div class="col item">
          <label>{{ udl.name }} *</label>
          <div>
            <select :name="udl.name" v-model="form.udlvalues[udl.name]">
              <option v-for="elem of udl.udlvalues" :value="elem.udlId">{{ elem.udlValue }}</option>
            </select>
          </div>
        </div>
      </div>

      <!-- <div class="row mb-3">
        <div class="col item" :class="{'is-danger': errors.has('city') }">
          <label>City *</label>
          <div>
            <b-input name="city" v-model="form.city" v-validate="'required'"></b-input>
            <span v-show="errors.has('city')" class="error">Required</span>
          </div>
        </div>

        <div class="col item" :class="{'is-danger': errors.has('state') }">
          <label>State *</label>
          <div>
            <b-input name="state" v-model="form.state" v-validate="'required'"></b-input>
            <span v-show="errors.has('state')" class="error">Required</span>
          </div>
        </div>
      </div>-->

      <div class="row mt-4">
        <div class="col">
          <b-btn variant="default w-100" type="submit">Save</b-btn>
        </div>
      </div>
    </b-form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ProfileForm",

  data() {
    return {
      form: {
        firstName: null,
        lastName: null,
        email: null,
        supervisorEmail: null,
        udlvalues: {}
      }
    };
  },

  created() {
    this.initializeData(this.profile);
  },

  watch: {
    profile(newVal) {
      this.initializeData(newVal);
    }
  },

  computed: {
    ...mapGetters({
      profile: "auth/getProfile",
      udls: "auth/getUdls"
    })
  },

  methods: {
    initializeData(profile) {
      this.form = {
        ...this.form,
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        supervisorEmail: profile.supervisorEmail
      };

      const udls = _.get(profile, "companies.0.udls", []);
      const userUdls = _.get(profile, "udlvalues");

      udls.forEach(udl => {
        this.form.udlvalues[udl.name] = _.get(
          _.find(userUdls, { udlName: udl.name }),
          "udlId"
        );
      });
    },

    validateBeforeSubmit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          let values = {};

          Object.keys(this.form).forEach(key => {
            if (!!this.form[key]) {
              values[key] = this.form[key];
            }
          });

          this.$emit("submit", values);
          return;
        }
      });
    },

    onClose() {
      this.$emit("close");
    }
  }
};
</script>

<style lang="scss" scoped>
.profile-form {
  position: relative;

  h1 {
    color: white;
    font-size: 12px;
    font-weight: 600;
    line-height: 15px;
  }

  label {
    color: #abc4ff;
    font-size: 10px;
    font-weight: 600;
    line-height: 13px;
    text-transform: uppercase;
  }

  input[type="text"],
  select {
    width: 100%;
    height: 30px;
    background-color: transparent;
    border-radius: 4px;
    border: 0.75px solid rgba(127, 161, 255, 0.61);
    color: white;
    font-size: 11px;
    outline: none;
  }

  button {
    color: white;
    font-size: 11px;
    font-weight: 600;
  }

  i {
    position: absolute;
    right: -23px;
    top: -23px;
    cursor: pointer;

    &:hover {
      color: #20a8d8;
    }
  }

  .error {
    top: calc(100% - 6px);
    left: 0;
  }
}
</style>
