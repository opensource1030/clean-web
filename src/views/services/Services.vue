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
        <div class="large-4 columns end search-cost" v-show="search.searchShow">
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
            <a class="special-button" @click="searchCost()">{{search.searchName}}</a>
          </div>
          <div class="large-1 end columns">
            <a class="special-button" @click="resetValuesCost()">{{search.resetName}}</a>
          </div>
          <div v-if="search.errorCost" class="error-message">{{search.errorCostMessage}}
          </div>
        </div>
        <div v-if="showtable && !loading" class="small-12 columns">
          <table cellspacing=0 cellpadding=0>
            <thead>
              <tr>
                <th>
                  <select @click="onSelectColumn()" class="form-control" v-model="values.status">
                    <option value="" values.status>{{names.status}}</option>
                    <option v-for="item in filter.status" :value="item">{{item}}</option>
                  </select>
                </th>
                <th>
                  <select @click="onSelectColumn()" class="form-control" v-model="values.plans">
                    <option value="" values.plans>{{names.plans}}</option>
                    <option v-for="item in filter.plans" :value="item">{{item}}</option>
                  </select>
                </th>
                <th>
                  <select @click="onSelectColumn()" class="form-control" v-model="values.details">
                    <option value="" values.details>{{names.details}}</option>
                    <option v-for="item in filter.details" :value="item">{{item}}</option>
                  </select>
                </th>
                <th>
                  <select @click="onSelectColumn()" class="form-control" v-model="values.codePlan">
                    <option value="" values.codePlan>{{names.planCode}}</option>
                    <option v-for="item in filter.codePlan" :value="item">{{item}}</option>
                  </select>
                </th>
                <th>
                  <select @click="onSelectColumn()" class="form-control" v-model="values.carrier">
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
                <td><div v-if="search.searchFilter">{{search.costFilterMessage}}</div></td>
              </tr>
            </tbody>
            <div v-if="errorNotFound" class="error-message">{{names.noServiceFound}}</div>
            <tbody v-for="(service, index) in services">
              <tr :class="{'active': service.show,'desactive': service.show}" @click="setActive(index)">
                <td valign="top" v-if="service.status == 'Enabled'" class="textbold">{{service.status}}</td>
                <td valign="top" v-if="service.status == 'Disabled'" >{{service.status}}</td>
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
              <tr v-if="service.show" :class="{'active': service.show,'desactive': service.show}">
                <td></td>
                <td valign="top">
                  <div v-if="service.show">
                    {{names.domMinutes}}<br>
                    {{names.domData}}<br>
                    {{names.domSms}}<br>
                    {{names.intMinutes}}<br>
                    {{names.intData}}<br>
                    {{names.intSms}}<br>
                    <br>
                    <h6><a v-bind="{ href: '/service/'+service.id}">{{names.managePlanButton}}</a></h6>
                  </div>
                </td>
                <td valign="top">
                  <div v-if="findByService(service.serviceitems,'voice','domestic').value > 0">{{findByService(service.serviceitems,"voice","domestic").value}} {{findByService(service.serviceitems,'voice','domestic').unit}}<br></div>
                  <div v-if="findByService(service.serviceitems,'voice','domestic').value == 0"><br></div>
                  <div v-if="findByService(service.serviceitems,'data','domestic').value > 0">{{findByService(service.serviceitems,"data","domestic").value}} {{findByService(service.serviceitems,'data','domestic').unit}}<br></div>
                  <div v-if="findByService(service.serviceitems,'data','domestic').value == 0"><br></div>
                  <div v-if="findByService(service.serviceitems,'messaging','domestic').value > 0">{{findByService(service.serviceitems,"messaging","domestic").value}} {{findByService(service.serviceitems,'messaging','domestic').unit}}<br></div>
                  <div v-if="findByService(service.serviceitems,'messaging','domestic').value == 0"><br></div>
                  <div v-if="findByService(service.serviceitems,'voice','international').value > 0">{{findByService(service.serviceitems,"voice","international").value}} {{findByService(service.serviceitems,'voice','international').unit}}<br></div>
                  <div v-if="findByService(service.serviceitems,'voice','international').value == 0"></div>
                  <div v-if="findByService(service.serviceitems,'data','international').value > 0">{{findByService(service.serviceitems,"data","international").value}} {{findByService(service.serviceitems,'data','international').unit}}<br></div>
                  <div v-if="findByService(service.serviceitems,'data','international').value == 0"><br></div>
                  <div v-if="findByService(service.serviceitems,'messaging','international').value > 0">{{findByService(service.serviceitems,"messaging","international").value}} {{findByService(service.serviceitems,'messaging','international').unit}}<br></div>
                  <div v-if="findByService(service.serviceitems,'messaging','international').value == 0"><br></div>
                </td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <div class="load">
            <i v-show="loading" class="fa fa-spinner fa-spin fa-5x"></i>
          </div>
        </div>
        <pagination :pagination="pagination" :callback="loadData" v-show="showtable && loadpagination"></pagination>
      </div>
    </div>
  </div>
</template>
<script  src="./services.crtl.js" lang="babel"></script>
