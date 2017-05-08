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
              <!-- <th>ID</th> -->
              <th>Status</th>
              <th>Employee Name</th>
              <th>Phone Number</th>
              <th>Package Name</th>
              <th>Carrier</th>
              <th>Device</th>
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
                <td></td>
                <td>{{ order.packages[0] ? order.packages[0].name : '' }}</td>
                <td>{{ order.services[0].carriers[0].presentation }}</td>
                <td>{{ getDeviceVariations(order) }}</td>
                <td>{{ getPriceOnce(order) | currency }}</td>
                <td>{{ order.services[0].cost | currency }}</td>
                <td></td>
              </tr>
              <tr class="detail-tr" :class="activeOrder && (activeOrder.id == order.id) ? 'active' : ''">
                <td></td>
                <td colspan="9">
                  {{ `Here goes order - ${order.id}` }}
                </td>
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

<script src="./order.index.ctrl.js" lang="babel"></script>