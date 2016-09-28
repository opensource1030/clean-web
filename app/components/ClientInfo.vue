
<template>

  <div class="column large-12">
    <div class="default callout client-info" >
      <h2 v-if="client.object" >  {{client.object.title }}</h2>
      <div v-if="client.object"> {{{client.object.metafields[3].value }}} </div>

    </div>
  </div>
  <div class="clearfix"></div>
  <div class="large-6 columns" >
    <div class="grid-box" data-mh="box1">
      <header class="box-heading">
        <h2>contact support</h2>
      </header>
      <div class="box-content">
        <div class="box-content-holder" v-if="client.object">
          {{{client.object.metafields[0].value }}}
        </div>
      </div>
    </div>
  </div>
  <div class="large-6 columns" >
    <div class="grid-box" data-mh="box1" v-if="client.object">
      <header class="box-heading">
        <h2> {{ client.object.metafields[1].title }}</h2>
      </header>
      <div class="box-content">
        <div class="action-button" id="action-buttons">
          <a class="button" href="javascript:;">Request Provision</a>
          <a class="button btn-provision"  href="#">Get Support</a>

        </div>
        {{{  client.object.metafields[1].value }}}
      </div>
    </div>
  </div>

</template>
<script>

  var Url = 'http://dev.api.wirelessanalytics.com/companies/'+ 16 +'?include=contents';
  export default {
    name: "ClientInfo",

    ready(){
      this.$http.get(Url).then((response) => {
        var clientinfo = response.data.included[0].attributes.content;
        this.$http.get(clientinfo).then((response) => {
          this.$set('client', response.json());
        })

      }, (response) => {

      });

    },
    data(){
      return {
        client: {}
      }
    }

  }



</script>