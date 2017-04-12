<template>
<div class="page service-page service-edit-page">


          <div class="columns small-12">
            <div class="grid-box overview">
              <div class="box-heading">
            <h2>{{names.planDetails}}</h2>
          </div>
          <div class="box-content">
            <div class="row">
                    <div class="medium-6 columns">
                      <label>{{names.title}}
                        <input :title="names.titleMessage" name="tittle" :class="{ 'error-input': $store.getters['error/error']=='titleError' }" type="text" placeholder="" :value="serviceDetails.title" @input="$store.commit('service/updateServiceDetail',{e:$event,type:'title'})">
                      </label>
                    </div>
                    <div class="medium-6 columns padding-responsive">
                      <div class="medium-5 columns">
                        <label>{{names.planCode}}
                          <input :title="names.planCodeMessage" name="planCode" :class="{ 'error-input': $store.getters['error/error']=='planCodeError' }" type="text" placeholder="" :value="serviceDetails.code" @input="$store.commit('service/updateServiceDetail',{e:$event,type:'code'})">
                        </label>
                      </div>
                      <div class="medium-4 columns">
                        <label>{{names.cost}}
                          <input :title="names.costMessage" type="number" name="cost" min="0"  :class="{ 'error-input': $store.getters['error/error']== 'costError' }" placeholder="" :value="serviceDetails.cost" @input="$store.commit('service/updateServiceDetail',{e:$event,type:'cost'})">
                        </label>
                      </div>
                      <div class="medium-3 columns padding-unit" id="currency">

                        <multiselect   :value="serviceDetails.currency" :options="names.currency" :searchable="false" @input="$store.commit('service/updateServiceDetail',{e:$event,type:'currency'})" :show-labels="false">
                        </multiselect>
                      </div>
                    </div>
                </div>
                <div class="row">
                    <div class="columns medium-12">
                    <label>{{names.description}}
                      <textarea :title="names.descriptionMessage" name="description" rows="3" :class="{ 'error-input': $store.getters['error/error']== 'description' }" :value="serviceDetails.description" @input="$store.commit('service/updateServiceDetail',{e:$event,type:'description'})"></textarea>
                    </label>
                  </div>
                  </div>

                  <div class="row">
                    <div class="medium-6 columns" >
                      <label>{{names.carriers}}
                        <multiselect
                        :value="serviceDetails.carrierId"
                         :options="carriers"
                         :searchable="false"
                         @input="$store.commit('service/updateServiceDetail',{e:$event,type:'carrierId'})"
                          label="presentation"
                          :show-labels="false"
                          :option-width="100"
                        >
                        </multiselect>
                        </label>

                    </div>
                    <div class="columns medium-6">
                      <label>
                        <span>Active</span>
                        <div class="switch tiny">
                          <input class="switch-input" :id="'status-' + serviceDetails.id" type="checkbox" :name="'status-' + serviceDetails.id" @input="$store.commit('service/updateServiceDetail',{e:$event,type:'status'})">
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
                  <div class="box-content">
                <div class="row padding-bottop">
                  <div class="medium-4 small-12 columns">
                    <div class="large-6 small-4 columns">
                      <h6><i class="fa fa-clock-o fa-lg" aria-hidden="true"></i>&emsp;{{names.minutes}}</h6>
                    </div>
                    <div class="large-4 end small-8 columns">
                      <label>{{names.amount}}
                          <input :title="names.ammountMessage" name="minutesD" type="number" min="0"  placeholder="" :value="domesticPlan.minutes.value" @input="$store.commit('service/updateDomesticplan',{e:$event,type:'minutes'})" >
                        </label>
                    </div>
                  </div>
                  <div class="large-4 small-12 columns">
                    <div class="large-5 small-4 columns">
                      <h6><i class="fa fa-database fa-lg" aria-hidden="true"></i>&emsp;{{names.data}}</h6>
                    </div>
                    <div class="large-3 small-4 columns">
                      <label>{{names.amount}}
                          <input  :title="names.ammountMessage" name="dataD" type="number" min="0" placeholder="" :value="domesticPlan.data.value" @input="$store.commit('service/updateDomesticplan',{e:$event,type:'data'})" >
                        </label>
                    </div>
                    <div class="large-4 small-4 columns padding-unit" id="unitD">
                      <!---  <select class="unit" :class="{ 'error-input': errorsStyle.unitDomError }" v-model="domesticPlan.data.unit">
                          <option value="Mb">{{names.unit.mega}}</option>
                          <option value="Gb">{{names.unit.giga}}</option>
                          <option value="Tb">{{names.unit.tera}}</option>
                        </select>-->
                      <multiselect :value="domesticPlan.data.unit" :options="names.unit" :searchable="false" @input="$store.commit('service/updateDomesticplan',{e:$event,type:'unit'})" :show-labels="false"  :option-width="100">
                      </multiselect>
                    </div>
                  </div>
                  <div class="large-4 small-12 columns">
                    <div class="large-6 large-offset-1 small-4 columns">
                      <h6><i class="fa fa-commenting fa-lg" aria-hidden="true"></i>&emsp;{{names.sms}}</h6>
                    </div>
                    <div class="large-4 end small-8 end columns">
                      <label>{{names.amount}}
                          <input :title="names.ammountMessage" name="smsD" type="number" min="0" placeholder="" :value="domesticPlan.sms.value" @input="$store.commit('service/updateDomesticplan',{e:$event,type:'sms'})" >
                        </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="columns small-12">
            <div class="grid-box overview">
              <div class="box-heading">
                <h2>{{names.internationalServices}}</h2>
              </div>
              <div class="box-content">
                <div class="row padding-bottop">
                  <div class="large-4 small-12 columns">
                    <div class="large-6 small-4 columns">
                      <h6><i class="fa fa-clock-o fa-lg" aria-hidden="true"></i>&emsp;{{names.minutes}}</h6>
                    </div>
                    <div class="large-4 end small-8 columns">
                      <label>{{names.amount}}
                          <input :title="names.ammountMessage" name="iminutes" type="number" min="0"  placeholder="" :value="internationalPlan.minutes.value" @input="$store.commit('service/updateInternationalplan',{e:$event,type:'minutes'})" >
                        </label>
                    </div>
                  </div>
                  <div class="large-4 small-12 columns">
                    <div class="large-5 small-4 columns">
                      <h6><i class="fa fa-database fa-lg" aria-hidden="true"></i>&emsp;{{names.data}}</h6>
                    </div>
                    <div class="large-3 small-4 columns">
                      <label>{{names.amount}}
                          <input  :title="names.ammountMessage" name="idata" type="number" min="0" placeholder="" :value="internationalPlan.data.value" @input="$store.commit('service/updateInternationalplan',{e:$event,type:'data'})">
                        </label>
                    </div>
                    <div class="large-4 small-4 columns padding-unit" id="iunit" >
                      <!--      <select class="unit" :class="{ 'error-input': errorsStyle.unitDomError }" v-model="internationalPlan.data.unit">
                          <option value="Mb">{{names.unit.mega}}</option>
                          <option value="Gb">{{names.unit.giga}}</option>
                          <option value="Tb">{{names.unit.tera}}</option>
                        </select>-->
                      <multiselect :value="internationalPlan.data.unit"  :options="names.unit" :searchable="false" @input="$store.commit('service/updateInternationalplan',{e:$event,type:'unit'})" :show-labels="false"  >
                      </multiselect>

                    </div>
                  </div>
                  <div class="large-4 small-12 columns">
                    <div class="large-6 large-offset-1 small-4 columns">
                      <h6><i class="fa fa-commenting fa-lg" aria-hidden="true"></i>&emsp;{{names.sms}}</h6>
                    </div>
                    <div class="large-4 end small-8 end columns">
                      <label>{{names.amount}}
                          <input :title="names.ammountMessage" name="isms" type="number" min="0" placeholder="" :value="internationalPlan.sms.value" @input="$store.commit('service/updateInternationalplan',{e:$event,type:'sms'})" >
                        </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="columns small-12">
            <div class="grid-box udl">
              <div class="box-heading">
                <h2>{{names.addons}}</h2>
                <div class="input-group-wrapper">
                  <div class="input-group">
                    <div class="input-group-label">
                      <span><i class="fa fa-plus"></i></span>
                    </div>
                    <div class="input-group-button">
                      <input type="button" class="button add-udl-button" value="Add New Field" @click="$store.commit('service/hideAndPush',index)">
                    </div>
                  </div>
                </div>
              </div>
              <div class="box-content">
                <div class="row " v-for="(addon,index) in addons">
                  <div class="medium-4 small-12 columns">
                    <div class="medium-3 small-3 columns">
                      <h6 class="addon">{{names.name}}</h6>
                    </div>
                    <div class="medium-9 small-8 end columns">
                      <label>{{names.description}}
                          <input :name="'addonDes'+index" :class="{ 'error-input': $store.getters['error/error']== 'addonNameError' }" :title="names.addonsNameMessage" type="text" placeholder="" :value="addon.description"  @keyup="$store.commit('service/updateAddon',{i:index,e:$event,type:'name'})">
                        </label>
                    </div>
                  </div>
                  <div class="medium-4 columns small-6">
                    <div class="medium-3 small-3 columns">
                      <h6 class="addon">{{names.cost}}</h6>
                    </div>
                    <div class="medium-6 small-6 columns">
                      <label>{{names.amount}}
                          <input :name="'addonCost'+index" :class="{ 'error-input': $store.getters['error/error']== 'addonPriceError' }" :title="names.addonsCostMessage" type="number" min="0" placeholder="" :value="addon.cost"  @keyup="$store.commit('service/updateAddon',{i:index,e:$event,type:'price'})">
                        </label>
                    </div>
                    <div class="medium-3 small-2 end columns padding-unit">
                      <h6>{{serviceDetails.currency}}</h6>

                    </div>


                  </div>
                  <div class="medium-4 end small-6 end columns">
                      <span class="label close" @click="$store.commit('service/deleteAddOns',index)" id="button" :id="'delete'+index"><i class="fa fa-close"></i></span>
                 </div>

                </div>
                </div>
              </div>
            </div>




      <div v-if="$store.getters['error/hasError']" v-show="$store.getters['error/hasError']">
        <div class="is-error callout" data-closable>
          <div class="container">
            <h5>{{$store.getters['error/errorPrimary']}}</h5>
          </div>
        </div>
      </div>
      <a class="button large save" @click="save()" id="button">{{names.saveChanges}}</a>

</div>
</template>

<script src="./service.crtl.js" lang="babel"></script>

<style scoped>
.multiselect {
  margin: 1.3rem 0 1.05263rem;
}
.multiselect__option span {
  margin-left: -1rem;
}
.carriers {
  margin-top: -0.1rem;
}
</style>
