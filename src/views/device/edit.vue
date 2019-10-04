<template>
  <div class="page device-page device-edit-page"
    @click="$store.commit('auth/warningPopupFlagOn')"
    @keyup.tab="$store.commit('auth/warningPopupFlagOn')"
  >
    <div v-if="device.id == device_id">
      <b-modal
        :visible="$store.getters['error/hasError']"
        @hidden="$store.dispatch('error/clearAll')"
        hide-footer
      >
        <div class="d-block text-center is-error">
          <h3>{{ $store.getters['error/error'] }}</h3>
        </div>
      </b-modal>

      <div class="row">
        <div class="col-md-6">
          <label class="field">
            <strong>Device Name</strong>
            <input type="text" name="device-name" placeholder="" v-model="device.name">
          </label>
        </div>
      </div>

      <div role="tablist">
        <b-card no-body class="">
          <b-card-header header-tag="header" class="p-0" role="tab">
            <b-button block href="#" v-b-toggle.accordion-1 variant="info">Device Overview</b-button>
          </b-card-header>
          <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <div class="row">
                <div class="col-lg-2">
                  <img class="phoneImg" :src="getImageUrl(device.images[0])" alt="Photo Devices"/>
                  <label for="FileUpload" class="btn btn-primary btn-lg"><strong>Upload File</strong></label>
                  <input type="file" id="FileUpload" @change="onDeviceImageChange" class="d-none">
                </div>
                <div class="col-lg-10">
                  <div class="row">
                    <div class="col-lg-3">
                      <label class="field">
                        <strong>Default Price</strong>
                        <input type="number" v-model="device.defaultPrice">
                        <!-- <inputValidate id="testDefaultPrice" class="capacitys" v-model="device.defaultPrice"></inputValidate> -->
                      </label>
                    </div>
                    <div class="col-lg-3">
                      <label class="field">
                        <span>&nbsp;</span>
                        <select id="testMoney" v-model="device.currency">
                          <option value="USD">USD</option>
                          <option value="GBP">GBP</option>
                          <option value="EUR">EUR</option>
                        </select>
                      </label>
                    </div>
                    <div class="col-lg-6">
                      <label class="field">
                        <strong>Device Type</strong>
                        <!-- <select id="testDeviceType" v-model="device.devicetypes[0].id"> -->
                        <select id="testDeviceType" v-model="device.devicetypes[0].id">
                          <option :value="0">Select Type</option>
                          <option v-for="dt in deviceTypes" :value="dt.id">{{ dt.name }}</option>
                        </select>
                      </label>
                    </div>

                    <div class="col-lg-6">
                      <label class="field">
                        <strong>Manufacturer</strong>
                        <input id="testManu" type="text" placeholder="" v-model="device.make">
                      </label>
                    </div>
                    <div class="col-lg-6">
                      <label class="field">
                        <strong>Model</strong>
                        <input type="text" id="testModel" placeholder="" v-model="device.model">
                      </label>
                    </div>

                    <div class="col-sm-12">
                      <label class="field">
                        <strong>Tecnical Information</strong>
                        <textarea rows="6" id="testInfo" v-model="device.properties"></textarea>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </b-card-body>
          </b-collapse>
        </b-card>

        <b-card no-body class="">
          <b-card-header header-tag="header" class="p-0" role="tab">
            <b-button block href="#" v-b-toggle.accordion-2 variant="info">Attributes</b-button>
          </b-card-header>
          <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <div class="row">
                <div class="col-lg-4">
                  <div class="row">
                    <div class="col-sm-6">
                      <label class="field">
                        <strong>Capacity</strong>
                        <input type="text" placeholder="Custom" v-model="capacity">
                        <!-- <inputValidate class="capacitys" placeholder="Custom" v-model="capacity"></inputValidate> -->
                      </label>
                    </div>
                    <div class="col-sm-6">
                      <label class="field">
                        <span>&nbsp;</span>
                        <div class="input-group">
                          <select class="input-group-item mb-0" v-model="unit">
                            <option value="Tb">TB</option>
                            <option value="Gb">GB</option>
                            <option value="Mb">MB</option>
                          </select>
                          <div class="input-group-button">
                            <b-btn @click="addCapacity()" variant="primary">Add</b-btn>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div class="row">
                    <div class="checkbox col-sm-6" v-for="c in capacities">
                      <label>
                        <input type="checkbox" name="capacities" :value="c.id" v-model="c.checked">
                        <span>{{ c.value }}</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div class="col-lg-4">
                  <label class="field mb-3">
                    <strong>Color</strong>
                    <div class="input-group">
                      <input type="text" class="input-group-field" v-model="style" placeholder="Custom">
                      <div class="input-group-button">
                        <b-btn @click="addStyle()" variant="primary">Add</b-btn>
                      </div>
                    </div>
                  </label>

                  <div class="row">
                    <div class="checkbox col-sm-6" v-for="s in styles">
                      <label>
                        <input type="checkbox" name="styles" :value="s.id" v-model="s.checked">
                        <span>{{ s.value }}</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </b-card-body>
          </b-collapse>
        </b-card>

        <b-card no-body class="">
          <b-card-header header-tag="header" class="p-0" role="tab">
            <b-button block href="#" v-b-toggle.accordion-3 variant="info">Vendors</b-button>
          </b-card-header>
          <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <div class="imagescheck">
                <div class="crop" v-for="c in carriers">
                  <input type="checkbox" :id="'carrier-' + c.id" name="carriers" :value="c.id" v-model="c.checked">
                  <label :for="'carrier-' + c.id" class="static">
                    {{ c.presentation }}
                  </label>
                </div>
              </div>
            </b-card-body>
          </b-collapse>
        </b-card>

        <b-card no-body class="companies-card">
          <b-card-header header-tag="header" class="p-0" role="tab">
            <b-button block href="#" v-b-toggle.accordion-4 variant="info">Companies</b-button>
          </b-card-header>
          <b-collapse id="accordion-4" accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <div class="row">
                <div class="offset-lg-3 col-lg-6 text-lg-center">
                  <label class="field">
                    <strong>Find Company</strong>
                    <div class="input-group">
                      <input class="input-group-field" type="text" placeholder="Google" v-model="companyFilter">
                      <div class="input-group-button">
                        <b-btn @click="findCompany()" variant="primary">Find Company</b-btn>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-12">
                  <div class="col-lg-4 col-md-6" v-for="c in companies">
                    <!-- <div class="checkbox">
                      <label :for="'company-' + c.id">
                        <input type="checkbox" :id="'company-' + c.id" name="companies" :value="c.id" v-model="c.checked">
                        <span class="custom-checkbox"><i class="icon-check"></i></span>
                        {{ c.name }}
                      </label>
                    </div> -->
                    <label :for="'company-' + c.id">
                      <input type="checkbox" :id="'company-' + c.id" name="companies" :value="c.id" v-model="c.checked">
                      {{ c.name }}
                    </label>
                  </div>
                </div>
              </div>
            </b-card-body>
          </b-collapse>
        </b-card>

        <b-card no-body class="prices-card">
          <b-card-header header-tag="header" class="p-0" role="tab">
            <div class="float-right">
              <div class="d-none d-lg-block filterprices">
                <div class="row mt-2 mr-0">
                  <div class="col-lg-3">
                    <select class="form-control" v-model="filter.capacity">
                      <option :value="null"><strong>Capacity</strong></option>
                      <option v-for="c in _.filter(capacities, { 'checked': true })" :value="c">{{ c.value }}</option>
                    </select>
                  </div>
                  <div class="col-lg-3">
                    <select class="form-control" v-model="filter.style">
                      <option :value="null">Color</option>
                      <option v-for="s in _.filter(styles, { 'checked': true })" :value="s">{{ s.value }}</option>
                    </select>
                  </div>
                  <div class="col-lg-3">
                    <select class="form-control" v-model="filter.carrier">
                      <option :value="null">Vendor</option>
                      <option v-for="c in _.filter(carriers, { 'checked': true })" :value="c">{{ c.presentation }}</option>
                    </select>
                  </div>
                  <div class="col-lg-3">
                    <select class="form-control" v-model="filter.company">
                      <option :value="null">Company</option>
                      <option v-for="c in _.filter(companies, { 'checked': true })" :value="c">{{ c.name }}</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <b-button block href="#" v-b-toggle.accordion-5 variant="info" @click="$forceUpdate()">Prices</b-button>
          </b-card-header>
          <b-collapse id="accordion-5" accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <div
                v-for="(dv, index) in device.devicevariations"
                v-if="hasAvailableCompany(dv)"
                class="row device-variation-list m-0 p-3 border"
              >
                <div class="col-lg-2">
                  <img class="phoneImg" :src="getImageUrl(dv.images[0])" alt="Photo Devices" />
                  <input
                    type="file"
                    :id="'FileUpload' + index"
                    @change="onPriceImageChange($event, dv)"
                    class="d-none"
                  >
                  <!-- <div class="clearfix"></div> -->
                  <label
                    :for="'FileUpload' + index"
                    :id="'f' + index"
                    class="btn btn-primary"
                  >Upload File</label>
                </div>
                <div class="col-lg-10">
                  <div class="row">
                    <div class="col-lg-3">
                      <label class="field">
                        <strong>Retail Price</strong>
                        <div class="input-group">
                          <span class="input-group-text">{{ currency }}</span>
                          <input type="number" v-model="dv.priceRetail">
                          <!-- <inputValidate class="input-group-field price-retail" v-model="dv.priceRetail"></inputValidate> -->
                        </div>
                      </label>
                    </div>
                    <div class="col-lg-3">
                      <label class="field">
                        <strong>Price One</strong>
                        <div class="input-group">
                          <span class="input-group-text">{{ currency }}</span>
                          <input type="number" v-model="dv.price1">
                          <!-- <inputValidate class="input-group-field price-one" v-model="dv.price1"></inputValidate> -->
                        </div>
                      </label>
                    </div>
                    <div class="col-lg-3">
                      <label class="field">
                        <strong>Price Two</strong>
                        <div class="input-group">
                          <span class="input-group-text">{{ currency }}</span>
                          <input type="number" v-model="dv.price2">
                          <!-- <inputValidate class="input-group-field price-two" v-model="dv.price2"></inputValidate> -->
                        </div>
                      </label>
                    </div>
                    <div class="col-lg-3">
                      <label class="field">
                        <strong>Price Own</strong>
                        <div class="input-group">
                          <span class="input-group-text">{{ currency }}</span>
                          <input type="number" v-model="dv.priceOwn">
                          <!-- <inputValidate class="input-group-field price-own" v-model="dv.priceOwn"></inputValidate> -->
                        </div>
                      </label>
                    </div>

                    <div class="col-lg-3">
                      <div class="field">
                        <select class="dv-capacity mt-3" v-model="dv.modifications[DeviceVariationHelper.getCapacityIndex(dv)]">
                          <option :value="ModificationHelper.getEmptyCapacity()">Select Capacity</option>
                          <option v-for="c in availableOptions(capacities)" :value="c">{{ c.value }}</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-lg-3">
                      <div class="field">
                        <select class="dv-style mt-3" v-model="dv.modifications[DeviceVariationHelper.getStyleIndex(dv)]">
                          <option :value="ModificationHelper.getEmptyStyle()">Select Color</option>
                          <option v-for="s in availableOptions(styles)" :value="s">{{ s.value }}</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-lg-3">
                      <div class="field">
                        <select class="dv-carrier mt-3" v-model="dv.carrierId">
                          <option :value="0">Select Vendors</option>
                          <option v-for="c in _.filter(carriers, { 'checked': true })" :value="c.id">{{ c.presentation }}</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-lg-3">
                      <div class="field">
                        <select class="dv-company mt-3" v-model="dv.companyId">
                          <option :value="0">Select Companies</option>
                          <option v-for="c in _.filter(companies, { 'checked': true })" :value="c.id">{{ c.name}}</option>
                        </select>
                      </div>
                    </div>

                    <div class="btn-control">
                      <b-btn @click="addDeviceVariation()" variant="primary" size="sm" title="Add New">
                        <i class="fa fa-plus"></i>
                      </b-btn>
                      <div v-show="dv.deleted" class="mt-2">
                        <b-btn @click="removeDeviceVariation(dv)" variant="danger" size="sm" title="Delete">
                          <i class="fa fa-times"></i>
                        </b-btn>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </b-card-body>
          </b-collapse>
        </b-card>

        <div class="mb-5">
          <b-btn size="lg" variant="primary" class="save-button" @click="submit()">Save Changes</b-btn>
        </div>
        <!-- <div>{{ device.devicevariations[0].images[0] }}</div> -->
      </div>
    </div>

    <spinner v-else />
  </div>
</template>

<script src="./edit.ctrl.js" lang="babel" ></script>
