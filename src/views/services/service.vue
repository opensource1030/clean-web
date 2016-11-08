<template>

  <div class="content-right">
    <div class="full-height row">
      <div id="service">
        <div class="header"></div>
        <div class="expanded row">

          <div class="small-12 columns titles">
            <h4>Manage Plan<h4>
            </div>


            <div class="small-12 columns" >

              <ul  class="acordeon" >
                <li class="acordeon-item  is-active" >
                  <a  class="accordion-title"   >Plan Details</a>
                  <div class="accordion-content overview"  >
                    <div class="row">

                      <div class="small-8   columns ">
                        <label>Title
                          <input type="text" placeholder=""   :value="serviceDetails.title" v-model="serviceDetails.title">
                        </label>

                      </div>


                      <div class="small-2 columns">
                        <label>Plan Code
                          <input type="text" placeholder=""  :value="serviceDetails.code" v-model="serviceDetails.code">
                        </label>

                      </div>
                      <div class="small-2 columns">
                        <label>Cost
                          <input type="text" placeholder="" :value="serviceDetails.cost" v-model="serviceDetails.cost">
                        </label>

                      </div>


                    </div>
                    <div class="row">
                      <div class="small-12 columns">
                        <label>Description
                          <textarea rows="3" :value="serviceDetails.description" v-model="serviceDetails.description" ></textarea>
                        </label>
                    </div>
                  </div>
                  <div class="row">
                    <div class="small-8 columns">
                      <label>Carriers
                        <select v-model="serviceDetails.carrierId">
                          <option value=""  >Select Carrier</option>
                          <option v-for="carrier in carriers"   :value="carrier.id" >{{carrier.presentation}}</option>

                        </select>
                      </label>


                    </div>

                        <div class="small-3 small-offset-1   columns">


                            <label class="status">
                              <input type="checkbox" v-model="serviceDetails.status"  :value="serviceDetails.status">
                              <span class="custom-checkbox"><i class="icon-check"></i></span>
                              Status
                            </label>


                        </div>

                  </div>

                </li>

                <li class="acordeon-item  " >
                  <a  class="accordion-title"   >Domestic Services</a>
                  <div class="accordion-content "  >
                    <div class="row">
<div class="small-2 columns">
<h6>
<i class="fa fa-clock-o fa-lg" aria-hidden="true"></i>
  Minutes</h6>

</div>
<div class="small-2 columns">
  <label>Amount
    <input type="text" placeholder=""  :value="domesticPlan.minutes" v-model="domesticPlan.minutes">
  </label>
</div>
<div class="small-2 columns">
<h6>
<i class="fa fa-database fa-lg" aria-hidden="true"></i>
  Data</h6>
</div>
<div class="small-2 columns">
  <label>Amount
    <input type="text" placeholder=""  :value="domesticPlan.data" v-model="domesticPlan.data">
  </label>

</div>
<div class="small-2 columns">
<h6>
<i class="fa fa-commenting fa-lg" aria-hidden="true"></i>
  SMS</h6>
</div>
<div class="small-2 columns">
  <label>Amount
    <input type="text" placeholder=""  :value="domesticPlan.sms" v-model="domesticPlan.sms">
  </label>

</div>
                        </div>
                      </div>



                </li>
                <li class="acordeon-item  " >
                  <a  class="accordion-title"   > International Services</a>
                  <div class="accordion-content "  >
                    <div class="row">
                      <div class="small-2 columns">
                      <h6>
                        <i class="fa fa-clock-o fa-lg" aria-hidden="true"></i>
                        Minutes</h6>
                      </div>
                      <div class="small-2 columns">
                        <label>Amount
                          <input type="text" placeholder=""  :value="internationalPlan.minutes" v-model="internationalPlan.minutes">
                        </label>
                      </div>
                      <div class="small-2 columns">
                      <h6>
<i class="fa fa-database fa-lg" aria-hidden="true"></i>
                        Data</h6>
                      </div>
                      <div class="small-2 columns">
                        <label>Amount
                          <input type="text" placeholder=""  :value="internationalPlan.data" v-model="internationalPlan.data">
                        </label>

                      </div>
                      <div class="small-2 columns">
                      <h6>
<i class="fa fa-commenting-o fa-lg" aria-hidden="true"></i>
                        SMS</h6>
                      </div>
                      <div class="small-2 columns">
                        <label>Amount
                          <input type="text" placeholder=""  :value="internationalPlan.sms" v-model="internationalPlan.sms">
                        </label>

                      </div>


                        </div>
                      </div>
                </li>
              </li>
              <li class="acordeon-item  " >
                <a  class="accordion-title"   >Add Ons</a>
                <div class="accordion-content "  >
                  <div class="row" v-for="(addon,index) in addons">
                    <div class="small-2 columns">
                    <h6>

                      Name</h6>
                    </div>
                    <div class="small-2 columns">
                      <label>Add Ons
                        <input type="text" placeholder=""  :value="addon.name"  @keyup="updateName(index,$event)" >
                      </label>
                    </div>
                    <div class="small-2 columns">
                    <h6>

                      Price</h6>
                    </div>
                    <div class="small-2 columns">
                      <label>Add Ons
                        <input type="text" placeholder=""  :value="addon.price"   @keyup="updatePrice(index,$event)"  >
                      </label>

                    </div>
                    <div class="small-4 columns">
                      <a  class="button" @click="hideAndPush(index)" id="button" v-show="addon.add" >
                              <i class="fa fa-plus fa-2x" ></i>
                      </a>
                      <a  class="button" @click="deleteAddOns(index)" id="button"   v-show="addon.delete" >
                            <i class="fa fa-times fa-2x" aria-hidden="true"></i>
                      </a>

                    </div>



                      </div>
                    </div>



              </li>






              </ul>
        </div>
      </div>
        <a  class="button large" @click="save()" id="button">Save Changes</a>
    </div>
  </div>
</div>

</template>
<script src="./service.crtl.js" lang="babel"  ></script>
