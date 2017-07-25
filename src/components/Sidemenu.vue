<template>
  <section class="menu-left ">
    <ul id="menu" class="sidebar-menu">
      <li class="menu-toggle">
        <a href="javascript:;" class="icon-close"><i class="fa fa-bars"></i></a>
      </li>

      <li class="menu-title active ">
        <router-link to="/dashboard">
          <i class="fa fa-dashboard"></i> <span>Dashboard</span>
        </router-link>
      </li>

      <li class="treeview">
        <a href="#">
          <i class="fa fa-bar-chart"></i>
          <span>Reports</span>
          <i class="fa fa-plus pull-right"></i>
          <i class="fa fa-minus pull-right"></i>
        </a>
        <ul class="treeview-menu">
          <template v-if="showMobility">
            <li class="">
              <a :href="'https://preprodn02.mymobilitycentral.com/oauth/v1/auth.agi?ssoUrlMarker=wasso&access_token=' + redirectScopeToken">
                <i class="fa fa-circle-o"></i> Mobility Central</a>
            </li>
          </template>
          <template v-else>
            <li class="redirect-link">
              <a href="javascript:;" :data-href="legacyLink +'/report_allocation.asp?token='">
                <i class="fa fa-circle-o"></i> Charge</a>
            </li>

            <li class="redirect-link">
              <a href="javascript:;" :data-href="legacyLink +'/dashboard_top_ten.asp?token='">
                <i class="fa fa-circle-o"></i> Top 10 Reports</a>
            </li>

            <li class="redirect-link">
              <a href="javascript:;" :data-href="legacyLink +'/report_zero_usage.asp?token='">
                <i class="fa fa-circle-o"></i> Zero Usage</a>
            </li>

            <li class="redirect-link">
              <a href="javascript:;" :data-href="legacyLink + '/dashboard_trend.asp?token='">
                <i class="fa fa-circle-o"></i> Trends</a>
            </li>

            <li class="redirect-link">
              <a href="javascript:;" :data-href="legacyLink +'/report_usage.asp?token='">
                <i class="fa fa-circle-o"></i> Usage</a>
            </li>

            <li class="redirect-link">
              <a href="javascript:;" :data-href="legacyLink +'/report_international.asp?token='">
                <i class="fa fa-circle-o"></i> International</a>
            </li>

            <li class="redirect-link">
              <a href="javascript:;" :data-href="legacyLink + '/report_ap.asp?token='">
                <i class="fa fa-circle-o"></i> Intercompany Charge</a>
            </li>
          </template>
        </ul>
      </li>

      <li class="treeview" v-if="ScopeHelper.hasPermissionOnGroup($store.state.auth.profile.roles[0], 'inventory')">
        <a href="javascript:;" name="inventory">
          <i class="fa fa-list-alt"></i>
          <span>Inventory</span>
          <i class="fa fa-plus pull-right"></i>
          <i class="fa fa-minus pull-right"></i>
        </a>
        <ul class="treeview-menu">
          <li class="page-link"
              v-if="ScopeHelper.hasPermissionOnFeature($store.state.auth.profile.roles[0], 'manage_devices')">
            <!-- <a class="admin" name="Devices" href="/devices"><i class="fa fa-circle-o"></i>Equipment</a> -->
            <router-link to="/devices" name="device"><i class="fa fa-circle-o"></i>Equipment</router-link>
          </li>

          <li class="page-link"
              v-if="ScopeHelper.hasPermissionOnFeature($store.state.auth.profile.roles[0], 'manage_presets')">
            <!-- <a class="admin" name="presets" href="/presets"><i class="fa fa-circle-o"></i>Equipment Groups</a> -->
            <router-link to="/presets" name="preset"><i class="fa fa-circle-o"></i>Equipment Groups</router-link>
          </li>

          <li class="page-link"
              v-if="ScopeHelper.hasPermissionOnFeature($store.state.auth.profile.roles[0], 'manage_services')">
            <!-- <a class="admin" name="services" href="/services"><i class="fa fa-circle-o"></i>Services & Plans</a> -->
            <router-link to="/services" name="service"><i class="fa fa-circle-o"></i>Services & Plans</router-link>
          </li>

          <li class="page-link"
              v-if="ScopeHelper.hasPermissionOnFeature($store.state.auth.profile.roles[0], 'manage_employees')">
            <!-- <a name="employees" href="/employees"><i class="fa fa-circle-o"></i>Employees</a> -->
            <router-link to="/employees" name="employee"><i class="fa fa-circle-o"></i>Employees</router-link>
          </li>

          <li class="page-link"
              v-if="ScopeHelper.hasPermissionOnFeature($store.state.auth.profile.roles[0], 'manage_companies')">
            <!-- <a name="companies" href="/companies"><i class="fa fa-circle-o"></i>Companies</a> -->
            <router-link to="/companies" name="company"><i class="fa fa-circle-o"></i>Companies</router-link>
          </li>

          <li class="page-link"
              v-if="ScopeHelper.hasPermissionOnFeature($store.state.auth.profile.roles[0], 'manage_companies')">
            <router-link to="/orders" name="orders"><i class="fa fa-circle-o"></i>Orders</router-link>
          </li>
        </ul>
      </li>

      <li class="treeview" v-if="ScopeHelper.hasPermissionOnGroup($store.state.auth.profile.roles[0], 'product')">
        <a href="javascript:;" name="product">
          <i class="fa fa-th-large"></i>
          <span>Packages</span>
          <i class="fa fa-plus pull-right"></i>
          <i class="fa fa-minus pull-right"></i>
        </a>
        <ul class="treeview-menu">
          <li class="page-link">
            <router-link to="/packages" name="package">
              <i class="fa fa-circle-o"></i>View All Packages</router-link>
          </li>
          <li class="page-link">
            <router-link to="/packages/new" name="package-new">
              <i class="fa fa-circle-o"></i>Create a Package
            </router-link>
          </li>
        </ul>
      </li>

      <li class="treeview" v-if="ScopeHelper.hasPermissionOnGroup($store.state.auth.profile.roles[0], 'setting')">
        <a href="javascript:;" name="configuration">
          <i class="fa fa-tasks"></i>
          <span>Configuration</span>
          <i class="fa fa-plus pull-right"></i>
          <i class="fa fa-minus pull-right"></i>
        </a>
        <ul class="treeview-menu">
          <li class="page-link">
            <a name="portal" href="javascript:;"><i class="fa fa-circle-o"></i>Portal</a>
          </li>
        </ul>
      </li>

      <li class="treeview">
        <a class="open-support" href="javascript:;" name="get-support" @click="openSupportTicket()">
          <i class="fa fa-phone"></i>
          <span>Get Support</span>
        </a>
      </li>
    </ul>

    <div class="nav-poweredby">
      <span class="text-copyright">Powered By</span>
      <img class="img-full" src="./../assets/wa-logo.png" alt="Wireless Analytics">
      <img class="img-collapse" src="./../assets/logo.png" alt="Wireless Analytics">
    </div>
  </section>
</template>

<script>
  import Vue from 'vue'
  import _ from 'lodash'
  import swal from 'sweetalert2'
  import { Log, ScopeHelper } from './../helpers'
  import supportRequest from './support-request'
  import companyAPI from './../api/company-api'
  import authAPI from './../api/auth-api'

  const {Store} = require('yayson')()
  const store = new Store()

  // import Permision from './permisions'
  // Vue.directive('permission', {
  //   update: function (el, value) {
  //     if (Permision.hasPerm(value) == false) {
  //       el.style.display = 'none'
  //     }
  //     else {
  //       el.style.display = 'block'
  //     }
  //   }
  // })

  export default {
    name: "Sidemenu",

    data () {
      return {
        features: features,
        legacyLink: process.env.LEGACY_URL + '/helpdesk/udl',
        redirectScopeToken: '',
        showMobility: false
      }
    },

    computed: {
      ScopeHelper () {
        return ScopeHelper
      }
    },

    created () {
      let _params =  {
        name: 'redirct_scope',
        scopes: [ 'get_user_me', 'get_companies', 'get_globalsettings']
      }
      authAPI.scopeToken(_params, res => {
        if (res.status == 200) {
          this.redirectScopeToken = res.data.accessToken
        } else {
          console.log('scope_token res', res)
        }
      }, err => {
        console.log('scope_token err', err)
      })

      _params = {
        params: {
          include: 'globalsettingvalues.globalsettings'
        }
      }
      companyAPI.get(this.$store.state.auth.profile.companyId, _params, res => {
        let event = store.sync(res.data)
        let test = event.globalsettingvalues

        let globalSettingId = _.filter(test, {'globalSettingId': 6, 'name': 'enable'})
        if (_.isEmpty(globalSettingId)) {
          return false
        } else {
          if (globalSettingId[0].globalsettings[0].name === "mobility_central_login") {
            this.$set(this, 'showMobility', true)
          }
        }
      }, err => Log.put('dashboard/created client info err', err))
    },

    mounted () {
      var intervalId = setInterval(function () {
        var token = JSON.parse(localStorage.getItem("token")).access_token;
        var id = localStorage.userId;

        $('.redirect-link a').attr('data-href', function (index, href) {
          var param = token + '&version=v4'
          if (href.charAt(href.length - 1) === '?') //Very unlikely
            return href + param
          else if (href.indexOf('?') > 0)
            return href + param
          else
            return href + '?' + param
        })

        if (token !== undefined) {
          clearInterval(intervalId)
        }
      }, 2000)

      $('.redirect-link a').each(function () {
        $(this).click(function (e) {
          var newWindow = $(this).data('href');
          swal({
            title: 'Thank You!',
            text: 'You will now be redirected...',
            timer: 2500,
            type: 'success',
            showCancelButton: false,
            showConfirmButton: false,
          }).then(
            function () {
            },
            // handling the promise rejection
            function (dismiss) {
              if (dismiss === 'timer') {
                /*window.open(newWindow,'_blank')*/
                var newLink = document.createElement('a');
                newLink.href = newWindow;
                newLink.setAttribute('target', '_blank');
                newLink.click();
              }
            }
          )
        })
      })

      $.sidebarMenu = function (menu) {
        var animationSpeed = 300;
        $(menu).on('click', 'li a', function (e) {
          var $this = $(this);
          var checkElement = $this.next();
          if (checkElement.is('.treeview-menu') && checkElement.is(':visible')) {
            checkElement.slideUp(animationSpeed, function () {
              checkElement.removeClass('menu-open');
            });
            checkElement.parent("li").removeClass("active");
          }
          // if the menu is not visible
          else if ((checkElement.is('.treeview-menu')) && (!checkElement.is(':visible'))) {
            // get the parent menu
            var parent = $this.parents('ul').first();
            // close all open menus within the parent
            var ul = parent.find('ul:visible').slideUp(animationSpeed);
            // remove the menu-open class from the parent
            ul.removeClass('menu-open');
            // get the parent li
            var parent_li = $this.parent("li");
            // open the target menu and add the menu-open class
            checkElement.slideDown(animationSpeed, function () {
              // add the class active to the parent li
              checkElement.addClass('menu-open');
              parent.find('li.active').removeClass('active');
              parent_li.addClass('active');
            });
          }

          // if this isn't a link, prevent the page from being redirected
          if (checkElement.is('.treeview-menu')) {
            e.preventDefault();
          }
        });
      }

      $(".icon-close").click(function () {
        if ($(".menu-left").hasClass("test") == true) {
          $(".menu-left").removeClass("test");
          $(".content-right").removeClass("test");
        } else {
          $(".menu-left").addClass("test");
          $(".content-right").addClass("test");
        }
      });

      $('.treeview-menu > li > a').each(function () {
        $(this).click(function (e) {
          // Log.put('.treeview-menu > li > a', e)
          e.stopPropagation();
          $('#menu .page-link.active').removeClass('active')
          $('#menu .page-link a.active').removeClass('active')
          $(this).parent().addClass('active');
          $(this).addClass('active');
        });
      });

      $('.menu-title').click(function (e) {
        Log.put('sidemneu/menu-title click', e)
        /*   e.stopPropagation();*/
        $(this).parent().toggleClass('active');
      });

      $.sidebarMenu($('#menu'));
      $('#menu').slicknav({prependTo: 'section.top-bar-section'});
      setTimeout(supportRequest, 100);
      $(this.$el).foundation();
    },

    methods: {
      openSupportTicket: function () {
        $('.support-form-holder').show();
        heap.track('Support Ticket Opened', {'clicked': 'yes'});
      }
    }
  }
</script>