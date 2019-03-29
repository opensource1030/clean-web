<template>
  <div class="app">
    <AppHeader fixed>
      <SidebarToggler class="d-lg-none" display="md" mobile />
      <b-link class="navbar-brand" to="#">
        <img class="navbar-brand-full" src="img/brand/logo.svg" width="89" height="25" alt="CoreUI Logo">
        <img class="navbar-brand-minimized" src="img/brand/sygnet.svg" width="30" height="30" alt="CoreUI Logo">
      </b-link>
      <SidebarToggler class="d-md-down-none" display="lg" />
      <b-navbar-nav class="ml-auto">
        <b-nav-item class="d-md-down-none">
          <i class="icon-bell"></i>
          <b-badge pill variant="danger">5</b-badge>
        </b-nav-item>
            <DefaultHeaderDropdownAccnt/>
        
      </b-navbar-nav>
      <!--<AsideToggler class="d-lg-none" mobile />-->
    </AppHeader>
    <div class="app-body">
      <AppSidebar fixed>
        <SidebarHeader/>
        <SidebarForm/>
        <SidebarNav v-if="ScopeHelper.hasAdminRole(this.$store.state.auth.profile.roles[0])" :navItems="nav">
        </SidebarNav>
        <SidebarNav v-else :navItems="normal_nav">
        </SidebarNav>
        <SidebarFooter>
          <div class="nav-poweredby">
            <span class="text-copyright">Powered By</span>
            <img class="img-full" src="./../assets/wa-logo.png" alt="Wireless Analytics">
          </div>
        </SidebarFooter>
        <SidebarMinimizer/>
      </AppSidebar>
      <main class="main">
        <Breadcrumb :list="list"/>
        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </main>
    </div>
    <SupportRequest />
    <TheFooter>
      <!--footer-->
      <div class="footer_div">
        	<div id="footer">&copy; {{ new Date().getFullYear() }} <a href="http://wirelessanalytics.com">Wireless Analytics, LLC. </a><span>Made with <i class="fa fa-heart text-orange"></i> from Danvers, Massachusetts, USA</span></div>
      </div>
    </TheFooter>
  </div>
</template>

<script>
//import nav from '@/_nav'
  import nav from './../_nav_super'
  import normal_nav from './../_nav_normal'
  import { Header as AppHeader, SidebarToggler, Sidebar as AppSidebar, SidebarFooter, SidebarForm, SidebarHeader, SidebarMinimizer, SidebarNav, Aside as AppAside, AsideToggler, Footer as TheFooter, Breadcrumb } from '@coreui/vue'
  import DefaultHeaderDropdownAccnt from './DefaultHeaderDropdownAccnt'
  import _ from 'lodash'
  import {Storage, Utils, Log, ScopeHelper } from './../helpers'
  import authAPI from './../api/auth-api'
  import SupportRequest from '../components/SupportRequest.vue'

  //import store from './../store'
  //const {Store} = require('yayson')()
  //const store = new Store()

  console.log(ScopeHelper)
  //console.log(ScopeHelper.hasAdminRole(this.$store.state.auth.profile.roles[0]))
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
  data () {
    return {
      nav: nav.items,
      normal_nav: normal_nav.items,
      legacyLink: process.env.LEGACY_URL + '/app/helpdesk/udl',

      //showLegacy: false,

    }
  },
  computed: {
    name () {
      return this.$route.name
    },
    list () {
      return this.$route.matched.filter((route) => route.name || route.meta.label )
    },
    ScopeHelper () {
      return ScopeHelper
    }
  },
  
  created () {
    /*let _params =  {
        name: 'redirct_scope',
        scopes: [ 'get_user_me', 'get_companies', 'get_globalsettings']
      };
      authAPI.scopeToken(_params, res => {
        if (res.status == 200) {
          this.redirectScopeToken = res.data.accessToken
        } else {
          console.log('scope_token res', res)
        }
      }, err => {
        console.log('scope_token err', err)
      });

      _params = {
        params: {
          include: 'globalsettingvalues.globalsettings'
        }
      };

      let profile = Utils.parseJsonString(Storage.get('profile'));
      _.indexOf(this.advancedAnalytics1, profile.companies[0].shortName) >= 0 ? this.showAv1 = true : null;
      _.indexOf(this.advancedAnalytics2, profile.companies[0].shortName) >= 0 ? this.showAv2 = true : null;
      this.showLegacy = true;
      */
  },

  

  mounted () {

  }
}

</script>

<style lang="scss">
.nav-poweredby{
  border-top: 1px solid rgba(204, 204, 204, 0.12);
  text-align: center;
  left: 0;
  bottom: 72px;
  padding: 2px 0 10px;
  width: 100%;
  position: absolute;

  z-index: 999;
  .text-copyright{
    float: left;
    font-size: 10px;
    font-weight: 700;
    margin-left: 12px;
    margin-right: 13px;
    margin-top: 10px;
    text-transform: uppercase;
  }
  .img-full{
    float: left;
    margin-top: 3px;
    max-width: 50%;
    padding-top: 5px;
    
  }
  .img-collapse{
    margin: 0 auto;
    max-width: 74%;
    display: none;
  }
}
.footer_div{
  margin: auto;
}

</style>
