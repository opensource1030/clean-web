<template>
  <div class="page package-new-page">
    <modal v-if="$store.getters['error/hasError']" @close="$store.dispatch('error/clearAll')">
      <h3 slot="body">{{ $store.getters['error/error'] }}</h3>
    </modal>

    <div class="columns small-12">
      <header class="tag-header">
        <h1 v-if="packageId">Update Package</h1>
        <h1 v-else>New Package</h1>
      </header>
      <div class="grid-box">
        <div class="box-content">
          <div class="row expanded">
            <div class="columns large-6 small-12">
              <label>
                <strong>Title</strong>
                <input type="text" v-model="packageName">
              </label>
            </div>
            <div class="columns large-6 small-12">
              <label>
                <strong>Description</strong>
                <textarea type="text" v-model="packageDescription" rows="3"></textarea>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="columns small-12">
      <div class="grid-box package-condition">
        <div class="box-heading">
          <h2>Conditions</h2>
        </div>
        <div class="box-content-holder is-relative" v-if="conditions.loading">
          <div class="is-loading"></div>
        </div>
        <div class="box-content" v-else>
          <div class="row expanded">
            <div class="columns small-12">
              <div class="row expanded" v-if="conditions.labels.length">
                <div class="row expanded" v-for="(condition, index) in conditions.selected">
                  <div class="large-3 small-12 columns">
                    <label>
                      <strong>Label</strong>
                      <multiselect v-model="condition.nameCond" placeholder="Select a Label" :searchable="false"
                                   :options="conditions.labels"
                                   @input="updateConditionFields(condition.nameCond, index)"
                                   :show-labels="false"></multiselect>
                    </label>
                  </div>

                  <div class="large-3 small-12 columns" v-if="condition.nameCond">
                    <label>
                      <strong>Condition</strong>
                      <multiselect v-model="condition.condition" placeholder="Select a Condition" :searchable="false"
                                   :options="condition.conditionOptions || []" :show-labels="false"></multiselect>
                    </label>
                  </div>

                  <div class="large-4 small-12 columns" v-if="condition.nameCond">
                    <label>
                      <strong>Value</strong>
                      <multiselect v-model="condition.value" placeholder="Select a Value" :searchable="false"
                                   :options="condition.valueOptions || []" :show-labels="false"></multiselect>
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
              <div class="row expanded" v-else>
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
          <h2>Settings</h2>
        </div>
        <div class="box-content">
          <div class="row" v-if="isReady">
            <div class="columns small-4">
              <label>
                <span>Pay by Personal Credit or Debit Card</span>
                <div class="switch tiny">
                  <input class="switch-input" :id="'setting-payby-' + packageId" type="checkbox"
                      :name="'setting-payby-' + packageId"
                      v-model="PackageHelper.getPayBySetting(packageData).value">
                  <label class="switch-paddle" :for="'setting-payby-' + packageId"></label>
                </div>
              </label>
            </div>
            <div class="columns small-4">
              <label>
                <span>Bring Your Own Device</span>
                <div class="switch tiny">
                  <input class="switch-input" :id="'setting-bringown-' + packageId" type="checkbox"
                      :name="'setting-bringown-' + packageId"
                      v-model="PackageHelper.getBringOwnSetting(packageData).value">
                  <label class="switch-paddle" :for="'setting-bringown-' + packageId"></label>
                </div>
              </label>
            </div>
            <div class="columns small-4">
              &nbsp;
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
          <div class="is-loading"></div>
        </div>
        <div class="box-content" v-else>
          <div class="row expanded">
            <div class="columns small-12">
              <div class="row expanded" v-if="presets.length">
                <div class="sub-title">Presets Available</div>
                <carousel :perPage="6">
                  <slide v-for="(preset, index) in presets">
                    <div class="box-type-1" :class="{'active': preset.id == activePreset.id}"
                         @click="setActive('activePreset', preset)">
                      <span class="box-icon"><i class="fa fa-briefcase" aria-hidden="true"></i></span>
                      <div class="box-content">{{preset.name}}</div>
                    </div>
                  </slide>
                </carousel>
              </div>

              <div class="row expanded" v-else>
                <div class="sub-title">No Available Presets</div>
              </div>

              <div class="row expanded" v-if="activePreset.id">
                <div class="box-content-holder is-relative" v-if="devices.loading">
                  <div class="is-loading"></div>
                </div>
                <template v-else>
                  <hr>
                  <div class="columns small-12">
                    <div class="row expanded" v-if="devices.availableDevices.length">
                      <div class="sub-title">Devices Available from {{activePreset.name}}</div>

                      <carousel :perPage="6">
                        <slide v-for="(device, index) in devices.availableDevices">
                          <transition appear
                                      enter-class=""
                                      enter-active-class="animated zoomIn"
                                      leave-class=""
                                      leave-active-class="animated zoomOut"

                          >
                            <div class="eachDevice" @click="addDevice(index)">
                          <span class="device-image">
                            <img :src="getImageUrl(device.devices[0])"/>
                            <p class="m-b-0">{{device.devices[0].name}}</p>
                            <p class="m-b-0">{{device.modifications[0].value}} - {{device.modifications[1].value}}</p>
                            <br>
                            <div class="clearfix"></div>
                          </span>
                            </div>
                          </transition>
                        </slide>
                      </carousel>

                    </div>
                    <div class="row expanded" v-else>
                      <div class="sub-title">No Available Devices</div>
                    </div>
                  </div>
                </template>
              </div>

              <template v-if="devices.selected.length">
                <hr>
                <div class="row expanded">
                  <div class="sub-title">Selected Devices</div>
                  <carousel :perPage="6">
                    <slide v-for="(device, index) in devices.selected">
                      <transition appear
                                  enter-class=""
                                  enter-active-class="animated zoomIn"
                                  leave-class=""
                                  leave-active-class="animated zoomOut">
                        <div class="eachDevice" @click="removeDevice(index)">
                          <span class="device-image">
                            <img :src="getImageUrl(device.devices[0])"/>
                            <p class="m-b-0">{{device.devices[0].name}}</p>
                            <p class="m-b-0">{{device.modifications[0].value}} - {{device.modifications[1].value}}</p>
                            <br>
                            <div class="clearfix"></div>
                          </span>
                        </div>
                      </transition>
                    </slide>
                  </carousel>
                </div>
              </template>

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
          <div class="is-loading"></div>
        </div>
        <div class="box-content" v-else>
          <div class="row expanded">
            <div class="columns small-12">
              <div class="row expanded" v-if="carriers.length">
                <div class="sub-title">Carriers Available</div>
                <carousel :perPage="6">
                  <slide v-for="(carrier, index) in carriers">
                    <transition appear
                                enter-class=""
                                enter-active-class="animated zoomIn"
                                leave-class=""
                                leave-active-class="animated zoomOut"

                    >
                      <div class="box-type-1" :class="{'active': carrier.id == activeCarrier.id}"
                           @click="setActive('activeCarrier', carrier)">
                        <span class="box-icon"><i class="fa fa-cubes" aria-hidden="true"></i></span>
                        <div class="box-content">{{carrier.shortName}}</div>
                      </div>
                    </transition>
                  </slide>
                </carousel>
              </div>
              <template v-else>
                <hr>
                <div class="row expanded">
                  <div class="sub-title">No Carriers Available</div>
                </div>
              </template>
              <template v-if="activeCarrier.id">
                <hr>
                <div class="row expanded">
                  <div class="box-content-holder is-relative" v-if="services.loading">
                    <div class="is-loading"></div>
                  </div>
                  <div class="columns small-12" v-else>
                    <div class="row expanded" v-if="services.availableServices.length">
                      <div class="sub-title">Services Available From {{activeCarrier.shortName}}</div>
                      <carousel :perPage="5">
                        <slide v-for="(service, index) in services.availableServices">
                          <transition appear
                                      enter-class=""
                                      enter-active-class="animated zoomIn"
                                      leave-class=""
                                      leave-active-class="animated zoomOut"

                          >
                            <div class="box-type-2" :class="{'active': service.id == activeService.id}"
                                 @click="setActive('activeService', service)">
                              <span class="box-icon"><i class="fa fa-cube" aria-hidden="true"></i></span>
                              <div class="box-content">{{service.title}}</div>
                            </div>
                          </transition>
                        </slide>
                      </carousel>
                    </div>
                    <div class="row expanded" v-else>
                      <div class="sub-title">No Available Services</div>
                    </div>
                  </div>
                </div>
              </template>
              <template v-if="activeService.id">
                <hr>
                <transition appear
                            enter-class=""
                            enter-active-class="animated fadeIn"
                            leave-class=""
                            leave-active-class="animated fadeOut"

                >
                  <div class="row expanded">
                    <div class="columns large-12">
                      <label>
                        <strong>Description</strong>
                        <p>{{activeService.description}}</p>
                      </label>
                      <label>
                        <strong>Price</strong>
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
                </transition>
              </template>
              <template v-if="services.selected.length">
                <hr>
                <div class="row expanded">
                  <div class="sub-title">Selected Services</div>
                  <carousel :perPage="5">
                    <slide v-for="(service, index) in services.selected">
                      <transition appear
                                  enter-class=""
                                  enter-active-class="animated fadeIn"
                                  leave-class=""
                                  leave-active-class="animated fadeOut"

                      >
                        <div class="box-type-2" :class="{'active': service.id == activeService.id}"
                             @click="setActive('activeService', service)">
                          <span class="box-icon"><i class="fa fa-cube" aria-hidden="true"></i></span>
                          <div class="box-content">{{service.title}}</div>
                        </div>
                      </transition>
                    </slide>
                  </carousel>
                </div>
              </template>
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
          <div class="is-loading"></div>
        </div>
        <div class="box-content" v-else>
          <div class="row expanded">
            <div class="columns small-12">
              <template v-if="addresses.availableAddresses.length">
                <div class="row expanded">
                  <div class="sub-title">Addresses Available</div>
                  <carousel :perPage="6">
                    <slide v-for="(address, index) in addresses.availableAddresses">
                      <transition appear
                                  enter-class=""
                                  enter-active-class="animated fadeIn"
                                  leave-class=""
                                  leave-active-class="animated fadeOut"

                      >
                        <div class="box-type-1" :class="{'active': address.id == activeAddress.id}"
                             @click="setActive('activeAddress', address)">
                          <span class="box-icon"><i class="fa fa-globe" aria-hidden="true"></i></span>
                          <div class="box-content">{{address.name}}</div>
                        </div>
                      </transition>
                    </slide>
                  </carousel>
                </div>

              </template>
              <template v-else>
                <div class="row expanded">
                  <div class="sub-title">No Available Addresses</div>
                </div>
                <hr>
              </template>

              <div class="row extend" v-if="activeAddress.id">
                <hr>

                <div class="large-10 small-12 columns">
                  <transition appear
                              enter-class=""
                              enter-active-class="animated fadeIn"
                              leave-class=""
                              leave-active-class="animated fadeOut"

                  >
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
                  </transition>
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
                <hr>
                <div class="sub-title">Selected Addresses</div>
                <carousel :perPage="6">
                  <slide v-for="(address, index) in addresses.selected">
                    <transition appear
                                enter-class=""
                                enter-active-class="animated zoomIn"
                                leave-class=""
                                leave-active-class="animated zoomOut"

                    >
                      <div class="box-type-1" :class="{'active': address.id == activeAddress.id}"
                           @click="setActive('activeAddress', address)">
                        <span class="box-icon"><i class="fa fa-globe" aria-hidden="true"></i></span>
                        <div class="box-content">{{address.name}}</div>
                      </div>
                    </transition>
                  </slide>
                </carousel>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
    <div class="clearfix"></div>

    <div class="columns large-4 small-12">
      <div class="input-group">
        <span class="input-group-label">Approval</span>
        <input class="input-group-field" type="text" v-model="packageCode">
      </div>
    </div>
    <div class="columns large-8 small-12">
    </div>


    <div class="columns small-12">
      <a class="button large save-button" @click="savePackage()" :disabled="packageName && packageCode == ''">
        <span v-if="packageId">Update Package</span>
        <span v-else>Create Package</span>
      </a>
    </div>
  </div>
</template>
<script src="./packageid.crtl.js" lang="babel"></script>
