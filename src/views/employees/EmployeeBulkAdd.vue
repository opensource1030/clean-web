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