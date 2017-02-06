<template>
  <div class="content-right">
    <div class="full-height row">
      <div id="package">
        <div class="header"></div>
        <div class="expanded row">
          <div class="small-12 columns titles">
            <h4>Manage Package<h4>
          </div>
          <div class="small-6 columns titles">
            <label>Title
              <input :class="{ 'error-input': package.nameError }" type="text" placeholder="" :value="package.name" v-model="package.name">
            </label>
          </div>
          <div class="small-4 small-offset-2 columns">
            <table class="textbold" cellspacing=0 cellpadding=0>
              <tr>
                <td>Min:</td>
                <td>449.00 USD once</td>
                <td>28.10 USD monthly</td>
              </tr>
              <tr>
                <td>Max:</td>
                <td>649.00 USD once</td>
                <td>35.10 USD monthly</td>
              </tr>
            </table>
          </div>
          <div class="small-12 columns" >
            <ul class="acordeon">
              <li class="acordeon-item">
                <a @click="showAndTell('condition')" class="accordion-title">CONDITIONS</a>
                <div v-if="showZones.showConditions" class="accordion-content overview">
                  <div class="row" v-for="(condition,index) in package.conditions">
                    <div class="large-3 columns">
                      <label>Label (select a Label first)
                        <select :class="{ 'error-input': condition.labelError }" v-model="condition.label" @click="updatePackageCondition(index, condition.label, 'label')">
                          <option value="" manufactured>Select a Label</option>
                          <option v-for="item in conditionsFieldsOptions" :value="item" >{{item}}</option>
                        </select>
                      </label>
                    </div>
                    <div v-if="condition.label != ''" class="large-2 columns">
                      <label>Condition
                        <select :class="{ 'error-input': condition.conditionError }" v-model="condition.condition" @click="updatePackageCondition(index, condition.condition, 'condition')">
                          <option value="" manufactured>Select a Condition</option>
                          <option v-for="item in condition.conditionsConditionsOptions" :value="item" >{{item}}</option>
                        </select>
                      </label>
                    </div>
                    <div v-if="condition.label != ''" class="large-5 columns">
                      <label>Value
                        <select v-if="condition.conditionsValuesOptions.length > 0" :class="{ 'error-input': condition.valueError }" v-model="condition.value" @click="updatePackageCondition(index, condition.value, 'value')">
                          <option value="" manufactured>Select a Value</option>
                          <option v-for="item in condition.conditionsValuesOptions" :value="item" >{{item}}</option>
                        </select>
                        <input v-if="condition.conditionsValuesOptions.length == 0" :class="{ 'error-input': condition.valueError }" type="text" placeholder="" :value="condition.value" v-model="condition.value" @keyup="updatePackageCondition(index, condition.value, 'value')">                      
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
                  <h5>Some Fields need to be filled! Please, check the conditions!</h5>
                </div>
              </div>
            </div>
            <a class="button large" @click="submit()" id="button">Save Changes</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./package.crtl.js" lang="babel" ></script>
