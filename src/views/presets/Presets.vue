
<template>
  <div>
    <modal v-if="$store.getters['error/hasError']" @close="$store.dispatch('error/clearAll')">
      <h3 slot="body">{{ $store.getters['error/error'] }}</h3>
    </modal>

    <div id="tables" v-show="!variations.loading" >
      <div class="header"></div>
        <div class="small-12 columns titles">
          <h4>Presets</h4>
          </div>
          <div class="small-12 columns" >
            <a class="button buttonTable" href="/preset"  >Create Preset</a>
          </div>

          <div class="small-12 columns responsive" >

            <table  >
              <thead>
                <tr>
                    <th ></th>
                  <th ><div class="head">  Status</div></th>
                  <th><div class="head">  5 Presets</div></th>
                    <th > <div class="head"> 753 Delivered</div></th>
                    <th ><div class="head">Cost: $4534534</div></th>
                    <th ></th>

                  </tr>
                </thead>
                <tbody v-show="variations.loadtable" >
                  <tr class="filter">
                  </tr>
                </tbody>
                <tbody  v-for="(preset, index) in presets"  >
                  <tr    @click="setActive(preset)" id="open" >
                    <td> <a  v-bind="{ href: '/preset/'+preset.id}">Manage</a></td>
                    <td style="font-weight: bold;" >  {{preset.name}} </td>
                    <td >{{preset.devices}}</td>
                    <td  >{{preset.total}}{{preset.devicevariations[0].devices[0].currency}}</td>
                    <td  ><label class="variations" v-for="variation in preset.devicevariations" v-if="preset.devicevariations.length-1" >
                      <div v-if="variation.devices[0]!=null"  >   {{variation.devices[0].name}}
                    </div> ,<div v-if="variation.modifications!=null || variation.modifications[0]!=''"   > {{variation.modifications[0]}} </div>
                      ,<div v-if="variation.modifications!=null || variation.modifications[1]!=null" > {{variation.modifications[1]}} </div> </label>
      <label class="variations" v-for="variation in preset.devicevariations" v-else >
        <div v-if="variation.devices[0]!=null">{{variation.devices[0].name}} </div>,
        <div  v-if="variation.modifications!=null || variation.modifications[0]!=null ">{{variation.modifications[0]}} </div>,
        <div v-if="variation.modifications!=null || variation.modifications[1]!=null   ">{{variation.modifications[1]}} </div>
      </label>

                      </td>

                  </tr>
                  <tr  >
                    <td v-show="activePreset && (activePreset.id == preset.id)" transition="device"  class="detail" colspan="8" >
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
              <!--
              <div v-for="variation in preset.devicevariations">{{variation.devices[0].name}} , {{variation.modifications[0].value}} , {{variation.modifications[1].value}} </div>
            -->
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

            <paginate :pagination="pagination" :prev="prevPage" :next="nextPage" >
            </paginate>
        </div>
        <div class="load">
            <i  v-show="variations.loading" class="fa fa-spinner fa-spin fa-5x"></i>
          </div>
        </div>

</template>
<script  src="./presets.crtl.js" lang="babel"  ></script>
