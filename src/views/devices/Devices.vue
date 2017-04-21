<template>
    <!--<div id="tables">-->
    <div>
  <modal v-if="$store.getters['error/hasError']" @close="$store.dispatch('error/clearAll')">
    <h3 slot="body">{{ $store.getters['error/error'] }}</h3>
  </modal>

        <!-- <div class="small-12 columns titles">
           <h4></h4>
         </div>-->

  <div class="small-12 columns">
      <a class="button large btn-orange" href="/device">Add device</a>
  </div>

  <div>
    <!-- {{ $store.state.device.types }} -->
    <!-- {{ $store.state.device.filter }} -->
  </div>
        <div class="large-12 columns">
            <header class="tag-header"><h1>Manage Devices</h1></header>
            <div class="grid-box">
                <div class="table-holder">
                    <tables :id="null"></tables>
                </div>
            </div>
        </div>
  <!-- <div class="load"><i v-show="loading" class="fa fa-spinner fa-spin fa-5x"></i></div> -->
  <!-- <tables></tables> -->
  <!-- {{ $store.state.device.all }} -->
  <!-- {{ $store.getters['device/find'](search.filter) }} -->
  <!-- {{ $store.getters['device/search'](search) }} -->
</div>
</template>

<script src="./devices.crtl.js" lang="babel"></script>
