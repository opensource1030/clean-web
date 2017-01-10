<template>

<div id="tables">
  <modal v-if="showModal" @close="showModal = false">

    <h3 slot="body">{{error}}</h3>
  </modal>

  <div class="small-12 columns titles">
    <h4>Manage Devices<h4>

          </div>
          <div class="small-12 columns" >
            <a class="button" href="/device"  >Add device</a>
          </div>

          <div class="small-12 columns" >

            <tables ></tables>


</template>


<script  src="./devices.crtl.js" lang="babel"  ></script>
