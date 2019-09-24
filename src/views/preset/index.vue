<template>
  <div class="page preset-page preset-index-page">
    <div>
      <router-link to="/presets/new" class="btn btn-lg add-button">Create New Equipment Group</router-link>
    </div>

    <div>
      <div class="tag-header bg-info">Equipment Groups</div>

      <b-card no-body class="preset-list-card">
        <div class="search-field">
          <input type="text" placeholder="Search with group name" v-model="query" @keyup.enter="searchPresets()">
          <i class="fa fa-search"></i>
        </div>
        <b-card-body class="p-0">
          <spinner v-if="!isReady" />

          <table v-else class="table">
            <thead>
              <tr>
                <th width="50">&nbsp;</th>
                <th>Preset Name</th>
                <th width="100">Devices</th>
                <th width="100">Delivered</th>
                <th width="50">Cost</th>
                <th>Details</th>
                <th width="90">Actions</th>
              </tr>
            </thead>

            <tbody>
              <template v-for="preset in presets">
                <tr class="overview-tr" :data-id="preset.id" :class="activePreset && (activePreset.id == preset.id) ? 'active' : ''">
                  <td>
                    <span class="badge badge-primary" @click="setActive(preset)">
                      <i class="fa fa-plus"></i><i class="fa fa-minus"></i>
                    </span>
                  </td>
                  <td>{{ preset.name }}</td>
                  <td>{{ PresetHelper.getDevicesCount(preset) }}</td>
                  <td></td>
                  <td></td>
                  <td>
                    <span v-for="variation in preset.devicevariations" class="tag">
                      {{ variation.devices[0].name }},
                      <template v-for="modification in variation.modifications"> {{ modification.value }}</template>
                    </span>
                  </td>
                  <td>
                    <div class="action-buttons">
                      <a class="btn btn-danger" @click="removePreset(preset.id)" title="Delete"><i class="fa fa-trash"></i></a>
                      <router-link :to="'/presets/' + preset.id" title="Edit" class="btn bg-warning"><i class="fa fa-edit"></i></router-link>
                    </div>
                  </td>
                </tr>

                <tr class="detail-tr" :data-id="preset.id" :class="activePreset && (activePreset.id == preset.id) ? 'active' : ''">
                  <td transition="" class="detail" colspan="7">
                    <div>
                      <div class="row">
                        <div class="col-2 text-right"><strong>Price</strong></div>
                        <div class="col-10">Variations</div>
                      </div>
                      <div class="row" v-for="variation in preset.devicevariations">
                        <div class="col-2 text-right"><strong>{{ variation.priceRetail }} {{ variation.devices[0].currency }}</strong></div>
                        <div class="col-10">
                          {{ variation.devices[0].name }}
                          <template v-for="modification in variation.modifications">, {{ modification.value }}</template>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </b-card-body>
      </b-card>

      <pagination
        v-show="isReady"
        :pagination="$store.state.preset.pagination"
        :prev="prevPage"
        :next="nextPage"
      />
    </div>
  </div>
</template>

<script src="./index.ctrl.js" lang="babel"></script>
