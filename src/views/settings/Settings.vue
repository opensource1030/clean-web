<template>
  <div class="content-right" >
    <div id="tables">
      <div class="header"></div>
      <div class="expanded row">
        <div class="small-12 columns titles">
          <h4>Configuration<h4>
        </div>

        <div class="small-12 columns" >
          <ul class="acordeon" data-accordion data-allow-all-closed="true" v-f-accordion>
            <li class="acordeon-item  is-active" data-accordion-item  v-f-accordion>
              <a href="#" class="accordion-title"  @click="showFalse()">Company</a>
              <div class="accordion-content overview" data-tab-content v-f-accordion>
                <div v-if="error" v-show="error">
                  <div class="is-error callout" data-closable >
                    <div class="container">
                      <h5>{{error}}</h5>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="small-6 columns">
                    <h3>Overview</h3>
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

                  <div class="small-6 columns">
                    <h3>Custom Fields</h3>
                    <div class="expanded row">
                      <div class="small-5 columns">
                        <label>Label
                          <input type="text" :value="label" v-model="label" placeholder="Custom">
                        </label>
                      </div>
                      <div class="small-5 columns">
                        <label>Value
                          <input type="text" :value="value" v-model="value" placeholder="Custom">
                        </label>
                      </div>
                      <div class="small-2 columns">
                        <a @click="addCustomField()" class="">Add</a>
                      </div>
                    </div>

                    <div v-for="(customField, index) in customFields" >
                      <div class="expanded row">
                        <div class="small-10 columns">
                          <label>{{ customField.label }}
                            <input type="text" :value="customField.value" v-model="customField.value" >
                          </label>
                        </div>
                        <div class="small-2 columns">
                          <a @click="removeCustomField(index)" class="">Remove</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <a class="button large" @click="submit()" id="button">Save Changes</a>
              </div>
            </li>
            <li class="acordeon-item" data-accordion-item  v-f-accordion>
              <a href="#" class="accordion-title" @click="showFalse()">Other</a>
              <div class="accordion-content modifications" data-tab-content v-f-accordion>
                <div class="row">
                  <div class="small-12 columns">
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./settings.crtl.js" lang="babel" ></script>