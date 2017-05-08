<template>
  <div class="p-l-20 p-r-20">
    <component v-bind:is="currentView">
    <!-- component changes when vm.currentView changes! -->
    </component>
  </div>
</template>
<script  src="./placeorder.crtl.js" lang="babel"></script>
