<template>
  <div>
    <div class="large-12 columns">
      <div class="grid-box">
        <header class="box-heading">
          <h2> Wireless Line Overview</h2>
        </header>
        <div class="box-content no-pad">
          <div class="wireless-overview">
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
                  <td> <router-link class="alloc_mblnumber"   :to="{ name: 'Mobile Charges', params: {id: item.id}}" v-html="item.mobile_number ? item.mobile_number : '000-0000-000' " > {{ item.mobile_number }}  </router-link>
                  </td>
                  <td v-html="item.carrier ? item.carrier : '-'  "> </td>
                  <td v-html="item.device ? item.device : '-'  "> </td>
                  <td v-html="item.allocated_charge ? '$'+ item.allocated_charge : '$0.0' "> </td>
                  <td v-html="item.service_plan_charge ? '$'+ item.service_plan_charge : '$0.0' "> </td>
                  <td v-html="item.usage_charge ? '$'+ item.usage_charge : '$0.0' "> </td>
                  <td v-html="item.other_charge ? '$'+ item.other_charge : '$0.0' " > </td>
                  <td v-if="item.last_upgrade"> {{ item.last_upgrade | cleanDate  }}  </td>
                  <td>
                    <select class="user-actions" >
                      <option selected disabled value=" ">-- Choose an issue ---</option>
                      <option value="IRE1-1">Troubleshooting</option>
                      <option value="IRE1-2">Plan Change</option>
                      <option value="IRE1-3">Email Service</option>
                      <option value="ALR4-4">Billing &amp; allocations</option>
                      <option value="IRE1-5">Activation</option>
                      <option value="IRE1-6">International Request</option>
                      <option value="IRE0-7">Other</option>
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