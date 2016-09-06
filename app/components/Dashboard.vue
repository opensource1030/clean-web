<template>
  <div class="content-right" >
    <div class="expanded row">

      <!-- top nav -->
      <section class="top-bar-section clearfix ">
        <div class="column large-8">
          <morphsearch> </morphsearch>
        </div>
        <div class="large-4">

        </div>
      </section>

      <!-- end of top nav -->
      <div class="clearfix"></div>
      <breadcrumb></breadcrumb>
      <clientinfo> </clientinfo>

        <piechart> </piechart>
        <trendchart> </trendchart>

    </div>

  </div>




</template>

<script>
  import auth from './../api/auth'
  require('../modules/dashboard-chart')
  import Breadcrumb from './Breadcrumb.vue'
  import Clientinfo from './Clientinfo.vue'
  import Morphsearch from './Morphsearch.vue'
  import Piechart from './Piechart.vue'
  import Trendchart from './Trendchart.vue'

  export default {
    name: "Dashboard",
    components: {
      Breadcrumb,
      Morphsearch,
      Clientinfo,
      Piechart,
      Trendchart

    }


  }

</script>
