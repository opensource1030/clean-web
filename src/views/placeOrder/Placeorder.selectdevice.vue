<template>
  <div id="placeorder">
    <placeOrderWizard :activeStep="3"></placeOrderWizard>
    <div class="row expanded m-b-20">
      <div class="columns small-12 text-center m-b-20">
        <h4 class="category-title m-b-10">Need a new Device or Accessory?</h4>
        <input type="radio" name="newDevice" value="Yes" v-model="needDevice"><label class="ft-18">Yes</label>
        <input type="radio" name="newDevice" value="No" v-model="needDevice"><label class="ft-18">No</label>
      </div>
      <div class="columns small-12" v-if="needDevice == 'Yes'">
        <div class="row expanded m-b-20 border-bottom">
          <div class="columns small-4">
            <div class="pull-left">
              <input class="custom-radio" type="radio" name="deviceType" value="subsided" v-model="deviceType">
              <div>
                <label class="ft-18">Subsided Device</label>
                <p>choose a device from a list</p>
              </div>
            </div>
          </div>
          <div class="columns small-4">
            <div class="custom-center">
              <input class="custom-radio" type="radio" name="deviceType" value="personal" v-model="deviceType">
              <div>
                <label class="ft-18">Pay by Personal Credit or Debit Card</label>
                <p>choose any device and pay by yourself</p>
              </div>
            </div>
          </div>
          <div class="columns small-4">
            <div class="pull-right">
              <input class="custom-radio" type="radio" name="deviceType" value="own" v-model="deviceType">
              <div>
                <label class="ft-18">Bring Your Own Device</label>
                <p>something special</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="columns small-12" v-if="needDevice == 'No' || deviceType == 'own'">
        <div class="row expanded m-t-10">
          <div class="columns small-12">
            <div class="row expanded">
              <div class="small-1 columns height-10"></div>
              <div class="small-10 columns">
                <h4 class="category-title">Device Info</h4>
                <label>
                  <span class="bold">IMEI</span> <input type="text" v-model="deviceInfo.IMEI" @change="setDeviceInfo()">
                </label>
                <label>
                  <span class="bold">Carrier</span> <input type="text" v-model="deviceInfo.Carrier" @change="setDeviceInfo()">
                </label>
                <label>
                  <span class="bold">Sim Card</span> <input type="text" v-model="deviceInfo.Sim" @change="setDeviceInfo()">
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
        <div class="row expanded" v-else>
          <div class="columns small-9 p-r-5s">
            <div class="m-b-20" v-for="(device, d_index) in devices" @click="selectDevice(d_index, 1, 1)">
              <p class="bold ft-20 p-b-5 m-b-20 border-bottom black">{{device.devices[0].name}}</p>
              <div class="row expanded">
                <div class="columns small-12 p-10" :class="{'device-active': device.id == activeDevice.id }">
                  <div class="device-image">
                    <img src="//openclipart.org/download/213897/black-android-phone.svg" />
                  </div>
                  <div class="device-description">
                    <p class="modifications">
                      <span class="device-capacity" :class="{ last: c_index+1 == device.capacities.length, active: capacity.id == activeCapacity && device.id == activeDevice.id }" 
                            v-for="(capacity, c_index) in device.capacities" @click.stop="selectDevice(d_index, c_index+1, 0)" v-if="device.devices[0].modifications">
                        {{capacity.value + 'Gb'}}
                      </span>
                      <span class="device-capacity" v-for="(style, s_index) in device.styles" @click.stop="selectDevice(d_index, 0, s_index+1)" 
                            v-if="device.devices[0].modifications">
                        {{style.value}}
                      </span>
                    </p>
                    <p>4.7-inch(diagonal) LED-backlit widescreen Multi-Touch display with IPSP techonology</p>
                    <p>New 8-megapixel iSight camera with 1.5u pixels</p>
                    <p>A8 chip with 64-bit architecture. M8 motion coprocessor</p>
                    <p>1080p HD video recording (30 fps or 60 fps)</p>
                    <p>Unlocked cell phones are compatible with GSM carriers like AT&T and T-Mobile as well as with GSM SIM cards(e.g. H20 and select prepaid carriers). Unlocked cell phones will not work with CDMA Carriers like sprint, Verizon, Boost or virgin.</p>
                    <p class="price">{{device.priceOwn}} {{device.devices[0].currency}}</p>                
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="columns small-3">
            <p class="bold ft-20 p-b-5 m-b-10 border-bottom black">Add Accessories</p>
          </div>
        </div>
      </div>
    </div>
    <div class="row expanded">
      <div class="columns small-12 p-t-20">
        <a class="button large btn-orange pull-left" @click="goOrderPages('package')">Back</a>
        <a class="button large btn-orange pull-right" @click="goOrderPages('review')" 
           v-if="(activeDevice.id && needDevice == 'Yes' && deviceType != 'own') || (((needDevice == 'Yes' && deviceType == 'own') || needDevice == 'No') && deviceInfo.IMEI && deviceInfo.Carrier)">
          <span v-if="needDevice == 'Yes'">Request Device</span>
          <span v-else>Next</span>
        </a>
      </div>
    </div>
  </div>
</template>
<script  src="./placeorder.selectdevice.crtl.js" lang="babel"></script>
