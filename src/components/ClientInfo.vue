<template>
<div>
  <div class="column large-12">
    <div class="grid-box " >
      <div class="box-heading">
        <h2 v-if="client.object" > Welcome, {{fullName }}</h2>
      </div>
      <div class="box-content" >
        <div class="box-content-holder" v-if="client.object" >
        <p v-html="client.object.metafields[2].value"> </p>
          </div>
      </div>
    </div>
  </div>
  <div class="clearfix"></div>
  <div class="large-6 columns" >
    <div class="grid-box eq-Hght" >
      <header class="box-heading">
        <h2>Get Support</h2>
      </header>
      <div class="box-content">
        <div class="box-content-holder" >
          <div v-if="client.object" v-html="client.object.metafields[0].value"> </div>
          <div class="action-button" >
            <a class="button btn-provision btn-round" href="javascript:;" v-on:click="openTicket">Open a Ticket</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="large-6 columns" >
    <div class="grid-box eq-Hght">
      <header class="box-heading">
        <h2>Support Resources</h2>
      </header>
      <div class="box-content">
        <div class="box-content-holder">
          <div v-if="client.object" v-html="client.object.metafields[1].value"></div>
          <div class="action-button" id="action-buttons">
            <router-link class="button btn-round btn-started" :to="{ name: 'Place Order'}">Click to Get Started
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script src="./clientinfo.ctrl.js" lang="babel"> </script>
