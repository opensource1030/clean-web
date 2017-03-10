
<template>
  <div>
<div class="small-12 columns" v-show="!loading" >
  <div class="small-12 colums responsive">
<table  >
  <thead>
    <tr>
      <th v-if="id==null" ></th>
      <th>
        <multiselect
        :field="'Device Type'"
        :options="filter.deviceType"
        :value.sync="type"
        :labelAttr="'name'"
        :api="'/devicetypes'"
        :callback="onSelectColumn"
        :fieldSearch="'name'"
        >
        </multiselect>

        </th>
          <th>
        <multiselect
          :field="'Manufactured'"
          :options="filter.make"
          :api="'/devices'"
            :fieldSearch="'make'"
          :value.sync="manufactured"
          :callback="onSelectColumn"
           >
        </multiselect></th>
        <th >
          <multiselect
            :field="'Price'"
            :options="filter.price"
            :fieldSearch="'defaultPrice'"
            :value.sync="price"
            :api="'/devices'"
            :callback="onSelectColumn"
             >
          </multiselect>

        </th>


   <th >  <multiselect
            :field="'Carrier'"
            :options="filter.carriers"
            :value.sync="carrier"
            :fieldSearch="'presentation'"
            :api="'/carriers'"
            :labelAttr="'presentation'"
            :callback="onSelectColumn"
             >
          </multiselect>
        </th>
        <th >
          <multiselect
            :field="'Capacity'"
            :options="filterByModificationsd(filter.modifications,'capacity')"
            :value.sync="capacity"
            :fieldSearch="'value'"
            :api="'/modifications'"
            :labelAttr="'value'"
            :callback="onSelectColumn"
             >
          </multiselect>
        </th>
        <th >
        <multiselect
            :field="'Style'"
            :options="filterByModificationsd(filter.modifications,'style')"
            :value.sync="style"
            :api="'/modifications'"
            :fieldSearch="'value'"
            :labelAttr="'value'"
            :callback="onSelectColumn"
             >
          </multiselect>
        </th>
      </tr>
    </thead>
    <tbody v-show="loadtable" >
      <tr class="filter">
        <td v-if="id==null"></td>
        <td><div v-for="t in type" class="filterBy" >{{t.name}} ,</div></td>
        <td ><div v-for="manu in manufactured" class="filterBy">{{manu}} ,</div></td>
        <td  ><div v-for="p in price" class="filterBy"  >{{p}} ,</div></td>
        <td ><div  v-for="c in carrier" class="filterBy" >{{c.presentation}}  ,</div></td>
        <td ><div  v-for="capa in capacity" class="filterBy" >{{capa.value}}  ,</div></td>
        <td  ><div v-for="sty in style" class="filterBy" >{{sty.value}} ,</div></td>
      </tr>
    </tbody>
    <tbody  v-for="(device, index) in devices"  >
      <tr   id="open" :class="{ 'active': device.show,'desactive': device.show  }"   @click="setActive(index)" >
          <td v-if="id==null"><a v-bind="{ href: '/device/'+device.id}">manage</a></td>
        <td style="font-weight: bold;" >  {{device.name}} </td>
        <td >{{device.make}}</td>

        <td  >{{device.defaultPrice}} {{device.currency}}</td>

        <td v-if="device.show!=true" ><div  v-for="carrier in device.priceName"  > {{carrier.carrier}}</div> </td><td v-else>  </td>
        <td v-if="device.show!=true"  ><div  v-for="capacity in filterByModificationsd(device.modifications,'capacity') "  > {{capacity.value}}</div> </td><td v-else>  </td>
        <td v-if="device.show!=true"  > <div  v-for="style in filterByModificationsd(device.modifications,'style')  "  > {{style.value}}</div></td><td v-else>  </td>
      </tr>
      <tr  >

        <td v-if="id==0 || id>0"   v-show="device.show" transition="device"  class="detail" colspan="8" >
            <div class="column row">
        <div class="row">
              <div class="large-6 small-6   columns ">


                <div class="large-6 small-6    columns ">
                  <div class="image">
                    <img   :src="device.image" alt="Photo Iphone 6" width="100" height="00" />
                  </div>

                </div>
                <div class="large-3 small-3    columns ">
                  <div class="column row" v-for="carrier in device.priceName"  :key="carrier.carrier" >
                    <div class="checkbox"   >
                      <label>
                        <input type="checkbox"  @change="vDeviceVariations()" class="checkboxb"  v-model="carrier.check">
                        <span class="custom-checkbox"><i class="icon-check"></i></span>
                        {{carrier.carrier}}
                      </label>
                    </div>
                      <div class="row">
                  <div class="modificationc" v-for="price in filterByModificationsd(carrier.modifications,'style' ) " :key="carrier.id" >
                  {{price.value}},
                </div>
                  <div class="modificationc" v-for="price in filterByModificationsd(carrier.modifications,'capacity' ) " :key="carrier.id" >
                  {{price.value}}
              </div>
            </div>

            </div>

                </div>
                <div class="large-3 small-3 columns ">


                </div>

                  </div>
                    <div class="small-6 large-6   columns ">
                      <div class="large-3 small-3    columns " >



                      </div>
                      <div class="large-3 small-3    columns " >
                        <div class="listPrice" v-for="carrier in device.priceName"  :key="carrier.id" >
                          <ul>
                            <li >{{carrier.priceRetail}} {{device.currency}}</li>

                          </ul>
                        </div>
                      </div>
                      <div class="large-3  small-3   columns " >


                      </div>
                      <div class="large-3  small-3   columns " >

                      </div>
                    </div>

          </div>
          <div class="row">
              <div class="small-6 large-6   columns ">
                <div class="information">
                    <span style="font-weight: bold;" >Technical Information</span><br>
                      {{device.properties}}
                        </div>

          </div>
              <div class="small-6 large-6   columns ">


              </div>
        </div>

            </div>


        </td>
        <td v-else v-show="device.show" transition="device" @click="setActive(index)" class="detail" colspan="8" >
            <div class="column row">
        <div class="row">
              <div class="large-7 small-7   columns ">

                <div class="large-3   large-offset-2  small-3    small-offset-2 columns ">
                  <div class="column row" v-for="carrier in device.priceName"  :key="carrier.id" >
                    <div class="row">


                    {{carrier.carrier}}

                      </div>
                      <div class="row">
                  <div class="modificationc" v-for="price in filterByModificationsd(carrier.modifications,'style' ) " :key="carrier.id" >

                  {{price.value}},

                </div>
                  <div class="modificationc" v-for="price in filterByModificationsd(carrier.modifications,'capacity' ) " :key="carrier.id" >

                  {{price.value}}


              </div>
            </div>

            </div>

                </div>

                <div class="large-3 large-offset-3 small-3   small-offset-3 columns pri">
                  <div class="listPrice" v-for="carrier in device.priceName"  :key="carrier.id" >
                    <ul>
                      <li    >{{carrier.priceRetail}} {{device.currency}}</li>

                    </ul>
                  </div>

                </div>

                  </div>
                    <div class="small-5 large-5   columns ">
                      <div class="large-3 l small-3   columns " >

                        <div class="image">
                          <img   :src="device.image" alt="Photo Iphone 6" width="100" height="00" />
                        </div>
                      </div>

                      <div class="large-3  small-3   columns " :class="{ 'up': device.show}">
                        <span style="font-weight: bold;">  Availability:</span><br>
                        <span>Provider</span>
                        <ul>
                          <li v-for="carrier in device.priceName">{{carrier.carrier}}</li>
                        </ul>
                      </div>
                      <div class="large-3  small-3   columns " :class="{ 'up': device.show}">
                        <br>
                        <span>Capacity</span>
                        <ul>
                          <li v-for="capacity in filterByModificationsd(device.modifications,'capacity')  ">{{capacity.value}}</li>

                        </ul>
                      </div>
                      <div class="large-3  small-3   columns " :class="{ 'up': device.show}">
                        <br>
                        <span>Style</span>
                        <ul>
                          <li v-for="style in filterByModificationsd(device.modifications,'style')  ">{{style.value}}</li>
                        </ul>

                      </div>
                    </div>

          </div>
          <div class="row">

              <div class="small-6 small-offset-7 large-6 large-offset-7 columns ">
                <div class="information">
                    <span style="font-weight: bold;" >Technical Information</span><br>
                      {{device.properties}}
                        </div>

              </div>
        </div>

            </div>


        </td>


      </tr>

    </tbody>
  </table>
</div>



<div class="clearfix"></div>

<pagination :pagination="pagination" :callback="loadData" v-show="loadtable"></pagination>

<div class="load">
    <i  v-show="loading" class="fa fa-spinner fa-spin fa-5x"></i>
  </div>
</div>
</div>
</template>
<script src="./tableDevices.crtl.js" lang="babel"></script>
