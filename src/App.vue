<template>
  <router-view></router-view>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import _ from "lodash";
import Flagger from "flagger";
import { SplitFactory } from "@splitsoftware/splitio";

const isTreatmentEnabled = treatment => treatment === "on";

export default {
  name: "app",

  data() {
    return {
      feature_interval: null
    };
  },

  computed: {
    ...mapGetters({
      isAuthenticated: "auth/isAuthenticated",
      profile: "auth/getProfile"
    })
  },

  methods: {
    ...mapActions({
      setFlag: "feature/setFlag"
    }),

    pollingFeatures(client) {
      if (this.isAuthenticated) {
        const splitFeatureMaps = {
          "place-order-legacy": "enabled_place_order",
          "procurement-equipment-mgt": "enabled_equipment",
          "procurement-service-mgt": "enabled_service",
          "procurement-order-console": "enabled_order",
          "procurement-order-console-reports": "enabled_order_report",
          "procurement-package-and-policy-management": "enabled_package",
          "procurement-package-and-policy-creation": "enabled_package_edit",
          "procurement-upgrade-a-device": "enabled_upgrade_device",
          "reports-next-gen": "enabled_metric",
          "dashboard-nextgen": "enabled_dashboard_nextgen",
          "dashboard-legacy": "enabled_dashboard_legacy",
          "dashboard-report-view": "enabled_dashboard_report_view",
          "dashboard-procure-new-line": "enabled_dashboard_procure_new_line",
          "dashboard-procure-transfer": "enabled_dashboard_procure_transfer",
          "dashboard-procure-accessories":
            "enabled_dashboard_procure_accessories",
          "dashboard-procure-new-device":
            "enabled_dashboard_procure_new_device",
          "dashboard-report-details": "enabled_dashboard_report_details",
          "dashboard-impersonate-upgrade": "enabled_impersonate_upgrade"
        };

        const splitNames = Object.keys(splitFeatureMaps);

        const attributes = {
          companyName: _.get(this.profile, "companies.0.name"),
          email: this.profile.email
        };

        const treatments = client.getTreatments(splitNames, attributes);

        console.log(treatments);

        splitNames.forEach(splitName => {
          this.setFlag({
            [splitFeatureMaps[splitName]]: isTreatmentEnabled(
              treatments[splitName]
            )
          });
        });
      }
    },

    watchFeatures() {
      const vm = this;

      const factory = SplitFactory({
        core: {
          authorizationKey: process.env.SPLITIO_API_KEY,
          key: process.env.SPLITIO_CUSTOMER_ID
        },
        startup: {
          readyTimeout: 1.5
        }
      });

      const client = factory.client();

      client.on(client.Event.SDK_READY, function() {
        vm.feature_interval = setInterval(() => {
          vm.pollingFeatures(client);
        }, 10000);
      });
    },

    unwatchFeatures() {
      if (this.feature_interval) {
        clearInterval(this.feature_interval);
        this.feature_interval = null;
      }
    }
  },

  created() {
    this.watchFeatures();
  },

  beforeDestroy() {
    this.unwatchFeatures();
  }
};
</script>

<style lang="scss">
// CoreUI Icons Set
// @import '~@coreui/icons/css/coreui-icons.min.css';

/* Import Font Awesome Icons Set */
$fa-font-path: "~font-awesome/fonts/";
@import "~font-awesome/scss/font-awesome.scss";

/* Import Simple Line Icons Set */
// $simple-line-font-path: '~simple-line-icons/fonts/';
// @import '~simple-line-icons/scss/simple-line-icons.scss';

/* Import Flag Icons Set */
// @import '~flag-icon-css/css/flag-icon.min.css';

/* Import Bootstrap Vue Styles */
// @import '~bootstrap-vue/dist/bootstrap-vue.css';

// Import Main styles for this application
@import "assets/scss/style";
</style>
