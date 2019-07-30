<template>
  <div class="page dashboard-page">
    <!-- <div class="row">
      <div class="col-lg-3">
        <h4 class="mb-3">Welcome</h4>
      </div>
      <div class="col-lg-9" v-html=" _.get(clientInfo.data, 'metadata.header', '')"></div>
    </div> -->

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
          class="device-card"
          no-body
        >
          <b-card-header header-tag="header" class="p-0" role="tab">
            <b-button block href="#" v-b-toggle="'accordion'" variant="transparent" class="px-3 py-4">
              <label>
                <input type="checkbox">
                <div><b>Samsung</b></div>
                <div>(792) 650-7363</div>
                <i class="fa fa-angle-right"></i>
              </label>
            </b-button>
          </b-card-header>
          <b-collapse id="accordion" visible accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <div class="chart-container mt-5">
                <b-row>
                  <b-col md="6">
                    <h4>Spend By Category</h4>
                    <b-card no-body class="chart-card border-0">
                      <b-card-body class="p-0">
                        <SpendChart/>
                      </b-card-body>
                    </b-card>
                  </b-col>
                  <b-col md="6">
                    <h4>Trend By Category</h4>
                    <b-card no-body class="chart-card border-0">
                      <b-card-body class="p-0">
                        <TrendChart/>
                      </b-card-body>
                    </b-card>
                  </b-col>
                </b-row>
              </div>
            </b-card-body>
          </b-collapse>
        </b-card>

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
                <div><b>Samsung</b></div>
                <div>(792) 650-7363</div>
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
                      <div>Feb 2016</div>
                    </div>
                    <div class="col">
                      <label>LAST UPGRADE</label>
                      <div>N/A</div>
                    </div>
                  </div>
                </div>

                <div class="row price-info mt-5">
                  <div class="col-6">
                    <label>Service Plan</label>
                    <span>$39.99</span>
                  </div>
                  <div class="col-6">
                    <label>Usage</label>
                    <span>$0.00</span>
                  </div>
                  <div class="col-6">
                    <label>Allocation</label>
                    <span>$0.00</span>
                  </div>
                  <div class="col-6">
                    <label>Other</label>
                    <span>$0.00</span>
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
                    <label class="support-wrapper">
                      <b>Contact support:</b>
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
                <div>
                  <h4>Spend By Category</h4>
                  <b-card no-body class="chart-card border-0">
                    <b-card-body class="p-0">
                      <SpendChart/>
                    </b-card-body>
                  </b-card>
                </div>
                <div class="mt-3">
                  <h4>Trend By Category</h4>
                  <b-card no-body class="chart-card border-0">
                    <b-card-body class="p-0">
                      <TrendChart/>
                    </b-card-body>
                  </b-card>
                </div>
              </div>
            </b-card-body>
          </b-collapse>
        </b-card>
      </div>
    </div>

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
              <li>
                <label>
                  <input type="checkbox">
                  <div><b>Samsung</b></div>
                  <div>(792) 650-7363</div>
                  <i class="fa fa-angle-right"></i>
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox">
                  <div><b>iPad Gold</b></div>
                  <div>(792) 650-7363</div>
                  <i class="fas fa-angle-right"></i>
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox">
                  <div><b>iPhone Black</b></div>
                  <div>(792) 650-7363</div>
                  <i class="fas fa-angle-right"></i>
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
        <div class="col right-panel">
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

              <div class="row price-info mt-5 mx-0">
                <div class="col-6 col-sm-3 col-lg-2">
                  <label>Service Plan</label>
                  <span>$39.99</span>
                </div>
                <div class="col-6 col-sm-3 col-lg-2">
                  <label>Usage</label>
                  <span>$0.00</span>
                </div>
                <div class="col-6 col-sm-3 col-lg-2">
                  <label>Allocation</label>
                  <span>$0.00</span>
                </div>
                <div class="col-6 col-sm-3 col-lg-2">
                  <label>Other</label>
                  <span>$0.00</span>
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
                  <h4>Spend By Category</h4>
                  <b-card no-body class="chart-card border-0">
                    <b-card-body class="p-0">
                      <SpendChart/>
                    </b-card-body>
                  </b-card>
                </b-col>
                <b-col md="6">
                  <h4>Trend By Category</h4>
                  <b-card no-body class="chart-card border-0">
                    <b-card-body class="p-0">
                      <TrendChart/>
                    </b-card-body>
                  </b-card>
                </b-col>
              </b-row>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="contact-container">
      <div class="row">
        <div class="col-lg-3">
          <h4 class="mb-3">Support Information</h4>
        </div>
        <div class="col-lg-9" v-html="_.get(clientInfo.data, 'metadata.support_information', '')"></div>
      </div>
    </div> -->
  </div>
</template>

<script src="./dashboard.ctrl.js" lang="babel"></script>
