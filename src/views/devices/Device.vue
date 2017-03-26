<template>
<div id="device" v-if="!!device">
  <modal v-if="$store.getters['error/hasError']" @close="$store.dispatch('error/clearAll')">
    <h3 slot="body">{{ $store.getters['error/error'] }}</h3>
  </modal>

  <div class="small-12 columns titles">
    <h4>Manage Device</h4>
  </div>

  <div class="medium-6 columns">
    <label class="devicename">
      Device Name
      <input type="text" placeholder="" v-model.trim="device.name">
    </label>
  </div>

  <div class="small-12 columns">
    <ul class="acordeon" data-accordion data-allow-all-closed="true">

      <li class="acordeon-item is-active" data-accordion-item>
        <a href="#" class="accordion-title">Device Overview</a>
        <div class="accordion-content overview" data-tab-content>
          <div class="column row">
            <div class="row">
              <div class="small-12 large-2 columns">
                <img class="phoneImg" :src="getImageUrl(device.images[0].id)" alt="Photo Devices"/>
                <label for="FileUpload" class="button large">Upload File</label>
                <input type="file" id="FileUpload" @change="onDeviceImageChange" class="show-for-sr">
              </div>
              <div class="small-12 large-10 columns">
                <div class="row">
                  <div class="large-3 small-12 columns">
                    <label>Default Price
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
                    <label>Device Type
                      <!-- <select id="testDeviceType" v-model="device.devicetypes[0].id"> -->
                      <select id="testDeviceType" v-model="device.devicetypes[0].id">
                        <option :value="0">Select Type</option>
                        <option v-for="dt in deviceTypes" :value="dt.id">{{ dt.name }}</option>
                      </select>
                    </label>
                  </div>
                  <div class="clearfix"></div>

                  <div class="small-12 large-6 columns">
                    <label>Manufactured
                      <input id="testManu" type="text" placeholder="" v-model="device.make">
                    </label>
                  </div>
                  <div class="small-12 large-6 columns">
                    <label>Model
                      <input type="text" id="testModel" placeholder="" v-model="device.model">
                    </label>
                  </div>
                  <div class="clearfix"></div>

                  <div class="small-12 large-12 columns">
                    <label>Tecnical Information
                      <textarea rows="6" id="testInfo" v-model="device.properties"></textarea>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>

      <li class="acordeon-item" data-accordion-item>
        <a href="#" class="accordion-title">Attributes</a>
        <div class="accordion-content modifications" data-tab-content>
          <div class="row">
            <div class="large-4 small-12 columns">
              <div class="row">
                <div class="small-6 columns">
                  <label style="font-weight: bold;">Capacity
                    <inputValidate class="capacitys" placeholder="Custom" v-model="capacity"></inputValidate>
                  </label>
                </div>
                <div class="small-4 columns money">
                  <select v-model="unit">
                    <option value="Tb">TB</option>
                    <option value="Gb">GB</option>
                    <option value="Mb">MB</option>
                  </select>
                </div>
                <div class="small-2 columns end">
                  <a @click="addCapacity()"class="button tiny">Add</a>
                </div>
              </div>

              <div class="checkbox" v-for="c in capacities">
                <label>
                  <input type="checkbox" name="capacities" :value="c.id" v-model="c.checked">
                  <!-- <span class="custom-checkbox"><i class="icon-check"></i></span> -->
                  {{ c.value }}
                </label>
              </div>
            </div>

            <div class="large-4 small-12 columns end">
              <div class="row">
                <div class="small-6 columns">
                  <label style=" font-weight: bold;">Color
                    <input type="text" v-model="style" placeholder="Custom">
                  </label>
                </div>
                <div class="small-6 columns">
                  <a @click="addStyle()" class="button tiny">Add</a>
                </div>
              </div>

              <div class="checkbox" v-for="s in styles">
                <label>
                  <input type="checkbox" name="styles" :value="s.id" v-model="s.checked">
                  <!-- <span class="custom-checkbox"><i class="icon-check"></i></span> -->
                  {{ s.value }}
                </label>
              </div>
            </div>
          </div>
        </div>
      </li>

      <li class="acordeon-item" data-accordion-item>
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

      <li class="acordeon-item" data-accordion-item>
        <a href="#" class="accordion-title">Companies</a>
        <div class="accordion-content companies" data-tab-content>
          <div class="row">
            <div class="large-6 small-12 columns find">
              <label id="bl" >Find Company
                <input type="text" placeholder="Google" v-model="companyFilter">
              </label>
            </div>
            <div class="large-6 small-12  columns end">
              <a id="bl" class="button secondary" @click="findCompany()">Find Company</a>
            </div>
          </div>
          <div class="row">
            <div class="large-4 small-12 columns">
              <div class="checkbox" v-for="c in companies">
                <label :for="'company-' + c.id">
                  <input type="checkbox" :id="'company-' + c.id" name="companies" :value="c.id" v-model="c.checked">
                  <span class="custom-checkbox"><i class="icon-check"></i></span>
                  {{ c.name }}
                </label>
              </div>
            </div>
          </div>
        </div>
      </li>

      <li class="acordeon-item prices" data-accordion-item>
        <a href="#" class="accordion-title">Prices</a>
        <div class="hide-for-small-only hide-for-medium-only filterprices">
          <select class="form-control" v-model="filter.capacity">
            <option :value="null">Capacity</option>
            <option v-for="c in _.filter(capacities, { 'checked': true })" :value="c">{{ c.value }}</option>
          </select>
          <select class="form-control" v-model="filter.style">
            <option :value="null">Color</option>
            <option v-for="s in _.filter(styles, { 'checked': true })" :value="s">{{ s.value }}</option>
          </select>
          <select class="form-control" v-model="filter.carrier" >
            <option :value="null">Vendor</option>
            <option value="" v-for="c in _.filter(carriers, { 'checked': true })" :value="c">{{ c.presentation }}</option>
          </select>
          <select class="form-control"  v-model="filter.company">
            <option :value="null">Company</option>
            <option v-for="c in _.filter(companies, { 'checked': true })" :value="c">{{ c.name }}</option>
          </select>
        </div>
        <div class="accordion-content prices-content" data-tab-content>
          <div class="column row" v-for="(dv, index) in device.devicevariations" :style="{ backgroundColor: color }">
            <div class="row">
              <div class="small-12 large-2 columns">
                <img class="phoneImg" :src="getImageUrl(dv.images[0].id)" alt="Photo Devices" />
                <input type="file" :id="'FileUpload' + index" @change="onPriceImageChange($event, dv)" class="show-for-sr">
              </div>
              <div class="small-12 large-10 columns">
                <div class="row">
                  <div class="large-3 small-12 columns">
                    <label>Retail Price
                      <div class="input-group">
                        <span class="input-group-label">{{ currency }}</span>
                        <inputValidate class="input-group-field price-retail" v-model="dv.priceRetail"></inputValidate>
                      </div>
                    </label>
                  </div>
                  <div class="large-3 small-12 columns">
                    <label>Price One
                      <div class="input-group">
                        <span class="input-group-label">{{ currency }}</span>
                        <inputValidate class="input-group-field price-one" v-model="dv.price1"></inputValidate>
                      </div>
                    </label>
                  </div>
                  <div class="large-3 small-12 columns">
                    <label>Price Two
                      <div class="input-group">
                        <span class="input-group-label">{{ currency }}</span>
                        <inputValidate class="input-group-field price-two" v-model="dv.price2"></inputValidate>
                      </div>
                    </label>
                  </div>
                  <div class="large-3 small-12 columns">
                    <label>Price Own
                      <div class="input-group">
                        <span class="input-group-label">{{ currency }}</span>
                        <inputValidate class="input-group-field price-own" v-model="dv.priceOwn"></inputValidate>
                      </div>
                    </label>
                  </div>
                  <div class="clearfix"></div>

                  <div class="large-3 small-12 columns">
                    <div class="features">
                      <select class="dv-capacity" v-model="dv.modifications[0]">
                        <option :value="0">Select Capacity</option>
                        <option v-for="c in _.chain(capacities).filter({ 'checked': true }).map((item) => { return _.omit(item, 'checked') }).value()" :value="c">{{ c.value }}</option>
                      </select>
                    </div>
                  </div>
                  <div class="large-3 small-12 columns">
                    <div class="features">
                      <select class="dv-style" v-model="dv.modifications[1]">
                        <option :value="0">Select Color</option>
                        <option v-for="s in _.chain(styles).filter({ 'checked': true }).map((item) => { return _.omit(item, 'checked') }).value()" :value="s">{{ s.value }}</option>
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
                  <div class="large-3 large-offset-2 small-12 columns">
                    <label :for="'FileUpload' + index" :id="'f' + index" class="button large">Upload File</label>
                  </div>
                  <div clas="large-3 small-12 columns">
                    <label>
                      <strong class="variation">Add New:</strong>
                      <a class="button" @click="addDeviceVariation()"><i class="fa fa-plus fa-2x"></i></a>
                    </label>
                  </div>
                  <div clas="large-3 small-12 columns">
                    <label v-show="dv.deleted">
                      <strong class="variation">Delete:</strong>
                      <a class="button delete" @click="removeDeviceVariation(dv)">
                        <i class="fa fa-times fa-2x" aria-hidden="true"></i>
                      </a>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>

    </ul>

    <a class="button large" @click="submit()" id="button">Save Changes</a>
    <!-- <div>{{ device.devicevariations[0].images[0] }}</div> -->
  </div>
</div>
</template>

<script src="./device.crtl.js" lang="babel" ></script>
