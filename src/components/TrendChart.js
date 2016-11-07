<<<<<<< HEAD
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
=======
import { Line } from 'vue-chartjs'

export default Line.extend({
    mounted () {
        this.renderChart(this.seriesData, this.options_3)
    },
    data () {
        return {
            labels_3: ['May', 'June', 'Jule', 'August', 'September', 'October', 'November'],
            data_3: [
                [65, 59, 90, 81, 56, 55, 40],
                [28, 48, 40, 19, 88, 27, 45]
            ],
            options_3: {
                tooltips: {
                    mode: 'label'
                }
            },
            backgroundColor_3: [
                'rgba(31, 200, 219, 1)',
                'rgba(151, 205, 118, 1)'
            ],
            series: ['Product A', 'Product B']
        }
    },
    computed: {
        seriesData () {
            let data = {
                labels: this.labels_3
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
    }
})
>>>>>>> chart api call
