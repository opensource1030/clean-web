
<template>
<section class="menu-left">
    <a  transition="fade" class="icon-close"> <i class="fa fa-bars "> </i> </a>
    <ul id="menu" class="sidebar-menu">
      <li class="logo"> <img src="/images/clients/tfs/logo.png" alt="logo" title="Client Logo"> </li>
      <li class="menu-title">
        <a href="#">
          <i class="fa fa-home"></i> <span>Home</span>
        </a>
      </li>
      <li class="treeview">
        <a >
          <i class="fa fa-dashboard"></i>
          <span>Dashboard</span>
          <i class="fa fa-angle-down pull-right"></i>
        </a>
        <ul class="treeview-menu" style="display: none;">
          <li><a ><i class="fa fa-circle-o"></i> Trends</a></li>
          <li><a ><i class="fa fa-circle-o"></i> Bill Cycle</a></li>
          <li><a ><i class="fa fa-circle-o"></i> Top 10 Reports</a></li>
          <li class=""><a ><i class="fa fa-circle-o"></i> Split Billing</a>
          </li>
        </ul>
      </li>
      <li class="treeview">
        <a >
          <i class="fa fa-bar-chart"></i>
          <span>Reports</span>
          <i class="fa fa-angle-down pull-right"></i>
        </a>
        <ul class="treeview-menu" style="display: none;">
          <li><a ><i class="fa fa-circle-o"></i> Charge</a></li>
          <li><a ><i class="fa fa-circle-o"></i> Data</a></li>
          <li><a ><i class="fa fa-circle-o"></i> International</a></li>
          <li><a ><i class="fa fa-circle-o"></i> Usage</a></li>
          <li><a ><i class="fa fa-circle-o"></i> Intercompany Charge</a></li>
          <li><a ><i class="fa fa-circle-o"></i> Zero Usage</a></li>
        </ul>
      </li>
      <li class="treeview">
        <a >
          <i class="fa fa-gears"></i> <span>Admin</span>
          <i class="fa fa-angle-down pull-right"></i>
        </a>
        <ul class="treeview-menu" style="display: none;">
          <li>
            <a ><i class="fa fa-circle-o"></i> Carrier <i class="fa fa-angle-down pull-right"></i></a>
            <ul class="treeview-menu">
              <li><a > View All</a></li>
              <li><a > Process New Data</a></li>
              <li><a > View All Plans</a></li>
              <li><a > View Incompleted</a></li>
              <li><a > Perform Plan Analysis</a></li>
            </ul>
          </li>
          <li>
            <a ><i class="fa fa-circle-o"></i> Device <i class="fa fa-angle-down pull-right"></i></a>
            <ul class="treeview-menu">
              <li><a > Search</a></li>
              <li><a > Add New Device</a></li>

            </ul>
          </li>
          <li>
            <a ><i class="fa fa-circle-o"></i> Employees <i class="fa fa-angle-down pull-right"></i></a>
            <ul class="treeview-menu">
              <li><a > Search</a></li>
              <li><a > Load New Census</a></li>
              <li><a > Add New Employee</a></li>
            </ul>
          </li>
          <li>
            <a ><i class="fa fa-circle-o"></i> Employees <i class="fa fa-angle-down pull-right"></i></a>
            <ul class="treeview-menu">
              <li><a > Jenkins</a></li>
              <li><a > Beanstalk</a></li>
              <li><a > DB Snapshots</a></li>
            </ul>
          </li>

        </ul>
      </li>
      <li><a ><i class="fa fa-cog"></i> <span>Setting</span></a></li>
      <li><a ><i class="fa fa-phone"></i> <span>Support</span></a></li>


    </ul>
    <div class="nav-poweredby">
      <span class="text-copyright">Powered By</span>
      <img class="img-full" src="images/wa_logo.png" alt="Wireless Analytics">
      <img class="img-collapse" src="images/logo.jpg" alt="Wireless Analytics">
    </div>
  </section>
  </template>
  <script>
      var $j = require('jquery');
      require('../../vendor/foundation-sites/dist/foundation')
        require('../modules/classie')

export default {
  name: "Navbar",

    ready () {
      $j.sidebarMenu = function(menu) {
        var animationSpeed = 300;

        $j(menu).on('click', 'li a', function(e) {
          var $jthis = $j(this);
          var checkElement = $jthis.next();

          if (checkElement.is('.treeview-menu') && checkElement.is(':visible')) {
            checkElement.slideUp(animationSpeed, function() {
              checkElement.removeClass('menu-open');
            });
            checkElement.parent("li").removeClass("active");
          }

          //If the menu is not visible
          else if ((checkElement.is('.treeview-menu')) && (!checkElement.is(':visible'))) {
            //Get the parent menu
            var parent = $jthis.parents('ul').first();
            //Close all open menus within the parent
            var ul = parent.find('ul:visible').slideUp(animationSpeed);
            //Remove the menu-open class from the parent
            ul.removeClass('menu-open');
            //Get the parent li
            var parent_li = $jthis.parent("li");

            //Open the target menu and add the menu-open class
            checkElement.slideDown(animationSpeed, function() {
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
      $j(this.$el).foundation();
          $j.sidebarMenu($j('.sidebar-menu'));
          $j('.icon-close').click(function(){
            $j('.menu-left').toggleClass('test');
            $j('.content-right').toggleClass('test')
          });




  }
}
  </script>
