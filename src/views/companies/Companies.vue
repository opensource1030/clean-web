<template>
<div class="page company-page company-index-page">
  <modal v-if="$store.getters['error/hasError']" @close="$store.dispatch('error/clearAll')">
    <h3 slot="body">{{ $store.getters['error/error'] }}</h3>
  </modal>

  <div class="small-12 columns">
    <a class="button large add-button" href="/company">Add Company</a>
  </div>

  <div class="columns small-12">
    <div class="grid-box">
      <div class="box-heading">
        <h2>Companies</h2>
      </div>
      <div class="box-content">
        <table>
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
            <tr v-for="company in companies">
              <td>
                <span class="badge"><i class="fa fa-plus"></i></span>
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
                <span class="label remove" @click="removeCompany(company.id)"><i class="fa fa-trash"></i></span>
                <a :href = "'/company/' + company.id" :name="'edit-' + company.id"><span class="label edit"><i class="fa fa-edit"></i></span></a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <paginate
    :pagination="$store.state.company.pagination"
    :prev="prevPage"
    :next="nextPage"
    v-show="$store.state.company.all.length > 0">
  </paginate>
</div>
</template>

<script src="./companies.ctrl.js" lang="babel"></script>