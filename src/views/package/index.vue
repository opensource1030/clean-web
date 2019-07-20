<template>
  <div class="page package-page index-page">
    <div v-if="$store.state.feature.enabled_package_edit">
      <router-link to="/packages/new" class="btn btn-lg add-button">New Package</router-link>
    </div>

    <div>
      <div class="tag-header bg-info">Packages</div>

      <b-card no-body class="preset-list-card">
        <div class="search-field">
          <input type="text" placeholder="Search with package name" v-model="searchQuery" @keyup.enter="searchPackages()">
          <i class="fa fa-search"></i>
        </div>
        <b-card-body class="p-0">
          <spinner v-if="packagesLoading" />

          <table class="table" v-else>
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
            <tbody>
              <template v-for="(pack, index) in packages">
                <tr
                  :data-id="pack.id"
                  :class="activePackage && (activePackage.id == pack.id) ? 'active' : ''"
                  class="overview-tr"
                >
                  <td class="icon-toggle">
                    <span class="badge badge-primary" @click="setActive(pack)">
                      <i class="fa fa-plus"></i><i class="fa fa-minus"></i>
                    </span>
                  </td>
                  <td>{{ pack.id }}</td>
                  <td>{{ pack.name }}</td>
                  <td>{{ pack.valuesOnce.max }} {{ pack.valuesOnce.currencyMax }}</td>
                  <td>{{ pack.valuesMonth.max }} {{ pack.valuesMonth.currencyMax }}</td>
                  <td>
                    <div class="action-buttons" v-if="$store.state.feature.enabled_package_edit">
                      <a class="btn btn-danger" @click="removePackage(pack.id)"><i class="fa fa-trash"></i></a>
                      <router-link
                        :to="'/packages/' + pack.id"
                        :name="'edit-' + pack.id"
                        class="btn btn-warning"
                      >
                        <i class="fa fa-edit"></i>
                      </router-link>
                    </div>
                  </td>
                </tr>

                <tr
                  :data-id="pack.id"
                  :class="activePackage && (activePackage.id == pack.id) ? 'active' : ''"
                  class="detail-tr"
                >
                  <td colspan="2"></td>
                  <td>Employees</td>
                  <td></td>
                  <td></td>
                  <td>
                    <span v-if="packageConditions">{{ packageConditions | truncate(100) }}</span>
                    <span v-else>All users are allowed.</span>
                  </td>
                </tr>

                <tr
                  v-show="pack.id == activePackage.id && pack.services.length"
                  :data-id="pack.id"
                  :class="activePackage && (activePackage.id == pack.id) ? 'active' : ''"
                  class="detail-tr"
                >
                  <td colspan="2"></td>
                  <td>Services</td>
                  <td></td>
                  <td>{{ pack.valuesMonth.max }} {{ pack.valuesMonth.currencyMax }}</td>
                  <td>
                    <span v-if="packageServices">{{ packageServices | truncate(100) }}</span>
                    <span v-else>No Services Provided.</span>
                  </td>
                </tr>

                <tr
                  v-show="pack.id == activePackage.id && pack.devicevariations.length"
                  :data-id="pack.id"
                  :class="activePackage && (activePackage.id == pack.id) ? 'active' : ''"
                  class="detail-tr"
                >
                  <td colspan="2"></td>
                  <td>Devices</td>
                  <td>{{ pack.valuesOnce.max }} {{ pack.valuesOnce.currencyMax }}</td>
                  <td></td>
                  <td>
                    <span v-if="packageDevices">{{ packageDevices | truncate(100) }}</span>
                    <span v-else>No Devices Provided.</span>
                  </td>
                </tr>

                <tr
                  :data-id="pack.id"
                  :class="activePackage && (activePackage.id == pack.id) ? 'active' : ''"
                  class="detail-tr"
                >
                  <td colspan="2"></td>
                  <td>Approval Code</td>
                  <td>{{ pack.approvalCode }}</td>
                  <td colspan="2"> &nbsp;</td>
                </tr>
              </template>
            </tbody>
          </table>
        </b-card-body>
      </b-card>
    </div>

    <pagination
      v-show="packages.length > 0"
      :pagination="$store.state.packages.pagination"
      :prev="prevPage"
      :next="nextPage"
    />
  </div>
</template>

<script  src="./index.ctrl.js" lang="babel"></script>

<style lang="scss">
</style>
