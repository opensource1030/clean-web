<template>
  <div class="page device-page device-index-page">
    <div>
      <router-link to="/devices/new" class="btn btn-lg add-button">New Device</router-link>
    </div>

    <div v-if="isReady">
      <div class="tag-header bg-info">Devices</div>

      <b-card no-body class="employee-list-card">
        <b-card-body class="table-holder">
          <table class="table">
            <thead>
              <tr>
                <th colspan="2">
                  <multiselect
                    id="ajax"
                    placeholder="Device Name"
                    :options="filters.names.options"
                    :value="$store.state.device.filters.deviceNames"
                    :multiple="true"
                    :searchable="true"
                    :loading="filters.names.isLoading"
                    :show-labels="false"
                    :select-label="''"
                    :close-on-select="false"
                    :clear-on-select="false"
                    :hide-selected="false"
                    :limit="3"
                    @search-change="asyncFind_DeviceNames"
                    @input="addFilter_DeviceNames"
                  />
                </th>
                <th>
                  <multiselect
                    id="ajax"
                    placeholder="Device Type"
                    :options="filters.types.options"
                    :value="$store.state.device.filters.typeNames"
                    :multiple="true"
                    :searchable="true"
                    :loading="filters.types.isLoading"
                    :show-labels="false"
                    :select-label="''"
                    :close-on-select="false"
                    :clear-on-select="false"
                    :hide-selected="false"
                    :limit="3"
                    @search-change="asyncFind_DeviceTypeNames"
                    @input="addFilter_DeviceTypeNames"
                  />
                </th>
                <th>
                  <multiselect
                    id="ajax"
                    placeholder="Manufacturer"
                    :options="filters.makers.options"
                    :value="$store.state.device.filters.deviceMakers"
                    :multiple="true"
                    :searchable="true"
                    :loading="filters.makers.isLoading"
                    :show-labels="false"
                    :select-label="''"
                    :close-on-select="false"
                    :clear-on-select="false"
                    :hide-selected="false"
                    :limit="3"
                    @search-change="asyncFind_DeviceMakers"
                    @input="addFilter_DeviceMakers">
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
                    id="ajax"
                    placeholder="Carrier"
                    label="presentation"
                    track-by="id"
                    :options="filters.carriers.options"
                    :value="$store.state.device.filters.carriers"
                    :multiple="true"
                    :searchable="true"
                    :loading="filters.carriers.isLoading"
                    :show-labels="false"
                    :select-label="''"
                    :close-on-select="false"
                    :clear-on-select="false"
                    :hide-selected="false"
                    :limit="3"
                    @search-change="asyncFind_CarrierNames"
                    @input="addFilter_CarrierNames">
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
                    track-by="id">
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
                    track-by="id">
                  </multiselect>
                </th>
                <th width="100px">Actions</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="device in devices">
                <tr
                  :data-id="device.id"
                  :class="activeDevice && (activeDevice.id == device.id) ? 'active' : ''"
                  class="overview-tr"
                >
                  <td>
                    <span class="badge badge-primary" @click="setActive(device)">
                      <i class="fa fa-plus"></i><i class="fa fa-minus"></i>
                    </span>
                  </td>
                  <td>{{ _.get(device, 'name', '') }}</td>
                  <td>{{ _.get(device, 'devicetypes[0].name', '') }}</td>
                  <td>{{ device.make }}</td>
                  <td>{{ device.defaultPrice }} {{ device.currency }}</td>
                  <td>{{ getCarrierNames(device) }}</td>
                  <td>{{ filterModificationsByType(device.modifications, 'capacity').join(', ') }}</td>
                  <td>{{ filterModificationsByType(device.modifications, 'style').join(', ') }}</td>
                  <td>
                    <div class="action-buttons">
                      <a class="btn btn-danger" @click="removeDevice(device.id)" title="Delete"><i class="fa fa-trash"></i></a>
                      <router-link :to="'/devices/' + device.id" title="Edit" class="btn bg-warning">
                        <i class="fa fa-edit"></i>
                      </router-link>
                    </div>
                  </td>
                </tr>

                <tr
                  :data-id="device.id"
                  :class="activeDevice && (activeDevice.id == device.id) ? 'active' : ''"
                  class="detail-tr"
                >
                  <td></td>
                  <td colspan="8">
                    <div class="detail-box">
                      <div class="content">
                        <div class="row">
                          <div class="col-sm-7">
                            <div class="row">
                              <div class="col-sm-3 offset-sm-2">
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

                              <div class="col-sm-3 offset-sm-3">
                                <div class="listPrice" v-for="carrier in device.priceName" :key="carrier.id">
                                  <ul>
                                    <li>{{ carrier.priceRetail }} {{ device.currency }}</li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="col-sm-5">
                            <div class="row">
                              <div class="col-sm-3">
                                <div class="image">
                                  <img :src="device.image" alt="Photo Iphone 6" width="100" height="100"/>
                                </div>
                              </div>
                              <div class="col-sm-3" :class="{ 'up': device.show }">
                                <span style="font-weight: bold;">Availability:</span><br>
                                <span>Provider</span>
                                <ul>
                                  <li v-for="carrier in device.priceName">{{ carrier.carrier }}</li>
                                </ul>
                              </div>
                              <div class="col-sm-3" :class="{ 'up': device.show }">
                                <br>
                                <span>Capacity</span>
                                <ul>
                                  <li v-for="v in filterModificationsByType(device.modifications, 'capacity')">{{ v }}
                                  </li>
                                </ul>
                              </div>
                              <div class="col-sm-3" :class="{ 'up': device.show }">
                                <br>
                                <span>Style</span>
                                <ul>
                                  <li v-for="v in filterModificationsByType(device.modifications, 'style')">{{ v }}</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="row">
                          <div class="col-sm-6 offset-sm-7">
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
        </b-card-body>
      </b-card>

      <pagination
        :pagination="$store.state.device.pagination"
        :prev="prevPage"
        :next="nextPage"
        v-show="$store.state.device.records.length > 0"
      />
    </div>

    <spinner v-else />
  </div>
</template>

<script src="./index.ctrl.js" lang="babel"></script>
