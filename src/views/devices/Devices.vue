
<template>

<div id="tables">
  <modal v-if="showModal" @close="showModal = false">

    <h3 slot="body">{{error}}</h3>
  </modal>

  <div class="small-12 columns titles">
    <h4>Manage Devices</h4>

          </div>
          <div class="small-12 columns" >
            <a class="button buttonTable" href="/device"  >Add device</a>
          </div>
            <tables></tables>
          </div>
</template>

<script  src="./devices.crtl.js" lang="babel"  ></script>
