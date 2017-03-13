<template>
  <div>
    <div class="row">
      <div id="package">
        <div class="header">
          <div class="large-12 columns titles">
            <h4>{{packages.names.managePackage}}</h4>
          </div>
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
                      <div class="titlesZones">{{packages.names.devices.presetsAvailable}}</div>
                      <div class="noinformation" v-show="packages.presets.length == 0">
                        <swiper :options="swiperOptionPreset">
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
                      <div class="titlesZones">{{packages.names.devices.devicesAvailable}} {{packages.presetSelected.name}}</div>
                      <div class="noinformation" v-show="packages.devicevariationsList.length == 0">
                        <swiper :options="swiperOptionA">
                          <swiper-slide v-for="no in packages.noinformation">
                            <img :src="no.url" alt="Image" />
                          </swiper-slide>
                        </swiper>
                      </div>
                      <swiper v-show="packages.devicevariationsList.length > 0" :options="swiperOptionDevVarList" ref="swDeviceVariationList">
                        <swiper-slide v-for="(devvar, index) in packages.devicevariationsList">
                          <transition name="list">
                            <div class="devicevariationsinformation list-item" :key="devvar" @click="devicevariationSelected(devvar, index)">
                              <img :src="getUrlOfImage(devvar, 'devicevariation')" alt="Image" />
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
                      <div class="titlesZones">{{packages.names.devices.devicesSelected}}</div>
                      <div class="noinformation" v-show="packages.devicevariations.length == 0">
                        <swiper :options="swiperOptionA">
                          <swiper-slide v-for="no in packages.noinformation">
                            <img :src="no.url" alt="Image" />
                          </swiper-slide>
                        </swiper>
                      </div>
                      <div>
                        <swiper v-show="packages.devicevariations.length > 0" :options="swiperOptionDevVarSel" ref="swDeviceVariationSeleted">
                          <swiper-slide v-for="(devvarsel, index) in packages.devicevariations">
                            <transition name="list">
                              <div class="devicevariationsinformation list-item" :key="devvarsel" @click="devicevariationNoSelected(devvarsel, index)">
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
                  <div class="large-12 columns accordion-content" data-tab-content v-f-accordion>
                    <!-- CARRIERS -->
                    <div class="large-12 columns">
                      <div class="large-12 columns titlesZones">{{packages.names.services.carriersAvailable}}</div>
                      <div class="large-12 columns noinformation" v-show="packages.carriers.length == 0">
                        <swiper :options="swiperOptionCarrier">
                          <swiper-slide v-for="no in packages.noinformation">
                            <img :src="no.url" alt="Image" />
                          </swiper-slide>
                        </swiper>
                      </div>
                      <div class="large-12 columns" v-show="packages.carriers.length > 0">
                        <swiper :options="swiperOptionCarrier" ref="swCarrier">
                          <swiper-slide v-for="(carrier,index) in packages.carriers">
                            <div :class="{ 'carrierimage' : carrier.id === packages.carrierSelected.id}" @click="carrierSelected(carrier)">
                              <img :src="getUrlOfImage(carrier, 'carrier')" alt="" />
                            </div>
                          </swiper-slide>
                          <div v-show="packages.carriersController.goBackBoolean" class="swiper-button-prev" slot="button-prev"></div>
                          <div v-show="packages.carriersController.goForwardBoolean" class="swiper-button-next" slot="button-next"></div>
                        </swiper>
                      </div>
                    </div>
                    <!-- //CARRIERS -->
                    <hr size="10">
                    <!-- SERVICES -->
                    <div class="large-12 columns" v-show="packages.carrierSelected.name != ''">
                      <div class="large-12 columns titlesZones">
                        {{packages.names.services.servicesAvailable}} {{packages.carrierSelected.presentation}}
                      </div>
                      <div class="large-12 columns noinformation" v-show="packages.servicesList.length == 0">
                        <swiper :options="swiperOption">
                          <swiper-slide v-for="no in packages.noinformation">
                            <img :src="no.url" alt="Image" />
                          </swiper-slide>
                        </swiper>
                      </div>
                      <div class="large-12 columns">
                        <swiper v-show="packages.servicesList.length > 0" :options="swiperOptionServiceList" ref="swServicesList">
                          <swiper-slide v-for="(serice, index) in packages.servicesList">
                            <transition name="list">
                              <div class="presetimage list-item" :key="service" @click="serviceInformation(service)">
                                <div class="servicetext">
                                  {{service.title}} <br> {{service.cost}} {{service.currency}}
                                </div>
                                <img :src="getUrlOfImageSelected(service)" alt="" />
                              </div>
                            </transition>
                          </swiper-slide>
                          <div v-show="packages.servicesController.goBackBoolean" class="swiper-button-prev" slot="button-prev"></div>
                          <div v-show="packages.servicesController.goForwardBoolean" class="swiper-button-next" slot="button-next"></div>
                        </swiper>
                      </div>
                      <div class="large-10 columns" v-show="packages.serviceInformationBool">
                        <div class="large-12 end columns">
                          <table>
                            <tr>
                              <td colspan="2">
                                <div class="textbold">{{packages.serviceInformation.title}}</div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div class="textbold">{{packages.serviceInformation.cost}} {{packages.serviceInformation.currency}}</div>
                              </td>
                              <td>
                                <div class="textbold large-9 columns" v-show="packages.serviceSelectedInformationBool" :class="{ 'colorgreen': getTheDifferenceBetweenServices(null, null, 'list') > 0 , 'colorred': getTheDifferenceBetweenServices(null, null, 'list') < 0 }">
                                      {{getTheDifferenceBetweenServices(null, null, 'list')}} {{packages.serviceInformation.currency}}
                                </div>
                              </td>
                            </tr>
                          </table>
                        </div>
                        <div class="large-12 columns">
                          <div class="large-8 columns">
                            {{packages.serviceInformation.description}}
                          </div>
                          <div class="large-4 columns">
                            <a class="button large" @click="addServiceSelected()" id="button">ADD</a>
                          </div>
                          <div class="large-12 columns" v-show="packages.serviceInformation.serviceitems.length > 0">
                            <table>
                              <tr>
                                <th>Domain</th>
                                <th>Category</th>
                                <th>Value</th>
                                <th v-show="packages.serviceSelectedInformationBool">Difference</th>
                              </tr>
                              <tr>
                                <td>Domestic</td>
                                <td>Voice</td>
                                <td>{{getTheRowOfServiceItems('domestic', 'voice', 'list')}}</td>
                                <td v-show="packages.serviceSelectedInformationBool"><div :class="{ 'colorgreen': getTheDifferenceBetweenServices('domestic', 'voice', 'list') > 0 , 'colorred': getTheDifferenceBetweenServices('domestic', 'voice', 'list') < 0 }">{{getTheDifferenceBetweenServices('domestic', 'voice', 'list')}}</div></td>
                              </tr>
                              <tr>
                                <td>Domestic</td>
                                <td>Data</td>
                                <td>{{getTheRowOfServiceItems('domestic', 'data', 'list')}}</td>
                                <td v-show="packages.serviceSelectedInformationBool"><div :class="{ 'colorgreen': getTheDifferenceBetweenServices('domestic', 'data', 'list') > 0 , 'colorred': getTheDifferenceBetweenServices('domestic', 'data', 'list') < 0 }">{{getTheDifferenceBetweenServices('domestic', 'data', 'list')}}</div></td>
                              </tr>
                              <tr>
                                <td>Domestic</td>
                                <td>Messages</td>
                                <td>{{getTheRowOfServiceItems('domestic', 'messaging', 'list')}}</td>
                                <td v-show="packages.serviceSelectedInformationBool"><div :class="{ 'colorgreen': getTheDifferenceBetweenServices('domestic', 'messaging', 'list') > 0 , 'colorred': getTheDifferenceBetweenServices('domestic', 'messaging', 'list') < 0 }">{{getTheDifferenceBetweenServices('domestic', 'messaging', 'list')}}</div></td>
                              </tr>
                              <tr>
                                <td>International</td>
                                <td>Voice</td>
                                <td>{{getTheRowOfServiceItems('international', 'voice', 'list')}}</td>
                                <td v-show="packages.serviceSelectedInformationBool"><div :class="{ 'colorgreen': getTheDifferenceBetweenServices('international', 'voice', 'list') > 0 , 'colorred': getTheDifferenceBetweenServices('international', 'voice', 'list') < 0 }">{{getTheDifferenceBetweenServices('international', 'voice', 'list')}}</div></td>
                              </tr>
                              <tr>
                                <td>International</td>
                                <td>Data</td>
                                <td>{{getTheRowOfServiceItems('international', 'data', 'list')}}</td>
                                <td v-show="packages.serviceSelectedInformationBool"><div :class="{ 'colorgreen': getTheDifferenceBetweenServices('international', 'data', 'list') > 0 , 'colorred': getTheDifferenceBetweenServices('international', 'data', 'list') < 0 }">{{getTheDifferenceBetweenServices('international', 'data', 'list')}}</div></td>
                              </tr>
                              <tr>
                                <td>International</td>
                                <td>Messages</td>
                                <td>{{getTheRowOfServiceItems('international', 'messaging', 'list')}}</td>
                                <td v-show="packages.serviceSelectedInformationBool"><div :class="{ 'colorgreen': getTheDifferenceBetweenServices('international', 'messaging', 'list') > 0 , 'colorred': getTheDifferenceBetweenServices('international', 'messaging', 'list') < 0 }">{{getTheDifferenceBetweenServices('international', 'messaging', 'list')}}</div></td>
                              </tr>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- //SERVICES -->
                    <!-- SERVICES SELECTED -->
                    <div v-show="packages.carrierSelected.name != '' || packages.services.length > 0">
                      <hr size="10">
                      <div class="titlesZones">{{packages.names.services.servicesSelected}}</div>
                      <div class="large-10 colunns" v-show="packages.serviceSelectedInformationBool">
                        <div class="large-12 columns">
                          <table>
                            <tr>
                              <td colspan="2">
                                <div class="textbold">{{packages.serviceSelectedInformation.title}}</div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div class="textbold">{{packages.serviceSelectedInformation.cost}} {{packages.serviceSelectedInformation.currency}}</div>
                              </td>
                              <td>
                                <div class="textbold large-10 columns" v-show="packages.serviceInformationBool" :class="{ 'colorgreen': getTheDifferenceBetweenServices(null, null, 'selected') > 0 , 'colorred': getTheDifferenceBetweenServices(null, null, 'selected') < 0 }">
                                    {{getTheDifferenceBetweenServices(null, null, 'selected')}} {{packages.serviceSelectedInformation.currency}}
                                </div>
                              </td>
                            </tr>
                          </table>
                        </div>
                        <div class="large-12 columns">
                          <div class="large-8 columns">
                            <div>{{packages.serviceSelectedInformation.description}}</div>
                          </div>
                          <div class="large-4 columns">
                            <a class="button large" @click="deleteServiceSelected()" id="button">DELETE</a>
                          </div>
                        </div>
                        <div class="large-12 columns">
                          <div class="large-12 columns" v-show="packages.serviceSelectedInformation.serviceitems.length > 0">
                            <table>
                              <tr>
                                <th>Domain</th>
                                <th>Category</th>
                                <th>Value</th>
                                <th v-show="packages.serviceInformationBool">Difference</th>
                              </tr>
                              <tr>
                                <td>Domestic</td>
                                <td>Voice</td>
                                <td>{{getTheRowOfServiceItems('domestic', 'voice', 'selected')}}</td>
                                <td v-show="packages.serviceInformationBool"><div :class="{ 'colorgreen': getTheDifferenceBetweenServices('domestic', 'voice', 'selected') > 0 , 'colorred': getTheDifferenceBetweenServices('domestic', 'voice', 'selected') < 0 }">{{getTheDifferenceBetweenServices('domestic', 'voice', 'selected')}}</div></td>
                              </tr>
                              <tr>
                                <td>Domestic</td>
                                <td>Data</td>
                                <td>{{getTheRowOfServiceItems('domestic', 'data', 'selected')}}</td>
                                <td v-show="packages.serviceInformationBool"><div :class="{ 'colorgreen': getTheDifferenceBetweenServices('domestic', 'data', 'selected') > 0 , 'colorred': getTheDifferenceBetweenServices('domestic', 'data', 'selected') < 0 }">{{getTheDifferenceBetweenServices('domestic', 'data', 'selected')}}</div></td>
                              </tr>
                              <tr>
                                <td>Domestic</td>
                                <td>Messages</td>
                                <td>{{getTheRowOfServiceItems('domestic', 'messaging', 'selected')}}</td>
                                <td v-show="packages.serviceInformationBool"><div :class="{ 'colorgreen': getTheDifferenceBetweenServices('domestic', 'messaging', 'selected') > 0 , 'colorred': getTheDifferenceBetweenServices('domestic', 'messaging', 'selected') < 0 }">{{getTheDifferenceBetweenServices('domestic', 'messaging', 'selected')}}</div></td>
                              </tr>
                              <tr>
                                <td>International</td>
                                <td>Voice</td>
                                <td>{{getTheRowOfServiceItems('international', 'voice', 'selected')}}</td>
                                <td v-show="packages.serviceInformationBool"><div :class="{ 'colorgreen': getTheDifferenceBetweenServices('international', 'voice', 'selected') > 0 , 'colorred': getTheDifferenceBetweenServices('international', 'voice', 'selected') < 0 }">{{getTheDifferenceBetweenServices('international', 'voice', 'selected')}}</div></td>
                              </tr>
                              <tr>
                                <td>International</td>
                                <td>Data</td>
                                <td>{{getTheRowOfServiceItems('international', 'data', 'selected')}}</td>
                                <td v-show="packages.serviceInformationBool"><div :class="{ 'colorgreen': getTheDifferenceBetweenServices('international', 'data', 'selected') > 0 , 'colorred': getTheDifferenceBetweenServices('international', 'data', 'selected') < 0 }">{{getTheDifferenceBetweenServices('international', 'data', 'selected')}}</div></td>
                              </tr>
                              <tr>
                                <td>International</td>
                                <td>Messages</td>
                                <td>{{getTheRowOfServiceItems('international', 'messaging', 'selected')}}</td>
                                <td v-show="packages.serviceInformationBool"><div :class="{ 'colorgreen': getTheDifferenceBetweenServices('international', 'messaging', 'selected') > 0 , 'colorred': getTheDifferenceBetweenServices('international', 'messaging', 'selected') < 0 }">{{getTheDifferenceBetweenServices('international', 'messaging', 'selected')}}</div></td>
                              </tr>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div class="noinformation large-12 columns" v-show="packages.services.length == 0">
                        <swiper :options="swiperOption">
                          <swiper-slide v-for="no in packages.noinformation">
                            <img :src="no.url" alt="Image" />
                          </swiper-slide>
                        </swiper>
                      </div>
                      <div class="large-12 columns">
                        <swiper v-show="packages.services.length > 0" :options="swiperOptionServiceSel" ref="swServicesSel">
                          <swiper-slide v-for="(service, index) in packages.services">
                            <transition name="list">
                              <div class="presetimage list-item" :key="service" @click="serviceSelectedInformation(service)">
                                <div class="servicetext">
                                  {{service.title}} <br> {{service.cost}} {{service.currency}}
                                </div>
                                <img :src="getUrlOfImageSelected(service)" alt="" />
                              </div>
                            </transition>
                          </swiper-slide>
                          <div class="swiper-button-prev" slot="button-prev"></div>
                          <div class="swiper-button-next" slot="button-next"></div>
                        </swiper>
                      </div>
                    </div>
                    <!-- //SERVICES SELECTED -->
                  </div>
                </li>
                <!-- //SERVICES -->
              </ul>
              <a class="button large" @click="submit()" id="button">{{packages.names.saveButton}}</a>
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
