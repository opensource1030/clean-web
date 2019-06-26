<template>
  <div class="page service-page service-edit-page">
    <spinner v-if="isLoading" />

    <div v-else>
      <div class="mb-4">
        <div class="tag-header bg-info">
          Plan Details
        </div>
        <b-card no-body class="border-0">
          <b-card-body>
            <div class="row expanded">
              <div class="col-sm-6 col-xs-12">
                <label>Title</label>
                <b-form-input type="text" class="form-control" :value="serviceDetails.title"
                              @input="$store.commit('service/updateServiceDetail',{e:$event,type:'title'})"></b-form-input>
              </div>
              <div class="col-sm-6 col-xs-12">
                <div class="row">
                  <div class="col-sm-5">
                    <label>Plan Code</label>
                    <b-form-input type="text" class="form-control" :value="serviceDetails.code"
                                  @input="$store.commit('service/updateServiceDetail',{e:$event,type:'code'})"></b-form-input>
                  </div>
                  <div class="col-sm-4">
                    <label>Cost</label>
                    <b-form-input type="text" class="form-control" :value="serviceDetails.cost"
                                  @input="$store.commit('service/updateServiceDetail',{e:$event,type:'cost'})"></b-form-input>
                  </div>
                  <div class="col-sm-3">
                    <label>Currency</label>
                    <multiselect v-model="serviceDetails.currency" :options="currencyUnit" :searchable="false"
                                 :show-labels="false" placeholder="Unit"
                                 @input="$store.commit('service/updateServiceDetail',{e:$event,type:'currency'})"></multiselect>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-6 col-xs-12">
                <label>Description</label>
                <textarea class="form-control" rows="5" :value="serviceDetails.description"
                          @input="$store.commit('service/updateServiceDetail',{e:$event,type:'description'})"></textarea>
              </div>
              <div class="col-sm-6 col-xs-12">
                <div class="form-group">
                  <label>Carriers</label>
                  <multiselect v-model="serviceDetails.carrierId" track-by="presentation" label="presentation" :options="carriers"
                               :searchable="false" :show-labels="false" placeholder="Select Carrier"
                               @input="$store.commit('service/updateServiceDetail',{e:$event,type:'carrierId'})">
                    <template slot="singleLabel" slot-scope="{ option }">{{ option.presentation }}</template>
                  </multiselect>
                </div>
                <div class="form-group">
                  <label class="block">Active</label>
                  <c-switch color="primary" v-model="serviceDetails.status" value="1" uncheckedValue="0"
                            @change="$store.commit('service/updateServiceDetail',{e:$event,type:'status'})"/>
                </div>
              </div>
            </div>
          </b-card-body>
        </b-card>
      </div>

      <div class="mb-4">
        <div class="tag-header bg-info">
          Domestic Services
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
                                @input="$store.commit('service/updateDomesticplan',{e:$event,type:'minutes'})"></b-form-input>
                </b-input-group>
              </div>
              <div class="col-sm-4 col-xs-12">
                <label><i class="fa fa-database"></i> Data</label>
                <b-input-group>
                  <b-input-group-prepend>
                    <b-input-group-text>Amount</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input type="number" class="form-control" :value="domesticPlan.data.value"
                                @input="$store.commit('service/updateDomesticplan',{e:$event,type:'data'})"></b-form-input>
                  <multiselect v-model="domesticDataUnit" :options="dataUnit" :searchable="false"
                               :show-labels="false" placeholder="Unit"
                               @input="$store.commit('service/updateDomesticplan',{e:$event,type:'unit'})"></multiselect>
                </b-input-group>
              </div>
              <div class="col-sm-4 col-xs-12">
                <label><i class="fa fa-commenting"></i> SMS</label>
                <b-input-group>
                  <b-input-group-prepend>
                    <b-input-group-text>Amount</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input type="number" class="form-control" :value="domesticPlan.sms.value"
                                @input="$store.commit('service/updateDomesticplan',{e:$event,type:'sms'})"></b-form-input>
                </b-input-group>
              </div>
            </div>
          </b-card-body>
        </b-card>
      </div>

      <div class="mb-4">
        <div class="tag-header bg-info">
          International Services
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
                                @input="$store.commit('service/updateInternationalplan',{e:$event,type:'minutes'})"></b-form-input>
                </b-input-group>
              </div>
              <div class="col-sm-4 col-xs-12">
                <label><i class="fa fa-database"></i> Data</label>
                <b-input-group>
                  <b-input-group-prepend>
                    <b-input-group-text>Amount</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input type="number" class="form-control" :value="internationalPlan.data.value"
                                @input="$store.commit('service/updateInternationalplan',{e:$event,type:'data'})"></b-form-input>
                  <multiselect v-model="internationalDataUnit" :options="dataUnit" :searchable="false"
                               :show-labels="false" placeholder="Unit"
                               @input="$store.commit('service/updateInternationalplan',{e:$event,type:'unit'})"></multiselect>
                </b-input-group>
              </div>
              <div class="col-sm-4 col-xs-12">
                <label><i class="fa fa-commenting"></i> SMS</label>
                <b-input-group>
                  <b-input-group-prepend>
                    <b-input-group-text>Amount</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input type="number" class="form-control" :value="internationalPlan.sms.value"
                                @input="$store.commit('service/updateInternationalplan',{e:$event,type:'sms'})"></b-form-input>
                </b-input-group>
              </div>
            </div>
          </b-card-body>
        </b-card>
      </div>

      <div class="mb-4">
        <div class="tag-header bg-info">
          Add-Ons
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
                                @keyup="$store.commit('service/updateAddon',{i:index,e:$event,type:'name'})"></b-form-input>
                </b-input-group>
              </div>
              <div class="col-sm-4 col-xs-12">
                <label>Cost</label>
                <b-input-group>
                  <b-input-group-prepend>
                    <b-input-group-text>Amount</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input type="number" class="form-control" :value="addon.cost"
                                @keyup="$store.commit('service/updateAddon',{i:index,e:$event,type:'price'})"></b-form-input>
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

<script src="./service_edit.ctrl.js" lang="babel"></script>

<style lang="scss">
  .service-edit-page {
    .tag-header {
      display: inline-block;
      padding: 0px 100px 0px 20px;
      font-size: 18px;
      font-weight: 500;
      line-height: 40px;
    }

    .input-group {
      margin-bottom: 20px;
    }

    .multiselect {
      width: initial;
      min-height: 35px;

      .multiselect__select {
        height: 35px;
      }

      .multiselect__tags {
        padding-top: 2px;
        border-bottom-left-radius: 0;
        border-top-left-radius: 0;
        min-height: 35px;
      }

      .multiselect__single, .multiselect__placeholder {
        margin-bottom: 6px;
        padding-top: 4px;
      }
    }

    .block {
      display: block;
    }

    .btn-control {
      position: absolute;
      right: 15px;
      bottom: 20px;
    }

    .fa-lightbulb-o:before {
      content: "\F067";
    }

    .btn-submit {

    }

  }
</style>
