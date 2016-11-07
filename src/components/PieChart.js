import { Pie } from 'vue-chartjs'
var {
    Store,
} = require('yayson')();
var store = new Store();
export default Pie.extend({
    created () {

    },
    mounted () {
        this.renderChart(this.pieData, this.options_3);
    },
    data () {
        return {
            labels: ['Sleeping', 'Designing', 'Coding', 'Cycling'], // I want to put data from api call
            data: [20, 40, 5, 35], // I want to put data from api call
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
            return {
                labels: this.labels,
                datasets: [{
                    data: this.data,
                    backgroundColor: this.backgroundColor
                }]
            }
        }
    },
    methods: {
        init: function(){
            this.getItems();

        },
        getItems: function(){
            this.$http.get(process.env.URL_API+'/users/'+localStorage.userId+'?include=allocations').then((response) => {
                var event = store.sync(response.data);

                return { data : [20, 40, 5, 35]}



            }, (response) => {

            });
        }
    }
})