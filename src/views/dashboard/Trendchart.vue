<template>
  <div class="coming-soon">
    <ul class="tabs" data-tabs id="trend-tabs">
      <template v-for="(key, index) in groupDataKeys">
        <li :class="'tabs-title ' + (index == activeIndex ? 'is-active' : '')">
          <a role="tab" :aria-controls="'trend-' + index" :aria-selected="index == activeIndex ? 'true' : 'false'" :data-index="index">{{ key | phone }}</a>
        </li>
      </template>
    </ul>

    <div class="tabs-content" data-tabs-content="trend-tabs">
      <template v-for="(key, index) in groupDataKeys">
        <div :class="'tabs-panel ' + (index == activeIndex ? 'is-active' : '')" :id="'trend-' + index" :aria-hidden="index == activeIndex ? 'false' : 'true'">
          <div class="pie-chart-title">
            {{ key | phone }}
          </div>
          <vue-chart chart-type="ColumnChart" :columns="columns" :rows="seriesData(key, index)" :options="options" v-if="index == activeIndex"></vue-chart>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash';
  import moment from 'moment';

  export default {
    props: ['data'],

     data: function () {
      const currency = '$';
      const formatter = new google.visualization.NumberFormat({
        fractionDigits: 2,
        prefix: currency
      });
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
    created() {
      const self = this;
      this.$on('redrawChart', function() {
        for(var idx in self.$children) {
          self.$children[idx].drawChart();
        }
      })
    },
    mounted () {
      const self = this;
      $(function() {
        $(window).resize(function() {
          self.$emit('redrawChart');
        })
      })
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

            var ildvc = allocation.intl_ld_usage_charge + allocation.intl_ld_voice_charge;
            ildvc = ildvc ? ildvc : 0;

            var oc = Math.round((allocation.equipment_charge + allocation.etf_charge + allocation.other_carrier_charge + allocation.taxes_charge) * 100) / 100;
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

        let vm = this
        this.$nextTick(() => {
          $('#trend-tabs li a').off('click').on('click', function(e) {
            setTimeout(() => {
              let index = $(this).data('index')
              vm.$set(vm, 'activeIndex', index)
            })
          })
        });

        return trendchart_data;
      }
    }
  }
</script>
