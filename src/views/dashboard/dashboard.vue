<template>
  <div>
    <div v-if="$store.state.feature.enabled_dashboard" class="page dashboard-page">
      <spinner v-if="userInfo.loading" />
      <div v-else>
        <!-- mobile view -->
        <div class="d-block d-lg-none left-panel my-3 pt-4">
          <div class="user-container px-3">
            <div class="mb-3">
              <avatar
                :username="userInfo.data.firstName + ' ' + userInfo.data.lastName"
                :size="30"
                inline
              ></avatar>
              <label class="ml-2 mb-0">{{ userInfo.data.firstName }} {{ userInfo.data.lastName }}</label>
            </div>
            <ul class="list-unstyled">
              <li>{{ userInfo.data.email }}</li>
              <li><span>{{ _.get(userInfo.data, 'companies[0].name') }}</span></li>
            </ul>
          </div>

          <div role="tablist">
            <b-card
              v-for="(allocation, index) in userInfo.lastAllocations"
              class="device-card"
              :key="`device-card-${index}`"
              no-body
            >
              <b-card-header header-tag="header" class="p-0" role="tab">
                <b-button block href="#" v-b-toggle="`accordion-${index}`" variant="transparent" class="px-3 py-4">
                  <label>
                    <input type="checkbox">
                    <div><b>{{ allocation.device }}</b></div>
                    <div>{{ allocation.mobile_number | phone }}</div>
                    <i class="fa fa-angle-right"></i>
                  </label>
                </b-button>
              </b-card-header>
              <b-collapse :id="`accordion-${index}`" visible accordion="my-accordion" role="tabpanel">
                <b-card-body>
                  <div class="service-container">
                    <div class="device-info">
                      <b-btn variant="outline-default w-100 mb-3">Upgrade Device</b-btn>

                      <div class="row right-tag">
                        <div class="col border-right">
                          <label>BILL MONTH</label>
                          <div>{{ allocation.bill_month | cleanDate }}</div>
                        </div>
                        <div class="col">
                          <label>LAST UPGRADE</label>
                          <div v-if="allocation.last_upgrade">{{ allocation.last_upgrade | cleanDate }}</div>
                          <div v-else>N/A</div>
                        </div>
                      </div>
                    </div>

                    <div class="row price-info mt-5">
                      <div class="col-6">
                        <label>Service Plan</label>
                        <span>${{ allocation.service_plan_charge.toFixed(2) }}</span>
                      </div>
                      <div class="col-6">
                        <label>Usage</label>
                        <span>${{ allocation.usage_charge.toFixed(2) }}</span>
                      </div>
                      <div class="col-6">
                        <label>Allocation</label>
                        <span>${{ allocation.allocated_charge.toFixed(2) }}</span>
                      </div>
                      <div class="col-6">
                        <label>Other</label>
                        <span>${{ allocation.other_charge.toFixed(2) }}</span>
                      </div>
                      <div class="col-12 d-flex justify-content-center align-items-center">
                        <b-btn variant="outline-default w-100 mt-3">Info</b-btn>
                      </div>
                    </div>

                    <div class="row mt-5">
                      <div class="col-lg">
                        <div class="service-info">
                          <div class="d-flex align-items-center">
                            <div class="service-image"></div>
                            <div class="mb-0 ml-3"><b>Service Name</b></div>
                          </div>
                          <ul class="list-unstyled mt-3">
                            <li>Unlimited Voice Plan</li>
                            <li>Business Global Traveller</li>
                            <li>2GB Pooled Domestic Data Plan</li>
                            <li>Messaging 200</li>
                          </ul>
                          <b-btn variant="default w-100 mb-5">Change Service</b-btn>
                        </div>
                      </div>
                      <div class="col-lg">
                        <label>
                          <b class="d-block mb-3">Contact support:</b>
                          <ticket-type-select v-model="allocation.issue" @change="onChangeTicketIssue"/>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div class="chart-container mt-5">
                    <div>
                      <h4>Spend By Category</h4>
                      <b-card no-body class="chart-card border-0">
                        <b-card-body class="p-0">
                          <spend-chart :data="allocation"/>
                        </b-card-body>
                      </b-card>
                    </div>
                    <div class="mt-3">
                      <h4>Trend By Category</h4>
                      <b-card no-body class="chart-card border-0">
                        <b-card-body class="p-0">
                          <trend-chart :data="userInfo.lastAllocations" :mobile_number="allocation.mobile_number"/>
                        </b-card-body>
                      </b-card>
                    </div>
                  </div>
                </b-card-body>
              </b-collapse>
            </b-card>
          </div>
        </div>

        <!-- desktop view -->
        <div class="d-none d-lg-block">
          <div class="row">
            <div class="left-panel">
              <div class="user-container">
                <div class="mb-3">
                  <avatar
                    :username="userInfo.data.firstName + ' ' + userInfo.data.lastName"
                    :size="30"
                    inline
                  ></avatar>
                  <label class="ml-2 mb-0">{{ userInfo.data.firstName }} {{ userInfo.data.lastName }}</label>
                </div>
                <ul class="list-unstyled">
                  <li>{{ userInfo.data.email }}</li>
                  <li><span>{{ _.get(userInfo.data, 'companies[0].name') }}</span></li>
                </ul>
              </div>

              <div class="device-container">
                <h4 class="mt-5">Devices</h4>
                <ul class="list-unstyled">
                  <li
                    v-for="(allocation, index) in userInfo.lastAllocations"
                    :key="`device-item-${index}`"
                    no-body
                  >
                    <label @click="setAllocation(allocation)">
                      <input type="checkbox">
                      <div><b>{{ allocation.device }}</b></div>
                      <div>{{ allocation.mobile_number | phone }}</div>
                      <i class="fa fa-angle-right"></i>
                    </label>
                  </li>
                </ul>
              </div>

              <div class="setting-container">
                <h4 class="mt-5">Settings</h4>
                <div class="mt-4 mb-2">Data View</div>
                <select>
                  <option>Me</option>
                  <option>Supervisor</option>
                </select>
              </div>
            </div>
            <div class="col right-panel" v-if="activeAllocation">
              <div class="order-type-container d-flex w-100 mx-0 mb-5">
                <div class="media px-4 py-2">
                  <div class="d-flex">
                    <i class="fas fa-rocket"></i>
                  </div>
                  <div class="media-body">
                    <div><b>Order a New Line of Service</b></div>
                    <div>With new device</div>
                  </div>
                </div>
                <div class="media px-4 py-2">
                  <div class="d-flex">
                    <i class="fas fa-exchange"></i>
                  </div>
                  <div class="media-body">
                    <div><b>Transfer Wireless Services Liability</b></div>
                    <div>Includes an option to order new device</div>
                  </div>
                </div>
                <div class="media px-4 py-2">
                  <div class="d-flex">
                    <i class="fas fa-headphones"></i>
                  </div>
                  <div class="media-body">
                    <div><b>Order Accessories</b></div>
                    <div>Headphones, charges, bags</div>
                  </div>
                </div>
              </div>

              <div class="right-panel__body">
                <div class="service-container">
                  <div class="row justify-content-between device-info">
                    <div class="col">
                      <div class="d-flex align-items-center">
                        <h4 class="d-inline-block">{{ activeAllocation.device }}</h4>
                        <span class="badge bg-success ml-2 px-2 py-1">Active</span>
                      </div>
                      <div class="mt-2">{{ activeAllocation.mobile_number | phone }}</div>
                      <div class="mt-3">
                        <span v-if="!upgradeEnabled">Not Eligible for Upgrade</span>
                        <b-btn v-else variant="outline-default mb-3" @click="toggleUpgradeDrawer()">Upgrade Device</b-btn>
                      </div>
                    </div>
                    <div>
                      <div class="row right-tag">
                        <div class="col">
                          <label>BILL MONTH</label>
                          <div>{{ activeAllocation.bill_month | cleanDate }}</div>
                        </div>
                        <div class="col">
                          <label>LAST UPGRADE</label>
                          <div v-if="activeAllocation.last_upgrade">{{ activeAllocation.last_upgrade | cleanDate }}</div>
                          <div v-else>N/A</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row price-info mt-5 mx-0">
                    <div class="col-6 col-sm-3 col-lg-2">
                      <label>Service Plan</label>
                      <span>${{ activeAllocation.service_plan_charge.toFixed(2) }}</span>
                    </div>
                    <div class="col-6 col-sm-3 col-lg-2">
                      <label>Usage</label>
                      <span>${{ activeAllocation.usage_charge.toFixed(2) }}</span>
                    </div>
                    <div class="col-6 col-sm-3 col-lg-2">
                      <label>Allocation</label>
                      <span>${{ activeAllocation.allocated_charge.toFixed(2) }}</span>
                    </div>
                    <div class="col-6 col-sm-3 col-lg-2">
                      <label>Other</label>
                      <span>${{ activeAllocation.other_charge.toFixed(2) }}</span>
                    </div>
                    <div class="col-sm-12 col-lg-4 d-flex justify-content-center align-items-center">
                      <b-btn variant="outline-default px-5 my-3">Info</b-btn>
                    </div>
                  </div>

                  <div class="row mt-5">
                    <div class="col-lg">
                      <div class="service-info">
                        <div class="media">
                          <div class="media-body"><b>Service Name</b></div>
                          <div class="media-image"></div>
                        </div>
                        <ul class="list-unstyled">
                          <li>Unlimited Voice Plan</li>
                          <li>Business Global Traveller</li>
                          <li>2GB Pooled Domestic Data Plan</li>
                          <li>Messaging 200</li>
                        </ul>
                      </div>
                    </div>
                    <div class="col-lg">
                      <label>
                        <b class="d-block mb-3">Contact support:</b>
                        <ticket-type-select v-model="activeAllocation.issue" @change="onChangeTicketIssue"/>
                      </label>
                    </div>
                  </div>
                </div>

                <div class="chart-container mt-5">
                  <b-row>
                    <b-col md="6">
                      <h4>Spend By Category</h4>
                      <b-card no-body class="chart-card border-0">
                        <b-card-body class="p-0">
                          <spend-chart :data="activeAllocation"/>
                        </b-card-body>
                      </b-card>
                    </b-col>
                    <b-col md="6">
                      <h4>Trend By Category</h4>
                      <b-card no-body class="chart-card border-0">
                        <b-card-body class="p-0">
                          <trend-chart :data="userInfo.lastAllocations" :mobile_number="activeAllocation.mobile_number"/>
                        </b-card-body>
                      </b-card>
                    </b-col>
                  </b-row>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        
      <drawer :open="showUpgradeDrawer" @close="toggleUpgradeDrawer()">
        <div>ABC</div>
      </drawer>

      <drawer :open="welcome.visible" @close="toggleWelcomeDrawer()">
        <div class="d-flex flex-column welcome-container">
          <div class="welcome-image">
          </div>
          <div class="px-5">
            <h3 class="pt-5">Welcome!</h3>
            <div
              class="pt-5"
              v-html=" _.get(clientInfo.data, 'metadata.header', '')"
            ></div>
            <div class="pt-5">
              <b-btn
                variant="default"
                @click="toggleWelcomeDrawer()"
              >Got It!</b-btn>
              <b-form-checkbox
                id="do_not_show_again_checkbox"
                v-model="welcome.do_not_show_again"
                name="do_not_show_again_checkbox"
                class="d-inline-block ml-3"
              >Don't show again</b-form-checkbox>
            </div>
          </div>
        </div>
      </drawer>

      <!-- <div class="contact-container">
        <div class="row">
          <div class="col-lg-3">
            <h4 class="mb-3">Support Information</h4>
          </div>
          <div class="col-lg-9" v-html="_.get(clientInfo.data, 'metadata.support_information', '')"></div>
        </div>
      </div> -->
    </div>

    <legacy-dashboard v-else-if="$store.state.feature.enabled_dashboard_legacy"/>
  </div>
</template>

<script src="./dashboard.ctrl.js" lang="babel"></script>
