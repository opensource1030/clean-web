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
      <breadcrumb></breadcrumb>
      <div class="column large-12">
        <div class="default callout client-info" data-closable>
          <h2 v-if="clean.object" >  {{clean.object.title }}</h2>
          <div v-if="clean.object"> {{{clean.object.metafields[3].value }}} </div>
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
            <div class="box-content-holder" v-if="clean.object">
              {{{clean.object.metafields[0].value }}}
          </div>
            </div>
        </div>
      </div>
      <div class="large-6 columns" >
        <div class="grid-box" data-mh="box1" v-if="clean.object">
          <header class="box-heading">
            <h2> {{ clean.object.metafields[1].title }}</h2>
          </header>
          <div class="box-content" v-if="clean.object">
            <div class="action-button" id="action-buttons">
              <a class="button " href="#">Request Provision</a>
              <a class="button btn-provision" href="#">Get Support</a>
              <div class="support-form-holder">
                <div class="form-header">
                  <h2>Ticket Information</h2>
                  <a id="btn-close" href="javascript:;" title="close"><i class="fa fa-times-circle"> </i> </a>
                </div>
                <form id="support-form" method="post">
                  <div class="row support-form-container">
                    <div class="medium-12 columns">
                      <label><span class="form-title"> How Can We Help?</span> <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span>
                        <select id="supportOption" class="user-actions required" name="supportOption" required>
                          <option disabled value=" " selected>-- Choose an issue ---</option>
                          <option value="IRE1-1">Troubleshooting</option>
                          <option value="IRE1-2">Plan Change</option>
                          <option value="IRE1-3">Email Service</option>
                          <option value="ALR4-4">Billing &amp; allocations</option>
                          <option value="IRE1-5">Activation</option>
                          <option value="IRE1-6">International Request</option>
                          <option value="IRE0-7">Other</option>
                        </select>
                      </label>
                    </div>
                    <div id="Container">
                      <div class="medium-12 columns mix IRE1-5">
                        <label for="imei"><span class="form-title">IMEI/MEID</span> <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span>
                          <input type="text" placeholder="imei/meid" name="imei" id="imei" value="" required>
                        </label>
                      </div>
                      <div class="medium-12 columns mix IRE1-5">
                        <label for="iccid"><span class="form-title">ICCID</span> <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span>
                          <input type="text" placeholder="iccid" name="iccid" id="iccid" required>
                        </label>
                      </div>
                      <div class="medium-12 columns mix IRE1-5">
                        <label for="activationDeviceType"><span class="form-title">Device type, Make/Model </span> <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span>
                          <input type="text" placeholder="device type" name="activationDeviceType" id="activationDeviceType" required>
                        </label>
                      </div>
                      <div class="medium-12 columns mix IRE1-5">
                        <label for="mobile"><span class="form-title">Mobile # </span><span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span>
                          <input type="text" placeholder="mobile number" id="mobile" name="mobile" required>
                        </label>
                      </div>
                      <div class="medium-12 columns mix IRE1-6">
                        <label for="travelCountries"><span class="form-title">What country/countries are you travelling to?</span> <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span>
                          <input type="text" placeholder="" id="travelCountries" name="travelCountries" required>
                        </label>
                      </div>
                      <div class="medium-12 columns mix IRE1-6">
                        <label for="travelDates"><span class="form-title">Dates of travel</span> <span data-tooltip aria-haspopup="true" class="has-tip top is-required " data-disable-hover="false" tabindex="1" title="Required Field">*</span>
                          <input type="text" placeholder="" id="travelDates" name="travelDates" required>
                        </label>
                      </div>
                      <div class="medium-12 columns mix IRE1-6">
                        <label for="travelDeviceType"><span class="form-title">Device type, phone, tablet, mifi </span> <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span>
                          <input type="text" placeholder="" name="travelDeviceType" id="travelDeviceType" required>
                        </label>
                      </div>
                      <div class="large-12 columns  mix IRE1-3 ">
                        <fieldset class="fieldset">
                          <legend><span class="form-title">Please select type </span> <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span></legend>
                          <label for="email" class="column large-6"><input type="radio" name="email_service_type" value="Email Setup" id="email"  required>Email</label>
                          <label for="phone" class="column large-6"><input type="radio" name="email_service_type" value="Email Troubleshooting" id="phone" required>Phone</label>
                        </fieldset>
                      </div>
                      <div class="medium-12 columns ">
                        <label><span class="form-title">Requestor Email (whomever is filling out this form)</span> <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span> <span data-tooltip aria-haspopup="true" class="has-tip top" data-disable-hover="false" tabindex="1" title="Whomever is filling out this form."><i class="fa fa-question-circle"> </i> </span>
                        </label>
                        <input type="text" value="domotosho@wirelessanalytics.com" readonly>
                      </div>
                      <div class="medium-12 columns ">
                        <label for="recipient_email"><span class="form-title">Recipient Email (the affected user)</span> <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span> <span data-tooltip aria-haspopup="true" class="has-tip top" data-disable-hover="false" tabindex="1" title="The affected user."><i class="fa fa-question-circle"> </i> </span>
                          <input type="text" placeholder="your email" name="recipient_email" id="recipient_email" required>
                        </label>
                      </div>
                      <div class="medium-12 columns">
                        <label for="recipient_number"><span class="form-title">Recipient Mobile Number (if number is unavailable, please add N/A)</span> <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span> <span data-tooltip aria-haspopup="true" class="has-tip top" data-disable-hover="false" tabindex="1" title="if number is unavailable, please add N/A."><i class="fa fa-question-circle"> </i> </span>
                          <input type="text" placeholder="your email" name="recipient_number" id="recipient_number" required>
                        </label>
                      </div>
                      <div class="large-12 columns ">
                        <fieldset class="fieldset">
                          <legend><span class="form-title">Priority </span> <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span></legend>
                          <div class="row">
                            <label for="low" class="column large-6"><input type="radio" name="priority" value="Low" id="low" required>Low</label>
                            <label for="medium" class="column large-6"><input type="radio" name="priority" value="Medium" id="medium" required>Medium</label>
                            <label for="high" class="column large-6"><input type="radio" name="priority" value="High" id="high" required>High</label>
                            <label for="asap" class="column large-6"><input type="radio" name="priority" value="Asap" id="asap" required>Asap</label>
                          </div>
                        </fieldset>
                      </div>
                      <div class="large-12 columns ">
                        <fieldset class="fieldset">
                          <legend><span class="form-title">Who should we contact? </span> <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span>
                          </legend>
                          <div class="row">
                            <label for="recipent" class="column large-6"><input type="radio" name="contact_who" value="Recipent" id="recipent" required> Recipent</label>
                            <label for="requestor" class="column large-6"><input type="radio" name="contact_who" value="Requestor" id="requestor"> Requestor</label>
                          </div>
                        </fieldset>
                      </div>
                      <div class="large-12 columns ">
                        <fieldset class="fieldset">
                          <legend><span class="form-title">Preferred Contact Method </span> <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span></legend>
                          <div class="row">
                            <label for="email1" class="column large-6"><input type="radio" name="contact_by" value="Email" id="email1" required>Email</label>
                            <label for="phone1" class="column large-6"><input type="radio" name="contact_by" value="Phone" id="phone1" required>Phone</label>
                          </div>
                        </fieldset>
                      </div>
                      <div class="medium-12 columns">
                        <label for="callback"><span class="form-title">Callback Number </span> <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span>
                          <input type="text" placeholder="callback number" name="callback" id="callback" required>
                        </label>
                      </div>
                      <div class="medium-12 columns">
                        <label for="description"><span class="form-title">Description</span> <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span> <span data-tooltip aria-haspopup="true" class="has-tip top" data-disable-hover="false" tabindex="1" title="Please explain the question or problem in detail, and let us know how you'd like to be contacted."><i class="fa fa-question-circle"> </i> </span>
                          <textarea rows="3" name="description" id="description"  required> </textarea>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="form-footer">
                    <button type="submit"  class="button btn-submit ">Submit Ticket</button>
                  </div>
                  <div class="tiny reveal" id="modal" data-reveal>
                    <button class="close-button" data-close aria-label="Close Accessible Modal" type="button">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
            {{{  clean.object.metafields[1].value }}}
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
      <pre> {{ $data | json }} </pre>

    </div>




</template>

<script>
import auth from './../api/auth'

  require('../modules/classie')
  require('../modules/dashboard-chart')
import Breadcrumb from './Breadcrumb.vue'
var Api = 'https://api.cosmicjs.com/v1/clean/object/thermo-fisher?pretty=true';
export default {
  name: "Dashboard",
  components: {
    Breadcrumb

  },

    ready(){
      this.$http.get(Api).then((response) => {
        this.$set('clean', response.json());
        /* this.response = response.data.object;*/

      }, (response) => {


      });

      (function() {
        var isAnimating;
        var morphSearch = document.getElementById( 'morphsearch' ),
                input = morphSearch.querySelector( 'input.morphsearch-input' ),
                ctrlClose = morphSearch.querySelector( 'span.morphsearch-close' ),
                isOpen = isAnimating = false,
                // show/hide search area
                toggleSearch = function(evt) {
                  // return if open and the input gets focused
                  if( evt.type.toLowerCase() === 'focus' && isOpen ) return false;

                  var offsets = morphsearch.getBoundingClientRect();
                  if( isOpen ) {
                    classie.remove( morphSearch, 'open' );

                    // trick to hide input text once the search overlay closes
                    // todo: hardcoded times, should be done after transition ends
                    if( input.value !== '' ) {
                      setTimeout(function() {
                        classie.add( morphSearch, 'hideInput' );
                        setTimeout(function() {
                          classie.remove( morphSearch, 'hideInput' );
                          input.value = '';
                        }, 300 );
                      }, 500);
                    }

                    input.blur();
                  }
                  else {
                    classie.add( morphSearch, 'open' );
                  }
                  isOpen = !isOpen;
                };

        // events
        input.addEventListener( 'focus', toggleSearch );
        ctrlClose.addEventListener( 'click', toggleSearch );
        // esc key closes search overlay
        // keyboard navigation events
        document.addEventListener( 'keydown', function( ev ) {
          var keyCode = ev.keyCode || ev.which;
          if( keyCode === 27 && isOpen ) {
            toggleSearch(ev);
          }
        } );


        /***** for demo purposes only: don't allow to submit the form *****/
        morphSearch.querySelector( 'button[type="submit"]' ).addEventListener( 'click', function(ev) { ev.preventDefault(); } );
      })();
      //filter
      $(function(){
        var $select = $('#support-form .user-actions'),
                $images =  $('.mix');

        $select.on('change', function() {
          var value = '.' + $(this).val();
          $images.show(200).not(value).hide();
        });

        var $selectOption = $('.wireless-overview .user-actions');

        $selectOption.on('change', function() {
          var value1 = $(this).val();
          $('.btn-provision').click();
          $select.prop('value',value1);
        });

        $('.btn-provision').click(function(){
          $('.support-form-holder').show(200);
        })
        $('#btn-close').click(function(){
          $('.support-form-holder').hide(200);
          $('#support-form')[0].reset();
          $selectOption.prop('selectedIndex',0);
        })
        $(document).keyup(function(e) {
          if (e.keyCode == 27) $('#btn-close').click();
        });


      });
      //high charts
      $(function () {

        $('#spend-category').highcharts({
          chart: {
            type: 'pie',
            height: 300,
            width: 450
          },
          credits: {enabled: false},
          colors: [
            '#F7C37E', '#FF7E81', '#A87BEA', '#A8DEFF', '#ABF1A3', '#66D6A0'],
          title: {text: null},
          plotOptions: {
            pie: {
              allowPointSelect: true,
              innerSize: '80%',
              cursor: 'pointer',
              showInLegend: true,
              dataLabels: {
                enabled: false,
                formatter: function () {
                  return this.percentage.toFixed(2) + '%';
                }
              }
            }
          },
          legend: {
            enabled: true,
            layout: 'vertical',
            align: 'right',
            width: 150,
            verticalAlign: 'middle',
            useHTML: true,
            labelFormatter: function () {
              return '<div style="text-align: left; width:80px;display: inline-block">' + this.name + '</div><div style="width:40px; display: inline-block;text-align:right;">$' + this.y + '</div> <div class="clearfix" style="margin-bottom: 10px;"></div>';
            }
          },
          series: [{
            type: 'pie',
            dataLabels: {},
            data: [
              ['Voice', 100.10],
              ['Data', 203.21],
              ['Messaging', 54.93],
              ['Taxes', 20.76],
              ['Eqiupment', 104.88],
              ['Other', 10.45]
            ]
          }]
        });

        $('#trend-category').highcharts({
          chart: {
            height: 300,
            width: 500
          },
          title: false,
          xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
              'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            gridLineWidth: 1
          },
          credits: {enabled: false},
          yAxis: {
            labels: {
              format: '${value}',
            },
            title: false,
            plotLines: [{
              value: 0,
              width: 1,
              color: '#808080'
            }],
            gridLineWidth: 1
          },
          tooltip: {
            valuePrefix: '$'
          },
          colors: [
            '#F7C37E', '#FF7E81', '#A87BEA', '#A8DEFF', '#ABF1A3', '#66D6A0'],
          legend: {
            enabled: true,
            layout: 'vertical',
            align: 'right',
            width: 150,
            verticalAlign: 'middle',
            useHTML: true,
            labelFormatter: function () {
              return '<div style="text-align: left; width:80px;display: inline-block">' + this.name + '</div> <div class="clearfix" style="margin-bottom: 10px;"></div>';
            }
          },
          series: [{
            name: 'Voice',
            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
          }, {
            name: 'Data',
            data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
          }, {
            name: 'Messaging',
            data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
          }, {
            name: 'Taxes',
            data: [3.9, 4.0, 5.2, 7.4, 9.9, 12.2, 15.0, 18.6, 14.2, 10.3, 6.6, 4.8]
          }, {
            name: 'Equipment',
            data: [4.9, 5.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
          }, {
            name: 'Other',
            data: [6.9, 6.2, 7.7, 3.5, 17.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
          }
          ]

        })
      /*  $('#menu').slicknav();
        var $modal = $('#modal');
        $("#support-form").validate({
          rules: {
            "description": {
              required:true,
              minlength:8
            }
          },
          submitHandler: function(form) {
            var formData = $(form).serializeObject();
            console.log(formData);
            $.soap({
              url: 'https://wa.easyvista.com:443/WebService/SmoBridge.php/',
              method: 'EZV_CreateRequest',
              data:formData ,
              success: function (soapResponse) {
                $modal.addClass('is-success').append("<p>Request cannot be sent</p>").foundation('open');
                $('#support-form')[0].reset();
              },
              error: function (SOAPResponse) {
                $modal.addClass('is-error').append("<p>Request cannot be sent</p>").foundation('open');
              },
              parts: {
                Account: '50005',
                Login: 'CLEANWebServices',
                Pass: 'CLEANWebServices',
                Catalog_GUID: 'simple',
              },

            });
          }
        });*/
      });

      //filter
      $(function(){
        var $select = $('#support-form .user-actions'),
                $images =  $('.mix');

        $select.on('change', function() {
          var value = '.' + $(this).val();
          $images.show(200).not(value).hide();
        });

        var $selectOption = $('.wireless-overview .user-actions');

        $selectOption.on('change', function() {
          var value1 = $(this).val();
          $('.btn-provision').click();
          $select.prop('value',value1);
        });

        $('.btn-provision').click(function(){
          $('.support-form-holder').show(200);
        })
        $('#btn-close').click(function(){
          $('.support-form-holder').hide(200);
          $('#support-form')[0].reset();
          $selectOption.prop('selectedIndex',0);
        })
        $(document).keyup(function(e) {
          if (e.keyCode == 27) $('#btn-close').click();
        });


      });


    },
  data (){
    return {
      clean: {}
    }
  }

}

</script>
