<template>
  <div>
    <bulkUserStepWizard :activeStep="1"></bulkUserStepWizard>
    <div class="page employee-page employee-bulk-add-page">
      <modal v-if="$store.getters['error/hasError']" @close="$store.dispatch('error/clearAll')">
        <h3 slot="body">{{ $store.getters['error/error'] }}</h3>
      </modal>

      <div class="columns small-12">
        <div class="grid-box content-container">
          <div class="box-heading">
            <h2>Upload Employee CSV</h2>
          </div>

          <div class="box-content" v-show="!isReady">
            <div class="row extend">
              <div class="columns small-4">
                <multiselect
                        id="ajax"
                        v-model="company.value"
                        placeholder="Company Name"
                        label="name"
                        track-by="id"
                        :options="company.options"
                        :multiple="false"
                        :searchable="true"
                        :show-labels="false"
                        :select-label="''"
                        :close-on-select="true"
                        :clear-on-select="false"
                        :hide-selected="false"
                        :limit="3"
                        @search-change="asyncFind_CompanyNames">
                </multiselect>
              </div>
              <!-- <div class="columns medium-6 small-12">
                <a class="button large upload-button float-right" @click="submit()">Upload CSV</a>
              </div> -->
            </div>
            <uploader accept=".csv" :autoUpload="false" @selected:file="submit()" v-show="_.get(company, 'value.id', 0) > 0"></uploader>
          </div>

          <div class="is-relative" v-show="isReady">
            <div class="is-loading"></div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script src="./employee.bulk.add.ctrl.js" lang="babel"></script>