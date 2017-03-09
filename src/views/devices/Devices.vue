<template>
<div id="tables">
  <modal v-if="$store.getters['error/hasError']" @close="$store.dispatch('error/clearAll')">
    <h3 slot="body">{{ $store.getters['error/error'] }}</h3>
  </modal>

  <div class="small-12 columns titles">
    <h4>Manage Devices</h4>
  </div>

  <div class="small-12 columns">
    <a class="button buttonTable" href="/device">Add device</a>
  </div>

  <div>
    <!-- {{ $store.state.device.types }} -->
    <!-- {{ $store.state.device.filter }} -->
  </div>

  <div class="small-12 colums responsive">
    <table>
      <thead>
        <tr>
          <th width="100px">
          </th>
          <th>
            <multiselect
              :options="$store.state.device.types"
              :multiple="true"
              :searchable="false"
              :show-labels="false"
              :select-label="''"
              :close-on-select="false"
              :clear-on-select="false"
              :hide-selected="false"
              placeholder="Device Type">
            </multiselect>
          </th>
          <th>
            <multiselect
              :options="$store.state.device.manufacturers"
              :multiple="true"
              :searchable="false"
              :show-labels="false"
              :select-label="''"
              :close-on-select="false"
              :clear-on-select="false"
              :hide-selected="false"
              placeholder="Manufacturer">
            </multiselect>
          </th>
          <th width="7%">
            <multiselect
              :options="[0,1,2]"
              :multiple="true"
              :searchable="false"
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
              :multiple="true"
              :searchable="false"
              :show-labels="false"
              :select-label="''"
              :close-on-select="false"
              :clear-on-select="false"
              :hide-selected="false"
              @input="addCarrierFilter"
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
              :searchable="false"
              :show-labels="false"
              :select-label="''"
              :close-on-select="false"
              :clear-on-select="false"
              :hide-selected="false"
              @input="addCapacityFilter"
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
              :searchable="false"
              :show-labels="false"
              :select-label="''"
              :close-on-select="false"
              :clear-on-select="false"
              :hide-selected="false"
              @input="addStyleFilter"
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
        <template v-for="(device, index) in devices">
          <tr id="open" @click="setActive(device)">
            <td><a v-bind="{ href: '/device/'+device.id}">manage</a></td>
            <td style="font-weight: bold;">{{ device.name }}</td>
            <td>{{ device.make }}</td>
            <td>{{ device.defaultPrice }} {{ device.currency }}</td>
            <td><div v-for="carrier in device.priceName">{{carrier.carrier}}</div></td>
            <td><div v-for="capacity in filterByModificationsd(device.modifications, 'capacity')">{{ capacity.value }}</div></td>
            <td><div v-for="style in filterByModificationsd(device.modifications, 'style')">{{ style.value }}</div></td>
          </tr>
          <tr>
            <td v-show="activeDevice && (activeDevice.id == device.id)" transition="device" @click="setActive(device)" class="detail" colspan="7">
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
    :prev="() => { $store.dispatch('device/prevPage') }"
    :next="() => { $store.dispatch('device/nextPage') }"
    v-show="$store.state.device.all.length > 0">
  </paginate>

  <!-- <div class="load"><i v-show="loading" class="fa fa-spinner fa-spin fa-5x"></i></div> -->
  <!-- <tables></tables> -->
  <!-- {{ $store.state.device.all }} -->
  <!-- {{ $store.getters['device/find'](search.filter) }} -->
  <!-- {{ $store.getters['device/search'](search) }} -->
</div>
</template>

<script src="./devices.crtl.js" lang="babel"></script>
