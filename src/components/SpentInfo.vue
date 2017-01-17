
<template>
  <transition name="fade">
  <div class="callout spent-info" v-bind:class="{ active: isActive, 'visible': popOver }">
    <div class="pop-content" v-if="userInfo">
        <div class="expanded row">
          <div class="columns large-12">
            <a @click="closePop()" class="button btn-orange pop-close"> <i class="fa fa-arrow-left"> </i> </a>
            <ul class="inline-list ">
            <li><strong>Bill Month</strong> <span v-html="allocation.bill_month ? allocation.bill_month : '-' "></span> </li>
            <li><strong>Carrier</strong> <span v-html="allocation.carrier ? allocation.carrier : '-' "> </span> </li>
            </ul>

            <hr class="hr-cln">
            <div class="user-info">
              <strong>{{ fullName }}</strong> <span v-html="allocation.mobile_number ? allocation.mobile_number : '-' "> </span>
            </div>
          </div>
          <div class="columns large-8">
            <div class="grid-box mgbtm-0" >
              <header class="box-heading"><h2>User Details <span data-tooltip aria-haspopup="true" class="has-tip for-pop top" data-disable-hover="false" tabindex="1" title="Descripion Here"> <i class="fa fa-question"> </i> </span></h2> </header>
              <div class="box-content">
                  <ul class="list-striped">
                    <li class="row">
                      <strong class="large-6 small-6 columns"> Employee Details </strong>
                      <span class="large-6 small-6 columns"   v-html="userInfo.firstName ? userInfo.firstName : '-' ">  </span>
                    </li>
                    <li class="row">
                      <strong class="large-6 small-6 columns"> Employee ID </strong>
                      <span class="large-6 small-6 columns"   v-html="userInfo.companyId ? userInfo.companyId : '-' ">  </span>
                    </li>
                    <li class="row">
                      <strong class="large-6 small-6 columns"> Supervisor Email </strong>
                      <span class="large-6 small-6 columns"   v-html="userInfo.supervisorEmail ? userInfo.supervisorEmail : '-' ">  </span>
                    </li>
                    <template v-if="userInfo && userInfo.udls && userInfo.udls.length > 0" v-for= "udl in userInfo.udls" >
                    <li class="row">
                      <strong class="large-6 small-6 columns" > {{udl.udlName }} </strong>
                      <span class="large-6 small-6 columns"  > {{udl.udlValue }} </span>
                    </li>
                      </template>

                  </ul>
                <a @click="viewToggle" class="view-all"><i class="fa fa-plus"> </i> View <span class="linkText">{{viewText}}</span> </a>
              </div>
            </div>
          </div>
          <div class="columns large-4">
            <div  class="grid-box ">
              <header class="box-heading"><h2>Handset Details  <span data-tooltip aria-haspopup="true" class="has-tip for-pop top" data-disable-hover="false" tabindex="1" title="Descripion Here"> <i class="fa fa-question"> </i> </span></h2></header>
              <div class="box-content">
                <div class="box-content-holder">
                  <div class="row">
                    <div class="columns large-4">
                      <img src="http://placehold.it/200x250" class="img-responsive"  />
                    </div>
                    <div class="columns large-8">
                      <ul class="no-bullet">
                        <li><strong>Current Device:</strong> <span v-html="allocation.device ? allocation.device : '-' "> </span>
                        <li><strong>Line Type:</strong> <span v-html="allocation.device_type ? allocation.device_type : '-' "> Smartphone</span>
                        <li><strong>Status:</strong> <span> Active</span>
                        <li><strong>Last Upgraded:</strong> <span v-html="allocation.last_upgrade ? allocation.last_upgrade : '-' "> </span>
                        <li><strong>IMEI/ESN:</strong> <span v-html="allocation.device_esn_imei ? allocation.device_esn_imei : '-' "> 56163123617986534551</span>
                        <li><strong>SIM:</strong> <span v-html="allocation.device_sim ? allocation.device_sim : '-' "> 12234523123412524</span>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="grid-box mgbtm-0">
              <header class="box-heading"><h2>Support Manage Line <span data-tooltip aria-haspopup="true" class="has-tip for-pop top" data-disable-hover="false" tabindex="1" title="Descripion Here"> <i class="fa fa-question"> </i> </span></h2></header>
              <div class="box-content">
                <div class="box-content-holder">
                  <h6>Action for this line: </h6>
                  <select class="user-actions" >
                    <option disabled value=" " selected>-- Choose an issue ---</option>
                    <option value="hd-trobleshooting">Troubleshooting</option>
                    <option value="hd-plan-change">Plan Change</option>
                    <option value="hd-email-service">Email Service</option>
                    <option value="hd-billing-allocations">Billing &amp; allocations</option>
                    <option value="hd-other">Other</option>
                  </select>
                </div>
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
                  <p class="text-right" v-text="allocation.allocated_charge ? '$'+ allocation.allocated_charge : '$00' " > </p>
                </div>
              </div>
            </div>
          </div>
          <div class="clearfix"></div>
          <div class="columns large-12">
            <div class="grid-box mgbtm-0" >
              <header class="box-heading"><h2>Monthly Recurring Charges  <span data-tooltip aria-haspopup="true" class="has-tip for-pop top" data-disable-hover="false" tabindex="1" title="Descripion Here"> <i class="fa fa-question"> </i> </span></h2></header>
              <div class="box-content">
                <ul class="list-striped all">
                  <li class="row">
                    <strong class="large-6 columns"> Service Plan Charges </strong>
                    <span class="large-6 columns text-right" v-text="allocation.service_plan_charge ? '$'+ allocation.service_plan_charge : '$00' " > </span>
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
                  <p class="text-right" v-text="allocation.service_plan_charge ? '$'+ allocation.service_plan_charge : '$00' "></p>
                </div>
              </div>
            </div>
          </div>

          <div class="columns large-12">
            <div class="grid-box" >
              <header class="box-heading"><h2>(Usage and Charges) - Non-recurring Charges  <span data-tooltip aria-haspopup="true" class="has-tip for-pop top" data-disable-hover="false" tabindex="1" title="Descripion Here"> <i class="fa fa-question"> </i> </span></h2></header>
              <div class="box-content">
                <ul class="list-striped all">
                  <li class="header-row">
                    <strong>Domestic  <span data-tooltip aria-haspopup="true" class="has-tip for-pop top" data-disable-hover="false" tabindex="1" title="Descripion Here"> <i class="fa fa-question"> </i> </span></strong>
                  </li>
                  <li class="row">
                    <strong class="large-6 columns"> Adjusted Pool Weighted Allocated Charges </strong>
                    <span class="large-6 columns text-right" v-text="allocation.pooling_charge ? '$'+ allocation.pooling_charge : '$00' " >  $0.00 </span>
                  </li>
                  <li class="row">
                    <strong class="large-6 columns">  Domestic Usage Charges </strong>
                    <span class="large-6 columns text-right" v-text="allocation.domestic_usage_charge ? '$'+ allocation.domestic_usage_charge : '$00' "> </span>
                  </li>
                  <li class="row">
                    <strong class="large-6 columns">  Domestic Data Usage </strong>
                    <span class="large-6 columns text-right" v-text="allocation.domestic_data_usage ? allocation.domestic_data_usage+ ' GBs' : '$00' ">  $0.00 </span>
                  </li>
                  <li class="row">
                    <strong class="large-6 columns">  Domestic Voice Usage </strong>
                    <span class="large-6 columns text-right" v-text="allocation.domestic_voice_usage ? allocation.domestic_voice_usage+ '  Mins' : '00 Mins' ">  </span>
                  </li>
                  <li class="row">
                    <strong class="large-6 columns">  Domestic Text Messaging Usage </strong>
                    <span class="large-6 columns text-right" v-text="allocation.domestic_text_usage ? allocation.domestic_text_usage : '0' ">  </span>
                  </li>
                  <li class="header-row">
                    <strong>International <span data-tooltip aria-haspopup="true" class="has-tip for-pop top" data-disable-hover="false" tabindex="1" title="Descripion Here"> <i class="fa fa-question"> </i> </span></strong>
                  </li>
                  <li class="row">
                    <strong class="large-6 columns">  International Usage Charges </strong>
                    <span class="large-6 columns text-right" v-text="allocation.intl_roam_usage_charge ? '$'+ allocation.intl_roam_usage_charge : '$00' ">  </span>
                  </li>
                  <li class="row">
                    <strong class="large-6 columns">   International Roam Data Usage </strong>
                    <span class="large-6 columns text-right" v-text="allocation.int_roam_data_usage ? allocation.int_roam_data_usage+ ' GBs' : '00 GBs' ">  </span>
                  </li>
                  <li class="row">
                    <strong class="large-6 columns">     International Roam Voice Usage </strong>
                    <span class="large-6 columns text-right" v-text="allocation.intl_roam_voice_usage ? allocation.intl_roam_voice_usage + '  Mins' : '00 Mins' ">  </span>
                  </li>
                  <li class="row">
                    <strong class="large-6 columns"> International Roam Text Messaging Usage </strong>
                    <span class="large-6 columns text-right" v-text="allocation.intl_roam_text_usage ? allocation.intl_roam_text_usage : '0' "> </span>
                  </li>
                  <li class="row">
                    <strong class="large-6 columns">  International Long Distance Usage Charges </strong>
                    <span class="large-6 columns text-right" v-text="allocation.intl_ld_usage_charge ? '$'+ allocation.intl_ld_usage_charge : '$00' ">  </span>
                  </li>
                  <li class="row">
                    <strong class="large-6 columns">  International  Long Distance Voice Usage </strong>
                    <span class="large-6 columns text-right" v-text="allocation.intl_ld_voice_charge ? allocation.intl_ld_voice_charge + '  Mins' : '00 Mins' ">  </span>
                  </li>
                  <li class="row">
                    <strong class="large-6 columns">  International  Long Distance Text Messaging Usage </strong>
                    <span class="large-6 columns text-right" v-text="allocation.intl_ld_text_usage ? allocation.intl_ld_text_usage  : '00' ">   </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="clearfix"></div>
          <div class="columns large-12">
            <div class="grid-box" >
              <header class="box-heading"><h2>Other Charges  <span data-tooltip aria-haspopup="true" class="has-tip for-pop top" data-disable-hover="false" tabindex="1" title="Descripion Here"> <i class="fa fa-question"> </i> </span></h2></header>
              <div class="box-content">
                <ul class="list-striped all">
                  <li class="row">
                    <strong class="large-6 small-6 columns"> Equipment Charges  </strong>
                    <span class="large-6 small-6 columns text-right" v-text="allocation.equipment_charge ? '$'+ allocation.equipment_charge : '$00' ">   </span>
                  </li>
                  <li class="row">
                    <strong class="large-6 small-6 columns">  Early Termination Fee Charges </strong>
                    <span class="large-6 small-6 columns text-right" v-text="allocation.etf_charge ? '$'+ allocation.etf_charge : '$00' ">   </span>
                  </li>
                  <li class="row">
                    <strong class="large-6 small-6 columns">  Other Carrier Charges </strong>
                    <span class="large-6 small-6 columns text-right" v-text="allocation.other_carrier_charges ? '$'+ allocation.other_carrier_charges : '$00' ">  </span>
                  </li>
                  <li class="row">
                    <strong class="large-6 small-6 columns"> Taxes Charges </strong>
                    <span class="large-6 small-6 columns text-right" v-text="allocation.taxes_charge ? '$'+ allocation.taxes_charge : '$00' "> </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
</div>
</transition>
</template>
<script>
  import auth from './../api/auth'
  var {Store} = require('yayson')()
  var    store = new Store()

export default {
    name: "SpentInfo",
  beforeCreate() {
    Event.$on('applied', (id)=>  {
      this.popOver = true
      this.id = id;
      this.$http.get(process.env.URL_API+'/allocations/'+id).then((response) => {
        var event = store.sync(response.data);
        this.allocation= event;
      }, (response) => {

      });
    });
  },
  created(){

    this.$http.get(process.env.URL_API+'/users/'+localStorage.userId).then((response) => {
      var event = store.sync(response.data);
      this.userInfo= event;
    }, (response) => {

    });



  },
  mounted () {
      $(this).foundation();

  },
  computed:{
    fullName : function () {
      return this.userInfo.firstName + " " + this.userInfo.lastName
    }

  },
  data(){
    return {
      userInfo: {},
      allocation : {},
      isActive: true,
      viewText : 'All',
      popOver : false,
      id : ''

    }
  },
  methods:{
    viewToggle(){
      var el = document.querySelector('.list-striped');
      el.classList.toggle('all');
      return this.active ? 'You like this' : 'Like this not'
    },
    closePop(){
       this.popOver = false;
      this.allocation = '';
    }
  }
}
</script>
