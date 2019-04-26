<template>
  <div>
    <div class="tag-header bg-info">
      {{ _.get(clientInfo.data, 'metadata.portal_header', 'Dashboard') }}
    </div>
    <b-card class="client-info-card">
      <div v-if="clientInfo.loading">
        <h1>LOADING</h1>
      </div>
      <div v-else>
        <div v-html="clientInfo.data.content"></div>
      </div>
    </b-card>

    <div class="mb-4">
      <div class="tag-header bg-info">
        Overview
      </div>
      <b-card>
        <div v-if="userInfo.loading">
          <h1>LOADING</h1>
        </div>
        <div v-else>
          <table style="width:100%;">
            <tr>
              <td class="td-normal-width td-normal-height">
                <p>
                  <br>
                  <span class="bold">User</span>
                  <br/>
                  <span class="sub-text">{{ userInfo.data.firstName }} {{ userInfo.data.lastName }}</span>
                </p>
              </td>
              <td class="td-normal-width td-normal-height">
                <p class="text-center">
                  <br>
                  <span class="bold color-tuatara">Device</span>
                  <br/>
                  <span class="sub-text">{{ userInfo.lastAllocations[activeAllocationIndex].device }}</span>
                </p>
              </td>
              <td rowspan="3" style="width: 400px;">
                <span class="bold color-tuatara">Order Catalog</span>
                  <div class="div-img" style="whidth: 100%;">
                    <img class="img-phone" src="../../images/phone-mifi-tablet.svg">
                  </div>
                  <b-btn v-if="checkIfOrderable()" class="btn-lg bg-primary"><router-link :to="{ name: 'legacyInfo' }" style="color: white;">Place an Order</router-link></b-btn>
                  <b-btn v-else @click="orderDisabled()" class="btn-lg bg-primary" style="color: white;">Place an Order</b-btn>
              </td>
              <td class="td-normal-width td-normal-height">
                <p class="text-center">
                  <br>
                  <span class="bold color-tuatara">Service Plan Charges</span>
                  <br/>
                  <span class="bold color-orange">{{ '$' + userInfo.lastAllocations[activeAllocationIndex].service_plan_charge.toFixed(2) }}</span>
                </p>
              </td>
              <td class="td-normal-width td-normal-height">
                <p class="text-center">
                  <br>
                  <span class="bold color-tuatara">Other Charges</span>
                  <br/>
                  <span class="bold color-orange">{{ '$' + userInfo.lastAllocations[activeAllocationIndex].other_charge.toFixed(2) }}</span>
                </p>
              </td>
            </tr>
            <tr>
              <td class="td-normal-width td-normal-height">
                <p class="text-center">
                  <br>
                  <span class="bold color-tuatara">Bill Month</span>
                  <br/>
                  <span class="sub-text">{{ userInfo.lastAllocations[activeAllocationIndex].bill_month | cleanDate }}</span>
                </p>
              </td>
              <td class="td-normal-width td-normal-height">
                <p class="text-center">
                  <br>
                  <span class="bold color-tuatara">Mobile No</span>
                  <br/>
                  <router-link :to="{ name: 'Mobile Charges', params: {id: userInfo.lastAllocations[activeAllocationIndex].id}}" class="alloc_mblnumber" 
                  v-html="userInfo.lastAllocations[activeAllocationIndex].mobile_number"
                  ></router-link>
                </p>
              </td>
              <td class="td-normal-width td-normal-height">
                <p class="text-center">
                  <br>
                  <span class="bold color-tuatara">Usage Charges</span>
                  <br/>
                  <span class="bold color-orange">{{ '$' + userInfo.lastAllocations[activeAllocationIndex].usage_charge.toFixed(2) }}</span>
                </p>
              </td>
              <td class="td-normal-width td-normal-height">
                <p class="text-center">
                  <br>
                  <span class="bold color-tuatara">Total Allocation Charges</span>
                  <br/>
                  <span class="bold color-orange">{{ '$' + userInfo.lastAllocations[activeAllocationIndex].allocated_charge.toFixed(2) }}</span>
                </p>
              </td>
            </tr>
            <tr>
              <td class="td-normal-height" colspan="2">
                <p class="text-center">
                  <br>
                  <span class="bold color-tuatara">Last Upgrade Date</span>
                  <br/>
                  <span v-if="userInfo.lastAllocations[activeAllocationIndex].last_upgrade" class="color-orange bold">{{userInfo.lastAllocations[activeAllocationIndex].last_upgrade | cleanDate}}</span>
                  <span v-else>N/A</span>
                </p>
              </td>
              <td class="td-normal-height" colspan="2">
                <p>
                  <select id="choose-issues" class="user-actions form-control" v-model="userInfo.lastAllocations[activeAllocationIndex].issue">
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
              </td>
            </tr>
          </table>
        </div>
      </b-card>
    </div>
    <b-row>
      <b-col cols="6">
        <div class="tag-header bg-info">
          Spend By Category
        </div>
        <b-card class="chart">
          <b-card-body>
            <div v-if="userInfo.loading">
              <h1>LOADING</h1>
            </div>
            <PieChart
              v-if="!userInfo.loading && userInfo.lastAllocations.length"
              :data="userInfo.lastAllocations"
            />
          </b-card-body>
        </b-card>
      </b-col>
      <b-col cols="6">
        <div class="tag-header bg-info">
          Trend By Category
        </div>
        <b-card class="chart">
          <b-card-body>
            <div v-if="userInfo.loading">
              <h1>LOADING</h1>
            </div>
            <TrendChart
              v-if="!userInfo.loading && userInfo.data.allocations.length"
              :data="userInfo.data.allocations"
            />
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script src="./dashboard.ctrl.js" lang="babel"></script>

<style scoped>
  .tag-header {
    display: inline-block;
    /* min-width: 200px; */
    padding: 10px 15px;
    font-weight: 500;
  }

  .card.client-info-card >>> ul {
    margin-bottom: 0;
    padding-left: 15px;
  }
  .card.client-info-card >>> ul:before {
    content: ' ' !important;
  }
  .card.client-info-card >>> ul li {
    list-style: none;
    line-height: 20px;
  }
  .card.client-info-card >>> p {
    margin-bottom: 0;
    line-height: 24px;
  }

  .chart {
    width: 100%;
  }

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
    color: rgba(151, 151, 151, 0.3)
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
