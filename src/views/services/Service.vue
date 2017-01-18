<template>
  <div class="content-right">
    <div class="full-height row">
      <div id="service">
        <div class="header"></div>
        <div class="expanded row">
          <div class="large-12 columns titles">
            <h4>Manage Plan</h4>
          </div>
          <div class="large-12 columns">
            <ul  class="acordeon">
              <li class="acordeon-item is-active">
                <a  class="accordion-title">Plan Details</a>
                <div class="accordion-content overview">
                  <div class="row">
                    <div class="large-8 columns">
                      <label>Title
                        <input title="Service Name." :style="titleError" type="text" placeholder="" :value="serviceDetails.title" v-model="serviceDetails.title">
                      </label>
                    </div>
                    <div class="large-2 columns">
                      <label>Plan Code
                        <inputValidate title="Service Code." :style="planCodeError" type="text" placeholder="" :value="serviceDetails.code" v-model="serviceDetails.code">
                      </label>
                    </div>
                    <div class="large-2 columns">
                      <label>Cost
                        <inputValidate title="Service Cost." :style="costError" type="text" placeholder="" :value="serviceDetails.cost" v-model="serviceDetails.cost">
                      </label>
                    </div>
                  </div>
                  <div class="row">
                    <div class="large-12 columns">
                      <label>Description
                        <textarea title="Service Description." rows="3" :value="serviceDetails.description" v-model="serviceDetails.description"></textarea>
                      </label>
                  </div>
                </div>
                <div class="row">
                  <div class="large-8 columns">
                    <label>Carriers
                      <select @change="onSelectCarrier(serviceDetails.carrierId)" title="Service Carrier." :style="carrierError" v-model="serviceDetails.carrierId">
                        <option :value="null">Select Carrier</option>
                        <option v-if="!noCarriers" v-for="carrier in carriers" :value="carrier.id">{{carrier.presentation}}</option>
                      </select>
                      <div v-if="noCarriers"><font color="red">{{noCarrierMessageError}}</font></div>
                      <div v-if="noCarrierSelected"><font color="red">{{carrierMessageError}}</font></div>
                    </label>
                  </div>
                  <div class="large-3 small-offset-1 columns">
                    <label class="status">
                      <input title="Check this option to ENABLE the Service." class="checkboxbigger" type="checkbox" v-model="serviceDetails.status" :value="serviceDetails.status">
                      <span class="custom-checkbox"><i class="icon-check"></i></span>Status
                    </label>
                  </div>
                </div>
              </li>
              <li class="acordeon-item">
                <a class="accordion-title">Domestic Services</a>
                <div class="accordion-content">
                  <div class="row">
                    <div class="large-4 columns">
                      <div class="large-6 columns">
                        <h6><i class="fa fa-clock-o fa-lg" aria-hidden="true"></i>&emsp;Minutes</h6>
                      </div>
                      <div class="large-4 end columns">
                        <label>Amount
                          <inputValidate title="Service domestic minutes amount. 0 means not available." type="text" placeholder="" :value="domesticPlan.minutes.value || 0" v-model="domesticPlan.minutes.value">
                        </label>
                      </div>
                    </div>
                    <div class="large-4 columns">
                      <div class="large-5 columns">
                        <h6><i class="fa fa-database fa-lg" aria-hidden="true"></i>&emsp;Data</h6>
                      </div>
                      <div class="large-4 columns">
                        <label>Amount
                          <inputValidate type="text" placeholder="" :value="domesticPlan.data.value || 0" v-model="domesticPlan.data.value">
                        </label>
                      </div>
                      <div class="large-3 columns">
                        <select class="unit" :style="unitDomError" v-model="domesticPlan.data.unit">
                          <option value="Mb">Mb</option>
                          <option value="Gb">Gb</option>
                          <option value="Tb">Tb</option>
                        </select>
                      </div>
                    </div>
                    <div class="large-4 columns">
                      <div class="large-6 large-offset-1 columns">
                        <h6><i class="fa fa-commenting fa-lg" aria-hidden="true"></i>&emsp;SMS</h6>
                      </div>
                      <div class="large-4 end columns">
                        <label>Amount
                          <inputValidate type="text" placeholder="" :value="domesticPlan.sms.value || 0" v-model="domesticPlan.sms.value">
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li class="acordeon-item">
                <a class="accordion-title">International Services</a>
                <div class="accordion-content">
                  <div class="row">
                    <div class="large-4 columns">
                      <div class="large-6 columns">
                        <h6><i class="fa fa-clock-o fa-lg" aria-hidden="true"></i>&emsp;Minutes</h6>
                      </div>
                      <div class="large-4 end columns">
                        <label>Amount
                          <inputValidate type="text" placeholder="" :value="internationalPlan.minutes.value || 0" v-model="internationalPlan.minutes.value">
                        </label>
                      </div>
                    </div>
                    <div class="large-4 columns">
                      <div class="large-5 columns">
                        <h6><i class="fa fa-database fa-lg" aria-hidden="true"></i>&emsp;Data</h6>
                      </div>
                      <div class="large-4 columns">
                        <label>Amount
                          <inputValidate type="text" placeholder="" :value="internationalPlan.data.value || 0" v-model="internationalPlan.data.value">
                        </label>
                      </div>
                      <div class="large-3 columns">
                        <select class="unit" :style="unitIntError" v-model="internationalPlan.data.unit">
                          <option value="Mb">Mb</option>
                          <option value="Gb">Gb</option>
                          <option value="Tb">Tb</option>
                        </select>
                      </div>
                    </div>
                    <div class="large-4 columns">
                      <div class="large-6 large-offset-1 columns">
                        <h6><i class="fa fa-commenting fa-lg" aria-hidden="true"></i>&emsp;SMS</h6>
                      </div>
                      <div class="large-4 end columns">
                        <label>Amount
                          <inputValidate type="text" placeholder="" :value="internationalPlan.sms.value || 0" v-model="internationalPlan.sms.value">
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            <li class="acordeon-item">
              <a class="accordion-title">Add Ons</a>
              <div class="accordion-content">
                <div class="row" v-for="(addon,index) in addons">
                  <div class="large-1 columns">
                    <h6 class="addon">Name</h6>
                  </div>
                  <div class="large-4 columns">
                    <label>Description
                      <input :style="addon.addonNameError" title="Add-on's Name." type="text" placeholder="" :value="addon.description" v-model="addon.description" @keyup="updateAddon(index,$event,'name')">
                    </label>
                  </div>
                  <div class="large-1 large-offset-1 columns">
                    <h6 class="addon">Cost</h6>
                  </div>
                  <div class="large-2 columns">
                    <label>Amount
                      <input :style="addon.addonPriceError" title="Add-on's Cost." type="text" placeholder="" :value="addon.cost" v-model="addon.cost" @keyup="updateAddon(index,$event,'price')">
                    </label>
                  </div>
                  <div class="large-1 columns">
                    <a title="Delete the selected Add-on." class="button" @click="deleteAddOns(index)" id="button" v-show="addon.delete">
                      <i class="fa fa-times fa-2x" aria-hidden="true"></i>
                    </a>
                  </div>
                  <div class="large-1 end columns">
                    <a title="Add another Add-on." class="button" @click="hideAndPush(index)" id="button" v-show="addon.add">
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
            <h5>{{error}}</h5>
          </div>
        </div>
      </div>
      <a  class="button large" @click="save()" id="button">Save Changes</a>
    </div>
  </div>
</template>
<script src="./service.crtl.js" lang="babel"></script>
