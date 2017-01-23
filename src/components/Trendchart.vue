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
              <div :class="'tabs-panel ' + (index == 0 ? 'is-active' : '')" :id="'trend-' + index">
                <trend-chart :chartData="seriesData(key)" :options="options" :height="200"></trend-chart>
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
  import TrendChart from './TrendChart';
  export default {
    components: { TrendChart },

    props: ['data'],

    // props: {
    //   data: {
    //     default: () => {
    //       return [
    //         [25, 40, 50],
    //         [28, 48, 40],
    //         [10, 55, 30]
    //       ];
    //     }
    //   }
    // },

    // beforeCreate() {
    //   PieData.getCharts(this);
    // },

    data() {
      var self = this;
      return {
        currency: '$',
        // data: [],
        backgroundColor: [
          'rgba(31, 200, 219, 1)',
          'rgba(252, 228, 115, 1)',
          'rgba(66, 175, 227, 1)',
          'rgba(237, 108, 99, 1)',
          'rgba(151, 205, 118, 1)'
        ],
        series: [
          'Service Plan Charges',
          'Domestic Usage Charges',
          'International Roaming Usage Charges',
          'Internaional Long Distance Usage Charges',
          'Other Charges'
        ],
        options: {
          tooltips: {
            mode: 'label',
            callbacks: {
              label: function(tooltipItem, data) {
                var value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                var label = data.datasets[tooltipItem.datasetIndex].label;
                return ' ' + label + ': ' + self.currency + value.toFixed(2);
              }
            }
          },
          legend :{
            position: 'bottom'
          },
          scales: {
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Charge ($)'
              }
            }]
          }
        },
      }
    },

    computed: {
      // seriesData() {
      //   console.log('trendchart_data', this.data);
      //   let data = {
      //     labels: this.getMonths()
      //   }
      //   data.datasets = this.series.map((e, i) => {
      //     return {
      //       data: this.data[i] || [],
      //       label: this.series[i],
      //       borderColor: this.backgroundColor[i].replace(/1\)$/, '.5)'),
      //       pointBackgroundColor: this.backgroundColor[i],
      //       backgroundColor: this.backgroundColor[i].replace(/1\)$/, '.5)'),
      //       pointHoverRadius: 8
      //     };
      //   });
      //   return data;
      // }

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

        if (allocations) {
          trendchart_data = _.chain(allocations).orderBy('bill_month').map(function(allocation) {
            // console.log(allocation);
            return {
              service_plan_charges: allocation.service_plan_charge,
              domestic_usage_charges: allocation.domestic_usage_charge,
              international_roaming_usage_charges: allocation.intl_roam_usage_charge,
              internaional_long_distance_usage_charges: allocation.intl_ld_usage_charge + allocation.intl_ld_voice_charge,
              other_charges: Math.round((allocation.equipment_charge + allocation.etf_charge + allocation.other_carrier_charges + allocation.taxes_charge) * 100) / 100,
              bill_month: allocation.bill_month,
            }
          }).value();
        }

        let len = trendchart_data.length;
        if (len < 3) {
          for (i = 0; i < (3 - len); i ++) {
            trendchart_data.unshift({
              service_plan_charges: 0,
              domestic_usage_charges: 0,
              international_roaming_usage_charges: 0,
              internaional_long_distance_usage_charges: 0,
              other_charges: 0,
              bill_month: ''
            });
          }
        }
        // console.log(key, trendchart_data);

        let _data = [
          _.map(trendchart_data, 'service_plan_charges'),
          _.map(trendchart_data, 'domestic_usage_charges'),
          _.map(trendchart_data, 'international_roaming_usage_charges'),
          _.map(trendchart_data, 'internaional_long_distance_usage_charges'),
          _.map(trendchart_data, 'other_charges'),
        ];

        let data = {
          labels: this.getMonths(trendchart_data[2].bill_month)
        };
        data.datasets = this.series.map((e, i) => {
          return {
            data: _data[i],
            label: this.series[i],
            borderColor: this.backgroundColor[i].replace(/1\)$/, '.5)'),
            pointBackgroundColor: this.backgroundColor[i],
            backgroundColor: this.backgroundColor[i].replace(/1\)$/, '.5)'),
            pointHoverRadius: 8
          };
        });
        return data;
      }
    }
  }
</script>
