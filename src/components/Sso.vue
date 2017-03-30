<template>
    <div v-if="$store.getters['error/hasError']">
        <div class="is-error callout" data-closable>
            <h5>{{ $store.getters['error/error'] }}</h5>
  </div>
</div>
</template>

<script>

    export default {
        name: "Sso",
        beforeCreate () {
            let id = this.$route.params.id;
            this.$store.dispatch('error/clearAll')
            this.$store.dispatch('auth/singleSignOn', {router: this.$router, id: id})
        }
}
</script>
