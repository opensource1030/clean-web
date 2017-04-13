import Breadcrumb from 'vue-bulma-breadcrumb'
import Vue from 'vue'
module.exports = {
  template: `<nav class="level app-levelbar">
      <div class="level-left">
        <div class="level-item">
          <h3 class="subtitle is-5">
            <strong>{{ name }}</strong>
          </h3>
        </div>
      </div>
      <div class="level-right is-hidden-mobile">
        <breadcrumb :list="list"></breadcrumb>
      </div>
    </nav>`,

  components:{
    Breadcrumb
  },
  computed: {
    name() {
      return this.$route.name
    },
    list() {
      // console.log('matched', this.$route.matched)
      return this.$route.matched
    },
  }
};
