<template>
  <div>
    <div id="tables"  >
      <div class="header"></div>
      <div class="expanded row">
        <div class="large-12 columns titles">
          <h4>{{names.servicePlans}}</h4>
        </div>
        <div class="large-4 columns">
          <a class="button buttonTable" href="/service">{{names.addPlan}}</a>
        </div>
            <searchCost :callback="onSelectColumn" :show="search.searchShow" v-model="search" :search="search" ></searchCost>
        <div v-show="!Service.loading" class="small-12 columns">
          <table cellspacing=0 cellpadding=0>
            <thead>
              <tr>
                <th width="8%">
                  <select class="columnname" @change="onSelectColumn()" v-model="values.status">
                    <option value="" values.status>{{names.status}}</option>
                    <option class="optioninblack" v-for="item in select.status" :value="item">{{item}}</option>
                  </select>
                </th>
                <th width="22%">
                  <select class="columnname" @change="onSelectColumn()" v-model="values.plans">
                    <option value="" values.plans>{{names.plans}}</option>
                    <option class="optioninblack" v-for="item in select.plans" :value="item">{{item}}</option>
                  </select>
                </th>
                <th width="35%">
                  <select class="columnname" @change="onSelectColumn()" v-model="values.details">
                    <option value="" values.details>{{names.details}}</option>
                    <option class="optioninblack" v-for="item in select.details" :value="item">{{item}}</option>
                  </select>
                </th>
                <th width="12%">
                  <select class="columnname" @change="onSelectColumn()" v-model="values.codePlan">
                    <option value="" values.codePlan>{{names.planCode}}</option>
                    <option class="optioninblack" v-for="item in select.codePlan" :value="item">{{item}}</option>
                  </select>
                </th>
                <th width="15%">
                  <multiselect
                    :field="'Carrier'"
                    :options="carriers"
                    :value.sync="values.carrier"
                    :fieldSearch="'presentation'"
                    :api="'/carriers'"
                    :labelAttr="'presentation'"
                    :callback="onSelectColumn">
                  </multiselect>
                </th>
                <th width="8%">
                  <div class="columnnamecost" name="names.cost" @click="setActiveCostOptions()">{{names.cost}}</div>
                </th>
              </tr>

            </thead>
            <tbody>
              <tr class="filter">
                <td><div>{{values.status}}</div></td>
                <td><div>{{values.plans}}</div></td>
                <td><div>{{values.details}}</div></td>
                <td><div>{{values.codePlan}}</div></td>
                <td><div>{{values.carrier.presentation}}</div></td>
                <td><div>{{search.costFilterMessage}}</div></td>
              </tr>
            </tbody>
            <tbody v-for="(service, index) in Service.servicesList">
              <tr @click="setActive(service)">
                <td valign="top" :class="{'textbold': service.status == 'Enabled'}">{{service.status}}</td>
                <td valign="top">
                  <div class="textbold">{{service.title}}</div>
                </td>
                <td valign="top">
                  <div class="longtext">{{service.description}}</div>
                </td>
                <td valign="top">{{service.planCode}}</td>
                <td valign="top">{{service.carriers[0].presentation}}</td>
                <td valign="top" class="textbold">{{service.cost}} {{service.currency}}</td>
              </tr>
              <tr v-show="activeService && (activeService.id == service.id)" @click="setActive(service)" >
                <td></td>
                <td colspan="2" valign="top">
                  <table class="inner-table">
                    <tr :title="names.domMinutesMessage">
                      <td>{{names.domMinutes}}</td>
                      <td>
                        <div v-show="findServiceItem(service,'voice','domestic').value > 0">{{findServiceItem(service,"voice","domestic").value}} {{findServiceItem(service,'voice','domestic').unit}}</div>
                        <div v-show="findServiceItem(service,'voice','domestic').value == 0"></div>
                      </td>
                    </tr>
                    <tr :title="names.domDataMessage">
                      <td>{{names.domData}}</td>
                      <td>
                        <div v-show="findServiceItem(service,'data','domestic').value > 0">{{findServiceItem(service,"data","domestic").value}} {{findServiceItem(service,'data','domestic').unit}}</div>
                        <div v-show="findServiceItem(service,'data','domestic').value == 0"></div>
                      </td>
                    </tr>
                    <tr :title="names.domSmsMessage">
                      <td>{{names.domSms}}</td>
                      <td>
                        <div v-show="findServiceItem(service,'messaging','domestic').value > 0">{{findServiceItem(service,"messaging","domestic").value}} {{findServiceItem(service,'messaging','domestic').unit}}</div>
                        <div v-show="findServiceItem(service,'messaging','domestic').value == 0"></div>
                      </td>
                    </tr>
                    <tr :title="names.intMinutesMessage">
                      <td>{{names.intMinutes}}</td>
                      <td>
                        <div v-show="findServiceItem(service,'voice','international').value > 0">{{findServiceItem(service,"voice","international").value}} {{findServiceItem(service,'voice','international').unit}}</div>
                        <div v-show="findServiceItem(service,'voice','international').value == 0"></div>
                      </td>
                    </tr>
                    <tr :title="names.intDataMessage">
                      <td>{{names.intData}}</td>
                      <td>
                        <div v-show="findServiceItem(service,'data','international').value > 0">{{findServiceItem(service,"data","international").value}} {{findServiceItem(service,'data','international').unit}}</div>
                        <div v-show="findServiceItem(service,'data','international').value == 0"></div>
                      </td>
                    </tr>
                    <tr :title="names.intSmsMessage">
                      <td>{{names.intSms}}</td>
                      <td>
                        <div v-show="findServiceItem(service,'messaging','international').value > 0">{{findServiceItem(service,"messaging","international").value}} {{findServiceItem(service,'messaging','international').unit}}</div>
                        <div v-show="findServiceItem(service,'messaging','international').value == 0"></div>
                      </td>
                    </tr>
                    <tr>
                      <td><h6><a v-bind="{ href: '/service/'+service.id}">{{names.managePlanButton}}</a></h6></td>
                      <td></td>
                    </tr>
                  </table>
                <td colspan="3" valign="top">
                  <!--<table @click="showAddons()" class="inner-table">
                    <tr>
                      <td colspan="2" class="textbold">Add-ons</td>
                    </tr>
                    <tr v-show="addonsShow" v-for="item in addons">
                      <td colspan="2">
                        <div>{{item.description}} - {{item.cost}} {{item.unit}}</div>
                      </td>
                    </tr>
                  </table>-->
                </td>
              </tr>
            </tbody>
          </table>
          <div v-show="Service.errorNotFound" class="error-message">{{names.noServiceFound}}</div>
          <div class="load">
            <i v-show="Service.loading" class="fa fa-spinner fa-spin fa-5x"></i>
          </div>
        </div>
      </div>
      <paginate
  :pagination="pagination"
  :prev="() => { $store.dispatch('services/prevPage') }"
  :next="() => { $store.dispatch('services/nextPage') }"
  v-show="Service.servicesList.length>0"
  >
</paginate>
    </div>
  </div>
</template>
<script  src="./services.crtl.js" lang="babel"></script>
