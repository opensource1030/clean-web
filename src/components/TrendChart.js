import {Bar, mixins } from 'vue-chartjs'
var {Store,} = require('yayson')();
var store = new Store();

export default Bar.extend({
  mixins: [mixins.reactiveProp],

  props: ['chartData', 'options'],

  mounted () {
    this.renderChart(this.chartData, this.options);
  },
})
