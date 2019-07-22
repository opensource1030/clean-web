<template>
<div class="page order-page order-index-page">
  <b-modal :visible="$store.getters['error/hasError']" @hidden="$store.dispatch('error/clearAll')" hide-footer>
    <div class="d-block text-center is-error">
      <h3>{{ $store.getters['error/error'] }}</h3>
    </div>
  </b-modal>

  <div class="row charts">
    <div class="col-md-4 chart-column ds-flex">
      <vue-chart
        :chart-type="packageCostChart.type"
        :columns="packageCostChart.columns"
        :rows="packageCostChart.rows"
        :options="packageCostChart.options"
      />
    </div>

    <div class="col-md-4 chart-column ds-flex">
      <vue-chart
        :chart-type="monthlyCostChart.type"
        :columns="monthlyCostChart.columns"
        :rows="monthlyCostChart.rows"
        :datasets="monthlyCostChart.dataSets"
        :options="monthlyCostChart.options"
      />
    </div>

    <div class="col-md-4 chart-column ds-flex">
      <vue-chart
        :chart-type="monthlySellChart.type"
        :columns="monthlySellChart.columns"
        :rows="monthlySellChart.rows"
        :options="monthlySellChart.options"
      />
    </div>
  </div>

  <div class="tag-header bg-info">
    <h2 class="box-heading">Procurements</h2>
  </div>

  <b-card no-body>
    <b-card-body class="p-0">

      <div class="grid-box">
        <div class="box-content">
          <spinner v-if="isLoading" />

          <b-table
            v-else
            responsive
            fixed
            :fields="fields"
            :items="orders"
            @row-clicked="showDetails">

            <!-- Header Configuration -->
            <template slot="HEAD_status" slot-scope="data">
              <multiselect
                placeholder="Status"
                :value="$store.state.order.filters.orderStatuses"
                :options="filters.statuses.options"
                :multiple="true"
                @input="addFilter_OrderStatuses"
                :select-label="''"
                :hide-selected="false"
                :close-on-select="false"
                :limit="3" />
            </template>

            <template slot="HEAD_employee" slot-scope="data">
              <multiselect
                placeholder="Employee Name"
                :value="$store.state.order.filters.employeeNames"
                :options="filters.employees.options"
                :multiple="true"
                :searchable="true"
                :loading="filters.employees.isLoading"
                @search-change="asyncFind_EmployeeNames"
                @input="addFilter_EmployeeNames"
                :select-label="''"
                :hide-selected="false"
                :close-on-select="false"
                :limit="3" />
            </template>

            <template slot="HEAD_phone" slot-scope="data">
              <multiselect
                placeholder="Phone No."
                :value="$store.state.order.filters.addressPhones"
                :options="filters.addresses.options"
                :multiple="true"
                :searchable="true"
                :loading="filters.addresses.isLoading"
                @search-change="asyncFind_AddressPhones"
                @input="addFilter_AddressPhones"
                :select-label="''"
                :hide-selected="false"
                :close-on-select="false"
                :limit="3" />
            </template>

            <template slot="HEAD_package" slot-scope="data">
              <multiselect
                placeholder="Package Name"
                :options="filters.packages.options"
                :value="$store.state.order.filters.packageNames"
                :multiple="true"
                :searchable="true"
                :loading="filters.packages.isLoading"
                :show-labels="false"
                :select-label="''"
                :close-on-select="false"
                :clear-on-select="false"
                :hide-selected="false"
                :limit="3"
                @search-change="asyncFind_PackageNames"
                @input="addFilter_PackageNames" />
            </template>

            <template slot="HEAD_carrier" slot-scope="data">
              <multiselect
                id="ajax"
                placeholder="Carrier"
                :options="filters.carriers.options"
                :value="$store.state.order.filters.carrierNames"
                :multiple="true"
                :searchable="true"
                :loading="filters.carriers.isLoading"
                :show-labels="false"
                :select-label="''"
                :close-on-select="false"
                :clear-on-select="false"
                :hide-selected="false"
                :limit="3"
                @search-change="asyncFind_CarrierNames"
                @input="addFilter_CarrierNames" />
            </template>

            <template slot="HEAD_device" slot-scope="data">
              <multiselect
                id="ajax"
                placeholder="Device"
                :options="filters.devices.options"
                :value="$store.state.order.filters.deviceNames"
                :multiple="true"
                :searchable="true"
                :loading="filters.devices.isLoading"
                :show-labels="false"
                :select-label="''"
                :close-on-select="false"
                :clear-on-select="false"
                :hide-selected="false"
                :limit="3"
                @search-change="asyncFind_DeviceNames"
                @input="addFilter_DeviceNames" />
            </template>

            <!-- Columns Fields Configuration -->
            <template slot="status" slot-scope="data">
              <b-badge variant="primary">
                <i :class="activeOrder && (activeOrder.id == data.item.id) ? 'fa fa-minus' : 'fa fa-plus'"></i>
              </b-badge>
              <div class="switch tiny">
                <b-button @click="updateOrderState(data.item)" :variant="OrderHelper.getButtonClass(data.item)">{{ data.item.status }}</b-button>
              </div>
            </template>

            <template slot="employee" slot-scope="data">
              {{ data.item.users[0] ? `${data.item.users[0].firstName} ${data.item.users[0].lastName}` : '' }}
            </template>

            <template slot="phone" slot-scope="data">
              {{ data.item.addresses[0] ? $options.filters.phone(data.item.addresses[0].phone) : '' }}
            </template>

            <template slot="package" slot-scope="data">
              {{ data.item.packages[0] ? data.item.packages[0].name : '' }}
            </template>

            <template slot="carrier" slot-scope="data">
              {{ _.get(data.item, 'services[0].carriers[0].presentation', '') }}
            </template>

            <template slot="device" slot-scope="data">
              {{ getDeviceVariations(data.item) }}
            </template>

            <template slot="once" slot-scope="data">
              {{ getPriceOnce(data.item) | currency }}
            </template>

            <template slot="monthly" slot-scope="data">
              {{ (data.item.services.length > 0 && data.item.services[0] ? data.item.services[0].cost : '') | currency }}
            </template>

            <template slot="total" slot-scope="data">
              {{ getTotalPrice(data.item) | currency }}
            </template>

            <!-- Details Configuration -->
            <template slot="row-details" slot-scope="row">
              <div class="row align-center">
                <div class="col-md-2">
                  <div class="ds-flex details-container">
                    <avatar :username="row.item.users[0] ? `${row.item.users[0].firstName} ${row.item.users[0].lastName}` : 'Guest'" :size="avatarSize"></avatar>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="details-container">{{ row.item.users[0] ? row.item.users[0].email : '' }}</div>
                  <div class="ds-flex details-container">
                    <div>{{ row.item.addresses[0] ? row.item.addresses[0].address : '' }}</div>
                    <div class="ml-1">{{ row.item.addresses[0] ? row.item.addresses[0].city : '' }}</div>
                    <div class="ml-1">{{ row.item.addresses[0] ? row.item.addresses[0].country : '' }}</div>
                  </div>
                  <div class="details-container">
                    <b-button @click="denyOrder(row.item)" :class="OrderHelper.getButtonClass(row.item)" class="mr-3" v-if="OrderHelper.getState(row.item) == 'approval'">{{ OrderHelper.getButtonText('deny') }}</b-button>
                    <router-link :to="'orders/' + row.item.id" :name="'detail-' + row.item.id" class="btn bg-info"> view details </router-link>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="details-container" v-for="dv in row.item.devicevariations">
                    {{ `${dv.devices[0] ? dv.devices[0].name : ''} ${dv.modifications && dv.modifications[0] ? ', ' + dv.modifications[0].value : ''} ${dv.modifications && dv.modifications[1] ? ', ' + dv.modifications[1].value : ''}` }}
                  </div>
                  <div class="details-container">{{ row.item.services[0] ? row.item.services[0].title : '' }}</div>
                </div>
                <div class="col-md-2">
                  <div class="ds-flex details-container">
                    <div v-for="dv in row.item.devicevariations">
                      {{ dv.priceOwn | currency }}
                    </div>
                  </div>
                  <div class="ds-flex details-container">
                    <div v-for="dv in row.item.devicevariations">&nbsp;</div>
                    <div>{{ (row.item.services[0] ? row.item.services[0].cost : '') | currency }}</div>
                  </div>
                </div>
              </div>
            </template>
          </b-table>
        </div>

        <Pagination
          :pagination="pagination"
          :prev="prevPage"
          :next="nextPage"
          v-show="orders.total_pages > 1">
        </Pagination>
      </div>
    </b-card-body>
  </b-card>
</div>
</template>

<script src="./order_index.ctrl.js"></script>
