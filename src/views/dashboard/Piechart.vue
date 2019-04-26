<template>
  <div class="coming-soon">
    <ul class="tabs" data-tabs id="spend-tabs">
      <template v-for="(allocation, index) in data">
        <b-btn variant="outline">
          <a :data-index="index">{{ allocation.mobile_number | phone }}</a>
        </b-btn>
      </template>
    </ul>

    <div class="tabs-content" data-tabs-content="trend-tabs">
      <template v-for="(allocation, index) in data">
        <div :class="'tabs-panel ' + (index == activeIndex ? 'is-active' : '')" :id="'spend-' + index" :aria-hidden="index == activeIndex ? 'false' : 'true'">
          <p class="charts_tel">
            {{ title(allocation) }}
          </p>
          <vue-chart :v-ref="'vuechart' + index" chart-type="PieChart" :columns="columns" :rows="pieData(index)" :options="options"></vue-chart>
        </div>
      </template>
    </div>
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
     methods: {
      title (allocation) {
        return allocation.mobile_number + ' (' + moment(allocation.bill_month).format('MMM YYYY') + ')';
      },
      pieData (index) {
        if (index !== this.activeIndex) {
          return [['Dummy', 0]]
        }

        let allocation = this.data[index]
        var ildvc = allocation.intl_ld_usage_charge + allocation.intl_ld_voice_charge;
        ildvc = ildvc ? ildvc : 0;
        var oc = (Math.round((allocation.equipment_charge + allocation.etf_charge + allocation.other_carrier_charge + allocation.taxes_charge) * 100) / 100);
        oc = oc ? oc : 0;
        var piechart_data = [
          ['Service Plan Charges', {v: allocation.service_plan_charge, f: '$'+allocation.service_plan_charge}],
          ['Domestic Usage Charges', {v: allocation.domestic_usage_charge, f: '$'+allocation.domestic_usage_charge}],
          ['International Roam Usage Charges', {v: allocation.intl_roam_usage_charge, f: '$'+allocation.intl_roam_usage_charge}],
          ['International Long Distance Voice Charges', {v: ildvc, f: '$' + ildvc}],
          ['Other Charges', {v: oc, f: '$' + oc}]
        ];

        let vm = this
        this.$nextTick(() => {
          $('#spend-tabs li a').off('click').on('click', function(e) {
            setTimeout(() => {
              let index = $(this).data('index')
              vm.$set(vm, 'activeIndex', index)
            })
          })
        });

        return piechart_data;
      },
    }
  }
</script>
