<template>
  <div>
    <div class="is-relative" v-if="!employee.firstName">
      <div class="is-loading"></div>
    </div>
    <div class="page page-review" v-else>
      <transition appear
                  enter-class=""
                  enter-active-class="animated fadeIn"
                  leave-class=""
                  leave-active-class="animated fadeOut"

      >
        <div class="row expanded">
          <div class="columns small-12">
            <header class="tag-header">
              <h1> {{employee.lastName}}, {{employee.firstName }}  :: <strong style="background-color: #f8ff00; color: #000">{{ employee.identification }}</strong> </h1>
            </header>
            <div class="grid-box">
              <div class="box-content-holder">
                <div class="row expanded">
                  <div class="columns small-6 medium-6">
                    <header class="lined-title">
                      <h2> Basic Info </h2>
                      <!--<a :href="'/employees/' + employee.id" :name="'edit-' + employee.id" class="btn-edit"-->
                         <!--title="Edit"><i-->
                              <!--class="fa fa-edit"> </i> </a>-->
                    </header>
                    <dl class="dl-h no-mg">
                      <dt>ID:</dt>
                      <dd>{{ employee.identification }}</dd>
                      <dt>Notify:</dt>
                      <dd>{{ employee.notify ? "Yes" : "No" }}</dd>
                      <dt>Username:</dt>
                      <dd>{{ employee.username }}</dd>
                      <dt>Active:</dt>
                      <dd>{{ employee.isActive ? "Yes" : "No" }}</dd>
                      <dt>First Name:</dt>
                      <dd>{{ employee.firstName }}</dd>
                      <dt>Last Name:</dt>
                      <dd>{{ employee.lastName }}</dd>
                      <dt>Email:</dt>
                      <dd> {{ employee.email }}</dd>
                      <dt>Supervisor</dt>
                      <dd> {{ employee.supervisorEmail ? employee.supervisorEmail : '-' }}</dd>
                      <dt>Extra Notes</dt>
                      <dd>{{ employee.notes ? employee.notes : '-' }}</dd>
                    </dl>
                  </div>
                  <div class="columns small-6 medium-6">
                    <header class="lined-title">
                      <h2> Company Info </h2>
                      <!--<a :href="'/employees/' + employee.id" :name="'edit-' + employee.id" class="btn-edit"-->
                         <!--title="Edit"><i-->
                              <!--class="fa fa-edit"> </i> </a>-->
                    </header>

                    <dl class="dl-h no-mg">
                      <dt>Company:</dt>
                      <dd>{{ employee.companies[0].name }}</dd>
                      <dt>Location:</dt>
                      <dd>{{ employee.defaultLocationId ? employee.defaultLocationId : '-' }}</dd>
                      <template v-for="udl in employee.companies[0].udls">
                        <dt>
                          {{ udl.name }}:
                        </dt>
                        <dd>
                          <select class="select-review"
                                  v-model="employee.udlvalues[EmployeeHelper.getUdlValueIndex(employee, udl.id)]">
                            <option v-for="uv in udl.udlvalues" v-if="udl.udlvalues" :value="uv" disabled>{{ uv.udlValue
                              }}
                            </option>
                            <option v-else value="-"> -</option>
                          </select>
                        </dd>

                      </template>


                    </dl>
                  </div>
                  <div class="clearfix mgbtm-1"></div>
                  <!--<div class="columns small-12">-->
                    <!--<header class="lined-title">-->
                      <!--<h2> User Role </h2>-->
                      <!--<a :href="'/employees/' + employee.id" :name="'edit-' + employee.id" class="btn-edit"-->
                         <!--title="Edit"><i-->
                              <!--class="fa fa-edit"> </i> </a>-->
                    <!--</header>-->
                    <!--<ul>-->
                      <!--<li v-for="role in UserRole">{{ role }}</li>-->
                    <!--</ul>-->
                  <!--</div>-->
                </div>
              </div>
            </div>
          </div>
          <div class="small-12 columns">
            <a class="button large save-button" :href="/employees/">Go Back</a>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script src="./employee.review.ctrl.js" lang="babel"></script>
