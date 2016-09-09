<template>

  <div class="content-right" >
    <div class="alert callout for-dashboard" data-closable style="display:none;">
      <h5>You will now be redirected to this section in our legacy app</h5>
    </div>
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
      $('.page-link a').each(function(e){
        $(this).click(function(e){
          var link = this.href;
          e.preventDefault();
          $('.for-dashboard').show(100);
          setTimeout(function() {
            $('.for-dashboard').hide(100);
              window.location=link;
          }, 2000);
        })

      })
    }


  }

</script>
