<template>
  <div id="placeorder">
    <placeOrderWizard :activeStep="1"></placeOrderWizard>

    <div class="row expanded m-b-20" v-if="orderType != 'New'">
      <div class="columns small-12 text-center m-b-20">
        <h4 class="category-title m-b-10">Keep existing wireless service provider?</h4>
        <input type="radio" name="keepService" value="Yes" v-model="keepService"><label class="ft-18">Yes</label>
        <input type="radio" name="keepService" value="No" v-model="keepService"><label class="ft-18">No</label>
      </div>
    </div>

    <div class="row expanded" v-if="keepService == 'Yes'">
      <div class="small-1 columns height-10"></div>
      <div class="small-10 columns">
        <label>
          <span class="bold">Previous IMEI</span> <span class="asterisk bold">*</span>
          <input type="text" v-model="serviceInfo.IMEI">
        </label>
        <label>
          <span class="bold">Device Mobile Number</span> <span class="asterisk bold">*</span>
          <input type="text" v-model="serviceInfo.PhoneNo">
        </label>
        <label>
          <span class="bold">ICCID / SIM Card Number</span> <span class="asterisk bold">*</span>
          <input type="text" v-model="serviceInfo.Sim">
        </label>
      </div>
      <div class="small-1 columns"></div>
    </div>

    <div class="row expanded" v-else>
      <div class="columns small-12">
        <h4 class="category-title">Select Package</h4>
      </div>
      <div class="columns small-12">
        <div class="is-relative" v-if="packages.loading">
          <div class="is-loading"></div>
        </div>
        <div class="row expanded p-b-20" v-else>
          <div class="columns small-12 is-relative no-data" v-if="packages.availablePackages.length == 0 ">
            <transition appear
                        enter-class=""
                        enter-active-class="animated pulse"
                        leave-class=""
                        leave-active-class="animated zoomOut">

              <div class="msg">
                <img src="./../../assets/animat-noplugin.gif" alt="no-data" height="120" width="120"/>
                <p>No Package Matches your Profile. Please contact Your Administrator</p>
              </div>
            </transition>
          </div>
          <div class="columns small-12" v-else>
            <carousel :perPage="4">
              <slide v-for="(eachPackage, index) in packages.availablePackages">
                <transition appear
                            enter-class=""
                            enter-active-class="animated zoomIn"
                            leave-class=""
                            leave-active-class="animated zoomOut">
                  <div class="box-type-1" :class="{'active': eachPackage.id == packages.activePackage.id}"
                       @click="selectPackage(eachPackage)">
                    <div class="box-icon">
                    <span class="icon-circle">
                      <i class="fa fa-archive" aria-hidden="true"></i>
                    </span>
                    </div>
                    <div class="box-content">
                      <p class="ft-20 "><strong>{{eachPackage.name}}</strong></p>
                      <p class="m-b-0">{{eachPackage.information}}</p>
                    </div>
                    <div class="clearfix"></div>
                  </div>
                </transition>
              </slide>
            </carousel>
          </div>

        </div>
      </div>
      <div class="columns small-12 p-t-20" v-if="packages.activePackage.id">
        <div class="is-relative" v-if="services.loading">
          <div class="is-loading"></div>
        </div>
        <div class="row expanded " v-else>
          <transition appear
                      enter-class=""
                      enter-active-class="animated flash"
                      leave-class=""
                      leave-active-class="animated fadeOut">
            <h4 class="category-title select-service">Select Services</h4>
          </transition>
          <div class="columns small-12 p-b-20 border-bottom" v-if="services.availableServices.length">
            <carousel :perPage="4">
              <slide v-for="(eachService, index) in services.availableServices">
                <transition appear
                            enter-class=""
                            enter-active-class="animated zoomIn"
                            leave-class=""
                            leave-active-class="animated zoomOut">
                  <div class="box-type-2" :class="{'active': eachService.id == services.activeService.id}"
                       @click="setActiveService(eachService)">
                    <div class="box-content">
                      <div class="serviceImage">
                        <img :src="getImageUrl(eachService.carriers[0])"/>
                      </div>
                      <p class="ft-20 black">{{eachService.carriers[0].presentation}}</p>
                      <p class="capitalize m-b-0" v-for="(serviceItem, index) in eachService.serviceitems">
                        {{serviceItem.domain}} {{serviceItem.category}}: {{serviceItem.value}} {{serviceItem.unit}}
                      </p>
                    </div>
                    <div class="clearfix"></div>
                  </div>
                </transition>
              </slide>
            </carousel>
          </div>
          <div class="columns small-12 p-b-20 border-bottom" v-else>
            <p class="ft-20 bold black text-center">No Available Services</p>
          </div>
        </div>
      </div>
    </div>

    <div class="row expanded">
      <div class="columns small-12 p-t-20">
        <router-link to="/dashboard" class="button large btn-primary pull-left"><i class="fa fa-arrow-left"></i> Back</router-link>
        <button class="button large btn-primary pull-right" :disabled="isDisabled" @click="goDevicePage()">
          <!-- v-if="(keepService == 'Yes' && serviceInfo.IMEI && serviceInfo.PhoneNo && serviceInfo.Sim) || (keepService == 'No' && services.activeService.id)"-->
          Next <i class="fa fa-arrow-right"> </i></button>
      </div>
    </div>
  </div>
</template>

<script src="./order.new.package.ctrl.js"></script>
