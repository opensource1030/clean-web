<template>
  <div class="coming-soon">
    <div class="tabs">
      <ul class="nav nav-tabs" role="tablist">
        <template v-for="(key, index) in groupDataKeys">
          <li class="nav-item">
            <label
              data-toggle="tab"
              @click="activeIndex = index"
              role="tab"
              :class="{'active': activeIndex == index}"
              class="nav-link mb-0"
            >{{ $options.filters.phone(key) }}</label>
          </li>
        </template>
      </ul>
      <div class="tab-content">
        <template v-for="(key, index) in groupDataKeys">
          <div
            v-if="activeIndex == index"
            :id="`pie-${index}`"
            role="tabpanel"
            :class="{'show active': activeIndex == index}"
            class="tab-pane fade"
          >
            <p class="charts_tel">{{ key | phone }}</p>
            <vue-chart
              :ref="`bar-${index}`"
              chart-type="ColumnChart"
              :columns="columns"
              :rows="seriesData(key, index)"
              :options="options"
            ></vue-chart>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import moment from 'moment'

export default {
  props: ['data'],

  data: function () {
    const currency = '$';
    // const formatter = new google.visualization.NumberFormat({
    //   fractionDigits: 2,
    //   prefix: currency
    // });
    return {
      activeIndex: 0,
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
        },
        isStacked: true
      }
    }
  },

  computed: {
    groupData() {
      let group_data = _.groupBy(this.data, 'mobile_number');
      return group_data;
    },

    groupDataKeys() {
      let group_data_keys = _.keys(this.groupData);
      return group_data_keys;
    }
  },

  methods: {
    seriesData (key, index) {
      let bill_month = null
      let trendchart_data = []

      let allocations = _.get(this.groupData, key, null);

      trendchart_data = []
      bill_month = null;

      if (allocations) {
        trendchart_data = _.chain(allocations).orderBy('bill_month').map(function(allocation) {
          if (bill_month == null && !!allocation.bill_month) {
            bill_month = moment(allocation.bill_month)
          }

          let ildvc = allocation.intl_ld_usage_charge + allocation.intl_ld_voice_charge;
          ildvc = ildvc ? ildvc : 0;

          let oc = Math.round((allocation.equipment_charge + allocation.etf_charge + allocation.other_carrier_charge + allocation.taxes_charge) * 100) / 100;
          oc = oc ? oc : 0;

          return [
            moment(allocation.bill_month).format('MMM YYYY'),
            {v: allocation.service_plan_charge, f: '$' + allocation.service_plan_charge},
            {v: allocation.domestic_usage_charge, f: '$' + allocation.domestic_usage_charge},
            {v: allocation.intl_roam_usage_charge, f: '$' + allocation.intl_roam_usage_charge},
            {v: ildvc, f: '$' + ildvc},
            {v: oc, f: '$' + oc}
          ]
        }).value();
      }

      if (bill_month == null) {
        bill_month = moment()
      }
      let len = trendchart_data.length;
      if (len < 3) {
        for (let i = 0; i < (3 - len); i ++) {
          bill_month.set('month', bill_month.get('month') - 1);
          trendchart_data.unshift([bill_month.format('MMM YYYY'), 0, 0, 0, 0, 0]);
        }
      }

      return trendchart_data;
    }
  },

  // created() {
  //   const vm = this
  //   this.$on('redrawChart', function() {
  //     console.log('Trendchart redrawChart...')
  //     for (let idx in vm.$children) {
  //       vm.$children[idx].drawChart();
  //     }
  //   })
  // },

  // mounted () {
  //   const vm = this
  //   $(function() {
  //     $(window).resize(function() {
  //       vm.$emit('redrawChart');
  //     })
  //   })
  // },
}
</script>
