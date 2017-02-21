
<template>
  <div>
    <modal v-if="showModal" @close="showModal = false">
      <h3 slot="body">{{error}}</h3>
  </modal>

    <div id="tables" v-show="!loading" >
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
                  <th ><div class="head">  Status</div></th>
                  <th><div class="head">  5 Presets</div></th>
                    <th > <div class="head"> 753 Delivered</div></th>
                    <th ><div class="head">Cost: $4534534</div></th>

                  </tr>
                </thead>
                <tbody v-show="loadtable" >
                  <tr class="filter">
                  </tr>
                </tbody>
                <tbody  v-for="(preset, index) in presets"  >
                  <tr    :class="{ 'active': preset.show,'desactive': preset.show  }"   @click="setActive(index)" >
                    <td> <a  v-bind="{ href: '/preset/'+preset.id}">Manage</a></td>
                    <td style="font-weight: bold;" >  {{preset.name}} </td>
                    <td >{{preset.devices}}</td>
                    <td  >{{preset.total}}{{preset.devicevariations[0].devices[0].currency}}</td>
                      <td  ><label class="variations" v-for="variation in preset.devicevariations" v-if="preset.devicevariations.length-1" >    {{variation.devices[0].name}} , {{variation.modifications[0].value}} , {{variation.modifications[1].value}}  </label>
                              <label class="variations" v-for="variation in preset.devicevariations" v-else >{{variation.devices[0].name}} , {{variation.modifications[0].value}} , {{variation.modifications[1].value}} </label>
                      </td>

                  </tr>
                  <tr  >
                    <td v-show="preset.show" transition="device"  class="detail" colspan="8" >
                      <div class="column row">
                    <div class="row">
                      <div class="small-6 columns">
                        <div class="small-8 columns">

                        </div>
                        <div class="small-4 columns">
                          <div class="price" v-for="variation in preset.devicevariations" >{{variation.priceRetail}}{{variation.devices[0].currency}}</div>
                        </div>
  </div>
          <div class="small-6 columns">
            <div class="small-6 columns">
              <div v-for="variation in preset.devicevariations">{{variation.devices[0].name}} , {{variation.modifications[0].value}} , {{variation.modifications[1].value}} </div>
            </div>

              <div class="small-6 columns">

              </div>
                </div>
                    </div>

                      </div>
                    </td>

                  </tr>

                </tbody>
              </table>


            </div>
            <div class="clearfix"></div>

            <pagination :pagination="pagination" :callback="loadData" v-show="loadtable"></pagination>
        </div>
        <div class="load">
            <i  v-show="loading" class="fa fa-spinner fa-spin fa-5x"></i>
          </div>
        </div>

</template>
<script  src="./presets.crtl.js" lang="babel"  ></script>
