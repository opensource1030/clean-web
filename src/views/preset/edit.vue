<template>
  <div class="page preset-page preset-edit-page">
    <b-modal
      :visible="$store.getters['error/hasError']"
      @hidden="$store.dispatch('error/clearAll')"
      hide-footer
    >
      <div class="d-block text-center is-error">
        <h3>{{ $store.getters['error/error'] }}</h3>
      </div>
    </b-modal>

    <div class="row mb-3">
      <div class="col-md-6">
        <label class="field">
          <strong>Title</strong>
          <input type="text" v-model="preset.name">
        </label>

        <label class="field">
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

    <spinner v-if="!isReady" />

    <div v-show="isReady && parseInt(preset.companyId) > 0">
      <div role="tablist">
        <b-card no-body class="">
          <b-card-header header-tag="header" class="p-0" role="tab">
            <b-button block href="#" v-b-toggle.accordion-1 variant="info">Find Devices</b-button>
          </b-card-header>
          <b-collapse id="accordion-1" accordion="my-accordion" role="tabpanel">
            <b-card-body>
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
                        <span class="badge badge-primary" @click="setActive(device)">
                          <i class="fa fa-plus"></i><i class="fa fa-minus"></i>
                        </span>
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
                        <div class="dv-group" v-for="(values, key) in getVariationsGroupByCarrier(device)">
                          <strong>{{ key }}</strong>
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
                      </td>
                      <td colspan="4" class="align-top">
                        <div class="row">
                          <div class="col-sm-3">
                            <div class="image">
                              <img :src="device.image" alt="Device Image" width="100" height="100"/>
                            </div>
                          </div>

                          <div class="col-sm-3">
                            <strong>Provider</strong>
                            <ul>
                              <li v-for="carrier in getCarriers(device)">
                                <label>
                                  <input type="checkbox" :name="device.id + '-carriers'" :value="carrier.id" v-model="device.filters.carriers">
                                  {{ carrier.name }}
                                </label>
                              </li>
                            </ul>
                          </div>

                          <div class="col-sm-3">
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

                          <div class="col-sm-3">
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
                          <div class="col-sm-12">
                            <span><strong>Technical Information</strong></span><br>
                            {{ device.properties }}
                            <!-- <div>{{ device.filters }}</div> -->
                          </div>
                        </div>
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </b-card-body>
          </b-collapse>
        </b-card>

        <b-card no-body class="">
          <b-card-header header-tag="header" class="p-0" role="tab">
            <b-button block href="#" v-b-toggle.accordion-2 variant="info">Selected Devices</b-button>
          </b-card-header>
          <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <div class="row">
                <template v-for="dv in preset.devicevariations">
                  <div class="col-lg-3 col-md-4 col-sm-6" v-if="dv.checked">
                    <label class="field">
                      <input type="checkbox" name="preset_devicevariations" :id="'dv-' + dv.id" v-model="dv.checked" @change="$forceUpdate()">
                      <div class="card device-card">
                        <div class="card-img" :style="'background-image: url(' + getImageUrl(dv.images[0]) + ')'"></div>
                        <div class="card-body">
                          <span>{{ `${dv.devices[0].name}, ${dv.modifications.length > 0 ? dv.modifications[DeviceVariationHelper.getStyleIndex(dv)].value : ''} ${dv.modifications.length > 0 ? dv.modifications[DeviceVariationHelper.getCapacityIndex(dv)].value : ''}` }}</span><br>
                          <span>{{ `${dv.companies.length > 0 ? ', ' + dv.companies[0].name : '&nbsp;'}` }}</span><br>
                          <span>{{ `${dv.priceRetail} ${dv.devices[0].currency}` }}</span>
                        </div>
                      </div>
                    </label>
                  </div>
                </template>
                <div class="col-lg-3 col-md-4 col-sm-6 align-self-end">
                </div>
              </div>
            </b-card-body>
          </b-collapse>
        </b-card>

        <div class="mb-5">
          <b-btn size="lg" variant="primary" class="save-button" @click="submit()">Save Preset</b-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./edit.crtl.js" lang="babel"></script>
