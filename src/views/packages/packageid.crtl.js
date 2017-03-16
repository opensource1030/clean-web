import Vue from 'vue';
import packaging from './../../api/packages/packageid';
import modal from './../../components/modal.vue';
import inputValidate from './../../components/inputValidate.vue';
//import vueSlider from 'vue-slider-component';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import { deleteRepeated } from './../../components/filters.js';

Vue.directive('f-accordion', {
  bind: function(el) {
    Vue.nextTick(function() {
      $(el).foundation();
    });
  }
});

export default {
  name : 'package',
  components: {
    modal,
    inputValidate,
    swiper,
    swiperSlide,
  },

  beforeCreate() {
    if (this.$route.params.id != null) {
      packaging.getDataPackages(this, this.$route.params.id);
    } else {
      packaging.getUserInformation(this);
    }
  },
  computed: {},
  mounted() {},
  methods : {
    deleteRepeated,
    getTheRowOfServiceItems: function(domain, category, type) {
      let aux = [];
      if (type == 'list') {
        aux = this.packages.serviceInformation.serviceitems;
      } else if (type == 'selected') {
        aux = this.packages.serviceSelectedInformation.serviceitems
      } else {
        // NOTHING
      }

      for (let si of aux) {
        if (si.domain == domain && si.category == category) {
          return si.value;
        }
      }
      return 'No Value';
    },
    getTheDifferenceBetweenServices: function(domain, category, type) {
      let aux = 0;

      if (domain == null || category == null) {
        if (type == 'list') {
          aux = this.packages.serviceInformation.cost - this.packages.serviceSelectedInformation.cost;
        } else if (type == 'selected') {
          aux = this.packages.serviceSelectedInformation.cost - this.packages.serviceInformation.cost;
        }
      } else {
        for (let si of this.packages.serviceInformation.serviceitems) {
          for (let sisel of this.packages.serviceSelectedInformation.serviceitems) {
            if (si.domain == domain && sisel.domain == domain && si.category == category && sisel.category == category) {
              if (type == 'list') {
                if (si.value != sisel.value) {
                  aux = si.value - sisel.value;
                }
              } else if (type == 'selected') {
                if (si.value != sisel.value) {
                  aux = sisel.value - si.value;
                }
              }
            }
          }
        }
      }
      if (aux >= 0) {
        return '+' + aux;
      } else {
        return aux;
      }
    },
    submit() {

      let submitOk = true;

      submitOk = submitOk && this.checkTitle();
      submitOk = submitOk && this.checkConditions();
      //submitOk = submitOk && this.checkServices();
      //submitOk = submitOk && this.checkAddress();

      if(submitOk) {
        this.errors.generalError = false;
        if (this.packages.id > 0) {
          packaging.updateThePackages(this);
        } else {
          packaging.createThePackages(this);
        }
      } else {
        this.errors.generalError = true;
      }
    },
    // Check if the title has content and returns error if not.
    checkTitle() {
      let submitOk = true;
      if (this.packages.name == '') {
        this.packages.nameError = true;
        submitOk = false;
      } else {
        this.packages.nameError = false;
      }
      return submitOk;
    },
    //------------------------------------------START CONDITIONS-------------------------------------------------------
    //------------------------------------------START CONDITIONS-------------------------------------------------------
    //------------------------------------------START CONDITIONS-------------------------------------------------------
    //------------------------------------------START CONDITIONS-------------------------------------------------------
    //------------------------------------------START CONDITIONS-------------------------------------------------------
    // Function that changes the ConditionsOptions and ValuesOptions when the Name is changed.
    updatePackageCondition(index, value, type) {

      for (let aux of this.conditionsOptions) {
        if (aux.nameCond == value) {
          this.packages.conditions[index].conditionsConditionsOptions = aux.conditions;
          this.packages.conditions[index].condition = '';
          this.packages.conditions[index].conditionsValuesOptions = aux.values;
          this.packages.conditions[index].value = '';
          this.packages.conditions[index].inputType = aux.inputType;
          this.packages.conditions[index].nameError = false;
        }
      }

      if (type == 'condition' && value != '') {
        this.packages.conditions[index].conditionError = false;
      }

      if (type == 'value' && value != '') {
        this.packages.conditions[index].valueError = false;
      }

      this.reorderButtons();
    },
    // Function that adds another empty element to the packages.conditions list.
    pushCondition(index) {
      this.packages.conditions.push({id: "0", nameCond: '', value: '', condition: '', add: false, delete: false});
      this.reorderButtons();
    },
    // Function that deletes the selected element from the packages.conditions list.
    deleteCondition(index) {
      this.packages.conditions.splice(index, 1);
      if (this.packages.conditions.length == 0) {
        this.packages.conditions.push({id: "0", nameCond: '', value: '', condition: '', add: false, delete: false});
      }
      this.reorderButtons();
    },
    // Retrieve from the packages.companies.udls all the information and add it to the conditionsOptions.
    addConditionsOptions() {
      for (let udl of this.packages.companies.udls) {
        let vals = [];
        if (udl.sections > 0) {
          for (let values of udl.sections) {
            vals.push(values.nameCond);
          }
        }

        this.conditionsFieldsOptions.push(udl.name);

        let condition = [];

        if (udl.inputType == 'boolean') {
          condition = this.allConditionsForBoolean;
          vals = ['Yes', 'No'];
        } else if (udl.inputType == 'number') {
          condition = this.allConditionsForNumber;
        } else {
          // STRING (default)
          condition = this.allConditionsForString;
        }

        let aux = {
          nameCond: udl.name,
          conditions: condition,
          values: vals,
          inputType: udl.inputType
        }
        this.conditionsOptions.push(aux);
      }
    },
    // Check the packages.conditions array and add to each element the information needed.
    addOptionsToRetrievedConditions() {

      if (this.packages.conditions.length == 0) {
        this.packages.conditions.push({id: "0", nameCond: '', value: '', condition: '', add: false, delete: false});
      } else {
        for (let cond of this.packages.conditions) {
          cond.id = cond.id;
          cond.nameCond = cond.nameCond;
          cond.condition = cond.condition;
          cond.value = cond.value;
          cond.type = 'conditions';
          let aux = this.retrieveInformation(cond);
          cond.inputType = aux.inputType;
          cond.conditionsConditionsOptions = aux.conditions;
          cond.conditionsValuesOptions = aux.values;
          cond.add = false;
          cond.delete = false;
          cond.nameError = false;
          cond.conditionError = false;
          cond.valueError = false;
        }
      }
      this.reorderButtons();
    },
    // Retrieve all the information of the condition retrieved checking it from the conditionsOptions array.
    retrieveInformation(condition) {
      for (let opt of this.conditionsOptions) {
        if (condition.nameCond == opt.nameCond) {
          return {
            inputType : opt.inputType,
            conditions: opt.conditions,
            values: opt.values
          }
        }
      }
      return {
        inputType : 'string',
        conditions: this.allConditions,
        values: []
      }
    },
    // Reorder the ADD and DELETE buttons in the array of packages.conditions.
    reorderButtons() {
      for (let cond of this.packages.conditions) {
        cond.add = false;
        cond.delete = true;
      }

      let aux = this.packages.conditions[this.packages.conditions.length-1];
      if (aux.nameCond != '' && aux.value != '' && aux.condition != '') {
        aux.add = true;
      } else if (aux.nameCond == '' && aux.value == '' && aux.condition == '') {
        aux.delete = false;
      }
    },
    // Check if the conditions are not empty.
    checkConditions() {
      let submitOk = true;
      if(this.packages.conditions[0].nameCond != '') {
        for (let cond of this.packages.conditions) {
          if (cond.nameCond == '') {
            cond.nameError = true;
            submitOk = false;
          } else {
            cond.nameError = false;
          }

          if (cond.condition == '') {
            cond.conditionError = true;
            submitOk = false;
          } else {
            cond.conditionError = false;
          }

          if (cond.value == '') {
            cond.valueError = true;
            submitOk = false;
          } else {
            cond.valueError = false;
          }
        }
      }

      return submitOk;
    },
    //------------------------------------------END CONDITIONS-------------------------------------------------------
    //------------------------------------------END CONDITIONS-------------------------------------------------------
    //------------------------------------------END CONDITIONS-------------------------------------------------------
    //------------------------------------------END CONDITIONS-------------------------------------------------------
    //------------------------------------------END CONDITIONS-------------------------------------------------------
    //------------------------------------------START PRESETS--------------------------------------------------------
    //------------------------------------------START PRESETS--------------------------------------------------------
    //------------------------------------------START PRESETS--------------------------------------------------------
    //------------------------------------------START PRESETS--------------------------------------------------------
    //------------------------------------------START PRESETS--------------------------------------------------------
    goForwardPreset() {
      if(this.packages.presetsPagination.current_page < this.packages.presetsPagination.total_pages && this.packages.retrieveMore) {
        let optionAux = this.packages.presetsController.option;
        this.packages.presetsController.option = 'forward';

        this.packages.retrieveMore = false;
        if(optionAux == this.packages.presetsController.option) {
          packaging.getPresets(this, this.packages.companyId, this.packages.presetsPagination.current_page + 1);
        } else {
          packaging.getPresets(this, this.packages.companyId, this.packages.presetsPagination.current_page + 2);
        }
      }
    },
    goBackPreset() {
      if(this.packages.presetsPagination.current_page > 2 && this.packages.retrieveMore) {
        let optionAux = this.packages.presetsController.option;
        this.packages.presetsController.option = 'backward';

        this.packages.retrieveMore = false;
        if(optionAux == this.packages.presetsController.option) {
          packaging.getPresets(this, this.packages.companyId, this.packages.presetsPagination.current_page - 1);
        } else {
          packaging.getPresets(this, this.packages.companyId, this.packages.presetsPagination.current_page - 2);
        }
      }
    },
    reloadArrowsForPresetsSwiper() {
      if(this.$refs.swPreset.swiper.isBeginning && this.packages.presetsPagination.current_page == 1) {
        this.packages.presetsController.goBackBoolean = false;
      } else {
        this.packages.presetsController.goBackBoolean = true;
      }

      if(this.$refs.swPreset.swiper.isEnd && this.packages.presetsPagination.current_page == this.packages.presetsPagination.total_pages) {
        this.packages.presetsController.goForwardBoolean = false;
      } else {
        this.packages.presetsController.goForwardBoolean = true;
      }
    },
    addPresetsToTheArray(presets) {
      if (presets.length != 0) {
        if (this.packages.presets.length == 0) {
          this.packages.presets = presets;
        } else {
          if (this.packages.presetsController.option == 'forward') {
            for (let pre of presets) {
              this.packages.presets.push(pre);
            }
            if (this.packages.presets.length > 50) {
              this.deleteTheFirstTwentyFiveOfPresets();
            }
            this.$refs.swPreset.swiper._slideTo(21, 0);
          } else if (this.packages.presetsController.option == 'backward') {
            for (let pre of this.packages.presets) {
              presets.push(pre);
            }
            this.packages.presets = presets;
            if (this.packages.presets.length > 50) {
              this.deleteTheLastPartOfPresets();
            }
            this.$refs.swPreset.swiper._slideTo(25, 0);
          } else {
            // NOTHING
          }
        }
      }
      this.packages.retrieveMore = true;
    },
    deleteTheFirstTwentyFiveOfPresets() {
      this.packages.presets = this.packages.presets.slice(25, this.packages.presets.length);
    },
    deleteTheLastPartOfPresets() {
      this.packages.presets = this.packages.presets.slice(0, 50);
    },
    getUrlOfImageSelected(object) {
      if (object.selected) {
        return 'http://a.rgbimg.com/cache1s6IGK/users/x/xy/xymonau/300/nrmoM6g.jpg';
      } else {
        return 'http://a.rgbimg.com/cache1s6IGX/users/x/xy/xymonau/300/nrmoNS6.jpg';
      }
    },
    getUrlOfImage(object, type) {

      if(object.hasOwnProperty('images')) {
        if (object.images.length > 0 ) {
          for (let i of object.images) {
            if (i.id > 0) {
              return process.env.URL_API + '/images/' + i.id;
            }
          }
        }
      }

      if (type == 'devicevariation') {
        return 'https://openclipart.org/download/213897/black-android-phone.svg';
      } else if (type == 'carrier') {
        return 'http://a.rgbimg.com/cache1s6IGX/users/x/xy/xymonau/300/nrmoNS6.jpg';
      } else if (type == 'service') {
        return 'http://a.rgbimg.com/cache1s6IGX/users/x/xy/xymonau/300/nrmoNS6.jpg';
      } else if (type == 'address') {
        return 'http://a.rgbimg.com/cache1s6IGX/users/x/xy/xymonau/300/nrmoNS6.jpg';
      }
    },
    getNameIfNoImage(imageId, name) {
      if (imageId == 0) {
        return name;
      }
    },
    presetSelected(preset) {
      for (let pres of this.packages.presets) {
        pres.selected = false;
        if(pres.id == preset.id) {
          pres.selected = true;
        }
      }
      packaging.getDeviceVariationsFromPresets(this, preset.id);
    },
    devicevariationList(){
      //if (this.packages.devicevariationsList.length == 0) {
        this.packages.devicevariationsList = [];
        for (let dv of this.packages.presetSelected.devicevariations) {
          let ok = true;
          for (let dvsel of this.packages.devicevariations) {
            if (dv.id == dvsel.id) {
              ok = false;
            }
          }
          if (ok) {
            dv.show = false;
            this.packages.devicevariationsList.push(dv);
          }
        }

        for (let dv of this.packages.devicevariationsList) {
          dv.show = true;
        }

        this.packages.variablesShow.presetSelected = true;
      //}
    },
    devicevariationSelected(devvar, index) {
      this.packages.devicevariationsList.splice(index, 1);
      this.packages.devicevariations.splice(0, 0, devvar);
      this.retrieveTheValuesOfTheDevices();
    },
    devicevariationNoSelected(devvar, index) {
      this.packages.devicevariations.splice(index, 1);
      this.returnToThePresetAbove(devvar);
      this.retrieveTheValuesOfTheDevices();
    },
    returnToThePresetAbove(devvar) {
      for (let dv of this.packages.presetSelected.devicevariations) {
        if(devvar.id == dv.id) {
          this.packages.devicevariationsList.splice(0, 0, devvar);
        }
      }
    },
    retrieveTheValuesOfTheDevices() {
      this.packages.names.devices.minPrice = 0;
      this.packages.names.devices.maxPrice = 0;

      for (let dv of this.packages.devicevariations) {
        if(this.packages.names.devices.minPrice == 0 && this.packages.names.devices.maxPrice == 0) {
          this.packages.names.devices.minPrice = dv.price1;
          this.packages.names.devices.maxPrice = dv.price1;
        } else {
          if(this.packages.names.devices.minPrice > dv.price1) {
            this.packages.names.devices.minPrice = dv.price1;
          }
          if (this.packages.names.devices.maxPrice < dv.price1) {
            this.packages.names.devices.maxPrice = dv.price1;
          }
        }
      }
    },
    //------------------------------------------END PRESETS--------------------------------------------------------
    //------------------------------------------END PRESETS--------------------------------------------------------
    //------------------------------------------END PRESETS--------------------------------------------------------
    //------------------------------------------END PRESETS--------------------------------------------------------
    //------------------------------------------END PRESETS--------------------------------------------------------
    //------------------------------------------START CARRIERS--------------------------------------------------------
    //------------------------------------------START CARRIERS--------------------------------------------------------
    //------------------------------------------START CARRIERS--------------------------------------------------------
    //------------------------------------------START CARRIERS--------------------------------------------------------
    //------------------------------------------START CARRIERS--------------------------------------------------------
    goForwardCarrier() {
      if(this.packages.carriersPagination.current_page < this.packages.carriersPagination.total_pages && this.packages.retrieveMore) {
        let optionAux = this.packages.carriersController.option;
        this.packages.carriersController.option = 'forward';

        this.packages.retrieveMore = false;
        if(optionAux == this.packages.carriersController.option) {
          packaging.getCarriers(this, this.packages.carriersPagination.current_page + 1);
        } else {
          packaging.getCarriers(this, this.packages.carriersPagination.current_page + 2);
        }
      }
    },
    goBackCarrier() {
      if(this.packages.carriersPagination.current_page > 2 && this.packages.retrieveMore) {
        let optionAux = this.packages.carriersController.option;
        this.packages.carriersController.option = 'backward';

        this.packages.retrieveMore = false;
        if(optionAux == this.packages.carriersController.option) {
          packaging.getCarriers(this, this.packages.carriersPagination.current_page - 1);
        } else {
          packaging.getCarriers(this, this.packages.carriersPagination.current_page - 2);
        }
      }
    },
    reloadArrowsForCarriersSwiper() {
      if(this.$refs.swCarrier.swiper.isBeginning && (this.packages.carriersPagination.current_page == 1 || this.packages.carriersPagination.current_page == 2)) {
        this.packages.carriersController.goBackBoolean = false;
      } else {
        this.packages.carriersController.goBackBoolean = true;
      }

      if(this.$refs.swCarrier.swiper.isEnd && this.packages.carriersPagination.current_page == this.packages.carriersPagination.total_pages) {
        this.packages.carriersController.goForwardBoolean = false;
      } else {
        this.packages.carriersController.goForwardBoolean = true;
      }
    },
    addCarriersToTheArray(carriers) {
      if (carriers.length != 0) {
        if (this.packages.carriers.length == 0) {
          this.packages.carriers = carriers;
        } else {
          if (this.packages.carriersController.option == 'forward') {
            for (let pre of carriers) {
              this.packages.carriers.push(pre);
            }
            if (this.packages.carriers.length > 50) {
              this.deleteTheFirstTwentyFiveOfCarriers();
            }
            this.$refs.swCarrier.swiper._slideTo(21, 0);
          } else if (this.packages.carriersController.option == 'backward') {
            for (let pre of this.packages.carriers) {
              carriers.push(pre);
            }
            this.packages.carriers = carriers;
            if (this.packages.carriers.length > 50) {
              this.deleteTheLastPartOfCarriers();
            }
            this.$refs.swCarrier.swiper._slideTo(25, 0);
          } else {
            // NOTHING
          }
        }
      }
      this.packages.retrieveMore = true;
    },
    deleteTheFirstTwentyFiveOfCarriers() {
      this.packages.carriers = this.packages.carriers.slice(25, this.packages.carriers.length);
    },
    deleteTheLastPartOfCarriers() {
      this.packages.carriers = this.packages.carriers.slice(0, 50);
    },
    carrierSelected(carrier) {
      this.packages.variablesShow.carrierSelected = false;
      if(this.packages.retrieveMore) {
        this.packages.retrieveMore = false;

        for (let carr of this.packages.carriers) {
          carr.selected = false;
          if(carr.id == carrier.id) {
            carr.selected = true;
          }
        }

        if (this.packages.carrierSelected != carrier.id) {
          this.packages.servicesList = [];
          this.packages.carrierSelected = carrier;
          this.packages.serviceInformationBool = false;
          packaging.getServicesFromCarriers(this, carrier.id, 1);
        }
      }
    },
    serviceList(){
      this.packages.servicesSwiper = [];
      for (let dv of this.packages.carrierSelected.services) {
        let ok = true;
        for (let dvsel of this.packages.services) {
          if (dv.id == dvsel.id) {
            ok = false;
          }
        }
        if (ok) {
          dv.show = false;
          this.packages.servicesSwiper.push(dv);
        }
      }

      for (let dv of this.packages.servicesSwiper) {
        dv.show = true;
      }

      this.packages.variablesShow.carrierSelected = true;
    },
    serviceInformation(service) {
      for (let serv of this.packages.servicesList) {
        serv.selected = false;
        if(serv.id == service.id) {
          serv.selected = true;
        }
      }
      this.packages.serviceInformation = service;
      this.packages.serviceInformationBool = true;
    },
    serviceSelectedInformation(service) {
      for (let serv of this.packages.services) {
        serv.selected = false;
        if(serv.id == service.id) {
          serv.selected = true;
        }
      }
      this.packages.serviceSelectedInformationBool = true;
      this.packages.serviceSelectedInformation = service;
    },
    serviceSelectedAccepted() {
      this.packages.servicesList.splice(index, 1);
      this.packages.services.splice(0, 0, service);
    },
    returnToTheCarrierAbove(service) {
      for (let dv of this.packages.carrierSelected.services) {
        if(service.id == dv.id) {
          this.packages.servicesList.splice(0, 0, service);
        }
      }
    },
    getClassIfCarrierSelected(carrier) {
      if (carrier.name == this.carrierSelected.name) {
        return 'carrierimage';
      }
    },
    parseServiceItemsValues(value) {
      return ucfirst(value);
    },
    //------------------------------------------END CARRIERS--------------------------------------------------------
    //------------------------------------------END CARRIERS--------------------------------------------------------
    //------------------------------------------END CARRIERS--------------------------------------------------------
    //------------------------------------------END CARRIERS--------------------------------------------------------
    //------------------------------------------END CARRIERS--------------------------------------------------------
    //------------------------------------------START SERVICES------------------------------------------------------
    //------------------------------------------START SERVICES------------------------------------------------------
    //------------------------------------------START SERVICES------------------------------------------------------
    //------------------------------------------START SERVICES------------------------------------------------------
    //------------------------------------------START SERVICES------------------------------------------------------
    goForwardService() {
      if(this.packages.servicesPagination.current_page < this.packages.servicesPagination.total_pages && this.packages.retrieveMore) {
        let optionAux = this.packages.servicesController.option;
        this.packages.servicesController.option = 'forward';

        this.packages.retrieveMore = false;
        if(optionAux == this.packages.servicesController.option) {
          packaging.getServicesFromCarriers(this, this.packages.carrierSelected.id, this.packages.servicesPagination.current_page + 1);
        } else {
          packaging.getServicesFromCarriers(this, this.packages.carrierSelected.id, this.packages.servicesPagination.current_page + 2);
        }
      }
    },
    goBackService() {
      if(this.packages.servicesPagination.current_page > 2 && this.packages.retrieveMore) {
        let optionAux = this.packages.servicesController.option;
        this.packages.servicesController.option = 'backward';

        this.packages.retrieveMore = false;
        if(optionAux == this.packages.servicesController.option) {
          packaging.getServicesFromCarriers(this, this.packages.carrierSelected.id, this.packages.servicesPagination.current_page - 1);
        } else {
          packaging.getServicesFromCarriers(this, this.packages.carrierSelected.id, this.packages.servicesPagination.current_page - 2);
        }
      }
    },
    reloadArrowsForServicesSwiper() {
      if(this.$refs.swServicesList.swiper.isBeginning && (this.packages.servicesPagination.current_page == 1 || this.packages.servicesPagination.current_page == 2)) {
        this.packages.servicesController.goBackBoolean = false;
      } else {
        this.packages.servicesController.goBackBoolean = true;
      }

      if(this.$refs.swServicesList.swiper.isEnd && this.packages.servicesPagination.current_page == this.packages.servicesPagination.total_pages) {
        this.packages.servicesController.goForwardBoolean = false;
      } else {
        this.packages.servicesController.goForwardBoolean = true;
      }
    },
    addServicesToTheArray(services) {
      if (services.length != 0) {
        if (this.packages.servicesListRetrieved.length == 0) {
          this.packages.servicesListRetrieved = services;
          this.$refs.swServicesList.swiper._slideTo(0, 0);
        } else {
          if (this.packages.servicesController.option == 'forward') {
            for (let pre of services) {
              this.packages.servicesListRetrieved.push(pre);
            }
            if (this.packages.servicesListRetrieved.length > 50) {
              this.deleteTheFirstTwentyFiveOfServices();
            }
            this.$refs.swServicesList.swiper._slideTo(21, 0);
          } else if (this.packages.servicesController.option == 'backward') {
            for (let pre of this.packages.servicesListRetrieved) {
              services.push(pre);
            }
            this.packages.servicesListRetrieved = services;
            if (this.packages.servicesListRetrieved.length > 50) {
              this.deleteTheLastPartOfServices();
            }
            this.$refs.swServicesList.swiper._slideTo(25, 0);
          } else {
            // NOTHING
          }
        }
      }
      this.deleteSelectedServicesFromServicesListRetrieved();
      this.packages.retrieveMore = true;
    },
    deleteTheFirstTwentyFiveOfServices() {
      this.packages.servicesListRetrieved = this.packages.servicesListRetrieved.slice(25, this.packages.servicesListRetrieved.length);
    },
    deleteTheLastPartOfServices() {
      this.packages.servicesListRetrieved = this.packages.servicesListRetrieved.slice(0, 50);
    },
    deleteSelectedServicesFromServicesListRetrieved() {
      this.packages.servicesList = [];
      for (let dv of this.packages.servicesListRetrieved) {
        let ok = true;
        for (let dvsel of this.packages.services) {
          if (dv.id == dvsel.id) {
            ok = false;
          }
        }
        if (ok) {
          dv.show = false;
          this.packages.servicesList.push(dv);
        }
      }
      this.packages.variablesShow.carrierSelected = true;
    },
    addServiceSelected() {
      let aux = [];
      this.packages.serviceInformation.selected = false;
      aux.push(this.packages.serviceInformation);
      for (let serv of this.packages.services) {
        aux.push(serv);
      }
      this.packages.services = aux;
      this.packages.serviceInformationBool = false;
      this.deleteSelectedServicesFromServicesListRetrieved();
      this.retrieveTheValuesOfTheServices();
    },
    deleteServiceSelected() {
      let aux =[];
      for (let serv of this.packages.services) {
        if(serv.id != this.packages.serviceSelectedInformation.id){
          aux.push(serv);
        }
      }
      this.packages.services = aux;
      this.packages.serviceSelectedInformationBool = false;
      this.deleteSelectedServicesFromServicesListRetrieved();
      this.retrieveTheValuesOfTheServices();
    },
    retrieveTheValuesOfTheServices() {
      this.packages.names.services.minPrice = 0;
      this.packages.names.services.maxPrice = 0;

      for (let serv of this.packages.services) {
        if(this.packages.names.services.minPrice == 0 && this.packages.names.services.maxPrice == 0) {
          this.packages.names.services.minPrice = serv.cost;
          this.packages.names.services.maxPrice = serv.cost;
        } else {
          if(this.packages.names.services.minPrice > serv.cost) {
            this.packages.names.services.minPrice = serv.cost;
          }
          if (this.packages.names.services.maxPrice < serv.cost) {
            this.packages.names.services.maxPrice = serv.cost;
          }
        }
      }
    },
    //------------------------------------------END SERVICES------------------------------------------------------
    //------------------------------------------END SERVICES------------------------------------------------------
    //------------------------------------------END SERVICES------------------------------------------------------
    //------------------------------------------END SERVICES------------------------------------------------------
    //------------------------------------------END SERVICES------------------------------------------------------
    //------------------------------------------START ADDRESS-----------------------------------------------------
    //------------------------------------------START ADDRESS-----------------------------------------------------
    //------------------------------------------START ADDRESS-----------------------------------------------------
    //------------------------------------------START ADDRESS-----------------------------------------------------
    //------------------------------------------START ADDRESS-----------------------------------------------------
    goForwardAddress() {
      if(this.packages.addressPagination.current_page < this.packages.addressPagination.total_pages && this.packages.retrieveMore) {
        let optionAux = this.packages.addressController.option;
        this.packages.addressController.option = 'forward';

        this.packages.retrieveMore = false;
        if(optionAux == this.packages.addressController.option) {
          packaging.getAddressFromCompany(this, this.packages.addressSelected.id, this.packages.addressPagination.current_page + 1);
        } else {
          packaging.getAddressFromCompany(this, this.packages.addressSelected.id, this.packages.addressPagination.current_page + 2);
        }
      }
    },
    goBackAddress() {
      if(this.packages.addressPagination.current_page > 2 && this.packages.retrieveMore) {
        let optionAux = this.packages.addressController.option;
        this.packages.addressController.option = 'backward';

        this.packages.retrieveMore = false;
        if(optionAux == this.packages.addressController.option) {
          packaging.getAddressFromCompany(this, this.packages.carrierSelected.id, this.packages.addressPagination.current_page - 1);
        } else {
          packaging.getAddressFromCompany(this, this.packages.carrierSelected.id, this.packages.addressPagination.current_page - 2);
        }
      }
    },
    reloadArrowsForAddressSwiper() {
      if(this.$refs.swAddressList.swiper.isBeginning && (this.packages.addressPagination.current_page == 1 || this.packages.addressPagination.current_page == 2)) {
        this.packages.addressController.goBackBoolean = false;
      } else {
        this.packages.addressController.goBackBoolean = true;
      }

      if(this.$refs.swAddressList.swiper.isEnd && this.packages.addressPagination.current_page == this.packages.addressPagination.total_pages) {
        this.packages.addressController.goForwardBoolean = false;
      } else {
        this.packages.addressController.goForwardBoolean = true;
      }
    },
    addressSelectedInformation(address) {
      for (let add of this.packages.address) {
        add.selected = false;
        if(add.id == address.id) {
          add.selected = true;
        }
      }
      this.packages.addressSelectedInformationBool = true;
      this.packages.addressSelectedInformation = address;
    },
    addressSelSelectedInformation(address) {
      for (let add of this.packages.addressSelected) {
        add.selected = false;
        if(add.id == address.id) {
          add.selected = true;
        }
      }
      this.packages.addressSelSelectedInformationBool = true;
      this.packages.addressSelSelectedInformation = address;
    },
    addAddressToSelected() {
      this.packages.address = this.deleteElementFromArrayWithId(this.packages.addressSelectedInformation, this.packages.address);
      this.packages.addressSelected = this.addElementToArrayWithId(this.packages.addressSelectedInformation, this.packages.addressSelected);
      this.packages.addressSelSelectedInformation = this.packages.addressSelectedInformation;
      this.packages.addressSelectedInformationBool = false;
      this.packages.addressSelSelectedInformationBool = true;
    },
    deleteAddressFromSelected() {
      this.packages.addressSelected = this.deleteElementFromArrayWithId(this.packages.addressSelSelectedInformation, this.packages.addressSelected);
      this.packages.address = this.addElementToArrayWithId(this.packages.addressSelSelectedInformation, this.packages.address);
      this.packages.addressSelectedInformation = this.packages.addressSelSelectedInformation;
      this.packages.addressSelectedInformationBool = true;
      this.packages.addressSelSelectedInformationBool = false;
    },
    //------------------------------------------END ADDRESS-----------------------------------------------------
    //------------------------------------------END ADDRESS-----------------------------------------------------
    //------------------------------------------END ADDRESS-----------------------------------------------------
    //------------------------------------------END ADDRESS-----------------------------------------------------
    //------------------------------------------END ADDRESS-----------------------------------------------------
    //---------------------------------------COMMON FUNCTIONS---------------------------------------------------
    //---------------------------------------COMMON FUNCTIONS---------------------------------------------------
    //---------------------------------------COMMON FUNCTIONS---------------------------------------------------
    //---------------------------------------COMMON FUNCTIONS---------------------------------------------------
    //---------------------------------------COMMON FUNCTIONS---------------------------------------------------
    deleteElementFromArrayWithId(element, array) {
      let del = [];
      if (array.length > 0) {
        for (let d of array) {
          if (d.id != element.id) {
            del.push(d);
          }
        }
      }
      return this.changeSelectedToFalseExceptOne(element, del);
    },
    addElementToArrayWithId(element, array) {
      let add = [];
      add.push(element);
      if (array.length > 0) {
        for (let a of array) {
          add.push(a);
        }
      }
      return this.changeSelectedToFalseExceptOne(element, add);
    },
    changeSelectedToFalseExceptOne(element, array) {
      for (let a of array) {
        if (a.id == element.id) {
          a.selected = true;
        } else {
          a.selected = false;
        }
      }
      return array;
    },
    //---------------------------------------COMMON FUNCTIONS---------------------------------------------------
    //---------------------------------------COMMON FUNCTIONS---------------------------------------------------
    //---------------------------------------COMMON FUNCTIONS---------------------------------------------------
    //---------------------------------------COMMON FUNCTIONS---------------------------------------------------
    //---------------------------------------COMMON FUNCTIONS---------------------------------------------------


    showFalse() {
      this.show = false;
    },
    toggleLoading() {
      return this.loading = !this.loading;
    }
  },

  data() {

    return {
      show: false,
      loadedContent: false,
      packages: {
        id: 0,
        page: 1,
        retrieveMore: true,
        name: '',
        nameError: false,
        type: 'packages',
        companyId: 0,
        values : {
          usersConditions: 0,
        },
        variablesShow: {
          presetSelected: false,
          carrierSelected: false,
          carrierSelectedName: '',
        },
        names: {
          managePackage: 'Manage Packages',
          title: 'Title',
          employees: 'Employees',
          saveButton: 'Save Changes',
          prices: {
            minimum: 'Min:', // 'Min: 449.00 USD once - 28.10 USD monthly',
            maximum: 'Max:', // 'Max: 649.00 USD once - 35.10 USD monthly'
            once: 'once',
            monthly: 'monthly',
            currency: 'USD'
          },
          conditions: {
            title: 'CONDITIONS',
            nameCond: '',
            condition: '',
            value: '',
            selectName: 'Select a Name',
            selectCondition: 'Select a Condition',
            selectValue: 'Select a Value',
          },
          services: {
            title: 'SERVICES',
            carriersAvailable: 'Carriers Available',
            servicesAvailable: 'Services Available From ',
            servicesSelected: 'Services Selected',
            minPrice: 0,
            maxPrice: 0,
          },
          devices:  {
            title: 'DEVICES',
            presetsAvailable: 'Presets Available',
            devicesAvailable: 'Devices Available From ',
            devicesSelected: 'Devices Selected',
            minPrice: 0,
            maxPrice: 0,
          },
          address: {
            title: 'ADDRESS',
            available: 'Address Available',
            selected: 'Address Selected',
          },
          errors: {
            textError: 'Internal Server Error, Please Contact the Administrator!'
          }
        },
        apps: [
        {
          id: 0,
          description: '',
          image: '',
          type: 'apps'
        }
        ],
        companies: [
        {
          active: 1,
          assetPath: '',
          currentBillMonth: '',
          defaultLocation: '',
          id: 0,
          isCensus: null,
          label: '',
          name: '',
          shortName: '',
          type: 'companies',
          udlPathRule: null,
          udlpath: null,
          udls: [
          {
            companyId: 0,
            id: 0,
            label: '',
            legacyUdlField: null,
            name: '',
            sections: [
            {
              externalId: 0,
              id: 0,
              name: '',
              udlId: 0
            }
            ]
          }
          ]
        }
        ],
        conditions: [
        {
          id: 0,
          type: 'conditions',
          nameCond: '',
          value: '',
          condition: '',
          conditionsConditionsOptions: [],
          conditionsValuesOptions: [],
          add: false,
          delete: false,
          nameError: false,
          conditionError: false,
          valueError: false,
        }
        ],
        presets: [],
        presetSelected: {
          name: '',
        },
        presetsController: {
          goForwardBoolean: true,
          goBackBoolean: false,
          current_value: 1,
          option: 'forward',
        },
        presetsPagination: {
          count: 25,
          current_page: 1,
          per_page: 25,
          total: 1,
          total_pages: 1,
        },
        devicevariations:  [], // The devicevariations related to packages.
        devicevariationsList: [], // The devicevariations that we will show in the swiper

        carriers: [],
        carrierSelected: {
          name: '',
        },
        carriersController: {
          goForwardBoolean: true,
          goBackBoolean: false,
          current_value: 1,
          option: 'forward',
        },
        carriersPagination: {
          count: 25,
          current_page: 1,
          per_page: 25,
          total: 1,
          total_pages: 1,
        },
        services:  [], // The services related to packages.
        servicesController: {
          goForwardBoolean: true,
          goBackBoolean: false,
          current_value: 1,
          option: 'forward',
        },
        servicesPagination: {
          count: 25,
          current_page: 1,
          per_page: 25,
          total: 1,
          total_pages: 1,
        },
        serviceInformation: {
          title: '',
          serviceitems: [],
        },
        serviceSelectedInformation: {
          title: '',
          serviceitems: []
        },
        serviceInformationBool: false,
        serviceSelectedInformationBool: false,
        servicesList: [], // The services that we will show in the swiper (with the deleted selected services).
        servicesListRetrieved: [], // The services list complete.
        noinformation: [
        {
          url: 'http://b9225bd1cc045e8ddfee-28c20014b7dd8678b4fc08c3466d5dd7.r99.cf2.rackcdn.com/product-hugerect-8124-379-1439234303-4d13a7e2d925af99e752b40b4491454a.jpg',
        }
        ],
        address: [],
        addressList: [],
        addressSelected: {},
        addressController: {
          goForwardBoolean: true,
          goBackBoolean: false,
          current_value: 1,
          option: 'forward',
        },
        addressPagination: {
          count: 25,
          current_page: 1,
          per_page: 25,
          total: 1,
          total_pages: 1,
        },
        addressSelectedInformation: {},
        serviceSelectedInformationBool: false,
        addressSelSelectedInformation: {},
        serviceSelSelectedInformationBool: false,
      },
      allConditions: ['contains', 'greater than', 'greater or equal', 'less than', 'less or equal', 'equal', 'not equal'],
      allConditionsForBoolean: ['equal'],
      allConditionsForString: ['contains', 'equal', 'not equal'],
      allConditionsForNumber: ['greater than', 'greater or equal', 'less than', 'less or equal', 'equal', 'not equal'],
      conditionsOptions : [
      {
        nameCond: 'Supervisor?',
        conditions: ['equal'],
        values: ['Yes', 'No'],  //SELECT
        inputType: 'boolean'
      },
      {
        nameCond: 'Country',
        conditions: ['contains', 'equal', 'not equal'],
        values: ['Spain', 'Catalonia', 'EEUU', 'Canada', 'Germany', 'United Kingdom'],
        inputType: 'string'
      },
      {
        nameCond: 'State',
        conditions: ['contains', 'equal', 'not equal'],
        values: ['state1', 'state2', 'state3'],
        inputType: 'string'
      },
      {
        nameCond: 'City',
        conditions: ['contains', 'equal', 'not equal'],
        values: ['Barcelona', 'New York', 'Berlin', 'London'],
        inputType: 'string'
      }
      ],
      conditionsFieldsOptions: ['Supervisor?', 'Country', 'State', 'City'],
      errors : {
        generalError : false,
      },
      swiperOptionPreset: {
        prevButton:'.swiper-button-prev',
        nextButton:'.swiper-button-next',
        slidesPerView: 5,
        spaceBetween: 10,
        breakpoints: {
          1200: {
            slidesPerView: 4,
          },
          900: {
            slidesPerView: 3,
          },
          600: {
            slidesPerView: 2,
          },
          440: {
            slidesPerView: 1
          }
        },
        onReachEnd: this.goForwardPreset,
        onReachBeginning: this.goBackPreset,
        onSlideChangeStart: this.reloadArrowsForPresetsSwiper,
      },
      swiperOptionDevVarList: {
        prevButton:'.swiper-button-prev',
        nextButton:'.swiper-button-next',
        slidesPerView: 5,
        spaceBetween: 10,
        breakpoints: {
          1100: {
            slidesPerView: 4,
          },
          860: {
            slidesPerView: 3,
          },
          560: {
            slidesPerView: 2,
          },
          380: {
            slidesPerView: 1,
          }
        }
      },
      swiperOptionDevVarSel: {
        prevButton:'.swiper-button-prev',
        nextButton:'.swiper-button-next',
        slidesPerView: 5,
        spaceBetween: 10,
        breakpoints: {
          1024: {
            slidesPerView: 4,
          },
          640: {
            slidesPerView: 2,
          },
          480: {
            slidesPerView: 1,
          }
        }
      },
      swiperOptionCarrier: {
        prevButton:'.swiper-button-prev',
        nextButton:'.swiper-button-next',
        slidesPerView: 5,
        spaceBetween: 10,
        breakpoints: {
          1024: {
            slidesPerView: 4,
          },
          640: {
            slidesPerView: 2,
          },
          480: {
            slidesPerView: 1,
          }
        },
        onReachEnd: this.goForwardCarrier,
        onReachBeginning: this.goBackCarrier,
        onSlideChangeStart: this.reloadArrowsForCarriersSwiper,
      },
      swiperOptionServiceList: {
        prevButton:'.swiper-button-prev',
        nextButton:'.swiper-button-next',
        slidesPerView: 5,
        spaceBetween: 10,
        breakpoints: {
          1024: {
            slidesPerView: 3,
          },
          740: {
            slidesPerView: 2,
          },
          500: {
            slidesPerView: 1,
          }
        },
        onReachEnd: this.goForwardService,
        onReachBeginning: this.goBackService,
        onSlideChangeStart: this.reloadArrowsForServicesSwiper,
      },
      swiperOptionServiceSel: {
        prevButton:'.swiper-button-prev',
        nextButton:'.swiper-button-next',
        slidesPerView: 5,
        spaceBetween: 10,
        breakpoints: {
          1024: {
            slidesPerView: 3,
          },
          740: {
            slidesPerView: 2,
          },
          500: {
            slidesPerView: 1,
          }
        }
      },
      swiperOptionAddress: {
        prevButton:'.swiper-button-prev',
        nextButton:'.swiper-button-next',
        slidesPerView: 5,
        spaceBetween: 10,
        breakpoints: {
          1024: {
            slidesPerView: 4,
          },
          640: {
            slidesPerView: 2,
          },
          480: {
            slidesPerView: 1,
          }
        },
        onReachEnd: this.goForwardAddress,
        onReachBeginning: this.goBackAddress,
        onSlideChangeStart: this.reloadArrowsForAddresssSwiper,
      },
    }
  }
}
