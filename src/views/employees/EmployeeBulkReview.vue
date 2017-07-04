<template>
  <div>
    <bulkUserStepWizard :activeStep="3"></bulkUserStepWizard>
    <div class="page employee-page employee-bulk-add-page">
      <modal v-if="$store.getters['error/hasError']" @close="$store.dispatch('error/clearAll')">
        <h3 slot="body">{{ $store.getters['error/error'] }}</h3>
      </modal>

      <div class="columns small-12">
        <div class="grid-box content-container">
          <div class="box-heading">
            <h2>Review</h2>
          </div>
          <div class="box-content" v-show="isReady">
            <div class="row extend text-center">
              <h2>Successfully Added!</h2>
              <!--               <div class="columns medium-6 small-6">
                              <h4 class="text-right">Total Users:</h4>
                            </div>
                            <div class="columns medium-6 small-6">
                              <h4 class="text-left"> {{ $store.getters['employee_bulk/getTotalUserCount'] }}</h4>
                            </div>
                            <div class="columns medium-6 small-6">
                              <h4 class="text-right">Created Users:</h4>
                            </div>
                            <div class="columns medium-6 small-6">
                              <h4 class="text-left"> {{ $store.getters['employee_bulk/getCreatedUserCount'] }}</h4>
                            </div>
                            <div class="columns medium-6 small-6">
                              <h4 class="text-right">Updated Users:</h4>
                            </div>
                            <div class="columns medium-6 small-6">
                              <h4 class="text-left"> {{ $store.getters['employee_bulk/getUpdatedUserCount'] }}</h4>
                            </div>
                            <div class="columns medium-6 small-6">
                              <h4 class="text-right">Failed Users:</h4>
                            </div>
                            <div class="columns medium-6 small-6">
                              <h4 class="text-left"> {{ $store.getters['employee_bulk/getFailedUserCount'] }}</h4>
                            </div> -->
              <h4>Total Users: {{ $store.getters['employee_bulk/getTotalUserCount'] }}</h4>
              <h4>Created Users: {{ $store.getters['employee_bulk/getCreatedUserCount'] }}</h4>
              <h4>Updated Users: {{ $store.getters['employee_bulk/getUpdatedUserCount'] }}</h4>
              <h4>Failed Users: {{ $store.getters['employee_bulk/getFailedUserCount'] }}</h4>
            </div>
            <div class="row extend text-center">
              <a class="button large save-button" href="/employees">Done</a>
            </div>
          </div>
          <div class="row extend text-center" v-show="!isReady">
            <div class="columns medium-6 small-6">
              <h2>Working...</h2>
            </div>
            <div class="columns medium-6 small-6">
              <a class="button large upload-button" @click="cancelListening()">Cancel</a>
            </div>
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