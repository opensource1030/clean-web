<template>
  <transition name="fade">
    <div class="callout spent-info active" v-bind:class="{ visible: popOver }">
      <div class="pop-content" v-if="userInfo">
        <div class="expanded row">
          <div class="columns large-12">
            <router-link  class="button  pop-close" :to="{ name: 'dashboard'}" replace> <i class="fa fa-arrow-left"> </i> Back </router-link>
            <ul class="inline-list " id="top">
            <li><strong>Bill Month</strong> <span > {{ allocation.bill_month | cleanDate }}</span> </li>
            <li><strong>Carrier</strong> <span v-html="allocation.carrier ? allocation.carrier : '-' "> </span> </li>
            </ul>

            <hr class="hr-cln">
            <div class="user-info">
              <strong>{{ this.userInfo.firstName + " " + this.userInfo.lastName }}</strong> {{ mobileNumber }}</span>
            </div>
          </div>

          <div class=" large-12">
            <div class="row">
            <div  class=" columns large-6 ">
              <div class="grid-box eq-Hght">
                <header class="box-heading"><h2>Handset Details  <span data-tooltip aria-haspopup="true" class="has-tip for-pop top" data-disable-hover="false" tabindex="1" title="Information pertaining to your line of service"> <i class="fa fa-question"> </i> </span></h2></header>
                <div class="box-content">
                  <div class="box-content-holder">
                    <div class="row">
                      <div class="columns large-12">
                        <ul class="no-bullet">
                          <li><strong>Current Device:</strong> <span v-html="allocation.device ? allocation.device : '-' "> </span></li>
                          <li><strong>Device Type:</strong> <span v-html="allocation.device_type ? allocation.device_type : '-' "> Smartphone</span></li>
                          <li><strong>Last Upgraded:</strong> <span v-if="allocation.last_upgrade "> {{ allocation.last_upgrade | cleanDate  }} </span><span v-else="allocation.last_upgrade ">N/A</span></li>
                          <li><strong>IMEI/ESN:</strong> <span v-html="allocation.device_esn_imei ? allocation.device_esn_imei : '-' "> 56163123617986534551</span></li>
                          <li><strong>SIM:</strong> <span v-html="allocation.device_sim ? allocation.device_sim : '-' "> 12234523123412524</span></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class=" columns large-6">
              <div class="grid-box eq-Hght">
              <header class="box-heading"><h2>Request Support <span data-tooltip aria-haspopup="true" class="has-tip for-pop top" data-disable-hover="false" tabindex="1" title="Select a support request below for your line"> <i class="fa fa-question"> </i> </span></h2></header>
              <div class="box-content">
                <div class="box-content-holder">
                  <h6>Action for this line: </h6>
                  <select id="choose-issues" class="user-actions " >
                    <option disabled value=" " selected>-- Choose an issue ---</option>
                    <optgroup label="Billing">
                      <option data-id="issue-4" data-support-tag="ALR4"
                              data-value="Questions About My Monthly Statement" value="qamms">
                        Questions About My Monthly Statement
                      </option>
                      <option data-id="issue-15" data-support-tag="ALR4" data-value="Other Billing Issues" value="obi">
                        Other Billing
                        Issues
                      </option>
                    </optgroup>

                    <optgroup label="Device Support">
                      <option data-id="issue-5" data-value="Activate My Device" data-support-tag="IRE0" value="amd">
                        Activate My Device
                      </option>
                      <option data-id="issue-3" data-value="Email Connectivity" data-support-tag="IRE0" value="ec">Email
                        Connectivity
                      </option>
                      <option data-id="issue-8" data-support-tag="IRE0" data-value="Issues While Traveling Abroad"
                              value="iwta">Issues
                        While Traveling Abroad
                      </option>
                      <option data-id="issue-9" data-support-tag="IRE0" data-value="Other Device Support Issues"
                              value="odsi">Other
                        Device Support Issues
                      </option>
                    </optgroup>

                    <optgroup label="Service Plan / Feature">
                      <option data-id="issue-6" data-support-tag="IRE1" data-value="Add/Remove International Features"
                              value="aif">
                        Add/Remove International Features
                      </option>
                      <option data-id="issue-10" data-support-tag="IRE1" data-value="Cancel Service" value="cs">Cancel
                        Service
                      </option>
                      <option data-id="issue-2" data-support-tag="IRE1" data-value="Change Existing Features"
                              value="cef">Change
                        Existing Features
                      </option>
                      <option data-id="issue-12" data-support-tag="IRE1" data-value="Suspend/Unsuspend Wireless Service"
                              value="sws">
                        Suspend/Unsuspend Wireless Service
                      </option>
                      <option data-id="issue-13" data-support-tag="IRE1"
                              data-value="Transfer Service to a Personal Account" value="tstpa">Transfer Service to a
                        Personal Account
                      </option>
                      <option data-id="issue-14" data-support-tag="IRE1" data-value="Other Service and Plan Issues"
                              value="osapi">Other
                        Service and Plan Issues
                      </option>
                    </optgroup>

                  </select>
                </div>
              </div>
                </div>
            </div>
            <div>
          </div>
          <div class="clearfix"> </div>
          <div class="small-12 columns">
            <div class="total-row">
              <div class="row expanded">
                <div class="columns small-6">
                  <strong>Total Amount Assessed</strong>
                </div>
                <div class="columns small-6">
                  <p class="text-right" v-text="allocation.allocated_charge ? '$'+ allocation.allocated_charge.toFixed(2) : '$0.00' " > </p>
                </div>
              </div>
            </div>
          </div>
          <div class="clearfix"></div>
          <div class="columns large-12">
            <div class="grid-box mgbtm-0" >
              <header class="box-heading"><h2>Monthly Recurring Charges  <span data-tooltip aria-haspopup="true" class="has-tip for-pop top" data-disable-hover="false" tabindex="1" title="These charges are related to your service plan and feature costs for the billing period"> <i class="fa fa-question"> </i> </span></h2></header>
              <div class="box-content">
                <ul class="list-striped all">
                  <li class="row">
                    <strong class="large-6 columns"> Service Plan Charges </strong>
                    <span class="large-6 columns text-right" v-text="allocation.service_plan_charge ? '$'+ allocation.service_plan_charge.toFixed(2) : '$0.00' " > </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="clearfix"> </div>
          <div class="small-12 columns">
            <div class="total-row">
              <div class="row expanded">
                <div class="columns small-6">
                  <strong>Total Amount Assessed</strong>
                </div>
                <div class="columns small-6">
                  <p class="text-right" v-text="allocation.service_plan_charge ? '$'+ allocation.service_plan_charge.toFixed(2) : '$0.00' "></p>
                </div>
              </div>
            </div>
          </div>

          <div class="columns large-12">
            <div class="grid-box" >
              <header class="box-heading"><h2>(Usage and Charges) - Non-recurring Charges  <span data-tooltip aria-haspopup="true" class="has-tip for-pop top" data-disable-hover="false" tabindex="1" title="These charges are impacted by your usage within the billing period"> <i class="fa fa-question"> </i> </span></h2></header>
              <div class="box-content">
                <ul class="list-striped all">
                  <li class="header-row">
                    <strong>Domestic <span data-tooltip aria-haspopup="true" class="has-tip for-pop top" data-disable-hover="false" tabindex="1" title="Usage and charges incurred in your home service country"> <i class="fa fa-question"> </i> </span></strong>
                  </li>
                  <li class="row">
                    <strong class="large-6 columns">Adjusted Pool Weighted Allocated Charges <span data-tooltip
                                                                                                   aria-haspopup="true"
                                                                                                   class="has-tip for-pop top"
                                                                                                   data-disable-hover="false"
                                                                                                   tabindex="1"
                                                                                                   title="Amount that is assessed to this mobile # based on your actual monthly consumption of Voice and/or Data usage against the corporate pool"> <i
                            class="fa fa-question"> </i> </span></strong>
                    <span class="large-6 columns text-right" >  {{ allocation.pooling_charge | formatCurrency }} </span>

                  </li>
                  <li class="row">
                    <strong class="large-6 columns">Domestic Usage Charges</strong>
                    <span class="large-6 columns text-right" >  {{ allocation.domestic_usage_charge | formatCurrency }} </span>

                  </li>
                  <li class="row">
                    <strong class="large-6 columns">Domestic Data Usage</strong>
                    <span class="large-6 columns text-right" >  {{ allocation.domestic_data_usage | formatBytes}} </span>
                  </li>
                  <li class="row">
                    <strong class="large-6 columns">Domestic Voice Usage</strong>
                    <span class="large-6 columns text-right" v-text="allocation.domestic_voice_usage ? allocation.domestic_voice_usage+ '  Mins' : '0 min' ">  </span>
                  </li>
                  <li class="row">
                    <strong class="large-6 columns">Domestic Text Messaging Usage</strong>
                    <span class="large-6 columns text-right" v-text="allocation.domestic_text_usage ? allocation.domestic_text_usage : '-' ">  </span>
                  </li>
                  <li class="header-row">
                    <strong>International <span data-tooltip aria-haspopup="true" class="has-tip for-pop top" data-disable-hover="false" tabindex="1" title="Usage and charges incurred while roaming or calling outside of your home service country"> <i class="fa fa-question"> </i> </span></strong>
                  </li>
                  <li class="row">
                    <strong class="large-6 columns">International Usage Charges</strong>
                    <span class="large-6 columns text-right" >  {{ allocation.intl_roam_usage_charge | formatCurrency }} </span>
                  </li>
                  <li class="row">
                    <strong class="large-6 columns">International Roam Data Usage</strong>
                    <span class="large-6 columns text-right"> {{ allocation.int_roam_data_usage | formatBytes}} </span>
                  </li>
                  <li class="row">
                    <strong class="large-6 columns">International Roam Voice Usage</strong>
                    <span class="large-6 columns text-right" v-text="allocation.intl_roam_voice_usage ? allocation.intl_roam_voice_usage + '  Mins' : '0 min'"></span>
                  </li>
                  <li class="row">
                    <strong class="large-6 columns">International Roam Text Messaging Usage</strong>
                    <span class="large-6 columns text-right" v-text="allocation.intl_roam_text_usage ? allocation.intl_roam_text_usage : '0' "></span>
                  </li>
                  <li class="row">
                    <strong class="large-6 columns">  International Long Distance Usage Charges </strong>
                    <span class="large-6 columns text-right" >  {{ allocation.intl_ld_usage_charge | formatCurrency }} </span>

                  </li>
                  <li class="row">
                    <strong class="large-6 columns">  International  Long Distance Voice Usage </strong>
                    <span class="large-6 columns text-right" v-text="allocation.intl_ld_voice_usage ? allocation.intl_ld_voice_usage + '  Mins' : '0 min'">  </span>
                  </li>
                  <li class="row">
                    <strong class="large-6 columns">  International  Long Distance Text Messaging Usage </strong>
                    <span class="large-6 columns text-right" v-text="allocation.intl_ld_text_usage ? allocation.intl_ld_text_usage : '0'"></span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="clearfix"></div>
          <div class="columns large-12">
            <div class="grid-box" >
              <header class="box-heading"><h2>Other Charges <span data-tooltip aria-haspopup="true" class="has-tip for-pop top" data-disable-hover="false" tabindex="1" title="Additional carrier charges incurred during billing period"> <i class="fa fa-question"> </i> </span></h2></header>
              <div class="box-content">
                <ul class="list-striped all">
                  <li class="row" >
                    <strong class="large-6 small-6 columns">Equipment Charges</strong>
                    <span class="large-6 small-6 columns text-right" v-text="allocation.equipment_charge ? '$'+ allocation.equipment_charge.toFixed(2) : '$0.00'"></span>
                  </li>
                  <li class="row">
                    <strong class="large-6 small-6 columns">Early Termination Fee Charges</strong>
                    <span class="large-6 columns text-right" >  {{ allocation.etf_charge | formatCurrency }} </span>

                  </li>
                  <li class="row">
                    <strong class="large-6 small-6 columns">Other Carrier Charges</strong>
                    <span class="large-6 columns text-right" >  {{ allocation.other_carrier_charge | formatCurrency }} </span>

                  </li>
                  <li class="row">
                    <strong class="large-6 small-6 columns"> Taxes Charges </strong>
                    <span class="large-6 columns text-right" >  {{ allocation.taxes_charge | formatCurrency }} </span>

                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
        <a href="#" class="button pop-close scrollup float-left"><i class="fa fa-arrow-up"> </i>Back to Top</a>
        <router-link class="button  pop-close back-to" :to="{ name: 'dashboard'}" replace> <i class="fa fa-arrow-left"> </i> Back </router-link>
        </div>
      </div>
  </transition>
</template>

<script src="./spentinfo.ctrl.js" lang="babel"></script>
