<template>
  <div>
    <div class="large-6 columns">
      <div class="grid-box" data-mh="box2">
        <header class="box-heading">
          <h2>Spend By Category- Custom</h2>
        </header>
        <div class="box-content coming-soon">
          <pie-chart :height="200" > </pie-chart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import PieChart from './PieChart'
  export default {
    components: { PieChart }

  }

</script>