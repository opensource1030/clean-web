<template>
  <div class="chart-container">
    <div class="tabs">
      <ul class="nav nav-tabs" role="tablist">
        <template v-for="(allocation, index) in data">
          <li class="nav-item">
            <label
              data-toggle="tab"
              @click="activeIndex = index"
              role="tab"
              :class="{'active': activeIndex == index}"
              class="nav-link mb-0"
            >{{ title(allocation) }}</label>
          </li>
        </template>
      </ul>
      <div class="tab-content">
        <template v-for="(allocation, index) in data">
          <div
            v-if="activeIndex == index"
            :id="`pie-${index}`"
            role="tabpanel"
            :class="{'show active': activeIndex == index}"
            class="tab-pane fade"
          >
            <p class="charts_tel">{{ title(allocation) }}</p>
            <vue-chart
              :ref="`pie-${index}`"
              chart-type="PieChart"
              :columns="columns"
              :rows="pieData(allocation)"
              :options="options"
            ></vue-chart>
          </div>
        </template>
      </div>
    </div>
    <resize-observer @notify="onWindowResize" />
  </div>
</template>

<script>
import moment from 'moment'
import debounce from 'lodash/debounce'
import { ResizeObserver } from 'vue-resize'

import 'vue-resize/dist/vue-resize.css'

export default {
  props: ['data'],

  components: {
    ResizeObserver
  },

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
        legend: {position: 'bottom', textStyle: {color: 'black', fontSize: 12}, alignment: 'center'}
      }
    }
  },

  methods: {
    title(allocation) {
      return this.$options.filters.phone(allocation.mobile_number) + ' (' + moment(allocation.bill_month).format('MMM YYYY') + ')';
    },

    pieData(allocation) {
      // if (index !== this.activeIndex) {
      //   return [['Dummy', 0]]
      // }
      // let allocation = this.data[index]
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

    // handleResize: debounce(function () {
    //   console.log('handleResize Piechart', this)
    //   this.onWindowResize()
    // }, 200),

    onWindowResize() {
      const index = this.activeIndex
      const chart_ref = `pie-${index}`
      // console.log('onWindowResize', index, chart_ref)
      // console.log(this.$refs[chart_ref])
      this.$refs[chart_ref][0].drawChart()
    }
  },

  created() {
    // window.addEventListener('resize', this.onWindowResize)
  },

  beforeDestroy() {
    // window.removeEventListener('resize', this.onWindowResize)
  }
}
</script>
