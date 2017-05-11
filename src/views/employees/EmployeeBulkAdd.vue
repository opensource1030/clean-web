<template>
<div class="page employee-page employee-bulk-add-page">
  <modal v-if="$store.getters['error/hasError']" @close="$store.dispatch('error/clearAll')">
    <h3 slot="body">{{ $store.getters['error/error'] }}</h3>
  </modal>

  <div class="columns small-12">
    <div class="grid-box overview">
      <div class="box-heading">
        <h2>Employee CSV</h2>
      </div>
      <div class="box-content">
        <div class="row extend">
          <div class="columns medium-4">
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
        </div>

        <uploader accept=".csv" :autoUpload="false"></uploader>
      </div>
    </div>
  </div>

  <div class="columns small-12">
    <a class="button large save-button" @click="submit()">Upload CSV</a>
  </div>
</div>
</template>

<script src="./employee.bulk.add.ctrl.js" lang="babel"></script>