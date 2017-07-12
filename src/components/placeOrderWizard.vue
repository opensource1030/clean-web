<template>
  <div class="step-container">
    <div class="row expanded step-wizard">
      <div class="columns small-4 text-center each-step">
        <p>{{ step1Name }}</p>
        <span class="status" :class="{ active: activeStep >= 1 }">
        <i class="fa" :class="{ 'fa-check': activeStep > 1 }"></i>
      </span>
      </div>
      <div class="columns small-4 text-center each-step">
        <p>{{ step2Name }}</p>
        <span class="status" :class="{ active: activeStep >= 2 }">
        <i class="fa" :class="{ 'fa-check': activeStep > 2 }"></i>
      </span>
      </div>
      <div class="columns small-4 text-center each-step">
        <p>{{ step3Name }}</p>
        <span class="status" :class="{ active: activeStep >= 3 }">
        <i class="fa" :class="{ 'fa-check': activeStep > 3 }"></i>
      </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    activeStep: {
      type: Number,
      required: true
    },

    step1Name: {
      type: String,
      default: 'Select Package'
    },

    step2Name: {
      type: String,
      default: 'Select Device'
    },

    step3Name: {
      type: String,
      default: 'Review'
    },
  }
}
</script>
