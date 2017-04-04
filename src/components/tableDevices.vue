
<template>
  <div>
  <div class="small-12 colums responsive">
    <table>
      <thead>
        <tr>
          <th v-if="id==null"    width="10%">
          </th>
          <th width="20%" >
            <multiselect
              :options="$store.state.device.types"
              :multiple="true"
              :searchable="true"
              :internal-search="false"
              @search-change="asyncFindTypes"
              @input="$store.dispatch('device/addFilter',{type:'type',records:$event})"
              :show-labels="false"
              :select-label="''"
              :close-on-select="false"
              :clear-on-select="false"
              :hide-selected="false"
              :options-limit="10"
              placeholder="Device Type">
            </multiselect>
          </th>
          <th width="15%">
            <multiselect
              :options="$store.state.device.manufactures"
              :options-limit="10"
              :multiple="true"
              :searchable="true"
              :internal-search="false"
              @search-change="asyncFindManu"
              @input="$store.dispatch('device/addFilter',{type:'manufactured',records:$event})"
              :show-labels="false"
              :select-label="''"
              :close-on-select="false"
              :clear-on-select="false"
              :hide-selected="false"
              placeholder="Manufacturer"
              >
            </multiselect>
          </th>
          <th width="10%">
            <multiselect
              :options="$store.state.device.prices"
              :options-limit="10"
              :multiple="true"
              :searchable="true"
              :internal-search="false"
              @search-change="asyncFindPrices"
              @input="$store.dispatch('device/addFilter',{type:'price',records:$event})"
              :show-labels="false"
              :select-label="''"
              :close-on-select="false"
              :clear-on-select="false"
              :hide-selected="false"
              placeholder="Price">
            </multiselect>
          </th>
          <th width="15%">
            <multiselect
             :value = "$store.state.device.filter.carriers"
              :options="carriers"
              :options-limit="10"
              :multiple="true"
              :searchable="true"
              :internal-search="false"
              @search-change="asyncFindCarriers"
              :show-labels="false"
              :select-label="''"
              :close-on-select="false"
              :clear-on-select="false"
              :hide-selected="false"
              @input="$store.dispatch('device/addFilter',{type:'carrier',records:$event})"
              placeholder="Carrier"
              label="presentation"
              track-by="presentation">
            </multiselect>
          </th>
          <th width="10%">
            <multiselect
              :value = "$store.state.device.filter.capacities"
              :options="capacities"
              :multiple="true"
              :searchable="true"
              :internal-search="false"
              @search-change="asyncFindModifications"
              :show-labels="false"
              :select-label="''"
              :close-on-select="false"
              :clear-on-select="false"
              :hide-selected="false"
              @input="$store.dispatch('device/addFilter',{type:'capacity',records:$event})"
              placeholder="Capacity"
              label="value"
              track-by="value">
            </multiselect>
          </th>
          <th width="10%">
            <!-- v-model="$store.state.device.filter.styles" -->
            <multiselect
              :value = "$store.state.device.filter.styles"
              :options="styles"
              :multiple="true"
              :searchable="true"
              :internal-search="false"
              @search-change="asyncFindModifications"
              :options-limit="10"
              :show-labels="false"
              :select-label="''"
              :close-on-select="false"
              :clear-on-select="false"
              :hide-selected="false"
              @input="$store.dispatch('device/addFilter',{type:'style',records:$event})"
              placeholder="Style"
              label="value"
              track-by="value">
            </multiselect>
          </th>
        </tr>
      </thead>
      <!--
      <tbody v-show="loadtable">
        <tr class="filter">
          <td v-if="id==null"></td>
          <td><div v-for="t in type" class="filterBy">{{t.name}} ,</div></td>
          <td><div v-for="manu in manufactured" class="filterBy">{{manu}} ,</div></td>
          <td><div v-for="p in price" class="filterBy">{{p}} ,</div></td>
          <td><div v-for="c in carrier" class="filterBy">{{c.presentation}} ,</div></td>
          <td><div v-for="capa in capacity" class="filterBy">{{capa.value}} ,</div></td>
          <td><div v-for="sty in style" class="filterBy">{{sty.value}} ,</div></td>
        </tr>
      </tbody>
      -->
      <tbody>
        <template v-for="(device, index) in search">
          <tr @click="setActive(device)" id="open" >
            <td  v-if="id==null" ><a v-bind="{ href: '/device/'+device.id}">manage</a></td>
            <td style="font-weight: bold;">{{ device.name }}</td>
            <td>{{ device.make }}</td>
            <td>{{ device.defaultPrice }} {{ device.currency }}</td>
            <td><div v-for="carrier in device.priceName">{{carrier.carrier}}</div></td>
            <td><div v-for="capacity in filterByModificationsd(device.modifications, 'capacity')">{{ capacity.value }}</div></td>
            <td><div v-for="style in filterByModificationsd(device.modifications, 'style')">{{ style.value }}</div></td>
          </tr>
          <tr>
            <td v-if="id==0 || id>0"   v-show="activeDevice && (activeDevice.id == device.id)" transition="device"  class="detail" colspan="8" >
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
                       <input type="checkbox"   class="checkboxb"  @change="$store.dispatch('device/updateDeviceVariations',{e:$event,price:carrier,i:i})" :checked="carrier.check"  >
                       <span class="custom-checkbox"><i class="icon-check"></i></span>
                       {{carrier.carrier}}
                     </label>
                   </div>
                     <div class="row">
                 <div class="modificationc" v-for="price in filterByModificationsd(carrier.modifications,'style' ) " :key="carrier.id"  >
                 {{price.value}},
               </div>
                 <div class="modificationc" v-for="price in filterByModificationsd(carrier.modifications,'capacity' ) " :key="carrier.id"   >
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
            <td v-else v-show="activeDevice && (activeDevice.id == device.id)" transition="device" @click="setActive(device)" class="detail" colspan="7">
              <div class="column row">
                <div class="row">
                  <div class="large-7 small-7 columns">
                    <div class="large-3 large-offset-2 small-3 small-offset-2 columns">
                      <div class="column row" v-for="carrier in device.priceName" :key="carrier.id">
                        <div class="row">
                          {{ carrier.carrier }}
                        </div>
                        <div class="row">
                          <div class="modificationc" v-for="price in filterByModificationsd(carrier.modifications, 'style')" :key="carrier.id">
                            {{ price.value }},
                          </div>
                          <div class="modificationc" v-for="price in filterByModificationsd(carrier.modifications, 'capacity')" :key="carrier.id" >
                            {{ price.value }}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="large-3 large-offset-3 small-3 small-offset-3 columns pri">
                      <div class="listPrice" v-for="carrier in device.priceName" :key="carrier.id" >
                        <ul>
                          <li>{{ carrier.priceRetail }} {{ device.currency }}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="small-5 large-5 columns">
                    <div class="large-3 small-3 columns">
                      <div class="image">
                        <img :src="device.image" alt="Photo Iphone 6" width="100" height="100" />
                      </div>
                    </div>

                    <div class="large-3 small-3 columns" :class="{ 'up': device.show }">
                      <span style="font-weight: bold;">Availability:</span><br>
                      <span>Provider</span>
                      <ul>
                        <li v-for="carrier in device.priceName">{{ carrier.carrier }}</li>
                      </ul>
                    </div>
                    <div class="large-3 small-3 columns" :class="{ 'up': device.show }">
                      <br>
                      <span>Capacity</span>
                      <ul>
                        <li v-for="capacity in _.chain(device.modifications).filter({ 'modType': 'capacity' }).sortBy([ 'value' ]).value()">{{ capacity.value }}</li>
                      </ul>
                    </div>
                    <div class="large-3 small-3 columns" :class="{ 'up': device.show }">
                      <br>
                      <span>Style</span>
                      <ul>
                        <li v-for="style in _.chain(device.modifications).filter({ 'modType': 'style' }).sortBy([ 'value' ]).value()">{{ style.value }}</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="small-6 small-offset-7 large-6 large-offset-7 columns ">
                    <div class="information">
                      <span style="font-weight: bold;">Technical Information</span><br>{{ device.properties }}
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
  <paginate
    :pagination="$store.state.device.pagination"
    :prev="prevPage"
    :next="nextPage"
    v-show="$store.state.device.all.length > 0">
  </paginate>
</div>
</template>
<script src="./tableDevices.crtl.js" lang="babel"></script>
