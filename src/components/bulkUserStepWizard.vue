<template>
  <div class="row expanded step-wizard">
    <div class="columns small-3 text-center each-step">
      <p>Upload</p>
      <span class="status" :class="{ active: activeStep >= 1 }">
        <i class="fa" :class="{ 'fa-check': activeStep > 1}"></i>
      </span>
    </div>
    <div class="columns small-3 text-center each-step">
      <p>Map UDLs</p>
      <span class="status" :class="{ active: activeStep >= 2 }">
        <i class="fa" :class="{ 'fa-check': activeStep > 2}"></i>
      </span>
    </div>
    <div class="columns small-3 text-center each-step">
      <p>Map Fields</p>
      <span class="status" :class="{ active: activeStep >= 3 }">
        <i class="fa" :class="{ 'fa-check': activeStep > 3}"></i>
      </span>
    </div>
    <div class="columns small-3 text-center each-step">
      <p>Review</p>
      <span class="status" :class="{ active: activeStep >= 4 }">
        <i class="fa" :class="{ 'fa-check': activeStep > 4}"></i>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'bulkUserStepWizard',
    props: {
      activeStep: {
        type: Number,
        required: true
      }
    }
  }
</script>
