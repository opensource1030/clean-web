<template>
<div id="updateEmployee">
  <div class="small-12 columns">
    <ul class="acordeon">
      <li class="acordeon-item is-active">
        <a  class="accordion-title">Personal Information</a>
        <div class="accordion-content overview" v-if="uiemployee!=null" >
          <div class="row">
            <div class="small-6 columns">
              <label>First Name
                <input type="text" placeholder="" v-model="uiemployee.firstName" >
              </label>
            </div>
            <div class="small-6 columns">
              <label>Last Name
                <input type="text" placeholder="" v-model="uiemployee.lastName">
              </label>
            </div>
          </div>
          <div class="row">
            <div class="small-6 columns">
              <label>Email
                <input type="text" placeholder="" v-model="uiemployee.email">
              </label>
            </div>
            <div class="small-6 columns">
              <label>Alternate Email
                <input type="text" placeholder="" v-model="uiemployee.alternateEmail">
              </label>
            </div>
          </div>
          <div class="row">
            <div class="small-6 columns">
              <label>Supervisor Mail
                <input type="text" placeholder="" v-model="uiemployee.supervisorEmail">
              </label>
            </div>
          </div>

          <div class="row">
            <div class="small-6 columns" v-if="uiemployee.udls.lenght!=0" v-for="udl in uiemployee.udls">
              <label>{{udl.label}}
                <select v-model="udl.selected">
                  <option v-for="values in udl.udlvalues" :value="values.id" >{{values.name}}</option>
                </select>
              </label>
            </div>

            <div class="small-6 columns">
             <div class="checkbox">
               <label>
                 <input type="checkbox" id="st" v-model="uiemployee.active">
                 <span class="custom-checkbox"><i class="icon-check"></i></span>
                 Ship to custom address
               </label>
             </div>
           </div>
         </div>
       </div>
      </li>

      <li class="acordeon-item" v-if=" uiemployee!=null  && uiemployee.active==true">
        <a class="accordion-title">Shipping Address</a>
        <div class="accordion-content">
          <div class="row">
            <div class="small-6 columns">
              <label>Name
                <input type="text" placeholder="" v-model="uiemployee.shippingAddress.name">
              </label>
            </div>
            <div class="small-6 columns">
              <label>Address
                <input type="text" placeholder="" v-model="uiemployee.shippingAddress.address">
              </label>
            </div>
          </div>
          <div class="row">
            <div class="small-6 columns">
              <label>Attn.
                <input type="text" placeholder="" v-model="uiemployee.shippingAddress.attn">
              </label>
            </div>
            <div class="small-3 columns">
              <label>City
                <input type="text" placeholder="" v-model="uiemployee.shippingAddress.city">
              </label>
            </div>
            <div class="small-3 columns">
              <label>State
                <input type="text" placeholder="" v-model="uiemployee.shippingAddress.state">
              </label>
            </div>
          </div>
          <div class="row">
            <div class="small-6 columns">
              <label>Phone
                <input type="text" placeholder="" v-model="uiemployee.shippingAddress.phone">
              </label>
            </div>
            <div class="small-3 columns">
              <label>Country
                <input type="text" placeholder="" v-model="uiemployee.shippingAddress.country">
              </label>
            </div>
            <div class="small-3 columns">
              <label>Postal Code
                <input type="text" placeholder="" v-model="uiemployee.shippingAddress.postalCode">
              </label>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
  <a class="button large" @click="save()" id="button">Save Profile</a>
</div>
</template>

<script src="./UpdateProfile.crtl.js" lang="babel"></script>
