<template>
  <div class="coming-soon">
    <b-tabs>
      <template v-for="(allocation, index) in data">
        <b-tab
          :title="$options.filters.phone(allocation.mobile_number)"
        >
          <p class="charts_tel">{{ title(allocation) }}</p>
          <vue-chart
            :v-ref="'vuechart' + index"
            chart-type="PieChart"
            :columns="columns"
            :rows="pieData(index)"
            :options="options"
          ></vue-chart>
        </b-tab>
      </template>
    </b-tabs>
  </div>
</template>

<script>
import moment from 'moment'

export default {
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
        height: 300,
        pieHole: 0.4,
        colors: ['#4374e0', '#fce473', '#42afe3', '#ed6c63', '#97cd76'],
        legend: {position: 'bottom', textStyle: {color: 'blue', fontSize: 16}, alignment: 'center'}
      }
    }
  },

  methods: {
    title (allocation) {
      return this.$options.filters.phone(allocation.mobile_number) + ' (' + moment(allocation.bill_month).format('MMM YYYY') + ')';
    },

    pieData (index) {
      // if (index !== this.activeIndex) {
      //   return [['Dummy', 0]]
      // }

      let allocation = this.data[index]
      let ildvc = allocation.intl_ld_usage_charge + allocation.intl_ld_voice_charge;
      ildvc = ildvc ? ildvc : 0;
      let oc = (Math.round((allocation.equipment_charge + allocation.etf_charge + allocation.other_carrier_charge + allocation.taxes_charge) * 100) / 100);
      oc = oc ? oc : 0;
      let piechart_data = [
        ['Service Plan Charges', {v: allocation.service_plan_charge, f: '$'+allocation.service_plan_charge}],
        ['Domestic Usage Charges', {v: allocation.domestic_usage_charge, f: '$'+allocation.domestic_usage_charge}],
        ['International Roam Usage Charges', {v: allocation.intl_roam_usage_charge, f: '$'+allocation.intl_roam_usage_charge}],
        ['International Long Distance Voice Charges', {v: ildvc, f: '$' + ildvc}],
        ['Other Charges', {v: oc, f: '$' + oc}]
      ];

      return piechart_data;
    },
  },

  // created() {
  //   const vm = this
  //   this.$on('redrawChart', function() {
  //     console.log('Piechart redrawChart...')
  //     for (let idx in vm.$children) {
  //       vm.$children[idx].drawChart()
  //     }
  //   })
  // },

  // mounted () {
  //   const vm = this
  //   $(function() {
  //     $(window).resize(function() {
  //       vm.$emit('redrawChart')
  //     })
  //   })
  // },
}
</script>
