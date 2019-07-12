<template>
  <div class="page service-page service-index-page">
    <div>
      <router-link to="/services/new" class="btn btn-lg add-button">New Service</router-link>
    </div>

    <div class="tag-header bg-info">
      <h2 class="box-heading">Service plans</h2>
    </div>
    <b-card no-body>
      <b-card-body class="p-0">
        <spinner v-if="isLoading" />

        <div v-else>
          <b-table
            responsive
            fixed
            :fields="fields"
            :items="$store.state.services.Services.servicesList"
            @row-clicked="showDetails">

            <!-- Header Configuration -->
            <template slot="HEAD_status" slot-scope="data">
              <multiselect
                placeholder="Status"
                :value="$store.state.services.filter.status"
                :options="select.status"
                :multiple="true"
                @search-change="asyncFindStatus"
                @input="$store.dispatch('services/addFilter',{type:'status',records:$event})"
                :select-label="''"
                :hide-selected="false"
                :close-on-select="false"
                :options-limit="10" />
            </template>

            <template slot="HEAD_plans" slot-scope="data">
              <multiselect
                placeholder="Plans"
                :value="$store.state.services.filter.plans"
                :options="select.plans"
                :options-limit="10"
                :multiple="true"
                :searchable="true"
                :internal-search="false"
                :show-labels="false"
                :select-label="''"
                :close-on-select="false"
                :clear-on-select="false"
                :hide-selected="false"
                @search-change="asyncFindPlans"
                @input="$store.dispatch('services/addFilter',{type:'plans',records:$event})" />
            </template>

            <template slot="HEAD_details" slot-scope="data">
              <multiselect
                placeholder="Details"
                :value="$store.state.services.filter.details"
                :options="select.details"
                :multiple="true"
                :internal-search="false"
                @search-change="asyncFindDetails"
                @input="$store.dispatch('services/addFilter',{type:'details',records:$event})"
                :show-labels="false"
                :select-label="''"
                :close-on-select="false"
                :clear-on-select="false"
                :hide-selected="false"
                :options-limit="10" />
            </template>

            <template slot="HEAD_plan_code" slot-scope="data">
              <multiselect
                placeholder="Plan Code"
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
                @input="$store.dispatch('services/addFilter',{type:'codePlan',records:$event})" />
            </template>

            <template slot="HEAD_carrier" slot-scope="data">
              <multiselect
                placeholder="Carrier"
                label="presentation"
                track-by="presentation"
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
                @input="$store.dispatch('services/addFilter',{type:'carriers',records:$event})" />
            </template>

            <!-- Columns Fields Configuration -->
            <template slot="expand" slot-scope="data">
              <b-badge variant="primary">
                <i :class="activeService && (activeService.id == data.item.id) ? 'fa fa-minus' : 'fa fa-plus'"></i>
              </b-badge>
            </template>
            <template slot="status" slot-scope="data">
              <div class="switch tiny">
                <c-switch color="primary" :checked="data.item.status"
                          @change="onServiceActiveChange($event, data.item)" />
              </div>
            </template>
            <template slot="plans" slot-scope="data">
              {{ data.item.title }}
            </template>
            <template slot="details" slot-scope="data">
              {{ data.item.description }}
            </template>
            <template slot="plan_code" slot-scope="data">
              {{ data.item.planCode }}
            </template>
            <template slot="carrier" slot-scope="data">
              {{ data.item.carriers[0].presentation }}
            </template>
            <template slot="cost" slot-scope="data">
              {{ data.item.cost }} {{ data.item.currency }}
            </template>
            <template slot="actions" slot-scope="data">
              <div class="action-buttons">
                <b-button variant="danger" @click="removeService(data.item.id)"><i class="fa fa-trash"></i></b-button>
                <b-button :href="'/services/' + data.item.id" variant="warning"><i class="fa fa-edit"></i></b-button>
              </div>
            </template>

            <template slot="row-details" slot-scope="row">
              <div class="row">
                <div class="col-sm-6">
                  <div title="Domestic Minutes" class="ds-flex details-container">
                    <span class="col-5">Minutes</span>
                    <div v-show="findServiceItem(row.item,'voice','domestic').value > 0">
                      {{findServiceItem(row.item,"voice","domestic").value}}
                      {{findServiceItem(row.item,'voice','domestic').unit}}
                    </div>
                    <div v-show="findServiceItem(row.item,'voice','domestic').value == 0"></div>
                  </div>
                  <div title="Domestic Data" class="ds-flex details-container">
                    <span class="col-5">Data</span>
                    <div v-show="findServiceItem(row.item,'data','domestic').value > 0">
                      {{findServiceItem(row.item,"data","domestic").value}}
                      {{findServiceItem(row.item,'data','domestic').unit}}
                    </div>
                    <div v-show="findServiceItem(row.item,'data','domestic').value == 0"></div>
                  </div>
                  <div title="Domestic SMS" class="ds-flex details-container">
                    <span class="col-5">SMS</span>
                    <div v-show="findServiceItem(row.item,'messaging','domestic').value > 0">
                      {{findServiceItem(row.item,"messaging","domestic").value}}
                      {{findServiceItem(row.item,'messaging','domestic').unit}}
                    </div>
                    <div v-show="findServiceItem(row.item,'messaging','domestic').value == 0"></div>
                  </div>
                  <div title="International Minutes" class="ds-flex details-container">
                    <span class="col-5">International Minutes</span>
                    <div v-show="findServiceItem(row.item,'voice','international').value > 0">
                      {{findServiceItem(row.item,"voice","international").value}}
                      {{findServiceItem(row.item,'voice','international').unit}}
                    </div>
                    <div v-show="findServiceItem(row.item,'voice','international').value == 0"></div>
                  </div>
                  <div title="International Data" class="ds-flex details-container">
                    <span class="col-5">International Data</span>
                    <div v-show="findServiceItem(row.item,'data','international').value > 0">
                      {{findServiceItem(row.item,"data","international").value}}
                      {{findServiceItem(row.item,'data','international').unit}}
                    </div>
                    <div v-show="findServiceItem(row.item,'data','international').value == 0"></div>
                  </div>
                  <div title="International SMS" class="ds-flex details-container">
                    <span class="col-5">International SMS</span>
                    <div v-show="findServiceItem(row.item,'messaging','international').value > 0">
                      {{findServiceItem(row.item,"messaging","international").value}}
                      {{findServiceItem(row.item,'messaging','international').unit}}
                    </div>
                    <div v-show="findServiceItem(row.item,'messaging','international').value == 0"></div>
                  </div>
                </div>

                <div class="col-sm-6">
                  <div v-for="addon in findByAddons(row.item.serviceitems, 'addon', '')">
                    <span class="col-5"> {{ addon.description }}</span>
                    <span>{{ addon.cost }} {{ addon.unit }}</span>
                  </div>
                </div>
              </div>
            </template>
          </b-table>
        </div>
      </b-card-body>
    </b-card>
  </div>
</template>

<script src="./service_index.ctrl.js" lang="babel"></script>
