<template>
  <div>
    <div id="tables">
      <div class="header"></div>
      <div class="expanded row">
        <div class="large-12 columns titles">
          <h4>{{names.packagePlans}}</h4>
        </div>
        <div class="large-4 columns">
          <a class="button buttonTable" href="/package">{{names.addPackage}}</a>
        </div>
        <searchCost :callback="onSelectColumn" :show="search.searchShow" v-model="search" :search="search" ></searchCost>
        <div v-show="!loading" class="small-12 columns">
          <table cellspacing=0 cellpadding=0>
            <thead>
              <tr>
                <th height="70" width="10%" style="color: #FF690A; box-sizing: border-box; font-weight: bold; font-size: 18px; padding: 0px 0px 3px 13px;">
                  <span>{{names.manage}}</span>
                </th>
                <th title="The Name of the Package" width="25%" style="color: #FF690A; box-sizing: border-box; font-weight: bold; font-size: 18px; padding: 0px 0px 3px 13px;">
                  <div @click="showInputFilter()" class="large-12 columns">{{names.name}}</div>
                  <div v-show="showInput" class="large-12 columns" style="padding: 0px">
                    <inputfilter
                      :callback="onSelectValue"
                      :val.sync="values.name">
                    </inputfilter>
                  </div>
                </th>
                <th title="Max price you will pay once time" width="8%" style="color: #FF690A; box-sizing: border-box; font-weight: bold; font-size: 18px; padding: 0px 0px 3px 13px;">
                  <div>{{names.priceOnce}}</div>
                </th>
                <th title="Max price you will pay monthly" width="8%" style="color: #FF690A; box-sizing: border-box; font-weight: bold; font-size: 18px; padding: 0px 0px 3px 13px;">
                  <div>{{names.priceMonth}}</div>
                </th>
                <th width="51%" style="color: #FF690A; box-sizing: border-box; font-weight: bold; font-size: 18px; padding: 0px 0px 3px 13px;">
                  <span>{{names.details}}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="filter">
                <td><div></div></td>
                <td><div v-show="values.name.length > 0" style="padding-left: 5px">{{values.nameShow}}</div></td>
                <td></td>
                <td></td>
                <td><div></div></td>
              </tr>
            </tbody>
            <tbody v-for="(package, index) in packagesList">
              <tr :class="{'active': package.show,'desactive': !package.show}" @click="setActive(index)">
                <td valign="top">
                  <h6><a v-bind="{ href: '/package/'+package.id}">{{names.manageButton}}</a></h6>
                </td>
                <td valign="top">
                  <div class="textbold">{{package.name}}</div>
                </td>
                <td class="textbold" valign="top">
                  {{package.valuesOnce.max}} {{package.valuesOnce.currencyMax}}
                </td>
                <td class="textbold" valign="top">
                  {{package.valuesMonth.max}} {{package.valuesOnce.currencyMax}}
                </td>
                <td class="textbold" valign="top"></td>
              </tr>
              <tr v-show="package.show" class="inner-rows">
                <td></td>
                <td>{{getTheEmployeesThatAccomplishesTheConditions}}</td>
                <td></td>
                <td></td>
                <td>{{getTheConditions}}</td>
              </tr>
              <tr v-show="package.show" class="inner-rows">
                <td></td>
                <td>Services</td>
                <td></td>
                <td>{{package.valuesMonth.max}} {{package.valuesOnce.currencyMax}}</td>
                <td>{{getTheServices}}</td>
              </tr>
              <tr v-show="package.show" class="inner-rows">
                <td></td>
                <td>Devices</td>
                <td>{{package.valuesOnce.max}} {{package.valuesOnce.currencyMax}}</td>
                <td></td>
                <td>{{getTheDevices}}</td>
              </tr>
              <!--<tr v-show="package.show">
                <td>Apps & Content</td>
                <td></td>
                <td></td>
                <td>Information about Apps & Content</td>
              </tr>-->
            </tbody>
          </table>
          <div v-show="errorNotFound" class="error-message">{{names.nopackageFound}}</div>
          <div class="load">
            <i v-show="loading" class="fa fa-spinner fa-spin fa-5x"></i>
          </div>
        </div>
      </div>
      <pagination :pagination="pagination" :callback="loadData" v-show="pagination.total_pages > 1"></pagination>
    </div>
  </div>
</template>
<script  src="./packages.crtl.js" lang="babel"></script>
