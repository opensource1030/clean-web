<template>
  <div class="content-right" >
    <div class="expanded row">

      <!-- top nav -->
      <section class="top-bar-section clearfix ">
        <div class="column large-8">
          <morphsearch> </morphsearch>
        </div>
        <div class="large-4">
          <button class="button" type="button" data-toggle="example-dropdown-1">Hoverable Dropdown</button>
          <div class="dropdown-pane" id="example-dropdown-1" data-dropdown data-hover="true" data-hover-pane="true">
            Just some junk that needs to be said. Or not. Your choice.
          </div>
        </div>
      </section>

      <!-- end of top nav -->
      <div class="clearfix"></div>
      <breadcrumb></breadcrumb>
      <client-Info> </client-Info>

        <piechart> </piechart>
        <trendchart> </trendchart>

    </div>

  </div>




</template>

<script>
  import auth from './../api/auth'
  require('../modules/dashboard-chart')
  import Breadcrumb from './Breadcrumb.vue'
  import ClientInfo from './ClientInfo.vue'
  import Morphsearch from './Morphsearch.vue'
  import Piechart from './Piechart.vue'
  import Trendchart from './Trendchart.vue'

  export default {
    name: "Dashboard",
    components: {
      Breadcrumb,
      Morphsearch,
      ClientInfo,
      Piechart,
      Trendchart

    },
    ready(){
      $(document).foundation();
    }


  }

</script>
