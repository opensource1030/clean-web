<template>
  <div>
    <div id="package" class="row">
      <div class="header">
        <div class="titles">
          <h4>{{package.names.managePackage}}</h4>
        </div>
      </div>
      <div class="expanded row">
        <div v-show="loadedContent">
          <div class="large-12 columns">
            <div class="large-5 small-12 columns" style="padding-left: 5%">
              <label>{{package.names.title}}
                <input :class="{'error-input': package.errors.name}" type="text" placeholder="" :value="package.name" v-model="package.name">
              </label>
            </div>
            <div class="large-6 end small-12 large-offset-1 columns" style="padding-top: 2% ; font-weight: bold">
              <div class="large-12 small-12 columns textbold">
                <div class="large-1 small-2 columns">
                  {{package.names.prices.minimum}}
                </div>
                <div class="large-4 small-4 columns" align="right">
                  {{devicevariations.names.minPrice}}
                  {{package.names.prices.currency}}
                  {{package.names.prices.once}}
                </div>
                <div class="large-7 small-4 columns" align="right">
                  {{services.names.minPrice}}
                  {{package.names.prices.currency}}
                  {{package.names.prices.monthly}}
                </div>
              </div>
              <div class="large-12 small-12 columns textbold">
                <div class="large-1 small-2 columns">
                  {{package.names.prices.maximum}}
                </div>
                <div class="large-4 small-4 columns" align="right">
                  {{devicevariations.names.maxPrice}}
                  {{package.names.prices.currency}}
                  {{package.names.prices.once}}
                </div>
                <div class="large-7 small-4 columns" align="right">
                  {{services.names.maxPrice}}
                  {{package.names.prices.currency}}
                  {{package.names.prices.monthly}}
                </div>
              </div>
            </div>
            <div class="large-12 columns">
              <ul class="acordeon" data-accordion data-allow-all-closed="true" v-f-accordion>
                <!--CONDITIONS-->
                <li class="acordeon-item" style="overflow: hidden;" data-accordion-item  v-f-accordion>
                  <a href="#" class="accordion-title" @click="showFalse()">
                    <table class="textbold">
                      <tr>
                        <td>{{conditions.names.title}}</td>
                        <td align="right">{{conditions.numberOfUsers}} {{conditions.names.employees}}</td>
                      </tr>
                    </table>
                  </a>
                  <div class="accordion-content overview" data-tab-content v-f-accordion>
                    <div class="row" v-for="(condition,index) in conditions.selected">
                      <div class="large-3 small-12 columns">
                        <label>{{conditions.names.titleField}}
                          <select :class="{ 'error-input': condition.nameError }" v-model="condition.nameCond" @click="updatePackageCondition(index, condition.nameCond, 'name')">
                            <option value="" manufactured>{{conditions.names.selectName}}</option>
                            <option v-for="item in information.conditionsFieldsOptions" :value="item" >{{item}}</option>
                          </select>
                        </label>
                      </div>
                      <div v-if="condition.nameCond != ''" class="large-3 small-12 columns">
                        <label>{{conditions.names.conditionField}}
                          <select :class="{ 'error-input': condition.conditionError }" v-model="condition.condition" @click="updatePackage(index, condition.condition, 'condition')">
                            <option value="" manufactured>{{conditions.names.selectCondition}}</option>
                            <option v-for="item in condition.conditionsConditionsOptions" :value="item" >{{item}}</option>
                          </select>
                        </label>
                      </div>
                      <div v-if="condition.nameCond != ''" class="large-4 small-12 columns">
                        <label>{{conditions.names.valueField}}
                          <select v-if="condition.conditionsValuesOptions.length > 0" :class="{ 'error-input': condition.valueError }" v-model="condition.value" @click="updatePackage(index, condition.value, 'value')">
                            <option value="" manufactured>{{conditions.names.selectValue}}</option>
                            <option v-for="item in condition.conditionsValuesOptions" :value="item" >{{item}}</option>
                          </select>
                          <input v-if="condition.conditionsValuesOptions.length == 0 && condition.inputType == 'string'" :class="{ 'error-input': condition.valueError }" type="text" placeholder="" :value="condition.value" v-model="condition.value" @keyup="updatePackage(index, condition.value, 'value')" />
                          <input v-if="condition.conditionsValuesOptions.length == 0 && condition.inputType == 'number'" :class="{ 'error-input': condition.valueError }" type="number" placeholder="" :value="condition.value" v-model="condition.value" @keyup="updatePackage(index, condition.value, 'value')">
                        </label>
                      </div>
                      <div class="large-2 small-12 columns" style="padding-top: 2.2%">
                        <div class="large-4 small-4 small-offset-2 columns">
                          <a class="button" style="border-radius: 10px;" @click="deleteCondition(index)" id="button" v-show="condition.delete">
                            <i class="fa fa-times fa-2x" aria-hidden="true"></i>
                          </a>
                        </div>
                        <div class="large-4 large-offset-1 small-4 end columns">
                          <a class="button" style="border-radius: 10px;" @click="pushCondition(index)" id="button" v-show="condition.add">
                            <i class="fa fa-plus fa-2x"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <!-- //CONDITIONS -->
                <!-- DEVICES -->
                <li class="acordeon-item" style="overflow: hidden;" data-accordion-item  v-f-accordion>
                  <a href="#" class="accordion-title" @click="showFalse()">
                    <table class="textbold">
                      <tr>
                        <td>{{devicevariations.names.title}}</td>
                        <td align="right">From {{devicevariations.names.minPrice}} {{package.names.prices.currency}} to  {{devicevariations.names.maxPrice}} {{package.names.prices.currency}} {{package.names.prices.once}} </td>
                      </tr>
                    </table>
                  </a>
                  <div class="accordion-content" data-tab-content v-f-accordion>
                    <!-- PRESETS -->
                    <div>
                      <div class="titlesZones">{{presets.names.available}}</div>
                      <div class="noinformation" v-show="presets.list.length == 0">
                        <swiper :options="swiperOption.preset">
                          <swiper-slide v-for="no in package.noinformation">
                            <img :src="no.url" alt="Image" />
                          </swiper-slide>
                        </swiper>
                      </div>
                      <div v-show="presets.list.length > 0">
                        <swiper :options="swiperOption.preset" ref="swPresets">
                          <swiper-slide v-for="(preset,index) in presets.list">
                            <div class="presetimage" @click="presetSelected(preset)">
                              <div class="absolute">{{preset.name}}</div>
                              <img :src="getUrlOfImageSelected(preset)" alt="" />
                            </div>
                          </swiper-slide>
                          <div v-show="presets.controller.goBackBoolean" class="swiper-button-prev" slot="button-prev"></div>
                          <div v-show="presets.controller.goForwardBoolean" class="swiper-button-next" slot="button-next"></div>
                        </swiper>
                      </div>
                    </div>
                    <!-- //PRESETS -->
                    <!-- DEVICE VARIATIONS AVAILABLE-->
                    <div v-show="presets.isSelected">
                      <div class="titlesZones">{{devicevariations.names.available}} {{presets.selected.name}}</div>
                      <div class="noinformation" v-show="devicevariations.filtered.length == 0">
                        <swiper :options="swiperOption.devicevariationsFiltered">
                          <swiper-slide v-for="no in package.noinformation">
                            <img :src="no.url" alt="Image" />
                          </swiper-slide>
                        </swiper>
                      </div>
                      <swiper v-show="devicevariations.filtered.length > 0" :options="swiperOption.devicevariationsFiltered" ref="swDevicevariationsFiltered">
                        <swiper-slide v-for="(devvar, index) in devicevariations.filtered">
                          <transition name="list">
                            <div class="devicevariationsinformation list-item" :key="devvar" @click="addDeviceVariation(devvar, index)">
                              <img :src="getUrlOfImage(devvar, 'devicevariation')" alt="Image" />
                              {{devvar.devices[0].name}} <br>
                              {{devvar.devices[0].make}} - {{devvar.devices[0].model}} <br>
                              {{devvar.price1}} {{devvar.devices[0].currency}}
                            </div>
                          </transition>
                        </swiper-slide>
                        <div v-show="devicevariations.controller.filtered.goBackBoolean" class="swiper-button-prev" slot="button-prev"></div>
                        <div v-show="devicevariations.controller.filtered.goForwardBoolean" class="swiper-button-next" slot="button-next"></div>
                      </swiper>
                    </div>
                    <!-- //DEVICE VARIATIONS AVAILABLE -->
                    <!-- DEVICE VARIATIONS SELECTED -->
                    <div v-show="presets.isSelected || devicevariations.selected.length > 0">
                      <div class="titlesZones">{{devicevariations.names.selected}}</div>
                      <div class="noinformation" v-show="devicevariations.selected.length == 0">
                        <swiper :options="swiperOption.devicevariationsSelected">
                          <swiper-slide v-for="no in package.noinformation">
                            <img :src="no.url" alt="Image" />
                          </swiper-slide>
                        </swiper>
                      </div>
                      <div>
                        <swiper v-show="devicevariations.selected.length > 0" :options="swiperOption.devicevariationsSelected" ref="swDevicevariationsSelected">
                          <swiper-slide v-for="(devvarsel, index) in devicevariations.selected">
                            <transition name="list">
                              <div class="devicevariationsinformation list-item" :key="devvarsel" @click="deleteDeviceVariation(devvarsel, index)">
                                <div class="devicevariationspreset">{{devvarsel.preset}}</div>
                                <div>
                                  <img :src="getUrlOfImage(devvarsel, 'devicevariation')" alt="Image" />
                                </div>
                                <div class="devicevariationsinformation">
                                  {{devvarsel.devices[0].name}} <br>
                                  {{devvarsel.devices[0].make}} - {{devvarsel.devices[0].model}} <br>
                                  {{devvarsel.price1}} {{devvarsel.devices[0].currency}}
                                </div>
                              </div>
                            </transition>
                          </swiper-slide>
                          <div v-show="devicevariations.controller.selected.goBackBoolean" class="swiper-button-prev" slot="button-prev"></div>
                          <div v-show="devicevariations.controller.selected.goForwardBoolean" class="swiper-button-next" slot="button-next"></div>
                        </swiper>
                      </div>
                    </div>
                    <!-- //DEVICE VARIATIONS SELECTED -->
                  </div>
                </li>
                <!-- //DEVICES -->
                <!-- SERVICES -->
                <li class="acordeon-item" style="overflow: hidden;" data-accordion-item  v-f-accordion>
                  <a href="#" class="accordion-title" @click="showFalse()">
                    <table class="textbold">
                      <tr>
                        <td>{{services.names.title}}</td>
                        <td align="right">From {{services.names.minPrice}} {{package.names.prices.currency}} to  {{services.names.maxPrice}} {{package.names.prices.currency}} {{package.names.prices.monthly}} </td>
                      </tr>
                    </table>
                  </a>
                  <div class="accordion-content" data-tab-content v-f-accordion>
                    <!-- CARRIERS -->
                    <div>
                      <div class="titlesZones">{{carriers.names.available}}</div>
                      <div class="noinformation" v-show="carriers.list.length == 0">
                        <swiper :options="swiperOption.carrier">
                          <swiper-slide v-for="no in package.noinformation">
                            <img :src="no.url" alt="Image" />
                          </swiper-slide>
                        </swiper>
                      </div>
                      <div v-show="carriers.list.length > 0">
                        <swiper :options="swiperOption.carrier" ref="swCarriers">
                          <swiper-slide v-for="(carrier,index) in carriers.list">
                            <div :class="{ 'carrierimage' : carrier.id === carrierSelected.id}" @click="carrierSelected(carrier)">
                              <div class="absolute">{{carrier.presentation}}</div>
                              <img :src="getUrlOfImageSelected(carrier, 'carrier')" alt="" />
                            </div>
                          </swiper-slide>
                          <div v-show="carriers.controller.goBackBoolean" class="swiper-button-prev" slot="button-prev"></div>
                          <div v-show="carriers.controller.goForwardBoolean" class="swiper-button-next" slot="button-next"></div>
                        </swiper>
                      </div>
                    </div>
                    <!-- //CARRIERS -->
                    <!-- SERVICES -->
                    <div v-show="carriers.isSelected">
                      <div class="titlesZones">
                        {{services.names.available}} {{carriers.selected.presentation}}
                      </div>
                      <div class="noinformation" v-show="services.filtered.length == 0">
                        <swiper :options="swiperOption.serviceFiltered">
                          <swiper-slide v-for="no in package.noinformation">
                            <img :src="no.url" alt="Image" />
                          </swiper-slide>
                        </swiper>
                      </div>
                      <div v-show="services.filtered.length > 0">
                        <swiper :options="swiperOption.serviceFiltered" ref="swServicesFiltered">
                          <swiper-slide v-for="(service, index) in services.filtered">
                            <transition name="list">
                              <div class="presetimage list-item" :key="service" @click="serviceListInformationFiltered(service)">
                                <div class="servicetext" style="text-align: center; position: absolute; top: 10%; left: 10%; width: 80%;">
                                  {{service.title}} <br> {{service.cost}} {{service.currency}}
                                </div>
                                <img :src="getUrlOfImageSelected(service)" alt="" />
                              </div>
                            </transition>
                          </swiper-slide>
                          <div v-show="services.controller.filtered.goBackBoolean" class="swiper-button-prev" slot="button-prev"></div>
                          <div v-show="services.controller.filtered.goForwardBoolean" class="swiper-button-next" slot="button-next"></div>
                        </swiper>
                      </div>
                      <div v-show="services.isSelectedII">
                        <table>
                          <tr>
                            <td colspan="2">
                              <div class="textbold">{{services.itemInformation.title}}</div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div class="textbold">{{services.itemInformation.cost}} {{services.itemInformation.currency}}</div>
                            </td>
                            <td>
                              <div class="textbold large-9 columns" v-show="services.isSelectedISI" :class="{ 'colorgreen': getTheDifferenceBetweenServices(null, null, 'list') > 0 , 'colorred': getTheDifferenceBetweenServices(null, null, 'list') < 0 }">
                                {{getTheDifferenceBetweenServices(null, null, 'list')}} {{services.itemInformation.currency}}
                              </div>
                            </td>
                          </tr>
                        </table>
                        <div class="large-12 columns">
                          <div class="large-8 columns">
                            {{services.itemInformation.description}}
                          </div>
                          <div class="large-4 columns">
                            <a class="button large" @click="addService()" id="button">ADD</a>
                          </div>
                          <div class="large-12 columns" v-show="services.itemInformation.serviceitems.length > 0">
                            <table>
                              <tr>
                                <th>Domain</th>
                                <th>Category</th>
                                <th>Value</th>
                                <th v-show="services.isSelectedISI">Difference</th>
                              </tr>
                              <tr>
                                <td>Domestic</td>
                                <td>Voice</td>
                                <td>{{getTheRowOfServiceItems('domestic', 'voice', 'list')}}</td>
                                <td v-show="services.isSelectedISI"><div :class="{ 'colorgreen': getTheDifferenceBetweenServices('domestic', 'voice', 'list') > 0 , 'colorred': getTheDifferenceBetweenServices('domestic', 'voice', 'list') < 0 }">{{getTheDifferenceBetweenServices('domestic', 'voice', 'list')}}</div></td>
                              </tr>
                              <tr>
                                <td>Domestic</td>
                                <td>Data</td>
                                <td>{{getTheRowOfServiceItems('domestic', 'data', 'list')}}</td>
                                <td v-show="services.isSelectedISI"><div :class="{ 'colorgreen': getTheDifferenceBetweenServices('domestic', 'data', 'list') > 0 , 'colorred': getTheDifferenceBetweenServices('domestic', 'data', 'list') < 0 }">{{getTheDifferenceBetweenServices('domestic', 'data', 'list')}}</div></td>
                              </tr>
                              <tr>
                                <td>Domestic</td>
                                <td>Messages</td>
                                <td>{{getTheRowOfServiceItems('domestic', 'messaging', 'list')}}</td>
                                <td v-show="services.isSelectedISI"><div :class="{ 'colorgreen': getTheDifferenceBetweenServices('domestic', 'messaging', 'list') > 0 , 'colorred': getTheDifferenceBetweenServices('domestic', 'messaging', 'list') < 0 }">{{getTheDifferenceBetweenServices('domestic', 'messaging', 'list')}}</div></td>
                              </tr>
                              <tr>
                                <td>International</td>
                                <td>Voice</td>
                                <td>{{getTheRowOfServiceItems('international', 'voice', 'list')}}</td>
                                <td v-show="services.isSelectedISI"><div :class="{ 'colorgreen': getTheDifferenceBetweenServices('international', 'voice', 'list') > 0 , 'colorred': getTheDifferenceBetweenServices('international', 'voice', 'list') < 0 }">{{getTheDifferenceBetweenServices('international', 'voice', 'list')}}</div></td>
                              </tr>
                              <tr>
                                <td>International</td>
                                <td>Data</td>
                                <td>{{getTheRowOfServiceItems('international', 'data', 'list')}}</td>
                                <td v-show="services.isSelectedISI"><div :class="{ 'colorgreen': getTheDifferenceBetweenServices('international', 'data', 'list') > 0 , 'colorred': getTheDifferenceBetweenServices('international', 'data', 'list') < 0 }">{{getTheDifferenceBetweenServices('international', 'data', 'list')}}</div></td>
                              </tr>
                              <tr>
                                <td>International</td>
                                <td>Messages</td>
                                <td>{{getTheRowOfServiceItems('international', 'messaging', 'list')}}</td>
                                <td v-show="services.isSelectedISI"><div :class="{ 'colorgreen': getTheDifferenceBetweenServices('international', 'messaging', 'list') > 0 , 'colorred': getTheDifferenceBetweenServices('international', 'messaging', 'list') < 0 }">{{getTheDifferenceBetweenServices('international', 'messaging', 'list')}}</div></td>
                              </tr>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- //SERVICES -->
                    <!-- SERVICES SELECTED -->
                    <div v-show="carriers.isSelected || services.selected.length > 0">
                      <div class="titlesZones">{{services.names.selected}}</div>
                      <div class="large-10 colunns" v-show="services.isSelectedISI">
                        <div class="large-12 columns">
                          <table>
                            <tr>
                              <td colspan="2">
                                <div class="textbold">{{services.itemSelectedInformation.title}}</div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div class="textbold">{{services.itemSelectedInformation.cost}} {{services.itemSelectedInformation.currency}}</div>
                              </td>
                              <td>
                                <div class="textbold large-10 columns" v-show="services.isSelectedII" :class="{ 'colorgreen': getTheDifferenceBetweenServices(null, null, 'selected') > 0 , 'colorred': getTheDifferenceBetweenServices(null, null, 'selected') < 0 }">
                                    {{getTheDifferenceBetweenServices(null, null, 'selected')}} {{services.itemSelectedInformation.currency}}
                                </div>
                              </td>
                            </tr>
                          </table>
                        </div>
                        <div class="large-12 columns">
                          <div class="large-8 columns">
                            <div>{{services.itemSelectedInformation.description}}</div>
                          </div>
                          <div class="large-4 columns">
                            <a class="button large" @click="deleteService()" id="button">DELETE</a>
                          </div>
                        </div>
                        <div class="large-12 columns">
                          <div class="large-12 columns" v-show="services.itemSelectedInformation.serviceitems.length > 0">
                            <table>
                              <tr>
                                <th>Domain</th>
                                <th>Category</th>
                                <th>Value</th>
                                <th v-show="services.isSelectedII">Difference</th>
                              </tr>
                              <tr>
                                <td>Domestic</td>
                                <td>Voice</td>
                                <td>{{getTheRowOfServiceItems('domestic', 'voice', 'selected')}}</td>
                                <td v-show="services.isSelectedII"><div :class="{ 'colorgreen': getTheDifferenceBetweenServices('domestic', 'voice', 'selected') > 0 , 'colorred': getTheDifferenceBetweenServices('domestic', 'voice', 'selected') < 0 }">{{getTheDifferenceBetweenServices('domestic', 'voice', 'selected')}}</div></td>
                              </tr>
                              <tr>
                                <td>Domestic</td>
                                <td>Data</td>
                                <td>{{getTheRowOfServiceItems('domestic', 'data', 'selected')}}</td>
                                <td v-show="services.isSelectedII"><div :class="{ 'colorgreen': getTheDifferenceBetweenServices('domestic', 'data', 'selected') > 0 , 'colorred': getTheDifferenceBetweenServices('domestic', 'data', 'selected') < 0 }">{{getTheDifferenceBetweenServices('domestic', 'data', 'selected')}}</div></td>
                              </tr>
                              <tr>
                                <td>Domestic</td>
                                <td>Messages</td>
                                <td>{{getTheRowOfServiceItems('domestic', 'messaging', 'selected')}}</td>
                                <td v-show="services.isSelectedII"><div :class="{ 'colorgreen': getTheDifferenceBetweenServices('domestic', 'messaging', 'selected') > 0 , 'colorred': getTheDifferenceBetweenServices('domestic', 'messaging', 'selected') < 0 }">{{getTheDifferenceBetweenServices('domestic', 'messaging', 'selected')}}</div></td>
                              </tr>
                              <tr>
                                <td>International</td>
                                <td>Voice</td>
                                <td>{{getTheRowOfServiceItems('international', 'voice', 'selected')}}</td>
                                <td v-show="services.isSelectedII"><div :class="{ 'colorgreen': getTheDifferenceBetweenServices('international', 'voice', 'selected') > 0 , 'colorred': getTheDifferenceBetweenServices('international', 'voice', 'selected') < 0 }">{{getTheDifferenceBetweenServices('international', 'voice', 'selected')}}</div></td>
                              </tr>
                              <tr>
                                <td>International</td>
                                <td>Data</td>
                                <td>{{getTheRowOfServiceItems('international', 'data', 'selected')}}</td>
                                <td v-show="services.isSelectedII"><div :class="{ 'colorgreen': getTheDifferenceBetweenServices('international', 'data', 'selected') > 0 , 'colorred': getTheDifferenceBetweenServices('international', 'data', 'selected') < 0 }">{{getTheDifferenceBetweenServices('international', 'data', 'selected')}}</div></td>
                              </tr>
                              <tr>
                                <td>International</td>
                                <td>Messages</td>
                                <td>{{getTheRowOfServiceItems('international', 'messaging', 'selected')}}</td>
                                <td v-show="services.isSelectedII"><div :class="{ 'colorgreen': getTheDifferenceBetweenServices('international', 'messaging', 'selected') > 0 , 'colorred': getTheDifferenceBetweenServices('international', 'messaging', 'selected') < 0 }">{{getTheDifferenceBetweenServices('international', 'messaging', 'selected')}}</div></td>
                              </tr>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div class="noinformation large-12 columns" v-show="services.selected.length == 0">
                        <swiper :options="swiperOption.serviceSelected">
                          <swiper-slide v-for="no in package.noinformation">
                            <img :src="no.url" alt="Image" />
                          </swiper-slide>
                        </swiper>
                      </div>
                      <div class="large-12 columns">
                        <swiper v-show="services.selected.length > 0" :options="swiperOption.serviceSelected" ref="swServicesSelected">
                          <swiper-slide v-for="(service, index) in services.selected">
                            <transition name="list">
                              <div class="presetimage list-item" :key="service" @click="serviceListInformationSelected(service)">
                                <img :src="getUrlOfImageSelected(service)" alt=""  />
                                <div class="servicetext">
                                  {{service.title}} <br> {{service.cost}} {{service.currency}}
                                </div>
                              </div>
                            </transition>
                          </swiper-slide>
                          <div v-show="services.controller.selected.goBackBoolean" class="swiper-button-prev" slot="button-prev"></div>
                          <div v-show="services.controller.selected.goForwardBoolean" class="swiper-button-next" slot="button-next"></div>
                        </swiper>
                      </div>
                    </div>
                  <!-- //SERVICES SELECTED -->
                  </div>
                </li>
                <!-- //SERVICES -->
                <!-- ADDRESS -->
                <li class="acordeon-item" style="overflow: hidden;" data-accordion-item  v-f-accordion>
                  <a href="#" class="accordion-title" @click="showFalse()">
                    <table class="textbold">
                      <tr>
                        <td>{{address.names.title}}</td>
                      </tr>
                    </table>
                  </a>
                  <div class="accordion-content" data-tab-content v-f-accordion>
                    <div>
                      <div class="titlesZones">{{address.names.available}}</div>
                      <div class="noinformation" v-show="address.filtered.length == 0">
                        <swiper :options="swiperOption.addressFiltered">
                          <swiper-slide v-for="no in package.noinformation">
                            <img :src="no.url" alt="Image" />
                          </swiper-slide>
                        </swiper>
                      </div>
                      <div v-show="address.filtered.length > 0">
                        <swiper :options="swiperOption.addressFiltered" ref="swAddressFiltered">
                          <swiper-slide v-for="(add,index) in address.filtered">
                            <div class="presetimage list-item" :key="address" @click="addressListInformationFiltered(add)">
                              <img :src="getUrlOfImageSelected(add)" alt=""  />
                              <div class="addresstext">
                                {{add.name}} <br> {{add.address}} <br> {{add.city}} ({{add.country}})
                              </div>
                            </div>
                          </swiper-slide>
                          <div v-show="address.controller.filtered.goBackBoolean" class="swiper-button-prev" slot="button-prev"></div>
                          <div v-show="address.controller.filtered.goForwardBoolean" class="swiper-button-next" slot="button-next"></div>
                        </swiper>
                      </div>
                    </div>
                    <div class="large-6 columns" style="padding-top: 20px;" v-show="address.isSelectedII">
                      <div class="textbold">{{address.itemInformation.name}}</div>
                      {{address.itemInformation.attn}} <br>
                      {{address.itemInformation.address}} <br>
                      {{address.itemInformation.city}} - {{address.itemInformation.state}} <br>({{address.itemInformation.postalCode}} - {{address.itemInformation.country}})<br>
                      Phone: {{address.itemInformation.phone}} <br>
                      <div class="large-2 end small-4 columns" @click="addAddress()">
                        <a class="button" style="border-radius: 10px; padding: 19%;">
                          <i class="fa fa-plus fa-2x" aria-hidden="true"></i>
                        </a>
                      </div>
                    </div>
                    <div class="large-6 columns" style="padding-top: 20px;" v-show="address.isSelectedISI">
                      <div class="textbold">{{address.itemSelectedInformation.name}}</div>
                      {{address.itemSelectedInformation.attn}} <br>
                      {{address.itemSelectedInformation.address}} <br>
                      {{address.itemSelectedInformation.city}} - {{address.itemSelectedInformation.state}} <br>({{address.itemSelectedInformation.postalCode}} - {{address.itemSelectedInformation.country}})<br>
                      Phone: {{address.itemSelectedInformation.phone}} <br>
                      <div class="large-2 end small-4 columns" @click="deleteAddress()">
                        <a class="button" style="border-radius: 10px; padding: 19%;">
                          <i class="fa fa-times fa-2x"></i>
                        </a>
                      </div>
                    </div>
                    <div v-show="address.selected.length > 0" class="large-12 columns">
                      <div class="titlesZones">{{address.names.selected}}</div>
                      <div class="noinformation" v-show="address.selected.length == 0">
                        <swiper :options="swiperOption.addressSelected">
                          <swiper-slide v-for="no in package.noinformation">
                            <img :src="no.url" alt="Image" />
                          </swiper-slide>
                        </swiper>
                      </div>
                      <div v-show="address.selected.length > 0">
                        <swiper :options="swiperOption.addressSelected" ref="swAddressSelected">
                          <swiper-slide v-for="(add,index) in address.selected">
                            <div class="presetimage list-item" :key="address" @click="addressListInformationSelected(add)">
                              <img :src="getUrlOfImageSelected(add)" alt=""  />
                              <div class="addresstext">
                                {{add.name}} <br> {{add.address}} <br> {{add.city}} ({{add.country}})
                              </div>
                            </div>
                          </swiper-slide>
                          <div v-show="address.controller.selected.goBackBoolean" class="swiper-button-prev" slot="button-prev"></div>
                          <div v-show="address.controller.selected.goForwardBoolean" class="swiper-button-next" slot="button-next"></div>
                        </swiper>
                      </div>
                    </div>
                  </div>
                </li>
                <!-- //ADDRESS -->
              </ul>
            </div>
            <div v-show="errors.generalError " class="error-message">{{package.errors.generalMessage}}</div>
            <a class="button large" @click="submit()" id="button">{{package.names.saveButton}}</a>
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
