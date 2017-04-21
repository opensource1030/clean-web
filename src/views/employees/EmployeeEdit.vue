<template>
    <div class="page employee-page employee-edit-page" v-if="employee.id == employee_id">
        <modal v-if="$store.getters['error/hasError']" @close="$store.dispatch('error/clearAll')">
            <h3 slot="body">{{ $store.getters['error/error'] }}</h3>
        </modal>

        <div class="columns small-12">
            <div class="grid-box overview">
                <div class="box-heading">
                    <h2>Employee Information</h2>
                </div>
                <div class="box-content">
                    <div class="row extend">
                        <div class="columns medium-4">
                            <label>
                                <span>Email</span>
                                <input type="text" name="employee-email" placeholder="" v-model="employee.email">
                            </label>
                        </div>
                        <div class="columns medium-4">
                            <label>
                                <span>Username</span>
                                <input type="text" name="employee-username" placeholder="" v-model="employee.username">
                            </label>
                        </div>
                        <div class="columns medium-4">
                            <label>
                                <span>Supervisor</span>
                                <div class="switch tiny">
                                    <input class="switch-input" :id="'supervisor-' + employee.id" type="checkbox"
                                           v-model="employee.isSupervisor">
                                    <label class="switch-paddle" :for="'supervisor-' + employee.id"></label>
                                </div>
                            </label>
                        </div>
                    </div>

                    <div class="row extend">
                        <div class="columns medium-4">
                            <label>
                                <span>First Name</span>
                                <input type="text" name="employee-first-name" placeholder=""
                                       v-model="employee.firstName">
                            </label>
                        </div>
                        <div class="columns medium-4">
                            <label>
                                <span>Last Name</span>
                                <input type="text" name="employee-last-name" placeholder="" v-model="employee.lastName">
                            </label>
                        </div>
                        <div class="columns medium-4">
                            <label>
                                <span>Location</span>
                                <input type="text" name="employee-location" placeholder=""
                                       v-model="employee.defaultLocationId">
                            </label>
                        </div>
                    </div>

                    <div class="row extend">
                        <div class="columns medium-8">
                            <label>
                                <span>Extra Notes</span>
                                <textarea name="employee-notes" placeholder="" v-model="employee.notes"></textarea>
                            </label>
                        </div>
                        <div class="columns medium-4">
                            <label>
                                <span>Active</span>
                                <div class="switch tiny">
                                    <input class="switch-input" :id="'active-' + employee.id" type="checkbox"
                                           v-model="employee.isActive">
                                    <label class="switch-paddle" :for="'active-' + employee.id"></label>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="columns small-12" v-if="employee.companies.length > 0 && !!employee.companies[0]">
            <div class="grid-box company-info">
                <div class="box-heading">
                    <h2>Company Information</h2>
                </div>
                <div class="box-content">
                    <div class="columns medium-4" v-for="udl in employee.companies[0].udls">
                        <label>
                            {{ udl.name }}
                            <select>
                                <option v-for="section in udl.sections" :value="section.id">{{ section.name }}</option>
                            </select>
                        </label>
                    </div>

                    <div class="clearfix"></div>
                </div>
            </div>
        </div>

        <div class="small-12 columns">
            <a class="button large save-button" @click="submit()">Save Changes</a>
        </div>
    </div>
</template>

<script src="./employee.edit.ctrl.js" lang="babel"></script>