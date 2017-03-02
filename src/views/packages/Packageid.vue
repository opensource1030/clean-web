<template>
  <div class="content-right">
    <div class="full-height row">
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
<!--SERVICE-->
            <ul class="acordeon">
              <li class="acordeon-item">
                <a @click="showAndTell('service')" class="accordion-title">
                  <table class="textbold">
                    <tr>
                      <td>{{packages.names.services.title}}</td>
                      <td align="right">From {{packages.names.services.minPrice}} {{packages.names.prices.currency}} to  {{packages.names.services.maxPrice}} {{packages.names.prices.currency}} {{packages.names.prices.monthly}} </td>
                    </tr>
                  </table>
                </a>
                <div v-if="showZones.showServices" class="accordion-content overview">
                  <div>
                      <!-- swiper -->
                      <swiper :options="swiperOption" ref="mySwiperA">
                        <swiper-slide>Slide 1</swiper-slide>
                        <swiper-slide>Slide 2</swiper-slide>
                        <swiper-slide>Slide 3</swiper-slide>
                        <swiper-slide>Slide 4</swiper-slide>
                        <swiper-slide>Slide 5</swiper-slide>
                        <swiper-slide>Slide 6</swiper-slide>
                        <swiper-slide>Slide 7</swiper-slide>
                        <swiper-slide>Slide 8</swiper-slide>
                        <swiper-slide>Slide 9</swiper-slide>
                        <swiper-slide>Slide 10</swiper-slide>
                        <div class="swiper-scrollbar" slot="scrollbar"></div>
                      </swiper>
                  </div>
                </div>
              </li>
            </ul>
<!--//SERVICE-->
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
