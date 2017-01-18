<template>
  <div>
    <div class="large-6 columns">
      <div class="grid-box" data-mh="box2">
        <header class="box-heading">
          <h2>Spend By Category</h2>
        </header>
        <div class="box-content coming-soon">
          <ul class="tabs" data-tabs id="spend-tabs">
            <template v-for="(allocation, index) in data">
              <li :class="'tabs-title ' + (index == 0 ? 'is-active' : '')"><a :href="'#spend-' + index" :aria-selected="index == 0 ? true : false">{{ allocation.mobile_number | phone }}</a>
              </li>
            </template>
          </ul>

          <div class="tabs-content" data-tabs-content="spend-tabs">
            <template v-for="(allocation, index) in data">
              <div :class="'tabs-panel ' + (index == 0 ? 'is-active' : '')" :id="'spend-' + index">
                <div class="pie-chart-title">
                  {{ title(allocation) }}
                </div>
                <pie-chart :chartData="pieData(allocation)" :options="options" :height="200"></pie-chart>
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
  import phone from './../filters/phone-formatter.js';
  import PieChart from './PieChart';
  export default {
    components: { PieChart },

    props: ['data'],

    data () {
      return {
        labels: [
          'Service Plan Charges',
          'Domestic Usage Charges',
          'International Roaming Usage Charges',
          'Internaional Long Distance Usage Charges',
          'Other Charges'
        ],
        backgroundColor: [
          '#1fc8db',
          '#fce473',
          '#42afe3',
          '#ed6c63',
          '#97cd76'
        ],
        options: {
          tooltips: {
            mode: 'label'
          },
          legend :{
            position: 'bottom'
          },
          segmentShowStroke: false
        }
      }
    },

    computed: {
      // pieData() {
      //   console.log('piechart_data', this.data);
      //   var piechart_data = [
      //     _.sumBy(this.data, 'service_plan_charge'),
      //     _.sumBy(this.data, 'other_category'),
      //     _.sumBy(this.data, 'unknown_category'),
      //     _.sumBy(this.data, 'voice_category'),
      //   ];
      //   let data = {
      //     labels: this.labels
      //   };
      //   data.datasets= [{
      //     // data: this.test(),
      //     // data: this.data,
      //     data: piechart_data,
      //     backgroundColor: this.backgroundColor
      //   }];
      //   return data;
      // },
    },

    methods: {
      test() {
        return [10, 15, 27.4, 32.40, 26];
      },

      title(allocation) {
        return this.$options.filters.phone(allocation.mobile_number) + ' (' + dateFormat(allocation.bill_month, 'mmm yyyy') + ')';
      },

      pieData(allocation) {
        // console.log('allocation', allocation);
        var piechart_data = [
          allocation.service_plan_charge,
          allocation.domestic_usage_charge,
          allocation.intl_roam_usage_charge,
          allocation.intl_ld_usage_charge + allocation.intl_ld_voice_charge,
          Math.round((allocation.equipment_charge + allocation.etf_charge + allocation.other_carrier_charges + allocation.taxes_charge) * 100) / 100
        ];
        // console.log('piechart_data', piechart_data);

        let data = {
          labels: this.labels
        };

        data.datasets= [{
          // data: this.test(),
          // data: this.data,
          data: piechart_data,
          backgroundColor: this.backgroundColor
        }];
        return data;
      },
    }
  }

</script>