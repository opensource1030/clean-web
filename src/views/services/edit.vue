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
                      :state="formValidators.flags.costErr"
                      :value="serviceDetails.cost"
                      @input="$store.commit('service/updateServiceDetail',{e:$event,type:'cost'})"
                    />
                    <p v-if="formValidators.flags.costErr === false" class="mb-0 mt-2 text-danger">Must be between 0 and 999.999</p>
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
                    :value="domesticPlan.minutes.value"
                    @input="$store.commit('service/updateDomesticplan',{e:$event,type:'minutes'})"
                    :state="formValidators.flags.domesticMinutesErr"
                    :disabled="!unlimitedSwitches.domesticMinutes"
                    />
                    <p v-if="formValidators.flags.domesticMinutesErr === false" class="mb-0 mt-2 text-danger">Must be between 0 and 999.999</p>
                </b-input-group>
                <div class="d-flex">
                  <label class="block">Unlimited Minutes</label>
                  <c-switch
                    color="primary"
                    :checked="unlimitedSwitches.domesticMinutes"
                    @change="unlimitedSwitches.domesticMinutes = !unlimitedSwitches.domesticMinutes"
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
                    :value="domesticPlan.data.value"
                    @input="$store.commit('service/updateDomesticplan',{e:$event,type:'data'})"
                    :state="formValidators.flags.domesticDataErr"
                    :disabled="!unlimitedSwitches.domesticData"
                    />
                  <multiselect
                    placeholder="Unit"
                    :options="dataUnit"
                    :searchable="false"
                    :show-labels="false"
                    :value="domesticPlan.data.unit"
                    @input="$store.commit('service/updateDomesticplan',{e:$event,type:'unit'})" />
                  <p v-if="formValidators.flags.domesticDataErr === false" class="mb-0 mt-2 text-danger">Must be between 0 and 999.999</p>
                </b-input-group>
                <div class="d-flex">
                  <label class="block">Unlimited Data</label>
                  <c-switch
                    color="primary"
                    :checked="unlimitedSwitches.domesticData"
                    @change="unlimitedSwitches.domesticData = !unlimitedSwitches.domesticData"
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
                    :value="domesticPlan.sms.value"
                    @input="$store.commit('service/updateDomesticplan',{e:$event,type:'sms'})"
                    :disabled="!unlimitedSwitches.domesticSMS"
                    :state="formValidators.flags.domesticSMSErr"
                  />
                  <p v-if="formValidators.flags.domesticSMSErr === false" class="mb-0 mt-2 text-danger">Must be between 0 and 999.999</p>
                </b-input-group>
                <div class="d-flex">
                  <label class="block">Unlimited SMS</label>
                  <c-switch
                    color="primary"
                    :checked="unlimitedSwitches.domesticSMS"
                    @change="unlimitedSwitches.domesticSMS = !unlimitedSwitches.domesticSMS"
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
                    :value="internationalPlan.minutes.value"
                    @input="$store.commit('service/updateInternationalplan',{e:$event,type:'minutes'})"
                    :state="formValidators.flags.internationalMinutesErr"
                    :disabled="!unlimitedSwitches.internationalMinutes"
                  />
                  <p v-if="formValidators.flags.internationalMinutesErr === false" class="mb-0 mt-2 text-danger">Must be between 0 and 999.999</p>
                </b-input-group>
                <div class="d-flex">
                  <label class="block">Unlimited Minutes</label>
                  <c-switch
                    color="primary"
                    :checked="unlimitedSwitches.internationalMinutes"
                    @change="unlimitedSwitches.internationalMinutes = !unlimitedSwitches.internationalMinutes"
                  />
                </div>
              </div>
              <div class="col-sm-4 col-xs-12">
                <label><i class="fa fa-database"></i> Data</label>
                <b-input-group>
                  <b-input-group-prepend>
                    <b-input-group-text>Amount</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input type="number" class="form-control" :value="internationalPlan.data.value"
                    @input="$store.commit('service/updateInternationalplan',{e:$event,type:'data'})"
                    :disabled="!unlimitedSwitches.internationalData"
                    :state="formValidators.flags.internationalDataErr"
                                />
                  <multiselect
                    placeholder="Unit"
                    :options="dataUnit"
                    :searchable="false"
                    :show-labels="false"
                    :value="internationalPlan.data.unit"
                    @input="$store.commit('service/updateInternationalplan',{e:$event,type:'unit'})" />
                  <p v-if="formValidators.flags.internationalDataErr === false" class="mb-0 mt-2 text-danger">Must be between 0 and 999.999</p>
                </b-input-group>
                <div class="d-flex">
                  <label class="block">Unlimited Data</label>
                  <c-switch
                    color="primary"
                    :checked="unlimitedSwitches.internationalData"
                    @change="unlimitedSwitches.internationalData = !unlimitedSwitches.internationalData"
                  />
                </div>
              </div>
              <div class="col-sm-4 col-xs-12">
                <label><i class="fa fa-commenting"></i> SMS</label>
                <b-input-group>
                  <b-input-group-prepend>
                    <b-input-group-text>Amount</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input type="number" class="form-control" :value="internationalPlan.sms.value"
                    @input="$store.commit('service/updateInternationalplan',{e:$event,type:'sms'})"
                    :state="formValidators.flags.internationalSMSErr"
                    :disabled="!unlimitedSwitches.internationalSMS"
                    />
                  <p v-if="formValidators.flags.internationalSMSErr === false" class="mb-0 mt-2 text-danger">Must be between 0 and 999.999</p>
                </b-input-group>
                <div class="d-flex">
                  <label class="block">Unlimited SMS</label>
                  <c-switch
                    color="primary"
                    :checked="unlimitedSwitches.internationalSMS"
                    @change="unlimitedSwitches.internationalSMS = !unlimitedSwitches.internationalSMS"
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
                  <b-form-input type="text" class="form-control" :value="addon.description"
                                @keyup="$store.commit('service/updateAddon',{i:index,e:$event,type:'name'})" />
                </b-input-group>
              </div>
              <div class="col-sm-4 col-xs-12">
                <label>Cost</label>
                <b-input-group>
                  <b-input-group-prepend>
                    <b-input-group-text>Amount</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input type="number" class="form-control"
                    :value="addon.cost"
                    :state="formValidators.addonFlags['addon' + index.toString() + 'Cost']"
                    @keyup="$store.commit('service/updateAddon',{i:index,e:$event,type:'price'})" />
                  <b-input-group-prepend>
                    <b-input-group-text>{{ serviceDetails.currency }}</b-input-group-text>
                  </b-input-group-prepend>
                  <p v-if="(formValidators.addonFlags['addon' + index.toString() + 'Cost']) === false" class="mb-0 mt-2 text-danger">Must be between 0 and 999.999</p>
                </b-input-group>
              </div>
              <div class="col-sm-4 col-xs-12">
                <b-button class="btn-control" variant="danger" aria-pressed="true"
                          @click="$store.commit('service/deleteAddOns',index); removeFormAddonValidator();">X</b-button>
              </div>
            </div>
            <div class="input-group-wrapper">
              <b-button variant="primary" @click="$store.commit('service/hideAndPush'); addFormAddonValidator();">
                <i class="fa fa-lightbulb-o"></i>&nbsp; Add New Field
              </b-button>
            </div>
          </b-card-body>
        </b-card>
      </div>

      <b-button variant="primary" class="mb-4" @click="save()" id="button">Save Changes</b-button>
      <p v-if="formValidators.generalErr" class="mb-0 mt-2 text-danger">Some errors were found. Check the fields above for more details</p>

    </div>
  </div>
</template>

<script src="./edit.ctrl.js" lang="babel"></script>
