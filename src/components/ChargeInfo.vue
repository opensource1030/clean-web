<template>
  <div>
    <div class="large-12 columns">
      <div class="grid-box">
        <header class="box-heading">
          <h2> Wireless Line Overview</h2>
        </header>
        <div class="box-content no-pad">
            <div class="wireless-overview table-holder">
            <table width="100%" class="responsive">
              <thead>
              <tr>
                <th>Bill Month</th>
                <th>User Name</th>
                <th>Mobile Number</th>
                <th>Carrier</th>
                <th>Device</th>
                <th>Total Allocated Charge</th>
                <th>Service Plan Charges</th>
                <th>Usage Charges</th>
                <th> Other Charges</th>
                <th> Last Upgrade Date</th>
                <th width="20%"> Actions for this line</th>
              </tr>
              </thead>
              <tbody v-if="allocation && allocation.allocations && allocation.allocations.length > 0">
              <template v-for="item in allocation.allocations">
                <tr>
                  <td v-if="item.bill_month"> {{ item.bill_month | cleanDate  }} </td>
                  <td v-if="allocation"  v-html="allocation.firstName ? allocation.firstName : '-' "> </td>
                    <td>
                        <router-link class="alloc_mblnumber" @click="charge()"
                                     :to="{ name: 'Mobile Charges', params: {id: item.id}}"
                                     v-html="item.mobile_number ? $options.filters.phone(item.mobile_number) : '000-000-0000'"></router-link>
                  </td>
                  <td v-html="item.carrier ? item.carrier : '-'  "> </td>
                  <td v-html="item.device ? item.device : '-'  "> </td>
                  <td v-html="item.allocated_charge ? '$'+ item.allocated_charge.toFixed(2) : '$0.00'"></td>
                  <td v-html="item.service_plan_charge ? '$'+ item.service_plan_charge.toFixed(2) : '$0.00'"></td>
                    <td v-html="item.pooling_charge ? '$'+ (item.usage_charge + item.pooling_charge).toFixed(2) : '$0.00'"></td>
                  <td v-html="item.other_charge ? '$'+ item.other_charge.toFixed(2) : '$0.00'"></td>
                  <td v-if="item.last_upgrade">{{ item.last_upgrade | cleanDate }}</td>
                  <td>
                      <select id="choose-issues" class="user-actions">
                      <option selected disabled value=" ">-- Choose an issue --</option>
                          <optgroup label="Billing">
                              <option data-id="issue-4" data-support-tag="ALR4"
                                      data-value="Questions About My Monthly Statement" value="qamms">
                                  Questions About My Monthly Statement
                              </option>
                              <option data-id="issue-15" data-support-tag="ALR4" data-value="Other Billing Issues"
                                      value="obi">Other Billing
                                  Issues
                              </option>
                          </optgroup>

                          <optgroup label="Device Support">
                              <option data-id="issue-5" data-value="Activate My Device" data-support-tag="IRE0"
                                      value="amd">Activate My Device
                              </option>
                              <option data-id="issue-3" data-value="Email Connectivity" data-support-tag="IRE0"
                                      value="ec">Email Connectivity
                              </option>
                              <option data-id="issue-8" data-support-tag="IRE0"
                                      data-value="Issues While Traveling Abroad" value="iwta">Issues
                                  While Traveling Abroad
                              </option>
                              <option data-id="issue-9" data-support-tag="IRE0" data-value="Other Device Support Issues"
                                      value="odsi">Other
                                  Device Support Issues
                              </option>
                          </optgroup>

                          <optgroup label="Service Plan / Feature">
                              <option data-id="issue-6" data-support-tag="IRE1"
                                      data-value="Add/Remove International Features" value="aif">
                                  Add/Remove International Features
                              </option>
                              <option data-id="issue-10" data-support-tag="IRE1" data-value="Cancel Service" value="cs">
                                  Cancel Service
                              </option>
                              <option data-id="issue-2" data-support-tag="IRE1" data-value="Change Existing Features"
                                      value="cef">Change
                                  Existing Features
                              </option>
                              <option data-id="issue-12" data-support-tag="IRE1"
                                      data-value="Suspend/Unsuspend Wireless Service" value="sws">
                                  Suspend/Unsuspend Wireless Service
                              </option>
                              <option data-id="issue-13" data-support-tag="IRE1"
                                      data-value="Transfer Service to a Personal Account" value="tstpa">Transfer Service
                                  to a Personal Account
                              </option>
                              <option data-id="issue-14" data-support-tag="IRE1"
                                      data-value="Other Service and Plan Issues" value="osapi">Other
                                  Service and Plan Issues
                              </option>
                          </optgroup>

                      </select>
                  </td>
                </tr>
              </template>
              </tbody>
              <tbody v-else>
                <tr >
                  <td> - </td>
                  <td> - </td>
                  <td> - </td>
                  <td> - </td>
                  <td> - </td>
                  <td> - </td>
                  <td> - </td>
                  <td> - </td>
                  <td> - </td>
                  <td> - </td>
                  <td> - </td>
                </tr>
                </tbody>
              </table>
          </div>
        </div>
      </div>
    </div>
    <div class="clearfix"></div>
  </div>
</template>

<script src="./chargeinfo.ctrl.js" lang="babel"></script>
