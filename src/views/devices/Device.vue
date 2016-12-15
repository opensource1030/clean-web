<template>

  <div class="content-right">
    <div class="full-height row">
      <div id="device">
        <div class="header"></div>
        <div class="expanded row">
          <modal v-if="showModal" @close="showModal = false">

    <h3 slot="body">Errors fields</h3>
  </modal>

          <div class="small-12 columns titles">
            <h4>Manage Devices<h4>
            </div>

            <div class="medium-6 columns devicename">
              <label>Device Name
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
                            <option value=""  >Select Type</option>
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
                              <inputValidate  placeholder="Custom"   v-model="gigas"></inputValidate>
                            </label>
                          </div>
                          <div class="small-6 columns">
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
                            <label style=" font-weight: bold;" >Style
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
                  <a href="#" class="accordion-title" @click="showFalse()" >Carriers</a>
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
                              <input type="text" placeholder="Google"  v-model="companyFilter" >
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
                          <option value="" v-for="carrier in vCarriers" :value="carrier.presentation" >{{carrier.presentation}}</option>
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
                            <tr  v-for="(p,index) in findByPrices(priceTable,filter) " >
                              <td ><div class="input-group"><span class="input-group-label">$</span>  <inputValidate  class="input-group-field"  v-model="p.priceRetail"    ></inputValidate>  </div></td>
                              <td><div class="input-group"><span class="input-group-label">$</span><inputValidate  class="input-group-field"  v-model="p.price1"    ></inputValidate>  </div></td>
                              <td><div class="input-group"><span class="input-group-label">$</span><inputValidate  class="input-group-field"  v-model="p.price2"    ></inputValidate></div></td>
                              <td><div class="input-group"><span class="input-group-label">$</span><inputValidate  class="input-group-field"  v-model="p.priceOwn"    ></inputValidate></div></td>
                              <td><div class="features">{{p.capacity.attributes.value}}</div></td>
                              <td><div class="features">{{p.style.attributes.value}}</div></td>
                              <td><div class="features">{{p.carrier.presentation}}</div></td>
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
        </div>
</template>
<script src="./device.crtl.js" lang="babel" ></script>
