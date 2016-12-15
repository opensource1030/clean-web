<template>
  <div>
    <div class="large-6 columns">
      <div class="grid-box" data-mh="box2">
        <header class="box-heading">
          <h2>Trend By Category- Custom</h2>
        </header>
        <div class="box-content coming-soon">
          <trend-chart  :datas="callback" :height="200" > </trend-chart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import PieData from './../api/piedata'
  import TrendChart from './TrendChart'
  export default {
    components: { TrendChart },

    data(){
        return{
          data:null
        }
    },

    methods:{
      callback() {
        //API CALL IN THE FILE ./../api/piedata 
        //  PieData.get(this,this.data)
        return  this.data=[
          [25, 40, 50],
          [28, 48, 40],
          [10, 55, 30]
        ];
      }
    }
  }
</script>
