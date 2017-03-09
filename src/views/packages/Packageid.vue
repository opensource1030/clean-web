<template>
  <div>
    <div class="row">
      <div id="package">
        <div class="header">
          <div class="large-12 columns titles">
            <h4>{{packages.names.managePackage}}</h4>
            </div>
          </div>
          <div class="expanded row">
            <div v-show="loadedContent">
              <div class="large-12 columns">
                <div class="large-5 small-12 columns padding">
                  <label>{{packages.names.title}}
                    <input :class="{ 'error-input': packages.nameError }" type="text" placeholder="" :value="packages.name" v-model="packages.name">
                  </label>
                </div>
                <div class="large-6 end small-12 large-offset-1 columns padding">
                  <div class="large-12 small-12 columns textbold">
                    <div class="large-1 small-2 columns">
                      {{packages.names.prices.minimum}}
                    </div>
                    <div class="large-4 small-4 columns" align="right">
                      {{packages.names.devices.minPrice}}
                      {{packages.names.prices.currency}}
                      {{packages.names.prices.once}}
                    </div>
                    <div class="large-7 small-4 columns" align="right">
                      {{packages.names.services.minPrice}}
                      {{packages.names.prices.currency}}
                      {{packages.names.prices.monthly}}
                    </div>
                  </div>
                  <div class="large-12 small-12 columns textbold">
                    <div class="large-1 small-2 columns">
                      {{packages.names.prices.maximum}}
                    </div>
                    <div class="large-4 small-4 columns" align="right">
                      {{packages.names.devices.maxPrice}}
                      {{packages.names.prices.currency}}
                      {{packages.names.prices.once}}
                    </div>
                    <div class="large-7 small-4 columns" align="right">
                      {{packages.names.services.maxPrice}}
                      {{packages.names.prices.currency}}
                      {{packages.names.prices.monthly}}
                    </div>
                  </div>
                </div>
                <div class="large-12 columns">
                  <ul class="acordeon" data-accordion data-allow-all-closed="true" v-f-accordion>
                    <!--CONDITIONS-->
                    <li class="acordeon-item" data-accordion-item  v-f-accordion>
                      <a href="#" class="accordion-title" @click="showFalse()">
                        <table class="textbold">
                          <tr>
                            <td>{{packages.names.conditions.title}}</td>
                            <td align="right">{{packages.values.usersConditions}} {{packages.names.employees}}</td>
                          </tr>
                        </table>
                      </a>
                      <div class="accordion-content overview" data-tab-content v-f-accordion>
                        <div class="row" v-for="(condition,index) in packages.conditions">
                          <div class="large-3 small-12 columns">
                            <label>{{packages.names.conditions.name}}
                              <select :class="{ 'error-input': condition.nameError }" v-model="condition.nameCond" @click="updatePackageCondition(index, condition.nameCond, 'name')">
                                <option value="" manufactured>{{packages.names.conditions.selectName}}</option>
                                <option v-for="item in conditionsFieldsOptions" :value="item" >{{item}}</option>
                              </select>
                            </label>
                          </div>
                          <div v-if="condition.nameCond != ''" class="large-2 small-12 columns">
                            <label>{{packages.names.conditions.condition}}
                              <select :class="{ 'error-input': condition.conditionError }" v-model="condition.condition" @click="updatePackageCondition(index, condition.condition, 'condition')">
                                <option value="" manufactured>{{packages.names.conditions.selectCondition}}</option>
                                <option v-for="item in condition.conditionsConditionsOptions" :value="item" >{{item}}</option>
                              </select>
                            </label>
                          </div>
                          <div v-if="condition.nameCond != ''" class="large-5 small-12 columns">
                            <label>{{packages.names.conditions.value}}
                              <select v-if="condition.conditionsValuesOptions.length > 0" :class="{ 'error-input': condition.valueError }" v-model="condition.value" @click="updatePackageCondition(index, condition.value, 'value')">
                                <option value="" manufactured>{{packages.names.conditions.selectValue}}</option>
                                <option v-for="item in condition.conditionsValuesOptions" :value="item" >{{item}}</option>
                              </select>
                              <input v-if="condition.conditionsValuesOptions.length == 0 && condition.inputType == 'string'" :class="{ 'error-input': condition.valueError }" type="text" placeholder="" :value="condition.value" v-model="condition.value" @keyup="updatePackageCondition(index, condition.value, 'value')" />
                              <input v-if="condition.conditionsValuesOptions.length == 0 && condition.inputType == 'number'" :class="{ 'error-input': condition.valueError }" type="number" placeholder="" :value="condition.value" v-model="condition.value" @keyup="updatePackageCondition(index, condition.value, 'value')">
                            </label>
                          </div>
                          <div class="large-2 small-12 columns">
                            <div class="large-4 small-4 small-offset-2 columns">
                              <a class="button" @click="deleteCondition(index)" id="button" v-show="condition.delete">
                                <i class="fa fa-times fa-2x" aria-hidden="true"></i>
                              </a>
                            </div>
                            <div class="large-4 small-4 end columns">
                              <a class="button" @click="pushCondition(index)" id="button" v-show="condition.add">
                                <i class="fa fa-plus fa-2x"></i>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <!-- //CONDITIONS -->
                    <!-- DEVICES -->
                    <li class="acordeon-item" data-accordion-item  v-f-accordion>
                      <a href="#" class="accordion-title" @click="showFalse()">
                        <table class="textbold">
                          <tr>
                            <td>{{packages.names.devices.title}}</td>
                            <td align="right">From {{packages.names.devices.minPrice}} {{packages.names.prices.currency}} to  {{packages.names.devices.maxPrice}} {{packages.names.prices.currency}} {{packages.names.prices.once}} </td>
                          </tr>
                        </table>
                      </a>
                      <div class="accordion-content" data-tab-content v-f-accordion>
                        <!-- PRESETS -->
                        <div>
                          <div class="presetstitles">{{packages.names.devices.presetsAvailable}}</div>
                          <div class="noinformation" v-show="packages.presets.length == 0">
                            <swiper :options="swiperOption">
                              <swiper-slide v-for="no in packages.noinformation">
                                <img :src="no.url" alt="Image" />
                              </swiper-slide>
                            </swiper>
                          </div>
                          <div v-show="packages.presets.length > 0">
                            <swiper :options="swiperOptionPreset" ref="swPreset">
                              <swiper-slide v-for="(preset,index) in packages.presets">
                                <div class="presetimage" @click="presetSelected(preset)">
                                  <div class="absolute">{{preset.name}}</div>
                                  <img :src="getUrlOfImageSelected(preset)" alt="" />
                                </div>
                              </swiper-slide>
                              <div v-show="packages.presetsController.goBackBoolean" class="swiper-button-prev" slot="button-prev"></div>
                              <div v-show="packages.presetsController.goForwardBoolean" class="swiper-button-next" slot="button-next"></div>
                            </swiper>
                          </div>
                        </div>
                        <!-- //PRESETS -->
                        <!-- DEVICE VARIATIONS -->
                        <div v-show="packages.presetSelected.name != ''">
                          <hr size="10">
                          <div class="presetstitles">{{packages.names.devices.devicesAvailable}} {{packages.presetSelected.name}}</div>
                          <div class="noinformation" v-show="packages.devicevariationsList.length == 0">
                            <swiper :options="swiperOptionA">
                              <swiper-slide v-for="no in packages.noinformation">
                                <img :src="no.url" alt="Image" />
                              </swiper-slide>
                            </swiper>
                          </div>
                          <swiper v-show="packages.devicevariationsList.length > 0" :options="swiperOptionDevices" ref="swDeviceVariationList">
                            <swiper-slide v-for="(devvar, index) in packages.devicevariationsList">
                              <transition name="list">
                                <div class="devicevariationsinformation list-item" :key="devvar" @click="devicevariationSelected(devvar, index)">
                                  <img :src="getUrlOfImage(devvar)" alt="Image" />
                                    {{devvar.devices[0].name}} <br>
                                    {{devvar.devices[0].make}} - {{devvar.devices[0].model}} <br>
                                    {{devvar.price1}} {{devvar.devices[0].currency}}
                                </div>
                              </transition>
                            </swiper-slide>
                            <div class="swiper-button-prev" slot="button-prev"></div>
                            <div class="swiper-button-next" slot="button-next"></div>
                          </swiper>
                        </div>
                        <!-- //DEVICE VARIATIONS -->
                        <!-- DEVICE VARIATIONS SELECTED -->
                        <div v-show="packages.presetSelected.name != '' || packages.devicevariations.length > 0">
                          <hr size="10">
                          <div class="presetstitles">{{packages.names.devices.devicesSelected}}</div>
                          <div class="noinformation" v-show="packages.devicevariations.length == 0">
                            <swiper :options="swiperOptionA">
                              <swiper-slide v-for="no in packages.noinformation">
                                <img :src="no.url" alt="Image" />
                              </swiper-slide>
                            </swiper>
                          </div>
                          <div>
                            <swiper v-show="packages.devicevariations.length > 0" :options="swiperOptionDevices" ref="swDeviceVariationSeleted">
                              <swiper-slide v-for="(devvarsel, index) in packages.devicevariations">
                                <transition name="list">
                                  <div class="devicevariationsinformation list-item" :key="devvarsel" @click="devicevariationNoSelected(devvarsel, index)">
                                    <div class="devicevariationspreset">{{devvarsel.preset}}
                                    </div>
                                    <div>
                                      <img :src="getUrlOfImage(devvarsel)" alt="Image" />
                                    </div>
                                    <div class="devicevariationsinformation">
                                      {{devvarsel.devices[0].name}} <br>
                                      {{devvarsel.devices[0].make}} - {{devvarsel.devices[0].model}} <br>
                                      {{devvarsel.price1}} {{devvarsel.devices[0].currency}}
                                    </div>
                                  </div>
                                </transition>
                              </swiper-slide>
                              <div class="swiper-button-prev" slot="button-prev"></div>
                              <div class="swiper-button-next" slot="button-next"></div>
                            </swiper>
                          </div>
                        </div>
                        <!-- //DEVICE VARIATIONS SELECTED -->
                      </div>
                    </li>
                    <!-- //DEVICES -->
                    <!-- SERVICES -->
                    <li class="acordeon-item" data-accordion-item  v-f-accordion>
                      <a href="#" class="accordion-title" @click="showFalse()">
                        <table class="textbold">
                          <tr>
                            <td>{{packages.names.services.title}}</td>
                            <td align="right">From {{packages.names.services.minPrice}} {{packages.names.prices.currency}} to  {{packages.names.services.maxPrice}} {{packages.names.prices.currency}} {{packages.names.prices.monthly}} </td>
                          </tr>
                        </table>
                      </a>
                      <div class="accordion-content" data-tab-content v-f-accordion>-->
                        <!-- CARRIERS -->
                        <!--<div>
                          <div class="presetstitles">{{packages.names.services.carriersAvailable}}</div>
                          <div class="noinformation" v-show="packages.carriers.length == 0">
                            <swiper :options="swiperOptionA">
                              <swiper-slide v-for="no in packages.noinformation">
                                <img class="borderforchecked" :src="no.url" alt="Image" />
                              </swiper-slide>
                            </swiper>
                          </div>
                          <div>
                            <swiper :options="swiperOptionA" ref="swD">
                              <swiper-slide v-for="(carrier,index) in packages.carriers">
                                <div class="parent" @click="carrierSelected(carrier)">
                                  <img class="image1" :src="getUrlOfImage(carrier)" alt="" />
                                  <img v-show="carrier.selected" class="image2" src="http://www.clker.com/cliparts/h/r/c/1/7/q/single-tick-whtsapp-gray-2-hi.png" alt="" />
                                </div>
                              </swiper-slide>
                              <div class="swiper-button-prev" slot="button-prev"></div>
                              <div v-show="packages.presetsGoForwardBoolean" class="swiper-button-next" slot="button-next"></div>
                            </swiper>
                          </div>
                        </div>-->
                        <!-- //CARRIERS -->
                        <!-- SERVICES -->
                        <!--<div v-show="packages.variablesShow.carrierSelected">
                          <hr size="10">
                          <div class="presetstitles">
                            {{packages.names.services.servicesAvailable}} {{packages.variablesShow.carrierSelectedName}}
                          </div>
                          <div class="noinformation" v-show="packages.servicesList.length == 0">
                            <swiper :options="swiperOptionA">
                              <swiper-slide v-for="no in packages.noinformation">
                                <img class="phoneImg" :src="no.url" alt="Image" />
                              </swiper-slide>
                            </swiper>
                          </div>
                          <div>
                            <swiper v-show="packages.servicesList.length > 0" :options="swiperOptionA" ref="swB">
                              <swiper-slide v-for="(service, index) in packages.servicesList">
                                <div class="presetimage" @click="serviceSelected(service)">
                                  <div class="servicetext">
                                    {{service.title}} <br>
                                    {{service.cost}} {{service.currency}}
                                  </div>
                                  <img :src="getUrlOfImageSelected(service)" alt="" />
                                </div>
                              </swiper-slide>
                              <div class="swiper-button-prev" slot="button-prev"></div>
                              <div class="swiper-button-next" slot="button-next"></div>
                            </swiper>
                          </div>
                          <div v-show="packages.service.show">
                          {{packages.service.title}}
                          </div>
                        </div>-->
                        <!-- //SERVICES -->
                        <!-- SERVICES SELECTED -->
                        <!--<div v-show="packages.variablesShow.presetSelected || packages.devicevariations.length > 0">
                          <hr size="10">
                          <div class="presetstitles">{{packages.names.devices.devicesSelected}}</div>
                          <div class="presetsnoinformation" v-show="packages.devicevariations.length == 0">
                            <swiper :options="swiperOption">
                              <swiper-slide v-for="no in packages.presetsnoinformation">
                                <img class="phoneImg" :src="no.url" alt="Image" />
                              </swiper-slide>
                            </swiper>
                          </div>
                          <div>
                            <swiper v-show="packages.devicevariations.length > 0" :options="swiperOption" ref="swC">
                              <swiper-slide v-for="(devvarsel, index) in packages.devicevariations">
                                <div @click="devicevariationNoSelected(devvarsel, index)">
                                  <div class="devicevariationspreset">{{devvarsel.preset}}</div>
                                  <div>
                                    <img class="phoneImg" :src="getUrlOfImage(devvarsel)" alt="Image" />
                                  </div>
                                  <div class="devicevariationsinformation">
                                    {{devvarsel.devices[0].name}} <br>
                                    {{devvarsel.devices[0].make}} - {{devvarsel.devices[0].model}} <br>
                                    {{devvarsel.price1}} {{devvarsel.devices[0].currency}}
                                  </div>
                                </div>
                              </swiper-slide>
                              <div class="swiper-button-prev" slot="button-prev"></div>
                              <div class="swiper-button-next" slot="button-next"></div>
                            </swiper>
                          </div>
                        </div>-->
                        <!-- //SERVICES SELECTED -->
                      </div>
                    </li>
                    <!-- //SERVICES -->
                  </ul>
                  <div v-if="errors.generalError">
                    <div class="is-error callout" data-closable>
                      <div class="container">
                        <h5>{{packages.names.errors.textError}}</h5>
                      </div>
                    </div>
                  </div>
                  <a class="button large" @click="submit()" id="button">{{packages.names.saveButton}}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./packageid.crtl.js" lang="babel" >
</script>
<style scoped>
  .swiper-slide {
    width: 60%;
  }
  .swiper-slide:nth-child(2n) {
    width: 40%;
  }
  .swiper-slide:nth-child(3n) {
    width: 20%;
  }
</style>
