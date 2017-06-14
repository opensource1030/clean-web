<template>
  <div class="page package-page package-index-page">
    <modal v-if="$store.getters['error/hasError']" @close="$store.dispatch('error/clearAll')">
      <h3 slot="body">{{ $store.getters['error/error'] }}</h3>
    </modal>

    <div class="small-12 columns">
      <router-link to="/packages/new" class="button large btn-orange">New Package</router-link>
    </div>

    <div class="columns small-12">
      <div class="tag-header">
        <h1>Packages</h1>
      </div>
      <div class="grid-box">
        <div class="search-holder">
          <input type="text" class="input-search" placeholder="Search with package name" v-model="searchQuery" @keyup.enter="searchPackages()">
        </div>
        <div class="box-content-holder is-relative" v-if="packagesLoading">
          <div class="is-loading"></div>
        </div>
        <div class="box-content" v-else>
          <div class="table-holder">
            <table class="unstriped">
              <thead>
                <tr>
                  <th width="50">&nbsp;</th>
                  <th>ID</th>
                  <th>Name</th>
                  <th title="Max price you will pay once time" width="90">Once</th>
                  <th title="Max price you will pay monthly" width="90">Month</th>
                  <th width="400">Actions</th>
                </tr>
              </thead>
              <tbody v-for="(pack, index) in packages">
                <tr class="overview-tr" :data-id="pack.id" :class="activePackage && (activePackage.id == pack.id) ? 'row-active' : ''">
                  <td class="icon-toggle">
                    <span @click="setActive(pack)"><i
                          :class="activePackage && (activePackage.id == pack.id) ? 'fa fa-minus' : 'fa fa-plus'"></i></span>
                  </td>
                  <td>{{pack.id}}</td>
                  <td>{{pack.name}}</td>
                  <td>{{pack.valuesOnce.max}} {{pack.valuesOnce.currencyMax}}</td>
                  <td>{{pack.valuesMonth.max}} {{pack.valuesMonth.currencyMax}}</td>
                  <td>
                    <div class="action-buttons">
                      <a class="button alert" @click="removePackage(pack.id)"><i class="fa fa-trash"></i></a>
                      <router-link :to="'/packages/' + pack.id" :name="'edit-' + pack.id" class="button warning">
                        <i class="fa fa-edit"></i>
                      </router-link>
                    </div>
                  </td>
                </tr>
                <tr class="detail-tr" :data-id="pack.id" :class="activePackage && (activePackage.id == pack.id) ? 'active' : ''">
                  <td colspan="2"></td>
                  <td>Employees</td>
                  <td></td>
                  <td></td>
                  <td>
                    <span v-if="packageConditions">{{packageConditions | truncate(100)}}</span>
                    <span v-else>All users are allowed.</span>
                  </td>
                </tr>
                <tr class="detail-tr" :data-id="pack.id" :class="activePackage && (activePackage.id == pack.id) ? 'active' : ''" 
                    v-show="pack.id == activePackage.id && pack.services.length">
                  <td colspan="2"></td>
                  <td>Services</td>
                  <td></td>
                  <td>{{pack.valuesMonth.max}} {{pack.valuesMonth.currencyMax}}</td>
                  <td>
                    <span v-if="packageServices">{{packageServices | truncate(100)}}</span>
                    <span v-else>No Services Provided.</span>
                  </td>
                </tr>
                <tr class="detail-tr" :data-id="pack.id"
                    :class="activePackage && (activePackage.id == pack.id) ? 'active' : ''"
                    v-show="pack.id == activePackage.id && pack.devicevariations.length">
                  <td colspan="2"></td>
                  <td>Devices</td>
                  <td>{{pack.valuesOnce.max}} {{pack.valuesOnce.currencyMax}}</td>
                  <td></td>
                  <td>
                    <span v-if="packageDevices">{{packageDevices | truncate(100)}}</span>
                    <span v-else>No Devices Provided.</span>
                  </td>
                </tr>
                <tr class="detail-tr" :data-id="pack.id"
                    :class="activePackage && (activePackage.id == pack.id) ? 'active' : ''">
                  <td colspan="2"></td>
                  <td>Approval Code</td>
                  <td>{{pack.approvalCode}}</td>
                  <td colspan="2"> &nbsp;</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <paginate
      :pagination="$store.state.packages.pagination"
      :prev="prevPage"
      :next="nextPage"
      v-show="packages.length > 0">
    </paginate>
  </div>
</template>
<script  src="./packages.crtl.js" lang="babel"></script>
