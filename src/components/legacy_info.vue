<template>
  <div class="legacy-form-holder">
    <div class="pop-overlay"></div>
    <div class="pop-content">
      <div class="form-header">
        <a class="btn-close" @click="closeLegacy()" title="close"><i class="fa fa-times-circle"></i></a>
      </div>

      <div class="p-3">
        <div class="legacy-heading">
          <h1 class="pop-heading">Request a Device or Accessory</h1>
          <a @click="backLegacy()" class="button pop-close"><i class="fa fa-arrow-left"></i>Back</a>
        </div>
        <hr class="hr-cln">
        <div class="iframe-wrapper">
          <iframe id="legacy-info" :src="iframeUrl"></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./legacy_info.ctrl.js" lang="babel"></script>
