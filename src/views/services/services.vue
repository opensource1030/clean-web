<template>
  <div class="content-right">
    <div id="devices">
      <div class="header"></div>
      <div class="expanded row">

        <div class="small-12 columns titles">
          <h4>Service Plans<h4>
          </div>
          <div class="small-12 columns" >
            <a class="button" href="/service"  >Add Plan</a>
          </div>

          <div class="small-12 columns" >

            <table  id="devices-table">
              <thead>
                <tr>

                  <th ><select class="form-control" v-model="status" >
                    <option value="" status>Status</option>
                    <!--<option v-for="item in filterDeviceType" :key="item.id" :value="item.id" >{{item.attributes.class}}</option>-->

                  </select></th>
                  <th >
                    <select class="form-control" v-model="plans" >
                      <option value="" plans>87Plans</option>
                <!--      <option v-for="item in filterDeviceType"  :value="item.id">{{item.attributes.make}}</option>-->

                    </select> </th>
                    <th ><select class="form-control" v-model="details" >
                      <option value="" details>Details</option>
                  <!--      <option v-for="item in filterPrice"  :value="item.id">{{item.attributes.price1}}</option>-->

                    </select></th>
                    <th ><select class="form-control" v-model="codePlan" >
                      <option value="" codePlan>Plan Code</option>
                  <!--    <option v-for="item in filterDeviceType"  :value="item.id"   >{{item.attributes.deviceOS}}</option>-->

                    </select></th>
                    <th ><select class="form-control" v-model="carrier" >
                      <option value="" carrier>Carrier</option>
                  <!--    <option v-for="item in filterCarriers"  :value="item.id">{{item.attributes.presentation}}</option>-->

                    </select></th>
                    <th ><select class="form-control" v-model="cost" >
                      <option value="" cost>Cost</option>
                    <!--  <option v-for="item in filterByModifications(filterModifications,'capacity')"  :value="item.id">{{item.attributes.value}}</option>-->

                    </select></th>

                  </tr>
                </thead>
                <tbody>
                  <tr class="filter">
                    <td ><div>{{status}}</div></td>
                    <td  ><div>{{plans}}</div></td>
                    <td  ><div>{{details}}</div></td>
                    <td ><div>{{codePlan}}</div></td>
                    <td ><div>{{carrier}}</div></td>
                    <td  ><div>{{cost}}</div></td>
                  </tr>
                </tbody>
                <tbody  v-for="(service, index) in services"  >
                  <tr    :class="{ 'act': service.show,'des': service.show  }"   @click="setActive(index)" >
          <!--          <td> <a  v-bind="{ href: '/device/'+device.id}">Manage</a></td>-->
                    <td  >   <div class="checkbox"    >
                        <label>
                          <input    type="checkbox"    >
                          <span class="custom-checkbox"><i class="icon-check"></i></span>
                          Enabled
                        </label>
                      </div> </td>
                    <td style="font-weight: bold;" >{{service.title}}</td>
                    <td  ></td>
                    <td> {{service.planCode}} </td>
                    <td  > carrier</td>
                    <td  >{{service.cost}}</td>

                  </tr>
                  <tr  >
                    <td v-show="service.show" transition="service"  class="detail" colspan="8" >
                          <div class="details">
                              <div class="child"></div>
                                <div class="child"></div>

                      </div>

                    </td>

                  </tr>


                </tbody>
              </table>
              
          </div>
<pagination :pagination="pagination" :callback="loadData"></pagination>
        </div>
      </div>
</template>
<script  src="./services.crtl.js" lang="babel"  ></script>
