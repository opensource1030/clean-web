import { Pie, mixins } from 'vue-chartjs'
var {
  Store,
} = require('yayson')();
var store = new Store();

export default Pie.extend({
  mixins: [mixins.reactiveProp],

  props: ['chartData', 'options'],

  mounted () {
    // console.log('child mounted', this.chartData);
    this.renderChart(this.chartData, this.options);
  },
})