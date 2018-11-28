<template>
  <div id="dashboard">
    <order-new-select-user v-if="startedOrder" :next="beginOrder" :cancel="cancelOrder"></order-new-select-user>

    <!-- <div>{{ $store.state.scope_token.records }}</div> -->
    <div class="row expanded">
      <div class="columns small-12">
        <div class="tag-header">
          <h1>{{ _.get(clientInfo.data, 'metadata.portal_header', 'Dashboard') }}</h1>
        </div>
      </div>
      <div class="column small-12">
        <div class="grid-box">
          <div class="box-content-holder is-relative" v-if="clientInfo.loading">
            <div class="is-loading"></div>
          </div>
          <div class="box-content-holder client-info" v-else>
            <div class="row expanded">
              <div v-html="clientInfo.data.content"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row expanded m-t-25">
      <div class="columns small-12">
        <div class="tag-header">
          <h1>Overview</h1>
        </div>
      </div>
      <div class="columns small-12">
        <div class="grid-box">
          <div class="box-content-holder is-relative" v-if="userInfo.loading">
            <div class="is-loading"></div>
          </div>
          <div class="box-content-holder overview" v-else>
            <div class="row expanded" v-if="userInfo.lastAllocations.length">
              <div class="row expanded">
                <div class="device-detail first">
                  <div class="row expanded">
                    <div class="overview-item">
                      <p class="text-center">
                        <span class="bold color-tuatara">User</span>
                        <br/>
                        <span>{{userInfo.data.firstName}} {{userInfo.data.lastName}}</span>
                      </p>
                    </div>
                    <div class="overview-item last">
                      <p class="text-center">
                        <span class="bold color-tuatara">Device</span>
                        <br/>
                        <span>{{userInfo.lastAllocations[activeAllocationIndex].device}}</span>
                      </p>
                    </div>
                  </div>
                  <div class="row expanded">
                    <div class="overview-item">
                      <p class="text-center">
                        <span class="bold color-tuatara">Bill Month</span>
                        <br/>
                        <span>{{userInfo.lastAllocations[activeAllocationIndex].bill_month | cleanDate}}</span>
                      </p>
                    </div>
                    <div class="overview-item last">
                      <p class="text-center">
                        <span class="bold color-tuatara">Mobile No</span>
                        <br/>
                        <router-link :to="{ name: 'Mobile Charges', params: {id: userInfo.lastAllocations[activeAllocationIndex].id}}" class="alloc_mblnumber"
                          v-html="$options.filters.phone(userInfo.lastAllocations[activeAllocationIndex].mobile_number)">
                        </router-link>
                      </p>
                    </div>
                  </div>
                  <div class="row expanded">
                    <div class="overview-item full last">
                      <p class="text-center">
                        <span class="bold color-tuatara">Last Upgrade Date</span>
                        <br/>
                        <span v-if="userInfo.lastAllocations[activeAllocationIndex].last_upgrade" class="color-orange bold">{{userInfo.lastAllocations[activeAllocationIndex].last_upgrade | cleanDate}}</span>
                        <span v-else>N/A</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div class="device-image">
                  <span class="bold color-tuatara">Order Catalog</span>
                  <div></div>
                  <router-link class="button btn-round btn-started" :to="{ name: 'legacyInfo'}" v-if="userInfo.data.companies[0].shortName != 'PRXL'">Place an Order</router-link>
                  <button class="button btn-round btn-started" v-else @click="orderDisabled()">Place an Order</button>
                </div>
                <div class="device-detail second">
                  <div class="row expanded">
                    <div class="overview-item">
                      <p class="text-center">
                        <span class="bold color-tuatara">Service Plan Charges</span>
                        <br/>
                        <span class="bold color-orange">{{'$' + userInfo.lastAllocations[activeAllocationIndex].service_plan_charge.toFixed(2)}}</span>
                      </p>
                    </div>
                    <div class="overview-item last">
                      <p class="text-center">
                        <span class="bold color-tuatara">Other Charges</span>
                        <br/>
                        <span class="bold color-orange">{{'$' + userInfo.lastAllocations[activeAllocationIndex].other_charge.toFixed(2)}}</span>
                      </p>
                    </div>
                  </div>
                  <div class="row expanded">
                    <div class="overview-item">
                      <p class="text-center">
                        <span class="bold color-tuatara">Usage Charges</span>
                        <br/>
                        <span class="bold color-orange">{{'$' + userInfo.lastAllocations[activeAllocationIndex].usage_charge.toFixed(2)}}</span>
                      </p>
                    </div>
                    <div class="overview-item last">
                      <p class="text-center">
                        <span class="bold color-tuatara">Total Allocation Charges</span>
                        <br/>
                        <span class="bold color-orange">{{'$' + userInfo.lastAllocations[activeAllocationIndex].allocated_charge.toFixed(2)}}</span>
                      </p>
                    </div>
                  </div>
                  <div class="row expanded">
                    <div class="overview-item full last">
                      <p>
                        <select id="choose-issues" class="user-actions" v-model="userInfo.lastAllocations[activeAllocationIndex].issue">
                          <option disabled value="">-- Choose an issue --</option>
                          <optgroup label="Billing">
                            <option data-id="issue-4" data-support-tag="ALR4" data-value="Questions About My Monthly Statement" value="qamms">
                              Questions About My Monthly Statement
                            </option>
                            <option data-id="issue-15" data-support-tag="ALR4" data-value="Other Billing Issues" value="obi">
                              Other Billing Issues
                            </option>
                          </optgroup>
                          <optgroup label="Device Support">
                            <option data-id="issue-5" data-value="Activate My Device" data-support-tag="IRE0" value="amd">
                              Activate My Device
                            </option>
                            <option data-id="issue-3" data-value="Email Connectivity" data-support-tag="IRE0" value="ec">
                              Email Connectivity
                            </option>
                            <option data-id="issue-8" data-support-tag="IRE0" data-value="Issues While Traveling Abroad" value="iwta">
                              Issues While Traveling Abroad
                            </option>
                            <option data-id="issue-9" data-support-tag="IRE0" data-value="Other Device Support Issues" value="odsi">
                              Other Device Support Issues
                            </option>
                          </optgroup>
                          <optgroup label="Service Plan / Feature">
                            <option data-id="issue-6" data-support-tag="IRE1" data-value="Add/Remove International Features" value="aif">
                              Add/Remove International Features
                            </option>
                            <option data-id="issue-10" data-support-tag="IRE1" data-value="Cancel Service" value="cs">
                              Cancel Service
                            </option>
                            <option data-id="issue-2" data-support-tag="IRE1" data-value="Change Existing Features" value="cef">
                              Change Existing Features
                            </option>
                            <option data-id="issue-12" data-support-tag="IRE1" data-value="Suspend/Unsuspend Wireless Service" value="sws">
                              Suspend/Unsuspend Wireless Service
                            </option>
                            <option data-id="issue-13" data-support-tag="IRE1" data-value="Transfer Service to a Personal Account" value="tstpa">
                              Transfer Service to a Personal Account
                            </option>
                            <option data-id="issue-14" data-support-tag="IRE1" data-value="Other Service and Plan Issues" value="osapi">
                              Other Service and Plan Issues
                            </option>
                          </optgroup>
                        </select>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row expanded">
                <div class="custom-pagination">
                  <a class="item-prev" :class="{ 'inactive': activeAllocationIndex == 0 }" @click="prevAllocation()">
                    <i class="fa fa-arrow-left fa-2x"></i>
                  </a>
                  <div class="pagination-pages">
                    <div class="group">
                      <a class="page-item" v-for="(allocation, index) in userInfo.lastAllocations"
                        :class="{ 'active': activeAllocationIndex == index}" @click="setAllocation(index)"></a>
                    </div>
                    <div class="clearfix"></div>
                  </div>
                  <a class="item-next" :class="{ 'inactive': activeAllocationIndex == userInfo.lastAllocations.length - 1 }"
                    @click="nextAllocation()">
                    <i class="fa fa-arrow-right fa-2x"></i>
                  </a>
                </div>
              </div>
            </div>
            <div class="row expanded" v-else>
              <div class="row expanded">
                <div class="device-detail first"></div>
                <div class="device-image">
                  <span class="bold color-tuatara">Order Catalog</span>
                  <div></div>
                  <router-link class="button btn-round btn-started" :to="{ name: 'legacyInfo'}" v-if="userInfo.data.companies[0].shortName != 'PRXL'">Place an Order</router-link>
                  <button class="button btn-round btn-started" v-else @click="orderDisabled()">Place an Order</button>
                </div>
                <div class="device-detail second"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--
    <div class="row expanded m-t-25">
      <div class="columns small-12">
        <div class="tag-header">
          <h1>Place Order</h1>
        </div>
      </div>
      <div class="column small-12">
        <div class="grid-box">
          <div class="box-content-holder place-order">
            <div class="row expanded p-20">
              <div class="columns small-12 medium-4 each-order" @click="selectOrderType('new')">
                <i class="fa fa-wrench fa-5x" :class="{ active: selectedOrder == 'new' }"></i>
                <p class="ft-18 m-t-15 m-b-0">Order a New Line of Service</p>
                <p class="ft-13 italic bold black">with new device</p>
              </div>
              <div class="columns small-12 medium-4 each-order" @click="selectOrderType('transfer')">
                <i class="fa fa-random fa-5x" :class="{ active: selectedOrder == 'transfer' }"></i>
                <p class="ft-18 m-t-15 m-b-0">Transfer Wireless Service Liability</p>
                <p class="ft-13 italic bold black">also includes option to order a new device</p>
              </div>
              <div class="columns small-12 medium-4 each-order" @click="selectOrderType('accessories')">
                <i class="fa fa-headphones fa-5x" :class="{ active: selectedOrder == 'accessories' }"></i>
                <p class="ft-18 m-t-15 m-b-0">Order Accessories</p>
                <p class="ft-13 italic bold black">headphones, chargers, bags</p>
              </div>
              <div class="columns small-12 text-center">
                <button class="button large m-t-25" :disabled="disabledBeginOrder" @click="placeOrder()">Begin Order</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    -->

    <div class="row expanded m-t-25">
      <div class="columns small-12 large-6 no-padding">
        <div class="row expanded">
          <div class="columns small-12">
            <div class="tag-header">
              <h1>Spend By Category</h1>
            </div>
          </div>
          <div class="columns small-12">
            <div class="grid-box">
              <div class="box-content-holder is-relative" v-if="userInfo.loading">
                <div class="is-loading"></div>
              </div>
              <div class="box-content-holder no-padding" v-else>
                <PieChart :data="userInfo.lastAllocations" v-if="userInfo.lastAllocations.length"></PieChart>
                <div class="row expanded no-data" v-else>
                  <p class="text-center bold black ft-18 m-b-15 m-t-15">N/A</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="columns small-12 large-6 no-padding">
        <div class="row expanded">
          <div class="columns small-12">
            <div class="tag-header">
              <h1>Trend By Category</h1>
            </div>
          </div>
          <div class="columns small-12">
            <div class="grid-box">
              <div class="box-content-holder is-relative" v-if="userInfo.loading">
                <div class="is-loading"></div>
              </div>
              <div class="box-content-holder no-padding" v-else>
                <TrendChart :data="userInfo.data.allocations" v-if="userInfo.data.allocations.length"></TrendChart>
                <div class="row expanded no-data" v-else>
                  <p class="text-center bold black ft-18 m-b-15 m-t-15">N/A</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <router-view class="child"></router-view>
  </div>
</template>

<script src="./dashboard.ctrl.js" lang="babel"></script>
