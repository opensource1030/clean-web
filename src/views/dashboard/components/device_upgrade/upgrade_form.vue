<template>
  <div class="upgrade-form pt-5">
    <div class="upgrade-form-user">
      <div class="upgrade-form-user-avatar">
        <span>{{ userNameInitial }}</span>
      </div>
      <h1 class="upgrade-form-user-name mb-0">{{ user.firstName }} {{ user.lastName }}</h1>
    </div>

    <div class="upgrade-form-user-profile my-4">
      <div>
        <label>Employee email</label>
        {{ user.email }}
      </div>

      <div>
        <label>Employee ID</label>
        {{ user.id }}
      </div>

      <div>
        <label>Supervisor Email</label>
        {{ user.supervisorEmail }}
      </div>
    </div>

    <div class="shipping-form">
      <template v-if="addresses.length > 0">
        <h1 class="mb-3">Select Address</h1>

        <div class="row mb-5">
          <div class="col">
            <select @change="onPackageAddressChange">
              <option v-for="address of addresses" :value="address.id">{{ address.name }}</option>
            </select>
          </div>
        </div>
      </template>

      <h1 class="mb-3">Shipping info</h1>

      <b-form @submit.prevent="validateBeforeSubmit">
        <div class="row mb-3">
          <div class="col" :class="{'is-danger': errors.has('address') }">
            <label>Address</label>
            <div>
              <b-input name="address" v-model="form.address" v-validate="'required'"></b-input>
              <span v-show="errors.has('address')" class="error">Requird</span>
            </div>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col" :class="{'is-danger': errors.has('address2') }">
            <label>Address 2</label>
            <div>
              <b-input name="address2" v-model="form.address2"></b-input>
              <span v-show="errors.has('address2')" class="error">Requird</span>
            </div>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col" :class="{'is-danger': errors.has('country') }">
            <label>Country</label>
            <div>
              <select
                v-if="addresses.length > 0"
                name="country"
                v-model="form.country"
                v-validate="'required'"
              >
                <option v-for="country of countries" :value="country">{{ country }}</option>
              </select>

              <b-input v-else name="country" v-model="form.country"></b-input>
              <span v-show="errors.has('country')" class="error">Requird</span>
            </div>
          </div>
          <div class="col" :class="{'is-danger': errors.has('postalCode') }">
            <label>Zip code</label>
            <div>
              <b-input name="postalCode" v-model="form.postalCode" v-validate="'required'"></b-input>
              <span v-show="errors.has('postalCode')" class="error">Required</span>
            </div>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col" :class="{'is-danger': errors.has('city') }">
            <label>City</label>
            <div>
              <b-input name="city" v-model="form.city" v-validate="'required'"></b-input>
              <span v-show="errors.has('city')" class="error">Required</span>
            </div>
          </div>
          <div class="col" :class="{'is-danger': errors.has('state') }">
            <label>State</label>
            <div>
              <select
                name="state"
                v-if="addresses.length > 0"
                v-model="form.state"
                v-validate="'required'"
                :disabled="states.length === 0 ? 'disabled' : false"
              >
                <option v-for="state of states" :value="state">{{ state }}</option>
              </select>

              <b-input v-else name="country" v-model="form.country"></b-input>
              <span v-show="errors.has('state')" class="error">Required</span>
            </div>
          </div>
        </div>

        <div class="row mt-4">
          <div class="col">
            <b-btn variant="default w-100" type="submit">Submit order</b-btn>
          </div>
        </div>
      </b-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "DeviceUpgradeForm",

  props: ["user", "addresses"],

  data() {
    return {
      form: {
        address: null,
        address2: null,
        city: null,
        state: null,
        country: null,
        postalCode: null
      }
    };
  },

  created() {
    if (this.addresses.length > 0) {
      this.onPackageAddressChange({ target: { value: this.addresses[0].id } });
    }
  },

  computed: {
    userNameInitial() {
      const { firstName, lastName } = this.user;
      return `${firstName[0]}${lastName[0]}`;
    },

    countries() {
      return _.uniq(_.map(this.addresses, address => address.country));
    },

    states() {
      if (!this.form.country) {
        return [];
      }

      const addressInCountry = _.filter(
        this.addresses,
        address => address.country === this.form.country
      );

      return _.uniq(_.map(addressInCountry, address => address.state));
    }
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

    onPackageAddressChange(evt) {
      const { value } = evt.target;
      const address = _.find(this.addresses, { id: value });

      this.form = {
        ...this.form,
        address: address.address,
        city: address.city,
        state: address.state,
        country: address.country,
        postalCode: address.postalCode
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.upgrade-form {
  background-color: #355bb9;
  color: white;
  height: 100%;
  width: 450px;
  padding-left: 2.5rem;
  padding-right: 2.5rem;

  &-user {
    display: flex;
    align-items: center;
  }

  &-user-avatar {
    height: 36px;
    width: 36px;
    background-color: #ff7000;
    margin-right: 10px;
    border-radius: 36px;
    position: relative;

    span {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      font-weight: bold;
    }
  }

  label {
    color: #a9b5d1;
    font-size: 10px;
    padding-right: 5px;
    text-transform: uppercase;
    margin-bottom: 0;
  }

  h1 {
    font-size: 16px;
    font-weight: 600;
  }
}

.shipping-form {
  label {
    color: #a9b5d1;
    font-size: 10px;
    padding-right: 5px;
    text-transform: uppercase;
    margin-bottom: 0;
  }

  input,
  select {
    width: 100%;
    height: 30px;
    background-color: transparent;
    border: 0.75px solid #afbad4;
    border-radius: 4px;
    color: white;
    padding: 0 0.5rem;
    outline: none;
    font-size: 12px;
  }

  option {
    background: #355bb9;
    color: white;
  }

  .col > div {
    position: relative;
  }

  .error {
    position: absolute;
    top: calc(100% - 3px);
    font-size: 10px;
  }

  .is-danger {
    $danger: #ff690a;

    color: $danger;

    input,
    select {
      border-color: $danger;
    }

    label,
    option {
      color: $danger;
    }
  }
}
</style>
