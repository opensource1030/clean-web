<template>
  <div class="content-right" >
    <div id="company">
      <div class="header"></div>
      <div class="expanded row">
        <div class="small-12 columns titles">
          <h4>Settings<h4>
        </div>

        <div class="small-12 columns" >
          <ul  class="acordeon" data-accordion data-allow-all-closed="true" v-f-accordion>
            <li class="acordeon-item  is-active" data-accordion-item  v-f-accordion>
              <a href="#" class="accordion-title"  @click="showFalse()" >Main</a>
              <div class="accordion-content overview" data-tab-content v-f-accordion>
                <div class="row">
                  <div class="small-6 columns ">
                    <label>Name
                      <input type="text" placeholder="" :value="d.name" v-model="d.name">
                    </label>
                    <label>Label
                      <input type="text" placeholder="" :value="d.label" v-model="d.label">
                    </label>
                    <label>Logo
                      <input type="text" placeholder="" :value="d.logo" v-model="d.logo">
                    </label>
                    <label>
                      <input type="checkbox" v-model="d.active"> Active
                    </label>
                  </div>
                </div>
              </div>
            </li>
            <li class="acordeon-item  " data-accordion-item  v-f-accordion>
                  <a href="#" class="accordion-title" @click="showFalse()"  >Custom Fields</a>
                  <div class="accordion-content  modifications"  data-tab-content   v-f-accordion>
                    <div class="row">
                      <div v-if="error" v-show="error">
                        <div   class="is-error callout" data-closable >
                          <div class="container">
                            <h5>{{error}}</h5>
                          </div>

                        </div>
                      </div>
                      <div class="small-12 columns">
                        <div class="row">

                          <div class="small-12 columns">

                            <label style=" font-weight: bold;" >Label
                              <input type="text" :value="label"  v-model="label" placeholder="Custom">
                            </label>
                            <label style=" font-weight: bold;" >Value
                              <input type="text" :value="value"  v-model="value" placeholder="Custom">
                            </label>
                            <a   @click="addCustomField()"class="button tiny">Add</a>
                          </div>

                          <div v-for="(customField, index) in customFields" >
                            <label  >{{customField.label}}
                              <input type="text" :value="customField.value" v-model="customField.value" >
                              <a @click="removeCustomField(index)"class="button tiny">Remove</a>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
          </ul>
          <a class="button large" @click="submit()" id="button">Save Changes</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./settings.crtl.js" lang="babel" ></script>