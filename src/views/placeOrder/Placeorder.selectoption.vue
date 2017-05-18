<template>
  <div id="placeorder">
    <div class="row expanded">
      <div class="columns small-12">
        <h4 class="category-title border-bottom">Personal Information</h4>
      </div>
      <div class="columns small-12 m-b-40">
        <div class="inline-block pull-left">
          <avatar :username="'John Stewart'" :size="110" background-color="#2196F3" color="#FFF"></avatar>
        </div>
        <div class="profile-info pull-left">
          <div class="columns small-12">
            <p class="bold">{{ 'John Stewart' }}</p>
          </div>
          <div class="columns small-5">
            <span>Senior Java Developer</span>
            <span>john.stewart@company.com</span>
            <span>531-242-4213</span>
          </div>
          <div class="columns small-5">
            <span>R&D &nbsp; 1110</span>
            <span>pete.johnson@company.com</span>
            <span>Austin, HQ</span>
          </div>
          <div class="columns small-2"></div>
        </div>
        <div class="pull-right">
          <a class="button large btn-orange m-t-25">Update Profile</a>
        </div>
      </div>
    </div>

    <div class="row expanded">
      <div class="columns small-12">
        <h4 class="category-title border-bottom">Place Order</h4>
      </div>
      <div class="columns small-12">
        <div class="row expanded">
          <div class="columns small-6 large-3 each-order" @click="selectOrderType('newService')">
            <i class="fa fa-wrench fa-5x" :class="{ active: selectedOrder == 'newService' }"></i>
            <p class="ft-18 m-t-15 m-b-0">Order a New Line of Service</p>
            <p class="ft-13 italic bold black">with new device</p>
          </div>
          <div class="columns small-6 large-3 each-order" @click="selectOrderType('upgradeDevice')">
            <i class="fa fa-mobile fa-5x" :class="{ active: selectedOrder == 'upgradeDevice' }"></i>
            <p class="ft-18 m-t-15 m-b-0">Upgrade Device</p>
            <p class="ft-13 italic bold black">with with existing wireless services</p>
          </div>
          <div class="columns small-6 large-3 each-order" @click="selectOrderType('transferService')">
            <i class="fa fa-random fa-5x" :class="{ active: selectedOrder == 'transferService' }"></i>
            <p class="ft-18 m-t-15 m-b-0">Transfer Wireless Service Liability</p>
            <p class="ft-13 italic bold black">also includes option to order a new device</p>
          </div>
          <div class="columns small-6 large-3 each-order" @click="selectOrderType('orderAccessory')">
            <i class="fa fa-headphones fa-5x" :class="{ active: selectedOrder == 'orderAccessory' }"></i>
            <p class="ft-18 m-t-15 m-b-0">Order Accessories</p>
            <p class="ft-13 italic bold black">headphones, chargers, bags</p>
          </div>
        </div>
      </div>
      <div class="columns small-12 text-center">
        <a class="button large btn-orange m-t-25" :disabled="selectedOrder == 'transferService' || selectedOrder == 'orderAccessory'" @click="placeOrder()">Place Order</a>
      </div>
    </div>
  </div>
</template>
<script  src="./placeorder.selectoption.crtl.js" lang="babel"></script>
