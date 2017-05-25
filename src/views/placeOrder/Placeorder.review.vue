<template>
  <div id="placeorder">
    <modal class="submit-order" v-if="submitOrder">
      <div slot="header" class="complete-mark">
        <i class="fa fa-check-circle-o"></i>
      </div>
      <p slot="body">Thank you for your order</p>
    </modal>

    <modal class="submit-order-pay" v-if="submitOrder_pay">
      <div slot="header" class="credit-mark">
        <i class="fa fa-credit-card-alt"></i>
      </div>
      <div slot="body">
        <h4 class="category-title">Please fill the details and pay</h4>
        <div class="row expanded p-20">
          <div class="columns small-12">
            <label>
              <span class="bold">Full Name</span> <input type="text" placeholder="Your name here">
            </label>
          </div>
          <div class="columns small-12 medium-12 large-6">
            <label>
              <span class="bold">Phone No</span> <input type="text" placeholder="0000000000">
            </label>
          </div>
          <div class="columns small-12 medium-12 large-6">
            <label>
              <span class="bold">Credit Card Number</span> <input type="text" placeholder="4242 4242 4242 4242">
            </label>
          </div>
          <div class="columns small-12 medium-12 large-4">
            <label>
              <span class="bold">CVV</span> <input type="text" placeholder="424">
            </label>
          </div>
          <div class="columns small-12 medium-12 large-4">
            <label>
              <span class="bold">Expiration Month</span> <input type="text" placeholder="Month">
            </label>
          </div>
          <div class="columns small-12 medium-12 large-4">
            <label>
              <span class="bold">Expiration Year</span> <input type="text" placeholder="Year">
            </label>
          </div>
          <div class="columns small-12">
            <a class="button large btn-orange" @click="payByCredit()">Pay</a>
          </div>
        </div>
      </div>
    </modal>

    <placeOrderWizard :activeStep="3"></placeOrderWizard>
    <div class="row expanded m-b-20">
      <div class="columns small-12 large-6 black review-device">
        <p class="section-title">Device Info</p>
        <div v-if="((selectedNeedDevice == 'Yes' && selectedDeviceType == 'own') || selectedNeedDevice == 'No')">
          <p>
            <span class="bold">IMEI</span> : {{typedDeviceInfo.IMEI}}
          </p>
          <p>
            <span class="bold">Carrier</span> : {{typedDeviceInfo.Carrier}}
          </p>
          <p>
            <span class="bold">SIM *</span> : {{typedDeviceInfo.Sim}}
          </p>
        </div>
        <div v-else>
          <div class="device-image">
            <img src="//openclipart.org/download/213897/black-android-phone.svg" />
          </div>
          <div class="device-description">
            <p class="review-option">
              <span class="bold">Device</span> : {{selectedDevice.name}}
            </p>
            <p class="review-option">
              <span class="bold">Estimated Charges</span> : {{selectedStyle.price}} {{selectedDevice.currency}}
            </p>
            <p>4.7-inch(diagonal) LED-backlit widescreen Multi-Touch display with IPSP techonology</p>
            <p>New 8-megapixel iSight camera with 1.5u pixels</p>
            <p>A8 chip with 64-bit architecture. M8 motion coprocessor</p>
            <p>1080p HD video recording (30 fps or 60 fps)</p>
            <p>Unlocked cell phones are compatible with GSM carriers like AT&T and T-Mobile as well as with GSM SIM cards(e.g. H20 and select prepaid carriers). Unlocked cell phones will not work with CDMA Carriers like sprint, Verizon, Boost or virgin.</p>
          </div>
        </div>
      </div>
      <div class="columns small-12 large-6 black review-usage">
        <p class="section-title">Service Info</p>
        <div v-if="selectedKeepService == 'Yes'">
          <p>
            <span class="bold">Previous IMEI</span> : {{typedServiceInfo.IMEI}}
          </p>
          <p>
            <span class="bold">Phone No</span> : {{typedServiceInfo.PhoneNo}}
          </p>
          <p>
            <span class="bold">Sim Card</span> : {{typedServiceInfo.Sim}}
          </p>
        </div>
        <div v-else>
          <p v-for="serviceItem in selectedService.serviceitems">
            <span class="bold capitalize" v-if="serviceItem.domain == 'domestic'">Domestic {{serviceItem.category}}</span>
            <span class="bold capitalize" v-else>International {{serviceItem.category}}</span>
            <span> : {{serviceItem.value}} {{serviceItem.unit}}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="row expanded black">
      <div class="columns small-12 large-6">
        <p class="section-title">User Info</p>
        <div class="inline-block pull-left p-r-20 p-l-20">
          <avatar :username="'Dele Omotsho'" :size="110" background-color="#FF690A" color="#FFF"></avatar>
        </div>
        <div class="review-profile profile-info pull-left">
          <p>
            <span class="bold">Username</span> : Dele Omotsho
          </p>
          <p>
            <span class="bold">Cost Centre</span> : 1110
          </p>
          <p>
            <span class="bold">Office Phone</span> : 0000000000
          </p>
          <p>
            <span class="bold">Email</span> : domosto@wirelessanalytics.com
          </p>
          <p>
            <span class="bold">Supervisor E-mail</span> : domosto@wirelessanalytics.com
          </p>
          <p>
            <span class="bold">Position</span> : Senior JAVA Developer
          </p>
          <p>
            <span class="bold">Division</span> : RI&D
          </p>
        </div>
      </div>
      <div class="columns small-12 large-6">
        <div class="is-relative" v-if="address.loading">
          <div class="is-loading"></div>
        </div>
        <div class="row expanded" v-else>
          <p class="section-title">Shipping Info 
            <a class="black pull-right" @click="changeShippingAddress">
              <i class="fa fa-pencil-square-o" :class="{ 'fa-pencil-square-o': !address.changeAddress, 'fa-check-square-o': address.changeAddress }"></i>
            </a>
          </p>
          <div class="row expanded" v-if="address.changeAddress">
            <div class="columns small-12">
              <multiselect v-model="address.shippingAddress" placeholder="Select a Address" :searchable="false" :custom-label="customLabel"
                          :options="address.availableAddresses" :show-labels="false"></multiselect>
            </div>
          </div>
          <div class="row expanded review-shipping" v-else>
            <div class="columns small-12 medium-6 large-6">
              <p>
                <span class="bold">Address</span> : {{this.address.shippingAddress.address}}
              </p>
              <p>
                <span class="bold">City</span> : {{this.address.shippingAddress.city}}
              </p>
              <p>
                <span class="bold">Postal</span> : {{this.address.shippingAddress.postalCode}}
              </p>
            </div>
            <div class="columns small-12 medium-6 large-6">
              <p>
                <span class="bold">State</span> : {{this.address.shippingAddress.state}}
              </p>
              <p>
                <span class="bold">Country</span> : {{this.address.shippingAddress.country}}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row expanded">
      <div class="columns small-12 p-t-20">
        <a class="button large btn-orange pull-left" @click="goOrderDevicePage()">Back</a>
        <a class="button large btn-orange pull-right" @click="submitDevice()" v-if="!address.changeAddress">Submit</a>
      </div>
    </div>
  </div>
</template>
<script  src="./placeorder.review.crtl.js" lang="babel"></script>
