<template>
<div class="page employee-page employee-index-page">
  <modal v-if="$store.getters['error/hasError']" @close="$store.dispatch('error/clearAll')">
    <h3 slot="body">{{ $store.getters['error/error'] }}</h3>
  </modal>

  <div class="small-12 columns">
    <router-link to="/employees/new" class="button large add-button">Add Employee</router-link>
    <router-link to="/employees/bulk/add" class="button large add-bulk-button" v-if="isReadyBulk">Add Bulk Employees</router-link>
    <!-- <router-link to="/employees/bulk/review" class="button large review-bulk-button" v-if="isReadyBulk && hasRunningJob"><i class="fa fa-spinner"></i> Importing</router-link> -->
  </div>

  <div class="small-12 columns">
    <div class="tag-header">
      <h1>Employees</h1>
    </div>

    <div class="grid-box">
      <div class="box-heading">
        <input type="text" placeholder="Search with employee email" v-model="query" @keyup.enter="searchEmployees()">
        <i class="fa fa-search"></i>
      </div>
      <div class="box-content" v-if="isReady">
        <table class="unstriped">
          <thead>
            <tr>
              <th width="50">&nbsp;</th>
              <th>ID</th>
              <th>Status</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Company Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="employee in employees">
              <tr class="overview-tr" :data-id="employee.id" :class="activeEmployee && (activeEmployee.id == employee.id) ? 'active' : ''">
                <td>
                  <span class="badge" @click="setActive(employee)"><i class="fa fa-plus"></i><i class="fa fa-minus"></i></span>
                </td>
                <td>{{ employee.identification }}</td>
                <td>
                  <div class="switch tiny">
                    <input class="switch-input" :id="'status-' + employee.id" type="checkbox" :name="'status-' + employee.id" v-bind:checked="employee.isActive" @change="onEmployeeActiveChange($event, employee.id)">
                    <label class="switch-paddle" :for="'status-' + employee.id">
                      <span class="show-for-sr">Tiny Sandwiches Enabled</span>
                    </label>
                  </div>
                </td>
                <td>{{ employee.firstName }}</td>
                <td>{{ employee.lastName }}</td>
                <td>{{ employee.email }}</td>
                <td>{{ !!employee.companies && !!employee.companies[0] ? employee.companies[0].name : '' }}</td>
                <td>
                  <div class="action-buttons">
                    <a class="button alert" @click="removeEmployee(employee.id)"><i class="fa fa-trash"></i></a>
                    <router-link :to="'/employees/' + employee.id" :name="'edit-' + employee.id" class="button warning">
                      <i class="fa fa-edit"></i>
                    </router-link>
                  </div>
                </td>
              </tr>
              <tr class="detail-tr" :data-id="employee.id" :class="activeEmployee && (activeEmployee.id == employee.id) ? 'active' : ''">
                <td colspan="8">
                  <div class="detail-box">
                    <div class="content" v-if="!!employee.companies && !!employee.companies[0]">

                      <template v-for="address in employee.companies[0].address">
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
                        <template v-for="udl in employee.companies[0].udls">
                          <div class="pair">
                            <span class="key">{{ udl.name }}:&nbsp;</span>
                            <span class="value">{{ getUDLValue(udl) }}</span>
                          </div>
                        </template>
                      </div>

                    </div>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>

    <paginate
            :pagination="$store.state.employee.pagination"
            :prev="prevPage"
            :next="nextPage"
            v-show="isReady">
    </paginate>

    <div class="is-relative" v-show="!isReady">
      <div class="is-loading"></div>
    </div>
  </div>

  <div class="small-12 columns">
    <div class="tag-header">
      <h1>Jobs</h1>
    </div>

    <div class="grid-box">
      <div class="box-content" v-if="isReady">
        <table class="unstriped">
          <thead>
            <tr>
              <th width="50">&nbsp;</th>
              <th>ID</th>
              <th>Status</th>
              <th>Creatable</th>
              <th>Created</th>
              <th>Updatable</th>
              <th>Updated</th>
              <th>Total</th>
              <th>Failed</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="job in jobs">
              <tr>
                <td></td>
                <td>{{ job.id }}</td>
                <td>{{ job.status }}</td>
                <td>{{ job.creatableUsers }}</td>
                <td>{{ job.createdUsers }}</td>
                <td>{{ job.updatableUsers }}</td>
                <td>{{ job.updatedUsers }}</td>
                <td>{{ job.totalUsers }}</td>
                <td>{{ job.failedUsers }}</td>
                <td>
                  <div class="action-buttons">
                    <a class="button warning" @click="reviewJob(job.id)"><i class="fa fa-eye"></i></a>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>

    <div class="is-relative" v-show="!isReadyBulk">
      <div class="is-loading"></div>
    </div>
  </div>
</div>
</template>

<script src="./employee.index.ctrl.js" lang="babel"></script>