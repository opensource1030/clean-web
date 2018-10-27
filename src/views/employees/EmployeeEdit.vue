<template>
<div class="page employee-page employee-edit-page">
  <div class="row" v-if="employee.id === employee_id">
    <modal v-if="$store.getters['error/hasError']" @close="$store.dispatch('error/clearAll')">
      <h3 slot="body">{{ $store.getters['error/error'] }}</h3>
    </modal>

    <div class="columns small-12">
      <div class="grid-box overview">
        <div class="box-heading">
          <h2>Employee / Company Information</h2>
        </div>
        <div class="box-content">
          <div class="row extend">
            <div class="columns medium-4">
              <label>
                <span>Company</span>
                <select name="employee-company" v-model="employee.companyId" @change="onCompanyChange(employee.companyId)">
                  <option v-for="company in companies" :value="company.id">{{ company.name }}</option>
                </select>
              </label>
            </div>
          </div>
          <div class="row extend">
            <div class="columns medium-6">
              <label>
                <span>First Name</span>
                <input type="text" name="employee-first-name" placeholder="" v-model="employee.firstName">
              </label>
            </div>
            <div class="columns medium-6">
              <label>
                <span>Last Name</span>
                <input type="text" name="employee-last-name" placeholder="" v-model="employee.lastName">
              </label>
            </div>
          </div>

          <div class="row extend">
            <div class="columns medium-8 employee-email">

              <fieldset>
                <legend>Employee Email</legend>

                <div class="row extend">
                  <div class="columns medium-6">
                    <label>
                      <span>Username</span>
                      <input type="text" name="employee-user-name" placeholder="" v-model="employee.username">
                    </label>
                  </div>
                  <div class="columns medium-1">
                    <label class="at-mark">@</label>
                  </div>
                  <div class="columns medium-5">
                    <label>
                      <span>Domain</span>
                      <select name="employee-user-domain" v-model="employee.domainId">
                        <option v-for="domain in domains" :value="domain.id">{{ domain.domain }}</option>
                      </select>
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>

          <div class="row extend">
            <div class="columns medium-5">
              <label>
                <span>Extra Notes</span>
                <textarea name="employee-notes" placeholder="" v-model="employee.notes" rows="5"></textarea>
              </label>
            </div>
            <div class="columns medium-7 no-padding">
              <div class="row extend">
                <div class="columns medium-7">
                  <label class="country-list">
                    <span>Country</span>
                    <select name="employee-location" v-model="employee.locationId">
                      <option v-for="location in locations" :value="location.id">{{ location.fullname }}</option>
                    </select>
                  </label>
                </div>
                <div class="columns medium-5">
                  <label class="country-list">
                    <span>Language</span>
                    <select name="employee-language" v-model="employee.defaultLang">
                      <option v-for="lang in languages" :value="lang.value">{{ lang.label }}</option>
                    </select>
                  </label>
                </div>
              </div>
              <div class="row extend">
                <div class="columns medium-2">
                  <label>
                    <span>Supervisor</span>
                    <div class="switch tiny">
                      <input class="switch-input" :id="'supervisor-' + employee.id" type="checkbox" v-model="employee.isSupervisor">
                      <label class="switch-paddle" :for="'supervisor-' + employee.id"></label>
                    </div>
                  </label>
                </div>

                <div class="columns medium-2 active-switch">
                  <label>
                    <span>Active</span>
                    <div class="switch tiny">
                      <input class="switch-input" :id="'active-' + employee.id" type="checkbox" v-model="employee.isActive">
                      <label class="switch-paddle" :for="'active-' + employee.id"></label>
                    </div>
                  </label>
                </div>

                <div class="columns medium-2 active-switch">
                  <label>
                    <span>Notify</span>
                    <div class="switch tiny">
                      <input class="switch-input" :id="'notify-' + employee.id" type="checkbox" v-model="employee.notify" :checked="checked">
                      <label class="switch-paddle" :for="'notify-' + employee.id"></label>
                    </div>
                  </label>
                </div>


              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="small-12 columns">
      <a class="button large save-button" @click="submit()">Save Changes</a>
    </div>
  </div>

  <div class="is-relative" v-if="employee.id !== employee_id">
    <transition appear
                enter-class=""
                enter-active-class="animated zoomIn"
                leave-class=""
                leave-active-class="animated zoomOut"

    >
      <div class="is-loading"></div>
    </transition>
  </div>
</div>
</template>

<script src="./employee.edit.ctrl.js" lang="babel"></script>
