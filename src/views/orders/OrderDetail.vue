<template>
  <div>
    <div class="is-relative" v-if="isReady == false">
      <transition appear
                  enter-class=""
                  enter-active-class="animated zoomIn"
                  leave-class=""
                  leave-active-class="animated zoomOut"
      >
        <div class="is-loading"></div>
      </transition>
    </div>
    <div v-else class="page page-review">
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
              <div class="float-right status"> Status <strong class="label"
                                                              v-bind:class="{'success': orders.status === 'Delivered',
                                                              'secondary': orders.status === 'New',
                                                              'alert': orders.status === 'Denied',
                                                              'alert': orders.status === 'Expired',
                                                              'warning' : orders.status === 'Pending Delivery' ,
                                                              'primary': orders.status === 'Approval'}">{{orders.status}}</strong>
              </div>
            </header>
            <div class="grid-box">
              <div class="box-content-holder">
                <div class="row expanded default">
                  <div class="columns small-6 medium-6">
                    <header class="lined-title">
                      <h2> Basic Info </h2>
                    </header>
                    <div class="row default">
                      <div class="large-6 columns">
                        <dl class="dl-h no-mg">

                          <dt>Carrier:</dt>
                          <dd>{{ orders.services[0].carriers[0] ? orders.services[0].carriers[0].presentation : '-' }}
                          </dd>
                          <dt> Package Information:</dt>
                          <div class="clearfix"></div>
                          <dd>{{ orders.packages[0] ? orders.packages[0].information : '-' }}</dd>

                          <dt>Estimated Charges:</dt>
                          <dd> &nbsp;</dd>
                          <div class="clearfix"></div>
                          <ul class="no-bullet">
                            <li><strong class="text-orange">{{ getPriceOnce(orders) | currency }} </strong> <strong>
                              once </strong></li>
                            <li><strong class="text-orange"> {{ (orders.services.length > 0 && orders.services[0] ?
                              orders.services[0].cost : '') |
                              currency }} </strong> <strong>monthly </strong></li>
                            <li><strong class="text-orange"> {{ parseInt((getPriceOnce(orders)) +
                              (orders.services.length >
                              0 && orders.services[0] ?
                              parseInt(orders.services[0].cost) : 0)) | currency }} </strong> <strong> total </strong>
                            </li>
                          </ul>
                        </dl>
                      </div>
                      <div class="large-6 columns">
                        <dl class="dl-h no-mg">
                          <dt> Service Title:</dt>
                          <div class="clearfix"></div>
                          <dd>{{ orders.services[0] ? orders.services[0].title : '-' }}</dd>
                          <dt> Service Description:</dt>
                          <div class="clearfix"></div>
                          <dd>{{ orders.services[0] ? orders.services[0].description : '-' }}</dd>
                        </dl>
                      </div>
                    </div>

                  </div>
                  <div class="columns small-6 medium-6">
                    <header class="lined-title">
                      <h2> Usage Info </h2>
                    </header>
                    <template v-if="orders.devicevariations.length > 0">
                      <ul class="no-bullet row default">
                        <template v-for="dv in orders.devicevariations">
                          <li class="columns large-6"><strong> {{ `${dv.devices[0] ? dv.devices[0].name :
                            ''}${dv.modifications && dv.modifications[0] ?
                            ', ' + dv.modifications[0].value : ''}${dv.modifications && dv.modifications[1] ? ', ' +
                            dv.modifications[1].value : ''}` }} </strong>
                            <strong class="text-orange"> {{ dv.priceOwn | currency }} </strong>
                          </li>
                        </template>
                      </ul>
                    </template>
                    <div v-else class="is-relative na"></div>
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
                          <dt>Fullname:</dt>
                          <dd> {{ orders.users[0] ? `${orders.users[0].firstName} ${orders.users[0].lastName}` : '-'}}
                          </dd>
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
                          <dd> {{ orders.addresses[0] ? orders.addresses[0].address : '-' }}</dd>
                          <dt> City:</dt>
                          <dd> {{ orders.addresses[0] ? orders.addresses[0].city : '-' }}</dd>
                          <dt> State:</dt>
                          <dd> {{ orders.addresses[0] ? orders.addresses[0].state : '-' }}</dd>
                        </dl>
                      </div>
                      <div class="columns small-6  large-6">
                        <dl class="dl-h no-mg">
                          <dt> Country:</dt>
                          <dd> {{ orders.addresses[0] ? orders.addresses[0].country : '-' }}</dd>
                          <dt> Postal Code:</dt>
                          <dd> {{ orders.addresses[0] ? orders.addresses[0].postalCode : '-' }}</dd>
                          <dt> Phone</dt>
                          <dd>{{ orders.addresses[0] ? orders.addresses[0].phone : '-' }}</dd>
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
                          <dt> Area Code Address :</dt>
                          <dd> {{ orders.addressId }}</dd>
                          <dt> Service IMEI</dt>
                          <dd> {{ orders ? orders.serviceImei : '-' }}</dd>
                          <dt> Service SIM</dt>
                          <dd> {{ orders ? orders.serviceSim : '-' }}</dd>
                          <dt> Service Phone</dt>
                          <dd> {{ orders ? orders.servicePhoneNo : '-' }}</dd>
                        </dl>
                      </div>
                      <div class="columns small-6  large-6">
                        <dl class="dl-h no-mg">
                          <dt>Order Type:</dt>
                          <dd>{{ orders ? orders.orderType : '-' }}</dd>
                          <dt> Device IMEI</dt>
                          <dd> {{ orders ? orders.deviceImei : '-' }}</dd>
                          <dt> Device SIM</dt>
                          <dd> {{ orders ? orders.deviceSim : '-' }}</dd>
                          <dt> Device Carrier</dt>
                          <div class="clearfix"></div>
                          <dd>{{ orders ? orders.deviceCarrier : '-' }}</dd>
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