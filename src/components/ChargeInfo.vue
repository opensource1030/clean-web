
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
              <th>Usage Charges</th>
              <th>Service Plan Charges</th>
              <th> Other Charges</th>
              <th> Last Upgrade Date</th>
              <th width="20%"> Actions for this line</th>
            </tr>
            </thead>
            <tbody v-if="allocation && allocation.allocations && allocation.allocations.length > 0">
            <template v-for="item in allocation.allocations">
              <tr>
                <td v-html="item.bill_month ? item.bill_month : '0000-00-00'  "> </td>
                <td v-if="allocation"  v-html="allocation.firstName ? allocation.firstName : '-' "> </td>
                <td> <router-link   :to="{ name: 'spentInfo', params: {id: item.id}}" v-html="item.mobile_number ? item.mobile_number : '000-0000-000' " > {{ item.mobile_number }}  </router-link>
                </td>
                <td v-html="item.carrier ? item.carrier : '-'  "> </td>
                <td v-html="item.device ? item.device : '-'  "> </td>
                <td v-html="item.allocated_charge ? '$'+ item.allocated_charge : '$0' "> </td>
                <td v-html="item.usage_charge ? '$'+ item.usage_charge : '$0' "> </td>
                <td v-html="item.service_plan_charge ? '$'+ item.service_plan_charge : '$0' "> </td>
                <td v-html="item.other_charge ? '$'+ item.other_charge : '$0' " > </td>
                <td v-html="item.last_upgrade ? item.last_upgrade : '0000-00-00' "> </td>
                <td>
                  <select class="user-actions" >
                    <option disabled value=" " selected>-- Choose an issue ---</option>
                    <option value="hd-trobleshooting">Troubleshooting</option>
                    <option value="hd-plan-change">Plan Change</option>
                    <option value="hd-email-service">Email Service</option>
                    <option value="hd-billing-allocations">Billing &amp; allocations</option>
                    <option value="hd-other">Other</option>
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
