<template>
  <div class="content-right">
    <div id="tables">
      <div class="header"></div>
      <div class="expanded row">
        <div class="large-12 columns titles">
          <h4>{{names.servicePlans}}<h4>
        </div>
        <div class="large-4 columns">
          <a class="button" href="/service">{{names.addPlan}}</a>
        </div>
        <div class="large-4 large-offset-4 columns end search-cost" v-show="search.searchShow">
          <div class="large-4 columns" >
            <label>{{search.costMinName}}
              <input v-bind:class="{ 'search-input' : true, 'error-input': search.errorCost }" :value="search.costMin" v-model="search.costMin" title="The minimum cost of the Services listed below." type="number" min="0" placeholder="">
            </label>
          </div>
          <div class="large-4 columns">
            <label>{{search.costMaxName}}
              <input v-bind:class="{ 'search-input' : true, 'error-input': search.errorCost }"  :value="search.costMax" v-model="search.costMax" title="The maximum cost of the Services listed below." type="number" min="0" placeholder="">
            </label>
          </div>
          <div class="large-3 columns">
            <a class="special-button" @change="searchCost()">{{search.searchName}}</a>
          </div>
          <div class="large-1 end columns">
            <a class="special-button" @change="resetValuesCost()">{{search.resetName}}</a>
          </div>
        </div>
        <div v-show="!loading" class="small-12 columns">
          <table cellspacing=0 cellpadding=0>
            <thead>
              <tr>
                <th>
                  <select @change="onSelectColumn()" v-model="values.status">
                    <option value="" values.status>{{names.status}}</option>
                    <option v-for="item in filter.status" :value="item">{{item}}</option>
                  </select>
                </th>
                <th>
                  <select @change="onSelectColumn()" v-model="values.plans">
                    <option value="" values.plans>{{names.plans}}</option>
                    <option v-for="item in filter.plans" :value="item">{{item}}</option>
                  </select>
                </th>
                <th>
                  <select @change="onSelectColumn()" v-model="values.details">
                    <option value="" values.details>{{names.details}}</option>
                    <option v-for="item in filter.details" :value="item">{{item}}</option>
                  </select>
                </th>
                <th>
                  <select @change="onSelectColumn()" v-model="values.codePlan">
                    <option value="" values.codePlan>{{names.planCode}}</option>
                    <option v-for="item in filter.codePlan" :value="item">{{item}}</option>
                  </select>
                </th>
                <th>
                  <select @change="onSelectColumn()" v-model="values.carrier">
                    <option value="" values.carrier>{{names.carrier}}</option>
                    <option v-for="item in filter.carriers" :value="item">{{item.presentation}}</option>
                  </select>
                </th>
                <th>
                  <div position:relative class="especial" name="names.cost" @click="setActiveCostOptions()">{{names.cost}}</div>
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
            <div v-show="errorNotFound" class="error-message">{{names.noServiceFound}}</div>
            <tbody v-for="(service, index) in services">
              <tr :class="{'active': service.show,'desactive': !service.show}" @click="setActive(index)">
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
              <tr v-show="service.show" :class="{'active': service.show,'desactive': !service.show}">
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
          <div class="load">
            <i v-show="loading" class="fa fa-spinner fa-spin fa-5x"></i>
          </div>
        </div>        
      </div>
      <pagination :pagination="pagination" :callback="loadData" v-show="pagination.total_pages > 1"></pagination>
    </div>
  </div>
</template>
<script  src="./services.crtl.js" lang="babel"></script>
