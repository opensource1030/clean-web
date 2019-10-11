<template>
  <div class="user-select-form">
    <div class="user-select-form-title">For whom you are ordering?</div>

    <div class="user-select-form-section py-5">
      <span>Ordering for my self</span>
      <b-btn variant="default" @click="goNext('me')">Continue</b-btn>
    </div>

    <hr class="user-select-form-separator" data-text="or" />

    <div class="user-select-form-section pt-5">
      <span>On behalf of other user</span>

      <multiselect
        v-if="!createNewUser"
        id="user-select"
        placeholder="Start typing user's email"
        track-by="id"
        label="username"
        :loading="isLoading"
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
      >
        <template slot="option" slot-scope="props">
          <span class="create-user-option" v-if="props.option.id === 'new'">+ Create new user</span>
          <span v-else>{{ props.option.firstName }} {{ props.option.lastName }} ({{ props.option.email }})</span>
        </template>

        <template slot="noResult">
          <span class="create-user-option" @click="selectEmployee({ id: 'new' })">+ Create new user</span>
        </template>
      </multiselect>

      <b-form
        v-else
        class="user-select-form-create-user dashboard-form pt-4"
        @submit.prevent="validateBeforeSubmit"
      >
        <div class="row mb-3">
          <div class="col item" :class="{'is-danger': errors.has('firstName') }">
            <label>First name *</label>
            <div>
              <b-input name="firstName" v-model="form.firstName" v-validate="'required'"></b-input>
              <span v-show="errors.has('firstName')" class="error">Required</span>
            </div>
          </div>

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
              <b-input name="email" v-model="form.email" v-validate="'required|email'"></b-input>
              <span v-show="errors.has('email')" class="error">{{errors.first('email')}}</span>
            </div>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col item" :class="{'is-danger': errors.has('supervisor email') }">
            <label>Supervisor Email *</label>
            <div>
              <b-input
                name="supervisor email"
                v-model="form.supervisorEmail"
                v-validate="'required|email'"
              ></b-input>
              <span v-show="errors.has('supervisor email')" class="error">{{errors.first('supervisor email')}}</span>
            </div>
          </div>
        </div>

        <div v-for="udl of udls" class="row mb-3">
          <div class="col item">
            <label>{{ udl.name }}</label>
            <div>
              <multiselect
                :id="`id-${udl.id}`"
                placeholder="Not specified"
                track-by="id"
                label="udlValue"
                :value="getValue(udl.name)"
                :options="udl.udlvalues"
                :multiple="false"
                :searchable="true"
                :show-labels="false"
                :select-label="''"
                :close-on-select="true"
                :clear-on-select="false"
                :hide-selected="false"
                @select="selectUdlValue"
              />
            </div>
          </div>
        </div>

        <div class="row mt-3">
          <div class="col">
            <b-btn
              variant="outline-default w-100"
              :disabled="createNewUserDisabled"
              @click="cancelCreate"
            >Cancel</b-btn>
          </div>
          <div class="col">
            <b-btn variant="default w-100" :disabled="createNewUserDisabled" type="submit">
              <i v-if="submitted" class="fa fa-spinner fa-spin mr-2" />Create User
            </b-btn>
          </div>
        </div>
      </b-form>

      <div v-if="errorText" class="mt-4">
        <b-alert show variant="danger">{{ errorText }}</b-alert>
      </div>

      <div v-if="selectedEmployee" class="user-select-form-employee-detail my-4">
        <div>
          <label>User email:</label>
          {{ selectedEmployee.email }}
        </div>

        <div v-if="selectEmployee.supervisorEmail">
          <label>Supervisor:</label>
          {{ selectedEmployee.supervisorEmail }}
        </div>

        <div v-for="udl of selectedEmployee.udlvalues">
          <label>{{ udl.udlName }}:</label>
          {{ udl.udlValue }}
        </div>
      </div>

      <b-btn v-if="selectedEmployee" variant="default" @click="goNext('other')">Continue</b-btn>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
import _ from "lodash";
import employeeAPI from "@/api/employee-api";
import Toggle from "@/components/toggle";

export default {
  name: "UserSelectForm",

  components: {
    Toggle
  },

  data() {
    return {
      onBehalfOfUser: true,
      selectedEmployee: null,
      employees: [{ id: "new" }],
      createNewUser: false,
      form: {
        firstName: '',
        lastName: '',
        email: '',
        supervisorEmail: ''
      },
      udlvalues: {},
      submitted: false,
      isLoading: false,
      errorText: ''
    };
  },

  computed: {
    createNewUserDisabled() {
      return this.submitted ? "disabled" : false;
    },

    ...mapGetters({
      allEmployees: "employee/allEmployees",
      profile: "auth/getProfile",
      udls: "auth/getUdls",
      allowedDomains: 'auth/getAllowedDomains',
    })
  },

  methods: {
    customLabel({ firstName, lastName }) {
      return `${firstName} ${lastName}`;
    },

    selectEmployee(employee) {
      this.errorText = '';
      this.createNewUser = employee.id === "new";
      this.selectedEmployee = employee.id === "new" ? null : employee;
    },

    asyncSearch(query) {
      if(query.length < 3) {
        this.employees = [{ id: "new"}];
        return;
      }

      this.isLoading = true;

      this.searchEmployees({query: query}).then(res => {
        this.employees = [ ...res, { id: "new" } ];
        this.isLoading = false;
      }).catch(err => {
        console.log(err);
        this.isLoading = false;
      });
    },

    getValue(udlName) {
      return _.get(this.udlvalues, udlName);
    },

    selectUdlValue(udl) {
      this.udlvalues[udl.udlName] = udl;
      this.$forceUpdate();
    },

    goNext(type) {
      const user = type === "me" ? this.profile : this.selectedEmployee;

      this.$emit("selectUser", user);
    },

    cancelCreate() {
      this.createNewUser = false;
      this.errorText = '';
    },

    getExistingUserByEmail() {
      this.isLoading = true;
      this.createNewUser = false;

      this.searchEmployees({query: this.form.email}).then(res => {
        this.selectEmployee(res[0]);
        this.isLoading = false;
      }).catch(err => {
        console.log(err);
        this.isLoading = false;
      });
    },

    validateBeforeSubmit() {

      let employeeDomainFoundFlag = false
      const employeeDomain = this.form.email.replace(/.*@/, "")
      this.allowedDomains.forEach(domain => {
        (employeeDomain == domain) ? employeeDomainFoundFlag = true : null
      })

      let supervisorDomainFoundFlag = false
      const supervisorDomain = this.form.supervisorEmail.replace(/.*@/, "")
      this.allowedDomains.forEach(domain => {
        (supervisorDomain == domain) ? supervisorDomainFoundFlag = true : null
      })

      this.$validator.validateAll().then(result => {
        // Verify that employee domain is inside the allowed domains...
        if (!employeeDomainFoundFlag) {
          this.$validator.errors.add({
            field: 'email',
            msg: 'Employee email domain not allowed or not active'
          }); 
        }
        // Verify that supervisor domain is inside the allowed domains...
        if (!supervisorDomainFoundFlag) {
          this.$validator.errors.add({
            field: 'supervisor email',
            msg: 'Supervisor email domain not allowed or not active'
          }); 
        }
        // Guards above must be passed to move forward...
        if (employeeDomainFoundFlag && supervisorDomainFoundFlag) {
          if (result) {
            const udlData = _.keys(this.udlvalues).map(key => ({
              type: "udlvalues",
              id: this.udlvalues[key].id
            }));

            const payload = {
              data: {
                type: "users",
                attributes: this.form,
                relationships: {
                  udlvalues: {
                    data: udlData
                  }
                }
              }
            }
          };

          this.submitted = true;
          this.errorText = '';

          this.createEmployee(payload)
            .then(employee => {
              this.selectEmployee(employee);
              this.createNewUser = false;
              this.submitted = false;
            })
            .catch(err => {
              console.log(err);
              this.errorText = _.values(err.body.errors)[0];
              this.submitted = false;

              if(this.errorText === "The User can not be created, there are other user with the same email.") {
                this.getExistingUserByEmail();
              }
            });
        }
      });
    },

    ...mapActions({
      searchEmployees: "employee/searchByEmail",
      createEmployee: "employee/create"
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

  .create-user-option {
    color: #20a8d8;
    font-weight: bold;
  }

  .multiselect {
    width: 280px;
    font-size: 10px;
    font-weight: normal;
    font-weight: 500;
    color: #1f2027;
    line-height: 13px;

    &__content-wrapper {
      border: 0.75px solid #afbad4;
      border-top: none;
      max-height: 290px;
    }

    &__option {
      padding: 12px;
      min-height: initial;

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
    }

    &__placeholder {
      padding: 0;
      margin: 0;
      color: #1f2027;
    }

    &__input,
    &__single {
      font-size: 10px;
      margin-top: -3px;
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

  &-title {
    text-align: center;
    color: #1f2027;
    font-size: 16px;
    font-weight: 600;
  }

  &-section {
    display: flex;
    flex-direction: column;
    align-items: center;

    & > span {
      text-transform: uppercase;
      color: #657089;
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

  &-create-user {
    width: 100%;

    label {
      text-align: left;
      display: block;
      text-transform: uppercase;
      margin-bottom: 0.2rem;
      font-size: 10px;
      font-weight: 600;
      line-height: 13px;
    }

    .item > div > input {
      height: 38px !important;
      color: #1f2027;
      font-size: 11px;
    }

    .multiselect {
      width: auto;
    }
  }

  &-employee-detail {
    width: 350px;
    color: #1f2027;
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
}
</style>
