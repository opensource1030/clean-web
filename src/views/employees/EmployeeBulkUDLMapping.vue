<template>
  <div>
    <bulkUserStepWizard :activeStep="2"></bulkUserStepWizard>
    <div class="page employee-page employee-bulk-udlmapping-page">
      <modal v-if="$store.getters['error/hasError']" @close="$store.dispatch('error/clearAll')">
        <h3 slot="body">{{ $store.getters['error/error'] }}</h3>
      </modal>

      <div class="columns small-12">
        <div class="grid-box content-container">
          <div class="box-heading">
            <h2>Map UDLs</h2>
          </div>
          
          <div class="box-content" v-show="!isReady">
            <div class="row extend">
              <div class="columns medium-12 small-12">
                <a class="button large upload-button float-right" @click="submit()">Next</a>
              </div>
            </div>

            <div class="row extend">
              <div class="row addlist  udl-wrapper" v-for="(udl, index) in udl_list">
                <input type="hidden" name="udl-id" :value="index">
                <div class="columns medium-4">
                  <label>
                    <span>Label</span>
                    <input type="text" name="udl-key" placeholder="A Department or Group" v-model="udl.name">
                  </label>
                </div>
                <div class="columns medium-8">
                  <div class="udl-value-wrapper" :data-index="index">
                    <label>
                      <span>Value</span>
                      <input type="text" disabled name="udl-value" class="tag-input" :id="'udl-value-' + index" :value="udl.values" :data-index="index">
                    </label>
                  </div>
                </div>
                <div class="btn-control">
                  <a class="button delete" v-on:click="removeUDL(index)"><i class="fa fa-close"></i></a>
                </div>
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

<script src="./employee.bulk.udlmapping.ctrl.js" lang="babel"></script>