<template>
  <div id="placeorder">
    <placeOrderWizard :activeStep="2" :step2Name="'Select Accessories'"></placeOrderWizard>

    <div class="row expanded m-b-20">
      <div class="columns small-12 border-bottom">
        <div class="is-relative" v-if="device_loading">
          <div class="is-loading"></div>
        </div>
        <div class="row expanded" v-else>
          <div class="row expanded" v-if="devices.length">
            <div class="columns small-12">
              <p class="bold ft-20 p-b-5 m-b-10 border-bottom black">Select Accessories</p>
              <div class="row expanded">
                <div class="columns small-12 p-10 accessory-group">
                  <div v-for="(accessory, a_index) in accessories">
                    <div class="m-b-10 each-accessory" :class="{'accessory-active': accessory.status == 1}"
                         @click="selectAccessory(a_index)">
                      <div class="accessory-image">
                        <img :src="getImageUrl(accessory.device)"/>
                      </div>
                      <p class="text-center black m-b-0 ft-13 bold">{{accessory.device.name}}</p>
                      <p class="price text-center black ft-13">{{accessory.variations[0].priceRetail}}
                        {{accessory.device.currency}}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row expanded" v-else>
            <div class="columns small-12">
              <p class="ft-20 bold black text-center">No Available Devices</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row expanded">
      <div class="columns small-12 ">
        <a class="button large btn-primary pull-right" @click="goOrderPages('review')"
           v-if="(orderType == 'Accessory' && accessoryStatus)">
          Next <i class="fa fa-arrow-right"> </i>
        </a>
      </div>
    </div>
  </div>
</template>

<script src="./order.new.accessories.ctrl.js"></script>
