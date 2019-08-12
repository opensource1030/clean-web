<template>
  <div class="page edit-page package-page">
    <b-modal
      :visible="$store.getters['error/hasError']"
      @hidden="$store.dispatch('error/clearAll')"
      hide-footer
    >
      <div class="d-block text-center is-error">
        <h3>{{ $store.getters['error/error'] }}</h3>
      </div>
    </b-modal>

    <div>
      <div class="tag-header bg-info">
        <template v-if="packageId">Update Package</template>
        <template v-else>New Package</template>
      </div>
      <b-card no-body class="section-card">
        <b-card-body>
          <div class="row">
            <div class="col-lg">
              <label class="field">
                <strong>Title</strong>
                <input type="text" v-model="packageName">
              </label>
            </div>
            <div class="col-lg">
              <label class="field">
                <strong>Description</strong>
                <textarea type="text" v-model="packageDescription" rows="3"></textarea>
              </label>
            </div>
          </div>
        </b-card-body>
      </b-card>
    </div>

    <div>
      <b-card no-body class="section-card">
        <b-card-header class="text-info">Conditions</b-card-header>
        <b-card-body>
          <spinner v-if="conditions.loading"/>
          <div v-else>
            <div class="" v-if="conditions.labels.length">
              <div class="row" v-for="(condition, index) in conditions.selected" :key="`condition-${index}`">
                <div class="col-lg-3">
                  <label class="field">
                    <strong>Label</strong>
                    <multiselect
                      v-model="condition.nameCond"
                      placeholder="Select a Label"
                      :searchable="false"
                      :options="conditions.labels"
                      @input="updateConditionFields(condition.nameCond, index)"
                      :show-labels="false"
                    ></multiselect>
                  </label>
                </div>
                <div class="col-lg-3" v-if="condition.nameCond">
                  <label class="field">
                    <strong>Condition</strong>
                    <multiselect
                      v-model="condition.condition"
                      placeholder="Select a Condition"
                      :searchable="false"
                      :options="condition.conditionOptions" :show-labels="false"
                    ></multiselect>
                  </label>
                </div>
                <div class="col-lg-4" v-if="condition.nameCond">
                  <label class="field">
                    <strong>Value</strong>
                    <multiselect
                      v-model="condition.value"
                      placeholder="Select a Value"
                      :searchable="false"
                      :options="condition.valueOptions"
                      :show-labels="false"
                    ></multiselect>
                  </label>
                </div>
                <div class="col-lg-2 pt-3">
                  <b-btn
                    v-show="condition.nameCond"
                    @click="deleteCondition(index)"
                    variant="danger" size="sm" title="Delete" class="mt-2"
                  >
                    <i class="fa fa-times"></i>
                  </b-btn>

                  <b-btn
                    v-show="condition.nameCond && condition.condition && condition.value && (index == conditions.selected.length - 1)"
                    @click="addCondition()"
                    variant="primary" size="sm" title="Add New"
                  >
                    <i class="fa fa-plus"></i>
                  </b-btn>
                </div>
              </div>
            </div>
            <h4 v-else>No Available Conditions</h4>
          </div>
        </b-card-body>
      </b-card>
    </div>

    <div>
      <b-card no-body class="section-card">
        <b-card-header class="text-info">Devices</b-card-header>
        <b-card-body>
          <spinner v-if="presetLoading"/>
          <div v-else>
            <div>
              <div v-if="presets.length">
                <h4>Presets Available</h4>
                <carousel :perPage="6">
                  <slide v-for="(preset, index) in presets" :key="`preset-${preset.id}`">
                    <div
                      @click="setActive('activePreset', preset)"
                      :class="{'active': preset.id == activePreset.id}"
                      class="card box-card"
                    >
                      <div class="card-image"><i class="fa fa-briefcase"></i></div>
                      <div class="card-body">{{ preset.name }}</div>
                    </div>
                  </slide>
                </carousel>
              </div>
              <h4 v-else>No Available Presets</h4>

              <div v-if="activePreset.id">
                <spinner v-if="devices.loading"/>
                <template v-else>
                  <hr>
                  <div>
                    <div v-if="devices.availableDevices.length">
                      <h4>Devices Available from {{ activePreset.name }}</h4>
                      <carousel :perPage="6">
                        <slide v-for="(device, index) in devices.availableDevices" :key="`available-device-${index}`">
                          <transition appear
                                      enter-class=""
                                      enter-active-class="animated zoomIn"
                                      leave-class=""
                                      leave-active-class="animated zoomOut"
                          >
                            <div
                              @click="addDevice(index)"
                              class="card box-card"
                            >
                              <div class="card-image"><img :src="getImageUrl(device.devices[0])"/></div>
                              <div class="card-body">
                                <div>{{ device.devices[0].name }}</div>
                                <div>{{ device.modifications[0].value }} - {{ device.modifications[1].value }}</div>
                              </div>
                            </div>
                          </transition>
                        </slide>
                      </carousel>
                    </div>
                    <div v-else>
                      <h4>No Available Devices</h4>
                    </div>
                  </div>
                </template>
              </div>

              <template v-if="devices.selected.length">
                <hr>
                <div>
                  <h4>Selected Devices</h4>
                  <carousel :perPage="6">
                    <slide v-for="(device, index) in devices.selected" :key="`selected-device-${index}`">
                      <transition appear
                                  enter-class=""
                                  enter-active-class="animated zoomIn"
                                  leave-class=""
                                  leave-active-class="animated zoomOut"
                      >
                        <div
                          @click="removeDevice(index)"
                          class="card box-card"
                        >
                          <div class="card-image"><img :src="getImageUrl(device.devices[0])"/></div>
                          <div class="card-body">
                            <div>{{ device.devices[0].name }}</div>
                            <div>{{ device.modifications[0].value }} - {{ device.modifications[1].value }}</div>
                          </div>
                        </div>
                      </transition>
                    </slide>
                  </carousel>
                </div>
              </template>
            </div>
          </div>
        </b-card-body>
      </b-card>
    </div>

    <div>
      <b-card no-body class="section-card">
        <b-card-header class="text-info">Services</b-card-header>
        <b-card-body>
          <spinner v-if="carrierLoading"/>
          <div v-else>
            <div>
              <div v-if="carriers.length">
                <h4>Carriers Available</h4>
                <carousel :perPage="6">
                  <slide v-for="(carrier, index) in carriers" :key="`carrier-${carrier.id}`">
                    <transition appear
                                enter-class=""
                                enter-active-class="animated zoomIn"
                                leave-class=""
                                leave-active-class="animated zoomOut"
                    >
                      <div
                        @click="setActive('activeCarrier', carrier)"
                        :class="{'active': carrier.id == activeCarrier.id}"
                        class="card box-card"
                      >
                        <div class="card-image"><i class="fa fa-cubes"></i></div>
                        <div class="card-body">{{ carrier.shortName }}</div>
                      </div>
                    </transition>
                  </slide>
                </carousel>
              </div>
              <template v-else>
                <hr>
                <h4>No Carriers Available</h4>
              </template>
              <template v-if="activeCarrier.id">
                <hr>
                <div>
                  <spinner v-if="services.loading"/>
                  <div v-else>
                    <div v-if="services.availableServices.length">
                      <h4>Services Available From {{ activeCarrier.shortName }}</h4>
                      <carousel :perPage="5">
                        <slide v-for="(service, index) in services.availableServices" :key="`available-service-${service.id}`">
                          <transition appear
                                      enter-class=""
                                      enter-active-class="animated zoomIn"
                                      leave-class=""
                                      leave-active-class="animated zoomOut"
                          >
                            <div
                              @click="setActive('activeService', service)"
                              :class="{'active': service.id == activeService.id}"
                              class="card box-card card-1"
                            >
                              <div class="card-image"><i class="fa fa-cube"></i></div>
                              <div class="card-body">{{ service.title }}</div>
                            </div>
                          </transition>
                        </slide>
                      </carousel>
                    </div>
                    <template v-else>
                      <h4>No Available Services</h4>
                    </template>
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
                  <div>
                    <div>
                      <label class="field">
                        <strong>Description</strong>
                        <p>{{ activeService.description }}</p>
                      </label>
                      <label class="field">
                        <strong>Price</strong>
                        <p>{{ activeService.cost }} {{ activeService.currency }}</p>
                      </label>
                    </div>
                    <div class="row">
                      <div class="col-lg-10">
                        <table class="table table-borderless">
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
                            <td class="capitalize">{{ serviceItem.category }}</td>
                            <td>{{ serviceItem.value }} {{ serviceItem.unit }}</td>
                          </tr>
                          </tbody>
                        </table>
                      </div>
                      <div class="col-lg-2">
                        <b-btn
                          v-if="activeService.added == 1"
                          @click="removeService()"
                          variant="danger" size="sm" title="Delete"
                        >
                          <i class="fa fa-times"></i>
                        </b-btn>
                        <b-btn
                          v-else
                          @click="addService()"
                          variant="primary" size="sm" title="Add New"
                        >
                          <i class="fa fa-plus"></i>
                        </b-btn>
                      </div>
                    </div>
                  </div>
                </transition>
              </template>

              <template v-if="services.selected.length">
                <hr>
                <div>
                  <h4>Selected Services</h4>
                  <carousel :perPage="5">
                    <slide v-for="(service, index) in services.selected" :key="`selected-service-${index}`">
                      <transition appear
                                  enter-class=""
                                  enter-active-class="animated fadeIn"
                                  leave-class=""
                                  leave-active-class="animated fadeOut"
                      >
                        <div
                          @click="setActive('activeService', service)"
                          :class="{'active': service.id == activeService.id}"
                          class="card box-card card-1"
                        >
                          <div class="card-image"><i class="fa fa-cube"></i></div>
                          <div class="card-body">{{ service.title }}</div>
                        </div>
                      </transition>
                    </slide>
                  </carousel>
                </div>
              </template>
            </div>
          </div>
        </b-card-body>
      </b-card>
    </div>

    <div>
      <b-card no-body class="section-card">
        <b-card-header class="text-info">Addresses</b-card-header>
        <b-card-body>
          <spinner  v-if="addresses.loading"/>
          <div v-else>
            <div>
              <template v-if="addresses.availableAddresses.length">
                <div>
                  <h4>Addresses Available</h4>
                  <carousel :perPage="6">
                    <slide v-for="(address, index) in addresses.availableAddresses" :key="`available-address-${address.id}`">
                      <transition appear
                                  enter-class=""
                                  enter-active-class="animated fadeIn"
                                  leave-class=""
                                  leave-active-class="animated fadeOut"
                      >
                        <div
                          @click="setActive('activeAddress', address)"
                          :class="{'active': address.id == activeAddress.id}"
                          class="card box-card"
                        >
                          <div class="card-image"><i class="fa fa-globe"></i></div>
                          <div class="card-body">{{ address.name }}</div>
                        </div>
                      </transition>
                    </slide>
                  </carousel>
                </div>
              </template>
              <template v-else>
                <h4>No Available Addresses</h4>
                <hr>
              </template>

              <template v-if="activeAddress.id">
                <hr>
                <div class="row">
                  <div class="col-lg-10">
                    <transition appear
                                enter-class=""
                                enter-active-class="animated fadeIn"
                                leave-class=""
                                leave-active-class="animated fadeOut"
                    >
                      <table class="table table-borderless">
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
                            <td>{{ activeAddress.country }}</td>
                            <td>{{ activeAddress.city }}</td>
                            <td>{{ activeAddress.postalCode }}</td>
                            <td>{{ activeAddress.state }}</td>
                            <td>{{ activeAddress.address }}</td>
                            <td>{{ activeAddress.phone }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </transition>
                  </div>
                  <div class="col-lg-2">
                    <b-btn
                      v-if="activeAddress.added == 1"
                      @click="removeAddress()"
                      variant="danger" size="sm" title="Delete" class="mt-2"
                    >
                      <i class="fa fa-times"></i>
                    </b-btn>
                    <b-btn
                      v-else
                      @click="addAddress()"
                      variant="primary" size="sm" title="Add New"
                    >
                      <i class="fa fa-plus"></i>
                    </b-btn>
                  </div>
                </div>
              </template>

              <div v-if="addresses.selected.length">
                <hr>
                <h4>Selected Addresses</h4>
                <carousel :perPage="6">
                  <slide v-for="(address, index) in addresses.selected" :key="`selected-address-${address.id}`">
                    <transition appear
                                enter-class=""
                                enter-active-class="animated zoomIn"
                                leave-class=""
                                leave-active-class="animated zoomOut"
                    >
                      <div
                        @click="setActive('activeAddress', address)"
                        :class="{'active': address.id == activeAddress.id}"
                        class="card box-card"
                      >
                        <div class="card-image"><i class="fa fa-globe"></i></div>
                        <div class="card-body">{{ address.name }}</div>
                      </div>
                    </transition>
                  </slide>
                </carousel>
              </div>

            </div>
          </div>
        </b-card-body>
      </b-card>
    </div>

    <div class="row mb-4">
      <div class="col-lg-4 input-group">
        <div class="input-group-prepend">
          <span class="input-group-text">Approval</span>
        </div>
        <input class="form-control" type="text" v-model="packageCode">
      </div>
    </div>

    <div class="mb-5">
      <b-btn size="lg" variant="primary" class="save-button" @click="savePackage()" :disabled="packageName && packageCode == ''">
        <span v-if="packageId">Update Package</span>
        <span v-else>Create Package</span>
      </b-btn>
    </div>
  </div>
</template>

<script src="./edit.ctrl.js" lang="babel"></script>

<style lang="scss">
.page.edit-page.package-page {
  .tag-header {
    display: inline-block;
    padding: 0 100px 0 20px;
    font-size: 18px;
    font-weight: 500;
    line-height: 40px;
    &:after {
      position: absolute;
      right: -40px;
      top: 0px;
      content: " ";
      border-style: solid;
      border-width: 40px 0px 0px 40px;
      border-color: transparent transparent transparent rgb(255, 105, 10);
    }
  }

  .card.section-card {
    .card-header.text-info {
      background-color: #fff8f2;
      font-weight: 700;
    }
    h4 {
      margin-bottom: 16px;
      text-align: center;
      font-size: 18px;
      font-weight: 700;
    }
  }

  .card.box-card {
    margin: 0 5px;
    text-align: center;
    border: 0 none;
    .card-image {
      i {
        font-size: 36px;
        padding: 30px 0 20px 0;
      }
      img {
        height: 120px;
      }
    }
    .card-body {
      padding: 10px 0;
    }
    &.active {
      background-color: #ff690a;
      color: #fff;
    }
    &.card-1.active {
      background-color: transparent;
      color: #111;
      border: 2px solid #ff690a;
      &:after {
        display: inline-block;
        font: normal normal normal 14px/1 FontAwesome;
        font-size: 25px;
        text-rendering: auto;
        -webkit-font-smoothing: antialiased;
        content: "\F05D";
        position: absolute;
        top: 0;
        right: 0;
        color: #f35d0a;
        background: #fff;
        z-index: 1;
      }
    }
  }

  .input-group {
    .input-group-text {
      border-color: #c8ced3;
    }
    .form-control {
      border-color: #c8ced3;
    }
  }

  table.table tbody {
    tr:nth-of-type(4n+3) {
      background-color: transparent;
    }
    tr:nth-of-type(2n+1) {
      background-color: #f9f9f9;
    }
  }
}
</style>
