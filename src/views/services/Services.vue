<template>
<div class="page service-page service-index-page" >
  <div class="small-12 columns">
    <router-link to="/services/new" class="button large btn-orange">{{ names.addPlan }}</router-link>
  </div>

  <div class="columns small-12">
    <header class="tag-header"><h1>{{ names.servicePlans }}</h1></header>
    <div class="grid-box">
      <div class="box-content">
        <div class="table-holder">
          <table>
            <thead>
              <tr>
                <th colspan="2" width="10%">
                  <multiselect
                          :value="$store.state.services.filter.status"
                          :options="select.status"
                          :multiple="true"
                          :searchable="true"
                          :internal-search="false"
                          @search-change="asyncFindStatus"
                          @input="$store.dispatch('service/addFilter',{type:'status',records:$event})"
                          :show-labels="false"
                          :select-label="''"
                          :close-on-select="false"
                          :clear-on-select="false"
                          :hide-selected="false"
                          :options-limit="10"
                          :placeholder="names.status">
                  </multiselect>
                </th>
                <th width="22%">
                  <multiselect
                          :value="$store.state.services.filter.plans"
                          :options="select.plans"
                          :multiple="true"
                          :searchable="true"
                          :internal-search="false"
                          @search-change="asyncFindPlans"
                          @input="$store.dispatch('service/addFilter',{type:'plans',records:$event})"
                          :show-labels="false"
                          :select-label="''"
                          :close-on-select="false"
                          :clear-on-select="false"
                          :hide-selected="false"
                          :options-limit="10"
                          :placeholder="names.plans">
                  </multiselect>
                </th>
                <th width="30%">
                  <multiselect
                          :value="$store.state.services.filter.details"
                          :options="select.details"
                          :multiple="true"
                          :searchable="true"
                          :internal-search="false"
                          @search-change="asyncFindDetails"
                          @input="$store.dispatch('service/addFilter',{type:'details',records:$event})"
                          :show-labels="false"
                          :select-label="''"
                          :close-on-select="false"
                          :clear-on-select="false"
                          :hide-selected="false"
                          :options-limit="10"
                          :placeholder="names.details">
                  </multiselect>
                </th>
                <th width="12%">
                  <multiselect
                          :value="$store.state.services.filter.codePlan"
                          :options="select.codePlan"
                          :options-limit="10"
                          :multiple="true"
                          :searchable="true"
                          :internal-search="false"
                          @search-change="asyncFindCodePlan"
                          :show-labels="false"
                          :select-label="''"
                          :close-on-select="false"
                          :clear-on-select="false"
                          :hide-selected="false"
                          @input="$store.dispatch('service/addFilter',{type:'carriers',records:$event})"
                          :placeholder="names.planCode">
                  </multiselect>
                </th>
                <th width="10%">
                  <multiselect
                          :value="$store.state.services.filter.carriers"
                          :options="carriers"
                          :options-limit="10"
                          :multiple="true"
                          :searchable="true"
                          :internal-search="false"
                          @search-change="asyncFindCarriers"
                          :show-labels="false"
                          :select-label="''"
                          :close-on-select="false"
                          :clear-on-select="false"
                          :hide-selected="false"
                          @input="$store.dispatch('service/addFilter',{type:'carrier',records:$event})"
                          :placeholder="names.carrier"
                          label="presentation"
                          track-by="presentation">
                  </multiselect>
                </th>
                <th width="8%">
                  <div class="columnnamecost" name="names.cost" @click="setActiveCostOptions()">{{names.cost}}</div>
                </th>
                <th width="8%">
                  {{names.actions}}
                </th>
              </tr>
            </thead>
            <template v-for="(service, index) in Service.servicesList">
              <tr @click="setActive(service)" id="open" :class="activeService && (activeService.id == service.id) ? 'row-active' : ''">
                <td valign="top" width="30px" class="icon-toggle">
                  <i :class="activeService && (activeService.id == service.id) ? 'fa fa-minus' : 'fa fa-plus'"></i>
                </td>
                <td valign="top">
                  <div class="switch tiny">
                    <input class="switch-input" :id="'status-' + service.id" type="checkbox"
                           :name="'status-' + service.id" :value="service.id" 
                           @change="onServiceActiveChange($event, service)" checked v-if="service.status">
                    <input class="switch-input" :id="'status-' + service.id" type="checkbox"
                           :name="'status-' + service.id" :value="service.id" 
                           @change="onServiceActiveChange($event, service)" v-else>
                    <label class="switch-paddle" :for="'status-' + service.id">
                      <span class="show-for-sr"></span>
                    </label>
                  </div>
                </td>
                <td valign="top">
                  <div class="textbold">{{service.title}}</div>
                </td>
                <td valign="top">
                  <div class="longtext">{{service.description}}</div>
                </td>
                <td valign="top">{{service.planCode}}</td>
                <td valign="top">{{service.carriers[0].presentation}}</td>
                <td valign="top" class="textbold">{{service.cost}} {{service.currency}}</td>
                <td valign="top">
                  <div class="action-buttons">
                    <a class="button alert" @click="removeService(service.id)"><i class="fa fa-trash"></i></a>
                    <router-link :to="'/services/' + service.id" class="button warning" :name="'edit-' + service.id">
                      <i class="fa fa-edit"></i>
                    </router-link>
                  </div>
                </td>
              </tr>

              <tr v-if="activeService && (activeService.id == service.id)" @click="setActive(service)">
                <td></td>
                <td colspan="3" valign="top">
                  <table class="inner-table">
                    <tr :title="names.domMinutesMessage">
                      <td>{{names.domMinutes}}</td>
                      <td>
                        <div v-show="findServiceItem(service,'voice','domestic').value > 0">
                          {{findServiceItem(service,"voice","domestic").value}}
                          {{findServiceItem(service,'voice','domestic').unit}}
                        </div>
                        <div v-show="findServiceItem(service,'voice','domestic').value == 0"></div>
                      </td>
                    </tr>
                    <tr :title="names.domDataMessage">
                      <td>{{names.domData}}</td>
                      <td>
                        <div v-show="findServiceItem(service,'data','domestic').value > 0">
                          {{findServiceItem(service,"data","domestic").value}}
                          {{findServiceItem(service,'data','domestic').unit}}
                        </div>
                        <div v-show="findServiceItem(service,'data','domestic').value == 0"></div>
                      </td>
                    </tr>
                    <tr :title="names.domSmsMessage">
                      <td>{{names.domSms}}</td>
                      <td>
                        <div v-show="findServiceItem(service,'messaging','domestic').value > 0">
                          {{findServiceItem(service,"messaging","domestic").value}}
                          {{findServiceItem(service,'messaging','domestic').unit}}
                        </div>
                        <div v-show="findServiceItem(service,'messaging','domestic').value == 0"></div>
                      </td>
                    </tr>
                    <tr :title="names.intMinutesMessage">
                      <td>{{names.intMinutes}}</td>
                      <td>
                        <div v-show="findServiceItem(service,'voice','international').value > 0">
                          {{findServiceItem(service,"voice","international").value}}
                          {{findServiceItem(service,'voice','international').unit}}
                        </div>
                        <div v-show="findServiceItem(service,'voice','international').value == 0"></div>
                      </td>
                    </tr>
                    <tr :title="names.intDataMessage">
                      <td>{{names.intData}}</td>
                      <td>
                        <div v-show="findServiceItem(service,'data','international').value > 0">
                          {{findServiceItem(service,"data","international").value}}
                          {{findServiceItem(service,'data','international').unit}}
                        </div>
                        <div v-show="findServiceItem(service,'data','international').value == 0"></div>
                      </td>
                    </tr>
                    <tr :title="names.intSmsMessage">
                      <td>{{names.intSms}}</td>
                      <td>
                        <div v-show="findServiceItem(service,'messaging','international').value > 0">
                          {{findServiceItem(service,"messaging","international").value}}
                          {{findServiceItem(service,'messaging','international').unit}}
                        </div>
                        <div v-show="findServiceItem(service,'messaging','international').value == 0"></div>
                      </td>
                    </tr>
                    <tr>
                      <td><h6></h6></td>
                      <td></td>
                    </tr>
                  </table>
                </td>
                <td colspan="4" valign="top">
                  <table class="inner-table">
                    <tr v-for="addon in findByAddons(service.serviceitems, 'addon', '')">
                      <td>{{ addon.description }}</td>
                      <td>{{ addon.cost }} {{ addon.unit }}</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </template>
          </table>

          <div v-show="Service.loading" class="is-loading">
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-show="Service.errorNotFound" class="error-message">{{names.noServiceFound}}</div>

  <paginate :pagination="pagination" :prev="prevPage" :next="nextPage" v-show="Service.servicesList.length>0">
  </paginate>
</div>
</template>

<script  src="./services.crtl.js" lang="babel"></script>