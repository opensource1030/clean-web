<template>
<div class="content-right" >
  <div class="full-height row">
  <div id="device">
<div class="header"></div>
<div class="expanded row">

     <div class="small-12 columns titles" >
      <h4>Manage Devices<h4>
        </div>

        <div class="medium-6 columns devicename">
          <label>Title
            <input type="text" placeholder="">
          </label>
        </div>


  <div class="small-12 columns" >


    <ul  class="acordeon" data-accordion data-allow-all-closed="true" v-f-accordion>
      <li class="acordeon-item" data-accordion-item  v-f-accordion>
        <a href="#" class="accordion-title">Device Overview</a>
        <div class="accordion-content overview"  data-tab-content   v-f-accordion>
          <div class="row">
<div class="small-2 columns">
            <img class="phoneImg" src="http://apple.universia.es/wp-content/uploads/2014/09/iPhone-6-oro-555-741.jpg" alt="Photo Iphone 6" />
              <a class="button large">Upload photo</a>
          </div>
          <div class="small-10 columns">
            <label>Tecnical Information
              <textarea rows="8" ></textarea>
              </label>
            </div>
            </div>
          </div>


      </li>

      <li class="acordeon-item " data-accordion-item  v-f-accordion>
        <a href="#" class="accordion-title">Modifications</a>
        <div class="accordion-content  modifications"  data-tab-content   v-f-accordion>
          <div class="row">
            <div class="small-4 columns">
              <div class="row">
                <div class="small-6 columns">
                        <label>Capacity
                  <input type="text" placeholder="Custom">
                  </label>
                </div>
                <div class="small-6 columns">
                  <a  class="button tiny">Add</a>
                </div>
                </div>

                <div class="checkbox">
                       <label>
                         <input type="checkbox"  value="32gb" id="32gb" v-model="capacity" checked>
                         <span class="custom-checkbox"><i class="icon-check"></i></span>
                         32gb
                       </label>
                     </div>
                     <div class="checkbox">
                            <label>
                              <input type="checkbox" value="64gb" id="64gb" v-model="capacity"  checked>
                              <span class="custom-checkbox"><i class="icon-check"></i></span>
                              64gb
                            </label>
                          </div>
              </div>
              <div class="small-4 columns end">
          <div class="row">
            <div class="small-6 columns">
                    <label>Style
              <input type="text" placeholder="Custom">
              </label>
            </div>
            <div class="small-6 columns">
              <a  class="button tiny">Add</a>
            </div>
            </div>
            <div class="checkbox">
                   <label>
                     <input type="checkbox"   value="black" id="black" v-model="style" checked>
                     <span class="custom-checkbox"><i class="icon-check"></i></span>
                    Black
                   </label>
                 </div>
                 <div class="checkbox">
                        <label>
                          <input type="checkbox" value="yelow"  id="yellow" v-model="style" checked>
                          <span class="custom-checkbox"><i class="icon-check"></i></span>
                          Yelow
                        </label>
                      </div>

                </div>
        </div>
        </div>
      </li>
      <li class="acordeon-item " data-accordion-item  v-f-accordion>
        <a href="#" class="accordion-title">Carriers</a>
        <div class="accordion-content carriers"  data-tab-content   v-f-accordion>
            <div class="imagescheck">

          <label :style="{ backgroundImage: 'url(' + image + ')',width:'120px',height:'120px' }"  >
            <input type="checkbox" value="ac"   :style="{ backgroundImage: 'url(' + image + ')',width:'120px',height:'120px' }" name="" id="ac" v-model="carriers"   >

          </label>
          <label :style="{ backgroundImage: 'url(' + image + ')',width:'120px',height:'120px' }"  >
            <input type="checkbox" value="Mike"  :style="{ backgroundImage: 'url(' + image + ')',width:'120px',height:'120px' }" name="" id="mike" v-model="carriers"   >

          </label>
        </div>

        </div>
      </li>
      <li class="acordeon-item " data-accordion-item  v-f-accordion>
        <a href="#" class="accordion-title">Companies</a>
        <div class="accordion-content companies"  data-tab-content   v-f-accordion>
          <div class="row">
            <div class="small-6 columns find">
          <label id="bl" >Find Company
            <input type="text" placeholder="Google">
            </label>
              </div>
              <div class="small-6 columns">
                            <a id="bl" class="button secondary">Find Company</a>
                          </div>

        </div>
          <div class="row">
              <div class="small-2 columns">
                <div class="checkbox">
                       <label>
                         <input type="checkbox" name="" id="checkbox1" checked>
                         <span class="custom-checkbox"><i class="icon-check"></i></span>
                         Default
                       </label>
                     </div>
                     <div class="checkbox">
                            <label>
                              <input type="checkbox" name="" id="checkbox1" checked>
                              <span class="custom-checkbox"><i class="icon-check"></i></span>
                              Default
                            </label>
                          </div>
                          <div class="checkbox">
                                 <label>
                                   <input type="checkbox" name="" id="checkbox1" checked>
                                   <span class="custom-checkbox"><i class="icon-check"></i></span>
                                   Default
                                 </label>
                               </div>

            </div>

            <div class="small-2  small-offset-1   columns">
              <ul>
              <li>399$</li>
                <li>499$</li>
                  <li>599$</li>
                    <li>600$</li>
                    <li>999$</li>
                      <li>999$</li>

          </ul>
          </div>
              <div class="small-2 columns">
                <ul>
                <li>Mateo Bistuer</li>
                  <li>Mateo Bistuer</li>
                    <li>Mateo Bistuer</li>
                      <li>Mateo Bistuer</li>
                      <li>Mateo Bistuer</li>
                        <li>Mateo Bistuer</li>

            </ul>
                  </div>
                  <div class="small-2 columns end">
                    <ul>
                    <li>666-666-6666</li>
                      <li>666-666-6666</li>
                        <li>666-666-6666</li>
                          <li>666-666-6666</li>
                          <li>666-666-6666</li>
                            <li>666-666-6666</li>

                </ul>
                      </div>
          </div>

        </div>
      </li>
      <li class="acordeon-item prices" data-accordion-item  v-f-accordion>
       <a  href="#"  class="accordion-title"  >   Prices  </a>
       <div class="filterprices">
    <select class="form-control"  >
         <option value="" selected>Capacity</option>
         <option value=""></option>
     </select>
     <select class="form-control"  >
          <option value="" selected>Style</option>
          <option value=""></option>
      </select>
      <select class="form-control"  >
           <option value="" selected>Carrier</option>
           <option value=""></option>
       </select>
       <select class="form-control"  >
            <option value="" selected>Company</option>
            <option value=""></option>
        </select>

   </div>
        <div class="accordion-content"  data-tab-content   v-f-accordion>
          <table>

<tbody>
  <tr>
    <td>Content Goes Here</td>
  <td>Content Goes Here</td>
    <td>Content Goes Here</td>
    <td>Content Goes Here</td>
    <td>Content Goes Here</td>
  <td>Content Goes Here</td>
    <td>Content Goes Here</td>
    <td>Content Goes Here</td>
  </tr>

</tbody>
</table>



        </div>
      </li>



    </ul>



</div>
</div>
</div>

</template>
<script>
import Vue from 'vue'

Vue.directive('f-accordion', {

bind: function () {

    var self = this;

    Vue.nextTick(function () {

        $( self.el ).foundation();
    })

}
});


export default {
    name: "Device",

    created(){


    },

    ready(){



    },
    methods: {

    },


    data() {

      return {


             image: "https://fixwoozone-nvitotech1.netdna-ssl.com/wp-content/uploads/2015/08/ATT-logo-.png",
             carriers:[],
             style:[],
             capacity:[]




      }
    }


}


</script>
