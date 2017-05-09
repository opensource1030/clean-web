<template>
  <div id="placeorder">
    <placeOrderWizard :activeStep="2"></placeOrderWizard>
    <div class="row expanded">
      <div class="columns small-12">
        <h4 class="category-title">Select Package</h4>
      </div>
      <div class="columns small-12">
        <div class="is-relative" v-if="packages.loading">
          <div class="is-loading"></div>
        </div>
        <div class="row expanded p-b-20 border-bottom" v-else>
          <div class="columns small-12">
            <carousel :perPage="4">
              <slide v-for="(eachPackage, index) in packages.availablePackages">
                <div class="box-type-1" :class="{'active': eachPackage.id == packages.activePackage.id}" @click="setActive('Package', eachPackage)">
                  <div class="box-icon">
                    <span class="icon-circle">
                      <i class="fa fa-archive" aria-hidden="true"></i>
                    </span>
                  </div>
                  <div class="box-content">
                    <p class="ft-20 black">{{eachPackage.name}}</p>
                    <p class="m-b-0">{{eachPackage.information}}</p>
                  </div>
                  <div class="clearfix"></div>
                </div>
              </slide>
            </carousel>
          </div>
        </div>
      </div>
      <div class="columns small-12 p-t-20">
        <div class="is-relative" v-if="services.loading">
          <div class="is-loading"></div>
        </div>
        <div class="row expanded" v-else>
          <div class="columns small-12 p-b-20 border-bottom" v-if="services.availableServices.length">
            <carousel :perPage="4">
              <slide v-for="(eachService, index) in services.availableServices">
                <div class="box-type-2" :class="{'active': eachService.id == services.activeService.id}" @click="setActive('Service', eachService)">
                  <div class="box-content">
                    <div class="serviceImage">
                      <img :src="getImageUrl(eachService.carriers[0])" />
                    </div>
                    <p class="ft-20 black">{{eachService.carriers[0].presentation}}</p>
                    <p class="capitalize m-b-0" v-for="(serviceItem, index) in eachService.serviceitems">
                      {{serviceItem.domain}} {{serviceItem.category}}: {{serviceItem.value}} {{serviceItem.unit}}
                    </p>
                  </div>
                  <div class="clearfix"></div>
                </div>
              </slide>
            </carousel>
          </div>
        </div>
      </div>
      <div class="columns small-12 p-t-20">
        <a class="button large btn-orange pull-left" @click="goOrderPages('option')">Back</a>
        <a class="button large btn-orange pull-right" @click="goOrderPages('device')" v-if="services.activeService.id">Next</a>
      </div>
    </div>
  </div>
</template>
<script  src="./placeorder.selectpackage.crtl.js" lang="babel"></script>
