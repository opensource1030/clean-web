<template>
  <div>
    <table width="100%" class="responsive">
      <thead>
      <tr>
        <th width="30px">
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
        <th width="85px">
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
        <th>
          <multiselect
                  :value="$store.state.device.filters.carriers"
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
        <th>
          <multiselect
                  :value="$store.state.device.filters.capacities"
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
          <!-- v-model="$store.state.device.filters.styles" -->
          <multiselect
                  :value="$store.state.device.filters.styles"
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
        <th>Actions
        </th>
      </tr>
      </thead>
      <tbody v-show="loadtable">
      <tr class="filter">
        <td v-if="id==null"></td>
        <td>
          <div v-for="t in type" class="filterBy">{{t.name}} ,</div>
        </td>
        <td>
          <div v-for="manu in manufactured" class="filterBy">{{manu}} ,</div>
        </td>
        <td>
          <div v-for="p in price" class="filterBy">{{p}} ,</div>
        </td>
        <td>
          <div v-for="c in carrier" class="filterBy">{{c.presentation}} ,</div>
        </td>
        <td>
          <div v-for="capa in capacity" class="filterBy">{{capa.value}} ,</div>
        </td>
        <td>
          <div v-for="sty in style" class="filterBy">{{sty.value}} ,</div>
        </td>
        <td v-if="id==null"></td>
      </tr>
      </tbody>
      <tbody>
      <template v-for="(device, index) in devices">
        <tr @click="setActive(device)" id="open"
            :class="activeDevice && (activeDevice.id == device.id) ? 'row-active' : ''">
          <td class="icon-toggle"><i
                  :class="activeDevice && (activeDevice.id == device.id) ? 'fa fa-minus' : 'fa fa-plus'"> </i></td>
          <td><strong>{{ device.name }} </strong></td>
          <td>{{ device.make }}</td>
          <td>{{ device.defaultPrice }} {{ device.currency }}</td>
          <td><span v-for="carrier in device.priceName">{{carrier.carrier}}</span></td>
          <td><span class="inline-block-items mg-l-5"
                    v-for="capacity in filterByModificationsd(device.modifications, 'capacity')"> {{ capacity.value }} </span>
          </td>
          <td><span v-for="style in filterByModificationsd(device.modifications, 'style')"> {{ style.value }} </span>
          </td>
          <td>
            <div class="action-buttons">
              <a class="button alert" title="Delete"><i class="fa fa-trash"> </i> </a>
              <a title="Edit" class="button warning" v-bind="{ href: '/devices/'+device.id}"> <i
                      class="fa fa-edit"> </i> </a></div>
          </td>
        </tr>
        <tr v-if="activeDevice && (activeDevice.id == device.id)">
          <td transition="device" @click="setActive(device)" class="detail" colspan="8">
            <div class="column row">
              <div class="row">
                <div class="large-7 small-7 columns">
                  <div class="large-3 large-offset-2 small-3 small-offset-2 columns">
                    <div class="column row" v-for="carrier in device.priceName" :key="carrier.id">
                      <div class="row">
                          {{ carrier.carrier }}
                        </div>
                      <div class="row">
                        <div class="modificationc"
                             v-for="price in filterByModificationsd(carrier.modifications, 'style')"
                             :key="carrier.id">
                            {{ price.value }},
                          </div>
                        <div class="modificationc"
                             v-for="price in filterByModificationsd(carrier.modifications, 'capacity')"
                             :key="carrier.id">
                            {{ price.value }}
                          </div>
                      </div>
                    </div>
                  </div>

                  <div class="large-3 large-offset-3 small-3 small-offset-3 columns pri">
                    <div class="listPrice" v-for="carrier in device.priceName" :key="carrier.id">
                      <ul>
                        <li>{{ carrier.priceRetail }} {{ device.currency }}</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="small-5 large-5 columns">
                  <div class="large-3 small-3 columns">
                    <div class="image">
                      <img :src="device.image" alt="Photo Iphone 6" width="100" height="100"/>
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
                      <li v-for="capacity in _.chain(device.modifications).filter({ 'modType': 'capacity' }).sortBy([ 'value' ]).value()">
                        {{ capacity.value }}
                      </li>
                    </ul>
                  </div>
                  <div class="large-3 small-3 columns" :class="{ 'up': device.show }">
                    <br>
                    <span>Style</span>
                    <ul>
                      <li v-for="style in _.chain(device.modifications).filter({ 'modType': 'style' }).sortBy([ 'value' ]).value()">
                        {{ style.value }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="small-6 small-offset-7 large-6 large-offset-7 columns ">
                  <div class="information">
                    <strong>Technical Information</strong><br>{{ device.properties }}
                  </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </template>
      </tbody>
    </table>
    <div v-show="devices.length < 1 || devices.length == null" class="is-loading"></div>
    <hr v-show="devices.length > 1" class="no-margin">
    <paginate
            :pagination="$store.state.device.pagination"
            :prev="prevPage"
            :next="nextPage"
            v-show="$store.state.device.records.length > 0">
    </paginate>
    <div class="clearfix"></div>
  </div>

</template>
<script src="./tableDevices.crtl.js" lang="babel"></script>