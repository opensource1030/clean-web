import { Line, reactiveProp } from 'vue-chartjs'
var {Store,} = require('yayson')();
var store = new Store();

export default Line.extend({
  mixins: [reactiveProp],

  props: ['chartData', 'options'],

  mounted () {
    this.renderChart(this.chartData, this.options);
  },
})
