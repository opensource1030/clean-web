import Vue from 'vue'
import auth from './../api/auth'
import { Pie } from 'vue-chartjs'
var {
    Store,
} = require('yayson')();
var store = new Store();
export default Pie.extend({

    mounted () {
        this.renderChart(this.pieData, this.options_3);
    },
    data () {
        return {
            labels: ['Usage Charge', 'Service Plan Charges','Other Charges'], // I want to put data from api call
            data: [1, 15, 27.4], // I want to put data from api call
            options: {
                segmentShowStroke: false
            },
            backgroundColor: [
                '#1fc8db',
                '#fce473',
                '#42afe3',
                '#ed6c63',
                '#97cd76'
            ],
            options_3: {
                tooltips: {
                    mode: 'label'
                },
                legend :{
                    position: 'bottom'
                }
            }
        }
    },
    computed: {
        pieData () {
            let data = {
                labels: this.labels
            }
             data.datasets= [{
                    data: this.data,
                    backgroundColor: this.backgroundColor
                }]
            return data;

        }
    },
    methods: {

    }
>>>>>>> chart api call
})