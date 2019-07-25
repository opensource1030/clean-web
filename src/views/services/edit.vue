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
                    <b-form-input type="text" class="form-control" :value="serviceDetails.code"
                                  @input="$store.commit('service/updateServiceDetail',{e:$event,type:'code'})" />
                  </div>
                  <div class="col-sm-4">
                    <label>Cost</label>
                    <b-form-input type="text" class="form-control" :value="serviceDetails.cost"
                                  @input="$store.commit('service/updateServiceDetail',{e:$event,type:'cost'})" />
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
                  <c-switch color="primary" value="1" uncheckedValue="0"
                            @change="$store.commit('service/updateServiceDetail',{e:$event,type:'status'})"/>
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
                  <b-form-input type="number" class="form-control" :value="domesticPlan.minutes.value"
                                @input="$store.commit('service/updateDomesticplan',{e:$event,type:'minutes'})" />
                </b-input-group>
              </div>
              <div class="col-sm-4 col-xs-12">
                <label><i class="fa fa-database"></i> Data</label>
                <b-input-group>
                  <b-input-group-prepend>
                    <b-input-group-text>Amount</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input type="number" class="form-control" :value="domesticPlan.data.value"
                                @input="$store.commit('service/updateDomesticplan',{e:$event,type:'data'})" />
                  <multiselect
                    placeholder="Unit"
                    :options="dataUnit"
                    :searchable="false"
                    :show-labels="false"
                    :value="domesticPlan.data.unit"
                    @input="$store.commit('service/updateDomesticplan',{e:$event,type:'unit'})" />
                </b-input-group>
              </div>
              <div class="col-sm-4 col-xs-12">
                <label><i class="fa fa-commenting"></i> SMS</label>
                <b-input-group>
                  <b-input-group-prepend>
                    <b-input-group-text>Amount</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input type="number" class="form-control" :value="domesticPlan.sms.value"
                                @input="$store.commit('service/updateDomesticplan',{e:$event,type:'sms'})" />
                </b-input-group>
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
                  <b-form-input type="number" class="form-control" :value="internationalPlan.minutes.value"
                                @input="$store.commit('service/updateInternationalplan',{e:$event,type:'minutes'})" />
                </b-input-group>
              </div>
              <div class="col-sm-4 col-xs-12">
                <label><i class="fa fa-database"></i> Data</label>
                <b-input-group>
                  <b-input-group-prepend>
                    <b-input-group-text>Amount</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input type="number" class="form-control" :value="internationalPlan.data.value"
                                @input="$store.commit('service/updateInternationalplan',{e:$event,type:'data'})" />
                  <multiselect
                    placeholder="Unit"
                    :options="dataUnit"
                    :searchable="false"
                    :show-labels="false"
                    :value="internationalPlan.data.unit"
                    @input="$store.commit('service/updateInternationalplan',{e:$event,type:'unit'})" />
                </b-input-group>
              </div>
              <div class="col-sm-4 col-xs-12">
                <label><i class="fa fa-commenting"></i> SMS</label>
                <b-input-group>
                  <b-input-group-prepend>
                    <b-input-group-text>Amount</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input type="number" class="form-control" :value="internationalPlan.sms.value"
                                @input="$store.commit('service/updateInternationalplan',{e:$event,type:'sms'})" />
                </b-input-group>
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
                  <b-form-input type="number" class="form-control" :value="addon.cost"
                                @keyup="$store.commit('service/updateAddon',{i:index,e:$event,type:'price'})" />
                  <b-input-group-prepend>
                    <b-input-group-text>{{ serviceDetails.currency }}</b-input-group-text>
                  </b-input-group-prepend>
                </b-input-group>
              </div>
              <div class="col-sm-4 col-xs-12">
                <b-button class="btn-control" variant="danger" aria-pressed="true"
                          @click="$store.commit('service/deleteAddOns',index)">X</b-button>
              </div>
            </div>
            <div class="input-group-wrapper">
              <b-button variant="primary" @click="$store.commit('service/hideAndPush')">
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
