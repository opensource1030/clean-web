<template>
  <div class="off-canvas-wrapper">
    <section  class="menu-left">
      <a href="#" class="icon-close"> <i class="fa fa-bars "> </i> </a>
      <ul id="menu" class="sidebar-menu">
        <li class="logo"> <img src="/images/clients/tfs/logo.png" alt="logo" title="Client Logo"> </li>
        <li class="menu-title">
          <a href="#">
            <i class="fa fa-home"></i> <span>Home</span>
          </a>
        </li>
        <li class="treeview">
          <a href="#">
            <i class="fa fa-dashboard"></i>
            <span>Dashboard</span>
            <i class="fa fa-angle-down pull-right"></i>
          </a>
          <ul class="treeview-menu" style="display: none;">
            <li><a href="#"><i class="fa fa-circle-o"></i> Trends</a></li>
            <li><a href="#"><i class="fa fa-circle-o"></i> Bill Cycle</a></li>
            <li><a href="#"><i class="fa fa-circle-o"></i> Top 10 Reports</a></li>
            <li class=""><a href="#"><i class="fa fa-circle-o"></i> Split Billing</a>
            </li>
          </ul>
        </li>
        <li class="treeview">
          <a href="#">
            <i class="fa fa-bar-chart"></i>
            <span>Reports</span>
            <i class="fa fa-angle-down pull-right"></i>
          </a>
          <ul class="treeview-menu">
            <li><a href="#"><i class="fa fa-circle-o"></i> Charge</a></li>
            <li><a href="#"><i class="fa fa-circle-o"></i> Data</a></li>
            <li><a href="#"><i class="fa fa-circle-o"></i> International</a></li>
            <li><a href="#"><i class="fa fa-circle-o"></i> Usage</a></li>
            <li><a href="#"><i class="fa fa-circle-o"></i> Intercompany Charge</a></li>
            <li><a href="#"><i class="fa fa-circle-o"></i> Zero Usage</a></li>
          </ul>
        </li>
        <li class="treeview">
          <a href="#">
            <i class="fa fa-gears"></i> <span>Admin</span>
            <i class="fa fa-angle-down pull-right"></i>
          </a>
          <ul class="treeview-menu">
            <li>
              <a href="#"><i class="fa fa-circle-o"></i> Carrier <i class="fa fa-angle-down pull-right"></i></a>
              <ul class="treeview-menu">
                <li><a href="#"> View All</a></li>
                <li><a href="#"> Process New Data</a></li>
                <li><a href="#"> View All Plans</a></li>
                <li><a href="#"> View Incompleted</a></li>
                <li><a href="#"> Perform Plan Analysis</a></li>
              </ul>
            </li>
            <li>
              <a href="#"><i class="fa fa-circle-o"></i> Device <i class="fa fa-angle-down pull-right"></i></a>
              <ul class="treeview-menu">
                <li><a href="#"> Search</a></li>
                <li><a href="#"> Add New Device</a></li>

              </ul>
            </li>
            <li>
              <a href="#"><i class="fa fa-circle-o"></i> Employees <i class="fa fa-angle-down pull-right"></i></a>
              <ul class="treeview-menu">
                <li><a href="#"> Search</a></li>
                <li><a href="#"> Load New Census</a></li>
                <li><a href="#"> Add New Employee</a></li>
              </ul>
            </li>
            <li>
              <a href="#"><i class="fa fa-circle-o"></i> Employees <i class="fa fa-angle-down pull-right"></i></a>
              <ul class="treeview-menu">
                <li><a href="#"> Jenkins</a></li>
                <li><a href="#"> Beanstalk</a></li>
                <li><a href="#"> DB Snapshots</a></li>
              </ul>
            </li>

          </ul>
        </li>
        <li><a href="#"><i class="fa fa-cog"></i> <span>Setting</span></a></li>
        <li><a href="#"><i class="fa fa-phone"></i> <span>Support</span></a></li>


      </ul>
      <div class="nav-poweredby">
        <span class="text-copyright">Powered By</span>
       <img class="img-full" src="/images/wa_logo.png" alt="Wireless Analytics">
        <img class="img-collapse" src="/images/logo.jpg" alt="Wireless Analytics">
      </div>
    </section>
    <div class="content-right" >
    <div class="expanded row">

      <!-- top nav -->
      <section class="top-bar-section clearfix ">
        <div class="column large-8">
        <div id="morphsearch" class="morphsearch">
          <form class="morphsearch-form">
            <input class="morphsearch-input" type="search" placeholder="What can we help you with?" title="What can we help you with?"/>
            <button class="morphsearch-submit" type="submit">Search</button>
          </form>
          <div class="morphsearch-content">
            <!-- Helpjuice Knowledge base code -->
            <div id="helpjuice_js_widget_content">
             <img src='//helpjuice.com/images/cube-theme/loading.gif' class="helpjuice-loading-spinner" />
            </div>
            <script>
              var helpjuice_account_url = "https://wirelessanalytics.helpjuice.com/";
            </script>
            <script src="//s3.amazonaws.com/assets.helpjuice.com/helpjuice.min.js"></script>
            <!-- End of Helpjuice knowledge base code -->


          </div><!-- /morphsearch-content -->
          <span class="morphsearch-close"></span>
        </div><!-- /morphsearch -->
        </div>
        <div class="large-4">

        </div>
      </section>

      <!-- end of top nav -->
      <div class="clearfix"></div>
      <nav aria-label="You are here:" role="navigation">
        <ul class="breadcrumbs for-clean">
          <li><a href="#"><i class="fa fa-home"> </i></a></li>
          <li>
            <span class="show-for-sr">Current: </span> Dashboard
          </li>
        </ul>
      </nav>
    <div class="column large-12">
      <div class="default callout client-info" data-closable>
        <h2>Thermo Fisher Wireless Portal</h2>
        Welcome to the Thermo Fisher wireless support portal. On this site you can review your recent wireless usage and charges, place requests for wireless devices and services, and get assistance should you require troubleshooting or support for your company-owned wireless device.
        <button class="close-button" aria-label="Dismiss alert" type="button" data-close>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
      <div class="clearfix"></div>
      <div class="large-6 columns" >
        <div class="grid-box" data-mh="box1">
          <header class="box-heading">
            <h2>contact support</h2>
          </header>
          <div class="box-content">
            <div class="box-content-holder">
              <p>There Are 3 Easy Ways To Get Support:  </p>
            </div>
            <ul class="icon-list">
              <li><i class="fa fa-envelope"> </i> <a href="mailto:support@company.com">support@company.com</a> </li>
              <li><i class="fa fa-phone"> </i> <a href="tel:800-55-1212">(800)-55-1212</a> </li>
              <li><i class="fa fa-question"> </i> <a href="tel:800-55-1212">Submit a support request</a> </li>
            </ul>
            <span class="note">For a detailed summary of the support options available please click <a href="#">HERE</a>. </span>
          </div>
        </div>
      </div>
      <div class="large-6 columns" >
        <div class="grid-box" data-mh="box1">
          <header class="box-heading">
            <h2> support resources</h2>
          </header>
          <div class="box-content">
            <div class="action-button">
              <a class="button " href="#">Request Provision</a>
              <a class="button" href="#">Get Support</a>
            </div>
            <ul class="icon-list">
              <li><i class="fa fa-users"> </i> <a href="#">Wireless Telecom Administrators</a> </li>
              <li><i class="fa fa-file-o"> </i> <a href="#">International Roaming Rate Sheet</a> </li>
              <li><i class="fa fa-file-o"> </i> <a href="#">Wireless Service Policy</a> </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="clearfix"></div>
      <div class="large-12 columns">
        <div class="grid-box">
          <header class="box-heading">
            <h2> Wireless Line Overview</h2>
          </header>
          <div class="box-content no-pad">
            <div class="wireless-overview">
              <table width="100%" class="responsive">
                <tbody><tr>
                  <th>Bill Month</th>
                  <th>
                    User Name
                  </th>
                  <th>Mobile Number</th>
                  <th>Carrier</th>
                  <th>Device</th>
                  <th>Total Allocated Charge</th>
                  <th>Usage Charges</th>
                  <th>Service Plan Charges</th>
                  <th> Other Charges</th>
                  <th> Last Upgrade Date</th>
                </tr>
                <tr>
                  <td>7/1/2016</td>
                  <td>Adriana Vicentini</td>
                  <td><a href="tel:115-123-1613">115-326-8868</a></td>
                  <td>Telefonica</td>
                  <td>Samsung Galaxy Core 2 G355</td>
                  <td>$503.21</td>
                  <td>$3.00</td>
                  <td>$481.00</td>
                  <td>$20.00</td>
                  <td>N/A</td>
                </tr>

                </tbody></table>
            </div>
          </div>
        </div>
      </div>
      <div class="clearfix"></div>
      <div class="large-6 columns">
        <div class="grid-box" data-mh="box2">
          <header class="box-heading">
            <h2>Spend by Category- Custom</h2>
          </header>
          <div class="box-content">
            <div id="spend-category">

            </div>
          </div>
        </div>
      </div>
      <div class="large-6 columns">
        <div class="grid-box" data-mh="box2">
          <header class="box-heading">
            <h2>Trend by Category- Custom</h2>
          </header>
          <div class="box-content">
            <div id="trend-category">

            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>




</template>

<script>


export default {
  name: "Dashboard",
  


}

</script>
