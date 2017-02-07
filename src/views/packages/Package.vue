<template>
  <div class="content-right">
    <div class="full-height row">
      <div id="package">
        <div class="header"></div>
        <div class="expanded row">
          <div class="large-12 columns titles">
            <h4>{{package.names.managePackage}}<h4>
          </div>
          <table class="padding" cellspacing=0 cellpadding=0>
            <tr>
              <td rowspan="2">
                <label>{{package.names.title}}
                  <input :class="{ 'error-input': package.nameError }" type="text" placeholder="" :value="package.name" v-model="package.name">
                </label>
              </td>
              <td class="textbold" align="right">{{package.names.packagePrices.minimum}}</td>
            </tr>
            <tr>
              <td class="textbold" align="right">{{package.names.packagePrices.maximum}}</td>
            </tr>
          </table>
          <div class="small-12 columns" >
            <ul class="acordeon">
              <li class="acordeon-item">
                <a @click="showAndTell('condition')" class="accordion-title">
                  <table class="textbold">
                    <tr>
                      <td>{{package.names.conditions.title}}</td>
                      <td align="right">{{package.values.usersConditions}} {{package.names.employees}}</td>
                    </tr>
                  </table>
                </a>
                <div v-if="showZones.showConditions" class="accordion-content overview">
                  <div class="row" v-for="(condition,index) in package.conditions">
                    <div class="large-3 columns">
                      <label>{{package.names.conditions.name}}
                        <select :class="{ 'error-input': condition.nameError }" v-model="condition.name" @click="updatePackageCondition(index, condition.name, 'name')">
                          <option value="" manufactured>{{package.names.conditions.selectName}}</option>
                          <option v-for="item in conditionsFieldsOptions" :value="item" >{{item}}</option>
                        </select>
                      </label>
                    </div>
                    <div v-if="condition.name != ''" class="large-2 columns">
                      <label>{{package.names.conditions.condition}}
                        <select :class="{ 'error-input': condition.conditionError }" v-model="condition.condition" @click="updatePackageCondition(index, condition.condition, 'condition')">
                          <option value="" manufactured>{{package.names.conditions.selectCondition}}</option>
                          <option v-for="item in condition.conditionsConditionsOptions" :value="item" >{{item}}</option>
                        </select>
                      </label>
                    </div>
                    <div v-if="condition.name != ''" class="large-5 columns">
                      <label>{{package.names.conditions.value}}
                        <select v-if="condition.conditionsValuesOptions.length > 0" :class="{ 'error-input': condition.valueError }" v-model="condition.value" @click="updatePackageCondition(index, condition.value, 'value')">
                          <option value="" manufactured>{{package.names.conditions.selectValue}}</option>
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
            <div v-if="errors.generalError">
              <div class="is-error callout" data-closable>
                <div class="container">
                  <h5>{{package.names.errors.textError}}</h5>
                </div>
              </div>
            </div>
            <a class="button large" @click="submit()" id="button">{{package.names.saveButton}}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./package.crtl.js" lang="babel" ></script>
