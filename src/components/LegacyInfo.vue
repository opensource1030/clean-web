
<template>
  <div>
  <transition name="fade">
  <div class="callout spent-info" v-bind:class="{ active: isActive, 'visible': popOver }">
    <div class="pop-content" v-if="token">
        <div class="expanded row">
          <div class="columns large-12">
              <router-link class="button btn-orange pop-close" :to="{ name: 'dashboard'}" replace> <i class="fa fa-arrow-left"> </i> </router-link>

            <hr class="hr-cln">

          </div>
          <div class="small-12 columns">
            <iframe  id="legacy-info" :src="iframeUrl" > </iframe>
          </div>
        </div>
      </div>
</div>
</transition>
    </div>
</template>
<script src="./legacyinfo.ctrl.js" lang="babel"></script>
