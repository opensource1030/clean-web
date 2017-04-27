<template>
<div class="page device-page device-index-page" v-if="devices.length > 0">
  <modal v-if="$store.getters['error/hasError']" @close="$store.dispatch('error/clearAll')">
    <h3 slot="body">{{ $store.getters['error/error'] }}</h3>
  </modal>

  <div class="small-12 columns">
    <a class="button large btn-orange add-button" href="/devices/new">Add Device</a>
  </div>

  <div class="columns small-12" v-show='isReady'>
    <div class="tag-header">
      <h1>Devices</h1>
    </div>

    <div class="grid-box">
      <div class="box-content">
        <div class="table-holder">
          <table class="unstriped">
            <thead>
              <tr>
                <th width="30px"></th>
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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="device in devices">
                <tr class="overview-tr" :data-id="device.id" :class="activeDevice && (activeDevice.id == device.id) ? 'active' : ''">
                  <td>
                   <span class="badge toggle-button" @click="setActive(device)"><i class="fa fa-plus"></i><i class="fa fa-minus"></i></span>
                  </td>
                  <td>{{ device.name }}</td>
                  <td>{{ device.make }}</td>
                  <td>{{ device.defaultPrice }} {{ device.currency }}</td>
                  <td><span v-for="carrier in device.priceName">{{carrier.carrier}}</span></td>
                  <td>{{ filterModificationsByType(device.modifications, 'capacity').join(', ') }}</td>
                  <td>{{ filterModificationsByType(device.modifications, 'style').join(', ') }}</span></td>
                  <td>
                    <div class="action-buttons">
                      <a class="button alert" title="Delete"><i class="fa fa-trash"></i></a>
                      <a title="Edit" class="button warning edit-button" :href="'/devices/' + device.id"><i class="fa fa-edit"></i></a>
                    </div>
                  </td>
                </tr>

                <tr class="detail-tr" :data-id="device.id" :class="activeDevice && (activeDevice.id == device.id) ? 'active' : ''">
                  <td></td>
                  <td colspan="7">
                    <div class="detail-box">
                      <div class="content">
                        <div class="row">
                          <div class="large-7 small-7 columns">
                            <div class="large-3 large-offset-2 small-3 small-offset-2 columns">
                              <div class="column row" v-for="carrier in device.priceName" :key="carrier.id">
                                <div class="row">
                                  {{ carrier.carrier }}
                                </div>
                                <div class="row">
                                  <div>{{ filterModificationsByType(carrier.modifications, 'style').join(', ') }}</div>
                                  <div>{{ filterModificationsByType(carrier.modifications, 'capacity').join(', ') }}</div>
                                </div>
                              </div>
                            </div>

                            <div class="large-3 large-offset-3 small-3 small-offset-3 columns">
                              <div class="listPrice" v-for="carrier in device.priceName" :key="carrier.id">
                                <ul>
                                  <li>{{ carrier.priceRetail }} {{ device.currency }}</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          
                          <div class="large-5 small-5 columns">
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
                                <li v-for="v in filterModificationsByType(device.modifications, 'capacity')">{{ v }}</li>
                              </ul>
                            </div>
                            <div class="large-3 small-3 columns" :class="{ 'up': device.show }">
                              <br>
                              <span>Style</span>
                              <ul>
                                <li v-for="v in filterModificationsByType(device.modifications, 'style')">{{ v }}</li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div class="row">
                          <div class="small-6 small-offset-7 large-6 large-offset-7 columns ">
                            <div class="information">
                              <span><strong>Technical Information</strong></span><br>
                              {{ device.properties }}
                            </div>
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
      </div>
    </div>
  </div>

  <paginate
    :pagination="$store.state.device.pagination"
    :prev="prevPage"
    :next="nextPage"
    v-show="$store.state.device.records.length > 0">
  </paginate>

  <div class="load-wrapper" v-hide="isReady"><i class="fa fa-spinner fa-spin fa-5x"></i></div>
</div>
</template>

<script src="./devices.crtl.js" lang="babel"></script>
