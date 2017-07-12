<template>
  <div id="placeorder">
    <modal class="submit-order" v-if="orderFinished">
      <div slot="header" class="complete-mark">
        <i class="fa fa-check-circle-o"></i>
      </div>
      <p slot="body">Thank you for your order</p>
    </modal>

    <modal class="submit-order-pay" v-if="payOrder">
      <div slot="header" class="credit-mark">
        <i class="fa fa-credit-card-alt"></i>
      </div>
      <div slot="body">
        <h4 class="category-title">Please fill the details and pay</h4>
        <div class="row expanded p-20">
          <div class="columns small-12">
            <label>
              <span class="bold">Full Name</span> <input type="text" placeholder="Your name here" v-model="card.name">
            </label>
          </div>
          <div class="columns small-12 medium-12 large-6">
            <label>
              <span class="bold">Phone No</span> <input type="text" placeholder="0000000000" v-model="card.phone">
            </label>
          </div>
          <div class="columns small-12 medium-12 large-6">
            <label>
              <span class="bold">Credit Card Number</span> <input type="text" placeholder="4242424242424242" v-model="card.number">
            </label>
          </div>
          <div class="columns small-12 medium-12 large-4">
            <label>
              <span class="bold">CVV</span> <input type="text" placeholder="424" v-model="card.cvc">
            </label>
          </div>
          <div class="columns small-12 medium-12 large-4">
            <label>
              <span class="bold">Expiration Month</span> <input type="text" placeholder="Month" v-model="card.month">
            </label>
          </div>
          <div class="columns small-12 medium-12 large-4">
            <label>
              <span class="bold">Expiration Year</span> <input type="text" placeholder="Year" v-model="card.year">
            </label>
          </div>
          <div class="columns small-12 medium-12 large-12" v-if="!card.status">
            <p class="error">Card information is not correct</p>
          </div>
          <div class="columns small-12">
            <a class="button large btn-orange" @click="payByCredit()" :disabled="card.checking">Pay</a>
          </div>
        </div>
      </div>
    </modal>

    <modal class="submit-order-pay address-modal" v-if="chooseAddress">
      <div slot="header" class="credit-mark">
        <i class="fa fa-map-marker"></i>
      </div>
      <div slot="body" class="text-left">
        <h4 class="category-title text-center">Shipping Details</h4>
        <div class="mgbtm-1 clearfix"></div>
        <div class="row">
          <div class="columns small-12 large-5">
            <div class="row expanded">
              <div class="columns small-12">
                <strong>Select an Address </strong>
                <multiselect
                        v-model="address.shippingAddress"
                        placeholder="Select a Address"
                        :searchable="false"
                        :custom-label="customLabel"
                        :options="address.availableAddresses"
                        :show-labels="true">
                </multiselect>
                <hr/>
              </div>
            </div>
            <div class="row expanded review-shipping">
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
              <div class="mgbtm-1 clearfix"></div>
              <div class="columns small-12 ">
                <button class="button button-primary expanded" @click="confirmDefaultAddress"> Use this address</button>
              </div>
            </div>
          </div>
          <div class="columns small-12 large-1">
            <div class="text-center or"><strong>-OR-</strong></div>
          </div>
          <div class="columns small-12 large-6">
            <div>
              <div class="row">
                <div class="columns small-12">
                  <strong> Complete the form below </strong>
                </div>
                <div class="clearfix"></div>
                <div class="small-6 columns">
                  <label><strong>Name<span class="asterisk bold">*</span> </strong>
                    <input type="text" placeholder="" v-model="customAddress.name">
                  </label>
                </div>
                <div class="small-6 columns">
                  <label><strong>Address<span class="asterisk bold">*</span> </strong>
                    <input type="text" placeholder="" v-model="customAddress.address">
                  </label>
                </div>
              </div>
              <div class="small-6 columns">
                <label><strong>Attn.</strong>
                  <input type="text" placeholder="" v-model="customAddress.attn">
                </label>
              </div>
              <div class="small-3 columns">
                <label><strong>City<span class="asterisk bold">*</span></strong>
                  <input type="text" placeholder="" v-model="customAddress.city">
                </label>
              </div>
              <div class="small-3 columns">
                <label><strong>State<span class="asterisk bold">*</span></strong>
                  <input type="text" placeholder="" v-model="customAddress.state">
                </label>
              </div>
              <div class="small-6 columns">
                <label><strong>Phone</strong>
                  <input type="text" placeholder="" v-model="customAddress.phone">
                </label>
              </div>
              <div class="small-3 columns">
                <label><strong>Country<span class="asterisk bold">*</span></strong>
                  <input type="text" placeholder="" v-model="customAddress.country">
                </label>
              </div>
              <div class="small-3 columns">
                <label><strong>Postal Code<span class="asterisk bold">*</span> </strong>
                  <input type="text" placeholder="" v-model="customAddress.postalCode">
                </label>
              </div>
              <div class="columns small-12">
                <button class="button button-primary expanded" :disabled="isDisabledCustom"
                        @click="confirmCustomAddress">
                  Use custom address
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </modal>

    <placeOrderWizard :activeStep="3"
                      :step2Name="orderType == 'Accessory' ? 'Select Accessories' : 'Select Device'"></placeOrderWizard>

    <div class="row expanded m-b-20" v-if="orderType != 'Accessory'">
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
            <span class="bold">ICCID / SIM Card Number</span> : {{typedDeviceInfo.Sim}}
          </p>
        </div>
        <div v-else>
          <div class="device-image">
            <img :src="getImageUrl(selectedDevice)" />
          </div>
          <div class="device-description">
            <p class="review-option">
              <span class="bold">Device</span> : {{selectedDevice.name}}
            </p>
            <p class="review-option">
              <span class="bold">Estimated Charges</span> : {{selectedStyle.price}} {{selectedDevice.currency}}
            </p>
            <p class="black" v-html="selectedDevice.properties"></p>
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
            <span class="bold">Device Mobile Number</span> : {{typedServiceInfo.PhoneNo}}
          </p>
          <p>
            <span class="bold">ICCID / SIM Card Number</span> : {{typedServiceInfo.Sim}}
          </p>
        </div>
        <div v-else>
          <p v-for="serviceItem in selectedService.serviceitems">
            <span class="bold capitalize">{{serviceItem.domain}} {{serviceItem.category}}</span>
            <span> : {{serviceItem.value}} {{serviceItem.unit}}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="row expanded black border-bottom p-b-20 ">
      <div class="columns small-12 large-6">
        <p class="section-title">User Info</p>
        <div class="inline-block pull-left p-r-20 p-l-20">
          <avatar :username="'Dele Omotsho'" :size="110" background-color="#FF690A" color="#FFF"></avatar>
        </div>
        <div class="review-profile profile-info pull-left">
          <p>
            <span class="bold">Username</span> : {{user.firstName}} {{user.lastName}}
          </p>
          <p>
            <span class="bold">Email</span> : {{user.email}}
          </p>
          <p>
            <span class="bold">Supervisor E-mail</span> : {{user.supervisorEmail}}
          </p>
          <p v-for="udl in user.udlvalues">
            <span class="bold">{{udl.udlName}}</span> : {{udl.udlValue}}
          </p>
        </div>
      </div>
      <div class="columns small-12 large-6">
        <div class="is-relative" v-if="address.loading">
          <div class="is-loading"></div>
        </div>
        <div class="row expanded" v-else>
          <p class="section-title">Shipping Info
            <!--<a class="black pull-right" @click="changeShippingAddress">
              <i class="fa fa-pencil-square-o" :class="{ 'fa-pencil-square-o': !address.changeAddress, 'fa-check-square-o': address.changeAddress }"></i>
            </a>-->
            <button class="button button-primary pull-right small" @click="toggleAddressModal">Add</button>
          </p>
          <div class="row expanded review-shipping" v-if="addDefaultAddress">
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
          <div class="row expanded review-shipping" v-if="addCustomAddress">
            <div class="columns small-12 medium-6 large-6">
              <p>
                <span class="bold">Name</span> : {{this.customAddress.name}}
              </p>
              <p>
                <span class="bold">Address</span> : {{this.customAddress.address}}
              </p>
              <p>
                <span class="bold">Attn.</span> : {{this.customAddress.attn}}
              </p>
              <p>
                <span class="bold">Phone no.</span> : {{this.customAddress.phone}}
              </p>
            </div>
            <div class="columns small-12 medium-6 large-6">
              <p>
                <span class="bold">City</span> : {{this.customAddress.city}}
              </p>
              <p>
                <span class="bold">State</span> : {{this.customAddress.state}}
              </p>
              <p>
                <span class="bold">Country</span> : {{this.customAddress.country}}
              </p>
              <p>
                <span class="bold">Postal Code</span> : {{this.customAddress.postalCode}}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row expanded">
      <div class="columns small-12 p-t-20">
        <a class="button large btn-primary pull-left" @click="goOrderDevicePage()"> <i class="fa fa-arrow-left"> </i>
          Back</a>
        <button class="button large btn-primary pull-right" :disabled="isDisabled" @click="submitOrder()">Submit <i
                class="fa fa-send"> </i></button>
      </div>
    </div>
  </div>
</template>

<script src="./order.new.review.ctrl.js" lang="babel"></script>
