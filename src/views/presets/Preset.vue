<template>
  <div class="page preset-page preset-edit-page is-relative">
    <modal v-if="$store.getters['error/hasError']" @close="$store.dispatch('error/clearAll')">
      <h3 slot="body">{{ $store.getters['error/error'] }}</h3>
    </modal>

    <div class="row overview">
      <div class="medium-6 columns">
        <label>
          <strong>Title</strong>
          <input type="text" v-model="preset.name">
        </label>

        <label>
          <strong>Company</strong>
          <multiselect
                  :value="preset.companies[0]"
                  placeholder="Company Name"
                  label="name"
                  track-by="id"
                  :options="filters.companies.options"
                  :multiple="false"
                  :searchable="true"
                  :show-labels="false"
                  :select-label="''"
                  :close-on-select="true"
                  :clear-on-select="true"
                  :hide-selected="false"
                  @search-change="asyncFind_CompanyNames"
                  @input="addFilter_CompanyNames">
          </multiselect>
        </label>
      </div>
    </div>

    <div class="small-12 columns" v-show="isReady && parseInt(preset.companyId) > 0">
      <ul class="accordion" data-accordion data-allow-all-closed="true">
        <li class="accordion-item  is-active" data-accordion-item>
          <a href="#" class="accordion-title">Find Devices</a>
          <div class="accordion-content no-padding" data-tab-content>
            <div class="grid-box">
              <div class="box-content">
                <table class="unstriped">
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
                                @input="addFilter_DeviceNames">
                        </multiselect>
                      </th>
                      <th width="85px"></th>
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
                                @input="addFilter_DeviceTypeNames">
                        </multiselect>
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
                    </tr>
                  </thead>
                  <tbody>
                    <template v-for="device in devices">
                      <tr class="overview-tr" :data-id="device.id" :class="activeDevice && (activeDevice.id == device.id) ? 'active' : ''">
                        <td>
                          <span class="badge toggle-button" @click="setActive(device)"><i class="fa fa-plus"></i><i class="fa fa-minus"></i></span>
                        </td>
                        <td>{{ device.name }}</td>
                        <td>{{ device.defaultPrice }} {{ device.currency }}</td>
                        <td>{{ _.get(device, 'devicetypes[0].name', '') }}</td>
                        <td>{{ device.make }}</td>
                        <td>{{ _.map(filterModificationsByType(device.modifications, 'capacity'), 'value').join(', ') }}</td>
                        <td>{{ _.map(filterModificationsByType(device.modifications, 'style'), 'value').join(', ') }}</td>
                      </tr>

                      <tr class="detail-tr" :data-id="device.id" :class="activeDevice && (activeDevice.id == device.id) ? 'active' : ''">
                        <td colspan="3" class="align-top">
                          <div class="detail-box">
                            <div class="content">
                              <div class="dv-group" v-for="(values, key) in getVariationsGroupByCarrier(device)">
                                <span><strong>{{ key }}</strong></span>
                                <ul>
                                    <li v-for="dv in values">
                                      <label>
                                        <input type="checkbox" name="variations" :value="dv.id" v-model="dv.checked" @change="onChange_DeviceVariation($event, device.id, dv.id)">
                                        <span>{{ `${dv.modifications.length > 0 ? dv.modifications[DeviceVariationHelper.getStyleIndex(dv)].value + ' ' + dv.modifications[DeviceVariationHelper.getCapacityIndex(dv)].value : ''} ${dv.companies.length > 0 ? ', ' + dv.companies[0].name : ''}` }}</span>
                                        <span style="float: right;">{{ dv.priceRetail | currency('', 2) }} {{ device.currency }}</span>
                                      </label>
                                    </li>
                                  </ul>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td colspan="4" class="align-top">
                          <div class="detail-box">
                            <div class="content">
                              <div class="row">
                                <div class="large-3 small-3 columns">
                                  <div class="image">
                                    <img :src="device.image" alt="Device Image" width="100" height="100"/>
                                  </div>
                                </div>

                                <div class="large-3 small-3 columns">
                                  <span><strong>Provider</strong></span>
                                  <ul>
                                    <li v-for="carrier in getCarriers(device)">
                                      <label>
                                        <input type="checkbox" :name="device.id + '-carriers'" :value="carrier.id" v-model="device.filters.carriers">
                                        {{ carrier.name }}
                                      </label>
                                    </li>
                                  </ul>
                                </div>

                                <div class="large-3 small-3 columns">
                                  <span><strong>Capacity</strong></span>
                                  <ul>
                                    <li v-for="capacity in filterModificationsByType(device.modifications, 'capacity')">
                                      <label>
                                        <input type="checkbox" :name="device.id + '-capacities'" :value="capacity.id" v-model="device.filters.capacities">
                                        {{ capacity.value }}
                                      </label>
                                    </li>
                                  </ul>
                                </div>

                                <div class="large-3 small-3 columns">
                                  <span><strong>Style</strong></span>
                                  <ul>
                                    <li v-for="style in filterModificationsByType(device.modifications, 'style')">
                                      <label>
                                        <input type="checkbox" :name="device.id + '-styles'" :value="style.id" v-model="device.filters.styles">
                                        {{ style.value }}
                                      </label>
                                    </li>
                                  </ul>
                                </div>
                              </div>

                              <div class="row">
                                <div class="small-12 columns">
                                  <span><strong>Technical Information</strong></span><br>
                                  {{ device.properties }}
                                  <!-- <div>{{ device.filters }}</div> -->
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
        </li>

        <li class="accordion-item" data-accordion-item>
          <a href="#" class="accordion-title">Selected Devices</a>
          <div class="accordion-content variations" data-tab-content>
            <div class="row">
              <template v-for="dv in preset.devicevariations">
                <div class="columns large-3 medium-4 small-6" v-if="dv.checked">
                  <label>
                    <input type="checkbox" name="preset_devicevariations" :id="'dv-' + dv.id" v-model="dv.checked" @change="$forceUpdate()">
                    <div class="card">
                      <div class="card-section" :style="'background-image: url(' + getImageUrl(dv.images[0]) + ')'">
                      </div>
                      <div class="card-section">
                        <span>{{ `${dv.devices[0].name}, ${dv.modifications.length > 0 ? dv.modifications[DeviceVariationHelper.getStyleIndex(dv)].value : ''} ${dv.modifications.length > 0 ? dv.modifications[DeviceVariationHelper.getCapacityIndex(dv)].value : ''}` }}</span><br>
                        <span>{{ `${dv.companies.length > 0 ? ', ' + dv.companies[0].name : '&nbsp;'}` }}</span><br>
                        <span>{{ `${dv.priceRetail} ${dv.devices[0].currency}` }}</span>
                      </div>
                    </div>
                  </label>
                </div>
              </template>
              <div class="columns large-3 medium-4 small-6 end">
              </div>
            </div>
          </div>
          <!-- <div>{{ preset.devicevariations }}</div> -->
        </li>
      </ul>
      <a class="save button large " @click="submit()" id="button">Save Preset</a>
    </div>

    <div class="is-loading" v-show="!isReady"></div>
  </div>
</template>
<script src="./Preset.crtl.js" lang="babel"></script>
