<template>
  <div class="legacy-form-holder">
    <div class="pop-overlay"></div>
    <div class="pop-content">
      <div class="form-header">
        <a class="btn-close" @click="closeLegacy()" title="close"><i class="fa fa-times-circle"> </i> </a>
      </div>

      <div class="expanded row">
        <div class="columns large-12 legacy-heading">
          <h1 class="pop-heading">  Request a Device or Accessory </h1>
          <a @click="backLegacy()" class="button  pop-close" > <i class="fa fa-arrow-left"> </i> Back </a>

          <hr class="hr-cln">

        </div>
        <div class="columns large-12 iframe-wrapper">
          <iframe id="legacy-info" :src="iframeUrl"> </iframe>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./legacyinfo.ctrl.js" lang="babel"></script>
