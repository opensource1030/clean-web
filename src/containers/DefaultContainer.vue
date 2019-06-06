<template>
  <div class="app">
    <AppHeader fixed>
      <b-link class="navbar-brand" to="#">
        <img
           v-if="company.object"
          :src="_.get(company.object, 'metadata.logo.url', '')"
          alt="Company Logo"
          title="Client Logo" height="25"
        >
      </b-link>
      <SidebarToggler class="d-lg-none" display="md" mobile />
      <SidebarToggler class="d-md-down-none" display="lg" />
      <b-navbar-nav class="ml-auto">
        <b-nav-item>
          <div class="HW-container"></div>
        </b-nav-item>
        <DefaultHeaderDropdownAccnt/>
      </b-navbar-nav>
      <!--<AsideToggler class="d-lg-none" mobile />-->
    </AppHeader>

    <div class="app-body">
      <AppSidebar fixed>
        <SidebarMinimizer/>
        <SidebarHeader></SidebarHeader>
        <SidebarForm/>
        <SidebarNav v-if="this.$store.state.auth.profile && ScopeHelper.hasAdminRole(this.$store.state.auth.profile.roles[0])" :navItems="nav">
        </SidebarNav>
        <!-- <SidebarNav v-else :navItems="normal_nav"></SidebarNav> -->
        <nav class="sidebar-nav">
          <b-nav>
            <b-nav-item to="/dashboard">
              <i class="nav-icon fa fa-dashboard"></i>DASHBOARD
            </b-nav-item>
            <li class="nav-item">
              <div
                @click="show_report_submenu = !show_report_submenu"
                class="nav-link nav-dropdown-toggle"
              >
                <i class="nav-icon fa fa-bar-chart"></i>REPORTS
              </div>
              <div class="submenu-container">
                <ul
                  v-show="show_report_submenu"
                  class="submenu"
                >
                  <li>Change</li>
                  <li>Top 10 Reports</li>
                  <li>Zero Usage</li>
                  <li>Usage</li>
                  <li>International</li>
                </ul>
              </div>
            </li>
            <b-nav-item @click="openSupport()">
              <i class="nav-icon fa fa-phone"></i>GET SUPPORT
            </b-nav-item>
          </b-nav>
        </nav>
        <SidebarFooter>
          <span class="text-copyright">Powered By</span>
          <img class="img-full" src="@/assets/images/wa-logo.png" alt="Wireless Analytics">
          <img class="img-collapse" src="@/assets/images/logo.png" alt="Wireless Analytics">
        </SidebarFooter>
      </AppSidebar>
      <main class="main">
        <Breadcrumb :list="list"/>
        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </main>
    </div>

    <SupportRequest v-if="$store.state.auth.show_ticket" />

    <!--footer-->
    <TheFooter>
      <div class="footer">
        <span>&copy; {{ new Date().getFullYear() }}</span>
        <a href="http://wirelessanalytics.com">Wireless Analytics, LLC. </a>
        <span>Made with <i class="fa fa-heart text-orange"></i> from Danvers, Massachusetts, USA</span>
      </div>
    </TheFooter>
  </div>
</template>

<script>
import _ from 'lodash'
// import nav from '@/_nav'
import nav from '@/_nav_super'
import normal_nav from '@/_nav_normal'
import { Header as AppHeader, SidebarToggler, Sidebar as AppSidebar, SidebarFooter, SidebarForm, SidebarHeader, SidebarMinimizer, SidebarNav, Aside as AppAside, AsideToggler, Footer as TheFooter, Breadcrumb } from '@coreui/vue'
import DefaultHeaderDropdownAccnt from './DefaultHeaderDropdownAccnt'
import { Storage, Utils, Log, ScopeHelper } from '@/helpers'
import authAPI from '@/api/auth-api'
import SupportRequest from '@/components/SupportRequest.vue'

// import store from './../store'
// const {Store} = require('yayson')()
// const store = new Store()

// console.log(ScopeHelper)
// console.log(ScopeHelper.hasAdminRole(this.$store.state.auth.profile.roles[0]))
export default {
  name: 'DefaultContainer',

  components: {
    AsideToggler,
    AppHeader,
    AppSidebar,
    AppAside,
    TheFooter,
    Breadcrumb,
    DefaultHeaderDropdownAccnt,
    SidebarForm,
    SidebarFooter,
    SidebarToggler,
    SidebarHeader,
    SidebarNav,
    SidebarMinimizer,
    SupportRequest
  },

  data() {
    return {
      nav: nav.items,
      normal_nav: normal_nav.items,
      // legacyLink: process.env.LEGACY_URL + '/app/helpdesk/udl',
      legacyLink: '/app/helpdesk/udl',
      show_report_submenu: false,
      // showLegacy: false,
    }
  },

  computed: {
    _() {
      return _
    },

    name() {
      return this.$route.name
    },

    company() {
      return this.$store.state.auth.company
    },

    list() {
      const list = this.$route.matched.filter((route) => (route.name || route.meta.label))
      console.log('breadcrumb', list)
      return list
    },

    ScopeHelper() {
      return ScopeHelper
    }
  },

  methods: {
    openSupport() {
      this.$store.commit('auth/setTicketIssue', '')
      this.$store.commit('auth/setShowTicket', true)
    },
  },

  created() {
    let profile = Utils.parseJsonString(Storage.get('profile'))
    if (profile.companies && profile.companies.length) {
      let cosmicdata = profile.companies[0].contents[0].content
      Log.put('DefaultContainer/created', cosmicdata)
      this.$store.dispatch('auth/loadCompany', cosmicdata)
    }
  },

  mounted() {
    $(document).keyup(function (e) {
      if ($('.support-form-holder').is(":visible") && e.keyCode == 27) {
        setTimeout(function() {
          $('.support-form-holder .btn-close').click()
        }, 200)
      } else if ($('.spent-info').hasClass('active') && e.keyCode == 27) {
        setTimeout(function() {
          history.back()
        }, 200)
      }
    })

    let config = {
      selector: '.HW-container',
      account: 'JPYPKy',
      enabled: true
    }
    Headway.init(config)
    heap.identify(this.$store.state.auth.profile.identification)
  }
}
</script>

<style lang="scss">
</style>
