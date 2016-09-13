<template>
<div class="content-right" >
  <div class="full-height row">
  <div id="device">
<div class="header"></div>


     <div class="small-12 columns titles" >
      <h4>Manage Devices<h4>
        </div>

          <div class="medium-6 columns">
            <label>Title
              <input type="text" placeholder="">
            </label>
          </div>



  <div class="small-12 columns" >
    <div  v-for="tab in tabs">
      <div class="header panel-heading"  >
           <h3 class="panel-title"></h3>

      </div>
      <div class="content">
        Lorem ipsum...
              <br/>Lorem ipsum...
              <br/>Lorem ipsum...
              <br/>Lorem ipsum...
              <br/>Lorem ipsum...
              <br/>

      </div>
  </div>


  </div>
</div>
</div>
</div>

</template>
<script>
import Vue from 'vue'
import VueAnimatedList from 'vue-animated-list'
Vue.use(VueAnimatedList)



export default {
    name: "Device",

    created(){


    },

    ready(){

    },
    methods: {
      setActive: function(index) {


        this.active = index;

        if(this.tabs[this.active].show==true){
              this.tabs[this.active].show=false;


        }
        else{

              for (var i = 0; i < this.tabs.length ; i++) {
                  if(this.tabs[this.active]==this.tabs[i]){
                      this.tabs[this.active].show=true;
                      }else{
                            this.tabs[i].show=false;

                            }
                                }
                      }
      }

    },


    data() {

      return {

          active: 0,
          tabs:[
            {
            show:false

            },
          {
            show:false

          },
          {
            show:false

          },
          {
            show:false

          },
          {
            show:false

          },

        ]

      }
    }


}


</script>
