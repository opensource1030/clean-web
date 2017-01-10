<template>
    <div id="tables">
      <div class="header"></div>
        <div class="small-12 columns titles">
          <h4>Presets<h4>
          </div>
          <div class="small-12 columns" >
            <a class="button buttonTable" href="/preset"  >Create Preset</a>
          </div>

          <div class="small-12 columns" >

            <table  >
              <thead>
                <tr>
                  <th >
                  </th>
                  <th ><select class="form-control"  >
                    <option value="" > Status</option>
                    <option   ></option>

                  </select></th>
                  <th >
                    <select class="form-control"  >
                      <option  >5 Presets</option>
                      <option ></option>

                    </select> </th>
                    <th ><select class="form-control"  >
                      <option value="" >753 Delivered</option>
                      <option ></option>

                    </select></th>
                    <th ><select class="form-control"  >
                      <option  >Cost: $4534534</option>
                      <option   ></option>

                    </select></th>

                  </tr>
                </thead>
                <tbody v-show="loadtable" >
                  <tr class="filter">
                <!--    <td><div></div></td>
                    <td><div>{{type}}</div></td>
                    <td ><div>{{manufactured}}</div></td>
                    <td  ><div>{{price}}</div></td>
                    <td  ><div>{{os}}</div></td>
                    <td ><div>{{carrier}}</div></td>
                    <td ><div>{{capacity}}</div></td>
                    <td  ><div>{{style}}</div></td>-->
                  </tr>
                </tbody>
                <tbody  v-for="(preset, index) in presets"  >
                  <tr    :class="{ 'active': preset.show,'desactive': preset.show  }"   @click="setActive(index)" >
                    <td> <a  v-bind="{ href: '/preset/'+preset.id}">Manage</a></td>
                    <td style="font-weight: bold;" >  {{preset.name}} </td>
                    <td >{{preset.devices}}</td>
                    <td  >300$</td>
                <!--    <td v-if="preset.show!=true" >ios</td><td v-else>  </td>
                    <td v-if="preset.show!=true" ><div  v-for="carrier in device.carriers"  > {{carrier.name}}</div> </td><td v-else>  </td>
                    <td v-if="preset.show!=true"  ><div  v-for="capacity in filterByModificationsd(device.modifications,'capacity') "  > {{capacity.value}}</div> </td><td v-else>  </td>
                    <td v-if="preset.show!=true"  > <div  v-for="style in filterByModificationsd(device.modifications,'style')  "  > {{style.value}}</div></td><td v-else>  </td>-->
                  </tr>
                  <tr  >
                    <td v-show="preset.show" transition="device"  class="detail" colspan="8" >

                    </td>

                  </tr>

                </tbody>
              </table>

              <div class="load">
                  <i  v-show="loading" class="fa fa-spinner fa-spin fa-5x"></i>
                </div>
            </div>


            <pagination :pagination="pagination" :callback="loadData" v-show="loadtable"></pagination>
        </div>

</template>
<script  src="./Presets.crtl.js" lang="babel"  ></script>
