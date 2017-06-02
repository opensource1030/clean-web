<template>
  <section class="menu-left ">
    <ul id="menu" class="sidebar-menu">
      <li class="menu-toggle">
        <a class="icon-close"><i class="fa fa-bars"></i></a>
      </li>
      <li class="menu-title">
        <a href="/dashboard">
          <i class="fa fa-dashboard"></i> <span>Dashboard</span>
        </a>
      </li>
      <li class="treeview">
        <a href="#">
          <i class="fa fa-bar-chart"></i>
          <span>Reports</span>
          <i class="fa fa-plus pull-right"></i>
          <i class="fa fa-minus pull-right"></i>
        </a>
        <ul class="treeview-menu">
          <li class="redirect-link">
            <a target="_blank" :href="legacyLink +'/report_allocation.asp?token='"><i class="fa fa-circle-o"></i> Charge</a>
          </li>

          <li class="redirect-link">
            <a target="_blank" :href="legacyLink +'/dashboard_top_ten.asp?token='"><i class="fa fa-circle-o"></i> Top 10 Reports</a>
          </li>

          <li class="redirect-link">
            <a target="_blank" :href="legacyLink +'/report_zero_usage.asp?token='"><i class="fa fa-circle-o"></i> Zero Usage</a>
          </li>

          <li class="redirect-link">
            <a target="_blank" :href="legacyLink + '/dashboard_trend.asp?token='"><i class="fa fa-circle-o"></i> Trends</a>
          </li>

          <li class="redirect-link">
            <a target="_blank" :href="legacyLink +'/report_usage.asp?token='"><i class="fa fa-circle-o"></i> Usage</a>
          </li>

          <li class="redirect-link">
            <a target="_blank" :href="legacyLink +'/report_international.asp?token='"><i class="fa fa-circle-o"></i> International</a>
          </li>

          <li class="redirect-link">
            <a target="_blank" :href="legacyLink + '/report_ap.asp?token='"><i class="fa fa-circle-o"></i> Intercompany Charge</a>
          </li>
        </ul>
      </li>

      <template v-if="features.FEATURE_IN_DEVELOPMENT">
        <li class="treeview">
          <a href="javascript:;" name="Inventory">
            <i class="fa fa-list-alt"></i>
            <span>Inventory</span>
            <i class="fa fa-plus pull-right"></i>
            <i class="fa fa-minus pull-right"></i>
          </a>
          <ul class="treeview-menu">
            <li class="page-link">
              <a class="admin" name="Devices" href="/devices"><i class="fa fa-circle-o"></i>Equipment</a>
            </li>

            <li class="page-link" >
               <a class="admin" name="presets" href="/presets"><i class="fa fa-circle-o"></i>Equipment Groups</a>
            </li>

            <li class="page-link">
              <a class="admin" name="services" href="/services"><i class="fa fa-circle-o"></i>Services & Plans</a>
            </li>

            <li class="page-link" >
              <a name="employees" href="/employees"><i class="fa fa-circle-o"></i>Employees</a>
            </li>

            <li class="page-link">
              <a name="companies" href="/companies"><i class="fa fa-circle-o"></i>Companies</a>
            </li>
          </ul>
        </li>

        <li class="treeview">
          <a href="javascript:;" name="Polices">
            <i class="fa fa-th-large"></i>
            <span>Packages</span>
            <i class="fa fa-plus pull-right"></i>
            <i class="fa fa-minus pull-right"></i>
          </a>
          <ul class="treeview-menu">
            <li><a name="AllPackages" href="/packages"><i class="fa fa-circle-o"></i>View All Packages</a></li>
            <li><a name="createPackage" href="/packages/new"><i class="fa fa-circle-o"></i>Create a Package</a></li>
          </ul>
        </li>

        <li class="treeview">
          <a href="javascript:;" name="configuration">
            <i class="fa fa-tasks"></i>
            <span>Configuration</span>
            <i class="fa fa-plus pull-right"></i>
            <i class="fa fa-minus pull-right"></i>
          </a>
          <ul class="treeview-menu">
            <li><a name="portal" href="#"><i class="fa fa-circle-o"></i>Portal</a></li>
            <li><a name="procurement" href="/orders"><i class="fa fa-circle-o"></i>Procurement</a></li>
          </ul>
        </li>
      </template>
      
        <li>
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
  import supportRequest from './support-request'
  import Vue from 'vue';

  export default {
    name: "Sidemenu",
    data() {
      return {
        features: features,
        legacyLink: process.env.LEGACY_URL + '/helpdesk/udl'

      }
    },
    mounted() {
      /*console.log('features', this.features);*/
      var intervalId = setInterval(function () {
        var token = localStorage.token;
        var id = localStorage.userId;
        var email = localStorage.email;
        $('.redirect-link a').attr('href', function (index, href) {
          var param = token + '&version=v4';
          if (href.charAt(href.length - 1) === '?') //Very unlikely
            return href + param;
          else if (href.indexOf('?') > 0)
            return href + param;
          else
            return href + '?' + param;
        });
        if (token !== undefined) {
          clearInterval(intervalId);
        }
      }, 2000);

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
          //If the menu is not visible
          else if ((checkElement.is('.treeview-menu')) && (!checkElement.is(':visible'))) {
            //Get the parent menu
            var parent = $this.parents('ul').first();
            //Close all open menus within the parent
            var ul = parent.find('ul:visible').slideUp(animationSpeed);
            //Remove the menu-open class from the parent
            ul.removeClass('menu-open');
            //Get the parent li
            var parent_li = $this.parent("li");
            //Open the target menu and add the menu-open class
            checkElement.slideDown(animationSpeed, function () {
              //Add the class active to the parent li
              checkElement.addClass('menu-open');
              parent.find('li.active').removeClass('active');
              parent_li.addClass('active');
            });
          }
          //if this isn't a link, prevent the page from being redirected
          if (checkElement.is('.treeview-menu')) {
            e.preventDefault();
          }
        });
      }

      $(this.$el).foundation();

      $.sidebarMenu($('.sidebar-menu'));
       /* $.cookie("isMenuActive", "1");*/
      if ($.cookie("isMenuActive") == 1) {
        $('.menu-left').addClass("test");
        $('.content-right').addClass("test");
      }
      $(".icon-close").click(function () {
        if ($(".menu-left").hasClass("test") == true) {
          //button was active, de-activate it and update cookie
          $(".menu-left").removeClass("test");
          $(".content-right").removeClass("test");
          $.cookie("isMenuActive", "0");
        }
        else {
          //button is not active. add active class and update cookie.
          $(".menu-left").addClass("test");
           $(".content-right").addClass("test");
          $.cookie("isMenuActive", "1");
        }
      });

      $('#menu').slicknav({prependTo: 'section.top-bar-section'});

      setTimeout(supportRequest, 100);
    },
    methods: {
      openSupportTicket: function() {
        $('.support-form-holder').show();
      }
    }
  }
</script>