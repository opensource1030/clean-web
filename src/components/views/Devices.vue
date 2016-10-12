<template>
<div class="content-right">
    <div id="devices">
        <div class="header"></div>
        <div class="expanded row">

            <div class="small-12 columns titles">
                <h4>Manage Devices<h4>
          </div>
          <div class="small-12 columns" >
            <a class="button" href="#!/device"  >Add device</a>
          </div>


          <div class="small-12 columns" >

            <table   class="responsive">
              <thead>
                <tr>
                  <th >
                  </th>
                  <th ><select class="form-control" v-model="type" >
                    <option value="" selected>Device Type</option>
                    <option v-for="item in items"  :value="item.id" >{{item.type}}</option>

                  </select></th>
                  <th >
                    <select class="form-control" v-model="manufactured" >
                      <option value="" selected>Manufactured</option>
                      <option v-for="item in items"  :value="item.id">{{item.manufactured}}</option>

                    </select> </th>
                    <th ><select class="form-control" v-model="price" >
                      <option value="" selected>Price</option>
                      <option v-for="item in items"  :value="item.id">{{item.price}}</option>

                    </select></th>
                    <th ><select class="form-control" v-model="os" >
                      <option value="" selected>OS</option>
                      <option v-for="item in items"  :value="item.id">{{item.os}}</option>

                    </select></th>
                    <th ><select class="form-control" v-model="carrier" >
                      <option value="" selected>Carrier</option>
                      <option v-for="item in items"  :value="item.id">{{item.carrier}}</option>

                    </select></th>
                    <th ><select class="form-control" v-model="capacity" >
                      <option value="" selected>Capacity</option>
                      <option v-for="item in items"  :value="item.id">{{item.capacity}}</option>

                    </select></th>
                    <th ><select class="form-control" v-model="style" >
                      <option value="" selected>Style</option>
                      <option v-for="item in items"  :value="item.id">{{item.style}}</option>

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
                <tbody  v-for="device in devices"  >
                  <tr    :class="{ 'active': device.show,'desactive': device.show  }"   @click="setActive($index)" >
                    <td> <a href="#!/device/{{ device.id }}">manage</a></td>
                    <td style="font-weight: bold;" >  {{device.name}} </td>
                    <td >android</td>
                             <td  >300$</td>
                             <td v-if="device.show!=true" >ios</td><td v-else>  </td>
                             <td v-if="device.show!=true" ><div  v-for="carrier in device.carriers"  > {{carrier.name}}</div> </td><td v-else>  </td>
                             <td v-if="device.show!=true"  ><div  v-for="capacity in device.modifications  | filterBy 'capacity' in 'modType'"  > {{capacity.value}}</div> </td><td v-else>  </td>
                             <td v-if="device.show!=true"  > <div  v-for="style in device.modifications  | filterBy 'style' in 'modType'"  > {{style.value}}</div></td><td v-else>  </td>
                  </tr>
                  <tr  >
                    <td v-show="device.show" transition="device"  class="detail" colspan="8" >

                      <div class="details">
                        <div class="child"></div>
                        <div class="options child">
                          <ul v-for="carrier in device.carriers"  track-by="$index" >
                            {{carrier.name}}
                            <li v-for="price in device.priceName | filterBy carrier.name in 'carrier' " track-by="$index" >{{price.style}}, {{price.capacity}}</li>

                          </ul>

                        </div>
                        <div class="prices child">
                          <div class="listPrice" v-for="carrier in device.carriers"  track-by="$index" >

                          <ul>
                            <li   v-for="price in device.prices | filterBy carrier.id in 'carrierId'  "  track-by="$index" >{{price.priceRetail}}$</li>

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
                            <li v-for="capacity in device.modifications | filterBy 'capacity' in 'modType' ">{{capacity.value}}</li>


                          </ul>

                        </div>
                        <div class="style child" :class="{ 'up': device.show}"  >
                          <br>
                          <span>Style</span>
                          <ul>
                          <li v-for="style in device.modifications | filterBy 'style' in 'modType' ">{{style.value}}</li>


                          </ul>

                        </div>
                      </div>


                    </td>

                  </tr>

                </tbody>
              </table>

            </div>
          </div>
        </div>
      </div>
</template>
<script>
import Vue from 'vue'
import VueAnimatedList from 'vue-animated-list'
Vue.use(VueAnimatedList)
import devices from './../../api/device/devices';
export default {
    name: "Devices",
    created() {
      devices.getDevices(this);
    },
    ready() {
    },
  methods: {
        setActive: function(index) {
            this.active = index;
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
            devices:[]
        }
    }
}
</script>
