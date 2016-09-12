<template>
  <div class="content-right" >
    <div class="alert callout for-dashboard" data-closable style="display:none;">
      <h5>You will now be redirected to this section in our legacy app</h5>
    </div>
    <div class="expanded row">

      <!-- top nav -->
      <section class="top-bar-section clearfix ">
        <div class="column large-8 medium-8 small-6">
          <morphsearch> </morphsearch>
        </div>
        <div class="column push-1 large-4 medium-4 small-6 profile" v-if="data.object">
              <div class="profile-holder"><a class="float-right" data-toggle="example-dropdown-1"> <img class="img-avatar" data-name="{{data.object.title }}" alt="name"> <span class="greeting">Hi, {{data.object.title }}</span></a> </div>
          <div class="dropdown-pane bottom" id="example-dropdown-1" data-dropdown >
            <ul>
              <li><a @click="logout()"  v-if="user.authenticated" >Logout</a></li>
            </ul>
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

  var Api = 'https://api.cosmicjs.com/v1/clean/object/thermo-fisher?pretty=true';
  import auth from './../api/auth'
  require('../modules/dashboard-chart')
  require('initial-js');
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
        this.$http.get(Api).then((response) => {
            this.$set('data', response.json());
            setTimeout(function(){
                $(document).foundation();
                $('.img-avatar').initial();
            },300);


        }, (response) => {

        });
    },
    data(){
      return {
        data: {}
      }
    },
    methods:{
      dropmenu: function(){

      }

    }


  }




</script>
