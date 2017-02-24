<template>
  <div>
    <div class="large-6 columns">
      <div class="grid-box" data-mh="box2">
        <header class="box-heading">
          <h2>Trend By Category</h2>
        </header>
        <div class="box-content coming-soon">
          <ul class="tabs" data-tabs id="trend-tabs">
            <template v-for="(key, index) in groupDataKeys">
              <li :class="'tabs-title ' + (index == 0 ? 'is-active' : '')"><a :href="'#trend-' + index" :aria-selected="index == 0 ? true : false">{{ key | phone }}</a>
              </li>
            </template>
          </ul>

          <div class="tabs-content" data-tabs-content="trend-tabs">
            <template v-for="(key, index) in groupDataKeys">
              <div :class="'tabs-panel ' + (index == 0 ? 'is-active' : '')" :id="'trend-' + index" :aria-hidden="index == 0 ? false : true">
                <!-- <trend-chart :chartData="seriesData(key)" :options="options" :height="300"></trend-chart> -->
                <vue-chart
                  chart-type="LineChart"
                  :columns="columns"
                  :rows="seriesData(key)"
                  :options="options"
                ></vue-chart>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  var dateFormat = require('dateformat');
  import _ from 'lodash';
  import Vue from 'vue';
  import phone from './../filters/phone-formatter.js';
  // import PieData from './../api/piedata';
  // import TrendChart from './TrendChart';

  export default {
    components: {
      // TrendChart
    },

    props: ['data'],

     data: function () {
        const currency = '$';
        const formatter = new google.visualization.NumberFormat({
          fractionDigits: 2,
          prefix: currency
        });
        return {
            columns: [
              {
                'type': 'string',
                'label': 'Year / Month',
                'role': 'domain'
              },
              {
                'type': 'number',
                'label': 'Service Plan Charges'
              },
              {
                'type': 'number',
                'label': 'Domestic Usage Charges'
              },
              {
                'type': 'number',
                'label': 'International Roam Usage Charges'
              },
              {
                'type': 'number',
                'label': 'International Long Distance Voice Charges'
              },
              {
                'type': 'number',
                'label': 'Other Charges'
              }
            ],
            options: {
                vAxis: {
                  format: currency + "0.00"
                },
                width: 'auto',
                height: 300,
                colors: ['#4374e0', '#fce473', '#42afe3', '#ed6c63', '#97cd76'],
                legend: {
                  position: 'bottom'
                },
                focusTarget: 'category',
                chartArea: {
                  left: '15%',
                  top: '10%',
                  width: '75%'
                }
            }
        }
    },

    computed: {
      groupData() {
        // console.log('data', this.data);
        let group_data = _.groupBy(this.data, 'mobile_number');
        // console.log('group_data', group_data);
        return group_data;
      },

      groupDataKeys() {
        let group_data_keys = _.keys(this.groupData);
        // console.log('keys', group_data_keys);
        return group_data_keys;
      }
    },

    methods: {
      getMonths(bill_month) {
        let menuMonths = new Array();
        let date = new Date(bill_month);
        date.setMonth(date.getMonth() - 3);
        menuMonths.push(dateFormat(date, 'mmm / yyyy'));
        date.setMonth(date.getMonth() + 1);
        menuMonths.push(dateFormat(date, 'mmm / yyyy'));
        date.setMonth(date.getMonth() + 1);
        menuMonths.push(dateFormat(date, 'mmm / yyyy'));
        return menuMonths;
      },

      seriesData(key) {
        let allocations = _.get(this.groupData, key, null);
        // console.log('allocations', allocations);
        let trendchart_data = [];
        let bill_month = new Date();

        if (allocations) {
          trendchart_data = _.chain(allocations).orderBy('bill_month').map(function(allocation) {
            // console.log("allocation", allocation);
            bill_month = new Date(allocation.bill_month);
            return [
              dateFormat(bill_month, 'mmm / yyyy'),
              allocation.service_plan_charge,
              allocation.domestic_usage_charge,
              allocation.intl_roam_usage_charge,
              (allocation.intl_ld_usage_charge + allocation.intl_ld_voice_charge) || 0,
              (Math.round((allocation.equipment_charge + allocation.etf_charge + allocation.other_carrier_charges + allocation.taxes_charge) * 100) / 100) || 0
            ]
          }).value();
        }

        let len = trendchart_data.length;
        if (len < 3) {
          for (let i = 0; i < (3 - len); i ++) {
            bill_month.setMonth(bill_month.getMonth() - 1);
            trendchart_data.unshift([dateFormat(bill_month, 'mmm / yyyy'), 0, 0, 0, 0, 0]);
          }
        }

        return trendchart_data;
      }
    }
  }
</script>
