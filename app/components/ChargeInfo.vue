
<template>
  <div class="large-12 columns">
    <div class="grid-box">
      <header class="box-heading">
        <h2> Wireless Line Overview</h2>
      </header>
      <div class="box-content no-pad">
        <div class="wireless-overview">
          <table width="100%" class="responsive">
            <tbody><tr>
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

              <template v-for="item in allocation.included">
                <tr>
                <td>{{ item.attributes.bill_month }}</td>
                <td v-if="allocation">{{ allocation.data.attributes.first_name }}</td>
                <td><a href="tel:{{ item.attributes.mobile_number }}">{{ item.attributes.mobile_number }}</a></td>
                <td>{{ item.attributes.carrier }}</td>
                <td>{{ item.attributes.device }}</td>
                <td>{{ item.attributes.allocated_charge }}</td>
                <td>{{ item.attributes.usage_charge }}</td>
                <td>{{ item.attributes.service_plan_charge }}</td>
                <td>{{ item.attributes.other_charge }}</td>
                <td>{{ item.attributes.last_ugrade }}</td>
                  <td>
                    <select class="user-actions" >
                      <option disabled value=" " selected>-- Choose an issue ---</option>
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





            </tbody></table>
        </div>
      </div>
    </div>
  </div>
  <div class="clearfix"></div>

</template>
<script>

  var Api = 'http://lfce85j83fdtoxhkw-mock.stoplight-proxy.io/';

export default {
    name: "ChargeInfo",
  ready(){
    this.$http.get(Api+'users/18?include=allocations').then((response) => {
      this.$set('allocation', response.json());


    }, (response) => {

    });

  },
  data(){
    return {
      allocation: {}
    }
  }
}
</script>
