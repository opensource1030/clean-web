<template>
  <div>
    <modal v-if="$store.getters['error/hasError']" @close="$store.dispatch('error/clearAll')">
      <h3 slot="body">{{ $store.getters['error/error'] }}</h3>
    </modal>

    <router-link to="/devices/new" class="btn btn-dark">New Device</router-link>



  </div>
</template>
