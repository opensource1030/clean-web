<template>
  <div id="preset" class="row expanded">
    <modal v-if="$store.getters['error/hasError']" @close="$store.dispatch('error/clearAll')">
      <h3 slot="body">{{ $store.getters['error/error'] }}</h3>
    </modal>
    <div class="medium-6 columns presetname">
      <label><strong>Title</strong>
        <input id="name" type="text" placeholder="" :value="preset.name"
               @input="$store.commit('preset/updateField',{e:$event,type:'name'})">
      </label>
    </div>
    <div class="clearfix"></div>
    <searchCost :callback="onSelectColumn" :show="search.searchShow" v-model="search" :search="search"></searchCost>
    <div class="small-12 columns">

      <ul class="accordion" data-accordion data-allow-all-closed="true">
        <li class="accordion-item  is-active" data-accordion-item>
          <a href="#" class="accordion-title">Find Devices</a>
          <div class="accordion-content no-padding " data-tab-content>
            <div class="table-holder">
              <tables :id="0" :search="search"></tables>
            </div>

          </div>
        </li>

        <li class="accordion-item  " data-accordion-item>
          <a href="#" class="accordion-title">Selected Devices</a>
          <div class="accordion-content variations" data-tab-content>
            <div class="row">
              <div class="imagescheck">
                <div class="crop" v-for="(v,index) in variations">
                  <input type="checkbox" :id="'variation-' + v.id" name="variations" :value="v.id" :checked="v.checks"
                         @change="$store.commit('preset/updateVariations',{e:$event,type:'variations',i:index})">
                  <label :for="'variation-' + v.id" class="static">

                  </label>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <a class="save button large " @click="submit()" id="button">Save Preset</a>

    </div>
  </div>


</template>
<script src="./Preset.crtl.js" lang="babel"></script>
