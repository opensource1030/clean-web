<template>
  <div class="sso_mobile">
    <p>Successfully Authenticated!</p>
    <button class="button" @click="redirectApp()">Continue</button>
  </div>
</template>

<script>
  export default {
    name: "SsoMobile",
    methods: {
      redirectApp: function () {
        window.location.href = "com.waapp://sso?uuid=" + this.$route.params.id;
      }
    }
  }
</script>

<style>
.sso_mobile {
  margin-top: 50px;
  text-align: center;
}
</style>
