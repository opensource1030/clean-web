<template>
  <div class="page package-new-page">
    <modal v-if="$store.getters['error/hasError']" @close="$store.dispatch('error/clearAll')">
      <h3 slot="body">{{ $store.getters['error/error'] }}</h3>
    </modal>
    
    <div class="columns small-12 m-b-15">
      <header class="tag-header">
        <h1 v-if="packageId">Update Package</h1>
        <h1 v-else>New Package</h1>
      </header>
    </div>

    <div class="large-5 small-12 columns ">
      <label>
        <span>Title</span>
        <input type="text" v-model="packageName">
      </label>
      <label>
        <span>Description</span>
        <textarea type="text" v-model="packageDescription" rows="5"></textarea>
      </label>
    </div>

    <div class="columns small-12">
      <div class="grid-box package-condition">
        <div class="box-heading">
          <h2>Conditions</h2>
        </div>
        <div class="box-content-holder is-relative" v-if="conditions.loading">
          <div class="is-loading"> </div>
        </div>
        <div class="box-content" v-else>
          <div class="row extend">
            <div class="columns small-12">
              <div class="row extend" v-if="conditions.labels.length">
                <div class="row extend" v-for="(condition, index) in conditions.selected">
                  <div class="large-3 small-12 columns">
                    <label>
                      <span>Label</span>
                      <multiselect v-model="condition.nameCond" placeholder="Select a Label" :searchable="false"
                                  :options="conditions.labels" @input="updateConditionFields(condition.nameCond, index)"
                                  :show-labels="false"></multiselect>
                    </label>
                  </div>
                  <div class="large-3 small-12 columns" v-if="condition.nameCond">
                    <label>
                      <span>Condition</span>
                      <multiselect v-model="condition.condition" placeholder="Select a Condition" :searchable="false"
                                  :options="condition.conditionOptions" :show-labels="false"></multiselect>
                    </label>
                  </div>
                  <div class="large-4 small-12 columns" v-if="condition.nameCond">
                    <label>
                      <span>Value</span>
                      <multiselect v-model="condition.value" placeholder="Select a Value" :searchable="false"
                                  :options="condition.valueOptions" :show-labels="false"></multiselect>
                    </label>
                  </div>
                  <div class="large-2 small-12 columns p-t-25">
                    <a class="button delete m-r-10" @click="deleteCondition(index)" v-show="condition.nameCond">
                      <i class="fa fa-times" aria-hidden="true"></i>
                    </a>

                    <a class="button" @click="addCondition()"
                      v-show="condition.nameCond && condition.condition && condition.value && (index == conditions.selected.length - 1)">
                      <i class="fa fa-plus" aria-hidden="true"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div class="row extend" v-else>
                <div class="sub-title">No Available Conditions</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="columns small-12">
      <div class="grid-box package-condition">
        <div class="box-heading">
          <h2>Devices</h2>
        </div>
        <div class="box-content-holder is-relative" v-if="presetLoading">
          <div class="is-loading"> </div>
        </div>
        <div class="box-content" v-else>
          <div class="row extend">
            <div class="columns small-12">
              <div class="row extend" v-if="presets.length">
                <div class="sub-title">Presets Available</div>
                <carousel :perPage="6">
                  <slide v-for="(preset, index) in presets">
                    <div class="box-type-1" :class="{'active': preset.id == activePreset.id}" @click="setActive('activePreset', preset)">
                      <span class="box-icon"><i class="fa fa-briefcase" aria-hidden="true"></i></span>
                      <div class="box-content">{{preset.name}}</div>
                    </div>
                  </slide>
                </carousel>
              </div>
              <div class="row extend" v-else>
                <div class="sub-title">No Available Presets</div>
              </div>

              <div class="row extend" v-if="activePreset.id">
                <div class="box-content-holder is-relative" v-if="devices.loading">
                  <div class="is-loading"> </div>
                </div>
                <div class="columns small-12" v-else>
                  <div class="row extend" v-if="devices.availableDevices.length">
                    <div class="sub-title">Devices Available from {{activePreset.name}}</div>
                    <carousel :perPage="6">
                      <slide v-for="(device, index) in devices.availableDevices">
                        <div class="eachDevice" @click="addDevice(index)">
                          <span class="device-image">
                            <img :src="getImageUrl(device.devices[0])" />
                            <p class="m-b-0">{{device.devices[0].name}}</p>
                            <p class="m-b-0">{{device.modifications[0].value}} - {{device.modifications[1].value}}</p>
                            <br>
                            <div class="clearfix"></div>
                          </span>
                        </div>
                      </slide>
                    </carousel>
                  </div>
                  <div class="row extend" v-else>
                    <div class="sub-title">No Available Devices</div>
                  </div>
                </div>
              </div>

              <div class="row extend" v-if="devices.selected.length">
                <div class="sub-title">Selected Devices</div>
                <carousel :perPage="6">
                  <slide v-for="(device, index) in devices.selected">
                    <div class="eachDevice" @click="removeDevice(index)">
                      <span class="device-image">
                        <img :src="getImageUrl(device.devices[0])" />
                        <p class="m-b-0">{{device.devices[0].name}}</p>
                        <p class="m-b-0">{{device.modifications[0].value}} - {{device.modifications[1].value}}</p>
                        <br>
                        <div class="clearfix"></div>
                      </span>
                    </div>
                  </slide>
                </carousel>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="columns small-12">
      <div class="grid-box package-condition">
        <div class="box-heading">
          <h2>Services</h2>
        </div>
        <div class="box-content-holder is-relative" v-if="carrierLoading">
          <div class="is-loading"> </div>
        </div>
        <div class="box-content" v-else>
          <div class="row extend">
            <div class="columns small-12">
              <div class="row extend" v-if="carriers.length">
                <div class="sub-title">Carriers Available</div>
                <carousel :perPage="6">
                  <slide v-for="(carrier, index) in carriers">
                    <div class="box-type-1" :class="{'active': carrier.id == activeCarrier.id}" @click="setActive('activeCarrier', carrier)">
                      <span class="box-icon"><i class="fa fa-cubes" aria-hidden="true"></i></span>
                      <div class="box-content">{{carrier.shortName}}</div>
                    </div>
                  </slide>
                </carousel>
              </div>
              <div class="row extend" v-else>
                <div class="sub-title">No Carriers Available</div>
              </div>

              <div class="row extend" v-if="activeCarrier.id">
                <div class="box-content-holder is-relative" v-if="services.loading">
                  <div class="is-loading"> </div>
                </div>
                <div class="columns small-12" v-else>
                  <div class="row extend" v-if="services.availableServices.length">
                    <div class="sub-title">Services Available From {{activeCarrier.shortName}}</div>
                    <carousel :perPage="5">
                      <slide v-for="(service, index) in services.availableServices">
                        <div class="box-type-2" :class="{'active': service.id == activeService.id}" @click="setActive('activeService', service)">
                          <span class="box-icon"><i class="fa fa-cube" aria-hidden="true"></i></span>
                          <div class="box-content">{{service.title}}</div>
                        </div>
                      </slide>
                    </carousel>
                  </div>
                  <div class="row extend" v-else>
                    <div class="sub-title">No Available Services</div>
                  </div>
                </div>
              </div>

              <div class="row extend" v-if="activeService.id">
                <div class="columns large-12">
                  <label>
                    <span>Description</span>
                    <p>{{activeService.description}}</p>
                  </label>
                  <label>
                    <span>Price</span>
                    <p>{{activeService.cost}} {{activeService.currency}}</p>
                  </label>
                </div>
                <div>
                  <div class="large-10 small-12 columns">
                    <table>
                      <thead>
                      <tr>
                        <th>Domain</th>
                        <th>Category</th>
                        <th>Value</th>
                      </tr>
                      </thead>
                      <tbody v-if="activeService.serviceitems.length">
                      <tr v-for="serviceItem in activeService.serviceitems">
                        <td>
                          <span v-if="serviceItem.domain == 'domestic'">Domestic</span>
                          <span v-else>International</span>
                        </td>
                        <td class="capitalize">{{serviceItem.category}}</td>
                        <td>{{serviceItem.value}} {{serviceItem.unit}}</td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="large-2 small-12 columns">
                    <a class="button delete m-r-10" @click="removeService()" v-if="activeService.added == 1">
                      <i class="fa fa-times" aria-hidden="true"></i>
                    </a>
                    <a class="button" @click="addService()" v-else>
                      <i class="fa fa-plus" aria-hidden="true"></i>
                    </a>
                  </div>
                </div>
              </div>

              <div class="row extend" v-if="services.selected.length">
                <div class="sub-title">Selected Services</div>
                <carousel :perPage="5">
                  <slide v-for="(service, index) in services.selected">
                    <div class="box-type-2" :class="{'active': service.id == activeService.id}" @click="setActive('activeService', service)">
                      <span class="box-icon"><i class="fa fa-cube" aria-hidden="true"></i></span>
                      <div class="box-content">{{service.title}}</div>
                    </div>
                  </slide>
                </carousel>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="columns small-12">
      <div class="grid-box package-condition">
        <div class="box-heading">
          <h2>Addresses</h2>
        </div>
        <div class="box-content-holder is-relative" v-if="addresses.loading">
          <div class="is-loading"> </div>
        </div>
        <div class="box-content" v-else>
          <div class="row extend">
            <div class="columns small-12">
              <div class="row extend" v-if="addresses.availableAddresses.length">
                <div class="sub-title">Addresses Available</div>
                <carousel :perPage="6">
                  <slide v-for="(address, index) in addresses.availableAddresses">
                    <div class="box-type-1" :class="{'active': address.id == activeAddress.id}" @click="setActive('activeAddress', address)">
                      <span class="box-icon"><i class="fa fa-globe" aria-hidden="true"></i></span>
                      <div class="box-content">{{address.name}}</div>
                    </div>
                  </slide>
                </carousel>
              </div>
              <div class="row extend" v-else>
                <div class="sub-title">No Available Addresses</div>
              </div>

              <div class="row extend" v-if="activeAddress.id">
                <div class="large-10 small-12 columns">
                  <table>
                    <thead>
                    <tr>
                      <th>Country</th>
                      <th>City</th>
                      <th>PostalCode</th>
                      <th>State</th>
                      <th>Address</th>
                      <th>Phone No</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td>{{activeAddress.country}}</td>
                      <td>{{activeAddress.city}}</td>
                      <td>{{activeAddress.postalCode}}</td>
                      <td>{{activeAddress.state}}</td>
                      <td>{{activeAddress.address}}</td>
                      <td>{{activeAddress.phone}}</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
                <div class="large-2 small-12 columns">
                  <a class="button delete m-r-10" @click="removeAddress()" v-if="activeAddress.added == 1">
                    <i class="fa fa-times" aria-hidden="true"></i>
                  </a>
                  <a class="button" @click="addAddress()" v-else>
                    <i class="fa fa-plus" aria-hidden="true"></i>
                  </a>
                </div>
              </div>

              <div class="row extend" v-if="addresses.selected.length">
                <div class="sub-title">Selected Addresses</div>
                <carousel :perPage="6">
                  <slide v-for="(address, index) in addresses.selected">
                    <div class="box-type-1" :class="{'active': address.id == activeAddress.id}" @click="setActive('activeAddress', address)">
                      <span class="box-icon"><i class="fa fa-globe" aria-hidden="true"></i></span>
                      <div class="box-content">{{address.name}}</div>
                    </div>
                  </slide>
                </carousel>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="columns small-12">
      <a class="button large save-button" @click="savePackage()" :disabled="packageName == ''">
        <span v-if="packageId">Update Package</span>
        <span v-else>Create Package</span>
      </a>
    </div>
  </div>
</template>
<script src="./packageid.crtl.js" lang="babel"></script>
