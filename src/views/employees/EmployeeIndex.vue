<template>
    <div>
        <modal v-if="$store.getters['error/hasError']" @close="$store.dispatch('error/clearAll')">
        <h3 slot="body">{{ $store.getters['error/error'] }}</h3>
        </modal>

        <router-link to="" class="btn btn-dark">Add Employee</router-link>

        
    </div>
</template>

<script src="./employee.index.ctrl.js" lang="babel"></script>