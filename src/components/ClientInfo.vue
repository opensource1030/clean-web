<template>
<div>
  <div class="column large-12">
    <div class="grid-box " >
      <div class="box-heading">
        <h2 v-if="client.object" >  {{client.object.title }}</h2>
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
    <div class="grid-box eq-Hght" data-mh="box1">
      <header class="box-heading">
        <h2>contact support</h2>
      </header>
      <div class="box-content">
        <div class="box-content-holder" v-if="client.object" v-html="client.object.metafields[0].value">
        </div>
      </div>
    </div>
  </div>
  <div class="large-6 columns" >
    <div class="grid-box eq-Hght" data-mh="box1" v-if="client.object">
      <header class="box-heading">
        <h2 v-html="client.object.metafields[1].title"> </h2>
      </header>
      <div class="box-content">
        <div class="box-content-holder">
          <div class="action-button" id="action-buttons">
            <!-- <a class="button btn-round" @click="requestProvision(client.object.title)"></a>-->
            <router-link class="button btn-round" :to="{ name: 'legacyInfo'}"> Request a Device or Accessory </router-link>
            <a class="button btn-provision btn-round "  href="javascript:;">Get Support</a>
          </div>
          <div v-html="client.object.metafields[1].value"></div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script src="./clientinfo.ctrl.js" lang="babel"> </script>