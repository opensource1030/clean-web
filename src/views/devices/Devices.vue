<template>

<div id="tables">
  <modal v-if="showModal" @close="showModal = false">

    <h3 slot="body">{{error}}</h3>
  </modal>

  <div class="small-12 columns titles">
    <h4>Manage Devices<h4>

          </div>
          <div class="small-12 columns" >
            <a class="button" href="/device"  >Add device</a>
          </div>

          <div class="small-12 columns" >

            <table  id="devices-table">
              <thead>
                <tr>
                  <th >
                  </th>
                  <th  width="160px" >
     <multiselect
      :field="'Device Type'"
      :options="filter.deviceType"
      :value.sync="type"
      :labelAttr="'name'"
      :callback="onSelectColumn"
       >
    </multiselect>
  </th>
                  <th width="100px" >
                    <multiselect
                      :field="'Manufactured'"
                      :options="filter.make"
                      :value.sync="manufactured"
                      :callback="onSelectColumn"
                       >
                    </multiselect> </th>
                    <th width="100px">
                      <multiselect
                        :field="'Price'"
                        :options="filter.price"
                        :value.sync="price"
                        :callback="onSelectColumn"

                         >
                      </multiselect>

                    </th>


               <th >  <multiselect
                        :field="'Carrier'"
                        :options="filter.carriers"
                        :value.sync="carrier"
                        :labelAttr="'presentation'"
                        :callback="onSelectColumn"
                         >
                      </multiselect>
                    </th>
                    <th    width="160px">
                      <multiselect
                        :field="'Capacity'"
                        :options="filterByModificationsd(filter.modifications,'capacity')"
                        :value.sync="capacity"
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
                        :labelAttr="'value'"
                        :callback="onSelectColumn"
                         >
                      </multiselect>
                    </th>
                  </tr>
                </thead>
                <tbody v-show="loadtable" >
                  <tr class="filter">
                    <td><div></div></td>
                    <td><div v-for="t in type" class="filterBy" >{{t.name}} ,</div></td>

                    <td ><div v-for="manu in manufactured" class="filterBy">{{manu}} ,</div></td>
                    <td  ><div v-for="p in price" class="filterBy"  >{{p}} ,</div></td>
                    <td ><div  v-for="c in carrier" class="filterBy" >{{c.presentation}}  ,</div></td>
                    <td ><div  v-for="capa in capacity" class="filterBy" >{{capa.value}}  ,</div></td>
                    <td  ><div v-for="sty in style" class="filterBy" >{{sty.value}} ,</div></td>
                  </tr>
                </tbody>
                <tbody  v-for="(device, index) in devices"  >
                  <tr    :class="{ 'active': device.show,'desactive': device.show  }"   @click="setActive(index)" >
                    <td> <a  v-bind="{ href: '/device/'+device.id}">Manage</a></td>
                    <td style="font-weight: bold;" >  {{device.name}} </td>
                    <td >{{device.make}}</td>

                    <td  >{{device.defaultPrice}} {{device.currency}}</td>

                    <td v-if="device.show!=true" ><div  v-for="carrier in device.priceName"  > {{carrier.carrier}}</div> </td><td v-else>  </td>
                    <td v-if="device.show!=true"  ><div  v-for="capacity in filterByModificationsd(device.modifications,'capacity') "  > {{capacity.value}}</div> </td><td v-else>  </td>
                    <td v-if="device.show!=true"  > <div  v-for="style in filterByModificationsd(device.modifications,'style')  "  > {{style.value}}</div></td><td v-else>  </td>
                  </tr>
                  <tr  >

                    <td v-show="device.show" transition="device" @click="setActive(index)" class="detail" colspan="8" >
                        <div class="column row">
                    <div class="row">
                          <div class="large-6 small-6   columns ">
                            <div class="large-3 small-3    columns ">
                            </div>
                            <div class="large-3 small-3    columns ">
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
                            <div class="large-3 small-3    columns ">

                            </div>
                            <div class="large-3 small-3 columns pri">
                              <div class="listPrice" v-for="carrier in device.priceName"  :key="carrier.id" >
                                <ul>
                                  <li    >{{carrier.priceRetail}} {{device.currency}}</li>

                                </ul>
                              </div>

                            </div>

                              </div>
                                <div class="small-6 large-6   columns ">
                                  <div class="large-3 small-3    columns " :class="{ 'up': device.show}">

                                    <div class="image">
                                      <img   :src="device.image" alt="Photo Iphone 6" width="100" height="00" />
                                    </div>
                                  </div>
                                  <div class="large-3 small-3    columns " :class="{ 'up': device.show}">
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
                          <div class="small-6 large-6   columns ">

                      </div>
                          <div class="small-6 large-6   columns ">
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

              <div class="load">
                  <i  v-show="loading" class="fa fa-spinner fa-spin fa-5x"></i>
                </div>
            </div>
  <div class="clearfix"></div>

<pagination :pagination="pagination" :callback="loadData" v-show="loadtable"></pagination>
        </div>
</template>


<script  src="./devices.crtl.js" lang="babel"  ></script>
