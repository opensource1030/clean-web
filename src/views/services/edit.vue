<template>
  <div class="page service-page service-edit-page">
    <b-modal
      :visible="$store.getters['error/hasError']"
      @hidden="$store.dispatch('error/clearAll')"
      hide-footer
    >
      <div class="d-block text-center is-error">
        <h3>{{ $store.getters['error/error'] }}</h3>
      </div>
    </b-modal>

    <spinner v-if="isLoading" />

    <div v-else>
      <div class="mb-4">
        <div class="bg-info">
          <h2 class="box-heading">Plan Details</h2>
        </div>
        <b-card no-body class="border-0">
          <b-card-body>
            <div class="row mb-3">
              <div class="col-sm-6 col-xs-12">
                <label>Title</label>
                <b-form-input type="text" class="form-control" :value="serviceDetails.title"
                              @input="$store.commit('service/updateServiceDetail',{e:$event,type:'title'})" />
              </div>
              <div class="col-sm-6 col-xs-12">
                <div class="row">
                  <div class="col-sm-5">
                    <label>Plan Code</label>
                    <b-form-input type="text" class="form-control"
                      :value="serviceDetails.code"
                      @input="$store.commit('service/updateServiceDetail',{e:$event,type:'code'})"
                    />
                  </div>
                  <div class="col-sm-4">
                    <label>Cost</label>
                    <b-form-input type="text" class="form-control"
                      name="cost-field"
                      :value="serviceDetails.cost"
                      @input="$store.commit('service/updateServiceDetail',{e:$event,type:'cost'})"
                      :state="!(veeErrors.has('cost-field')) ? null : false"
                      v-validate="{ required: true, min_value:0, max_value: 999999 }"
                    />
                    <p class="mb-0 mt-2 text-danger" v-if="veeErrors.has('cost-field')">{{veeErrors.first('cost-field')}}</p>
                  </div>
                  <div class="col-sm-3">
                    <label>Currency</label>
                    <multiselect
                      placeholder="Unit"
                      :options="currencyUnit"
                      :searchable="false"
                      :show-labels="false"
                      :value="serviceDetails.currency"
                      @input="$store.commit('service/updateServiceDetail',{e:$event,type:'currency'})" />
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-6 col-xs-12">
                <label>Description</label>
                <textarea class="form-control" rows="5" :value="serviceDetails.description"
                          @input="$store.commit('service/updateServiceDetail',{e:$event,type:'description'})" />
              </div>
              <div class="col-sm-6 col-xs-12">
                <div class="form-group">
                  <label>Carriers</label>
                  <multiselect
                    label="presentation"
                    placeholder="Select Carrier"
                    :options="carriers"
                    :searchable="false"
                    :show-labels="false"
                    :value="serviceDetails.carrierId"
                    @input="$store.commit('service/updateServiceDetail',{e:$event,type:'carrierId'})">
                    <template slot="singleLabel" slot-scope="{ option }">{{ option.presentation }}</template>
                  </multiselect>
                </div>
                <div class="form-group">
                  <label class="block">Active</label>
                  <c-switch
                    color="primary"
                    :checked="serviceDetails.status"
                    @change="$store.commit('service/updateServiceDetail', { e: $event, type: 'status' })"
                  />
                  <!-- <c-switch color="primary" value="1" uncheckedValue="0" @change="$store.commit('service/updateServiceDetail',{e:$event,type:'status'})"/> -->
                </div>
              </div>
            </div>
          </b-card-body>
        </b-card>
      </div>

      <div class="mb-4">
        <div class="bg-info">
          <h2 class="box-heading">Domestic Services</h2>
        </div>
        <b-card no-body class="border-0">
          <b-card-body>
            <div class="row">
              <div class="col-sm-4 col-xs-12">
                <label><i class="fa fa-clock-o"></i> Minutes</label>
                <b-input-group>
                  <b-input-group-prepend>
                    <b-input-group-text>Amount</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input type="number" class="form-control"
                    name="domesticPlan-minutes"
                    :value="domesticPlan.minutes.value"
                    @input="$store.commit('service/updateDomesticplan',{e:$event,type:'minutes'})"
                    :state="!(veeErrors.has('domestic-minutes-field')) ? null : false"
                    v-validate="{ required: true, min_value:0, max_value: 999999 }"
                    :disabled="domesticPlan.minutes.unlimited"
                    />
                </b-input-group>
                <p class="mb-0 mt-2 text-danger" v-if="veeErrors.has('domesticPlan-minutes')">{{veeErrors.first('domesticPlan-minutes')}}</p>
                <div class="d-flex">
                  <label class="block">Unlimited Minutes</label>
                  <b-form-checkbox
                    @change="$store.commit('service/updateUnlimitedDomesticplan', {e:$event,type:'minutes'}); unlimitedValidation('domesticPlan', 'minutes');"
                    :checked="domesticPlan.minutes.unlimited"
                    switch
                  />
                </div>
              </div>
              <div class="col-sm-4 col-xs-12">
                <label><i class="fa fa-database"></i> Data</label>
                <b-input-group>
                  <b-input-group-prepend>
                    <b-input-group-text>Amount</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input type="number" class="form-control"
                    name="domesticPlan-data"
                    :value="domesticPlan.data.value"
                    @input="$store.commit('service/updateDomesticplan',{e:$event,type:'data'})"
                    :state="!(veeErrors.has('domestic-data-field')) ? null : false"
                    v-validate="{ required: true, min_value:0, max_value: 999999 }"
                    :disabled="domesticPlan.data.unlimited"
                    />
                  <multiselect
                    placeholder="Unit"
                    :options="dataUnit"
                    :searchable="false"
                    :show-labels="false"
                    :value="domesticPlan.data.unit"
                    @input="$store.commit('service/updateDomesticplan',{e:$event,type:'unit'})" />
                </b-input-group>
                <p class="mb-0 mt-2 text-danger" v-if="veeErrors.has('domesticPlan-data')">{{veeErrors.first('domesticPlan-data')}}</p>
                <div class="d-flex">
                  <label class="block">Unlimited Data</label>
                  <b-form-checkbox
                    @change="$store.commit('service/updateUnlimitedDomesticplan', {e:$event,type:'data'}); unlimitedValidation('domesticPlan', 'data');"
                    :checked="domesticPlan.data.unlimited"
                    switch
                  />
                </div>
              </div>
              <div class="col-sm-4 col-xs-12">
                <label><i class="fa fa-commenting"></i> SMS</label>
                <b-input-group>
                  <b-input-group-prepend>
                    <b-input-group-text>Amount</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input type="number" class="form-control"
                    name="domesticPlan-sms"
                    :value="domesticPlan.sms.value"
                    @input="$store.commit('service/updateDomesticplan',{e:$event,type:'sms'})"
                    :state="!(veeErrors.has('domestic-sms-field')) ? null : false"
                    v-validate="{ required: true, min_value:0, max_value: 999999 }"
                    :disabled="domesticPlan.sms.unlimited"
                  />
                </b-input-group>
                <p class="mb-0 mt-2 text-danger" v-if="veeErrors.has('domesticPlan-sms')">{{veeErrors.first('domesticPlan-sms')}}</p>
                <div class="d-flex">
                  <label class="block">Unlimited SMS</label>
                  <b-form-checkbox
                    @change="$store.commit('service/updateUnlimitedDomesticplan', {e:$event,type:'sms'}); unlimitedValidation('domesticPlan', 'sms');"
                    :checked="domesticPlan.sms.unlimited"
                    switch
                  />
                </div>
              </div>
            </div>
          </b-card-body>
        </b-card>
      </div>

      <div class="mb-4">
        <div class="bg-info">
          <h2 class="box-heading">International Services</h2>
        </div>
        <b-card no-body class="border-0">
          <b-card-body>
            <div class="row">
              <div class="col-sm-4 col-xs-12">
                <label><i class="fa fa-clock-o"></i> Minutes</label>
                <b-input-group>
                  <b-input-group-prepend>
                    <b-input-group-text>Amount</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input type="number" class="form-control"
                    name="internationalPlan-minutes"
                    :value="internationalPlan.minutes.value"
                    @input="$store.commit('service/updateInternationalplan',{e:$event,type:'minutes'})"
                    :state="!(veeErrors.has('internationalPlan-minutes')) ? null : false"
                    v-validate="{ required: true, min_value:0, max_value: 999999 }"
                    :disabled="internationalPlan.minutes.unlimited"
                  />
                </b-input-group>
                <p class="mb-0 mt-2 text-danger" v-if="veeErrors.has('internationalPlan-minutes')">{{veeErrors.first('internationalPlan-minutes')}}</p>
                <div class="d-flex">
                  <label class="block">Unlimited Minutes</label>
                  <b-form-checkbox
                    @change="$store.commit('service/updateUnlimitedInternationalplan', {e:$event,type:'minutes'}); unlimitedValidation('internationalPlan', 'minutes');"
                    :checked="internationalPlan.minutes.unlimited"
                    switch
                  />
                </div>
              </div>
              <div class="col-sm-4 col-xs-12">
                <label><i class="fa fa-database"></i> Data</label>
                <b-input-group>
                  <b-input-group-prepend>
                    <b-input-group-text>Amount</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input type="number" class="form-control"
                    name="internationalPlan-data"
                    :value="internationalPlan.data.value"
                    @input="$store.commit('service/updateInternationalplan',{e:$event,type:'data'})"
                    :disabled="internationalPlan.data.unlimited"
                    v-validate="{ required: true, min_value:0, max_value: 999999 }"
                    :state="!(veeErrors.has('internationalPlan-data')) ? null : false"
                  />
                  <multiselect
                    placeholder="Unit"
                    :options="dataUnit"
                    :searchable="false"
                    :show-labels="false"
                    :value="internationalPlan.data.unit"
                    @input="$store.commit('service/updateInternationalplan',{e:$event,type:'unit'})" />
                </b-input-group>
                <p class="mb-0 mt-2 text-danger" v-if="veeErrors.has('internationalPlan-data')">{{veeErrors.first('internationalPlan-data')}}</p>
                <div class="d-flex">
                  <label class="block">Unlimited Data</label>
                  <b-form-checkbox
                    @change="$store.commit('service/updateUnlimitedInternationalplan', {e:$event,type:'data'}); unlimitedValidation('internationalPlan', 'data');"
                    :checked="internationalPlan.data.unlimited"
                    switch
                  />
                </div>
              </div>
              <div class="col-sm-4 col-xs-12">
                <label><i class="fa fa-commenting"></i> SMS</label>
                <b-input-group>
                  <b-input-group-prepend>
                    <b-input-group-text>Amount</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input type="number" class="form-control"
                    :value="internationalPlan.sms.value"
                    name="internationalPlan-sms"
                    @input="$store.commit('service/updateInternationalplan',{e:$event,type:'sms'})"
                    :state="!(veeErrors.has('internationalPlan-sms')) ? null : false"
                    v-validate="{ required: true, min_value:0, max_value: 999999 }"
                    :disabled="internationalPlan.sms.unlimited"
                    />
                </b-input-group>
                <p class="mb-0 mt-2 text-danger" v-if="veeErrors.has('internationalPlan-sms')">{{veeErrors.first('internationalPlan-sms')}}</p>
                <div class="d-flex">
                  <label class="block">Unlimited SMS</label>
                  <b-form-checkbox
                    @change="$store.commit('service/updateUnlimitedInternationalplan', {e:$event,type:'sms'}); unlimitedValidation('internationalPlan', 'sms');"
                    :checked="internationalPlan.sms.unlimited"
                    switch
                  />
                </div>
              </div>
            </div>
          </b-card-body>
        </b-card>
      </div>

      <div class="mb-4">
        <div class="tag-header bg-info">
          <h2 class="box-heading">Add-Ons</h2>
        </div>
        <b-card no-body class="border-0">
          <b-card-body>
            <div class="row" v-for="(addon,index) in addons">
              <div class="col-sm-4 col-xs-12">
                <label>Name</label>
                <b-input-group>
                  <b-input-group-prepend>
                    <b-input-group-text>Description</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input type="text" class="form-control"
                    :value="addon.description"
                    @keyup="$store.commit('service/updateAddon',{i:index,e:$event,type:'name'})"
                    />
                </b-input-group>
              </div>
              <div class="col-sm-4 col-xs-12">
                <label>Cost</label>
                <b-input-group>
                  <b-input-group-prepend>
                    <b-input-group-text>Amount</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input type="number" class="form-control"
                    :name="'addon-cost-' + index.toString()"
                    :value="addon.cost"
                    :state="!(veeErrors.has('addon-cost-' + index.toString() )) ? null : false"
                    v-validate="{ required: true, min_value:0, max_value: 999999 }"
                    @keyup="$store.commit('service/updateAddon',{i:index,e:$event,type:'price'})" />
                  <b-input-group-prepend>
                    <b-input-group-text>{{ serviceDetails.currency }}</b-input-group-text>
                  </b-input-group-prepend>
                </b-input-group>
                <p class="mb-0 mt-2 text-danger" v-if="veeErrors.has('addon-cost-' + index.toString() )">{{veeErrors.first('addon-cost-' + index.toString() )}}</p>
              </div>
              <div class="col-sm-4 col-xs-12">
                <b-button class="btn-control" variant="danger" aria-pressed="true"
                          @click="$store.commit('service/deleteAddOns',index); validateAddons();">X</b-button>
              </div>
            </div>
            <div class="input-group-wrapper">
              <b-button variant="primary" @click="$store.commit('service/hideAndPush');">
                <i class="fa fa-lightbulb-o"></i>&nbsp; Add New Field
              </b-button>
            </div>
          </b-card-body>
        </b-card>
      </div>

      <b-button variant="primary" class="mb-4" @click="save()" id="button">Save Changes</b-button>

    </div>
  </div>
</template>

<script src="./edit.ctrl.js" lang="babel"></script>
