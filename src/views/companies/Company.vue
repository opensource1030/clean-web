<template>
<div class="page company-page company-edit-page" v-if="company.id == company_id">
  <modal v-if="$store.getters['error/hasError']" @close="$store.dispatch('error/clearAll')">
    <h3 slot="body">{{ $store.getters['error/error'] }}</h3>
  </modal>

  <div class="columns small-12">
    <div class="grid-box overview">
      <div class="box-heading">
        <h2>Company Information</h2>
      </div>
      <div class="box-content">
        <div class="row">
          <div class="columns medium-4">
            <div class="company-image-wrapper">
              <div class="company-image" :style="'background-image: url(' + getCompanyImage() + ')'">
              </div>
            </div>
            <br>
            <label for="FileUpload" class="button">Update Logo</label>
            <input type="file" id="FileUpload" @change="onCompanyImageChange" class="show-for-sr">
          </div>

          <div class="columns medium-8">
            <div class="row">
              <div class="columns medium-6">
                <label>
                  <span>Company Name</span>
                  <input type="text" name="company-name" placeholder="Analogic" v-model="company.name">
                </label>
              </div>

              <div class="columns medium-6">
                <label>
                  <span>Company Short Name</span>
                  <input type="text" name="company-shortname" placeholder="Analogic" v-model="company.shortName">
                </label>
              </div>              
            </div>
            <div class="row">
              <div class="columns medium-6">
                <label>
                  <span>Company URL</span>
                  <input type="text" name="company-url" placeholder="www.company.com">
                </label>
              </div>

              <div class="columns medium-6">
                <label>
                  <span>Active</span>
                  <div class="switch tiny">
                    <input class="switch-input" :id="'status-' + company.id" type="checkbox" :name="'status-' + company.id" v-model="company.active">
                    <label class="switch-paddle" :for="'status-' + company.id">
                    </label>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="columns small-12">
    <div class="grid-box address">
      <div class="box-heading">
        <h2>Address</h2>
      </div>
      <div class="box-content">
        <div class="row">
          <div class="columns medium-4">
            <label>
              <span>Name</span>
              <input type="text" placeholder="Drug Store">
            </label>
          </div>
          <div class="columns medium-4">
            <label>
              <span>Country</span>
              <input type="text" placeholder="Spain">
            </label>
          </div>
          <div class="columns medium-4">
            <label>
              <span>State</span>
              <input type="text" placeholder="Huesca">
            </label>
          </div>
        </div>

        <div class="row">
          <div class="columns medium-4">
            <label>
              <span>City</span>
              <input type="text" placeholder="El Grado">
            </label>
          </div>
          <div class="columns medium-4">
            <label>
              <span>Postal Code</span>
              <input type="text" placeholder="22390">
            </label>
          </div>
          <div class="columns medium-4">
            <label>
              <span>Address</span>
              <input type="text" placeholder="C/huesca 8">
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="columns small-12">
    <div class="grid-box udl">
      <div class="box-heading">
        <h2>Custom Fields</h2>
        <div class="input-group-wrapper">
          <div class="input-group">
            <div class="input-group-label">
              <span><i class="fa fa-plus"></i></span>
            </div>
            <div class="input-group-button">
              <input type="button" class="button add-udl-button" value="Add New Field" @click="addCustomField()">
            </div>
          </div>
        </div>
      </div>

      <div class="box-content">
        <div class="row udl-wrapper" v-for="udl in company.udls">
          <input type="hidden" name="udl-id" :value="udl.id">
          <div class="columns medium-4">
            <label>
              <span>Label</span>
              <input type="text" name="udl-key" placeholder="Department" v-model="udl.name">
            </label>
          </div>
          <div class="columns medium-8">
            <div class="udl-value-wrapper" :data-index="udl.pid">
              <label>
                <span>Value</span>
                <input type="text" name="udl-value" class="tag-input" :id="'udl-value-' + udl.pid" :value="udl.value" :data-index="udl.pid">
              </label>
              <span class="label close" @click="removeCustomField($event)"><i class="fa fa-close"></i></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="small-12 columns">
    <a class="button large save-button" @click="submit()">Save Changes</a>
  </div>
</div>
</template>

<script src="./company.ctrl.js" lang="babel"></script>