<template>

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





</template>

<script>
import auth from './../api/auth'

export default {
  name: "Dashboard",
  data() {
    return {
      user: auth.user
    }
  },

  methods: {
    logout() {
      auth.logout()
    }
  }


}

</script>
