
<template>
  <div>
    <transition name="fade">
      <div class="callout spent-info" v-bind:class="{ active: isActive, 'visible': popOver }">
        <div class="pop-overlay" @click="goDashboard()"></div>
        <div class="pop-content" v-if="token">
          <div class="expanded row">
            <div class="columns large-12">
              <h1 class="pop-heading">  Request a Device or Accessory </h1>
              <a v-show="iframeUrl" @click="closePop()" class="button  pop-close" > <i class="fa fa-arrow-left"> </i> Back </a>

              <hr class="hr-cln">

            </div>
            <div class="small-12 columns">
              <iframe id="legacy-info" :src="iframeUrl" > </iframe>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script src="./legacyinfo.ctrl.js" lang="babel"></script>
