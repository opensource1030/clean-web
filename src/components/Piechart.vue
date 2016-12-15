<template>
  <div>
    <div class="large-6 columns">
      <div class="grid-box" data-mh="box2">
        <header class="box-heading">
          <h2>Spend By Category- Custom</h2>
        </header>
        <div class="box-content coming-soon">
          <pie-chart :chartData="pieData" :options="options" :height="200" > </pie-chart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import PieChart from './PieChart'
  export default {
    components: { PieChart },

    props: ['data'],

    data () {
      return {
        labels: ['data_category', 'other_category', 'unknown_category', 'voice_category'],
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
      pieData() {
        // console.log('child computed', this.chartData);
        let data = {
          labels: this.labels
        };
        data.datasets= [{
          // data: this.test(),
          data: this.data,
          backgroundColor: this.backgroundColor
        }];
        return data;
      },
    },

    methods: {
      test() {
        return [1, 15, 27.4, 32.40];
      },
    }
  }

</script>