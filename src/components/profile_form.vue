<template>
  <div class="profile-form dashboard-form">
    <h1 class="mb-3">Edit Profile</h1>

    <i class="fas fa-times" @click="onClose" />

    <b-form @submit.prevent="validateBeforeSubmit">
      <div class="row mb-3">
        <div class="col item" :class="{'is-danger': errors.has('name') }">
          <label>Name *</label>
          <div>
            <b-input name="name" v-model="form.name" v-validate="'required'"></b-input>
            <span v-show="errors.has('name')" class="error">Required</span>
          </div>
        </div>
      </div>

      <div class="row mb-3">
        <div class="col item" :class="{'is-danger': errors.has('position') }">
          <label>Position *</label>
          <div>
            <b-input name="position" v-model="form.position" v-validate="'required'"></b-input>
            <span v-show="errors.has('position')" class="error">Required</span>
          </div>
        </div>
      </div>

      <div class="row mb-3">
        <div class="col item" :class="{'is-danger': errors.has('department') }">
          <label>Department *</label>
          <div>
            <b-input name="department" v-model="form.department" v-validate="'required'"></b-input>
            <span v-show="errors.has('department')" class="error">Required</span>
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
      </div>

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
        name: null,
        position: null,
        department: null,
        email: null,
        city: null,
        state: null
      }
    };
  },

  created() {
    console.log(this.profile);
  },

  computed: {
    ...mapGetters({
      profile: "auth/getProfile"
    })
  },

  methods: {
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

  input[type="text"] {
    height: 30px;
    background-color: transparent;
    border-radius: 4px;
    border: 0.75px solid rgba(127, 161, 255, 0.61);
    color: white;
    font-size: 11px;
  }

  button {
    color: white;
    font-size: 11px;
    font-weight: 600;
  }

  i {
    cursor: pointer;
    position: absolute;
    right: -23px;
    top: -23px;
    color: #20a8d8;
  }

  .error {
    top: calc(100% - 6px);
  }
}
</style>
