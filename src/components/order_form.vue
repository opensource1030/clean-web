<template>
  <div class="order-form">
    <div class="order-form-user">
      <div class="order-form-user-avatar">
        <span>{{ userNameInitial }}</span>
      </div>
      <div class="order-form-heading">{{ user.firstName }} {{ user.lastName }}</div>
    </div>

    <div class="order-form-user-profile my-4">
      <div>
        <label>Employee email</label>
        {{ user.email }}
      </div>

      <div>
        <label>Employee ID</label>
        {{ user.id }}
      </div>

      <div v-if="!showSupervisorField">
        <label>Supervisor Email</label>
        {{ user.supervisorEmail }}
      </div>

    </div>

    <div v-if="showShippingForm || showSupervisorField" class="shipping-form">

      <b-form @change="onFormChange" @submit.prevent="onSubmitWithAddress">

        <template v-if="showSupervisorField">
          <div class="order-form-heading mb-3">Supervisor Email&nbsp;<span>*</span></div>
          <div class="row mb-4">
            <div class="col item" :class="{'is-danger': errors.has('supervisor-email') }">
              <div>
                <b-input name="supervisor-email" v-model="form.supervisor.email" v-validate="'required|email'"></b-input>
                <span v-if="errors.has('supervisor-email')" class="error">{{errors.first('supervisor-email')}}</span>
              </div>
            </div>
          </div>
        </template>

        <div v-if="showShippingForm">
          <template v-if="addresses.length > 0">
            <div class="order-form-heading mb-3">Select Address</div>

            <div class="row mb-4">
              <div class="col">
                <select @change="onPackageAddressChange" v-model="location">
                  <option v-for="address of addresses" :value="address.id">{{ address.name }}</option>
                  <option :selected="addresses.length == 0" :value="customlocation">Custom Location</option>
                </select>
              </div>
            </div>
          </template>

          <div class="order-form-heading mb-3">Shipping info</div>

          <div class="row mb-3">
            <div class="col item" :class="{'is-danger': errors.has('address') }">
              <label>
                Address
                <span>*</span>
              </label>
              <div>
                <b-input @change="customLocation()" name="address" v-model="form.address" v-validate="'required'"></b-input>
                <span v-show="errors.has('address')" class="error">Required</span>
              </div>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col item" :class="{'is-danger': errors.has('address2') }">
              <label>Address 2</label>
              <div>
                <b-input @change="customLocation()" name="address2" v-model="form.address2"></b-input>
                <span v-show="errors.has('address2')" class="error">Required</span>
              </div>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col item" :class="{'is-danger': errors.has('country') }">
              <label>
                Country
                <span>*</span>
              </label>
              <div>
                <b-input @change="customLocation()" name="country" v-model="form.country"></b-input>
                <span v-show="errors.has('country')" class="error">Required</span>
              </div>
            </div>
            <div class="col item" :class="{'is-danger': errors.has('postalCode') }">
              <label>
                Zip code
                <span>*</span>
              </label>
              <div>
                <b-input @change="customLocation()" name="postalCode" v-model="form.postalCode" v-validate="'required'"></b-input>
                <span v-show="errors.has('postalCode')" class="error">Required</span>
              </div>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col item" :class="{'is-danger': errors.has('city') }">
              <label>
                City
                <span>*</span>
              </label>
              <div>
                <b-input @change="customLocation()" name="city" v-model="form.city" v-validate="'required'"></b-input>
                <span v-show="errors.has('city')" class="error">Required</span>
              </div>
            </div>
            <div class="col item" :class="{'is-danger': errors.has('state') }">
              <label>
                State
                <span>*</span>
              </label>
              <div>
                <b-input @change="customLocation()" name="state" v-model="form.state"></b-input>
                <span v-show="errors.has('state')" class="error">Required</span>
              </div>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col item" :class="{'is-danger': errors.has('attn') }">
              <label>Attn</label>
              <div>
                <b-input @change="customLocation()" name="attn" v-model="form.attn"></b-input>
                <span v-show="errors.has('attn')" class="error">Required</span>
              </div>
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

    <div v-else>
      <b-btn variant="default w-100" @click="onSubmitNoAddress">Submit order</b-btn>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  name: "OrderForm",

  props: ["user", "addresses", "showShippingForm"],

  data() {
    return {
      form: {
        supervisor: {
          email: this.user.supervisorEmail,
          userId: this.user.id,
          needsChange: true,
        },
        address: null,
        address2: null,
        city: null,
        state: null,
        country: null,
        postalCode: null,
        attn: null
      },
      location: "",
      customlocation: "Custom Location",
      showSupervisorField: true
    };
  },

  created() {
    this.location = this.customlocation;
    if (this.addresses.length > 0) {
      this.location = this.addresses[0].id;
    }
    this.onPackageAddressChange({ target: { value: this.location } });
  },

  mounted() {
    let domainFoundFlag = false
    const supervisorDomain = this.user.supervisorEmail.replace(/.*@/, "")
    this.allowedDomains.forEach(domain => {
      (supervisorDomain == domain) ? domainFoundFlag = true : null
    })
    this.$validator.validate('supervisor-email', this.user.supervisorEmail).then(res => {
      if (domainFoundFlag) {
        if (res) {
          this.showSupervisorField = false
          this.needsChange = false
        }
      }
    })
    this.$validator.reset()
  },

  computed: {

    ...mapGetters({
      allowedDomains: 'auth/getAllowedDomains'
    }),

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
    onSubmitWithAddress() {

      let domainFoundFlag = false
      const supervisorDomain = this.form.supervisor.email.replace(/.*@/, "")
      this.allowedDomains.forEach(domain => {
        (supervisorDomain == domain) ? domainFoundFlag = true : null
      })

      this.$validator.validateAll().then(result => {
        // Verify that employee domain is inside the allowed domains...
        if (!domainFoundFlag) {
          this.$validator.errors.add({
            field: 'supervisor-email',
            msg: 'Supervisor email domain not allowed or not active'
          }); 
        }
        // Guards above must be passed to move forward...
        if (domainFoundFlag) {
          if (result) {
            let values = this.getNonEmptyValues()
            this.$emit("submit", values);
            return;
          }
        }
      });

    },

    onSubmitNoAddress() {
      this.$emit("submit");
    },

    getNonEmptyValues() {
      let values = {};
      Object.keys(this.form).forEach(key => {
        if (!!this.form[key]) {
          values[key] = this.form[key];
        }
      });
      return values
    },

    customLocation() {
      this.location = this.customlocation
    },

    onPackageAddressChange(evt, isCleanEvt) {
      const { value } = evt.target;

      var address = _.find(this.addresses, { id: value });

      if (address == undefined) {
        address = {
          address: null,
          address2: null,
          city: null,
          state: null,
          country: null,
          postalCode: null,
          attn: null
        };
      }

      if (isCleanEvt) {
        address = {
          address: this.form.address,
          address2: this.form.address2,
          city: this.form.city,
          state: this.form.state,
          country: this.form.country,
          postalCode: this.form.postalCode,
          attn: this.form.attn
        };
      }

      this.form = {
        ...this.form,
        address: address.address,
        address2: address.address2,
        city: address.city,
        state: address.state,
        country: address.country,
        postalCode: address.postalCode,
        attn: address.attn
      };

      this.$validator.validateAll();
    },

    onFormChange() {
      if (this.customlocation != this.location) {
        this.onPackageAddressChange(
          { target: { value: this.customlocation } },
          true
        );
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.order-form {
  background-color: #355bb9;
  color: white;
  width: 450px;
  padding: 2.5rem;
  overflow: auto;

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

  &-heading {
    font-size: 16px;
    font-weight: 600;
  }
}

.shipping-form,
.supervisor-form {
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
