<template>
  <div>
    <b-card>
      <h4 slot="header">Dashboard</h4>
      <b-card-body>

      </b-card-body>
    </b-card>
  
    <b-card>
      <h4 slot="header">Overview</h4>
      <b-card-body>

      </b-card-body>
    </b-card>
    <b-row>
      <b-col>
        <b-card>
          <h4 slot="header">Spend By Category</h4>

        </b-card>
      </b-col>
      <b-col>
        <b-card>
        <h4 slot="header">Trend By Category</h4>        

        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
//import './dashboard.ctrl.js'
export default {
  name: 'dashboard',
  components: {
    
  },
  data: function () {
    return {
      
    }
  },
  methods: {
    
  }
}
</script>

<style>
  /* IE fix 
  #card-chart-01, #card-chart-02 {
    width: 100% !important;
  }
  */


</style>
