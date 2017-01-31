<template>

  <div class="content-right">
    <div class="full-height row">
      <div id="device">
        <div class="header"></div>
        <div class="expanded row">
          <modal v-if="showModal" @close="showModal = false">

    <h3 slot="body">{{message}}</h3>
  </modal>

          <div class="small-12 columns titles">
            <h4>Manage Devices<h4>
            </div>

            <div class="medium-6 columns devicename">
              <label>Device Name
                <input type="text" placeholder="" :value="d.name" v-model="d.name" >
              </label>
            </div>

            <div  class="small-12 columns" >

              <ul  class="acordeon" data-accordion data-allow-all-closed="true" v-f-accordion>
                <li class="acordeon-item  is-active" data-accordion-item  v-f-accordion>
                    <a href="#" class="accordion-title"  @click="showFalse()" >Device Overview</a>
                    <div class="accordion-content overview"  data-tab-content   v-f-accordion>
                      <div class="column row">
                        <div class="row">
                          <div class="small-12 large-2 columns">
                        <img  class="phoneImg" :src="image.url" alt="Photo Devices" />
                        <label for="FileUpload" class="button large" >Upload File</label>
                        <input type="file" id="FileUpload" @change="onFileChange"  class="show-for-sr">
                      </div>

                          <div class="small-12 large-10 columns">
  <div class="row">
                        <div class="large-3 small-12   columns ">
                          <label  >Default Price
                            <inputValidate class="capacitys" :value="d.defaultPrice"   v-model="d.defaultPrice"></inputValidate>
                          </label>
                            </div>
                              <div class="small-12 large-3   columns ">
                                <label> <span class="hide-for-small">&nbsp; </span>
                                  <select v-model="d.money" >
                                    <option value="USD"  >USD</option>
                                    <option value="GBP"  >GBP</option>
                                      <option value="EUR"  >EUR</option>
                                  </select>
  </label>
                              </div>
                              <div class="small-12 large-6  columns ">
                          <label>Device Type
                            <select v-model="d.type" >
                              <option :value="null"  >Select Type</option>
                              <option v-for="devicet in deviceType.data"   :value="devicet.id" >{{devicet.attributes.name}}</option>
                            </select>
                          </label>
                        </div>
    <div class="clearfix"> </div>
                        <div class="small-12 large-6    columns ">
                          <label>Manufactured
                            <input type="text" placeholder="" :value="d.make" v-model="d.make">
                          </label>
                            </div>
                            <div class="small-12  large-6    columns ">
                              <label>Model
                                <input type="text" placeholder="" :value="d.model" v-model="d.model">
                              </label>
                              </div>
    <div class="clearfix"> </div>
                        <div class="small-12 large-12  columns">
                          <label>Tecnical Information
                            <textarea rows="6"  :value="d.description" v-model="d.description" ></textarea>
                          </label>
                        </div>
  </div>
                            </div>
                      </div>
                    </div>
                    </div>
                  </li>

                <li class="acordeon-item  " data-accordion-item  v-f-accordion>
                  <a href="#" class="accordion-title" @click="showFalse()"  >Atributes</a>
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
                              <inputValidate class="capacitys" placeholder="Custom"   v-model="gigas"></inputValidate>
                            </label>
                          </div>
                          <div class="small-4 columns money">

                              <select v-model="units" >
                                <option value="Tb" >TB</option>
                                <option value="Gb" >GB</option>
                                <option value="Mb">MB</option>
                              </select>



                          </div>
                          <div class="small-2 columns end">
                              <a   @click="capacit()"class="button tiny">Add</a>
                          </div>
                        </div>

                        <div class="checkbox" v-for="capacitys in mCapacity "  >
                          <label  >

                            <input type="checkbox"   id="modi" v-model="capacitys.check" >

                            <span class="custom-checkbox"><i class="icon-check"></i></span>
                            {{capacitys.attributes.value}}
                          </label>
                        </div>

                      </div>
                      <div class="small-4 columns end">
                        <div class="row">
                          <div class="small-6 columns">
                            <label style=" font-weight: bold;" >Color
                              <input type="text" :value="color" v-model="color" placeholder="Custom">
                            </label>
                          </div>
                          <div class="small-6 columns">
                            <a  @click="colors()" class="button tiny">Add</a>
                          </div>
                        </div>

                        <div class="checkbox" v-for="styles in mStyle"  >
                          <label>
                            <input type="checkbox"    id="st" v-model="styles.check">
                            <span class="custom-checkbox"><i class="icon-check"></i></span>
                            {{styles.attributes.value}}
                          </label>
                        </div>

                      </div>
                    </div>
                  </div>
                </li>
                <li class="acordeon-item " data-accordion-item  v-f-accordion>
                  <a href="#" class="accordion-title" @click="showFalse()" >Vendors</a>
                  <div class="accordion-content carriers"  data-tab-content   v-f-accordion>
                    <div class="imagescheck">
                      <div class="crop"  v-for=" (carrier,index) in carriers.data"  >
                        <!-- :style="{ backgroundImage: 'url('+process.env.URL_API+'/images/' + carrier.images[0].id +')',backgroundSize:'124px,124px' }" -->
                        <label   class="static"   >
                          <input type="checkbox"     @click="changeStatusCarrier('active',index)"  v-model="carrier.check"    >

                        </label>
                      </div>

                    </li>
                    <li class="acordeon-item " data-accordion-item  v-f-accordion>
                      <a href="#" class="accordion-title" @click="showFalse()"   >Companies</a>
                      <div class="accordion-content companies"  data-tab-content   v-f-accordion>
                        <div class="row">
                          <div class="small-6 columns find">
                            <label id="bl" >Find Company
                              <input type="text" placeholder="Search Name"  v-model="companyFilter" >
                            </label>
                          </div>
                          <div class="small-6 columns">
                            <a id="bl" class="button secondary" @click="findCompany()" >Find Company</a>
                          </div>

                        </div>
                        <div class="row">
                          <div class="small-4 columns"  >
                            <div class="checkbox"  v-for="(company,index) in companies.data "   >
                              <label>
                                <input    type="checkbox"    :id="'comp'+index" v-model="company.check"   >
                                <span class="custom-checkbox"><i class="icon-check"></i></span>
                                {{company.attributes.name}}
                              </label>
                            </div>

                          </div>
                        </div>

                      </div>
                    </li>
                    <li class="acordeon-item prices" data-accordion-item  v-f-accordion>
                      <a  href="#"  class="accordion-title"  @click="toggle()" >   Prices  </a>
                      <div class="filterprices" v-show="show">
                        <select class="form-control" v-model="filter.capacity" >
                          <option :value="null" >Capacity</option>
                          <option  v-for="capacity in vCapacity" :value="capacity" >{{capacity.attributes.value}}</option>
                        </select>
                        <select class="form-control"  v-model="filter.style">
                          <option :value="null" >Color</option>
                          <option value="" v-for="style in vStyles" :value="style"  >{{style.attributes.value}}</option>
                        </select>
                        <select class="form-control" v-model="filter.carrier" >
                          <option :value="null" >Vendor</option>
                          <option value="" v-for="carrier in vCarriers" :value="carrier" >{{carrier.presentation}}</option>
                        </select>
                        <select class="form-control"  v-model="filter.company">
                          <option :value="null" >Company</option>
                          <option  v-for="company in vCompanies"   :value="company">{{company.attributes.name}}</option>
                        </select>
                      </div>
                      <div   class="accordion-content"  data-tab-content   v-f-accordion>
                    <!--    <table  >
                          <tbody>
                            <tr class="filter">
                              <td><div>Retail Price</div></td>
                              <td><div>1 year contact</div></td>
                              <td ><div>2 years contract</div></td>
                              <td ><div v-if="filter.capacity!=null && filter.capacity.attributes!=null" >{{filter.capacity.attributes.value}}</div></td>
                              <td ><div v-if="filter.style!=null && filter.style.attributes!=null" >{{filter.style.attributes.value}}</div></td>
                              <td ><div v-if="filter.carrier!=null" >{{filter.carrier.presentation}}</div></td>
                              <td ><div v-if="filter.company!=null && filter.company.attributes!=null" >{{filter.company.attributes.name}}</div></td>

                                  <td  ><div></div></td>
                            </tr>
                          </tbody>
                          <tbody >
                            <tr  v-for="(p,index) in findByPrices(priceTable,filter) " >
                              <td ><div class="input-group"><span class="input-group-label">$</span>  <inputValidate  class="input-group-field"  v-model="p.priceRetail"    ></inputValidate>  </div></td>
                              <td><div class="input-group"><span class="input-group-label">$</span><inputValidate  class="input-group-field"  v-model="p.price1"    ></inputValidate>  </div></td>
                              <td><div class="input-group"><span class="input-group-label">$</span><inputValidate  class="input-group-field"  v-model="p.price2"    ></inputValidate></div></td>
                              <td><div class="input-group"><span class="input-group-label">$</span><inputValidate  class="input-group-field"  v-model="p.priceOwn"    ></inputValidate></div></td>
                              <td><div class="features"><select v-model="p.capacity"><option :value="null" >Select Capacity</option><option v-for="c in p.capacitys" :value="c.id">{{c.attributes.value}}</option></select></div></td>
                              <td><div class="features"><select v-model="p.style" ><option :value="null">Select Style</option><option v-for="s in p.styles" :value="s.id">{{s.attributes.value}}</option></select></div></td>
                              <td><div class="features"><select v-model="p.carrierId"><option :value="null">Select Carrier</option><option v-for="c in p.carriers" :value="c.id">{{c.presentation}}</option></select></div></td>
                              <td ><div class="features"><select v-model="p.companyId"><option :value="null" >Select Company</option><option v-for="co in p.companys" :value="co.id">{{co.attributes.name}}</option></select></div></td>
                                <td ><div class="features"> <a  class="button" @click="adds()" id="button"  >
                                              <i class="fa fa-plus" ></i>
                                      </a></div></td>
                            </tr>
                          </tbody>
                        </table>-->
                    <!--    <div class="row">
                            <div class="large-3 small-12">

                            </div>
                            <div class="large-3 small-12">

                            </div>-->

                            <div class="column row "  v-for="(p,index) in findByPrices(priceTable,filter) "            :style="{ backgroundColor:color }">
                              <div class="row">
                              <div class="small-12 large-2 columns">
                                <img class="phoneImg"  :src="p.imageVariations.url" alt="Photo Devices" />

                                <input type="file" :id="'FileUpload'+index" @change="onFileChanges($event,index)"  class="show-for-sr">
                              </div>
                                <div class="small-12 large-10 columns">
                                    <div class="row">
                              <div class="large-3 small-12   columns ">
                                  <label>
                                    Retail Price
                              <div class="input-group"><span class="input-group-label">{{money}}</span>  <inputValidate  class="input-group-field" v-model="p.priceRetail"    ></inputValidate> </div>
                            </label>
                                  </div>
                                  <div class="large-3 small-12   columns ">
                                      <label>
                                         Price One
                                  <div class="input-group"><span class="input-group-label">{{money}}</span>  <inputValidate  class="input-group-field" v-model="p.price1"     ></inputValidate> </div>
                                </label>
                                      </div>
                                      <div class="large-3 small-12   columns ">
                                          <label>
                                            Price Two
                                      <div class="input-group"><span class="input-group-label">{{money}}</span>  <inputValidate  class="input-group-field" v-model="p.price2"     ></inputValidate> </div>
                                    </label>
                                          </div>
                                          <div class="large-3 small-12   columns ">
                                              <label>
                                                Price Own
                                          <div class="input-group"><span class="input-group-label">{{money}}</span>  <inputValidate  class="input-group-field" v-model="p.priceOwn"     ></inputValidate> </div>
                                        </label>
                                              </div>
          <div class="clearfix"> </div>
          <div class="large-3 small-12   columns ">
          <div class="features"><select v-model="p.capacity" ><option  :value="null" >Select Capacity</option><option v-for="c in p.capacitys" :value="c.id" >{{c.attributes.value}}</option></select></div>
              </div>
              <div class="large-3 small-12   columns ">
              <div class="features"><select v-model="p.style"  ><option :value="null" >Select Color</option><option v-for="s in p.styles" :value="s.id"  >{{s.attributes.value}}</option></select></div>
                  </div>

          <div class="large-3 small-12   columns ">
          <div class="features"><select v-model="p.carrierId"  ><option :value="null" >Select Vendors</option><option  v-for="c in p.carriers" :value="c.id" >{{c.presentation}}</option></select></div>
              </div>
              <div class="large-3   small-12   columns ">
              <div class="features"><select v-model="p.companyId" ><option :value="null" >Select Companies</option><option v-for="co in p.companys" :value="co.id" >{{co.attributes.name}}</option></select></div>
                  </div>
                  <div class="clearfix"> </div>
                  <div class="large-3 large-offset-2 small-6 columns">
                  <label :for="'FileUpload'+index" :id="'f'+index"class="button large" >Upload File</label>
                </div>

                <div clas="large-3    small-6  columns">
                  <label>
                    <strong class="variation">Add New:</strong>
                  <a  class="button" @click="adds()" id="button"  >
                                 <i class="fa fa-plus fa-2x" ></i>
                         </a>
                       </label>
                </div>

        </div>
                                  </div>
                            </div>
                          </div>








                      </div>
                    </li>
                  </ul>
                  <a  class="button large" @click="submit()" id="button">Save Changes</a>
                </div>
              </div>
            </div>
          </div>
        </div>
</template>
<script src="./device.crtl.js" lang="babel" ></script>
