<template>
    <div class="page employee-page employee-index-page">
        <modal v-if="$store.getters['error/hasError']" @close="$store.dispatch('error/clearAll')">
            <h3 slot="body">{{ $store.getters['error/error'] }}</h3>
        </modal>

        <div class="small-12 columns">
            <a class="button large add-button" href="/employees/new">Add Employee</a>
            <a class="button large add-bulk-button" href="/employees/bulk">Add Bulk Employees</a>
        </div>

        <div class="small-12 columns">
            <div class="tag-header">
                <div>Employees</div>
            </div>

            <div class="grid-box">
                <div class="box-heading">
                    <input type="text" placeholder="Search with employee name" v-model="query"
                           @keyup.enter="searchEmployees()">
                    <i class="fa fa-search"></i>
                </div>
                <div class="box-content">
                    <table class="unstriped" v-if="employees.length > 0">
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
                            <tr class="overview-tr" :data-id="employee.id"
                                :class="activeEmployee && (activeEmployee.id == employee.id) ? 'active' : ''">
                                <td>
                                    <span class="badge" @click="setActive(employee)"><i class="fa fa-plus"></i><i
                                            class="fa fa-minus"></i></span>
                                </td>
                                <td>{{ employee.id }}</td>
                                <td>
                                    <div class="switch tiny">
                                        <input class="switch-input" :id="'status-' + employee.id" type="checkbox"
                                               :name="'status-' + employee.id" v-bind:checked="employee.isActive"
                                               @change="onEmployeeActiveChange($event, employee.id)">
                                        <label class="switch-paddle" :for="'status-' + employee.id">
                                            <span class="show-for-sr">Tiny Sandwiches Enabled</span>
                                        </label>
                                    </div>
                                </td>
                                <td>{{ employee.firstName }}</td>
                                <td>{{ employee.lastName }}</td>
                                <td>{{ employee.email }}</td>
                                <td>{{ !!employee.companies[0] ? employee.companies[0].name : '' }}</td>
                                <td>
                                    <span class="label remove" @click="removeEmployee(employee.id)"><i
                                            class="fa fa-trash"></i></span>
                                    <a :href="'/employees/' + employee.id" :name="'edit-' + employee.id"><span
                                            class="label edit"><i class="fa fa-edit"></i></span></a>
                                </td>
                            </tr>
                            <tr class="detail-tr" :data-id="employee.id"
                                :class="activeEmployee && (activeEmployee.id == employee.id) ? 'active' : ''">
                                <td colspan="8">
                                    <div class="detail-box">
                                        <div class="content" v-if="!!employee.companies[0]">

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
                    v-show="$store.state.employee.records.length > 0">
            </paginate>
        </div>
    </div>
</template>

<script src="./employee.index.ctrl.js" lang="babel"></script>