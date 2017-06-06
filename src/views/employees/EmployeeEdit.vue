<template>
<div class="page employee-page employee-edit-page">
  <div class="row" v-if="employee.id == employee_id">
    <modal v-if="$store.getters['error/hasError']" @close="$store.dispatch('error/clearAll')">
      <h3 slot="body">{{ $store.getters['error/error'] }}</h3>
    </modal>

    <div class="columns small-12">
      <div class="grid-box overview">
        <div class="box-heading">
          <h2>Employee Information</h2>
        </div>
        <div class="box-content">
          <div class="row extend">
            <div class="columns medium-4">
              <label>
                <span>Email</span>
                <input type="text" name="employee-email" placeholder="" v-model="employee.email">
              </label>
            </div>
            <div class="columns medium-4">
              <label>
                <span>Username</span>
                <input type="text" name="employee-username" placeholder="" v-model="employee.username">
              </label>
            </div>
            <div class="columns medium-4">
              <label>
                <span>Company</span>
                <select name="employee-company" @change="onChange_Company($event)">
                  <option v-for="c in companies" :value="c.id" :selected="c.id == employee.companyId">{{ c.name }}</option>
                </select>
              </label>
            </div>
          </div>

          <div class="row extend">
            <div class="columns medium-4">
              <label>
                <span>First Name</span>
                <input type="text" name="employee-first-name" placeholder="" v-model="employee.firstName">
              </label>
            </div>
            <div class="columns medium-4">
              <label>
                <span>Last Name</span>
                <input type="text" name="employee-last-name" placeholder="" v-model="employee.lastName">
              </label>
            </div>
            <div class="columns medium-4">
              <label>
                <span>Location</span>
                <input type="text" name="employee-location" placeholder="" v-model="employee.defaultLocationId">
              </label>
            </div>
          </div>

          <div class="row">
            <div class="columns medium-8">
              <label>
                <span>Extra Notes</span>
                <textarea name="employee-notes" placeholder="" v-model="employee.notes"></textarea>
              </label>
            </div>
            <div class="columns medium-2">
              <label>
                <span>Supervisor</span>
                <div class="switch tiny">
                  <input class="switch-input" :id="'supervisor-' + employee.id" type="checkbox" v-model="employee.isSupervisor">
                  <label class="switch-paddle" :for="'supervisor-' + employee.id"></label>
                </div>
              </label>
            </div>
            <div class="columns medium-2">
              <label>
                <span>Active</span>
                <div class="switch tiny">
                  <input class="switch-input" :id="'active-' + employee.id" type="checkbox" v-model="employee.isActive">
                  <label class="switch-paddle" :for="'active-' + employee.id"></label>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="columns small-12">
      <div class="grid-box shipping-address-info">
        <div class="box-heading">
          <h2>Shipping Address</h2>
        </div>
        <div class="box-content">
          <div class="row">
            <div class="columns large-6">
              <div>
                <label>
                  <span>Name</span>
                  <input type="text">
                </label>
              </div>
              <div>
                <label>
                  <span>Attn</span>
                  <input type="text">
                </label>
              </div>
              <div>
                <label>
                  <span>Phone</span>
                  <input type="text">
                </label>
              </div>
            </div>
            <div class="columns large-6">
              <div>
                <label>
                  <span>Address</span>
                  <input type="text">
                </label>
              </div>
              <div class="row full-width">
                <div class="columns medium-6">
                  <label>
                    <span>City</span>
                    <input type="text">
                  </label>
                </div>
                <div class="columns medium-6">
                  <label>
                    <span>State</span>
                    <input type="text">
                  </label>
                </div>
              </div>
              <div class="row full-width">
                <div class="columns medium-6">
                  <label>
                    <span>Country</span>
                    <input type="text">
                  </label>
                </div>
                <div class="columns medium-6">
                  <label>
                    <span>Postal Code</span>
                    <input type="text">
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="columns small-12" v-if="employee.companies.length > 0 && !!employee.companies[0]">
      <div class="grid-box company-info">
        <div class="box-heading">
          <h2>Company Information</h2>
        </div>
        <div class="box-content">
          <div class="columns medium-4" v-for="udl in employee.companies[0].udls">
            <label>
              {{ udl.name }}
              <select v-model="employee.udlvalues[EmployeeHelper.getUdlValueIndex(employee, udl.id)]">
                <option v-for="uv in udl.udlvalues" :value="uv">{{ uv.udlValue }}</option>
              </select>
            </label>
          </div>

          <div class="clearfix"></div>
        </div>
      </div>
    </div>

    <div class="small-12 columns">
      <a class="button large save-button" @click="submit()">Save Changes</a>
    </div>
  </div>

  <div class="is-relative" v-show="employee.id !== employee_id">
    <div class="is-loading"></div>
  </div>
</div>
</template>

<script src="./employee.edit.ctrl.js" lang="babel"></script>