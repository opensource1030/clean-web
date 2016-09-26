<template>
  <section  class="menu-left">
    <a   class="icon-close"> <i class="fa fa-bars "> </i> </a>
    <ul id="menu" class="sidebar-menu">
      <li class="logo" v-if="company.object">

        <img v-bind:src='company.object.metafields[0].url' alt="logo" title="Client Logo">

      </li>
      <li class="menu-title">
        <a href="javascript:;">
          <i class="fa fa-home"></i> <span>Home</span>
        </a>
      </li>
      <li class="treeview">
        <a href="/dashboard">
          <i class="fa fa-dashboard"></i>
          <span>Dashboard</span>
          <i class="fa fa-angle-down pull-right"></i>
        </a>
        <ul class="treeview-menu" style="display: none;">
          <li class="page-link"><a  href="http://app.wirelessanalytics.com/helpdesk/udl/dashboard_trend.asp"><i class="fa fa-circle-o"></i> Trends</a></li>
          <li class="page-link"><a target="_blank" href="http://app.wirelessanalytics.com/helpdesk/udl/dashboard_cycle.asp"><i class="fa fa-circle-o"></i> Bill Cycle</a></li>
          <li class="page-link"><a target="_blank" href="http://app.wirelessanalytics.com/helpdesk/udl/dashboard_top_ten.asp"><i class="fa fa-circle-o"></i> Top 10 Reports</a></li>
        </ul>
      </li>
      <li class="treeview">
        <a  href="#">
          <i class="fa fa-bar-chart"></i>
          <span>Reports</span>
          <i class="fa fa-angle-down pull-right"></i>
        </a>
        <ul class="treeview-menu">
          <li class="page-link"><a target="_blank" href="http://app.wirelessanalytics.com/helpdesk/udl/report_allocation.asp"><i class="fa fa-circle-o"></i> Charge</a></li>
          <li class="page-link"><a target="_blank" href="http://app.wirelessanalytics.com/helpdesk/udl/report_data.asp"><i class="fa fa-circle-o"></i> Data</a></li>
          <li class="page-link"><a target="_blank" href="http://app.wirelessanalytics.com/helpdesk/udl/report_international.asp"><i class="fa fa-circle-o"></i> International</a></li>
          <li class="page-link"><a target="_blank" href="http://app.wirelessanalytics.com/helpdesk/udl/report_usage.asp"><i class="fa fa-circle-o"></i> Usage</a></li>
          <li class="page-link"><a target="_blank" href="http://app.wirelessanalytics.com/helpdesk/udl/report_ap.asp"><i class="fa fa-circle-o"></i> Intercompany Charge</a></li>
          <li class="page-link"><a target="_blank" href="http://app.wirelessanalytics.com/helpdesk/udl/report_zero_usage.asp"><i class="fa fa-circle-o"></i> Zero Usage</a></li>
        </ul>
      </li>
      <li class="page-link"><a target="_blank" href="http://app.wirelessanalytics.com/helpdesk/support.asp"><i class="fa fa-phone"></i> <span>Support</span></a></li>


    </ul>
    <div class="nav-poweredby">
      <span class="text-copyright">Powered By</span>
      <img class="img-full" src="/images/wa_logo.png" alt="Wireless Analytics">
      <img class="img-collapse" src="/images/logo.png" alt="Wireless Analytics">
    </div>
  </section>

</template>
  <script>
    import config from './../../config/config'
import auth from './../api/auth'
var userId = config.client_id;
var apiUrl = 'http://lfce85j83fdtoxhkw-mock.stoplight-proxy.io/users/'+ 19 + '?include=company';
export default {
  name: "Sidemenu",
    ready () {
    console.log(userId);
      this.$http.get(apiUrl).then((response) => {
        var info = response.data.included[0].attributes.logo;
        this.$http.get(info).then((response) => {
          this.$set('company', response.json());
        })

      }, (response) => {

      });
        var intervalId = setInterval(function(){
          var token = localStorage.token;
          $('.page-link a').attr('href', function(index, href) {

            var param = 'access_token='+ token;

            if (href.charAt(href.length - 1) === '?') //Very unlikely
              return href + param;
            else if (href.indexOf('?') > 0)
              return href + '&' + param;
            else
              return href + '?' + param;


          });
          if(token !== undefined){
            clearInterval(intervalId);
          }
        }, 2000);


      $.sidebarMenu = function(menu) {
        var animationSpeed = 300;

        $(menu).on('click', 'li a', function(e) {
          var $this = $(this);
          var checkElement = $this.next();

          if (checkElement.is('.treeview-menu') && checkElement.is(':visible')) {
            checkElement.slideUp(animationSpeed, function() {
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
      $(this.$el).foundation();
          $.sidebarMenu($('.sidebar-menu'));
          $('.icon-close').click(function(){
            $('.menu-left').toggleClass('test');
            $('.content-right').toggleClass('test')
          });




  },
  data (){
    return {
      company: { },


    }
  }
}
  </script>
