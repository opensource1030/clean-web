
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
              <tbody v-if="allocation.allocations.length > 0">
                <template v-for="item in allocation.allocations">
                <tr>
                <td>{{ item.bill_month }}</td>
                <td v-if="allocation">{{ allocation.first_name }}</td>
                <td><a  v-bind="{ href: 'tel:'}">{{ item.mobile_number }}</a></td>
                <td>{{ item.carrier }} </td>
                <td>{{ item.device }}</td>
                <td> ${{ item.allocated_charge }}</td>
                <td>${{ item.usage_charge }}</td>
                <td>${{ item.service_plan_charge }}</td>
                <td>${{ item.other_charge }}</td>
                <td>{{ item.last_upgrade }}</td>
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
<script>
  import auth from './../api/auth'
  var {Store} = require('yayson')()
  var    store = new Store()

export default {
    name: "ChargeInfo",
  created(){

    this.$http.get(process.env.URL_API+'/users/'+localStorage.userId+'?include=company,allocations&filter[allocations.billMonth]=[company.currentBillMonth]').then((response) => {
      var event = store.sync(response.data);
      this.allocation= event;

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
