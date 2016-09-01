

<template>

  <div class="column large-12">
    <div class="default callout client-info" data-closable>
      <h2>  {{data.object.title }}</h2>
      <p> {{data.object.content }} </p>
      <button class="close-button" aria-label="Dismiss alert" type="button" data-close>
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
  <div class="clearfix"></div>
  <div class="large-6 columns" >
    <div class="grid-box" data-mh="box1">
      <header class="box-heading">
        <h2>contact support</h2>
      </header>
      <div class="box-content">
        <div class="box-content-holder">
          <p>There Are 3 Easy Ways To Get Support:  </p>
        </div>
        <ul class="icon-list">
          <li><i class="fa fa-envelope"> </i> <a href="mailto:support@company.com">support@company.com</a> </li>
          <li><i class="fa fa-phone"> </i> <a href="tel:800-55-1212">(800)-55-1212</a> </li>
          <li><i class="fa fa-question"> </i> <a href="tel:800-55-1212">Submit a support request</a> </li>
        </ul>
        <span class="note">For a detailed summary of the support options available please click <a href="#">HERE</a>. </span>
      </div>
    </div>
  </div>
  <div class="large-6 columns" >
    <div class="grid-box" data-mh="box1">
      <header class="box-heading">
        <h2> support resources</h2>
      </header>
      <div class="box-content">
        <div class="action-button">
          <a class="button " href="#">Request Provision</a>
          <a class="button" href="#">Get Support</a>
        </div>
        <ul class="icon-list">
          <li><i class="fa fa-users"> </i> <a href="#">Wireless Telecom Administrators</a> </li>
          <li><i class="fa fa-file-o"> </i> <a href="#">International Roaming Rate Sheet</a> </li>
          <li><i class="fa fa-file-o"> </i> <a href="#">Wireless Service Policy</a> </li>
        </ul>
      </div>
    </div>
  </div>
  <div class="clearfix"></div>
  <pre> {{ $data | json }} </pre>
</template>
<script>
/*import auth from './../api/auth'*/
var urlAPI = 'https://api.cosmicjs.com/v1/clean/object/tfs-dashboard?pretty=true';
export default {
    name: "ClientInfo",
    ready (){
      this.$http.get(urlAPI).then((response) => {
        this.$set('data', response.json());
       /* this.response = response.data.object;*/
      }, (response) => {


      });
    },
  data(){
      return{
        data : ''

      }
  }
}


</script>
