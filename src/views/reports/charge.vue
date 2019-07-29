<template>
  <div class="animated fadeIn reports">
    <b-row class="px-3">
      <b-col sm="12" lg="12">
        <b-navbar toggleable="lg" class="reports-nav">
          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
              <b-nav-item active>Charge</b-nav-item>
              <b-nav-item>Data</b-nav-item>
              <b-nav-item>International</b-nav-item>
              <b-nav-item>Zero Usage</b-nav-item>
              <b-nav-item>Procurement</b-nav-item>
            </b-navbar-nav>

            <b-navbar-nav class="ml-auto">
              <b-select v-model="selectedCompany" :options="companies" placeholder="Select company"></b-select>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </b-col>
    </b-row>

    <b-row class="filter-form p-3">
      <b-col sm="12" md="6" xl="2">
        <div class="d-flex align-items-center">
          <i class="icon-magnifier filter-icon"></i>
          <b-input v-model="mobileOrUsername" placeholder="Mobile number or user name..." trim></b-input>
        </div>
      </b-col>
      <b-col
        sm="12"
        md="6"
        xl="2"
        class="filter py-2"
        v-for="(filter, index) in defaultFilters"
        :key="index"
      >
        <label class="filter-label">{{filter.text}}</label>
        <b-select class="filter-select" v-model="filter.selected" :options="filter.options"></b-select>
      </b-col>
    </b-row>

    <b-row class="px-3">
      <b-col sm="12" lg="12">
        <div class="reports-table p-3">
          <b-table
            responsive
            outlined
            selectable
            show-empty
            :items="items"
            :fields="fields"
            :current-page="currentPage"
            :per-page="perPage"
          >
            <template
              v-for="(field, index) in fields"
              :slot="`HEAD_${field.key}`"
              slot-scope="data"
            >
              <div class="table-header-wrapper" v-bind:class="{'with-select': !!field.filter}">
                {{field.text}}
                <b-select
                  class="mt-2"
                  v-if="field.filter"
                  v-model="field.filter.selected"
                  :options="field.filter.options"
                ></b-select>
              </div>
            </template>
          </b-table>

          <nav v-if="totalRows > 0" class="reports-table-pagination">
            <div class="reports-table-page-size">
              <span>Show</span>
              <b-select class="mx-2 w-auto" v-model="perPage" :options="pageSizes"></b-select>
              <span>Per page</span>
            </div>
            <div class="reports-table-page-nav">
              <b-pagination
                v-model="currentPage"
                :total-rows="totalRows"
                :per-page="perPage"
                hide-goto-end-buttons
              />
            </div>
          </nav>
        </div>
      </b-col>
    </b-row>
    <!-- <b-row>
      <b-col sm="12" lg="12">
        <div class="tag-header bg-info">
          Filters
        </div>
        <b-card class="bg-blue">
          <b-row>
            <b-col sm="12" lg="12">
              <div class="report_filter filter_select" v-for="(filter, index) in filters" :key="index">
                <label>{{filter.name}}</label>
                <multiselect v-model="filterValues[index]" :options="filter.udlvalues" track-by="id" label="udlValue" :searchable="true" :close-on-select="true" :show-labels="false" placeholder="-- Select --">
                  <template slot="singleLabel" slot-scope="{ option }">{{option.udlValue}}</template>
                </multiselect>
              </div>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>

    <b-row>
      <b-col sm="12" lg="12">
        <div class="tag-header bg-info">
          Reports - Charge
        </div>
        <b-card class="bg-white">
          <b-col sm="12" lg="12">
            <div class="d-flex justify-content-end mb-3">
              <b-button class="mr-2" @click="applyFilter">Apply Filters</b-button>
              <b-dropdown class="export-report" text="Export As" right>
                <b-dropdown-item>CSV</b-dropdown-item>
                <b-dropdown-item>PDF</b-dropdown-item>
              </b-dropdown>
            </div>

            <b-table hover striped responsive :items="items" :fields="fields" :current-page="currentPage" :per-page="perPage">
              <template slot="thead-top" slot-scope="data">
                <tr>
                  <th colspan="7">&nbsp;</th>
                  <th colspan="5" class="text-center charge-cols">CHARGES</th>
                  <th colspan="7" class="text-center usage-cols">USAGES</th>
                </tr>
              </template>
            </b-table>

            <nav class="d-flex justify-content-between align-items-center">
              <div class="select-wrapper pagination-size">
                Show &nbsp;
                <multiselect v-model="perPage" :options="pageSizes" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false"></multiselect>
                &nbsp; Per Page
              </div>
              <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" hide-goto-end-buttons/>
            </nav>
          </b-col>
        </b-card>
      </b-col>
    </b-row>-->
  </div>
</template>

<script>
import _ from "lodash";
import companyAPI from "@/api/company-api";
import employeeAPI from "@/api/employee-api";
import { Storage, Utils, Log } from "@/helpers";

const { Store } = require("yayson")();
const store = new Store();

export default {
  name: "charge",
  components: {},

  data() {
    return {
      selectedCompany: 1,
      mobileOrUsername: null,
      companies: [
        { value: 1, text: "Thermo Fisher" },
        { value: 2, text: "Google" }
      ],
      defaultFilters: [
        {
          key: "bill_cycle",
          text: "Bill cycle",
          options: [
            { value: null, text: "All" },
            { value: "2019-07", text: "Jul 2019" },
            { value: "2019-06", text: "Jun 2019" },
            { value: "2019-05", text: "May 2019" },
            { value: "2019-04", text: "Apr 2019" },
            { value: "2019-03", text: "Mar 2019" },
            { value: "2019-02", text: "Feb 2019" }
          ],
          selected: null
        },
        {
          key: "account_number",
          text: "Account No",
          options: [
            { value: null, text: "All" },
            { value: "1342", text: "1345" },
            { value: "3452", text: "3452" },
            { value: "7483", text: "7483" },
            { value: "9375", text: "9375" },
            { value: "0138", text: "0138" },
            { value: "7602", text: "7602" }
          ],
          selected: null
        },
        {
          key: "invoice_number",
          text: "Invoice No",
          options: [
            { value: null, text: "All" },
            { value: "77481", text: "77481" },
            { value: "92785", text: "92785" },
            { value: "91857", text: "91857" },
            { value: "10293", text: "10293" },
            { value: "15364", text: "15364" },
            { value: "84736", text: "84736" }
          ],
          selected: null
        },
        {
          key: "country",
          text: "Country",
          options: [
            { value: null, text: "All" },
            { value: "US", text: "United States" },
            { value: "CA", text: "Canada" },
            { value: "UK", text: "United Kingdom" },
            { value: "FR", text: "France" },
            { value: "IT", text: "Italy" }
          ],
          selected: null
        },
        {
          key: "region",
          text: "Region",
          options: [
            { value: null, text: "All" },
            { value: "RG1", text: "Region 1" },
            { value: "RG2", text: "Region 2" },
            { value: "RG3", text: "Region 3" },
            { value: "RG4", text: "Region 4" },
            { value: "RG5", text: "Region 5" }
          ],
          selected: null
        }
      ],
      mobileOrUsername: "",
      fields: [],
      pageSizes: [10, 25, 50, 100],
      perPage: 10,
      currentPage: 1,
      items: [],
      filterValues: []
    };
  },
  computed: {
    totalRows() {
      return this.items.length;
    },

    filterableFields() {
      return this.fields.filter(field => !!field.filter);
    }
  },
  created() {
    const compo = this;
    const profile = Utils.parseJsonString(Storage.get("profile"));

    for (let i = 0; i < 50; i++) {
      this.items.push({
        division: `Division${(i % 3) + 1}`,
        location_city: `Location${(i % 3) + 1}`,
        hfm_codes: `HFM Code${(i % 3) + 1}`,
        cost_center_code: `Cost center code${(i % 3) + 1}`,
        gl: `GL${(i % 3) + 1}`,
        legacy: `Legacy${(i % 3) + 1}`,
        mobile_number: `Mobile${(i % 3) + 1}`,
        username: `User${(i % 3) + 1}`,
        carrier: `Carrier${(i % 3) + 1}`,
        currency: `Currrency${(i % 3) + 1}`,
        allocation: `Allocation${(i % 3) + 1}`,
        bb: `BB${(i % 3) + 1}`,
        pda: `PDA${(i % 3) + 1}`,
        data_card: `Data card${(i % 3) + 1}`,
        data: `Data${(i % 3) + 1}`,
        data_kb: `Data KB${(i % 3) + 1}`,
        domestic_data: `Domestic Data${(i % 3) + 1}`,
        domestic_data_kbs: `Domestic Data KBs${(i % 3) + 1}`,
        int_data: `INT Data${(i % 3) + 1}`,
        int_kbs: `INT KBs${(i % 3) + 1}`
      });
    }

    if (this.items.length > 0) {
      const firstItem = this.items[0];

      _.forEach(_.keys(firstItem), key => {
        const uniqOptions = _.uniqBy(this.items, key);

        this.fields.push({
          key,
          text: _.upperCase(key),
          sortable: true,
          filter: {
            selected: null,
            options: [
              { value: null, text: "All" },
              ...uniqOptions.map(option => ({
                value: option[key],
                text: option[key]
              }))
            ]
          }
        });
      });
    }

    // Get Company UDLs
    const companyPayload = {
      params: {
        include: "udls.udlvalues"
      }
    };

    companyAPI.get(
      profile.companies[0].id,
      companyPayload,
      res => {
        const { udls } = store.sync(res.data);
        compo.filters = udls;
      },
      err => {
        console.log(err);
      }
    );

    // Get User Allocations
    const employeePayload = {
      params: {
        include: "allocations",
        "filter[companyId]": this.$store.state.auth.companyId
      }
    };
    employeeAPI.search(
      employeePayload,
      res => {
        const event = store.sync(res.data);
        let allocations = [];

        event.forEach(user => {
          allocations = allocations.concat(user.allocations);
        });

        // compo.items = allocations;
      },
      err => {
        console.log(err);
      }
    );
  },
  methods: {
    applyFilter: function() {
      let filterValueId = "";

      for (let i = 0; i < this.filterValues.length; i++) {
        if (this.filterValues[i]) {
          filterValueId = this.filterValues[i].id;
          break;
        }
      }

      const payload = {
        params: {
          include: "udlvalues,allocations",
          "filter[udlvalues.id]": filterValueId
        }
      };
      const comp = this;

      employeeAPI.search(
        payload,
        res => {
          const event = store.sync(res.data);
          let allocations = [];

          event.forEach(user => {
            allocations = allocations.concat(user.allocations);
          });

          // comp.items = allocations;
        },
        err => {
          console.log(err);
        }
      );
    }
  }
};
</script>

<style lang="scss" >
.reports {
  &-nav {
    padding: 0;
    background-color: white;

    .nav {
      &-item {
        text-transform: uppercase;
        font-weight: bold;
        font-size: 12px;
      }

      &-link {
        padding: 1rem !important;

        &.active {
          border-bottom: 3px solid black;
        }
      }
    }

    .navbar-collapse {
      padding: 0 2.5rem;
    }
  }

  &-table {
    font-size: 12px;
    background-color: white;
    overflow-y: scroll;

    table {
      border: 1px solid #ccc;
    }

    thead th {
      vertical-align: middle;
      outline: none;
      min-width: 180px;
      border-bottom-width: 1px;

      &::after {
        top: 0.75rem;
        right: 0.8rem !important;
      }
    }

    tbody .b-table-empty-row {
      background: transparent !important;
    }

    &-pagination {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .pagination a {
        padding: 0.5rem 0.75rem;
      }
    }

    &-page-size {
      display: flex;
      align-items: center;
    }
  }

  .filter-form {
    display: flex;
    align-items: center;
    color: #666;

    input.form-control {
      height: 30px;
      background-color: transparent;
      border-color: #aaa;
    }
  }

  .filter {
    display: flex;
    align-items: center;

    &-icon {
      background-color: #cdcdcd;
      padding: 6px;
      margin-right: 1rem;
    }

    &-label {
      margin: 0 1rem;
      font-size: 14px;
    }

    &-select {
      flex: 1;
      width: auto;
    }
  }

  .custom-select {
    height: 30px;
    appearance: none;
    -webkit-appearance: none;
    background-color: transparent;
    border: 1px solid #aaa;
    line-height: 1.2;

    &:focus {
      box-shadow: none;
    }
  }
}
</style>
