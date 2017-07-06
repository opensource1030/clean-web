<template>
<div class="page order-page order-index-page">
  <modal v-if="$store.getters['error/hasError']" @close="$store.dispatch('error/clearAll')">
    <h3 slot="body">{{ $store.getters['error/error'] }}</h3>
  </modal>

  <div class="row charts">
    <div class="small-4 columns">
      <vue-chart 
        :chart-type="packageCostChart.type"
        :columns="packageCostChart.columns"
        :rows="packageCostChart.rows"
        :options="packageCostChart.options"
      ></vue-chart>
    </div>

    <div class="small-4 columns">
      <vue-chart 
        :chart-type="monthlyCostChart.type"
        :columns="monthlyCostChart.columns"
        :rows="monthlyCostChart.rows"
        :options="monthlyCostChart.options"
      ></vue-chart>
    </div>

    <div class="small-4 columns">
      <vue-chart 
        :chart-type="monthlySellChart.type"
        :columns="monthlySellChart.columns"
        :rows="monthlySellChart.rows"
        :options="monthlySellChart.options"
      ></vue-chart>
    </div>
  </div>

  <div class="small-12 columns" v-if="isReady">
    <div class="tag-header">
      <h1>Procurements</h1>
    </div>

    <div class="grid-box">
      <div class="box-content">
        <table class="unstriped">
          <thead>
            <tr>
              <th width="50">&nbsp;</th>
              <th>
                <multiselect
                        placeholder="Status"
                        :options="filters.statuses.options"
                        :value="$store.state.order.filters.orderStatuses"
                        :multiple="true"
                        :show-labels="false"
                        :select-label="''"
                        :close-on-select="false"
                        :clear-on-select="false"
                        :hide-selected="false"
                        :limit="3"
                        @input="addFilter_OrderStatuses">
                </multiselect>
              </th>
              <th>
                <multiselect
                        id="ajax"
                        placeholder="Employee Name"
                        :options="filters.employees.options"
                        :value="$store.state.order.filters.employeeNames"
                        :multiple="true"
                        :searchable="true"
                        :loading="filters.employees.isLoading"
                        :show-labels="false"
                        :select-label="''"
                        :close-on-select="false"
                        :clear-on-select="false"
                        :hide-selected="false"
                        :limit="3"
                        @search-change="asyncFind_EmployeeNames"
                        @input="addFilter_EmployeeNames">
                </multiselect>
              </th>
              <th>
                <multiselect
                        id="ajax"
                        placeholder="Phone Number"
                        :options="filters.addresses.options"
                        :value="$store.state.order.filters.addressPhones"
                        :multiple="true"
                        :searchable="true"
                        :loading="filters.addresses.isLoading"
                        :show-labels="false"
                        :select-label="''"
                        :close-on-select="false"
                        :clear-on-select="false"
                        :hide-selected="false"
                        :limit="3"
                        @search-change="asyncFind_AddressPhones"
                        @input="addFilter_AddressPhones">
                </multiselect>
              </th>
              <th>
                <multiselect
                        id="ajax"
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
                        @input="addFilter_PackageNames">
                </multiselect>
              </th>
              <th>
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
                        @input="addFilter_CarrierNames">
                </multiselect>
              </th>
              <th>
                <multiselect
                        id="ajax"
                        placeholder="Device Name"
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
                        @input="addFilter_DeviceNames">
                </multiselect>
              </th>
              <th>Once</th>
              <th>Monthly</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="order in orders">
              <tr class="overview-tr" :class="activeOrder && (activeOrder.id == order.id) ? 'active' : ''">
                <td>
                  <span class="badge toggle-button" @click="setActive(order)">
                    <i class="fa fa-plus"></i><i class="fa fa-minus"></i>
                  </span>
                </td>
                <td>{{ order.status }}</td>
                <td>{{ order.users[0] ? `${order.users[0].firstName} ${order.users[0].lastName}` : '' }}</td>
                <td>{{ order.addresses[0] ? $options.filters.phone(order.addresses[0].phone) : '' }}</td>
                <td>{{ order.packages[0] ? order.packages[0].name : '' }}</td>
                <td>{{ _.get(order, 'services[0].carriers[0].presentation', '') }}</td>
                <td>{{ getDeviceVariations(order) }}</td>
                <td>{{ getPriceOnce(order) | currency }}</td>
                <td>{{ (order.services.length > 0 && order.services[0] ? order.services[0].cost : '') | currency }}</td>
                <td>{{ getTotalPrice(order) | currency }}</td>
              </tr>
              <tr class="detail-tr" :class="activeOrder && (activeOrder.id == order.id) ? 'active' : ''">
                <td></td>
                <td>
                  <avatar :username="order.users[0] ? `${order.users[0].firstName} ${order.users[0].lastName}` : 'Guest'" :size="avatarSize"></avatar>
                </td>
                <td>
                  <div>{{ order.users[0] ? order.users[0].email : '' }}</div>
                  <a @click="updateOrderState(order)" class="button state-button" :class="OrderHelper.getButtonClass(order)" v-if="OrderHelper.getNextState(order) != ''">{{ OrderHelper.getButtonText(order) }}</a>
                  <div class="clearfix"></div>
                  <a :href="'orders/detail/' + order.id" :name="'detail-' + order.id" class="button primary"> view
                    details </a>
                </td>
                <td>
                  <div>{{ order.addresses[0] ? order.addresses[0].address : '' }}</div>
                  <div>{{ order.addresses[0] ? order.addresses[0].city : '' }}</div>
                  <div>{{ order.addresses[0] ? order.addresses[0].country : '' }}</div>
                </td>
                <td colspan="3">
                  <div v-for="dv in order.devicevariations">
                    {{ `${dv.devices[0] ? dv.devices[0].name : ''} ${dv.modifications && dv.modifications[0] ? ', ' + dv.modifications[0].value : ''} ${dv.modifications && dv.modifications[1] ? ', ' + dv.modifications[1].value : ''}` }}
                  </div>
                  <div>{{ order.services[0] ? order.services[0].title : '' }}</div>
                </td>
                <td>
                  <div v-for="dv in order.devicevariations">
                    {{ dv.priceOwn | currency }}
                  </div>
                </td>
                <td>
                  <div v-for="dv in order.devicevariations">&nbsp;</div>
                  <div>{{ (order.services[0] ? order.services[0].cost : '') | currency }}</div>
                </td>
                <td></td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>

    <paginate
      :pagination="$store.state.device.pagination"
      :prev="prevPage"
      :next="nextPage"
      v-show="$store.state.device.records.length > 0">
    </paginate>
  </div>

  <div class="clearfix"></div>

  <div class="is-relative">
    <div class="is-loading" v-show="!isReady"></div>
  </div>
</div>
</template>

<script src="./order.index.ctrl.js"></script>