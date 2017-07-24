<template>
  <div>
    <bulkUserStepWizard :activeStep="4"></bulkUserStepWizard>
    <div class="page employee-page employee-bulk-review-page">
      <modal v-if="$store.getters['error/hasError']" @close="$store.dispatch('error/clearAll')">
        <h3 slot="body">{{ $store.getters['error/error'] }}</h3>
      </modal>

      <div class="columns small-12">
        <div class="grid-box content-container">
          <div class="box-heading">
            <h2>Review</h2>
          </div>
          <div class="box-content">
            <a class="button large cancel-button" @click="cancelListening()" v-show="!isReady">Back</a>

            <div class="review-status">
              <h3>{{ $store.state.employee_bulk.companyuserimportjobs.status }} ...</h3>
            </div>

            <div class="review-detail">
              <h4>Total Users: {{ $store.state.employee_bulk.companyuserimportjobs.totalUsers }}</h4>
              <h4>Creatable Users: {{ $store.state.employee_bulk.companyuserimportjobs.creatableUsers }}</h4>
              <h4>Created Users: {{ $store.state.employee_bulk.companyuserimportjobs.createdUsers }}</h4>
              <h4>Updated Users: {{ $store.state.employee_bulk.companyuserimportjobs.updatableUsers }}</h4>
              <h4>Updated Users: {{ $store.state.employee_bulk.companyuserimportjobs.updatedUsers }}</h4>
              <h4>Failed Users: {{ $store.state.employee_bulk.companyuserimportjobs.failedUsers }}</h4>
            </div>

            <!-- <div class="row extend text-center">
              <a class="button large save-button" href="/employees">Done</a>
            </div> -->
          </div>

          <div class="is-relative" v-show="!isReady">
            <div class="is-loading"></div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script src="./employee.bulk.review.ctrl.js" lang="babel"></script>