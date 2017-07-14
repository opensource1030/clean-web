<template>
  <div id="placeorder">
    <placeOrderWizard :activeStep="2"></placeOrderWizard>

    <div class="row expanded m-b-20">
      <div class="columns small-12 text-center m-b-20" v-if="orderType == 'New' || orderType == 'Transfer'">
        <h4 class="category-title m-b-10">Need a new Device or Accessory?</h4>
        <input type="radio" name="newDevice" value="Yes" v-model="needDevice"><label class="ft-18">Yes</label>
        <input type="radio" name="newDevice" value="No" v-model="needDevice"><label class="ft-18">No</label>
      </div>

      <div class="columns small-12" v-if="needDevice == 'Yes'">
        <div class="row expanded m-b-20 border-bottom">
          <div class="columns" :class="{ 'small-4': orderType != 'Accessory', 'small-6': orderType == 'Accessory' }">
            <div :class="{ 'pull-left': orderType != 'Accessory', 'custom-center': orderType == 'Accessory' }">
              <div class="each-device-type" @click="selectDeviceType('subsided')"
                   :class="{ active: deviceType == 'subsided' }">
                <div class="icon-holder">
                  <i class="fa fa-credit-card"> </i>
                </div>
                <strong>Paid on Corporate Account</strong>
                <p>choose an device from below</p>
              </div>
            </div>
          </div>
          <div class="columns" :class="{ 'small-4': orderType != 'Accessory', 'small-6': orderType == 'Accessory' }">
            <div class="each-device-type" @click="selectDeviceType('personal')"
                 :class="{ active: deviceType == 'personal' }">
              <div class="icon-holder">
                <i class="fa fa-cc-mastercard"> </i>
              </div>
              <strong>Pay by Personal Credit or Debit Card</strong>
              <p>choose any device and pay personally</p>
            </div>
          </div>
          <div class="columns small-4" v-if="orderType != 'Accessory'">
            <div class="each-device-type" @click="selectDeviceType('own')" :class="{ active: deviceType == 'own' }">
              <div class="icon-holder">
                <i class="fa fa-wrench fa-mobile"></i>
              </div>
              <strong>Bring Your Own Device</strong>
                <p>something special</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="columns small-12" v-if="needDevice == 'No' || deviceType == 'own'">
        <div class="row expanded m-t-10">
          <div class="columns small-12">
            <div class="row expanded border-bottom">
              <div class="small-1 columns height-10"></div>
              <div class="small-10 columns">
                <h4 class="category-title">Device Info</h4>
                <label>
                  <span class="bold">IMEI</span> <span class="asterisk bold">*</span>
                  <input type="text" v-model="deviceInfo.IMEI">
                </label>
                <label>
                  <span class="bold">Carrier</span> <span class="asterisk bold">*</span>
                  <input type="text" v-model="deviceInfo.Carrier">
                </label>
                <label>
                  <span class="bold">ICCID / SIM Card Number</span> <span class="asterisk bold">*</span>
                  <input type="text" v-model="deviceInfo.Sim">
                </label>
              </div>
              <div class="small-1 columns"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="columns small-12" v-else>
        <div class="is-relative" v-if="device_loading">
          <div class="is-loading"></div>
        </div>
        <div class="row expanded border-bottom " v-else>
          <div class="row expanded" v-if="devices.length">
            <div class="columns small-12 large-9 p-r-5s" v-if="orderType != 'Accessory'">
              <div class="m-b-20" v-for="(device, d_index) in devices" @click="selectDevice(d_index, 0, 0)" >
                <p class="bold ft-20 p-b-5 m-b-20 border-bottom black">{{device.device.name}}</p>
                <div class="row expanded" :class="{'device-active': device.device == activeDevice.device }">
                  <div class="columns small-12 p-10">
                    <div class="device-image">
                      <img :src="getImageUrl(device.device)" />
                    </div>
                    <div class="device-description">
                      <p class="modifications">
                        <span class="device-variation" v-for="(style, capacity) in device.modifications"
                              :class="{'active': style == device.capacity}"
                              @click.stop="selectDevice(d_index, capacity, 0)">
                          {{capacity + 'Gb'}}
                        </span>
                        <span class="device-variation seperator"></span>
                        <span class="device-variation" v-for="(style, s_index) in device.capacity"
                              :class="{'active': style.color == device.style.color}"
                              @click.stop="selectDevice(d_index, 0, s_index+1)">
                          {{style.color}}
                        </span>
                      </p>
                      <p class="black" v-html="device.device.properties"></p>
                      <p class="price">{{device.style.price}} {{device.device.currency}}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="columns small-12" :class="{ 'large-3': orderType != 'Accessory', 'large-12': orderType == 'Accessory' }">
              <p class="bold ft-20 p-b-5 m-b-10 border-bottom black">Add Accessories</p>
              <div class="row expanded">
                <div class="columns small-12 p-10 accessory-group">
                  <div v-for="(accessory, a_index) in accessories">
                    <div class="m-b-10 each-accessory" :class="{'accessory-active': accessory.status == 1}" @click="selectAccessory(a_index)">
                      <div class="accessory-image">
                        <img :src="getImageUrl(accessory.device)" />
                      </div>
                      <p class="text-center black m-b-0 ft-13 bold">{{accessory.device.name}}</p>
                      <p class="price text-center black ft-13">{{accessory.variations[0].priceRetail}} {{accessory.device.currency}}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row expanded" v-else>
            <div class="columns small-12 mgbtm-1">
              <div class="is-relative no-data">
                <transition appear
                            enter-class=""
                            enter-active-class="animated pulse"
                            leave-class=""
                            leave-active-class="animated zoomOut">
                  <div class="msg">
                    <img src="./../../assets/animat-noplugin.gif" alt="no-data" height="120" width="120"/>
                    <p>No Available Devices</p>
                  </div>
                </transition>
              </div>
            </div>
          </div>
        </div>
      </div>


    <div class="row expanded">
      <div class="columns small-12 p-t-20">
        <button class="button large btn-primary pull-left" @click="goOrderPages('package')"
                v-if="orderType != 'Accessory'"><i class="fa fa-arrow-left"> </i> Back
        </button>
        <button class="button large btn-primary pull-right" @click="goOrderPages('review')"
                :disabled="isDisabled">
          <!--v-if="(activeDevice.device && needDevice == 'Yes' && deviceType != 'own') || (((needDevice == 'Yes' && deviceType == 'own') || needDevice == 'No') && deviceInfo.IMEI && deviceInfo.Carrier && deviceInfo.Sim) || (orderType == 'Accessory' && accessoryStatus)"-->
          Next <i class="fa fa-arrow-right"> </i>
        </button>
      </div>
    </div>
  </div>
</template>

<script src="./order.new.device.ctrl.js"></script>
