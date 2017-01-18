<template>
  <div class="content-right">
    <div id="tables">
      <div class="header"></div>
      <div class="expanded row">
        <modal v-if="showModal" @close="showModal = false">
          <h6 slot="body">{{error}}</h6>
        </modal>
        <div class="small-12 columns titles">
          <h4>Service Plans<h4>
        </div>
        <div class="small-12 columns">
          <a class="button" href="/service">Add Plan</a>
        </div>
        <div v-if="showtable == false && loading == false">
          <font color="red">No Services provided. Please, click on "Add Plan" button to create the first service plan</font>
        </div>
        <div v-if="showtable && !loading" class="small-12 columns">
          <table cellspacing=0 cellpadding=0>
            <thead>
              <tr>
                <th>
                  <select class="form-control" v-model="status">
                    <option value="" type>Status</option>
                    <!--<option v-for="item in filterDeviceType" :key="item.id" :value="item.id">{{item.attributes.class}}</option>-->
                  </select>
                </th>
                <th>
                  <select class="form-control" v-model="plans">
                    <option value="" manufactured>Plans</option>
                    <!--<option v-for="item in filterDeviceType" :value="item.id">{{item.attributes.make}}</option>-->
                  </select>
                </th>
                <th>
                  <select class="form-control" v-model="details">
                    <option value="" price>Details</option>
                    <!--<option v-for="ite in filterPrice" :value="item.id">{{item.attributes.price1}}</option>-->
                  </select>
                </th>
                <th>
                  <select class="form-control" v-model="codePlan">
                    <option value="" os>Plan Code</option>
                    <!--<option v-for="item in filterDeviceType" :value="item.id">{{item.attributes.deviceOS}}</option>-->
                  </select>
                </th>
                <th>
                  <select class="form-control" v-model="carrier">
                    <option value="" carrier>Carrier</option>
                    <!--<option v-for="item in filterCarriers"  :value="item.id">{{item.attributes.presentation}}</option>-->
                  </select>
                </th>
                <th>
                  <select class="form-control" v-model="cost">
                    <option value="" capacity>Cost</option>
                    <!--<option v-for="item in filterByModifications(filterModifications,'capacity')"  :value="item.id">{{item.attributes.value}}</option>-->
                  </select>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="filter">
                <td><div>{{status}}</div></td>
                <td><div>{{plans}}</div></td>
                <td><div>{{details}}</div></td>
                <td><div>{{codePlan}}</div></td>
                <td><div>{{carrier}}</div></td>
                <td><div>{{cost}}</div></td>
              </tr>
            </tbody>
            <tbody v-for="(service, index) in services">
              <tr :class="{'active': service.show,'desactive': service.show}" @click="setActive(index)">
                <!--<td><a v-bind="{ href: '/device/'+device.id}">Manage</a></td>-->
                <td valign="top" v-if="service.status == 'Enabled'" class="textbold">{{service.status}}</td>
                <td valign="top" v-if="service.status == 'Disabled'" >{{service.status}}</td>
                <td valign="top">
                  <div class="textbold">{{service.title}}</div>
                </td>
                <td valign="top">
                  <div class="longtext">{{service.description}}</div>
                </td>
                <td valign="top">{{service.planCode}}</td>
                <td valign="top">{{service.carriers[0].presentation}}</td>
                <td valign="top" class="textbold">${{service.cost}}</td>
              </tr>
              <tr v-if="service.show" :class="{'active': service.show,'desactive': service.show}">
                <td></td>
                <td valign="top">
                  <div v-if="service.show">
                    Minutes<br>
                    Data<br>
                    SMS<br>
                    International Minutes<br>
                    International Data<br>
                    International SMS<br>
                    <a v-bind="{ href: '/service/'+service.id}">Manage Plan</a><br>
                  </div>
                </td>
                <td valign="top">
                  <div v-if="findByService(service.serviceitems,'voice','domestic').value > 0">{{findByService(service.serviceitems,"voice","domestic").value}} {{findByService(service.serviceitems,'voice','domestic').unit}}<br></div>
                  <div v-if="findByService(service.serviceitems,'voice','domestic').value == 0"><br></div>
                  <div v-if="findByService(service.serviceitems,'data','domestic').value > 0">{{findByService(service.serviceitems,"data","domestic").value}} {{findByService(service.serviceitems,'data','domestic').unit}}<br></div>
                  <div v-if="findByService(service.serviceitems,'data','domestic').value == 0"><br></div>
                  <div v-if="findByService(service.serviceitems,'messaging','domestic').value > 0">{{findByService(service.serviceitems,"messaging","domestic").value}} {{findByService(service.serviceitems,'messaging','domestic').unit}}<br></div>
                  <div v-if="findByService(service.serviceitems,'messaging','domestic').value == 0"><br></div>
                  <div v-if="findByService(service.serviceitems,'voice','international').value > 0">{{findByService(service.serviceitems,"voice","international").value}} {{findByService(service.serviceitems,'voice','international').unit}}<br></div>
                  <div v-if="findByService(service.serviceitems,'voice','international').value == 0"></div>
                  <div v-if="findByService(service.serviceitems,'data','international').value > 0">{{findByService(service.serviceitems,"data","international").value}} {{findByService(service.serviceitems,'data','international').unit}}<br></div>
                  <div v-if="findByService(service.serviceitems,'data','international').value == 0"><br></div>
                  <div v-if="findByService(service.serviceitems,'messaging','international').value > 0">{{findByService(service.serviceitems,"messaging","international").value}} {{findByService(service.serviceitems,'messaging','international').unit}}<br></div>
                  <div v-if="findByService(service.serviceitems,'messaging','international').value == 0"><br></div>
                </td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <div class="load">
            <i v-show="loading" class="fa fa-spinner fa-spin fa-5x"></i>
          </div>
        </div>
        <pagination :pagination="pagination" :callback="loadData" v-show="showtable && loadpagination"></pagination>
      </div>
    </div>
  </div>
</template>
<script  src="./services.crtl.js" lang="babel"></script>
