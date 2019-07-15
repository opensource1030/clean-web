<template>
  <nav class="sidebar-nav">
    <b-nav>
      <b-nav-item to="/dashboard">
        <i class="nav-icon fa fa-dashboard"></i>DASHBOARD
      </b-nav-item>
      <li class="nav-item">
        <div @click="show_report_submenu = !show_report_submenu" class="nav-link nav-dropdown-toggle">
          <i class="nav-icon fa fa-bar-chart"></i>REPORT
        </div>
        <div class="submenu-container">
          <ul v-show="show_report_submenu" class="submenu">
            <li><span @click="goExternalUrl('/report_allocation.asp')">Charge</span></li>
            <li><span @click="goExternalUrl('/dashboard_top_ten.asp')">Top 10 Reports</span></li>
            <li><span @click="goExternalUrl('/report_zero_usage.asp')">Zero Usage</span></li>
            <li><span @click="goExternalUrl('/report_usage.asp')">Usage</span></li>
            <li><span @click="goExternalUrl('/report_international.asp')">International</span></li>
          </ul>
        </div>
      </li>
      <li class="nav-item" v-if="$store.getters['feature/isInventoryEnabled']">
        <div @click="show_inventory_submenu = !show_inventory_submenu" class="nav-link nav-dropdown-toggle">
          <i class="nav-icon fa fa-list-alt"></i>INVENTORY
        </div>
        <div class="submenu-container">
          <ul v-show="show_inventory_submenu" class="submenu">
            <li v-if="$store.state.feature.enabled_equipment"><router-link to="/devices">Equipments</router-link></li>
            <!-- <li><router-link to="/presets">Equipment Groups</router-link></li>-->
            <li v-if="$store.state.feature.enabled_service"><router-link to="/services">Services & Plans</router-link></li>
            <!--<li><router-link to="/employees">Employees</router-link></li>
            <li><router-link to="/companies">Companies</router-link></li>
            <li><router-link to="/orders">Orders</router-link></li> -->
          </ul>
        </div>
      </li>
      <!-- <li class="nav-item">
        <div @click="show_package_submenu = !show_package_submenu" class="nav-link nav-dropdown-toggle">
          <i class="nav-icon fa fa-th-large"></i>PACKAGES
        </div>
        <div class="submenu-container">
          <ul v-show="show_package_submenu" class="submenu">
            <li><router-link to="/packages">View All Packages</router-link></li>
            <li><router-link to="/packages/new">Create a Package</router-link></li>
          </ul>
        </div>
      </li>
      <li class="nav-item">
        <div @click="show_config_submenu = !show_config_submenu" class="nav-link nav-dropdown-toggle">
          <i class="nav-icon fa fa-tasks"></i>CONFIGURATION
        </div>
        <div class="submenu-container">
          <ul v-show="show_config_submenu" class="submenu">
            <li><a name="portal" href="javascript:;">Portal</a></li>
          </ul>
        </div>
      </li> -->
      <b-nav-item @click="openSupport()">
        <i class="nav-icon fa fa-phone"></i>GET SUPPORT
      </b-nav-item>
    </b-nav>
  </nav>
</template>

<script>
export default {
  props: {},

  data() {
    return {
      legacyLink: process.env.LEGACY_URL + '/app/helpdesk/udl',
      show_report_submenu: false,
      show_inventory_submenu: false,
      show_package_submenu: false,
      show_config_submenu: false
    }
  },

  methods: {
    openSupport() {
      this.$store.commit('auth/setTicketIssue', '')
      this.$store.commit('auth/setShowTicket', true)
    },

    goExternalUrl(path) {
      const vm = this
      vm.$swal({
        title: 'Thank You!',
        text: 'You will now be redirected...',
        timer: 2500,
        type: 'success',
        showCancelButton: false,
        showConfirmButton: false,
      }).then((result) => {
        if (result.dismiss === 'timer') {
          const token = JSON.parse(localStorage.getItem('token')).access_token
          let new_url = vm.legacyLink + path + '?token=' + token + '&version=v4'
          let newLink = document.createElement('a')
          newLink.href = new_url
          newLink.setAttribute('target', '_blank')
          newLink.click()
        }
      })
    },
  },

  created() {}
}
</script>
