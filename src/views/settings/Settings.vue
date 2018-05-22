<template>
  <div class="content-right">
    <div class="expanded row">
      <!-- top nav -->
      <section class="top-bar-section clearfix">
        <div style="height: 50px;">&nbsp;</div>
      </section>

      <div class="clearfix"></div>
      <nav class="level app-levelbar">
        <div class="level-left">
          <div class="level-item">
            <h3 class="subtitle is-5">
              <strong>{{ name }}</strong>
            </h3>
          </div>
        </div>
        <div class="level-right is-hidden-mobile">
          <breadcrumb :list="list"></breadcrumb>
        </div>
      </nav>

      <div class="small-12 columns" >
        <div class="grid-box">
          <div class="box-heading">
            <a href="#" @click="showFalse()"><h2>Company</h2></a>
          </div>

          <div class="box-content">
            <div class="box-content-holder">
              <div class="expanded row">
                <div class="small-6 columns">
                  <h5>Overview</h5>
                  <label>Name
                    <input type="text" placeholder="" v-model="d.name">
                  </label>
                  <label>Label
                    <input type="text" placeholder="" v-model="d.label">
                  </label>
                  <label>Logo
                    <input type="text" placeholder="" v-model="d.logo">
                  </label>
                  <label>
                    <input type="checkbox" v-model="d.active"> Active
                  </label>
                </div>

                <div class="small-6 columns">
                  <h5>Custom Fields</h5>
                  <div class="expanded row">
                    <div class="small-5 columns">
                      <label>Label
                        <input type="text" v-model="label" placeholder="Custom">
                      </label>
                    </div>
                    <div class="small-5 columns">
                      <label>Value
                        <input type="text" v-model="value" placeholder="Custom">
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
                          <input type="text" v-model="customField.value" >
                        </label>
                      </div>
                      <div class="small-2 columns">
                        <a @click="removeCustomField(index)" class="">Remove</a>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="small-12 columns">
                  <div class="action-button">
                    <a class="button btn-round" @click="submit()" id="button">Save Changes</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./settings.crtl.js" lang="babel" ></script>
