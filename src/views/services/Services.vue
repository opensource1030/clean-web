<template>
  <div class="content-right">
    <div id="tables">
      <div class="header"></div>
      <div class="expanded row">

        <div class="small-12 columns titles">
          <h4>Service Plans<h4>
          </div>
          <div class="small-12 columns" >
            <a class="button" href="/service"  >Add Plan</a>
          </div>

          <div class="small-12 columns" >
 
            <table  >
              <thead>
                <tr>

                  <th ><select class="form-control" v-model="status" >
                    <option value="" type>Status</option>
                    <!--<option v-for="item in filterDeviceType" :key="item.id" :value="item.id" >{{item.attributes.class}}</option>-->

                  </select></th>
                  <th >
                    <select class="form-control" v-model="plans" >
                      <option value="" manufactured>87Plans</option>
                <!--      <option v-for="item in filterDeviceType"  :value="item.id">{{item.attributes.make}}</option>-->

                    </select> </th>
                    <th ><select class="form-control" v-model="details" >
                      <option value="" price>Details</option>
                  <!--      <option v-for="ite

                 in filterPrice"  :value="item.id">{{item.attributes.price1}}</option>-->

                    </select></th>
                    <th ><select class="form-control" v-model="codePlan" >
                      <option value="" os>Plan Code</option>
                  <!--    <option v-for="item in filterDeviceType"  :value="item.id"   >{{item.attributes.deviceOS}}</option>-->

                    </select></th>
                    <th ><select class="form-control" v-model="carrier" >
                      <option value="" carrier>Carrier</option>
                  <!--    <option v-for="item in filterCarriers"  :value="item.id">{{item.attributes.presentation}}</option>-->

                    </select></th>
                    <th ><select class="form-control" v-model="cost" >
                      <option value="" capacity>Cost</option>
                    <!--  <option v-for="item in filterByModifications(filterModifications,'capacity')"  :value="item.id">{{item.attributes.value}}</option>-->

                    </select></th>

                  </tr>
                </thead>
                <tbody  v-show="showtable"  >
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
                  <tr    :class="{ 'active': service.show,'desactive': service.show  }"   @click="setActive(index)" >
          <!--          <td> <a  v-bind="{ href: '/device/'+device.id}">Manage</a></td>-->
                    <td  >
                      <label>
                      {{service.status}}
                      </label>
                 </td>
                    <td style="font-weight: bold;" >{{service.title}}</td>
                    <td  ></td>
                    <td> {{service.planCode}} </td>
                    <td  >{{service.carriers[0].presentation}}</td>
                    <td style="font-weight: bold;" >${{service.cost}} </td>

                  </tr>
                  <tr  >
                    <td v-show="service.show"   class="detail" colspan="8" >

                      <div class="detailsService">
                        <div class="childService"></div>
                        <div class="options childService">
                          <ul  >
                            <li>Minutes</li>
                            <li>Data</li>
                            <li>SMA</li>
                            <li>International Minutes</li>
                            <li>International Data</li>
                            <li>International SMS</li>
                            <li><a  v-bind="{ href: '/service/'+service.id}">Manage Plan</a></li>
                          </ul>

                        </div>
                        <div class="plans childService">
                      <div class="serviceType"  :class="{ 'upService': service.show}">
                              <label>Roamding minutes,Data</label>

                          </div>
                          <div class="listPlan"  >

                            <ul>
                              <li  >{{findByService(service.serviceitems,"voice","domestic").value}}</li>
                              <li>{{findByService(service.serviceitems,"data","domestic").value}} mb</li>
                              <li>{{findByService(service.serviceitems,"messaging","domestic").value}}</li>
                              <li>{{findByService(service.serviceitems,"voice","international").value}}</li>
                              <li>{{findByService(service.serviceitems,"data","international").value}}  mb</li>
                              <li>{{findByService(service.serviceitems,"messaging","international").value}}</li>


                            </ul>
                            <br>
                          </div>

                        </div>



                    </td>

                  </tr>
                      </div>
                </tbody>
              </table>

              <div class="load">
                  <i  v-show="loading" class="fa fa-spinner fa-spin fa-5x"></i>
                </div>
          </div>
            <pagination :pagination="pagination" :callback="loadData" v-show="showtable"></pagination>
        </div>
      </div>
</template>
<script  src="./services.crtl.js" lang="babel"  ></script>
