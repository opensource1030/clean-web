<template>
<div class="page company-page company-edit-page">
  <div class="row" v-if="company.id == company_id">
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
                    <strong>Company Name</strong>
                    <input type="text" name="company-name" placeholder="" v-model="company.name">
                  </label>
                </div>

                <div class="columns medium-6">
                  <label>
                    <strong>Company Short Name</strong>
                    <input type="text" name="company-shortname" placeholder="A Unique Short ID" v-model="company.shortName">
                  </label>
                </div>
              </div>
              <div class="row">
                <div class="columns medium-6">
                  <label>
                    <strong>Company URL</strong>
                    <input type="text" name="company-url" placeholder="">
                  </label>
                </div>

                <div class="columns medium-6">
                  <label>
                    <strong>Active</strong>
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
      <div class="grid-box setting">
        <div class="box-heading">
          <h2>Settings</h2>
        </div>
        <div class="box-content">
          <div class="row">
            <div class="columns small-12">
              <label>
                <strong>Mobility Central SSO</strong>
                <div class="switch tiny">
                  <input class="switch-input" :id="'setting-mobility-' + company.id" type="checkbox" :name="'setting-mobility-' + company.id" v-model="CompanyHelper.getMobilitySetting(company).value">
                  <label class="switch-paddle" :for="'setting-mobility-' + company.id"></label>
                </div>
              </label>
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
        <div class="box-content-holder">
          <div class="row addlist  row-wrapper address-wrapper" v-for="address in company.addresses"
               :data-index="address.pid">
            <div class="columns medium-4">
              <label>
                <strong>Name</strong>
                <input type="text" placeholder="Address Nickname" v-model="address.name">
              </label>
            </div>
            <div class="columns medium-4">
              <label>
                <strong>Country</strong>
                <input type="text" placeholder="" v-model="address.country">
              </label>
            </div>
            <div class="columns medium-4">
              <label>
                <strong>State</strong>
                <input type="text" placeholder="" v-model="address.state">
              </label>
            </div>
            <div class="clearfix"></div>

            <div class="columns medium-4">
              <label>
                <strong>City</strong>
                <input type="text" placeholder="" v-model="address.city">
              </label>
            </div>
            <div class="columns medium-4">
              <label>
                <strong>Postal Code</strong>
                <input type="text" placeholder="" v-model="address.postalCode">
              </label>
            </div>
            <div class="columns medium-4">
              <label>
                <strong>Address</strong>
                <input type="text" placeholder="" v-model="address.address">
              </label>
            </div>

            <div class="btn-control">
              <a class="button delete" @click="removeAddressField($event)"><i class="fa fa-close"></i></a>
            </div>
          </div>

          <div class="row">
            <div class="input-group-wrapper">
              <div class="input-group">
                <div class="input-group-label">
                  <span><i class="fa fa-plus"></i></span>
                </div>
                <div class="input-group-button">
                  <input type="button" class="button add-address-button" value="Add New Address" @click="addAddressField()">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="columns small-12">
      <div class="grid-box udl">
        <div class="box-heading">
          <h2>Custom Fields</h2>
        </div>

        <div class="box-content-holder">
          <div class="row addlist  udl-wrapper" v-for="udl in company.udls">
            <input type="hidden" name="udl-id" :value="udl.id">
            <div class="columns medium-4">
              <label>
                <strong>Label</strong>
                <input type="text" name="udl-key" placeholder="A Department or Group" v-model="udl.name">
              </label>
            </div>
            <div class="columns medium-8">
              <div class="udl-value-wrapper" :data-index="udl.pid">
                <label>
                  <strong>Value</strong>
                  <input type="text" name="udl-value" class="tag-input" :id="'udl-value-' + udl.pid" :value="udl.value" :data-index="udl.pid">
                </label>
              </div>
            </div>

            <div class="btn-control">
              <a class="button delete" @click="removeCustomField($event)"><i class="fa fa-close"></i></a>
            </div>
          </div>

          <div class="row">
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
        </div>
      </div>
    </div>

    <div class="small-12 columns">
      <a class="button large save-button" @click="submit()">Save Changes</a>
    </div>
  </div>

  <div class="is-relative" v-show="company.id !== company_id">
    <div class="is-loading"></div>
  </div>
</div>
</template>

<script src="./company.ctrl.js" lang="babel"></script>