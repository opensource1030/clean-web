<template>
<div>
  <div class="page.service-page.service-index-page" >

    <div class="small-12 columns">
      <a class="button large add-button" href="/service">{{names.addPlan}}</a>
    </div>
  <searchCost :callback="onSelectColumn" :show="search.searchShow" v-model="search" :search="search"></searchCost>
      <div class="columns small-12">
        <div class="grid-box">
          <div class="box-heading">
            <h2>{{names.servicePlans}}</h2>
              </div>
        <div class="box-content">
        <table>
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
                  :options="carriers"
                  :multiple="true"
                  :searchable="false"
                  :show-labels="false"
                  :select-label="''"
                  @input="onSelectColumn"
                  :value = "values.carrier"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :hide-selected="false"
                  placeholder="Carriers"
                  label="presentation"
                  track-by="presentation">
                </multiselect>

              </th>
              <th width="8%">
                <div class="columnnamecost" name="names.cost" @click="setActiveCostOptions()">{{names.cost}}</div>
              </th>
            </tr>

          </thead>
          <tbody>
            <tr class="filter">
              <td>
                <div>{{values.status}}</div>
              </td>
              <td>
                <div>{{values.plans}}</div>
              </td>
              <td>
                <div>{{values.details}}</div>
              </td>
              <td>
                <div>{{values.codePlan}}</div>
              </td>
              <td>
                <div v-for="c in values.carrier">{{c.presentation}}</div>
              </td>
              <td>
                <div>{{search.costFilterMessage}}</div>
              </td>
            </tr>
          </tbody>
          <tbody >
            <tr v-for="(service, index) in Service.servicesList" @click="setActive(service)" id="open" >
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
              <td  valign="bottom">
            <div v-show="activeService && (activeService.id == service.id)" @click="setActive(service)">
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
                    <td>
                      <h6><a  id="updateService"    v-bind="{ href: '/service/'+service.id}">{{names.managePlanButton}}</a></h6></td>
                    <td></td>
                  </tr>
                </table>
                <td colspan="3" valign="top">

                </td>
            </div>
          </td>
              </tr>
                    </tbody>
        </table>
      </div>
    </div>
  </div>
        <div v-show="Service.errorNotFound" class="error-message">{{names.noServiceFound}}</div>
        <div class="load">
          <i v-show="Service.loading" class="fa fa-spinner fa-spin fa-5x"></i>
        </div>


    <paginate :pagination="pagination" :prev="prevPage" :next="nextPage" v-show="Service.servicesList.length>0">
    </paginate>
  </div>
</div>
</template>


<script  src="./services.crtl.js" lang="babel"></script>
