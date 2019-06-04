<template>
  <div class="page employee-page employee-edit-page">
    <div v-if="employee.id == employee_id">
      <b-modal
        :visible="$store.getters['error/hasError']"
        @hidden="$store.dispatch('error/clearAll')"
        hide-footer
      >
        <div class="d-block text-center is-error">
          <h3>{{ $store.getters['error/error'] }}</h3>
        </div>
      </b-modal>

      <div class="card">
        <div class="card-header">
          Employee / Company Information
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-md-4">
              <label class="field">
                <span>Company</span>
                <select name="employee-company" v-model="employee.companyId" @change="onCompanyChange(employee.companyId)">
                  <option v-for="company in companies" :value="company.id">{{ company.name }}</option>
                </select>
              </label>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <label class="field">
                <span>First Name</span>
                <input type="text" name="employee-first-name" placeholder="" v-model="employee.firstName">
              </label>
            </div>
            <div class="col-md-6">
              <label class="field">
                <span>Last Name</span>
                <input type="text" name="employee-last-name" placeholder="" v-model="employee.lastName">
              </label>
            </div>
          </div>

          <div class="row">
            <div class="col-md-8">

              <fieldset>
                <legend>Employee Email</legend>

                <div class="row">
                  <div class="col-6">
                    <label class="field">
                      <span>Username</span>
                      <input type="text" name="employee-user-name" placeholder="" v-model="employee.username">
                    </label>
                  </div>
                  <div class="col-1">
                    <label class="at-mark">@</label>
                  </div>
                  <div class="col-5">
                    <label class="field">
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

          <div class="row">
            <div class="col-md-5">
              <label class="field">
                <span>Extra Notes</span>
                <textarea name="employee-notes" placeholder="" v-model="employee.notes" rows="5"></textarea>
              </label>
            </div>
            <div class="col-md-7">
              <div class="row">
                <div class="col-7">
                  <label class="field">
                    <span>Country</span>
                    <select name="employee-location" v-model="employee.defaultLocationId">
                      <option v-for="location in locations" :value="location.id">{{ location.fullname }}</option>
                    </select>
                  </label>
                </div>
                <div class="col-5">
                  <label class="field">
                    <span>Language</span>
                    <select name="employee-language" v-model="employee.defaultLang">
                      <option v-for="lang in languages" :value="lang.value">{{ lang.label }}</option>
                    </select>
                  </label>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-2">
                  <label>
                    <span>Supervisor</span>
                    <!-- <b-form-checkbox v-model="employee.isSupervisor" switch></b-form-checkbox> -->
                    <div class="custom-control custom-switch">
                      <input type="checkbox" class="custom-control-input" :id="`supervisor-${employee.id}`" v-model="employee.isSupervisor">
                      <label class="custom-control-label" :for="`supervisor-${employee.id}`"></label>
                    </div>
                  </label>
                </div>

                <div class="col-sm-2">
                  <label>
                    <span>Active</span>
                    <div class="custom-control custom-switch">
                      <input type="checkbox" class="custom-control-input" :id="`active-${employee.id}`" v-model="employee.isActive">
                      <label class="custom-control-label" :for="`active-${employee.id}`"></label>
                    </div>
                  </label>
                </div>

                <div class="col-sm-2">
                  <label>
                    <span>Notify</span>
                    <div class="custom-control custom-switch">
                      <input type="checkbox" class="custom-control-input" :id="`notify-${employee.id}`" v-model="employee.notify">
                      <label class="custom-control-label" :for="`notify-${employee.id}`"></label>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <b-btn size="lg" variant="primary" class="save-button" @click="submit()">Save Changes</b-btn>
      </div>
    </div>

    <spinner v-else />
  </div>
</template>

<script src="./employee_edit.ctrl.js" lang="babel"></script>
