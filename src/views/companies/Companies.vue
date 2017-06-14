<template>
<div class="page company-page company-index-page">
  <modal v-if="$store.getters['error/hasError']" @close="$store.dispatch('error/clearAll')">
    <h3 slot="body">{{ $store.getters['error/error'] }}</h3>
  </modal>

  <div class="small-12 columns">
    <router-link to="/companies/new" class="button large btn-orange add-button">New Company</router-link>
  </div>

  <div class="columns small-12">
    <div class="tag-header">
      <h1>Companies</h1>
    </div>
    <div class="grid-box">
      <div class="search-holder">
        <input type="text" class="input-search" placeholder="Search with company name, shortname" v-model="query" @keyup.enter="searchCompanies()">
      </div>
      <div class="box-content" v-if="companies.length > 0">
        <div class="table-holder">
          <table class="unstriped">
            <thead>
            <tr>
              <th width="50">&nbsp;</th>
              <th>ID</th>
              <th>Status</th>
              <th>Name</th>
              <th>Short Name</th>
              <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            <template v-for="company in companies">
              <tr class="overview-tr" :data-id="company.id" :class="activeCompany && (activeCompany.id == company.id) ? 'active' : ''">
                <td>
                  <span class="badge" @click="setActive(company)"><i class="fa fa-plus"></i><i class="fa fa-minus"></i></span>
                </td>
                <td>{{ company.id }}</td>
                <td>
                  <div class="switch tiny">
                    <input class="switch-input" :id="'status-' + company.id" type="checkbox" :name="'status-' + company.id" v-bind:checked="company.active" @change="onCompanyActiveChange($event, company.id)">
                    <label class="switch-paddle" :for="'status-' + company.id">
                      <span class="show-for-sr">Tiny Sandwiches Enabled</span>
                    </label>
                  </div>
                </td>
                <td>{{ company.name }}</td>
                <td>{{ company.shortName }}</td>
                <td>
                  <div class="action-buttons">
                    <a class="button alert" @click="removeCompany(company.id)"><i class="fa fa-trash"></i></a>
                    <router-link :to="'/companies/' + company.id" :name="'edit-' + company.id" class="button warning">
                      <i class="fa fa-edit"></i>
                    </router-link>
                  </div>
                </td>
              </tr>
              <tr class="detail-tr" :data-id="company.id" :class="activeCompany && (activeCompany.id == company.id) ? 'active' : ''">
                <td colspan="7">
                  <div class="detail-box">
                    <div class="image">
                      <img :src="getCompanyImage()">
                    </div>
                    <div class="content">
                      <template v-for="address in company.address">
                        <div class="address-wrapper">
                          <div class="pair">
                            <span class="key">Country: </span>
                            <span class="value">{{ address.country }}</span>
                          </div>
                          <div class="pair">
                            <span class="key">State: </span>
                            <span class="value">{{ address.state }}</span>
                          </div>
                          <div class="pair">
                            <span class="key">City: </span>
                            <span class="value">{{ address.city }}</span>
                          </div>
                          <div class="pair">
                            <span class="key">Postal Code: </span>
                            <span class="value">{{ address.postalCode }}</span>
                          </div>
                          <div class="pair">
                            <span class="key">Address: </span>
                            <span class="value">{{ address.address }}</span>
                          </div>
                        </div>
                      </template>
                      <div class="udl-wrapper">
                        <template v-for="udl in company.udls">
                          <div class="pair">
                            <span class="key">{{ udl.name }}:&nbsp;</span>
                            <span class="value">{{ getUDLValue(udl) }}</span>
                          </div>
                        </template>
                      </div>
                      <a href="javascript:;" class="button view-button">View User</a>
                    </div>
                  </div>
                </td>
              </tr>
            </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <!-- <paginate
    :pagination="$store.state.company.pagination"
    :prev="prevPage"
    :next="nextPage"
    v-show="$store.state.company.records.length > 0">
  </paginate> -->

  <div class="clearfix"></div>
  <div class="is-relative" v-show="companies.length == 0">
    <div class="is-loading"></div>
  </div>
</div>
</template>

<script src="./companies.ctrl.js" lang="babel"></script>