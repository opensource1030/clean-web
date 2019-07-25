<template>
  <div class="page order-page order-detail-page">
    <spinner v-if="isLoading" />

    <div v-else>
      <div class="tag-header bg-info">
        <h2 class="box-heading">{{ orders.packages[0].name }}</h2>
      </div>

      <b-card no-body>
        <b-card-body>
          <div class="status">
            <span>Status</span>
            <b-button
              disabled
              :variant="OrderHelper.getButtonClass(orders)">{{orders.status}}</b-button>
          </div>

          <div class="row">
            <div class="col-md-6 pt-2 pb-2 mb-4">
              <h3 class="lined-title"> Basic Info </h3>

              <div class="detail-line">
                <strong>Carrier:</strong>
                <span>{{ orders.services[0].carriers[0] ? orders.services[0].carriers[0].presentation : '-' }}</span>
              </div>
              <div class="detail-line">
                <strong> Package Information:</strong>
                <span>{{ orders.packages[0] ? orders.packages[0].information : '-' }}</span>
              </div>

              <div class="detail-line">
                <strong>Estimated Charges:</strong>
                <ul class="list-style-none">
                  <li>
                    <strong class="text-orange">{{ getPriceOnce(orders) | currency }}</strong>
                    <strong> once </strong>
                  </li>
                  <li>
                    <strong class="text-orange"> {{ (orders.services.length > 0 && orders.services[0] ?
                    orders.services[0].cost : '') |
                    currency }} </strong>
                    <strong>monthly </strong>
                  </li>
                  <li>
                    <strong class="text-orange"> {{ parseInt((getPriceOnce(orders)) +
                    (orders.services.length >
                    0 && orders.services[0] ?
                    parseInt(orders.services[0].cost) : 0)) | currency }}
                    </strong>
                    <strong> total </strong>
                  </li>
                </ul>
              </div>

              <div class="detail-line">
                <strong> Service Title:</strong>
                <span>{{ orders.services[0] ? orders.services[0].title : '-' }}</span>
              </div>

              <div class="detail-line">
                <strong> Service Description:</strong>
                <span>{{ orders.services[0] ? orders.services[0].description : '-' }}</span>
              </div>
            </div>

            <div class="col-md-6 pt-2 pb-2 mb-4">
              <h3 class="lined-title"> Usage Info </h3>
              <template v-if="orders.devicevariations.length > 0">
                <ul class="list-style-none row default">
                  <template v-for="dv in orders.devicevariations">
                    <li><strong> {{ `${dv.devices[0] ? dv.devices[0].name :
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

            <div class="col-md-6 pt-2 pb-2 mb-4">
              <h3 class="lined-title"> User Info </h3>

              <div class="row">
                <div class="col-lg-3">
                  <avatar :username="orders.users[0] ? `${orders.users[0].firstName} ${orders.users[0].lastName}` : 'Guest'"
                          :size="avatarSize"/>
                </div>
                <div class="col-lg-9">
                  <div class="detail-line">
                    <strong>Username:</strong>
                    <span> {{ orders.users[0].username ? orders.users[0].username : '-' }}</span>
                  </div>
                  <div class="detail-line">
                    <strong>Fullname:</strong>
                    <span> {{ orders.users[0] ? `${orders.users[0].firstName} ${orders.users[0].lastName}` : '-'}}</span>
                  </div>
                  <div class="detail-line">
                    <strong> Email:</strong>
                    <span> {{ orders.users[0].email ? orders.users[0].email : '-' }}</span>
                  </div>
                  <div class="detail-line">
                    <strong> Office Phone:</strong>
                    <span> -</span>
                  </div>
                  <div class="detail-line">
                    <strong> Supervisor Email:</strong>
                    <span> {{ orders.users[0].supervisorEmail ? orders.users[0].supervisorEmail : '-' }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-6 pt-2 pb-2 mb-4">
              <h3 class="lined-title"> Shipping Info </h3>
              <div class="row expanded default">
                <div class="col-lg-7">
                  <div class="detail-line">
                    <strong> Address:</strong>
                    <span> {{ orders.addresses[0] ? orders.addresses[0].address : '-' }}</span>
                  </div>
                  <div class="detail-line">
                    <strong> City:</strong>
                    <span> {{ orders.addresses[0] ? orders.addresses[0].city : '-' }}</span>
                  </div>
                  <div class="detail-line">
                    <strong> Phone</strong>
                    <span>{{ orders.addresses[0] ? orders.addresses[0].phone : '-' }}</span>
                  </div>
                </div>
                <div class="col-lg-5">
                  <div class="detail-line">
                    <strong> Country:</strong>
                    <span> {{ orders.addresses[0] ? orders.addresses[0].country : '-' }}</span>
                  </div>
                  <div class="detail-line">
                    <strong> State:</strong>
                    <span> {{ orders.addresses[0] ? orders.addresses[0].state : '-' }}</span>
                  </div>
                  <div class="detail-line">
                    <strong> Postal Code:</strong>
                    <span> {{ orders.addresses[0] ? orders.addresses[0].postalCode : '-' }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-6 pt-2 pb-2 mb-4">
              <h3 class="lined-title"> Order Info </h3>
              <div class="row expanded default">
                <div class="col-lg-6">
                  <div class="detail-line">
                    <strong> Area Code Address :</strong>
                    <span> {{ orders.addressId }}</span>
                  </div>
                  <div class="detail-line">
                    <strong> Service IMEI</strong>
                    <span> {{ orders ? orders.serviceImei : '-' }}</span>
                  </div>
                  <div class="detail-line">
                    <strong> Service SIM</strong>
                    <span> {{ orders ? orders.serviceSim : '-' }}</span>
                  </div>
                  <div class="detail-line">
                    <strong> Service Phone</strong>
                    <span> {{ orders ? orders.servicePhoneNo : '-' }}</span>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="detail-line">
                    <strong>Order Type:</strong>
                    <span>{{ orders ? orders.orderType : '-' }}</span>
                  </div>
                  <div class="detail-line">
                    <strong> Device IMEI</strong>
                    <span> {{ orders ? orders.deviceImei : '-' }}</span>
                  </div>
                  <div class="detail-line">
                    <strong> Device SIM</strong>
                    <span> {{ orders ? orders.deviceSim : '-' }}</span>
                  </div>
                  <div class="detail-line">
                    <strong> Device Carrier</strong>
                    <span>{{ orders ? orders.deviceCarrier : '-' }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </b-card-body>
      </b-card>
    </div>
  </div>
</template>

<script src="./show.ctrl.js"></script>
