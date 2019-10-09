<template>
  <div>
    <div v-if="$store.state.feature.enabled_dashboard_nextgen" class="page dashboard-page">
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
              <li>
                <span>{{ _.get(userInfo.data, 'companies[0].name') }}</span>
              </li>
            </ul>
          </div>

          <div role="tablist" v-if="userInfo.lastAllocations.length > 0">
            <b-card
              v-for="(allocation, index) in userInfo.lastAllocations"
              class="device-card"
              :key="`device-card-${index}`"
              no-body
            >
              <b-card-header header-tag="header" class="p-0" role="tab">
                <b-button
                  block
                  v-b-toggle="`accordion-${index}`"
                  variant="transparent"
                  @click.stop="setAllocationForMe(allocation)"
                  class="px-3 py-4"
                >
                  <label>
                    <input type="checkbox" />
                    <div>
                      <b>{{ allocation.device }}</b>
                    </div>
                    <div>{{ allocation.mobile_number | phone }}</div>
                    <i class="fa fa-angle-right"></i>
                  </label>
                </b-button>
              </b-card-header>
              <b-collapse
                :id="`accordion-${index}`"
                visible
                accordion="my-accordion"
                role="tabpanel"
              >
                <b-card-body>
                  <div class="service-container">
                    <div class="device-info">
                      <b-btn variant="outline-default w-100 mb-3">Upgrade Device</b-btn>

                      <div class="row right-tag">
                        <div class="col border-right">
                          <label>BILL MONTH</label>
                          <div>{{ allocation.bill_month | cleanDate }}</div>
                        </div>
                        <div class="col border-right">
                          <label>CYCLE DATES</label>
                          <div>N/A</div>
                        </div>
                        <div class="col">
                          <label>CONTRACT END DATE</label>
                          <div>N/A</div>
                        </div>
                      </div>
                    </div>

                    <div class="row price-info mt-5">
                      <div class="col-6">
                        <label>Total</label>
                        <span>{{ evaluateAllocation(allocation).total | currency }}</span>
                      </div>
                      <div class="col-6">
                        <label>Plan</label>
                        <span>{{ evaluateAllocation(allocation).plan | currency }}</span>
                      </div>
                      <div class="col-6">
                        <label>Usage</label>
                        <span>{{ evaluateAllocation(allocation).usage | currency }}</span>
                      </div>
                      <div class="col-6">
                        <label>Other</label>
                        <span>{{ evaluateAllocation(allocation).other | currency }}</span>
                      </div>
                      <div
                        v-if="$store.state.feature.enabled_dashboard_report_details"
                        class="col-12 d-flex justify-content-center align-items-center"
                      >
                        <b-btn
                          variant="outline-default w-100 mt-3"
                          @click="billDetails(allocation)"
                        >Bill Details</b-btn>
                      </div>
                    </div>

                    <div class="row mt-5">
                      <div class="col-lg">
                        <div class="service-info">
                          <div class="d-flex align-items-center">
                            <div class="service-image"></div>
                            <div class="mb-0 ml-3">
                              <b>Service Name</b>
                            </div>
                          </div>
                          <ul class="list-unstyled mt-3">
                            <!-- <li>Unlimited Voice Plan</li>
                            <li>Business Global Traveller</li>
                            <li>2GB Pooled Domestic Data Plan</li>
                            <li>Messaging 200</li>-->
                            <li>N/A</li>
                          </ul>
                          <b-btn variant="default w-100 mb-5">Change Service</b-btn>
                        </div>
                      </div>
                      <div class="col-lg">
                        <label>
                          <b class="d-block mb-3">Contact support:</b>
                          <ticket-type-select
                            v-model="allocation.issue"
                            @change="onChangeTicketIssue"
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  <div class="chart-container mt-5">
                    <div>
                      <h4>Spend By Category</h4>
                      <b-card no-body class="chart-card border-0">
                        <b-card-body class="p-0">
                          <spend-chart :data="allocation" />
                        </b-card-body>
                      </b-card>
                    </div>
                    <div class="mt-3">
                      <h4>Trend By Category</h4>
                      <b-card no-body class="chart-card border-0">
                        <b-card-body class="p-0">
                          <trend-chart
                            :data="userInfo.data.allocations"
                            :mobile_number="allocation.mobile_number"
                          />
                        </b-card-body>
                      </b-card>
                    </div>
                    <div>Headphones, charges, bags</div>
                  </div>
                </b-card-body>
              </b-collapse>
            </b-card>
          </div>

          <div class="empty-container pt-5" v-else>
            <i class="fas fa-cogs mt-5"></i>
            <h4 class="mt-3">
              You have no devices
              <br />to analyze yet
            </h4>
            <p class="mt-4">
              <router-link to="/">Order a new line of service</router-link>or
              <router-link to="/">transfer wireless services liability</router-link>
              <br />to add new device
            </p>
            <label class="mt-5">
              <b class="d-block">If you think there's a mistake,</b>
              <b class="d-block mb-3">Contact support:</b>
              <ticket-type-select v-model="issue" @change="onChangeTicketIssue" />
            </label>
          </div>
        </div>

        <!-- desktop view -->
        <div class="d-none d-lg-block">
          <div class="row mx-0">
            <div v-if="!editingProfile" class="left-panel">
              <div class="user-container">
                <div class="mb-3">
                  <avatar
                    :username="userInfo.data.firstName + ' ' + userInfo.data.lastName"
                    :size="30"
                    inline
                  ></avatar>
                  <label
                    class="ml-2 mb-0"
                  >{{ userInfo.data.firstName }} {{ userInfo.data.lastName }}</label>
                </div>
                <ul class="list-unstyled">
                  <li>{{ userInfo.data.email }}</li>
                  <li>
                    <span>{{ _.get(userInfo.data, 'companies[0].name') }}</span>
                  </li>
                </ul>
                <b-btn
                  variant="outline-default w-100 edit-profile-btn"
                  @click="onEditProfile"
                >Edit Profile</b-btn>
              </div>

              <template v-if="userInfo.lastAllocations.length > 0">
                <div class="device-container">
                  <h4 class="mt-5">Devices</h4>
                  <ul class="device-list list-unstyled mt-3">
                    <li
                      v-for="(allocation, index) in userInfo.lastAllocations"
                      :key="`device-item-${index}`"
                      class="device-item"
                      :class="{ 'active':  allocation.mobile_number == activeAllocation.mobile_number }"
                      no-body
                    >
                      <label @click="setAllocationForMe(allocation)">
                        <input type="checkbox" />
                        <div>
                          <b>{{ allocation.device }}</b>
                        </div>
                        <div>{{ allocation.mobile_number | phone }}</div>
                        <i class="fa fa-angle-right"></i>
                      </label>
                    </li>
                  </ul>
                </div>

                <div
                  class="setting-container"
                  v-if="$store.state.feature.enabled_dashboard_report_view"
                >
                  <h4 class="mt-5">Settings</h4>
                  <div class="mt-4 mb-2">Data View</div>
                  <select>
                    <option>Me</option>
                    <option>Supervisor</option>
                  </select>
                </div>
              </template>

              <div v-if="canUpgradeDeviceForOthers" class="pt-2">
                <on-behalf-form
                  :selected-employee="selectedEmployee"
                  @setAllocation="setAllocationForOther"
                  @selectEmployee="setEmployeeForUpgrade"
                />
              </div>

              <div class="device-container empty mt-5" v-else>
                <i class="fas fa-mobile"></i>
                <h4 class="mt-2">
                  Your devices
                  <br />will be displayed here
                </h4>
              </div>
            </div>

            <div v-else class="left-panel">
              <profile-form @close="closeProfileForm" @submit="profileSubmit" />
            </div>

            <div class="col right-panel">
              <div class="order-type-container d-flex w-100 mx-0 mb-5">
                <div
                  class="media px-4 py-2"
                  v-if="$store.state.feature.enabled_dashboard_procure_new_line"
                  @click="$router.push({ path: '/dashboard/newline-service' })"
                >
                  <div class="d-flex">
                    <img src="@/assets/images/ic_rocket.svg" />
                  </div>
                  <div class="media-body">
                    <div>
                      <b>Order a New Line of Service</b>
                    </div>
                    <div class="media-sub">With new or existing device</div>
                  </div>
                </div>
                <div
                  class="media px-4 py-2"
                  v-if="$store.state.feature.enabled_dashboard_procure_transfer"
                  @click="$router.push({ path: '/dashboard/transfer-service' })"
                >
                  <div class="d-flex">
                    <img src="@/assets/images/ic_transfer.svg" />
                  </div>
                  <div class="media-body">
                    <div>
                      <b>Transfer Existing Mobile Number to Company Plan</b>
                    </div>
                    <div class="media-sub">Includes an option to order new device</div>
                  </div>
                </div>
                <div
                  class="media px-4 py-2"
                  v-if="$store.state.feature.enabled_dashboard_procure_accessories"
                  @click="$router.push({ path: '/dashboard/accessory' })"
                >
                  <div class="d-flex">
                    <img src="@/assets/images/ic_headphones.svg" />
                  </div>
                  <div class="media-body">
                    <div>
                      <b>Order Accessories</b>
                    </div>
                    <div class="media-sub">Charger, headset, etc</div>
                  </div>
                </div>
              </div>

              <div class="right-panel__body" v-if="userInfo.lastAllocations.length > 0">
                <div class="service-container">
                  <div class="row justify-content-between device-info">
                    <div class="col-sm-6">
                      <div>
                        <h5 class="text-dark">
                          {{ activeAllocation.carrier }}
                          <span
                            class="font-weight-light"
                          >{{ activeAllocation.mobile_number | phone }}</span>
                        </h5>
                      </div>
                      <div class="d-flex align-items-center mt-3">
                        <h4 class="d-inline-block text-dark">{{ activeAllocation.device }}</h4>
                        <span class="badge bg-success ml-2 px-2 py-1">Active</span>
                      </div>
                      <div class="mt-4">
                        <label>
                          <b>Device ID:</b>
                        </label>
                        <span>{{ allocationDeviceId }}</span>
                      </div>
                      <div>
                        <label>
                          <b>SIM:</b>
                        </label>
                        <span>{{ allocationDeviceSim }}</span>
                      </div>
                      <div class="mt-3">
                        <span v-if="!upgradeEnabled">Not Eligible for Upgrade</span>
                        <b-btn
                          v-else
                          variant="outline-default mb-3"
                          @click="onUpgradeDevice"
                        >Upgrade Device</b-btn>
                      </div>
                      <label class="mt-5">
                        <b class="d-block mb-3">Contact support:</b>
                        <ticket-type-select
                          v-model="activeAllocation.issue"
                          @change="onChangeTicketIssue"
                        />
                      </label>
                    </div>
                    <div class="col-sm-6">
                      <div class="row justify-content-end text-center">
                        <div class="col-auto border-right">
                          <label>BILL MONTH</label>
                          <div>{{ activeAllocation.bill_month | cleanDate }}</div>
                        </div>
                        <div class="col-auto border-right">
                          <label>CYCLE DATES</label>
                          <div>N/A</div>
                        </div>
                        <div class="col-auto">
                          <label>LAST UPGRADE</label>
                          <div
                            v-if="activeAllocation.last_upgrade"
                          >{{ activeAllocation.last_upgrade | cleanDate }}</div>
                          <div v-else>N/A</div>
                        </div>
                      </div>
                      <div class="service-info mt-5">
                        <div class="d-flex justify-content-between align-items-center">
                          <div>
                            <b>Service Name</b>
                          </div>
                          <div class="service-image"></div>
                        </div>
                        <ul class="list-unstyled mt-3 mb-0">
                          <!-- <li>Unlimited Voice Plan</li>
                          <li>Business Global Traveller</li>
                          <li>2GB Pooled Domestic Data Plan</li>
                          <li>Messaging 200</li>-->
                          <li>N/A</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div class="row price-info mt-5 mx-0">
                    <div class="col-6 col-sm-3 col-lg">
                      <label>Total</label>
                      <span>{{ evaluateAllocation(activeAllocation).total | currency }}</span>
                    </div>
                    <div class="col-6 col-sm-3 col-lg">
                      <label>Plan</label>
                      <span>{{ evaluateAllocation(activeAllocation).plan | currency }}</span>
                    </div>
                    <div class="col-6 col-sm-3 col-lg">
                      <label>Usage</label>
                      <span>{{ evaluateAllocation(activeAllocation).usage | currency }}</span>
                    </div>
                    <div class="col-6 col-sm-3 col-lg">
                      <label>Other</label>
                      <span>{{ evaluateAllocation(activeAllocation).other | currency }}</span>
                    </div>
                    <div
                      v-if="$store.state.feature.enabled_dashboard_report_details"
                      class="col-sm-12 col-lg-4 d-flex justify-content-center align-items-center"
                    >
                      <b-btn
                        variant="outline-default px-5 my-3"
                        @click="billDetails(activeAllocation)"
                      >Bill Details</b-btn>
                    </div>
                  </div>
                </div>

                <div class="chart-container mt-5">
                  <b-row>
                    <b-col md="6">
                      <h4>Spend By Category</h4>
                      <b-card no-body class="chart-card border-0">
                        <b-card-body class="p-0">
                          <spend-chart :data="activeAllocation" />
                        </b-card-body>
                      </b-card>
                    </b-col>
                    <b-col md="6">
                      <h4>Trend By Category</h4>
                      <b-card no-body class="chart-card border-0">
                        <b-card-body class="p-0">
                          <trend-chart
                            :data="userInfo.data.allocations"
                            :mobile_number="activeAllocation.mobile_number"
                          />
                        </b-card-body>
                      </b-card>
                    </b-col>
                  </b-row>
                </div>
              </div>

              <div class="empty-container py-5" v-else>
                <i class="fas fa-cogs mt-5"></i>
                <h4 class="mt-3">
                  You have no devices
                  <br />to analyze yet
                </h4>
                <p class="mt-4">
                  <a
                    @click.stop="$router.push({ path: '/dashboard/newline-service' })"
                  >Order a new line of service</a> or
                  <a
                    @click.stop="$router.push({ path: '/dashboard/transfer-service' })"
                  >transfer wireless services liability</a>
                  <br />to add new device
                </p>
                <label class="mt-5">
                  <b class="d-block">If you think there's a mistake,</b>
                  <b class="d-block mb-3">Contact support:</b>
                  <ticket-type-select v-model="issue" @change="onChangeTicketIssue" />
                </label>
              </div>
            </div>
          </div>
        </div>

        <order-confirm-modal :visible="hasOrder" @close="closeConfirmModal"></order-confirm-modal>
      </div>

      <drawer :open="welcome.visible" @close="toggleWelcomeDrawer()">
        <div class="d-flex flex-column welcome-container">
          <div class="welcome-image"></div>
          <div class="px-5">
            <h3 class="pt-5">Welcome!</h3>
            <div class="pt-5" v-html=" _.get(clientInfo.data, 'metadata.header', '')"></div>
            <div class="pt-5">
              <b-btn variant="default" @click="toggleWelcomeDrawer()">Got It!</b-btn>
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

      <router-view></router-view>
    </div>

    <legacy-dashboard v-else-if="$store.state.feature.enabled_dashboard_legacy" />

    <spinner v-else />
  </div>
</template>

<script src="./dashboard.ctrl.js" lang="babel"></script>
