<template>
  <div class="row expanded step-wizard">
    <div class="columns small-4 text-center each-step">
      <p>Select Package</p>
      <span class="status" :class="{ active: activeStep >= 1 }">
        <i class="fa" :class="{ 'fa-check': activeStep > 1}"></i>
      </span>
    </div>
    <div class="columns small-4 text-center each-step">
      <p>Select Device</p>
      <span class="status" :class="{ active: activeStep >= 2 }">
        <i class="fa" :class="{ 'fa-check': activeStep > 2}"></i>
      </span>
    </div>
    <div class="columns small-4 text-center each-step">
      <p>Review</p>
      <span class="status" :class="{ active: activeStep >= 3 }">
        <i class="fa" :class="{ 'fa-check': activeStep > 3}"></i>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name:'placeOrderWizard',
  props: {
    activeStep: {
        type: Number,
        required: true
    }
  }
}
</script>
