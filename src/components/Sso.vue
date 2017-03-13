<template>
<div v-if="error" v-show="error">
    <div class="is-error callout" data-closable>
        <h5>{{error}}</h5>
  </div>
</div>
</template>

<script>
import auth from './../api/auth';
export default {
    name: "Sso",

    data () {
        return {
            error: ''
        }
    },

    created () {
    var id = this.$route.params.id;
    auth.singleSignOn(this,id,'dashboard');
    }
}
</script>
