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
              <li :class="'tabs-title ' + (index == 0 ? 'is-active' : '')">
                <a :href="'#spend-' + index" role="tab" :aria-controls="'spend-' + index" :aria-selected="index == 0 ? 'true' : 'false'" :data-index="index">{{ allocation.mobile_number | phone }}</a>
              </li>
            </template>
          </ul>

          <div class="tabs-content" data-tabs-content="spend-tabs">
            <template v-for="(allocation, index) in data">
              <div :class="'tabs-panel ' + (index == 0 ? 'is-active' : '')" :id="'spend-' + index" :aria-hidden="index == 0 ? 'false' : 'true'">
                <div class="pie-chart-title">
                  {{ title(allocation) }}
                </div>
                <vue-chart
                  :v-ref="'vuechart' + index"
                  chart-type="PieChart"
                  :columns="columns"
                  :rows="pieData(index)"
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
  import phone from './../filters/phone-formatter.js';
  // import PieChart from './PieChart';

  export default {
    components: {
      // PieChart
    },

    props: ['data'],

    data() {
      return {
        activeIndex: 0,
        columns: [
          {
            'type': 'string',
            'label': 'Category'
          },
          {
            'type': 'number',
            'label': 'Charge'
          },
        ],
        rows: [
          ['2004', 1000],
          ['2005', 1170],
          ['2006', 660],
          ['2007', 1030],
          ['2008', 800]
        ],
        options: {
          width: 'auto',
          // width: 500,
          height: 300,
          // chartArea: {left: 0,top: 0,width: '100%', height: '100%'},
          pieHole: 0.4,
          colors: ['#4374e0', '#fce473', '#42afe3', '#ed6c63', '#97cd76'],
          legend: {position: 'bottom', textStyle: {color: 'blue', fontSize: 16}, alignment: 'center'}

          // focusTarget: 'category',
        }
      }
    },

    mounted () {
      // console.log('PieChart mount', $('#spend-tabs li a'))
    },

    methods: {
      title (allocation) {
        return this.$options.filters.phone(allocation.mobile_number) + ' (' + dateFormat(allocation.bill_month, 'mmm yyyy') + ')';
      },

      pieData (index) {
        if (index !== this.activeIndex) {
          return [['Dummy', 0]]
        }

        let allocation = this.data[index]
        // console.log('allocation', allocation);
        var piechart_data = [
          ['Service Plan Charges', allocation.service_plan_charge],
          ['Domestic Usage Charges', allocation.domestic_usage_charge],
          ['International Roam Usage Charges', allocation.intl_roam_usage_charge],
          ['International Long Distance Voice Charges', (allocation.intl_ld_usage_charge + allocation.intl_ld_voice_charge) || 0],
          ['Other Charges', (Math.round((allocation.equipment_charge + allocation.etf_charge + allocation.other_carrier_charge + allocation.taxes_charge) * 100) / 100) || 0]
        ];

        let vm = this
        this.$nextTick(() => {
          $('#spend-tabs li a').off('click').on('click', function(e) {
            setTimeout(() => {
              let index = $(this).data('index')
              // console.log(index)
              vm.$set(vm, 'activeIndex', index)
            })
          })
        });

        return piechart_data;
      },
    }
  }

</script>