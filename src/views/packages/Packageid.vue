<template>
  <div>
    <div id="package" class="row">
      <div class="header">
        <div class="titles">
          <h4 v-if="status == 'new'">Create New Package</h4>
          <h4 v-else>Manage Package</h4>
        </div>
      </div>
      <div class="expanded row">
        <div class="large-12 columns">
          <div class="large-5 small-12 columns" style="padding-left: 5%">
            <label>
              Title
              <input type="text" v-model="onePackage.name">
            </label>
          </div>
        </div>
        <div class="large-12 columns">
          <ul class="acordeon" data-accordion data-allow-all-closed="true">
            <!-- CONDITIONS -->
            <li class="acordeon-item" data-accordion-item>
              <a href="#" class="accordion-title">
                <table class="textbold">
                  <tr>
                    <td>CONDITIONS</td>
                    <td align="right">0 Employees</td>
                  </tr>
                </table>
              </a>
              <div class="accordion-content overview" data-tab-content>
                <div class="row" v-if="conditions.loading">
                  <div class="titlesZones">
                    <i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
                  </div>
                </div>
                <div class="row" v-else>
                  <div class="row" v-for="(condition, index) in conditions.selected" >
                    <div class="large-3 small-12 columns">
                      <label>
                        Label
                        <multiselect v-model="condition.nameCond" placeholder="Select a Label" :searchable="false"
                                     :options="conditions.labels" @input="updateConditionFields(condition.nameCond, index)"
                                     :show-labels="false"></multiselect>
                      </label>
                    </div>
                    <div class="large-3 small-12 columns" v-if="condition.nameCond">
                      <label>
                        Condition
                        <multiselect v-model="condition.condition" placeholder="Select a Condition" :searchable="false"
                                     :options="condition.conditionOptions" :show-labels="false"></multiselect>
                      </label>
                    </div>
                    <div class="large-4 small-12 columns" v-if="condition.nameCond">
                      <label>
                        Value
                        <multiselect v-model="condition.value" placeholder="Select a Value" :searchable="false"
                                     :options="condition.valueOptions" :show-labels="false"></multiselect>
                      </label>
                    </div>
                    <div class="large-2 small-12 columns" style="padding-top: 25px">
                      <div class="large-4 small-4 small-offset-2 columns">
                        <a class="button" style="border-radius: 10px;" @click="deleteCondition(index)" v-show="condition.nameCond">
                          <i class="fa fa-times fa-2x" aria-hidden="true"></i>
                        </a>
                      </div>
                      <div class="large-4 large-offset-1 small-4 columns">
                        <a class="button" style="border-radius: 10px;" @click="addCondition()"
                           v-show="condition.nameCond && condition.condition && condition.value && (index == conditions.selected.length - 1)">
                          <i class="fa fa-plus fa-2x" aria-hidden="true"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <!-- END CONDITIONS -->
            <!-- DEVICES -->
            <li class="acordeon-item" data-accordion-item>
              <a href="#" class="accordion-title">
                <table class="textbold">
                  <tr>
                    <td>DEVICES</td>
                    <td align="right">From 0 USD to 0 USD once</td>
                  </tr>
                </table>
              </a>
              <div class="accordion-content overview" data-tab-content>
                <!-- PRESETS -->
                <div class="row" v-if="presetLoading">
                  <div class="titlesZones">
                    <i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
                  </div>
                </div>
                <div class="row" v-else>
                  <div class="row" v-if="presets.length">
                    <div class="titlesZones">Presets Available</div>
                    <carousel :perPage="6">
                      <slide v-for="(preset, index) in presets">
                        <div class="eachPreset" :class="{'active': preset.id == activePreset.id}" @click="setActive('activePreset', preset)">
                          <span class="preset-icon"><i class="fa fa-briefcase" aria-hidden="true"></i></span>
                          <div class="preset-content">{{preset.name}}</div>
                        </div>
                      </slide>
                    </carousel>
                  </div>
                  <div class="row" v-else>
                    <div class="titlesZones">No Available Presets</div>
                  </div>
                </div>
                <!-- END PRESETS -->
                <!-- DEVICES AVAILABLE -->
                <div class="row" v-if="activePreset.id">
                  <div class="row" v-if="devices.loading">
                    <div class="titlesZones">
                      <i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
                    </div>
                  </div>
                  <div class="row" v-else>
                    <div class="row" v-if="devices.availableDevices.length">
                      <div class="titlesZones">Devices Available From {{activePreset.name}}</div>
                      <carousel :perPage="6">
                        <slide v-for="(device, index) in devices.availableDevices">
                          <div class="eachDevice" @click="addDevice(index)">
                            <span class="device-image">
                              <img src="//openclipart.org/download/213897/black-android-phone.svg" />
                              {{device.devices[0].name}}
                              <br>
                              Price - {{device.priceOwn}}
                            </span>
                          </div>
                        </slide>
                      </carousel>
                    </div>
                    <div class="row" v-else>
                      <div class="titlesZones">No Available Devices</div>
                    </div>
                  </div>
                </div>
                <!-- END DEVICES AVAILABLE -->
                <!-- DEVICES SELECTED -->
                <div class="row" v-if="devices.selected.length">
                  <div class="titlesZones">Selected Devices</div>
                  <carousel :perPage="6">
                    <slide v-for="(device, index) in devices.selected">
                      <div class="eachDevice" @click="removeDevice(index)">
                        <span class="device-image">
                          <img src="//openclipart.org/download/213897/black-android-phone.svg" />
                          {{device.devices[0].name}}
                          <br>
                          Price - {{device.priceOwn}}
                        </span>
                      </div>
                    </slide>
                  </carousel>
                </div>
                <!-- END DEVICES SELECTED -->
              </div>
            </li>
            <!-- END DEVICES -->
            <!-- SERVICES -->
            <li class="acordeon-item" data-accordion-item>
              <a href="#" class="accordion-title">
                <table class="textbold">
                  <tr>
                    <td>SERVICES</td>
                    <td align="right">From 0 USD to 0 USD montly</td>
                  </tr>
                </table>
              </a>
              <div class="accordion-content overview" data-tab-content>
                <!-- CARRIERS -->
                <div class="row" v-if="carrierLoading">
                  <div class="titlesZones">
                    <i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
                  </div>
                </div>
                <div class="row" v-else>
                  <div class="row" v-if="carriers.length">
                    <div class="titlesZones">Carriers Available</div>
                    <carousel :perPage="6">
                      <slide v-for="(carrier, index) in carriers">
                        <div class="eachCarrier" :class="{'active': carrier.id == activeCarrier.id}" @click="setActive('activeCarrier', carrier)">
                          <span class="carrier-icon"><i class="fa fa-cubes" aria-hidden="true"></i></span>
                          <div class="carrier-content">{{carrier.shortName}}</div>
                        </div>
                      </slide>
                    </carousel>
                  </div>
                  <div class="row" v-else>
                    <div class="titlesZones">No Carriers Available</div>
                  </div>
                </div>
                <!-- END CARRIERS -->
                <!-- SERVICES UNDER CARRIER -->
                <div class="row" v-if="activeCarrier.id">
                  <div class="row" v-if="services.loading">
                    <div class="titlesZones">
                      <i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
                    </div>
                  </div>
                  <div class="row" v-else>
                    <div class="row" v-if="services.availableServices.length">
                      <div class="titlesZones">Services Available From {{activeCarrier.shortName}}</div>
                      <carousel :perPage="5">
                        <slide v-for="(service, index) in services.availableServices">
                          <div class="eachService" :class="{'active': service.id == activeService.id}" @click="setActive('activeService', service)">
                            <span class="service-icon"><i class="fa fa-cube" aria-hidden="true"></i></span>
                            <div class="service-content">{{service.title}}</div>
                          </div>
                        </slide>
                      </carousel>
                    </div>
                    <div class="row" v-else>
                      <div class="titlesZones">No Available Services</div>
                    </div>
                  </div>
                </div>
                <!-- END SERVICES UNDER CARRIER -->
                <div class="row service-detail" v-if="activeService.id">
                  <div class="large-12 columns">
                    <label>
                      Description
                      <p class="service-description">{{activeService.description}}</p>
                    </label>
                    <label>
                      Price
                      <p class="service-cost">{{activeService.cost}} {{activeService.currency}}</p>
                    </label>
                  </div>
                  <div>
                    <div class="large-10 small-12 columns">
                      <table v-if="activeService.serviceitems.length">
                        <thead>
                        <tr>
                          <th>Domain</th>
                          <th>Category</th>
                          <th>Value</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                          <td>Domestic</td>
                          <td>Voice</td>
                          <td>{{activeService.serviceitems[0].value}} {{activeService.serviceitems[0].unit}}</td>
                        </tr>
                        <tr>
                          <td>Domestic</td>
                          <td>Data</td>
                          <td>{{activeService.serviceitems[1].value}} {{activeService.serviceitems[1].unit}}</td>
                        </tr>
                        <tr>
                          <td>Domestic</td>
                          <td>Message</td>
                          <td>{{activeService.serviceitems[2].value}} {{activeService.serviceitems[2].unit}}</td>
                        </tr>
                        <tr>
                          <td>International</td>
                          <td>Voice</td>
                          <td>{{activeService.serviceitems[3].value}} {{activeService.serviceitems[3].unit}}</td>
                        </tr>
                        <tr>
                          <td>International</td>
                          <td>Data</td>
                          <td>{{activeService.serviceitems[4].value}} {{activeService.serviceitems[4].unit}}</td>
                        </tr>
                        <tr>
                          <td>International</td>
                          <td>Message</td>
                          <td>{{activeService.serviceitems[5].value}} {{activeService.serviceitems[5].unit}}</td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="large-2 small-12 columns">
                      <a class="button" style="border-radius: 10px; margin-top: 10px;" @click="removeService()" v-if="activeService.status == 1">
                        <i class="fa fa-times fa-2x" aria-hidden="true"></i>
                      </a>
                      <a class="button" style="border-radius: 10px; margin-top: 10px;" @click="addService()" v-else>
                        <i class="fa fa-plus fa-2x" aria-hidden="true"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <!-- SELECTED SERVICES -->
                <div class="row" v-if="services.selected.length">
                  <div class="titlesZones">Selected Services</div>
                  <carousel :perPage="5">
                    <slide v-for="(service, index) in services.selected">
                      <div class="eachService" :class="{'active': service.id == activeService.id}" @click="setActive('activeService', service)">
                        <span class="service-icon"><i class="fa fa-cube" aria-hidden="true"></i></span>
                        <div class="service-content">{{service.title}}</div>
                      </div>
                    </slide>
                  </carousel>
                </div>
                <!-- END SELECTED SERVICES -->
              </div>
            </li>
            <!-- END SERVICES -->
            <!-- ADDRESSES -->
            <li class="acordeon-item" data-accordion-item>
              <a href="#" class="accordion-title">
                <table class="textbold">
                  <tr>
                    <td>ADDRESS</td>
                  </tr>
                </table>
              </a>
              <div class="accordion-content overview" data-tab-content>
                <div class="row" v-if="addresses.loading">
                  <div class="titlesZones">
                    <i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
                  </div>
                </div>
                <div class="row" v-else>
                  <div class="row" v-if="addresses.availableAddresses.length">
                    <div class="titlesZones">Addresses Available</div>
                    <carousel :perPage="6">
                      <slide v-for="(address, index) in addresses.availableAddresses">
                        <div class="eachAddress" :class="{'active': address.id == activeAddress.id}" @click="setActive('activeAddress', address)">
                          <span class="address-icon"><i class="fa fa-globe" aria-hidden="true"></i></span>
                          <div class="address-content">{{address.name}}</div>
                        </div>
                      </slide>
                    </carousel>
                  </div>
                  <div class="row" v-else>
                    <div class="titlesZones">No Available Addresses</div>
                  </div>
                </div>
                <!-- ADDRESS DETAIL -->
                <div class="row address-detail" v-if="activeAddress.id">
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
                    <a class="button" style="border-radius: 10px; margin-top: 10px;" @click="removeAddress()" v-if="activeAddress.status == 1">
                      <i class="fa fa-times fa-2x" aria-hidden="true"></i>
                    </a>
                    <a class="button" style="border-radius: 10px; margin-top: 10px;" @click="addAddress()" v-else>
                      <i class="fa fa-plus fa-2x" aria-hidden="true"></i>
                    </a>
                  </div>
                </div>
                <!-- END ADDRESS DETAIL -->

                <div class="row" v-if="addresses.selected.length">
                  <div class="titlesZones">Selected Addresses</div>
                  <carousel :perPage="6">
                    <slide v-for="(address, index) in addresses.selected">
                      <div class="eachAddress" :class="{'active': address.id == activeAddress.id}" @click="setActive('activeAddress', address)">
                        <span class="address-icon"><i class="fa fa-globe" aria-hidden="true"></i></span>
                        <div class="address-content">{{address.name}}</div>
                      </div>
                    </slide>
                  </carousel>
                </div>
              </div>
            </li>
            <!-- END ADDRESSES -->
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./packageid.crtl.js" lang="babel" ></script>
<style>
  table {
    margin-bottom: 0;
  }

  .eachPreset, .eachCarrier, .eachAddress {
    color: #444444;
    height: 120px;
    position: relative;
    padding-top: 10px;
  }

  .eachService {
    color: #444444;
    height: 150px;
    position: relative;
    padding-top: 10px;
  }

  .eachPreset .preset-icon, .eachCarrier .carrier-icon, .eachService .service-icon, .eachAddress .address-icon {
    margin-top: 10px;
    display: block;
    text-align: center;
    font-size: 2em;
  }

  .eachPreset .preset-content, .eachCarrier .carrier-content, .address-content {
    font-size: 20px;
    font-weight: bold;
    text-align: center;
  }


  .eachPreset.active, .eachCarrier.active, .eachAddress.active {
    background-color: #f35d0a;
    color: #fff;
  }

  .eachDevice {
    color: #444444;
    height: 300px;
    text-align: center;
  }

  .eachService .service-content {
    font-size: 15px;
    font-weight: bold;
    text-align: center;
    padding: 0 10px;
  }

  .eachService.active {
    border: 2px solid #f35d0a;
  }

  .eachService.active:after {
    display: inline-block;
    font: normal normal normal 14px/1 FontAwesome;
    font-size: 25px;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;

    content: "\f05d";
    position: absolute;
    top: 20px;
    right: -12px;
    color: #f35d0a;
    background: #fff;
  }

  .service-description, .service-cost {
    color: #000;
  }

</style>
