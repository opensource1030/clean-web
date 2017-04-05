<template>
      <div id="preset">
        <modal v-if="$store.getters['error/hasError']" @close="$store.dispatch('error/clearAll')">
          <h3 slot="body">{{  $store.getters['error/error'] }}</h3>
</modal>
          <div class="small-12 columns titles">

            <h4>Create Device Preset</h4>

            </div>

            <div class="medium-6 columns presetname">
              <label>Title
                <input type="text" placeholder="" :value="preset.name" @input="$store.commit('preset/updateField',{e:$event,type:'name'})"  >
              </label>
            </div>
              <searchCost :callback="onSelectColumn" :show="search.searchShow" v-model="search" :search="search"></searchCost>
            <div class="small-12 columns" >

              <ul  class="acordeon" data-accordion data-allow-all-closed="true" >
                <li class="acordeon-item  is-active" data-accordion-item  >
                  <a href="#" class="accordion-title"   >Find Devices</a>
                  <div class="accordion-content "  data-tab-content   >
                    <div class="row " id="tables">
                        <tables :id="0" :search="search" ></tables>
                    </div>

                  </div>


                </li>

                <li class="acordeon-item  " data-accordion-item  >
                  <a href="#" class="accordion-title"   >Selected Devices</a>
                  <div class="accordion-content variations"  data-tab-content   >
                    <div class="row">
                      <div class="imagescheck">
                        <div class="crop"  v-for=" (c,index) in variations"  >


                          <label   class="static"  >
                            <input type="checkbox"   @click="changeStatusPreset('active',index)"  :checked="c.checks"  @change="$store.commit('preset/updateVariations',{e:$event,type:'variations',i:index})"   >

                          </label>

                        </div>

                    </div>
                  </div>
                </div>
                </li>
                  </ul>
                  <a  class="button large" @click="submit()" id="button">Save Preset</a>


              </div>
            </div>


</template>
<script src="./Preset.crtl.js" lang="babel" ></script>
