<template>
  <router-view></router-view>
</template>

<script>
import _ from 'lodash'
import Flagger from 'flagger'

export default {
  name: 'app',

  data() {
    return {
      feature_interval: null,
    }
  },

  methods: {
    pollingFeatures() {
      if (this.$store.getters['auth/isAuthenticated']) {
        const profile = this.$store.getters['auth/getProfile']
        const company = _.get(profile, 'companies[0]', { id: '', name: '' })
        const user = {
          type: 'User',
          id: profile.id,
          displayName: profile.username || profile.email,
          attributes: {
            email: profile.email,
            company_id: company.id,
            company_name: company.name
          }
        }

        // const place_order_eanbled = Flagger.flag('placeorderlegacy').isEnabled(user)
        // const place_order_value = flag.getTreatment(user)
        // if (this.$store.state.feature.enabled_package != place_order_eanbled) {
        //   console.log('place_order_legacy', place_order_eanbled)
        //   this.$store.dispatch('feature/setFlag', { enabled_package: place_order_eanbled })
        // }

        const place_order_eanbled = Flagger.flag('placeorderlegacy').isEnabled(user)
        if (this.$store.state.feature.enabled_place_order != place_order_eanbled) {
          console.log('place_order_legacy', place_order_eanbled)
          this.$store.dispatch('feature/setEnabledPlaceOrder', place_order_eanbled)
        }

        const equipment_eanbled = Flagger.flag('procurement-equipment-mgt').isEnabled(user)
        if (this.$store.state.feature.enabled_equipment != equipment_eanbled) {
          console.log('procurement-equipment-mgt', equipment_eanbled)
          this.$store.dispatch('feature/setEnabledEquipment', equipment_eanbled)
        }

        const service_enabled = Flagger.flag('procurement-service-mgt').isEnabled(user)
        if (this.$store.state.feature.enabled_service != service_enabled) {
          console.log('procurement-service-mgt', service_enabled)
          this.$store.dispatch('feature/setFlag', { enabled_service: service_enabled })
        }

        const order_enabled = Flagger.flag('procurement-order-console').isEnabled(user)
        if (this.$store.state.feature.enabled_order != order_enabled) {
          console.log('procurement-order-console', order_enabled)
          this.$store.dispatch('feature/setFlag', { enabled_order: order_enabled })
        }

        const order_report_enabled = Flagger.flag('procurement-order-console-reports').isEnabled(user)
        if (this.$store.state.feature.enabled_order_report != order_report_enabled) {
          console.log('procurement-order-console-reports', order_report_enabled)
          this.$store.dispatch('feature/setFlag', { enabled_order_report: order_report_enabled })
        }

        const package_enabled = Flagger.flag('procurement-package-and-policy-management').isEnabled(user)
        if (this.$store.state.feature.enabled_package != package_enabled) {
          console.log('procurement-package-and-policy-management', package_enabled)
          this.$store.dispatch('feature/setFlag', { enabled_package: package_enabled })
        }

        const package_edit_enabled = Flagger.flag('procurement-package-and-policy-creation').isEnabled(user)
        if (this.$store.state.feature.enabled_package_edit != package_edit_enabled) {
          console.log('procurement-package-and-policy-creation', package_edit_enabled)
          this.$store.dispatch('feature/setFlag', { enabled_package_edit: package_edit_enabled })
        }

        const reports_next_gen = Flagger.flag('reports-next-gen').isEnabled(user)
        if (this.$store.state.feature.enabled_metric != reports_next_gen) {
          console.log('reports-next-gen', reports_next_gen)
          this.$store.dispatch('feature/setFlag', { enabled_metric: reports_next_gen })
        }
      }
    },

    watchFeatures() {
      const vm = this
      Flagger.configure({ envKey: process.env.AIRSHIP_KEY }).then(res => {
        console.log('Flagger connected')
        vm.feature_interval = setInterval(() => {
          vm.pollingFeatures()
        }, 5000)
      })
    },

    unwatchFeatures() {
      if (this.feature_interval) {
        clearInterval(this.feature_interval)
        this.feature_interval = null
      }
    }
  },

  created() {
    // console.log('app created')
    // console.log('features', features)
    // console.log('process.env', process.env)
    // this.watchFeatures()
  },

  beforeDestroy() {
    this.unwatchFeatures()
  }
}
</script>

<style lang="scss">
// CoreUI Icons Set
// @import '~@coreui/icons/css/coreui-icons.min.css';

/* Import Font Awesome Icons Set */
$fa-font-path: '~font-awesome/fonts/';
@import '~font-awesome/scss/font-awesome.scss';

/* Import Simple Line Icons Set */
// $simple-line-font-path: '~simple-line-icons/fonts/';
// @import '~simple-line-icons/scss/simple-line-icons.scss';

/* Import Flag Icons Set */
// @import '~flag-icon-css/css/flag-icon.min.css';

/* Import Bootstrap Vue Styles */
// @import '~bootstrap-vue/dist/bootstrap-vue.css';

// Import Main styles for this application
@import 'assets/scss/style';
</style>
