<template>

  <div class="content-right">
    <div class="full-height row">
      <div id="updateEmployee">

        <div class="expanded row">

            <div class="small-12 columns" >

              <ul  class="acordeon" >
                <li class="acordeon-item  is-active" >
                  <a  class="accordion-title"   >Personal Information</a>
                  <div class="accordion-content overview"  >
                    <div class="row">

                      <div class="small-6   columns ">
                        <label>Full Name
                          <input type="text" placeholder=""   :value="personalInfo.fullName" v-model="personalInfo.fullName" >
                        </label>

                      </div>


                      <div class="small-6 columns">
                        <label>Division
                          <input type="text" placeholder=""  :value="personalInfo.division" v-model="personalInfo.division">
                        </label>

                      </div>
                    </div>
                      <div class="row">
                      <div class="small-6 columns">
                        <label>Position
                          <input type="text" placeholder="" :value="personalInfo.position" v-model="personalInfo.position">
                        </label>

                      </div>
                      <div class="small-6 columns">
                        <label>Supervisor Mail
                          <input type="text" placeholder="" :value="personalInfo.sMail" v-model="personalInfo.sMail">
                        </label>

                      </div>
                    </div>
                    <div class="row">
                    <div class="small-6 columns">
                      <label>Email
                        <input type="text" placeholder="" :value="personalInfo.email" v-model="personalInfo.email">
                      </label>

                    </div>
                    <div class="small-6 columns">
                      <label>Cost Center
                        <input type="text" placeholder="" :value="personalInfo.cost" v-model="personalInfo.cost">
                      </label>

                    </div>
                  </div>

                  <div class="row">
                  <div class="small-6 columns">
                    <label>Office Phone
                      <input type="text" placeholder="" :value="personalInfo.officePhone" v-model="personalInfo.officePhone">
                    </label>

                  </div>
                  <div class="small-6 columns">
                    <label>Office
                      <input type="text" placeholder="" :value="personalInfo.office" v-model="personalInfo.office">
                    </label>

                  </div>
                </div>


                </li>

                <li class="acordeon-item  " >
                  <a  class="accordion-title"   >Shipping Address</a>
                  <div class="accordion-content "  >
                    <div class="row">
                    <div class="small-6 columns">
                      <label>Name
                        <input type="text" placeholder="" :value="shippingAddress.name" v-model="shippingAddress.name">
                      </label>

                    </div>
                    <div class="small-6 columns">
                      <label>Address
                        <input type="text" placeholder="" :value="shippingAddress.address" v-model="shippingAddress.address">
                      </label>

                    </div>
                  </div>
                  <div class="row">
                  <div class="small-6 columns">
                    <label>Attn.
                      <input type="text" placeholder="" :value="shippingAddress.attn" v-model="shippingAddress.attn">
                    </label>

                  </div>
                  <div class="small-3 columns">
                    <label>City
                      <input type="text" placeholder="" :value="shippingAddress.city" v-model="shippingAddress.city">
                    </label>

                  </div>
                  <div class="small-3 columns">
                    <label>State
                      <input type="text" placeholder="" :value="shippingAddress.state" v-model="shippingAddress.state">
                    </label>

                  </div>
                </div>
                <div class="row">
                <div class="small-6 columns">
                  <label>Phone
                    <input type="text" placeholder="" :value="shippingAddress.phone" v-model="shippingAddress.phone">
                  </label>

                </div>
                <div class="small-3 columns">
                  <label>Country
                    <input type="text" placeholder="" :value="shippingAddress.country" v-model="shippingAddress.country">
                  </label>

                </div>
                <div class="small-3 columns">
                  <label>Postal Code
                    <input type="text" placeholder="" :value="shippingAddress.postalCode" v-model="shippingAddress.postalCode">
                  </label>

                </div>
              </div>
                      </div>

                </li>

              </ul>
        </div>
      </div>
        <a class="button large" @click="save()" id="button">Save Profile</a>
    </div>
  </div>
</div>

</template>
<script src="./UpdateProfile.crtl.js" lang="babel"  ></script>
