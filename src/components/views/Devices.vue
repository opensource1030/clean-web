<template>
<div class="content-right">
    <div id="devices">
        <div class="header"></div>
        <div class="expanded row">

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
                  <th ><select class="form-control" v-model="type" >
                    <option value="" type>Device Type</option>
                    <option v-for="item in filterDeviceType" :key="item.id" :value="item.id" >{{item.attributes.class}}</option>

                  </select></th>
                  <th >
                    <select class="form-control" v-model="manufactured" >
                      <option value="" manufactured>Manufactured</option>
                      <option v-for="item in filterDeviceType"  :value="item.id">{{item.attributes.make}}</option>

                    </select> </th>
                    <th ><select class="form-control" v-model="price" >
                      <option value="" price>Price</option>
                      <option v-for="item in filterPrice"  :value="item.id">{{item.attributes.price1}}</option>

                    </select></th>
                    <th ><select class="form-control" v-model="os" >
                      <option value="" os>OS</option>
                      <option v-for="item in filterDeviceType"  :value="item.id"   >{{item.attributes.deviceOS}}</option>

                    </select></th>
                    <th ><select class="form-control" v-model="carrier" >
                      <option value="" carrier>Carrier</option>
                      <option v-for="item in filterCarriers"  :value="item.id">{{item.attributes.presentation}}</option>

                    </select></th>
                    <th ><select class="form-control" v-model="capacity" >
                      <option value="" capacity>Capacity</option>
                      <option v-for="item in filterByModifications(filterModifications,'capacity')"  :value="item.id">{{item.attributes.value}}</option>

                    </select></th>
                    <th ><select class="form-control" v-model="style" >
                      <option value="" style>Style</option>
                      <option v-for="item in filterByModifications(filterModifications,'style')"  :value="item.id">{{item.attributes.value}}</option>

                    </select></th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="filter">
                    <td><div></div></td>
                    <td><div>{{type}}</div></td>
                    <td ><div>{{manufactured}}</div></td>
                    <td  ><div>{{price}}</div></td>
                    <td  ><div>{{os}}</div></td>
                    <td ><div>{{carrier}}</div></td>
                    <td ><div>{{capacity}}</div></td>
                    <td  ><div>{{style}}</div></td>
                  </tr>
                </tbody>
                <tbody  v-for="(device, index) in devices"  >
                  <tr    :class="{ 'active': device.show,'desactive': device.show  }"   @click="setActive(index)" >
                    <td> <a  v-bind="{ href: '/device/'+device.id}">Manage</a></td>
                    <td style="font-weight: bold;" >  {{device.name}} </td>
                    <td >android</td>
                             <td  >300$</td>
                             <td v-if="device.show!=true" >ios</td><td v-else>  </td>
                             <td v-if="device.show!=true" ><div  v-for="carrier in device.carriers"  > {{carrier.name}}</div> </td><td v-else>  </td>
                             <td v-if="device.show!=true"  ><div  v-for="capacity in filterByModificationsd(device.modifications,'capacity') "  > {{capacity.value}}</div> </td><td v-else>  </td>
                             <td v-if="device.show!=true"  > <div  v-for="style in filterByModificationsd(device.modifications,'style')  "  > {{style.value}}</div></td><td v-else>  </td>
                  </tr>
                  <tr  >
                    <td v-show="device.show" transition="device"  class="detail" colspan="8" >

                      <div class="details">
                        <div class="child"></div>
                        <div class="options child">
                          <ul v-for="carrier in device.carriers"  :key="carrier.id" >
                            {{carrier.name}}
                            <li v-for="price in device.priceName  " :key="price.id" >{{price.style}}, {{price.capacity}}</li>

                          </ul>

                        </div>
                        <div class="prices child">
                          <div class="listPrice" v-for="carrier in device.carriers"  :key="carrier.id" >

                          <ul>
                            <li   v-for="price in filterByCarrier(device.prices,'carrierId' )  "  :key="price.id" >{{price.priceRetail}}$</li>

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

                            <li v-for="carrier in device.carriers">{{carrier.name}}</li>


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
<pagination :pagination="pagination" :callback="loadData"></pagination>
            </div>

          </div>

        </div>
      </div>
</template>
<script>
import Vue from 'vue'
import Pagination from '../pagination'
import { filterByModificationsd,filterByModifications,filterByCarrier} from './../filters.js';
import devices from './../../api/device/devices';

export default {
    components: {
   pagination: Pagination
 },
    created() {
    /*  bus.$on('#devices-table', function(page) {*/

/*});*/  devices.getDevice(this);

    },
  methods: {
      filterByModificationsd,
      filterByModifications,

      loadData(){
        devices.getDevices(this,this.pagination.current_page);



      },


      filterByCarrier,

        setActive: function(index) {
            this.active = index;
            console.log(this.devices[index]);
            this.devices[this.active].hide = !this.devices[this.active].hide;
            if (this.devices[this.active].show == true) {
                this.devices[this.active].show = false;
            } else {
                for (var i = 0; i < this.devices.length; i++) {
                    if (this.devices[this.active] == this.devices[i]) {
                        this.devices[this.active].show = true;
                    } else {
                        this.devices[i].show = false;
                    }
                }
            }
        }
    },
    data() {
        return {
            active:0,
            devices:[],
            filterModifications:[],
            filterDeviceType:[],
            filterPrice:[],
            pagination:{
              current_page:1,
              total_pages:null,
              count:null,
              total:null,
              per_page:25
            },
            filterCarriers:[],
            type:'',
            manufactured:'',
            os:'',
            carrier:'',
            capacity:'',
            style:'',
            price:''

        }
    }

}
</script>
