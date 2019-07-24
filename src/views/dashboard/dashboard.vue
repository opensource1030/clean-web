<template>
  <div class="page dashboard-page">
    <div class="row">
      <div class="col-md-3">
        <h3>Welcome</h3>
      </div>
      <div class="col-md-9">
        <p>
          Welcome to the Oyster Labs Wireless Hub.
          On this site you can review your recent wireless usage and charges,
          place requests for wireless devices and services,
          and get help should you require troubleshooting or support for your company-owned wireless device.
        </p>
      </div>
    </div>

    <div class="row my-3">
      <div class="col-md-3 left-panel">
        <div class="user-container">
          <div class="mb-3">
            <avatar username="Name Surname" :size="30" inline></avatar><label class="ml-2 mb-0">Name Surname</label>
          </div>
          <ul class="list-unstyled">
            <li>Sr Java Developer, <span>R&D 110</span></li>
            <li>name.surname@company.com</li>
            <li>(941) 650-7363</li>
            <li><span>Austin, HQ</span></li>
          </ul>
        </div>
        <div class="device-container">
          <h4 class="mt-3">Devices</h4>
          <ul class="list-unstyled">
            <li>
              <label>
                <input type="checkbox">
                <div><b>Samsung</b></div>
                <div>(792) 650-7363</div>
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox">
                <div><b>iPad Gold</b></div>
                <div>(792) 650-7363</div>
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox">
                <div><b>iPhone Black</b></div>
                <div>(792) 650-7363</div>
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
      <div class="col-md-9 right-panel">
        <div class="service-container">
          <div class="row justify-content-between device-info">
            <div class="col">
              <div><h4 class="d-inline-block">Samsung Ruby ||</h4><span class="badge bg-success px-2 py-1">Active</span></div>
              <div>(941) 650-7363</div>
              <div><span>Not Eligible for Upgrade</span></div>
            </div>
            <div>
              <div class="row right-tag">
                <div class="col">
                  <label>BILL MONTH</label>
                  <div>Feb 2016</div>
                </div>
                <div class="col">
                  <label>LAST UPGRADE</label>
                  <div>N/A</div>
                </div>
              </div>
            </div>
          </div>

          <div class="row price-info mt-5">
            <div class="col-sm-3 col-md-2">
              <label>Service Plan</label>
              <span>$39.99</span>
            </div>
            <div class="col-sm-3 col-md-2">
              <label>Usage</label>
              <span>$0.00</span>
            </div>
            <div class="col-sm-3 col-md-2">
              <label>Allocation</label>
              <span>$0.00</span>
            </div>
            <div class="col-sm-3 col-md-2">
              <label>Other</label>
              <span>$0.00</span>
            </div>
            <div class="col-sm-12 col-md-4 d-flex justify-content-center align-items-center">
              <b-btn variant="outline-success px-5">Info</b-btn>
            </div>
          </div>

          <div class="row detail-info mt-5">
            <div class="col-md">
              <label>Service Name</label>
              <ul class="list-unstyled">
                <li>Unlimited Voice Plan</li>
                <li>Business Global Traveller</li>
                <li>2GB Pooled Domestic Data Plan</li>
                <li>Messaging 200</li>
              </ul>
            </div>
            <div class="col-md">
              <label>
                Contact support:
                <select
                  class="form-control"
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
              </label>
            </div>
          </div>
        </div>

        <div class="chart-container mt-5">
          <b-row>
            <b-col md="6">
              <div class="tag-header bg-info">
                Spend By Category
              </div>
              <b-card no-body class="chart-card border-0">
                <b-card-body class="p-0">
                  <spinner v-if="userInfo.loading" />
                  <PieChart
                    v-else-if="userInfo.lastAllocations.length"
                    :data="userInfo.lastAllocations"
                  />
                  <div v-else class="p-3 text-center bold border">N/A</div>
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
                    v-else-if="userInfo.data.allocations.length"
                    :data="userInfo.data.allocations"
                  />
                  <div v-else class="p-3 text-center bold border">N/A</div>
                </b-card-body>
              </b-card>
            </b-col>
          </b-row>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-3">
        <h4>Support Information</h4>
      </div>
      <div class="col-md-9">
        <ul class="list-unstyled">
          <li><i class="fa fa-envelope"></i><a href="mailto:support@wirelessanalytics.com">&nbsp; support@wirelessanalytics.com</a></li>
          <li><i class="fa fa-question"></i>&nbsp; Submit a Support Request by clicking the "Get Support" in sidebar</li>
          <li><i class="fa fa-phone"></i>&nbsp; Call the Service Desk at 978-762-0900 or 888-588-5550 and select option 1</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script src="./dashboard.ctrl.js" lang="babel"></script>
