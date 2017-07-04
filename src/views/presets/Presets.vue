<template>
<div class="page preset-page preset-index-page">
  <modal v-if="$store.getters['error/hasError']" @close="$store.dispatch('error/clearAll')">
    <h3 slot="body">{{ $store.getters['error/error'] }}</h3>
  </modal>

  <div class="small-12 columns">
    <router-link to="/presets/new" class="button large add-button">Create New Equipment Group</router-link>
  </div>

  <div class="small-12 columns">
    <div class="tag-header">
      <h1>Equipment Groups</h1>
    </div>

    <div class="grid-box">
      <div class="box-heading">
        <input type="text" placeholder="Search with group name" v-model="query" @keyup.enter="searchPresets()">
        <i class="fa fa-search"></i>
      </div>

      <div class="box-content" v-if="isReady">
        <table class="unstriped">
          <thead>
            <tr>
              <th width="50">&nbsp;</th>
              <th>Preset Name</th>
              <th width="100">Devices</th>
              <th width="100">Delivered</th>
              <th width="50">Cost</th>
              <th>Details</th>
              <th width="84">Actions</th>
            </tr>
          </thead>

          <tbody>
            <template v-for="preset in presets">
              <tr class="overview-tr" :data-id="preset.id" :class="activePreset && (activePreset.id == preset.id) ? 'active' : ''">
                <td>
                  <span class="badge" @click="setActive(preset)"><i class="fa fa-plus"></i><i class="fa fa-minus"></i></span>
                </td>
                <td>{{ preset.name }}</td>
                <td>{{ PresetHelper.getDevicesCount(preset) }}</td>
                <td></td>
                <td></td>
                <td>
                  <template v-for="variation in preset.devicevariations" v-if="preset.devicevariations.length-1">
                    <label class="label like-tag ">
                      {{ variation.devices[0].name }}, {{ variation.modifications[0].value }} {{variation.modifications[1].value}}
                    </label>
                  </template>
                  <label class="variations" v-for="variation in preset.devicevariations" v-else>
                    {{variation.devices[0].name}}, {{variation.modifications[0].value}}, {{variation.modifications[1].value}}
                  </label>
                </td>
                <td>
                  <div class="action-buttons">
                    <a class="button alert" @click="removePreset(preset.id)"><i class="fa fa-trash"></i></a>
                    <router-link :to="'/presets/' + preset.id" class="button warning"><i class="fa fa-edit"></i>
                    </router-link>
                  </div>
                </td>
              </tr>

              <tr class="detail-tr" :data-id="preset.id" :class="activePreset && (activePreset.id == preset.id) ? 'active' : ''">
                <td transition="" class="detail" colspan="7">
                  <div>
                    <dl class="dl-h">
                      <dt>Price</dt>
                      <dd>Variations</dd>
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
    </div>

    <paginate
            :pagination="$store.state.preset.pagination"
            :prev="prevPage"
            :next="nextPage"
            v-show="isReady">
    </paginate>

    <div class="is-relative" v-show="!isReady">
      <div class="is-loading"></div>
    </div>
  </div>
</div>
</template>

<script src="./presets.crtl.js" lang="babel"></script>