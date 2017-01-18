
<template>
<div>
  <div class="column large-12">
    <div class="grid-box " >
      <div class="box-heading">
        <h2 v-if="client.object" >  {{client.object.title }}</h2>
      </div>
      <div class="box-content" >
        <div class="box-content-holder" v-if="client.object" >
        <p v-html="client.object.metafields[2].value"> </p>
          </div>
      </div>

    </div>
  </div>
  <div class="clearfix"></div>
  <div class="large-6 columns" >
    <div class="grid-box eq-Hght" data-mh="box1">
      <header class="box-heading">
        <h2>contact support</h2>
      </header>
      <div class="box-content">
        <div class="box-content-holder" v-if="client.object" v-html="client.object.metafields[0].value">
        </div>
      </div>
    </div>
  </div>
  <div class="large-6 columns" >
    <div class="grid-box eq-Hght" data-mh="box1" v-if="client.object">
      <header class="box-heading">
        <h2 v-html="client.object.metafields[1].title"> </h2>
      </header>
      <div class="box-content">
        <div class="box-content-holder">
        <div class="action-button" id="action-buttons">
          <a class="button btn-round redirect-link" href="http://app.wirelessanalytics.com/helpdesk/r_1.asp" target="_blank">Request a Device or Accessory</a>
          <a class="button btn-provision btn-round "  href="javascript:;">Get Support</a>

        </div>
        <div v-html="client.object.metafields[1].value "> </div>
          </div>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
  var {Store} = require('yayson')()
  var  store = new Store()
  import auth from './../api/auth'
  export default {
    name: "ClientInfo",
    created(){
    this.fetchData();
    },
    methods:{
      fetchData : function(){
        this.$http.get(process.env.URL_API + '/users/'+ localStorage.userId +'?include=companies.contents', {

        }).then((response) => {

          var event = store.sync(response.data);

          if(event.companies.length>0){

          var cosmicdata = event.companies[0].contents[0].content;

          this.$http.get(cosmicdata, {

          }).then((response) => {

            this.client= response.data;


          });
        }


        });
      }
    },
    data(){
      return {
        client: {}
      }
    }

  }



</script>
