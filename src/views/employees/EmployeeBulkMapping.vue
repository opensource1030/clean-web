<template>
  <div>
    <bulkUserStepWizard :activeStep="3"></bulkUserStepWizard>
    <div class="page employee-page employee-bulk-mapping-page">
      <modal v-if="$store.getters['error/hasError']" @close="$store.dispatch('error/clearAll')">
        <h3 slot="body">{{ $store.getters['error/error'] }}</h3>
      </modal>

      <div class="columns small-12">
        <div class="grid-box content-container">
          <div class="box-heading">
            <h2>Mapping Fields</h2>
          </div>

          <div class="box-content" v-show="!isReady">
            <div class="row extend">
              <div class="columns medium-12 small-12">
                <a class="button large upload-button float-right" @click="submit()">Next</a>
              </div>
            </div>

            <div class="row extend">
              <div class="columns medium-4 small-12">
                <h4>CSV Fields</h4>
              </div>
              <div class="columns medium-4 small-12">
                <h4>DB Fields</h4>
              </div>
              <div class="columns medium-4 small-12">
                <h4>Sample User</h4>
              </div>
            </div>
            <div class="row extend" v-for="(item, index) in db_fields">
              <div class="columns medium-4 small-12">
                <multiselect
                    v-model="csv_matched_fields[index]"
                    placeholder="Choose a Field"
                    :options="csv_options"
                    :multiple="false"
                    :searchable="false">
                </multiselect>
              </div>
              <div class="columns medium-4 small-12">
                <multiselect
                    v-model="db_matched_fields[index]"
                    placeholder="Choose a Field"
                    track-by="name"
                    label="label"
                    :options="db_options"
                    :multiple="false"
                    :searchable="false">
                </multiselect>
              </div>
              <div class="columns medium-4 small-12">
                <input type="text" :placeholder="csv_matched_fields[index]" v-model="sample_user[csv_matched_fields[index]]">
              </div>
            </div>
          </div>

          <div class="is-relative" v-show="isReady">
            <div class="is-loading"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./employee.bulk.mapping.ctrl.js" lang="babel"></script>