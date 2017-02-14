<template>
  <div>
    <div class="row">
      <div id="package">
        <div class="header"></div>
        <div class="expanded row">
          <div class="large-12 columns titles">
            <h4>{{packages.names.managePackage}}</h4>
          </div>
          <table class="padding" cellspacing=0 cellpadding=0>
            <tr>
              <td rowspan="2">
                <label>{{packages.names.title}}
                  <input :class="{ 'error-input': packages.nameError }" type="text" placeholder="" :value="packages.name" v-model="packages.name">
                </label>
              </td>
              <td class="textbold" align="right">
                {{packages.names.prices.minimum}}
                {{packages.names.devices.minPrice}}
                {{packages.names.prices.currency}}
                {{packages.names.prices.once}} -
                {{packages.names.services.minPrice}}
                {{packages.names.prices.currency}}
                {{packages.names.prices.monthly}}
              </td>
            </tr>
            <tr>
              <td class="textbold" align="right">
                {{packages.names.prices.maximum}}
                {{packages.names.devices.maxPrice}}
                {{packages.names.prices.currency}}
                {{packages.names.prices.once}} -
                {{packages.names.services.maxPrice}}
                {{packages.names.prices.currency}}
                {{packages.names.prices.monthly}}
              </td>
            </tr>
          </table>
          <div class="small-12 columns" >
<!--CONDITIONS-->
            <ul class="acordeon">
              <li class="acordeon-item">
                <a @click="showAndTell('condition')" class="accordion-title">
                  <table class="textbold">
                    <tr>
                      <td>{{packages.names.conditions.title}}</td>
                      <td align="right">{{packages.values.usersConditions}} {{packages.names.employees}}</td>
                    </tr>
                  </table>
                </a>
                <div v-if="showZones.showConditions" class="accordion-content overview">
                  <div class="row" v-for="(condition,index) in packages.conditions">
                    <div class="large-3 columns">
                      <label>{{packages.names.conditions.name}}
                        <select :class="{ 'error-input': condition.nameError }" v-model="condition.name" @change="updatePackageCondition(index, condition.name, 'name')">
                          <option value="" manufactured>{{packages.names.conditions.selectName}}</option>
                          <option v-for="item in conditionsFieldsOptions" :value="item" >{{item}}</option>
                        </select>
                      </label>
                    </div>
                    <div v-if="condition.name != ''" class="large-2 columns">
                      <label>{{packages.names.conditions.condition}}
                        <select :class="{ 'error-input': condition.conditionError }" v-model="condition.condition" @click="updatePackageCondition(index, condition.condition, 'condition')">
                          <option value="" manufactured>{{packages.names.conditions.selectCondition}}</option>
                          <option v-for="item in condition.conditionsConditionsOptions" :value="item" >{{item}}</option>
                        </select>
                      </label>
                    </div>
                    <div v-if="condition.name != ''" class="large-5 columns">
                      <label>{{packages.names.conditions.value}}
                        <select v-if="condition.conditionsValuesOptions.length > 0" :class="{ 'error-input': condition.valueError }" v-model="condition.value" @click="updatePackageCondition(index, condition.value, 'value')">
                          <option value="" manufactured>{{packages.names.conditions.selectValue}}</option>
                          <option v-for="item in condition.conditionsValuesOptions" :value="item" >{{item}}</option>
                        </select>
                        <input v-if="condition.conditionsValuesOptions.length == 0 && condition.inputType == 'string'" :class="{ 'error-input': condition.valueError }" type="text" placeholder="" :value="condition.value" v-model="condition.value" @keyup="updatePackageCondition(index, condition.value, 'value')" />
                        <input v-if="condition.conditionsValuesOptions.length == 0 && condition.inputType == 'number'" :class="{ 'error-input': condition.valueError }" type="number" placeholder="" :value="condition.value" v-model="condition.value" @keyup="updatePackageCondition(index, condition.value, 'value')">
                      </label>
                    </div>
                    <div class="large-1 columns">
                      <a class="button" @click="deleteCondition(index)" id="button" v-show="condition.delete">
                        <i class="fa fa-times fa-2x" aria-hidden="true"></i>
                      </a>
                    </div>
                    <div class="large-1 end columns">
                      <a class="button" @click="pushCondition(index)" id="button" v-show="condition.add">
                        <i class="fa fa-plus fa-2x"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
<!--//CONDITIONS-->
<!--PRESET-->
            <ul class="acordeon">
              <li class="acordeon-item">
                <a @click="showAndTell('device')" class="accordion-title">
                  <table class="textbold">
                    <tr>
                      <td>{{packages.names.devices.title}} Presets</td>
                      <td align="right">From {{packages.names.devices.minPrice}} {{packages.names.prices.currency}} to  {{packages.names.devices.maxPrice}} {{packages.names.prices.currency}} {{packages.names.prices.once}} </td>
                    </tr>
                  </table>
                </a>
                <div v-if="showZones.showDevices" class="accordion-content overview">
                  <div>
                    <!-- PRESETS -->
                    <div>
                      <div class="presetstitles">Presets Available</div>
                      <div class="presetsnoinformation" v-show="packages.presets.length == 0">
                        <swiper :options="swiperOption">
                          <swiper-slide v-for="no in packages.presetsnoinformation">
                            <img class="phoneImg" :src="no.url" alt="Image" />
                          </swiper-slide>
                        </swiper>
                      </div>
                      <div>
                        <swiper :options="swiperOption" ref="swA">
                          <swiper-slide v-for="(preset,index) in packages.presets">
                            <div class="presetimage" @click="presetSelected(preset)">
                              <div class="absolute">{{getNameIfNoImage(0, preset.name)}}</div>
                              <img class="phoneImg" :src="getUrlOfImagePreset(preset)" alt="" />
                            </div>
                          </swiper-slide>
                          <div class="swiper-button-prev" slot="button-prev"></div>
                          <div class="swiper-button-next" slot="button-next"></div>
                        </swiper>
                      </div>
                    </div>
                    <!-- DEVICE VARIATIONS -->
                    <div v-show="packages.variablesShow.presetSelected">
                      <hr size="10">
                      <div class="presetstitles">Devices Available</div>
                      <div class="presetsnoinformation" v-show="packages.devicevariationsList.length == 0">
                        <swiper :options="swiperOption">
                          <swiper-slide v-for="no in packages.presetsnoinformation">
                            <img class="phoneImg" :src="no.url" alt="Image" />
                          </swiper-slide>
                        </swiper>
                      </div>
                      <div>
                        <swiper v-show="packages.devicevariationsList.length > 0" :options="swiperOption" ref="swB">
                          <swiper-slide v-for="devvar in packages.devicevariationsList">
                            <div class="devicevariationsinformation" @click="devicevariationSelected(devvar)">
                              <img class="phoneImg" :src="getUrlOfImage(devvar.images[0].id)" alt="Image" />
                              {{devvar.devices[0].name}} <br>
                              {{devvar.devices[0].make}} - {{devvar.devices[0].model}} <br>
                              {{devvar.price1}} {{devvar.devices[0].currency}}
                            </div>
                          </swiper-slide>
                          <div class="swiper-button-prev" slot="button-prev"></div>
                          <div class="swiper-button-next" slot="button-next"></div>
                        </swiper>
                      </div>
                    </div>
                    <!-- DEVICE VARIATIONS SELECTED -->
                    <div v-show="packages.variablesShow.presetSelected || packages.devicevariationsSelected.length > 0">
                      <hr size="10">
                      <div class="presetstitles">Devices Selected</div>
                      <div class="presetsnoinformation" v-show="packages.devicevariationsSelected.length == 0">
                        <swiper :options="swiperOption">
                          <swiper-slide v-for="no in packages.presetsnoinformation">
                            <img class="phoneImg" :src="no.url" alt="Image" />
                          </swiper-slide>
                        </swiper>
                      </div>
                      <div>
                        <swiper v-show="packages.devicevariationsSelected.length > 0" :options="swiperOption" ref="swC">
                          <swiper-slide v-for="devvarsel in packages.devicevariationsSelected">
                            <div @click="devicevariationNoSelected(devvarsel)">
                              <div class="devicevariationspreset">{{devvarsel.preset}}</div>
                              <div>
                                <img class="phoneImg" :src="getUrlOfImage(devvarsel.images[0].id)" alt="Image" />
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
                    </div>
                  </div>
                </div>
              </li>
            </ul>
<!--//PRESET-->
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
