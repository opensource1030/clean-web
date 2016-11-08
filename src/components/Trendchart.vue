<template>
  <div>
    <div class="large-6 columns">
      <div class="grid-box" data-mh="box2">
        <header class="box-heading">
          <h2>Trend By Category- Custom</h2>
        </header>
        <div class="box-content coming-soon">
          <trend-chart :height="200" > </trend-chart>
        </div>
      </div>
    </div>
    </div>
</template>

<script>
  import auth from './../api/auth'
  import Vue from 'vue'
  var {Store,} = require('yayson')();
  var store = new Store();

  import TrendChart from './TrendChart'
  export default {
    components: { TrendChart },
    created () {
      this.$http.get(process.env.URL_API+'users/'+localStorage.userId,{
                params: {
                  include: 'allocations',
                },
              }).then((response) => {
        var chartData = store.sync(response.data);

      }, (response) => {

      });

    },
    data () {
      return {
        data_3: [
          [25, 40, 50],
          [28, 48, 40],
          [10, 55, 30]
        ],
        options_3: {
          tooltips: {
            mode: 'label'
          }
        },
        backgroundColor_3: [
          'rgba(31, 200, 219, 1)',
          'rgba(151, 205, 118, 1)',
          'rgba(90, 100, 40, 1)'
        ],
        series: ['Usage Charge', 'Service Plan Charges','Other Charges']
      }
    },
    computed: {
      seriesData () {
        let data = {
          labels: this.getMonths()
        }
        data.datasets = this.series.map((e, i) => {
          return {
            data: this.data_3[i],
            label: this.series[i],
            borderColor: this.backgroundColor_3[i].replace(/1\)$/, '.5)'),
            pointBackgroundColor: this.backgroundColor_3[i],
            backgroundColor: this.backgroundColor_3[i].replace(/1\)$/, '.5)'),
            pointHoverRadius: 8
          }
        })
        return data;
      }
    },
    methods: {
      getMonths: function(){
        let date = new Date();
        //subttract 3 months
        date.setMonth(0 - 4);
        let monthArray = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
        let menuMonths = new Array();
        let count = 3;
        let buffer = 10;
        while (count > 0) {
          var month = monthArray[date.getMonth()];
          menuMonths.push(month);
          date.setMonth(date.getMonth() + 1);
          count -= 1;
        }
        return menuMonths;
      }
    }

  }
</script>
