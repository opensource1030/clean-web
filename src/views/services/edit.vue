<template>
  <div class="page service-page service-edit-page"
    @click="$store.commit('auth/warningPopupFlagOn')"
    @keyup.tab="$store.commit('auth/warningPopupFlagOn')">
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
      <div class="service-plan-details mb-4">
        <div class="bg-info">
          <h2 class="box-heading">Plan Details</h2>
        </div>
        <b-card no-body class="border-0">
          <b-card-body>
            <div class="row mb-3">
              <div class="col-sm-6 col-xs-12">
                <label>Title</label>
                <b-form-input type="text" class="form-control" :value="serviceDetails.title"
                              @input="$store.commit('service/updateServiceDetail',{e:$event,type:'title'})" 
                              name="service title"
                              v-validate="{ required: true }"
                              :state="!(errors.has('service title')) ? null : false"
                              />
                <p class="mb-0 mt-2 text-danger" v-if="errors.has('service title')">{{errors.first('service title')}}</p>
              </div>
              <div class="col-sm-6 col-xs-12">
                <div class="row">
                  <div class="col-sm-5">
                    <label>Plan Code</label>
                    <b-form-input type="text" class="form-control"
                      :value="serviceDetails.code"
                      @input="$store.commit('service/updateServiceDetail',{e:$event,type:'code'})"
                      name="plan code"
                      v-validate="{ required: true }"
                      :state="!(errors.has('plan code')) ? null : false"
                    />
                    <p class="mb-0 mt-2 text-danger" v-if="errors.has('plan code')">{{errors.first('plan code')}}</p>
                  </div>
                  <div class="col-sm-4">
                    <label>Cost</label>
                    <b-form-input type="text" class="form-control"
                      name="service cost"
                      :value="serviceDetails.cost"
                      @input="$store.commit('service/updateServiceDetail',{e:$event,type:'cost'})"
                      v-validate="{ required: true, min_value:0, max_value: 999999 }"
                      :state="!(errors.has('service cost')) ? null : false"
                    />
                    <p class="mb-0 mt-2 text-danger" v-if="errors.has('service cost')">{{errors.first('service cost')}}</p>
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
                <!-- @input="$store.commit('service/updateServiceDetail',{value,type:'description'})" -->
                <b-form-textarea class="form-control" rows="5" :value="serviceDetails.description"
                          @input="$store.commit('service/updateServiceDetail',{e:$event,type:'description'})"
                          name="service description"
                          :state="!(errors.has('service description')) ? null : false"
                          v-validate="{ required: true }"/>
                <p class="mb-0 mt-2 text-danger" v-if="errors.has('service description')">{{errors.first('service description')}}</p>
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
                    :state="!(errors.has('carrier option')) ? null : false"
                    @input="$store.commit('service/updateServiceDetail',{e:$event,type:'carrierId'})"
                    name="carrier option"
                    v-validate="{ required: true }"
                    >
                    <template slot="singleLabel" slot-scope="{ option }">{{ option.presentation }}</template>
                  </multiselect>
                  <p class="mb-0 mt-2 text-danger" v-if="errors.has('carrier option')">{{errors.first('carrier option')}}</p>
                </div>
                <div class="form-group">
                  <label class="block">Active</label>
                  <b-form-checkbox
                    color="primary"
                    :checked="serviceDetails.status"
                    @change="$store.commit('service/updateServiceDetail', { e: $event, type: 'status' })"
                    switch
                  />
                  <!-- <c-switch color="primary" value="1" uncheckedValue="0" @change="$store.commit('service/updateServiceDetail',{e:$event,type:'status'})"/> -->
                </div>
              </div>
            </div>
          </b-card-body>
        </b-card>
      </div>

      <div class="service-plan-items">

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
                    <b-form-input type="text" class="form-control"
                      name="domestic plan minutes"
                      :value="( (domesticPlan.minutes.value) == 0 && (domesticPlan.minutes.unlimited != 0) ? 'Unlimited' : domesticPlan.minutes.value)"
                      @input="$store.commit('service/updateDomesticplan',{e:$event,type:'minutes'})"
                      :state="!(errors.has('domestic plan minutes')) ? null : false"
                      v-validate="{ required: true, min_value:0, max_value: 999999 }"
                      :disabled="(domesticPlan.minutes.unlimited == 0) ? false : true"
                      />
                  </b-input-group>
                  <p class="mb-1 mt-0 text-danger" v-if="errors.has('domestic plan minutes')">{{errors.first('domestic plan minutes')}}</p>
                  <div class="d-flex align-items-center">
                    <b-form-checkbox class="mr-3"
                      @change="$store.commit('service/updateUnlimitedDomesticplan', {e:$event,type:'minutes'}); unlimitedValidation('domestic plan minutes', 'domesticPlan', 'minutes');"
                      :checked="(domesticPlan.minutes.unlimited == 0) ? false : true"
                      switch
                    />
                    <span class="block mt-1">Unlimited Minutes</span>
                  </div>
                </div>
                <div class="col-sm-4 col-xs-12">
                  <label><i class="fa fa-database"></i> Data</label>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text>Amount</b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input type="text" class="form-control"
                      name="domestic plan data"
                      :value="( (domesticPlan.data.value) == 0 && (domesticPlan.data.unlimited != 0) ? 'Unlimited' : domesticPlan.data.value)"
                      @input="$store.commit('service/updateDomesticplan',{e:$event,type:'data'})"
                      :state="!(errors.has('domestic plan data')) ? null : false"
                      v-validate="{ required: true, min_value:0, max_value: 999999 }"
                      :disabled="(domesticPlan.data.unlimited == 0) ? false : true"
                      />
                    <multiselect
                      placeholder="Unit"
                      :options="dataUnit"
                      :searchable="false"
                      :show-labels="false"
                      :value="domesticPlan.data.unit"
                      @input="$store.commit('service/updateDomesticplan',{e:$event,type:'unit'})"
                      :disabled="(domesticPlan.data.unlimited == 0) ? false : true"
                    />
                  </b-input-group>
                  <p class="mb-1 mt-0 text-danger" v-if="errors.has('domestic plan data')">{{errors.first('domestic plan data')}}</p>
                  <div class="d-flex align-items-center">
                    <b-form-checkbox class="mr-3"
                      @change="$store.commit('service/updateUnlimitedDomesticplan', {e:$event,type:'data'}); unlimitedValidation('domestic plan data', 'domesticPlan', 'data');"
                      :checked="(domesticPlan.data.unlimited == 0) ? false : true"
                      switch
                    />
                    <span class="block mt-1">Unlimited Data</span>
                  </div>
                </div>
                <div class="col-sm-4 col-xs-12">
                  <label><i class="fa fa-commenting"></i> SMS</label>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text>Amount</b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input type="text" class="form-control"
                      name="domestic plan sms"
                      :value="( (domesticPlan.sms.value) == 0 && (domesticPlan.sms.unlimited != 0) ? 'Unlimited' : domesticPlan.sms.value)"
                      @input="$store.commit('service/updateDomesticplan',{e:$event,type:'sms'})"
                      :state="!(errors.has('domestic plan sms')) ? null : false"
                      v-validate="{ required: true, min_value:0, max_value: 999999 }"
                      :disabled="(domesticPlan.sms.unlimited == 0) ? false : true"
                    />
                  </b-input-group>
                  <p class="mb-1 mt-0 text-danger" v-if="errors.has('domestic plan sms')">{{errors.first('domestic plan sms')}}</p>
                  <div class="d-flex align-items-center">
                    <b-form-checkbox class="mr-3"
                      @change="$store.commit('service/updateUnlimitedDomesticplan', {e:$event,type:'sms'}); unlimitedValidation('domestic plan sms', 'domesticPlan', 'sms');"
                      :checked="(domesticPlan.sms.unlimited == 0) ? false : true"
                      switch
                    />
                    <span class="block mt-1">Unlimited SMS</span>
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
                    <b-form-input type="text" class="form-control"
                      name="international plan minutes"
                      :value="( (internationalPlan.minutes.value) == 0 && (internationalPlan.minutes.unlimited != 0) ? 'Unlimited' : internationalPlan.minutes.value)"
                      @input="$store.commit('service/updateInternationalplan',{e:$event,type:'minutes'})"
                      :state="!(errors.has('international plan minutes')) ? null : false"
                      v-validate="{ required: true, min_value:0, max_value: 999999 }"
                      :disabled="(internationalPlan.minutes.unlimited == 0) ? false : true"
                    />
                  </b-input-group>
                  <p class="mb-1 mt-0 text-danger" v-if="errors.has('international plan minutes')">{{errors.first('international plan minutes')}}</p>
                  <div class="d-flex align-items-center">
                    <b-form-checkbox class="mr-3"
                      @change="$store.commit('service/updateUnlimitedInternationalplan', {e:$event,type:'minutes'}); unlimitedValidation('international plan minutes', 'internationalPlan', 'minutes');"
                      :checked="(internationalPlan.minutes.unlimited == 0) ? false : true"
                      switch
                    />
                    <span class="block">Unlimited Minutes</span>
                  </div>
                </div>
                <div class="col-sm-4 col-xs-12">
                  <label><i class="fa fa-database"></i> Data</label>
                  <b-input-group class="">
                    <b-input-group-prepend>
                      <b-input-group-text>Amount</b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input type="text" class="form-control"
                      name="international plan data"
                      :value="( (internationalPlan.data.value) == 0 && (internationalPlan.data.unlimited != 0) ? 'Unlimited' : internationalPlan.data.value)"
                      @input="$store.commit('service/updateInternationalplan',{e:$event,type:'data'})"
                      :disabled="(internationalPlan.data.unlimited == 0) ? false : true"
                      v-validate="{ required: true, min_value:0, max_value: 999999 }"
                      :state="!(errors.has('international plan data')) ? null : false"
                    />
                    <multiselect
                      placeholder="Unit"
                      :options="dataUnit"
                      :searchable="false"
                      :show-labels="false"
                      :value="internationalPlan.data.unit"
                      @input="$store.commit('service/updateInternationalplan',{e:$event,type:'unit'})"
                      :disabled="(internationalPlan.data.unlimited == 0) ? false : true"
                    />
                  </b-input-group>
                  <p class="mb-1 mt-0 text-danger" v-if="errors.has('international plan data')">{{errors.first('international plan data')}}</p>
                  <div class="d-flex align-items-center">
                    <b-form-checkbox class="mr-3"
                      @change="$store.commit('service/updateUnlimitedInternationalplan', {e:$event,type:'data'}); unlimitedValidation('international plan data', 'internationalPlan', 'data');"
                      :checked="(internationalPlan.data.unlimited == 0) ? false : true"
                      switch
                    />
                    <span class="block mt-1">Unlimited Data</span>
                  </div>
                </div>
                <div class="col-sm-4 col-xs-12">
                  <label><i class="fa fa-commenting"></i> SMS</label>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text>Amount</b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input type="text" class="form-control"
                      :value="( (internationalPlan.sms.value) == 0 && (internationalPlan.sms.unlimited != 0) ? 'Unlimited' : internationalPlan.sms.value)"
                      name="international plan sms"
                      @input="$store.commit('service/updateInternationalplan',{e:$event,type:'sms'})"
                      :state="!(errors.has('international plan sms')) ? null : false"
                      v-validate="{ required: true, min_value:0, max_value: 999999 }"
                      :disabled="(internationalPlan.sms.unlimited == 0) ? false : true"
                      />
                  </b-input-group>
                  <p class="mb-1 mt-0 text-danger" v-if="errors.has('international plan sms')">{{errors.first('international plan sms')}}</p>
                  <div class="d-flex align-items-center">
                    <b-form-checkbox class="mr-3"
                      @change="$store.commit('service/updateUnlimitedInternationalplan', {e:$event,type:'sms'}); unlimitedValidation('international plan sms', 'internationalPlan', 'sms');"
                      :checked="(internationalPlan.sms.unlimited == 0) ? false : true"
                      switch
                    />
                    <span class="block mt-1">Unlimited SMS</span>
                  </div>
                </div>
              </div>
            </b-card-body>
          </b-card>
        </div>

      </div>

      <div class="service-plan-addons mb-4">
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
                    :name="'addon ' + (index + 1).toString() + ' description'"
                    :value="addon.description"
                    :state="!(errors.has('addon ' + (index + 1).toString() + ' description')) ? null : false"
                    v-validate="{ required: true }"
                    @keyup="$store.commit('service/updateAddon',{i:index,e:$event,type:'name'})"
                    />
                </b-input-group>
                <p class="mb-2 mt-2 text-danger" v-if="errors.has('addon ' + (index + 1).toString() +' description')">{{errors.first('addon ' + (index + 1).toString() +' description' )}}</p>
              </div>
              <div class="col-sm-4 col-xs-12">
                <label>Cost</label>
                <b-input-group>
                  <b-input-group-prepend>
                    <b-input-group-text>Amount</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input type="number" class="form-control"
                    :name="'addon ' + (index + 1).toString() + ' cost'"
                    :value="addon.cost"
                    :state="!(errors.has('addon ' + (index + 1).toString() + ' cost')) ? null : false"
                    v-validate="{ required: true, min_value:0, max_value: 999999 }"
                    @keyup="$store.commit('service/updateAddon',{i:index,e:$event,type:'price'})" />
                  <b-input-group-prepend>
                    <b-input-group-text>{{ serviceDetails.currency }}</b-input-group-text>
                  </b-input-group-prepend>
                </b-input-group>
                <p class="mb-2 mt-2 text-danger" v-if="errors.has('addon ' + (index + 1).toString() + ' cost')">{{errors.first('addon ' + (index + 1).toString() + ' cost' )}}</p>
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

<style lang="scss" scoped>

  .service-plan-items .input-group {
      margin-bottom: 10px;
  }

  .service-plan-addons .input-group {
      margin-bottom: 10px;
  }

</style>