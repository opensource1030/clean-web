<template>
  <div>
  <div class="content-right">
    <div class="full-height row">
      <div id="device">
        <div class="header"></div>
        <div class="expanded row">

          <div class="small-12 columns titles">
            <h4>Manage Devices<h4>
            </div>

            <div class="medium-6 columns devicename">
              <label>Title
                <input type="text" placeholder="" :value="d.name" v-model="d.name" >
              </label>
            </div>


            <div class="small-12 columns" >

              <ul  class="acordeon" data-accordion data-allow-all-closed="true" v-f-accordion>
                <li class="acordeon-item  is-active" data-accordion-item  v-f-accordion>
                  <a href="#" class="accordion-title"  @click="showFalse()" >Device Overview</a>
                  <div class="accordion-content overview"  data-tab-content   v-f-accordion>
                    <div class="row">
                      <div class="small-2 columns">
                        <img class="phoneImg" :src="image.url" alt="Photo Devices" />

                        <label for="FileUpload" class="button large" >Upload File</label>
                        <input type="file" id="FileUpload" @change="onFileChange"  class="show-for-sr">
                      </div>

                        <div class="small-6   columns ">
                        <label>identification
                          <input type="text" placeholder="" :value="d.id" v-model="d.id">
                        </label>
                        <label>Device Type
                          <select v-model="d.type">
                            <option v-for="devicet in deviceType.data"   :value="devicet.id" >{{devicet.attributes.make}}---{{devicet.attributes.model}}---{{devicet.attributes.class}}</option>

                          </select>
                        </label>

                      </div>

                      <div class="small-10  columns">
                        <label>Tecnical Information
                          <textarea rows="8"  :value="d.description" v-model="d.description" ></textarea>
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
                              <input type="text" :value="gigas"  v-model="gigas" placeholder="Custom">
                            </label>
                          </div>
                          <div class="small-6 columns">
                            <a   @click="capacit()"class="button tiny">Add</a>
                          </div>
                        </div>

                        <div class="checkbox" v-for="capacitys in filterByModifications(modifications.data,'capacity') " >
                          <label  >
                            <input type="checkbox"  :value="capacitys" id="modi" v-model="vCapacity" :checked="capacitys.check" >
                            <span class="custom-checkbox"><i class="icon-check"></i></span>
                            {{capacitys.attributes.value}}
                          </label>
                        </div>

                      </div>
                      <div class="small-4 columns end">
                        <div class="row">
                          <div class="small-6 columns">
                            <label style=" font-weight: bold;" >Style
                              <input type="text" :value="color" v-model="color" placeholder="Custom">
                            </label>
                          </div>
                          <div class="small-6 columns">
                            <a  @click="colors()" class="button tiny">Add</a>
                          </div>
                        </div>

                        <div class="checkbox" v-for="styles in filterByModifications(modifications.data,'style')"  >
                          <label>
                            <input type="checkbox"  :value="styles"  id="st" v-model="vStyles" :checked="styles.check">
                            <span class="custom-checkbox"><i class="icon-check"></i></span>
                            {{styles.attributes.value}}
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
                      <div class="crop"  v-for="carrier in carriers.data"  >

                        <label   class="static"    >
                          <input type="checkbox"  :value="carrier"   @click="changeStatusCarrier('active',$index)"  v-model="vCarriers"   :checked="carrier.check" >

                        </label>
                      </div>


                    </div>
        <ul class="pagination" role="navigation" aria-label="Pagination">
  <li class="pagination-previous"><a>Previus</a></li>
  <li >Page <div class="current" >1</div> of <div class="current" >3</div> </li>
  <li class="pagination-next"><a>Next</a></li>
</ul>

                  </div>
                </li>
                <li class="acordeon-item " data-accordion-item  v-f-accordion>
                  <a href="#" class="accordion-title" @click="showFalse()"   >Companies</a>
                  <div class="accordion-content companies"  data-tab-content   v-f-accordion>
                    <div class="row">
                      <div class="small-6 columns find">
                        <label id="bl" >Find Company
                          <input type="text" placeholder="Google"  v-model="companyFilter" >
                        </label>
                      </div>
                      <div class="small-6 columns">
                        <a id="bl" class="button secondary"  >Find Company</a>
                      </div>

                    </div>
                    <div class="row">
                      <div class="small-4 columns"  >
                        <div class="checkbox"  v-for="company in companies.data  "   >
                          <label>
                            <input    type="checkbox"   :value="company" id="commpa" v-model="vCompanies" :checked="company.check" >
                            <span class="custom-checkbox"><i class="icon-check"></i></span>
                            {{company.attributes.name}}
                          </label>
                        </div>

                      </div>

                <!--      <div class="small-2  small-offset-1   columns">
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
                      </div>-->
                    </div>

                  </div>
                </li>
                <li class="acordeon-item prices" data-accordion-item  v-f-accordion>
                  <a  href="#"  class="accordion-title" @click="toggle()"  >   Prices  </a>
                  <div class="filterprices" v-show="show">
                    <select class="form-control" v-model="filter.capacity" >
                      <option value="" filter.capacity>Capacity</option>
                      <option  v-for="capacity in vCapacity" :value="capacity.attributes.value" >{{capacity.attributes.value}}</option>
                    </select>
                    <select class="form-control"  v-model="filter.style">
                      <option value="" filter.style>Style</option>
                      <option value="" v-for="style in vStyles" :value="style.attributes.value"  >{{style.attributes.value}}</option>
                    </select>
                    <select class="form-control" v-model="filter.carrier" >
                      <option value="" filter.carrier>Carrier</option>
                      <option value="" v-for="carrier in vCarriers" :value="carrier.attributes.presentation" >{{carrier.attributes.presentation}}</option>
                    </select>
                    <select class="form-control"  v-model="filter.company">
                      <option value="" filter.company>Company</option>
                      <option  v-for="company in vCompanies"   :value="company.attributes.name">{{company.attributes.name}}</option>
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
                          <td  ><div>{{filter.capacity}}</div></td>
                          <td ><div>{{filter.style}}</div></td>
                          <td ><div>{{filter.carrier}}</div></td>
                          <td  ><div>{{filter.company}}</div></td>
                        </tr>
                      </tbody>
                      <tbody>
                        <tr  v-for="p in findByPrices(priceTable,filter) " >
                          <td ><div class="input-group"><span class="input-group-label">$</span><input class="input-group-field" type="text"  :value="p.priceRetail" @keyup="updateRetail($index,$event)"  ></div></td>
                          <td><div class="input-group"><span class="input-group-label">$</span><input class="input-group-field" type="text"  :value="p.price1"  @keyup="updateOne($index,$event)"  ></div></td>
                          <td><div class="input-group"><span class="input-group-label">$</span><input class="input-group-field" type="text" :value="p.price2" @keyup="updateTwo($index,$event)"  ></div></td>
                          <td><div class="input-group"><span class="input-group-label">$</span><input class="input-group-field" type="text"  :value="p.priceOwn" @keyup="updateOwn($index,$event)"  ></div></td>
                          <td><div class="features">{{p.capacity.attributes.value}}</div></td>
                          <td><div class="features">{{p.style.attributes.value}}</div></td>
                          <td><div class="features">{{p.carrier.attributes.presentation}}</div></td>
                          <td style=" font-weight: bold;"><div class="features">{{p.company.attributes.name}}</div></td>
                        </tr>
                      </tbody>

                    </table>
                  </div>

                </li>

              </ul>

              <a  class="button large" @click="submit()" id="button">Save Changes</a>

            </div>
          </div>
        </div>
      </div>
</template>
<script>
import Vue from 'vue'
import device from './../../api/device/device';
import { findByPrices,filterByModifications} from './../filters.js'
Vue.directive('f-accordion', {
    bind: function(el) {
        Vue.nextTick(function() {
            $(el).foundation();
        })
    }
});
export default {
    name: "Device",
    created(){
        device.getDevice(this,this.companyFilter);
        this.id = this.$route.params.id;
           if(this.id!=null ){
           device.getDataDevice(this,this.id)
        }
   },
    computed: {
        priceTable: function() {
              if(this.priceData.length>0 && this.vCompanies.length > 0 && this.vStyles.length > 0 && this.vCapacity.length > 0 && this.vCarriers.length > 0 ){
               this.pricess=[];
                var a = false;
                for(let price of this.priceData){
                  for(let companys of this.vCompanies){
                    var  co=false;
                          if(companys.id==price.companyId){
                            price = Object.assign({}, price, {
                              company:companys,
                            });
                            co=true;
                            break;
                          }
                  }
                  for(let styles of this.vStyles ){
                    var st =false;
                      if(styles.id==price.styleId){
                        price = Object.assign({}, price, {
                          style:styles,
                        });
                        st=true;
                        break;
                      }
                    }
                    for(let capacitys of this.vCapacity){
                    var  cy=false;
                      if(capacitys.id==price.capacityId){
                        price = Object.assign({}, price, {
                          capacity:capacitys,
                        });
                          cy=true;
                          break;
                      }
                    }
                  for(let carriers of this.vCarriers){
                    var ca=false;
                    if(carriers.id==price.carrierId){
                      price = Object.assign({}, price, {
                        carrier:carriers,
                      });
                      ca=true;
                      break;
                    }
                  }
                  if(ca==true && cy==true && st==true && co==true){
                      this.pricess.push(price);
                  }
                }
                for (let companies of  this.vCompanies) {
                    for (let styles of this.vStyles) {
                        for (let capacitys of this.vCapacity) {
                            for (let carriers of this.vCarriers) {
                                this.company = Object.assign({}, this.company, {
                                    style: styles,
                                    capacity: capacitys,
                                    carrier: carriers,
                                    company:companies,
                                    id:0,
                                    priceRetail:0,
                                    price1:0,
                                    price2:0,
                                    priceOwn:0
                                });
                              this.price.push(this.company);
                            }
                        }
                    }
                }
                for (let pri of this.price){
                  var b=true;
                    for(let p of this.pricess){
                      if(JSON.stringify(pri.style)==JSON.stringify(p.style) && JSON.stringify(pri.capacity)==JSON.stringify(p.capacity) && JSON.stringify(pri.company)==JSON.stringify(p.company) && JSON.stringify(pri.carrier)==JSON.stringify(p.carrier)){
                        b=false;
                          break;
                      }
                    }
                    if(b==true){
                      this.pricess.push(pri);
                    }
                }
                return this.pricess;
              }
            else{
            if (this.vCompanies.length > 0 && this.vStyles.length > 0 && this.vCapacity.length > 0 && this.vCarriers.length > 0) {
                this.price = []
                for (let companies of  this.vCompanies) {
                    for (let styles of this.vStyles) {
                        for (let capacitys of this.vCapacity) {
                            for (let carriers of this.vCarriers) {
                                this.company = Object.assign({}, this.company, {
                                  style: styles,
                                  capacity: capacitys,
                                  carrier: carriers,
                                  company:companies,
                                  priceRetail:0,
                                  price1:0,
                                  price2:0,
                                  priceOwn:0
                                });
                                this.price.push(this.company);
                            }
                        }
                    }
                }
                return this.price;
            }
             else {
                return '';
            }
            }
        },
    },
    methods: {
   findByPrices,
  filterByModifications,
        submit:function(){
        if(this.id!=null ){
            device.updateDevice(this.id,this,this.pricePost,this.vStyles,this.vCapacity,this.vCarriers,this.vCompanies,this.d,this.image);
        }
else{
       device.addDevice(this,this.pricePost,this.vStyles,this.vCapacity,this.vCarriers,this.vCompanies,this.d,this.image);
}
        },
        checkcarrier:function(){
          var vm=this;
          this.$nextTick(function() {
              var i=0;
              for(let carrier of vm.carriers.data){
                    if(carrier.check=='checked'){
                      vm.changeStatusCarrier('active',i);
                    }
                i++;
              }
               });
        },
       updateRetail:function(i,e){
         var value = e.target.value;
         console.log(value);
     var price = this.pricePost[i];
     var extending = Object.assign( {}, price, {retail: value} );
     this.pricePost.$set(i, extending);
   },
   updateOne:function(i,e){
     var value = e.target.value;
 var price = this.pricePost[i];
 var extending = Object.assign( {}, price, {priceOne: value} );
 this.pricePost.$set(i, extending);
},
updateTwo:function(i,e){
  var value = e.target.value;
var price = this.pricePost[i];
var extending = Object.assign( {}, price, {priceTwo: value} );
this.pricePost.$set(i, extending);
},
updateOwn:function(i,e){
  var value = e.target.value;
var price = this.pricePost[i];
var extending = Object.assign( {}, price, {Own: value} );
this.pricePost.$set(i, extending);
},
        toggle: function() {
            this.show = !this.show;
  this.pricePost=[];
            if(this.id!=null){
              for(let price of this.pricess){
                      console.log(price)
                    this.pricePost.push(price);
              }
            }else{
            for(let price of this.price){
                  this.pricePost.push(price);
            }
          }
        },
        showFalse: function() {
            this.show = false;
        },
        onFileChange(e) {
            var files = e.target.files || e.dataTransfer.files;
                var formData = new FormData();
                formData.append('filename', files[0]);
                device.createImage(this,formData);
        },
        changeStatusCarrier: function(className,index) {
          var el = document.getElementsByClassName('static')[index]
            el.classList.toggle(className)
        },
        capacit: function() {
            if (this.gigas == "" || this.gigas == null) {
                this.error = "Incorrect value Capacity"
            } else {
                this.error = "";
              var  addModification={
                  value:this.gigas,
                  type:'capacity'
                }
                  device.addModifications(this,addModification);
            }
        },
        colors: function() {
            if (this.color == "" || this.color == null) {
                this.error = "Incorrect value Style"
            } else {
                this.error = "";
                var  addModification={
                    value:this.color,
                    type:'style'
                  }
                    device.addModifications(this,addModification);
            }
        }
    },
    data() {
        return {
              /*image default device*/
            image: {
                url:"/assets/logo.png",
                id:0
            },
            /*Values checkboxes*/
            vCarriers: [],
            vStyles: [],
            vCompanies:[],
            vCapacity:[],
            /*filter */
            filter:{capacity:'',style:'',carrier:'',company:''},
            companyFilter:'*',
            d:{
              name:'',
              description:'',
              id:null,
              type:0
            },
            /*add modifications*/
            id:null,
            priceData:[],
            gigas: '',
            color: '',
            /*Api arrays*/
            carriers: [],
            companies: [],
            modifications:[],
            deviceType:[],
            /*paginations*/
            pageCarriers:1,
            pageCompanies:1,
            /*table price*/
            price: [],
            pricess:[],
            pricePost:[],
            company: {},
            /*errors*/
            error: '',
            /*css modificacions*/
            show: false,
            shadow: "initial",
        }
    }
}
</script>
