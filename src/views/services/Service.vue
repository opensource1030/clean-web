<template>
<div class="page service-page service-edit-page">
  <!--
  <div v-if="$store.getters['error/hasError']" v-show="$store.getters['error/hasError']">
    <div class="is-error callout" data-closable>
      <div class="container">
        <h5>{{$store.getters['error/errorPrimary']}}</h5>
      </div>
    </div>
  </div>
  -->

  <modal v-if="$store.getters['error/hasError']" @close="$store.dispatch('error/clearAll')">
    <h3 slot="body">{{ $store.getters['error/error'] }}</h3>
  </modal>

  <div v-if="isReady">
    <div class="columns small-12">
      <div class="grid-box overview">
        <div class="box-heading">
          <h2>{{names.planDetails}}</h2>
        </div>
        <div class="box-content-holder">
          <div class="row expanded">
            <div class="large-6 medium-12 columns">
              <label>
                <strong>{{names.title}}</strong>
                <input :title="names.titleMessage" name="tittle"
                    :class="{ 'error-input': $store.getters['error/error']=='titleError' }"
                    type="text" placeholder="" :value="serviceDetails.title"
                    @input="$store.commit('service/updateServiceDetail',{e:$event,type:'title'})">
              </label>
            </div>
            <div class="large-6 medium-12 columns">
              <div class="row default">
                <div class="medium-5 columns">
                  <label><strong>{{names.planCode}}</strong>
                    <input :title="names.planCodeMessage" name="planCode"
                        :class="{ 'error-input': $store.getters['error/error']=='planCodeError' }" type="text" placeholder=""
                        :value="serviceDetails.code" @input="$store.commit('service/updateServiceDetail',{e:$event,type:'code'})">
                  </label>
                </div>
                <div class="medium-4 columns">
                  <label><strong>{{names.cost}}</strong>
                    <input :title="names.costMessage" type="number" name="cost" min="0"
                        :class="{ 'error-input': $store.getters['error/error']== 'costError' }" placeholder=""
                        :value="serviceDetails.cost" @input="$store.commit('service/updateServiceDetail',{e:$event,type:'cost'})">
                  </label>
                </div>
                <div class="medium-3 columns" id="currency">
                  <label>
                    <strong>Currency</strong>
                    <div class="multiselect-holder">
                      <multiselect :value="serviceDetails.currency" :options="names.currency" :searchable="false"
                          @input="$store.commit('service/updateServiceDetail',{e:$event,type:'currency'})"
                          :show-labels="false">
                      </multiselect>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="columns medium-6">
              <label>
                <strong>{{names.description}}</strong>
                <textarea :title="names.descriptionMessage" name="description" rows="5"
                    :class="{ 'error-input': $store.getters['error/error']== 'description' }"
                    :value="serviceDetails.description"
                    @input="$store.commit('service/updateServiceDetail',{e:$event,type:'description'})">
                </textarea>
              </label>
            </div>
            <div class="medium-6 columns">
              <label>
                <strong>{{names.carriers}}</strong>
                <div class="multiselect-holder">
                  <multiselect
                      :value="serviceDetails.carrierId"
                      :options="carriers"
                      :searchable="false"
                      @input="$store.commit('service/updateServiceDetail',{e:$event,type:'carrierId'})"
                      label="presentation"
                      :show-labels="false"
                      :option-width="100">
                  </multiselect>
                </div>
              </label>
              <label>
                <strong>Active</strong>
                <div class="switch tiny">
                  <input class="switch-input" :id="'status-' + serviceDetails.id" type="checkbox"
                      :name="'status-' + serviceDetails.id" :checked="serviceDetails.status"
                      @change="$store.commit('service/updateServiceDetail',{e:$event,type:'status'})">
                  <label class="switch-paddle" :for="'status-' + serviceDetails.id">
                  </label>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="columns small-12">
      <div class="grid-box overview">
        <div class="box-heading">
          <h2>{{names.domesticServices}}</h2>
        </div>
        <div class="box-content-holder">
          <div class="row expanded ">
            <div class="large-4 medium-12 columns">
              <label>
                <strong><i class="fa fa-clock-o" aria-hidden="true"></i>{{ names.minutes }}</strong>
                <div class="input-group">
                  <span class="input-group-label">{{names.amount}}</span>
                  <input class="input-group-field" :title="names.ammountMessage" name="minutesD" type="number"
                      min="0" placeholder="" :value="domesticPlan.minutes.value"
                      @input="$store.commit('service/updateDomesticplan',{e:$event,type:'minutes'})">
                </div>
              </label>
            </div>
            <div class="large-4 medium-12 columns">
              <div class="form-label">
                <label for="domestic-plan">
                  <strong><i class="fa fa-database" aria-hidden="true"></i>{{ names.data }}</strong>
                </label>
                <div class="row collapse">
                  <div class="small-8 columns">
                    <div class="input-group">
                      <span class="input-group-label">{{ names.amount }}</span>
                      <input id="domestic-plan" class="input-group-field" :title="names.ammountMessage"
                          name="dataD" type="number" min="0" placeholder="" :value="domesticPlan.data.value"
                          @input="$store.commit('service/updateDomesticplan',{e:$event,type:'data'})">
                    </div>
                  </div>
                  <div class="small-4 columns">
                    <div class="multiselect-holder" id="unitD">
                      <multiselect :value="domesticPlan.data.unit" :options="names.unit" :searchable="false"
                          @input="$store.commit('service/updateDomesticplan',{e:$event,type:'unit'})" :show-labels="false">
                      </multiselect>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="large-4 medium-12 columns">
              <label>
                <strong><i class="fa fa-commenting" aria-hidden="true"></i>{{ names.sms }}</strong>
                <div class="input-group">
                  <span class="input-group-label">{{ names.amount }}</span>
                  <input class="input-group-field" :title="names.ammountMessage" name="smsD" type="number"
                      min="0" placeholder="" :value="domesticPlan.sms.value"
                      @input="$store.commit('service/updateDomesticplan',{e:$event,type:'sms'})">
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="columns small-12">
      <div class="grid-box overview">
        <div class="box-heading">
          <h2>{{ names.internationalServices }}</h2>
        </div>
        <div class="box-content-holder">
          <div class="row expanded">
            <div class="large-4 small-12 columns">
              <label>
                <strong><i class="fa fa-clock-o" aria-hidden="true"></i>{{names.minutes}}</strong>
                <div class="input-group">
                  <span class="input-group-label">{{names.amount}}</span>
                  <input class="input-group-field" :title="names.ammountMessage" name="iminutes" type="number"
                      min="0" placeholder="" :value="internationalPlan.minutes.value"
                      @input="$store.commit('service/updateInternationalplan',{e:$event,type:'minutes'})">
                </div>
              </label>
            </div>
            <div class="large-4 small-12 columns">
              <div class="form-label">
                <label for="int-data"><strong><i class="fa fa-database" aria-hidden="true"></i> {{names.data}}
                </strong> </label>
                <div class="row collapse">
                  <div class="small-8 columns">
                    <div class="input-group">
                      <span class="input-group-label">{{names.amount}}</span>
                      <input id="int-data" class="input-group-field" :title="names.ammountMessage" name="idata"
                      type="number" min="0" placeholder="" :value="internationalPlan.data.value"
                      @input="$store.commit('service/updateInternationalplan',{e:$event,type:'data'})">
                    </div>
                  </div>
                  <div class="small-4 columns">
                    <div class="multiselect-holder" id="iunit">
                      <multiselect :value="internationalPlan.data.unit" :options="names.unit" :searchable="false"
                          @input="$store.commit('service/updateInternationalplan',{e:$event,type:'unit'})" :show-labels="false">
                      </multiselect>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="large-4 medium-12 columns">
              <label>
                <strong><i class="fa fa-commenting " aria-hidden="true"></i> {{names.sms}}</strong>
                <div class="input-group">
                  <span class="input-group-label">{{ names.amount }}</span>
                  <input class="input-group-field" :title="names.ammountMessage" name="isms" type="number" min="0"
                      placeholder="" :value="internationalPlan.sms.value"
                      @input="$store.commit('service/updateInternationalplan',{e:$event,type:'sms'})">
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="columns small-12">
      <div class="grid-box udl">
        <div class="box-heading">
          <h2>{{names.addons}}</h2>
        </div>
        <div class="box-content-holder">
          <div class="row row-wrapper expanded addlist " v-for="(addon,index) in addons">
            <div class="large-4 medium-6 columns ">
              <label>
                <strong>{{names.name}}</strong>
                <div class="input-group">
                  <span class="input-group-label">{{ names.description }}</span>
                  <input class="input-group-field" :name="'addonDes'+index"
                      :class="{ 'error-input': $store.getters['error/error']== 'addonNameError' }"
                      :title="names.addonsNameMessage" type="text" placeholder="" :value="addon.description"
                      @keyup="$store.commit('service/updateAddon',{i:index,e:$event,type:'name'})">
                </div>
              </label>
            </div>
            <div class="large-4 medium-6 columns">
              <label>
                <strong> {{names.cost}}</strong>
                <div class="input-group">
                  <span class="input-group-label">{{ names.amount }}</span>
                  <input class="input-group-field" :name="'addonCost'+index"
                      :class=" + { 'error-input': $store.getters['error/error']== 'addonPriceError' }"
                      :title="names.addonsCostMessage" type="number" min="0" placeholder="" :value="addon.cost"
                      @keyup="$store.commit('service/updateAddon',{i:index,e:$event,type:'price'})">
                  <span class="input-group-label">{{ serviceDetails.currency }}</span>
                </div>
              </label>
            </div>
            <div class="large-4 columns">
              <div class="btn-control">
                <a class="button delete" @click="$store.commit('service/deleteAddOns',index)" id="button" :id="'delete'+index">
                  <i class="fa fa-close"></i>
                </a>
              </div>
            </div>
          </div>
          <div class="input-group-wrapper">
            <div class="input-group">
              <div class="input-group-label">
                <span><i class="fa fa-plus"></i></span>
              </div>
              <div class="input-group-button">
                <input type="button" class="button add-udl-button" value="Add New Field"
                    @click="$store.commit('service/hideAndPush',index)">
              </div>
            </div>
          </div>
          <!-- <div class="clearfix"></div> -->
        </div>
      </div>
    </div>

    <div class="columns small-12">
      <a class="button large save" @click="save()" id="button">{{names.saveChanges}}</a>
    </div>
  </div>

  <div class="is-relative" v-show="!isReady">
    <div class="is-loading"></div>
  </div>
</div>
</template>

<script src="./service.crtl.js" lang="babel"></script>

<!--
<style scoped>
</style>
-->
