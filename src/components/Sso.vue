<template>
    <div v-if="$store.getters['error/hasError']">
        <div class="fixed-top">
            <b-alert show variant="danger">{{ $store.getters['error/error'] }}</b-alert>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Sso',
    beforeCreate () {
        let id = this.$route.params.id;
        this.$store.dispatch('error/clearAll')
        this.$store.dispatch('auth/singleSignOn', {router: this.$router, id: id})
    }
}
</script>
