<template>
  <div class="content-right">
    <div id="tables">
      <div class="header"></div>
      <div class="expanded row">
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
                  <th  width="160px">
      <multiselect
      :field="'Device Type'"
      :options="filterDeviceType"
      :value.sync="type"
      :labelAttr="'name'"
       >
    </multiselect>
  </th>
                  <th width="180px" >
                    <multiselect
                      :field="'Manufactured'"
                      :options="devices"
                      :value.sync="manufactured"
                      :labelAttr="'make'"
                       >
                    </multiselect> </th>
                    <th width="100px">
                      <multiselect
                        :field="'Price'"
                        :options="devices"
                        :value.sync="price"
                        :labelAttr="'defaultPrice'"
                         >
                      </multiselect>

                    </th>
                    <th >  <multiselect
                        :field="'Carrier'"
                        :options="filterCarriers"
                        :value.sync="carrier"
                        :labelAttr="'presentation'"
                         >
                      </multiselect>
                    </th>
                    <th width="160px">
                      <multiselect
                        :field="'Capacity'"
                        :options="filterByModificationsd(filterModifications,'capacity')"
                        :value.sync="capacity"
                        :labelAttr="'value'"
                         >
                      </multiselect>
                    </th>
                    <th >  <multiselect
                        :field="'Style'"
                        :options="filterByModificationsd(filterModifications,'capacity')"
                        :value.sync="style"
                        :labelAttr="'value'"
                         >
                      </multiselect></th>
                  </tr>
                </thead>
                <tbody v-show="loadtable" >
                  <tr class="filter">
                    <td><div></div></td>
                    <td><div v-for="t in type" class="filterBy" >{{t.name}} ,</div></td>
                    <td ><div v-for="manu in manufactured" class="filterBy">{{manu.make}} ,</div></td>
                    <td  ><div v-for="p in price" class="filterBy"  >{{p.defaultPrice}} ,</div></td>
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
                    <td v-show="device.show" transition="device"  class="detail" colspan="8" >

                      <div class="details">
                        <div class="child"></div>
                        <div class="options child">
                          <div class="row" v-for="carrier in device.priceName"  :key="carrier.id" >

                            <div class="small-6 colums end">
                            {{carrier.carrier}}
                          </div>
                          <div class="small-6 colums">
                          <div class="modificationc" v-for="price in filterByModificationsd(carrier.modifications,'style' ) " :key="carrier.id" >

                          {{price.value}},

                        </div>
                          <div class="modificationc" v-for="price in filterByModificationsd(carrier.modifications,'capacity' ) " :key="carrier.id" >

                          {{price.value}}

                          </div>

                      </div>
                    </div>


                        </div>
                        <div class="prices child">
                          <div class="listPrice" v-for="carrier in device.priceName"  :key="carrier.id" >

                            <ul>

                              <li    >{{carrier.priceRetail}} {{device.currency}}</li>


                            </ul>
                            <br>
                          </div>

                        </div>

                        <div class="os child"   :class="{ 'up': device.show}"  >
                          <div class="image">
                            <img   :src="device.image" alt="Photo Iphone 6" width="100" height="00" />
                          </div>

                          <div class="information">
                            <span style="font-weight: bold;" >Technical Information</span><br>
                            {{device.properties}}
                          </div>
                        </div>
                        <div class="carrrier child"  :class="{ 'up': device.show}" >
                          <span style="font-weight: bold;">  Availability:</span><br>
                          <span>Provider</span>
                          <ul>
                            <li v-for="carrier in device.priceName">{{carrier.carrier}}</li>
                          </ul>

                        </div>
                        <div class="capacity child" :class="{ 'up': device.show}"  >
                          <br>
                          <span>Capacity</span>
                          <ul>
                            <li v-for="capacity in filterByModificationsd(device.modifications,'capacity')  ">{{capacity.value}}</li>

                          </ul>

                        </div>
                        <div class="style child" :class="{ 'up': device.show}"  >
                          <br>
                          <span>Style</span>
                          <ul>
                            <li v-for="style in filterByModificationsd(device.modifications,'style')  ">{{style.value}}</li>
                          </ul>
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

          </div>
<pagination :pagination="pagination" :callback="loadData" v-show="loadtable"></pagination>
        </div>
      </div>
</template>
<script  src="./devices.crtl.js" lang="babel"  ></script>
