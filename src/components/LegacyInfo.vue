
<template>
  <div>
  <transition name="fade">
  <div class="callout spent-info" v-bind:class="{ active: isActive, 'visible': popOver }">
    <div class="pop-content" v-if="token">
        <div class="expanded row">
          <div class="columns large-12">
            <a @click="closePop()" class="button btn-orange pop-close"> <i class="fa fa-arrow-left"> </i> </a>

            <hr class="hr-cln">

          </div>
          <div class="small-12 columns">
            <iframe  id="legacy-info" :src="iframeUrl" > </iframe>
          </div>
        </div>
      </div>
</div>
</transition>
    </div>
</template>
<script>
  import auth from './../api/auth'
  var {Store} = require('yayson')()
  var    store = new Store()

export default {
    name: "LegacyInfo",
  beforeCreate() {
    Event.$on('provision', (title)=>  {
      this.popOver = true,
      this.company = title;

    });
  },
  computed:{
      iframeUrl : function (){
          return "http://app.wirelessanalytics.com/helpdesk/r_1.asp?company="+this.company+"&token="+this.token+"&email="+this.user.email+"&ref=v4"
      }
  },
  data(){
    return {
      isActive: true,
      popOver : false,
      token: localStorage.token,
      user: auth.user,
      company: '',

    }
  },
  methods:{
    closePop(){
       this.popOver = false;
    }
  }
}
</script>
