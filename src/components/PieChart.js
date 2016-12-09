import Vue from 'vue'
import auth from './../api/auth'
import { Pie } from 'vue-chartjs'
var {
    Store,
} = require('yayson')();
var store = new Store();
export default Pie.extend({

    mounted () {
        this.renderChart(this.pieData, this.options);
    },
    data () {
        return {
            labels: ['data_category', 'other_category','unknown_category','voice_category'],
            data: '', // I want to put data from api call
            backgroundColor: [
                '#1fc8db',
                '#fce473',
                '#42afe3',
                '#ed6c63',
                '#97cd76'
            ],
            options: {
                tooltips: {
                    mode: 'label'
                },
                legend :{
                    position: 'bottom'
                },
                segmentShowStroke: false
            }
        }
    },
    computed: {
        pieData () {
            let data = {
                labels: this.labels
            }
             data.datasets= [{
                    data: this.test(),
                    backgroundColor: this.backgroundColor
                }]
            return data;

        }
    },
    methods: {
       test (){
           return [1, 15, 27.4,32.40]
       }
    }
})