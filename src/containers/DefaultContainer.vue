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
      <SidebarToggler class="d-lg-none" display="md" mobile/>
      <SidebarToggler class="d-md-down-none" display="lg"/>
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
        <!-- <SidebarNav v-if="currentUser && ScopeHelper.hasAdminRole(currentUser.roles[0])" :navItems="nav"></SidebarNav> -->
        <!-- <SidebarNav v-else :navItems="normal_nav"></SidebarNav> -->
        <side-nav/>
        <SidebarFooter>
          <span class="text-copyright">Powered By</span>
          <img class="img-full" src="@/assets/images/wa-logo.png" alt="Wireless Analytics">
          <img class="img-collapse" src="@/assets/images/logo.png" alt="Wireless Analytics">
        </SidebarFooter>
      </AppSidebar>
      <main class="main">
        <!-- <Breadcrumb :list="list"/> -->
        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </main>
    </div>

    <!-- <SupportRequest v-if="$store.state.auth.show_ticket"/> -->
    <drawer
      :open="$store.state.auth.show_ticket"
      @close="toggleTicketDrawer()">
      <ticket-form></ticket-form>
    </drawer>

    <!--footer-->
    <TheFooter>
      <div class="footer">
        <span>&copy; {{ new Date().getFullYear() }}</span>
        <a href="http://wirelessanalytics.com">Wireless Analytics, LLC. </a>
        <span>Made with <i class="fa fa-heart text-orange"></i> from Danvers, Massachusetts, USA <span class="version">{{version}}</span> </span>
      </div>
    </TheFooter>
  </div>
</template>

<script>
  import _ from 'lodash'
  import { mapGetters } from 'vuex'
  import {
    Header as AppHeader,
    SidebarToggler,
    Sidebar as AppSidebar,
    SidebarFooter,
    SidebarForm,
    SidebarHeader,
    SidebarMinimizer,
    SidebarNav,
    Aside as AppAside,
    AsideToggler,
    Footer as TheFooter,
    Breadcrumb
  } from '@coreui/vue'
  import DefaultHeaderDropdownAccnt from './DefaultHeaderDropdownAccnt'
  import SideNav from './components/side_nav'
  // import SupportRequest from '@/components/SupportRequest'
  import Drawer from '@/components/drawer'
  import TicketForm from '@/components/ticket_form'
  import { Storage, Utils, Log, ScopeHelper } from '@/helpers'
  import authAPI from '@/api/auth-api'

  // const { Store } = require('yayson')()
  // const store = new Store()

  // console.log(ScopeHelper)
  // console.log(ScopeHelper.hasAdminRole(this.currentUser.roles[0]))
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
      SideNav,
      // SupportRequest
      Drawer,
      TicketForm
    },

    data() {
      return {
        // nav: nav.items,
        // normal_nav: normal_nav.items,
        version: process.env.VERSION,
      }
    },

    computed: {
      ...mapGetters({
        currentUser: "auth/getProfile",
      }),

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
        return list
      },

      ScopeHelper() {
        return ScopeHelper
      }
    },

    methods: {
      toggleTicketDrawer() {
        this.$store.commit('auth/setShowTicket', !this.$store.state.auth.show_ticket)
        // this.$store.commit('auth/setTicketIssue', '')
        // this.$store.commit('auth/setShowTicket', true)
      }
    },

    created() {
      if (this.currentUser.companies && this.currentUser.companies.length) {
        let cosmicdata = this.currentUser.companies[0].contents[0].content
        Log.put('DefaultContainer/created', cosmicdata)
        this.$store.dispatch('auth/loadCompany', cosmicdata)
      }
    },

    mounted() {
      $(document).keyup(function (e) {
        if ($('.support-form-holder').is(":visible") && e.keyCode == 27) {
          setTimeout(function () {
            $('.support-form-holder .btn-close').click()
          }, 200)
        } else if ($('.spent-info').hasClass('active') && e.keyCode == 27) {
          setTimeout(function () {
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
      heap.identify(this.currentUser.identification)
    }
  }
</script>

<style lang="scss">
</style>
