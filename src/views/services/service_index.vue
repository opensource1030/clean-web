<template>
  <div class="page service-page service-edit-page">

    <spinner v-if="isLoading" />

    <div v-else>
      <div>
        <router-link to="/services/new" class="btn btn-lg add-button">New Service</router-link>
      </div>

    </div>
  </div>
</template>

<script src="./service_index.ctrl.js" lang="babel"></script>
