<template>
      <div id="preset">
        <modal v-if="showModal" @close="showModal = false">
          <h3 slot="body">{{error}}</h3>
</modal>
          <div class="small-12 columns titles">

            <h4>Create Device Preset</h4>

            </div>

            <div class="medium-6 columns presetname">
              <label>Title
                <input type="text" placeholder="" v-model="preset.name"  >
              </label>
            </div>
            <div class="large-6 columns  search-cost" v-show="search.searchShow">
              <div class="large-4 columns" >
                <label>{{search.costMinName}}
                  <input v-bind:class="{ 'search-input' : true, 'error-input': search.errorCost }" :value="search.costMin" v-model="search.costMin" title="The minimum cost of the Services listed below." type="number" min="0" placeholder="">
                </label>
              </div>
              <div class="large-4 columns">
                <label>{{search.costMaxName}}
                  <input v-bind:class="{ 'search-input' : true, 'error-input': search.errorCost }"  :value="search.costMax" v-model="search.costMax" title="The maximum cost of the Services listed below." type="number" min="0" placeholder="">
                </label>
              </div>
              <div class="large-4 columns">
                <a class="special-button" >{{search.searchName}}</a>
              </div>

            </div>

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


                          <label   class="static" :style="{ backgroundImage: 'url('+process.env.URL_API+'/images/' + c.images[0].id +')',backgroundSize:'124px,180px' }" >
                            <input type="checkbox"     @click="changeStatusPreset('active',index)"  v-model="c.checks"    >

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
