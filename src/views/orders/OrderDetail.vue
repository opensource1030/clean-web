<template>
  <div>
    <!--<div class="is-relative" v-if="">
      <div class="is-loading"></div>
    </div>-->
    <div class="page page-review">
      <transition appear
                  enter-class=""
                  enter-active-class="animated fadeIn"
                  leave-class=""
                  leave-active-class="animated fadeOut"
      >
        <div class="row expanded">
          <div class="columns small-12">
            <header class="tag-header">
              <h1> {{ orders.packages[0].name }} </h1>
              <div class="float-right"> Status <strong class="label"
                                                       v-bind:class="{'primary': orders.status === 'Delivered', 'alert': orders.status === 'Denied'}">
                {{orders.status}}</strong></div>
            </header>
            <pre>{{ orders }}</pre>
            <div class="grid-box">
              <div class="box-content-holder">
                <div class="row expanded">
                  <div class="columns small-6 medium-6">
                    <!--<header class="lined-title">
                      <h2> Basic Info </h2>
                      <a :href="'/employees/' + employee.id" :name="'edit-' + employee.id" class="btn-edit"
                         title="Edit"><i
                              class="fa fa-edit"> </i> </a>
                    </header>-->
                    <dl class="dl-h no-mg">
                      <dt>Device</dt>
                      <dd>{{ orders.devicevariations[0].devices[0].name }}</dd>
                      <dt>Carrier</dt>
                      <dd>{{ orders.services[0].carriers[0].name }}</dd>
                      <dt>Estimated Charges</dt>
                      <dd> &nbsp;</dd>
                      <div class="clearfix"></div>
                      <ul class="no-bullet">
                        <li><strong class="text-orange">{{ getPriceOnce(orders) | currency }} </strong> <strong>
                          once </strong></li>
                        <li><strong class="text-orange"> {{ (orders.services.length > 0 && orders.services[0] ?
                          orders.services[0].cost : '') |
                          currency }} </strong> <strong>monthly </strong></li>
                        <li><strong class="text-orange"> {{ parseInt((getPriceOnce(orders)) + (orders.services.length >
                          0 && orders.services[0] ?
                          parseInt(orders.services[0].cost) : 0)) | currency }} </strong> <strong> total </strong></li>
                      </ul>
                    </dl>
                  </div>
                  <div class="columns small-6 medium-6">
                    <header class="lined-title">
                      <h2> Usage Info </h2>
                    </header>

                    <dl class="dl-h no-mg">
                      <template v-for="dv in orders.devicevariations">
                        <dt>{{ `${dv.devices[0] ? dv.devices[0].name : ''} ${dv.modifications && dv.modifications[0] ?
                          ',' + dv.modifications[0].value : ''} ${dv.modifications && dv.modifications[1] ? ', ' +
                          dv.modifications[1].value : ''}` }}
                        </dt>
                        <dd><strong class="text-orange"> {{ dv.priceOwn | currency }} </strong></dd>
                      </template>
                    </dl>
                  </div>
                  <div class="clearfix mgbtm-1"></div>
                  <div class="columns small-12 large-6">
                    <header class="lined-title">
                      <h2> User Info </h2>
                    </header>
                    <div class="row">
                      <div class="columns large-3">
                        <avatar :username="orders.users[0] ? `${orders.users[0].firstName} ${orders.users[0].lastName}` : 'Guest'"
                                :size="avatarSize"/>
                      </div>
                      <div class="columns large-9">
                        <dl class="dl-h no-mg">
                          <dt>Username:</dt>
                          <dd> {{ orders.users[0].username ? orders.users[0].username : '-' }}</dd>
                          <dt> Email:</dt>
                          <dd> {{ orders.users[0].email ? orders.users[0].email : '-' }}</dd>
                          <dt> Office Phone:</dt>
                          <dd> -</dd>
                          <dt> Supervisor Email:</dt>
                          <dd> {{ orders.users[0].supervisorEmail ? orders.users[0].supervisorEmail : '-' }}</dd>
                        </dl>
                      </div>

                    </div>
                    <ul>

                    </ul>
                  </div>
                  <div class="columns small-12 large-6">
                    <header class="lined-title">
                      <h2> Shipping Info </h2>

                    </header>
                    <div class="row expanded default">
                      <div class="columns small-6  large-6">
                        <dl class="dl-h no-mg">
                          <dt> Address:</dt>
                          <dd> Full Address here</dd>
                          <dt> City:</dt>
                          <dd> city name here</dd>
                          <dt> Postal:</dt>
                          <dd> postal code</dd>
                        </dl>
                      </div>
                      <div class="columns small-6  large-6">
                        <dl class="dl-h no-mg">
                          <dt> State:</dt>
                          <dd> state name</dd>
                          <dt> Country:</dt>
                          <dd> country</dd>
                        </dl>
                      </div>
                    </div>
                    <div class="mgbtm-1 clearfix"></div>
                    <header class="lined-title">
                      <h2> Order Info </h2>
                    </header>
                    <div class="row expanded default">
                      <div class="columns small-6  large-6">
                        <dl class="dl-h no-mg">
                          <dt> Requested Area Code:</dt>
                          <dd> code here</dd>
                          <dt> Area Code Address :</dt>
                          <dd> {{ orders.addressId }}</dd>
                          <dt> Device Carrier</dt>
                          <dd> {{ orders.deviceCarrier }}</dd>
                        </dl>
                      </div>
                      <div class="columns small-6  large-6">
                        <dl class="dl-h no-mg">
                          <dt> Action:</dt>
                          <dd> state name</dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="small-12 columns">
            <a class="button large save-button" :href="/orders/">Back</a>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script src="./order.detail.ctrl.js" lang="babel"></script>