<template>
  <div class="content-right">
    <div class="full-height row">
      <div id="service">
        <div class="header"></div>
        <div class="expanded row">
          <div class="large-12 columns titles">
            <h4>{{names.managePlan}}</h4>
          </div>
          <div class="large-12 columns">
            <ul class="acordeon">
              <li class="acordeon-item is-active">
                <a class="accordion-title">{{names.planDetails}}</a>
                <div class="accordion-content overview">
                  <div class="row">
                    <div class="large-7 columns">
                      <label>{{names.title}}
                        <input :title="names.titleMessage" :style="errorsStyle.titleError" type="text" placeholder="" :value="serviceDetails.title" v-model="serviceDetails.title">
                      </label>
                    </div>
                    <div class="large-2 columns">
                      <label>{{names.planCode}}
                        <inputValidate :title="names.planCodeMessage" :style="errorsStyle.planCodeError" type="text" placeholder="" :value="serviceDetails.code" v-model="serviceDetails.code">
                      </label>
                    </div>
                    <div class="large-1 columns">
                      <label>{{names.cost}}
                        <inputValidate :title="names.costMessage" :style="errorsStyle.costError" type="text" placeholder="" :value="serviceDetails.cost" v-model="serviceDetails.cost">
                      </label>
                    </div>
                    <div class="large-2 columns">
                      <select class="unit" :style="errorsStyle.currencyError" v-model="serviceDetails.currency">
                        <option value="USD">{{names.currency.usd}}</option>
                        <option value="GBP">{{names.currency.gbp}}</option>
                        <option value="EUR">{{names.currency.eur}}</option>
                      </select>
                    </div>
                  </div>
                  <div class="row">
                    <div class="large-12 columns">
                      <label>{{names.description}}
                        <textarea :title="names.descriptionMessage" rows="3" :value="serviceDetails.description" v-model="serviceDetails.description"></textarea>
                      </label>
                  </div>
                </div>
                <div class="row">
                  <div class="large-8 columns">
                    <label>{{names.carriers}}
                      <select @change="onSelectCarrier(serviceDetails.carrierId)" :title="names.carriersMessage" :style="errorsStyle.carrierError" v-model="serviceDetails.carrierId">
                        <option :value="null">{{names.selectCarrierName}}</option>
                        <option v-if="!noCarriers" v-for="carrier in carriers" :value="carrier.id">{{carrier.presentation}}</option>
                      </select>
                      <div v-if="noCarriers"><font color="red">{{noCarrierMessageError}}</font></div>
                      <div v-if="noCarrierSelected"><font color="red">{{carrierMessageError}}</font></div>
                    </label>
                  </div>
                  <div class="large-3 small-offset-1 columns">
                    <label class="status">
                      <input :title="names.statusMessage" class="checkboxbigger" type="checkbox" v-model="serviceDetails.status" :value="serviceDetails.status">
                      <span class="custom-checkbox"><i class="icon-check"></i></span>{{names.status}}
                    </label>
                  </div>
                </div>
              </li>
              <li class="acordeon-item">
                <a class="accordion-title">{{names.domesticServices}}</a>
                <div class="accordion-content">
                  <div class="row">
                    <div class="large-4 columns">
                      <div class="large-6 columns">
                        <h6><i class="fa fa-clock-o fa-lg" aria-hidden="true"></i>&emsp;{{names.minutes}}</h6>
                      </div>
                      <div class="large-4 end columns">
                        <label>{{names.amount}}
                          <inputValidate type="text" placeholder="" :value="domesticPlan.minutes.value || 0" v-model="domesticPlan.minutes.value">
                        </label>
                      </div>
                    </div>
                    <div class="large-4 columns">
                      <div class="large-5 columns">
                        <h6><i class="fa fa-database fa-lg" aria-hidden="true"></i>&emsp;{{names.data}}</h6>
                      </div>
                      <div class="large-4 columns">
                        <label>{{names.amount}}
                          <inputValidate type="text" placeholder="" :value="domesticPlan.data.value || 0" v-model="domesticPlan.data.value">
                        </label>
                      </div>
                      <div class="large-3 columns">
                        <select class="unit" :style="errorsStyle.unitDomError" v-model="domesticPlan.data.unit">
                          <option value="Mb">{{names.unit.mega}}</option>
                          <option value="Gb">{{names.unit.giga}}</option>
                          <option value="Tb">{{names.unit.tera}}</option>
                        </select>
                      </div>
                    </div>
                    <div class="large-4 columns">
                      <div class="large-6 large-offset-1 columns">
                        <h6><i class="fa fa-commenting fa-lg" aria-hidden="true"></i>&emsp;{{names.sms}}</h6>
                      </div>
                      <div class="large-4 end columns">
                        <label>{{names.amount}}
                          <inputValidate type="text" placeholder="" :value="domesticPlan.sms.value || 0" v-model="domesticPlan.sms.value">
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li class="acordeon-item">
                <a class="accordion-title">{{names.internationalServices}}</a>
                <div class="accordion-content">
                  <div class="row">
                    <div class="large-4 columns">
                      <div class="large-6 columns">
                        <h6><i class="fa fa-clock-o fa-lg" aria-hidden="true"></i>&emsp;{{names.minutes}}</h6>
                      </div>
                      <div class="large-4 end columns">
                        <label>{{names.amount}}
                          <inputValidate type="text" placeholder="" :value="internationalPlan.minutes.value || 0" v-model="internationalPlan.minutes.value">
                        </label>
                      </div>
                    </div>
                    <div class="large-4 columns">
                      <div class="large-5 columns">
                        <h6><i class="fa fa-database fa-lg" aria-hidden="true"></i>&emsp;{{names.data}}</h6>
                      </div>
                      <div class="large-4 columns">
                        <label>{{names.amount}}
                          <inputValidate type="text" placeholder="" :value="internationalPlan.data.value || 0" v-model="internationalPlan.data.value">
                        </label>
                      </div>
                      <div class="large-3 columns">
                        <select class="unit" :style="errorsStyle.unitIntError" v-model="internationalPlan.data.unit">
                          <option value="Mb">{{names.unit.mega}}</option>
                          <option value="Gb">{{names.unit.giga}}</option>
                          <option value="Tb">{{names.unit.tera}}</option>
                        </select>
                      </div>
                    </div>
                    <div class="large-4 columns">
                      <div class="large-6 large-offset-1 columns">
                        <h6><i class="fa fa-commenting fa-lg" aria-hidden="true"></i>&emsp;{{names.sms}}</h6>
                      </div>
                      <div class="large-4 end columns">
                        <label>{{names.amount}}
                          <inputValidate type="text" placeholder="" :value="internationalPlan.sms.value || 0" v-model="internationalPlan.sms.value">
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            <li class="acordeon-item">
              <a class="accordion-title">{{names.addons}}</a>
              <div class="accordion-content">
                <div class="row" v-for="(addon,index) in addons">
                  <div class="large-1 columns">
                    <h6 class="addon">{{names.name}}</h6>
                  </div>
                  <div class="large-4 columns">
                    <label>{{names.description}}
                      <input :style="addon.addonNameError" :title="names.addonsNameMessage" type="text" placeholder="" :value="addon.description" v-model="addon.description" @keyup="updateAddon(index,$event,'name')">
                    </label>
                  </div>
                  <div class="large-1 large-offset-1 columns">
                    <h6 class="addon">{{names.cost}}</h6>
                  </div>
                  <div class="large-2 columns">
                    <label>{{names.amount}}
                      <inputValidate :style="addon.addonPriceError" :title="names.addonsCostMessage" type="text" placeholder="" :value="addon.cost" v-model="addon.cost" @keyup="updateAddon(index,$event,'price')">
                    </label>
                  </div>
                  <div class="large-1 columns">
                    <h6>{{serviceDetails.currency}}</h6>
                  </div>
                  <div class="large-1 columns">
                    <a :title="names.deleteButton" class="button" @click="deleteAddOns(index)" id="button" v-show="addon.delete">
                      <i class="fa fa-times fa-2x" aria-hidden="true"></i>
                    </a>
                  </div>
                  <div class="large-1 end columns">
                    <a :title="names.addButton" class="button" @click="hideAndPush(index)" id="button" v-show="addon.add">
                      <i class="fa fa-plus fa-2x"></i>
                    </a>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div v-if="error" v-show="error">
        <div class="is-error callout" data-closable>
          <div class="container">
            <h5>{{errorMessage}}</h5>
          </div>
        </div>
      </div>
      <a  class="button large" @click="save()" id="button">{{names.saveChanges}}</a>
    </div>
  </div>
</template>
<script src="./service.crtl.js" lang="babel"></script>
