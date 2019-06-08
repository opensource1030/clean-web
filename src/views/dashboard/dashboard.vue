<template>
  <div class="page dashboard-page">
    <div class="tag-header bg-info">
      {{ _.get(clientInfo.data, 'metadata.portal_header', 'Dashboard') }}
    </div>
    <b-card no-body class="client-info-card">
      <b-card-body>
        <spinner v-if="clientInfo.loading" />
        <div v-else>
          <div v-html="_.get(clientInfo.data, 'content', '')"></div>
        </div>
      </b-card-body>
    </b-card>

    <div class="mb-4">
      <div class="tag-header bg-info">
        Overview
      </div>
      <b-card no-body class="user-info-card border-0">
        <b-card-body class="p-0">
          <spinner v-if="userInfo.loading" />
          <div v-else>
            <div class="row mx-0">
              <div class="col-md border">
                <b-row>
                  <b-col class="field-container border-right">
                    <div class="field">
                      <label class="bold">User</label>
                      <span class="sub-text">{{ userInfo.data.firstName }} {{ userInfo.data.lastName }}</span>
                    </div>
                  </b-col>
                  <b-col class="field-container">
                    <div class="field">
                      <label class="bold color-tuatara">Device</label>
                      <span class="sub-text">{{ userInfo.lastAllocations[activeAllocationIndex].device }}</span>
                    </div>
                  </b-col>
                  <div class="w-100 border-bottom"></div>
                  <b-col class="field-container border-right">
                    <div class="field">
                      <label class="bold color-tuatara">Bill Month</label>
                      <span class="sub-text">{{ userInfo.lastAllocations[activeAllocationIndex].bill_month | cleanDate }}</span>
                    </div>
                  </b-col>
                  <b-col class="field-container">
                    <div class="field">
                      <label class="bold color-tuatara">Mobile No</label>
                      <router-link
                        :to="{ name: 'Mobile Charges', params: {id: userInfo.lastAllocations[activeAllocationIndex].id}}"
                        class="alloc_mblnumber"
                        v-html="userInfo.lastAllocations[activeAllocationIndex].mobile_number"
                      ></router-link>
                    </div>
                  </b-col>
                  <div class="w-100 border-bottom"></div>
                  <b-col class="field-container">
                    <div class="field">
                      <label class="bold color-tuatara">Last Upgrade Date</label>
                      <span v-if="userInfo.lastAllocations[activeAllocationIndex].last_upgrade" class="color-orange bold">{{ userInfo.lastAllocations[activeAllocationIndex].last_upgrade | cleanDate }}</span>
                      <span v-else>N/A</span>
                    </div>
                  </b-col>
                </b-row>
              </div>

              <div class="col-md field-container order-field-container">
                <div class="field">
                  <label class="bold color-tuatara">Order Catalog</label>
                  <div class="div-img" style="whidth: 100%;">
                    <img class="img-phone" src="@/assets/images/phone-mifi-tablet.svg">
                  </div>
                  <b-btn
                    v-if="checkIfOrderable()"
                    @click="$router.push({ name: 'legacyInfo' })"
                    variant="primary"
                    class="btn-lg"
                  >Place an Order</b-btn>
                  <b-btn
                    v-else
                    @click="orderDisabled()"
                    variant="primary"
                    class="btn-lg"
                  >Place an Order</b-btn>
                </div>
              </div>

              <div class="col-md border">
                <b-row>
                  <b-col class="field-container border-right">
                    <div class="field">
                      <label class="bold color-tuatara">Service Plan Charges</label>
                      <span class="bold color-orange">{{ '$' + userInfo.lastAllocations[activeAllocationIndex].service_plan_charge.toFixed(2) }}</span>
                    </div>
                  </b-col>
                  <b-col class="field-container">
                    <div class="field">
                      <label class="bold color-tuatara">Other Charges</label>
                      <span class="bold color-orange">{{ '$' + userInfo.lastAllocations[activeAllocationIndex].other_charge.toFixed(2) }}</span>
                    </div>
                  </b-col>
                  <div class="w-100 border-bottom"></div>
                  <b-col class="field-container border-right">
                    <div class="field">
                      <label class="bold color-tuatara">Usage Charges</label>
                      <span class="bold color-orange">{{ '$' + userInfo.lastAllocations[activeAllocationIndex].usage_charge.toFixed(2) }}</span>
                    </div>
                  </b-col>
                  <b-col class="field-container">
                    <div class="field">
                      <label class="bold color-tuatara">Total Allocation Charges</label>
                      <span class="bold color-orange">{{ '$' + userInfo.lastAllocations[activeAllocationIndex].allocated_charge.toFixed(2) }}</span>
                    </div>
                  </b-col>
                  <div class="w-100 border-bottom"></div>
                  <b-col class="field-container">
                    <div class="field">
                      <select
                        v-model="userInfo.lastAllocations[activeAllocationIndex].issue"
                        @change="onChangeTicketIssue"
                        id="choose-issues"
                        class="user-actions form-control"
                      >
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
                    </div>
                  </b-col>
                </b-row>
              </div>
            </div>

            <div>
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
                <a
                  @click="nextAllocation()"
                  :class="{ 'inactive': activeAllocationIndex == userInfo.lastAllocations.length - 1 }"
                  class="item-next"
                >
                  <i class="fa fa-arrow-right fa-2x"></i>
                </a>
              </div>
            </div>
          </div>
        </b-card-body>
      </b-card>
    </div>

    <b-row>
      <b-col md="6" >
        <div class="tag-header bg-info">
          Spend By Category
        </div>
        <b-card no-body class="chart-card border-0">
          <b-card-body class="p-0">
            <spinner v-if="userInfo.loading" />
            <PieChart
              v-if="!userInfo.loading && userInfo.lastAllocations.length"
              :data="userInfo.lastAllocations"
            />
          </b-card-body>
        </b-card>
      </b-col>
      <b-col md="6">
        <div class="tag-header bg-info">
          Trend By Category
        </div>
        <b-card no-body class="chart-card border-0">
          <b-card-body class="p-0">
            <spinner  v-if="userInfo.loading" />
            <TrendChart
              v-if="!userInfo.loading && userInfo.data.allocations.length"
              :data="userInfo.data.allocations"
            />
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>

    <router-view class="child"></router-view>
  </div>
</template>

<script src="./dashboard.ctrl.js" lang="babel"></script>

<style scoped>
.tag-header {
  display: inline-block;
  padding: 0px 100px 0px 20px;
  font-size: 18px;
  font-weight: 500;
  line-height: 40px;
}

.card.client-info-card >>> ul {
  margin-left: 10px;
  margin-bottom: 0;
  padding-left: 15px;
  font-size: 14px;
}
.card.client-info-card >>> ul:before {
  content: ' ' !important;
}
.card.client-info-card >>> ul li {
  /* list-style: none; */
  font-size: 16px;
  font-family: "Segoe UI", Roboto, sans-serif;
  font-weight: 300;
  line-height: 24px;
}
.card.client-info-card >>> ul li i {
  width: 16px;
}
.card.client-info-card >>> ul li a {
  font-family: "Segoe UI", Roboto, sans-serif;
  font-size: 16px;
  font-weight: 300;
}
.card.client-info-card >>> p {
  margin-bottom: 0;
  line-height: 24px;
}

/* .chart {
  width: 100%;
} */

table, th, td {
  border: 1px solid rgba(151, 151, 151, 0.3);
  border-collapse: collapse;
  background-color: white;
}

th, td {
  padding: 5px;
  text-align: center;
  vertical-align: center;
}

.sub-text {
  color: #8a8a8a;
}

.td-normal-width {
  max-width: 300px;
  width: 300px;
}

.td-normal-height {
  max-height: 300px;
  height: 100px;
}

.bold {
  font-weight: bold;
}

.color-orange {
  color: #FF690A;
}

.color-tuatara {
  color: #444;
}

.img-phone {
  width: calc(100% - 20px);
  max-width: 220px;
  height: 220px;
}

.div_img {
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
