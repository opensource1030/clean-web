<template>
  <div class="row expanded">
    <modal v-if="$store.getters['error/hasError']" @close="$store.dispatch('error/clearAll')">
      <h3 slot="body">{{ $store.getters['error/error'] }}</h3>
    </modal>
    <div class="small-12 columns">
      <a class="button large btn-orange" href="/preset">Create Preset</a>
      <header class="tag-header">
        <h1>Presets </h1>
      </header>
      <div class="grid-box">
        <div class="table-holder" v-show="!variations.loading">
          <table>
            <thead>
            <tr>
              <th colspan="2" width="8%">
                <div class="head"> 5 Presets</div>
              </th>
              <th width="13%">
                <div class="head"> 753 Delivered</div>
              </th>
              <th>
                <div class="head">Cost: $4534534</div>
              </th>
              <th>
                &nbsp;
              </th>
              <th width="10%">
                Actions
              </th>
            </tr>
            </thead>
            <tbody>
            <template v-if="variations.loadtable">
              <tr class="filter">
              </tr>
            </template>
            <template v-for="(preset, index) in presets">
              <tr @click="setActive(preset)"
                  id="open"
                  :data-id="preset.id"
                  :class="activePreset && (activePreset.id == preset.id) ? 'row-active' : ''">

                <td valign="middle" width="30px" class="icon-toggle"><i
                        :class="activePreset && (activePreset.id == preset.id) ? 'fa fa-minus' : 'fa fa-plus'"> </i>
                </td>
                <td><strong>{{preset.name}}</strong></td>
                <td>{{preset.devices}}</td>
                <td>{{preset.total}}{{preset.devicevariations[0].devices[0].currency}}</td>
                <td>
                  <template v-for="variation in preset.devicevariations"
                            v-if="preset.devicevariations.length-1"><label class="label like-tag ">
                    {{variation.devices[0].name}} ,
                    {{variation.modifications[0].value}} {{variation.modifications[1].value}} </label></template>
                  <label class="variations" v-for="variation in preset.devicevariations" v-else>{{variation.devices[0].name}}
                    , {{variation.modifications[0].value}} , {{variation.modifications[1].value}} </label>
                </td>
                <td>
                  <div class="action-buttons">
                    <a class="button alert" @click="removePreset(preset.id)"> <i class="fa fa-trash"> </i> </a>
                    <a class="button warning" v-bind="{ href: '/preset/'+preset.id}"> <i class="fa fa-edit"> </i> </a>
                  </div>
                </td>
                <!-- <a name="manage" >Manage</a></td>-->
              </tr>
              <tr v-if="activePreset && (activePreset.id == preset.id)">
                <td transition="" class="detail" colspan="8">
                  <div class="column row">
                    <dl class="dl-h">
                      <dt> Price</dt>
                      <dd> Variations</dd>
                      <dt v-for="variation in preset.devicevariations">
                        {{variation.priceRetail}}{{variation.devices[0].currency}}
                      </dt>
                      <dd v-for="variation in preset.devicevariations">{{variation.devices[0].name}} ,
                        {{variation.modifications[0].value}} , {{variation.modifications[1].value}}
                      </dd>
                    </dl>
                  </div>
                </td>
              </tr>
            </template>
            </tbody>
          </table>
        </div>
        <div class="clearfix"></div>
        <paginate :pagination="pagination" :prev="prevPage" :next="nextPage">
        </paginate>
        <div class="is-loading" v-show="variations.loading">
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./presets.crtl.js" lang="babel"></script>
