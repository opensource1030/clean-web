<template>
  <div>
    <div class="large-6 columns">
      <div class="grid-box" data-mh="box2">
        <header class="box-heading">
          <h2>Trend By Category- Custom</h2>
        </header>
        <div class="box-content coming-soon">
          <trend-chart :height="200" > </trend-chart>
        </div>
      </div>
    </div>
    </div>
</template>

<script>
  import TrendChart from './TrendChart'
  export default {
    components: { TrendChart }

  }
</script>
