<template>
  <div class="page employee-page employee-index-page">
    <!-- <b-alert
      show
      dismissible
    >
      Warning
    </b-alert> -->

    <div>
      <router-link to="/employees/new" class="btn btn-lg add-button">Add Employee</router-link>
      <router-link to="/employees/bulk/add" class="btn btn-lg add-bulk-button" v-if="isReadyBulk">Add Bulk Employees</router-link>
      <!-- <router-link to="/employees/bulk/review" class="button large review-bulk-button" v-if="isReadyBulk && hasRunningJob"><i class="fa fa-spinner"></i> Importing</router-link> -->
    </div>

    <div>
      <div class="tag-header bg-info">Employees</div>

      <b-card no-body class="employee-list-card">
        <div class="search-field">
          <input type="text" placeholder="Search with employee email" v-model="query" @keyup.enter="searchEmployees()">
          <i class="fa fa-search"></i>
        </div>
        <b-card-body class="p-0">
          <spinner v-if="!isReady" />
          <table v-else class="table">
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
                    <span class="badge badge-primary" @click="setActive(employee)"><i class="fa fa-plus"></i><i class="fa fa-minus"></i></span>
                  </td>
                  <td>{{ employee.identification }}</td>
                  <td>
                    <b-form-checkbox v-model="employee.isActive" switch></b-form-checkbox>
                    <!-- <input :id="'status-' + employee.id" type="checkbox" v-bind:checked="employee.isActive" @change="onEmployeeActiveChange($event, employee.id)"> -->
                  </td>
                  <td>{{ employee.firstName }}</td>
                  <td>{{ employee.lastName }}</td>
                  <td>{{ employee.email }}</td>
                  <td>{{ !!employee.companies && !!employee.companies[0] ? employee.companies[0].name : '' }}</td>
                  <td>
                    <div class="action-buttons">
                      <a class="btn btn-danger" @click="removeEmployee(employee.id)"><i class="fa fa-trash"></i></a>
                      <router-link :to="'/employees/' + employee.id" :name="'edit-' + employee.id" class="btn bg-warning">
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
        </b-card-body>
      </b-card>

      <pagination
        v-show="isReady"
        :pagination="$store.state.employee.pagination"
        :prev="prevPage"
        :next="nextPage"
      />
    </div>

    <div class="mt-3">
      <div class="tag-header bg-info">Jobs</div>

      <b-card no-body class="job-list-card">
        <b-card-body class="p-0">
          <spinner  v-if="!isReadyBulk" />

          <table v-else class="table">
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
                      <a class="btn bg-warning" @click="reviewJob(job.id)"><i class="fa fa-eye"></i></a>
                    </div>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </b-card-body>
      </b-card>
    </div>
  </div>
</template>

<script src="./employee_index.ctrl.js" lang="babel"></script>
