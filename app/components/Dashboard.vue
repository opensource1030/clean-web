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
            <div class="action-button">
              <a class="button " href="#">Request Provision</a>
              <a class="button" href="#">Get Support</a>
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


    }

}

</script>
