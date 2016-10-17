
<template>
<div>
  <div class="column large-12">
    <div class="default callout client-info" >
      <h2 v-if="client.object" >  {{client.object.title }}</h2>
      <div v-if="client.object" v-html="client.object.metafields[3].value" >  </div>

    </div>
  </div>
  <div class="clearfix"></div>
  <div class="large-6 columns" >
    <div class="grid-box" data-mh="box1">
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
    <div class="grid-box" data-mh="box1" v-if="client.object">
      <header class="box-heading">
        <h2 v-html="client.object.metafields[1].title"> </h2>
      </header>
      <div class="box-content">
        <div class="action-button" id="action-buttons">
          <a class="button" href="javascript:;">Request Provision</a>
          <a class="button btn-provision"  href="#">Get Support</a>

        </div>
        <div v-html="client.object.metafields[1].value "> </div>
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
        this.$http.get(process.env.URL_API + '/users/'+ localStorage.userId +'?include=company.contents', {

        }).then((response) => {

          var event = store.sync(response.data);
          var cosmicdata = event.company.contents[0].content;

          this.$http.get(cosmicdata, {

          }).then((response) => {

            this.client= response.data;


          });


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
