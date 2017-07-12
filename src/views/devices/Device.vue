<template>
<div class="page device-page device-edit-page is-relative">
  <div class="row" v-if="device.id == device_id">
    <modal v-if="$store.getters['error/hasError']" @close="$store.dispatch('error/clearAll')">
      <h3 slot="body">{{ $store.getters['error/error'] }}</h3>
    </modal>

    <div class="large-6 columns">
      <label class="devicename">
        <strong>Device Name</strong>
        <input type="text" placeholder="" v-model.trim="device.name">
      </label>
    </div>

    <div class="small-12 columns">
      <ul class="accordion" data-accordion data-allow-all-closed="true">

        <li class="accordion-item is-active" data-accordion-item>
          <a href="#" class="accordion-title">Device Overview</a>
          <div class="accordion-content overview" data-tab-content>
            <div class="row expanded">
                <div class="small-12 large-2 columns">
                  <img class="phoneImg" :src="getImageUrl(device.images[0])" alt="Photo Devices"/>
                  <label for="FileUpload" class="button large expanded"><strong>Upload File</strong></label>
                  <input type="file" id="FileUpload" @change="onDeviceImageChange" class="show-for-sr">
                </div>
                <div class="small-12 large-10 columns">
                  <div class="row expanded">
                    <div class="large-3 small-12 columns">
                      <label><strong>Default Price</strong>
                        <inputValidate id="testDefaultPrice" class="capacitys" v-model="device.defaultPrice"></inputValidate>
                      </label>
                    </div>
                    <div class="small-12 large-3 columns">
                      <label>
                        <span class="hide-for-small">&nbsp;</span>
                        <select id="testMoney" v-model="device.currency">
                          <option value="USD">USD</option>
                          <option value="GBP">GBP</option>
                          <option value="EUR">EUR</option>
                        </select>
                      </label>
                    </div>
                    <div class="small-12 large-6 columns">
                      <label><strong>Device Type</strong>
                        <!-- <select id="testDeviceType" v-model="device.devicetypes[0].id"> -->
                        <select id="testDeviceType" v-model="device.devicetypes[0].id">
                          <option :value="0">Select Type</option>
                          <option v-for="dt in deviceTypes" :value="dt.id">{{ dt.name }}</option>
                        </select>
                      </label>
                    </div>
                    <div class="clearfix"></div>

                    <div class="small-12 large-6 columns">
                      <label><strong>Manufacturer</strong>
                        <input id="testManu" type="text" placeholder="" v-model="device.make">
                      </label>
                    </div>
                    <div class="small-12 large-6 columns">
                      <label><strong>Model</strong>
                        <input type="text" id="testModel" placeholder="" v-model="device.model">
                      </label>
                    </div>
                    <div class="clearfix"></div>

                    <div class="small-12 large-12 columns">
                      <label><strong>Tecnical Information</strong>
                        <textarea rows="6" id="testInfo" v-model="device.properties"></textarea>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </li>

        <li class="accordion-item" data-accordion-item>
          <a href="#" class="accordion-title">Attributes</a>
          <div class="accordion-content modifications" data-tab-content>
            <div class="row">
              <div class="large-4 small-12 columns">
                <div class="row collapse">
                  <div class="small-6 columns">
                    <label><strong>Capacity</strong>
                      <inputValidate class="capacitys" placeholder="Custom" v-model="capacity"></inputValidate>
                    </label>
                  </div>
                  <div class="small-6 columns">
                    <label>
                      &nbsp;
                      <div class="input-group">
                        <select class="input-group-item" v-model="unit" style="margin-bottom: 0;">
                          <option value="Tb">TB</option>
                          <option value="Gb">GB</option>
                          <option value="Mb">MB</option>
                        </select>
                        <div class="input-group-button">
                          <a @click="addCapacity()" class="button ">Add</a>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                <div class="row collapse">
                  <div class="checkbox large-6 medium-6 small-6 columns" v-for="c in capacities">
                    <label>
                      <input type="checkbox" name="capacities" :value="c.id" v-model="c.checked">
                      {{ c.value }}
                    </label>
                  </div>
                </div>
              </div>

              <div class="large-4  small-12 columns end">
                <label><strong>Color</strong>
                  <div class="input-group">
                    <input type="text" class="input-group-field" v-model="style" placeholder="Custom">
                    <div class="input-group-button">
                      <a @click="addStyle()" class="button ">Add</a>
                    </div>
                  </div>
                </label>

                <div class="row collapse">
                  <div class="checkbox large-6 small-6 columns" v-for="s in styles">
                  <label>
                    <input type="checkbox" name="styles" :value="s.id" v-model="s.checked">
                    {{ s.value }}
                  </label>
                </div>
                </div>
              </div>
            </div>
          </div>
        </li>

        <li class="accordion-item" data-accordion-item>
          <a href="#" class="accordion-title">Vendors</a>
          <div class="accordion-content carriers" data-tab-content>
            <div class="imagescheck">
              <div class="crop" v-for="c in carriers">
                <input type="checkbox" :id="'carrier-' + c.id" name="carriers" :value="c.id" v-model="c.checked">
                <label :for="'carrier-' + c.id" class="static">
                  {{ c.presentation }}
                </label>
              </div>
            </div>
          </div>
        </li>

        <li class="accordion-item" data-accordion-item>
          <a href="#" class="accordion-title">Companies</a>
          <div class="accordion-content companies" data-tab-content>
            <div class="row expanded">
              <div class="large-6 small-12 columns large-centered find">
                <label id="bl"><strong>Find Company</strong>
                  <div class="input-group">
                    <input class="input-group-field" type="text" placeholder="Google" v-model="companyFilter">
                    <div class="input-group-button end">
                      <a id="bl" class="button " @click="findCompany()">Find Company</a>
                    </div>
                  </div>
                </label>
              </div>
            </div>
            <div class="row expanded">
              <div class="small-12 columns">
                <div class="large-4 medium-6 columns" v-for="c in companies">
                  <div class="checkbox">
                  <label :for="'company-' + c.id">
                    <input type="checkbox" :id="'company-' + c.id" name="companies" :value="c.id" v-model="c.checked">
                    <span class="custom-checkbox"><i class="icon-check"></i></span>
                    {{ c.name }}
                  </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>

        <li class="accordion-item prices" data-accordion-item>
          <div class="float-right">
            <div class="hide-for-small-only hide-for-medium-only filterprices">
              <div class="row expanded">
                <div class="large-3 columns">
                  <select class="form-control" v-model="filter.capacity">
                    <option :value="null"><strong>Capacity</strong></option>
                    <option v-for="c in _.filter(capacities, { 'checked': true })" :value="c">{{ c.value }}</option>
                  </select>
                </div>
                <div class="large-3 columns">
                  <select class="form-control" v-model="filter.style">
                    <option :value="null">Color</option>
                    <option v-for="s in _.filter(styles, { 'checked': true })" :value="s">{{ s.value }}</option>
                  </select>
                </div>
                <div class="large-3 columns">
                  <select class="form-control" v-model="filter.carrier">
                    <option :value="null">Vendor</option>
                    <option value="" v-for="c in _.filter(carriers, { 'checked': true })" :value="c">{{ c.presentation
                      }}
                    </option>
                  </select>
                </div>
                <div class="large-3 columns">
                  <select class="form-control" v-model="filter.company">
                    <option :value="null">Company</option>
                    <option v-for="c in _.filter(companies, { 'checked': true })" :value="c">{{ c.name }}</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <a href="#" class="accordion-title" @click="$forceUpdate()">Prices</a>
          <div class="accordion-content prices-content" data-tab-content>
            <div class="row expanded addlist" v-for="(dv, index) in device.devicevariations"
                 :style="{ backgroundColor: color }" v-if="hasAvailableCompany(dv)">
              <div class="row expanded">
                <div class="small-12 large-2 columns">
                  <img class="phoneImg" :src="getImageUrl(dv.images[0])" alt="Photo Devices" />
                  <input type="file" :id="'FileUpload' + index" @change="onPriceImageChange($event, dv)" class="show-for-sr">
                  <div class="clearfix"></div>
                  <label :for="'FileUpload' + index" :id="'f' + index" class="button large expanded no-margin">Upload
                    File</label>
                </div>
                <div class="small-12 large-10 columns">
                  <div class="row expanded row-wrapper">
                    <div class="large-3 small-12 columns">
                      <label><strong>Retail Price</strong>
                        <div class="input-group">
                          <span class="input-group-label">{{ currency }}</span>
                          <inputValidate class="input-group-field price-retail" v-model="dv.priceRetail"></inputValidate>
                        </div>
                      </label>
                    </div>
                    <div class="large-3 small-12 columns">
                      <label><strong>Price One</strong>
                        <div class="input-group">
                          <span class="input-group-label">{{ currency }}</span>
                          <inputValidate class="input-group-field price-one" v-model="dv.price1"></inputValidate>
                        </div>
                      </label>
                    </div>
                    <div class="large-3 small-12 columns">
                      <label><strong>Price Two</strong>
                        <div class="input-group">
                          <span class="input-group-label">{{ currency }}</span>
                          <inputValidate class="input-group-field price-two" v-model="dv.price2"></inputValidate>
                        </div>
                      </label>
                    </div>
                    <div class="large-3 small-12 columns">
                      <label><strong>Price Own</strong>
                        <div class="input-group">
                          <span class="input-group-label">{{ currency }}</span>
                          <inputValidate class="input-group-field price-own" v-model="dv.priceOwn"></inputValidate>
                        </div>
                      </label>
                    </div>
                    <div class="clearfix"></div>

                    <div class="large-3 small-12 columns">
                      <div class="features">
                        <select class="dv-capacity" v-model="dv.modifications[DeviceVariationHelper.getCapacityIndex(dv)]">
                          <option :value="ModificationHelper.getEmptyCapacity()">Select Capacity</option>
                          <option v-for="c in availableOptions(capacities)" :value="c">{{ c.value }}</option>
                        </select>
                      </div>
                    </div>
                    <div class="large-3 small-12 columns">
                      <div class="features">
                        <select class="dv-style" v-model="dv.modifications[DeviceVariationHelper.getStyleIndex(dv)]">
                          <option :value="ModificationHelper.getEmptyStyle()">Select Color</option>
                          <option v-for="s in availableOptions(styles)" :value="s">{{ s.value }}</option>
                        </select>
                      </div>
                    </div>
                    <div class="large-3 small-12 columns">
                      <div class="features">
                        <select class="dv-carrier" v-model="dv.carrierId">
                          <option :value="0">Select Vendors</option>
                          <option v-for="c in _.filter(carriers, { 'checked': true })" :value="c.id">{{ c.presentation }}</option>
                        </select>
                      </div>
                    </div>
                    <div class="large-3 small-12 columns">
                      <div class="features">
                        <select class="dv-company" v-model="dv.companyId">
                          <option :value="0">Select Companies</option>
                          <option v-for="c in _.filter(companies, { 'checked': true })" :value="c.id">{{ c.name}}</option>
                        </select>
                      </div>
                    </div>
                    <div class="clearfix"></div>

                    <div class="btn-control">
                      <a title="Add New" class="button add" @click="addDeviceVariation()"><i class="fa fa-plus"></i></a>
                      <div v-show="dv.deleted">
                        <a class="button delete" @click="removeDeviceVariation(dv)" title="Delete">
                          <i class="fa fa-times" aria-hidden="true"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>

      </ul>

      <a class="button large save-button" @click="submit()">Save Changes</a>
      <!-- <div>{{ device.devicevariations[0].images[0] }}</div> -->
    </div>
  </div>

  <div class="is-loading" v-show="device.id !== device_id"></div>
</div>
</template>

<script src="./device.crtl.js" lang="babel" ></script>
