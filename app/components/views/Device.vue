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
      <li class="acordeon-item  is-active" data-accordion-item  v-f-accordion>
        <a href="#" class="accordion-title"  @click="showFalse()" >Device Overview</a>
        <div class="accordion-content overview"  data-tab-content   v-f-accordion>
          <div class="row">
<div class="small-2 columns">
            <img class="phoneImg" :src="image" alt="Photo Iphone 6" />

          <label for="FileUpload" class="button large" >Upload File</label>
<input type="file" id="FileUpload" @change="onFileChange"  class="show-for-sr">
          </div>
          <div class="small-10 columns">
            <label>Tecnical Information
              <textarea rows="8" ></textarea>
              </label>
            </div>
            </div>
          </div>


      </li>

      <li class="acordeon-item  " data-accordion-item  v-f-accordion>
        <a href="#" class="accordion-title" @click="showFalse()"  >Modifications</a>
        <div class="accordion-content  modifications"  data-tab-content   v-f-accordion>
          <div class="row">
            <div v-if="error" v-show="error">
          <div   class="is-error callout" data-closable >
            <div class="container">
              <h5>{{error}}</h5>
            </div>

          </div>
            </div>
            <div class="small-4 columns">
              <div class="row">


                <div class="small-6 columns">

                        <label style=" font-weight: bold;" >Capacity
                  <input type="text" :value=""  v-model="gigas" placeholder="Custom">
                  </label>
                </div>
                <div class="small-6 columns">
                  <a   @click="capacit()"class="button tiny">Add</a>
                </div>
                </div>

                <div class="checkbox" v-for="modi in json.modifications.capacity "  track-by="$index">
                       <label  >
                         <input type="checkbox"  :value="modi" id="modi" v-model="capacity" >
                         <span class="custom-checkbox"><i class="icon-check"></i></span>
                         {{modi}}
                       </label>
                     </div>

              </div>
              <div class="small-4 columns end">
          <div class="row">
            <div class="small-6 columns">
                    <label style=" font-weight: bold;" >Style
              <input type="text" :value="" v-model="color" placeholder="Custom">
              </label>
            </div>
            <div class="small-6 columns">
              <a  @click="colors()" class="button tiny">Add</a>
            </div>
            </div>
            <div class="checkbox" v-for="styles in json.modifications.style "  track-by="$index" >
                   <label>
                     <input type="checkbox"   :value="styles" id="styles" v-model="style" >
                     <span class="custom-checkbox"><i class="icon-check"></i></span>
                    {{styles}}
                   </label>
                 </div>


                </div>
        </div>
        </div>
      </li>
      <li class="acordeon-item " data-accordion-item  v-f-accordion>
        <a href="#" class="accordion-title" @click="showFalse()" >Carriers</a>
        <div class="accordion-content carriers"  data-tab-content   v-f-accordion>
            <div class="imagescheck">
              <div class="crop"  v-for="carrier in json.carriers"  >

          <label   class="static" :class="{ 'active':carrier.va }"  :style="{ backgroundImage: 'url(' + carrier.image + ')' }"  >
            <input type="checkbox"  @click="t($index)" :value="carrier.name"  :style="{ backgroundImage: 'url(' + carrier.image + ')' }" name="" id="carrier.name" v-model="carrierss"   >

          </label>
        </div>

        </div>

        </div>
      </li>
      <li class="acordeon-item " data-accordion-item  v-f-accordion>
        <a href="#" class="accordion-title" @click="showFalse()"   >Companies</a>
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
              <div class="small-2 columns"  >
                <div class="checkbox"  v-for="company in json.companies "   >
                  <label>
                    <input  @click=""   type="checkbox"   :value="company" id="commpa" v-model="compa"  >
                    <span class="custom-checkbox"><i class="icon-check"></i></span>
                   {{company.name}}
                  </label>
                     </div>




            </div>

            <div class="small-2  small-offset-1   columns">
              <ul style=" font-weight: bold;"    >
              <li v-for="company in json.companies"   >{{company.price}}</li>


          </ul>
          </div>
              <div class="small-2 columns">
                <ul  >
                <li v-for="company in json.companies" >{{company.author}}</li>
            </ul>
                  </div>
                  <div class="small-2 columns end">
                    <ul>
                    <li v-for="company in json.companies"  >{{company.code}}</li>

                </ul>
                      </div>
          </div>

        </div>
      </li>
      <li class="acordeon-item prices" data-accordion-item  v-f-accordion>
       <a  href="#"  class="accordion-title" @click="toggle()"  >   Prices  </a>
       <div class="filterprices" v-show="show">
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
   <div   class="accordion-content"  data-tab-content   v-f-accordion>
          <table  >
            <tbody>
              <tr class="filter">
                  <td><div>Retail Price</div></td>
                <td><div>1 year contact</div></td>
                <td ><div>2 years contract</div></td>
                <td  ><div>Pay by own</div></td>
                <td  ><div></div></td>
                <td ><div></div></td>
                <td ><div></div></td>
                <td  ><div></div></td>
              </tr>
            </tbody>
<tbody>
  <tr  v-for="p in priceTable" track-by="$index">
    <td ><div class="input-group"><span class="input-group-label">$</span><input class="input-group-field" type="number"     ></div></td>
    <td><div class="input-group"><span class="input-group-label">$</span><input class="input-group-field" type="number"></div></td>
    <td><div class="input-group"><span class="input-group-label">$</span><input class="input-group-field" type="number"></div></td>
    <td><div class="price">{{p.price}}</div></td>
    <td><div class="features">{{p.capacity}}</div></td>
  <td><div class="features">{{p.style}}</div></td>
    <td><div class="features">{{p.carrier}}</div></td>
    <td style=" font-weight: bold;"><div class="features">{{p.name}}</div></td>
  </tr>

</tbody>

</table>
</div>

      </li>

    </ul>

    <a href="#" class="button large" id="button">Save Changes</a>

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
    computed: {
        priceTable: function () {



if(this.compa.length>0 || this.style.length>0 || this.capacity.length>0 || this.carrierss.length>0 ){
  this.price=[]
  var style=[];



   for (let i = 0; i < this.compa.length ; i++) {
     this.company=this.compa[i];

           for (var j = 0; j < this.style.length; j++) {

                 for (var c=0; c<this.capacity.length;  c++){

                   for(var ca=0; ca<this.carrierss.length; ca++){

                      this.company = Object.assign({}, this.company, { style: this.style[j],capacity:this.capacity[c],carrier:this.carrierss[ca]});
                        this.price.push(this.company);

                   }

                 }

                }
}


                return this.price;
}

else{
  return '';
}


    }
  },

    methods: {
      toggle: function () {
           this.show = !this.show;






       },
       showFalse:function () {
         this.show=false;
        },

        onFileChange(e) {
     var files = e.target.files || e.dataTransfer.files;
     if (!files.length)
       return;
     this.createImage(files[0]);
   },
   createImage(file) {
     var image = new Image();
     var reader = new FileReader();
     var vm = this;

     reader.onload = (e) => {
       vm.image = e.target.result;
     };
     reader.readAsDataURL(file);
   },
   t:function(index){


     this.json.carriers[index].va= !this.json.carriers[index].va;


   },
   capacit:function(){
        if(this.gigas=="" || this.gigas==null){
              this.error="Incorrect value Capacity"
        }
     else{
       this.error="";
     this.json.modifications.capacity.push(this.gigas);
   }

 },
  colors:function(){
    if(this.color=="" || this.color==null){
          this.error="Incorrect value Style"
    }
 else{
   this.error="";
 this.json.modifications.style.push(this.color);
}

  }

    },



    data() {

      return {


             image: "http://apple.universia.es/wp-content/uploads/2014/09/iPhone-6-oro-555-741.jpg",
             carrierss:[],
             priceValue:[],
             style:[],
             capacity:[],
             compa:[],
             price:[],
             gigas:'',
             color:'',
             company:{},
             sty:{},

             error:'',
             show:false,
             shadow:"initial",
             json:{
                modifications:{
                        capacity:['8gb','16gb','32gb','64gb','128gb'],
                        style:['white','silver','space grey','rose Gold']

                },

                carriers:[
                  {
                name:'at&t',
                image:"http://apple.universia.es/wp-content/uploads/2014/09/iPhone-6-oro-555-741.jpg",
                va:false
              },
              {
              name:'Sprint',
              image:"http://apple.universia.es/wp-content/uploads/2014/09/iPhone-6-oro-555-741.jpg",
              va:false

            },
            {
              name:'t-Mobile',
              image:"http://apple.universia.es/wp-content/uploads/2014/09/iPhone-6-oro-555-741.jpg",
              va:false
          },
          {
            name:'Verizon',
            image:"http://apple.universia.es/wp-content/uploads/2014/09/iPhone-6-oro-555-741.jpg",
            va:false
          }
          ],
                companies:[
                  {
                    name:'thermotronic',
                    price:'$538',
                    author:'Antonio Olson',
                    code:'880-012-5128',

                  },
                  {
                    name:'Cocoa',
                    price:'$538',
                    author:'Alfred Graves',
                    code:'880-012-5128',

                  },
                  {
                    name:'Pepsi',
                    price:'$538',
                    author:'LydIA fRANK',
                    code:'880-012-5128',

                  }

                ]

             },




      }
    }


}


</script>
