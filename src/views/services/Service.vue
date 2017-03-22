<template>
<div>
  <div class="full-height row">
    <div id="service">
      <div class="header"></div>
      <div class="expanded row">
        <div class="large-12 columns titles">
          <h4>{{names.managePlan}}</h4>
        </div>
        <div class="large-12 columns padding-responsive">
          <ul class="acordeon" data-accordion data-allow-all-closed="true" v-f-accordion>
            <li class="acordeon-item is-active" data-accordion-item v-f-accordion>
              <a href="#" class="accordion-title" @click="showFalse()">{{names.planDetails}}</a>
              <div class="accordion-content overview padding-responsive" data-tab-content v-f-accordion>
                <div class="row padding-bottop">
                  <div class="large-12 small-12 columns">
                    <div class="large-7 small-12 columns">
                      <label>{{names.title}}
                        <input :title="names.titleMessage" name="tittle" :class="{ 'error-input': $store.getters['error/error']=='titleError' }" type="text" placeholder="" :value="serviceDetails.title" @input="$store.commit('service/updateServiceDetail',{e:$event,type:'title'})">
                      </label>
                    </div>
                    <div class="large-5 small-12 columns padding-responsive">
                      <div class="large-5 small-5 columns">
                        <label>{{names.planCode}}
                          <input :title="names.planCodeMessage" name="planCode" :class="{ 'error-input': $store.getters['error/error']=='planCodeError' }" type="text" placeholder="" :value="serviceDetails.code" @input="$store.commit('service/updateServiceDetail',{e:$event,type:'code'})">
                        </label>
                      </div>
                      <div class="large-3 small-3 columns">
                        <label>{{names.cost}}
                          <input :title="names.costMessage" type="number" name="cost" min="0"  :class="{ 'error-input': $store.getters['error/error']== 'costError' }" placeholder="" :value="serviceDetails.cost" @input="$store.commit('service/updateServiceDetail',{e:$event,type:'cost'})">
                        </label>
                      </div>
                      <div class="large-4 small-4 columns padding-unit" id="currency">

                        <multiselect   :value="serviceDetails.currency" :options="names.currency" :searchable="false" @input="$store.commit('service/updateServiceDetail',{e:$event,type:'currency'})" :show-labels="false" :select-label="''">
                        </multiselect>
                      </div>
                    </div>
                  </div>
                  <div class="large-12 small-12 columns padding-description">
                    <label>{{names.description}}
                      <textarea :title="names.descriptionMessage" name="description" rows="3" :class="{ 'error-input': $store.getters['error/error']== 'description' }" :value="serviceDetails.description" @input="$store.commit('service/updateServiceDetail',{e:$event,type:'description'})"></textarea>
                    </label>
                  </div>
                  <div class="large-12 small-12 columns">
                    <div class="large-7 small-7 columns" id="carriers">
                      <label>{{names.carriers}}
                        <multiselect
                        class="carriers"
                        :value="serviceDetails.carrierId"
                         :options="carriers"
                         :searchable="false"
                         @input="$store.commit('service/updateServiceDetail',{e:$event,type:'carrierId'})"
                          label="presentation"
                          track-by="id"
                          :show-labels="false"
                          :select-label="''"
                          :option-width="100"
                        >
                        </multiselect>

                      </label>
                    </div>
                    <div class="large-3 large-offset-2 small-5 columns">
                      <label class="status">
                        <input :title="names.statusMessage" id="status" class="checkboxbigger" type="checkbox" :checked="serviceDetails.status" @input="$store.commit('service/updateServiceDetail',{e:$event,type:'status'})"  :value="serviceDetails.status">
                        <span class="custom-checkbox"><i class="icon-check"></i></span>{{names.status}}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li class="acordeon-item" data-accordion-item v-f-accordion>
              <a href="#" class="accordion-title" @click="showFalse()">{{names.domesticServices}}</a>
              <div class="accordion-content padding-responsive" data-tab-content v-f-accordion>
                <div class="row padding-bottop">
                  <div class="large-4 small-12 columns">
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
                      <multiselect :value="domesticPlan.data.unit" :options="names.unit" :searchable="false" @input="$store.commit('service/updateDomesticplan',{e:$event,type:'unit'})" :show-labels="false" :select-label="''" :option-width="100">
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
            </li>
            <li class="acordeon-item" data-accordion-item v-f-accordion>
              <a href="#" class="accordion-title" @click="showFalse()">{{names.internationalServices}}</a>
              <div class="accordion-content padding-responsive" data-tab-content v-f-accordion>
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
                      <multiselect :value="internationalPlan.data.unit"  :options="names.unit" :searchable="false" @input="$store.commit('service/updateInternationalplan',{e:$event,type:'unit'})" :show-labels="false" :select-label="''">
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
            </li>
            <li class="acordeon-item" data-accordion-item v-f-accordion>
              <a href="#" class="accordion-title" @click="showFalse()">{{names.addons}}</a>
              <div class="accordion-content padding-responsive" data-tab-content v-f-accordion>
                <div class="row padding-bottop" v-for="(addon,index) in addons">
                  <div class="large-5 small-12 columns">
                    <div class="large-3 small-3 columns">
                      <h6 class="addon">{{names.name}}</h6>
                    </div>
                    <div class="large-9 small-8 end columns">
                      <label>{{names.description}}
                          <input :name="'addonDes'+index" :class="{ 'error-input': $store.getters['error/error']== 'addonNameError' }" :title="names.addonsNameMessage" type="text" placeholder="" :value="addon.description"  @keyup="$store.commit('service/updateAddon',{i:index,e:$event,type:'name'})">
                        </label>
                    </div>
                  </div>
                  <div class="large-4 small-12 columns">
                    <div class="large-3 small-3 columns">
                      <h6 class="addon">{{names.cost}}</h6>
                    </div>
                    <div class="large-6 small-6 columns">
                      <label>{{names.amount}}
                          <input :name="'addonCost'+index" :class="{ 'error-input': $store.getters['error/error']== 'addonPriceError' }" :title="names.addonsCostMessage" type="number" min="0" placeholder="" :value="addon.cost"  @keyup="$store.commit('service/updateAddon',{i:index,e:$event,type:'price'})">
                        </label>
                    </div>
                    <div class="large-3 small-2 end columns padding-unit">
                      <h6>{{serviceDetails.currency}}</h6>
                    </div>
                  </div>
                  <div class="large-3 small-12 columns">
                    <div class="large-4 small-2 small-offset-2 columns">
                      <a :title="names.deleteButton" class="button" @click="$store.commit('service/deleteAddOns',index)" id="button" :id="'delete'+index" v-show="addon.delete">
                        <i class="fa fa-times fa-2x" aria-hidden="true"></i>
                      </a>
                    </div>
                    <div class="large-4 end small-2 end columns">
                      <a :title="names.addButton" class="button" @click="$store.commit('service/hideAndPush',index)" id="button" :id="'add'+index" v-show="addon.add">
                        <i class="fa fa-plus fa-2x"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
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
  </div>
</div>
</div>
</template>


<script src="./service.crtl.js" lang="babel"></script>


<style src="./../../../node_modules/vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
.multiselect {
  margin-top: 1.3rem;
}
.multiselect__option span {
  margin-left: -1rem;
}
.carriers {
  margin-top: -0.1rem;
}
</style>
