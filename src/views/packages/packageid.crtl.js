import Vue from 'vue';
import packaging from './../../api/packages/packageid';
import modal from './../../components/modal.vue';
import SwiperOption from './../../models/objects/SwiperOption.js';
import inputValidate from './../../components/inputValidate.vue';
import multiselect from 'vue-multiselect';
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
    multiselect,
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
        aux = this.services.itemInformation.serviceitems;
      } else if (type == 'selected') {
        aux = this.services.itemSelectedInformation.serviceitems
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
          aux = this.services.itemInformation.cost - this.services.itemSelectedInformation.cost;
        } else if (type == 'selected') {
          aux = this.services.itemSelectedInformation.cost - this.services.itemInformation.cost;
        }
      } else {
        for (let si of this.services.itemInformation.serviceitems) {
          for (let sisel of this.services.itemSelectedInformation.serviceitems) {
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
      if(this.retrieveMore) {
        this.retrieveMore = false;
        let submitOk = true;
        submitOk = submitOk && this.checkTitle();
        submitOk = submitOk && this.checkConditions();

        if(submitOk) {
          this.packageid.errors.generalError = false;
          if (this.packageid.id > 0) {
            packaging.updateThePackages(this);
          } else {
            packaging.createThePackages(this);
          }
        } else {
          this.packageid.errors.generalError = true;
          this.retrieveMore = true;
        }
      }
    },
    // Check if the title has content and returns error if not.
    checkTitle() {
      let submitOk = true;
      if (this.packageid.name == '') {
        this.packageid.errors.name = true;
        submitOk = false;
      } else {
        this.packageid.errors.name = false;
      }
      return submitOk;
    },
    // Check if the conditions are not empty.
    checkConditions() {
      let submitOk = true;
      if(this.conditions.selected[0].nameCond != '') {
        for (let cond of this.conditions.selected) {
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
    //--------------------------------------------------START CONDITIONS--------------------------------------------------
    //--------------------------------------------------START CONDITIONS--------------------------------------------------
    //--------------------------------------------------START CONDITIONS--------------------------------------------------
    // Function that changes the ConditionsOptions and ValuesOptions when the Name is changed.
    updatePackageCondition(index, value, type) {
      for (let aux of this.information.conditionsOptions) {
        if (aux.nameCond == value) {
          this.conditions.selected[index].conditionsConditionsOptions = aux.conditions;
          this.conditions.selected[index].condition = '';
          this.conditions.selected[index].conditionsValuesOptions = aux.values;
          this.conditions.selected[index].value = '';
          this.conditions.selected[index].inputType = aux.inputType;
          this.conditions.selected[index].nameError = false;
        }
      }
      this.reorderButtons();
    },
    updatePackage(index, value, type) {
      if (type == 'condition') {
        this.conditions.selected[index].condition = value;
        this.conditions.selected[index].conditionError = false;
      }

      if (type == 'value') {
        this.conditions.selected[index].value = value;
        this.conditions.selected[index].valueError = false;
      }
      this.reorderButtons();
    },
    // Function that adds another empty element to the conditions.selected list.
    pushCondition(index) {
      this.conditions.selected.push({id: "0", nameCond: '', value: '', condition: '', add: false, delete: false});
      this.reorderButtons();
    },
    // Function that deletes the selected element from the conditions.selected list.
    deleteCondition(index) {
      this.conditions.selected.splice(index, 1);
      if (this.conditions.selected.length == 0) {
        this.conditions.selected.push({id: "0", nameCond: '', value: '', condition: '', add: false, delete: false});
      }
      this.reorderButtons();
    },
    // Retrieve from the packages.companies.udls all the information and add it to the conditionsOptions.
    addConditionsOptions() {
      for (let udl of this.company.udls) {
        let vals = [];
        if (udl.sections > 0) {
          for (let values of udl.sections) {
            vals.push(values.nameCond);
          }
        }

        this.information.conditionsFieldsOptions.push(udl.name);

        let condition = [];

        if (udl.inputType == 'boolean') {
          condition = this.information.allConditionsForBoolean;
          vals = ['Yes', 'No'];
        } else if (udl.inputType == 'number') {
          condition = this.information.allConditionsForNumber;
        } else {
          // STRING (default)
          condition = this.information.allConditionsForString;
        }

        let aux = {
          nameCond: udl.name,
          conditions: condition,
          values: vals,
          inputType: udl.inputType
        }
        this.information.conditionsOptions.push(aux);
      }
    },
    // Check the conditions.selected array and add to each element the information needed.
    addOptionsToRetrievedConditions(conditions) {
      let auxArray = [];
      if (conditions.length == 0) {
        auxArray.push({id: "0", nameCond: '', value: '', condition: '', add: false, delete: false});
      } else {
        for (let cond of conditions) {
          let aux = this.retrieveInformation(cond);
          let variable = {
            id: cond.id,
            nameCond: cond.nameCond,
            condition: cond.condition,
            value: cond.value,
            type: 'conditions',
            inputType: aux.inputType,
            conditionsConditionsOptions: aux.conditions,
            conditionsValuesOptions: aux.values,
            add: false,
            delete: false,
            nameError: false,
            conditionError: false,
            valueError: false,
          };
          auxArray.push(variable);

        }
      }
      return auxArray;
    },
    // Retrieve all the information of the condition retrieved checking it from the conditionsOptions array.
    retrieveInformation(condition) {
      for (let opt of this.information.conditionsOptions) {
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
        conditions: this.information.allConditions,
        values: []
      }
    },
    // Reorder the ADD and DELETE buttons in the array of conditions.selected.
    reorderButtons() {
      for (let cond of this.conditions.selected) {
        cond.add = false;
        cond.delete = true;
      }

      let aux = this.conditions.selected[this.conditions.selected.length-1];
      if (aux.nameCond != '' && aux.value != '' && aux.condition != '') {
        aux.add = true;
      } else if (aux.nameCond == '' && aux.value == '' && aux.condition == '') {
        aux.delete = false;
      }

      packaging.updateTheUsersThatAccomplishesTheConditions(this);
    },
    //--------------------------------------------------END CONDITIONS--------------------------------------------------
    //--------------------------------------------------END CONDITIONS--------------------------------------------------
    //--------------------------------------------------END CONDITIONS--------------------------------------------------
    //--------------------------------------------------START PRESETS--------------------------------------------------
    //--------------------------------------------------START PRESETS--------------------------------------------------
    //--------------------------------------------------START PRESETS--------------------------------------------------
    goForwardPreset() {
      this.goForward(this.presets.pagination, this.presets.controller, 'getPresets');
    },
    goBackPreset() {
      this.goBack(this.presets.pagination, this.presets.controller, 'getPresets');
    },
    reloadArrowsForPresetsSwiper() {
      //console.log(this.presets.pagination);
      //console.log(this.presets.controller);
      console.log(this.$refs.swPresets.swiper.activeIndex);
      this.reloadArrows(this.presets.pagination, this.presets.controller, this.$refs.swPresets.swiper);
    },
    presetSelected(preset) {
      if(this.presets.selected.id != preset.id) {
        this.devicevariations.list = [];
        this.presets.selected = preset;
        this.presets.isSelected = true;
        this.objectSelected(preset, this.presets.list, 'getDeviceVariationsFromPresets');
      }
    },
    //--------------------------------------------------END PRESETS--------------------------------------------------
    //--------------------------------------------------END PRESETS--------------------------------------------------
    //--------------------------------------------------END PRESETS--------------------------------------------------
    //--------------------------------------------------START DEVICEVARIATIONS--------------------------------------------------
    //--------------------------------------------------START DEVICEVARIATIONS--------------------------------------------------
    //--------------------------------------------------START DEVICEVARIATIONS--------------------------------------------------
    addDeviceVariation(devvar, index) {
      this.devicevariations.filtered.splice(index, 1);
      this.devicevariations.selected.splice(0, 0, devvar);
      this.devicevariations.names = this.retrieveTheValues(this.devicevariations.names, this.devicevariations.selected, 'price1')
    },
    deleteDeviceVariation(devvar, index) {
      this.devicevariations.selected.splice(index, 1);
      this.returnToThePresetAbove(devvar);
      this.devicevariations.names = this.retrieveTheValues(this.devicevariations.names, this.devicevariations.selected, 'price1');
    },
    reloadArrowsForDevicevariationsFilteredSwiper() {
      this.reloadArrows(this.devicevariations.pagination.filtered, this.devicevariations.controller.filtered, this.$refs.swDevicevariationsFiltered.swiper);
    },
    reloadArrowsForDevicevariationsSelectedSwiper() {
      this.reloadArrows(this.devicevariations.pagination.selected, this.devicevariations.controller.selected, this.$refs.swDevicevariationsSelected.swiper);
    },
    returnToThePresetAbove(devvar) {
      if(this.presets.isSelected) {
        for (let dv of this.devicevariations.list) {
          if(devvar.id == dv.id) {
            this.devicevariations.filtered.splice(0, 0, devvar);
          }
        }
      }
    },
    //--------------------------------------------------END DEVICEVARIATIONS--------------------------------------------------
    //--------------------------------------------------END DEVICEVARIATIONS--------------------------------------------------
    //--------------------------------------------------END DEVICEVARIATIONS--------------------------------------------------
    //--------------------------------------------------START CARRIERS--------------------------------------------------
    //--------------------------------------------------START CARRIERS--------------------------------------------------
    //--------------------------------------------------START CARRIERS--------------------------------------------------
    goForwardCarrier() {
      this.goForward(this.carriers.pagination, this.carriers.controller, 'getCarriers');
    },
    goBackCarrier() {
      this.goBack(this.carriers.pagination, this.carriers.controller, 'getCarriers');
    },
    reloadArrowsForCarriersSwiper() {
      this.reloadArrows(this.carriers.pagination, this.carriers.controller, this.$refs.swCarriers.swiper);
    },
    carrierSelected(carrier) {
      if(this.carriers.selected.id != carrier.id) {
        this.services.list = [];
        this.carriers.selected = carrier;
        this.carriers.isSelected = true;
        this.objectSelected(carrier, this.carriers.list, 'getServicesFromCarriers');
      }
    },
    //--------------------------------------------------END CARRIERS--------------------------------------------------
    //--------------------------------------------------END CARRIERS--------------------------------------------------
    //--------------------------------------------------END CARRIERS--------------------------------------------------
    //--------------------------------------------------START SERVICES--------------------------------------------------
    //--------------------------------------------------START SERVICES--------------------------------------------------
    //--------------------------------------------------START SERVICES--------------------------------------------------
    goForwardService() {
      this.goForward(this.services.pagination, this.services.controller.filtered, 'getServicesFromCarriers');
    },
    goBackService() {
      this.goBack(this.services.pagination, this.services.controller.filtered, 'getServicesFromCarriers');
    },
    reloadArrowsForServicesFilteredSwiper() {

      this.reloadArrows(this.services.pagination.filtered, this.services.controller.filtered, this.$refs.swServicesFiltered.swiper);
    },
        reloadArrowsForServicesSelectedSwiper() {
      this.reloadArrows(this.services.pagination.selected, this.services.controller.selected, this.$refs.swServicesSelected.swiper);
    },
    addService() {
      this.services.isSelectedII = false;
      this.services.itemInformation.selected = false;
      this.services.filtered = this.deleteSelectedFromList(this.services.filtered, [this.services.itemInformation]);
      this.services.selected.splice(0,0, this.services.itemInformation);
      this.services.names = this.retrieveTheValues(this.services.names, this.services.selected, 'cost');
    },
    deleteService() {
      this.services.isSelectedISI = false;
      this.services.itemSelectedInformation.selected = false;
      this.services.selected = this.deleteSelectedFromList(this.services.selected, [this.services.itemSelectedInformation]);
      this.returnToTheCarrierAbove(this.services.itemSelectedInformation);
      this.services.names = this.retrieveTheValues(this.services.names, this.services.selected, 'cost');
    },
    returnToTheCarrierAbove(service) {
      if(this.carriers.isSelected) {
        for (let serv of this.services.list) {
          if(service.id == serv.id) {
            this.services.filtered.splice(0, 0, service);
          }
        }
      }
    },
    serviceListInformationFiltered(service) {
      this.services.itemInformation = service;
      this.services.isSelectedII = true;
      this.listInformation(service, this.services.filtered);
    },
    serviceListInformationSelected(service) {
      this.services.itemSelectedInformation = service;
      this.services.isSelectedISI = true;
      this.listInformation(service, this.services.selected);
    },
    //--------------------------------------------------END SERVICES--------------------------------------------------
    //--------------------------------------------------END SERVICES--------------------------------------------------
    //--------------------------------------------------END SERVICES--------------------------------------------------
    //--------------------------------------------------START ADDRESS--------------------------------------------------
    //--------------------------------------------------START ADDRESS--------------------------------------------------
    //--------------------------------------------------START ADDRESS--------------------------------------------------
    goForwardAddress() {
      this.goForward(this.address.pagination, this.address.controller.filtered, 'getAddressFromCompany');
    },
    goBackAddress() {
      this.goBack(this.address.pagination, this.address.controller.filtered, 'getAddressFromCompany');
    },
    reloadArrowsForAddressFilteredSwiper() {
      this.reloadArrows(this.address.pagination.filtered, this.address.controller.filtered, this.$refs.swAddressFiltered.swiper);
    },
    reloadArrowsForAddressSelectedSwiper() {
      this.reloadArrows(this.address.pagination.selected, this.address.controller.filtered, this.$refs.swAddressSelected.swiper);
    },
    addAddress() {
      this.address.isSelectedII = false;
      this.address.itemInformation.selected = false;
      this.address.filtered = this.deleteSelectedFromList(this.address.filtered, [this.address.itemInformation]);
      this.address.selected.splice(0,0, this.address.itemInformation);
    },
    deleteAddress() {
      this.address.isSelectedISI = false;
      this.address.itemSelectedInformation.selected = false;
      this.address.selected = this.deleteSelectedFromList(this.address.selected, [this.address.itemSelectedInformation]);
      this.address.filtered.splice(0,0, this.address.itemSelectedInformation);
    },
    addressListInformationFiltered(address) {
      this.address.itemInformation = address;
      this.address.isSelectedII = true;
      this.listInformation(address, this.address.filtered);
    },
    addressListInformationSelected(address) {
      this.address.itemSelectedInformation = address;
      this.address.isSelectedISI = true;
      this.listInformation(address, this.address.selected);
    },
    //--------------------------------------------------END ADDRESS--------------------------------------------------
    //--------------------------------------------------END ADDRESS--------------------------------------------------
    //--------------------------------------------------END ADDRESS--------------------------------------------------
    //--------------------------------------------------START COMMON FUNCTIONS--------------------------------------------------
    //--------------------------------------------------START COMMON FUNCTIONS--------------------------------------------------
    //--------------------------------------------------START COMMON FUNCTIONS--------------------------------------------------
    /*
     * goForward(pagination, controller, func):
     *  Retrieve the information of the next page of the swiper.
     *
     *  @pagination: is the pagination controller.
     *  @controller: is the swiper controller.
     *  @func: is the function that we need to call.
     *
     */
    goForward(pagination, controller, func) {
      if(pagination.current_page < pagination.total_pages && this.retrieveMore) {
        let optionAux = controller.option;
        controller.option = 'forward';

        this.retrieveMore = false;
        if(optionAux == controller.option) {
          packaging[func](this, pagination.current_page + 1);
        } else {
          packaging[func](this, pagination.current_page + 2);
        }
      }
    },
    /*
     * goBack(pagination, controller, func)
     *  Retrieve the information of the previous page of the swiper.
     *
     *  @pagination: is the pagination controller.
     *  @controller: is the swiper controller.
     *  @func: is the function that we need to call.
     *
     */
    goBack(pagination, controller, func) {
      if(pagination.current_page > 2 && this.retrieveMore) {
        this.retrieveMore = false;
        let optionAux = controller.option;
        controller.option = 'backward';


        if(optionAux == controller.option) {
          packaging[func](this, pagination.current_page - 1);
        } else {
          packaging[func](this, pagination.current_page - 2);
        }
      }
    },
    /*
     * addElementsToTheArray(elements, array, controller, swiper)
     * Adds the elements to the array and reconfigures the controller and the swiper.
     *
     *  @elements: are the elements that we will add to the array.
     *  @array: is the array that we need to fill with elements.
     *  @controller: is the swiper controller.
     *  @swiper: is the .vue swiper options reference.
     *
     *  @return: the array with all elements.
     *
     */
    addElementsToTheArray(elements, array, controller, swiper) {
      if (elements.length != 0) {
        if (array.length == 0) {
          array = elements;
        } else {
          if (controller.option == 'forward') {
            for (let pre of elements) {
              array.push(pre);
            }
            if (array.length > 50) {
              array = array.slice(25, array.length);
            }
            swiper._slideTo(21, 0);
          } else if (controller.option == 'backward') {
            for (let pre of array) {
              elements.push(pre);
            }
            array = elements;
            if (array.length > 50) {
              array = array.slice(0, 50);
            }
            swiper._slideTo(25, 0);
          } else {
            // NOTHING
          }
        }
      }
      this.retrieveMore = true;
      return array;
    },
    /*
     * deleteSelectedFromList(list, selected)
     *  Deletes the selected items from the list.
     *
     *  @pagination: is the pagination controller.
     *  @controller: is the swiper controller.
     *  @type: is the function that we need to call.
     *
     *  @return: the array with the elements in list that are not in selected.
     *
     */
    deleteSelectedFromList(list, selected) {
      let filtered = [];
      for (let l of list) {
        let ok = true;
        for (let ls of selected) {
          if (l.id == ls.id) {
            ok = false;
          }
        }
        if (ok) {
          l.show = false;
          filtered.push(l);
        }
      }

      return filtered;
    },
    /*
     * retrieveTheValues(information, array, type)
     *
     *  @information: is the location of the information (best called names).
     *  @array: is the array with the selected objects.
     *  @type: is the type of the attribute
     *
     *  @return: the information with all the changes.
     *
     */
    retrieveTheValues(information, array, type) {
      information.minPrice = 0;
      information.maxPrice = 0;

      for (let serv of array) {
        if(information.minPrice == 0 && information.maxPrice == 0) {
          information.minPrice = serv[type];
          information.maxPrice = serv[type];
        } else {
          if(information.minPrice > serv[type]) {
            information.minPrice = serv[type];
          }
          if (information.maxPrice < serv[type]) {
            information.maxPrice = serv[type];
          }
        }
      }
      return information;
    },
    /*
     * objectSelected(object, array, func)
     *
     *  @object: is the pagination controller.
     *  @array: is the swiper controller.
     *  @func: is the function that we need to call.
     *
     */
    objectSelected(object, array, func) {
      if(this.retrieveMore) {
        this.retrieveMore = false;
        this.listInformation(object, array);
        packaging[func](this, object, 1);
      }
    },
    /*
     * listInformation(object, array)
     *
     *  @object: is the pagination controller.
     *  @array: is the array of objects.
     *
     */
    listInformation(object, array) {
      for (let obj of array) {
        obj.selected = false;
        if(obj.id == object.id) {
          obj.selected = true;
        }
      }
    },
    /*
     * getUrlOfImageSelected(object)
     *
     *  @object: the object information.
     *
     *  @return: return the url to the image.
     *
     */
    getUrlOfImageSelected(object) {
      if (object.selected) {
        return 'http://a.rgbimg.com/cache1s6IGK/users/x/xy/xymonau/300/nrmoM6g.jpg';
      } else {
        return 'http://a.rgbimg.com/cache1s6IGX/users/x/xy/xymonau/300/nrmoNS6.jpg';
      }
    },
    /*
     * getUrlOfImage(object, type)
     *
     *  @object: the object information.
     *  @type: the type of the object to return an image or another.
     *
     *  @return: the image related to the object.
     *
     */
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
    /*
     * goForward(pagination, controller, type)
     *
     *  @pagination: is the pagination controller.
     *  @controller: is the swiper controller.
     *  @type: is the function that we need to call.
     *
     */
    getNameIfNoImage(imageId, name) {
      if (imageId == 0) {
        return name;
      }
    },
    //--------------------------------------------------END COMMON FUNCTIONS--------------------------------------------------
    //--------------------------------------------------END COMMON FUNCTIONS--------------------------------------------------
    //--------------------------------------------------END COMMON FUNCTIONS--------------------------------------------------
    showFalse() {
      this.show = false;
    },
    toggleLoading() {
      return this.loading = !this.loading;
    }
  },

  data() {
    let presetOptions = new SwiperOption(this.goForwardPreset, this.goBackPreset).toJSON('1200', '1000', '750', '450');
    let dvfilteredOptions = new SwiperOption(null, null).toJSON('1100', '860', '560', '380');
    let dvselectedOptions = new SwiperOption(null, null).toJSON('1100', '860', '560', '380');
    let carrierOptions = new SwiperOption(this.goForwardCarrier, this.goBackCarrierr).toJSON('1350', '1100', '900', '550');
    let servicefilteredOptions = new SwiperOption(this.goForwardService, this.goBackService).toJSON('1200', '1050', '870', '550');
    let serviceselectedOptions = new SwiperOption(null, null).toJSON('1200', '1050', '870', '550');
    let addressfilteredOptions = new SwiperOption(this.goForwardAddress, this.goBackAddress).toJSON('1270', '1050', '850', '500');
    let addressselectedOptions = new SwiperOption(null, null).toJSON('1270', '1050', '850', '500');

    return {

      show: false,
      loadedContent: false,
      retrieveMore: true,
      packageid: {
        id: 0,
        type: 'packages',
        name: '',
        companyId: 0,
        errors: {
          name: false,
          text: 'Internal Server Error, Please Contact the Administrator!',
          generalError: false,
          generalMessage: '',
        },
        names: {
          managePackage: 'Manage Package',
          title: 'Title',
          saveButton: 'Save Changes',
          prices: {
            minimum: 'Min:', // 'Min: 449.00 USD once - 28.10 USD monthly',
            maximum: 'Max:', // 'Max: 649.00 USD once - 35.10 USD monthly'
            once: 'once',
            monthly: 'monthly',
            currency: 'USD'
          }
        },
        noinformation: [
        {
          url: 'http://b9225bd1cc045e8ddfee-28c20014b7dd8678b4fc08c3466d5dd7.r99.cf2.rackcdn.com/product-hugerect-8124-379-1439234303-4d13a7e2d925af99e752b40b4491454a.jpg',
        }
        ]
      },
      company: {
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
      },
      conditions: {
        selected: [
        {
          id: 0,
          nameCond: '',
          condition: '',
          value: '',
          type: 'conditions',
          inputType: '',
          conditionsConditionsOptions: [],
          conditionsValuesOptions: [],
          add: false,
          delete: false,
          nameError: false,
          conditionError: false,
          valueError: false,
        }
        ],
        namesList: [],
        namesConditions: [],
        namesValues: [],
        list: [],
        numberOfUsers: 0,
        names: {
          employees: 'Employees',
          title: 'CONDITIONS',
          titleField: 'Label',
          conditionField: 'condition',
          valueField: 'value',
          nameCond: '',
          condition: '',
          value: '',
          selectName: 'Select a Name',
          selectCondition: 'Select a Condition',
          selectValue: 'Select a Value',
        }
      },
      presets: {
        list: [],
        selected: {
          id: 0,
        },
        isSelected: false,
        names: {
          available: 'Presets Available',
        }
      },
      devicevariations: {
        list: [], // Complete List.
        filtered: [], // Filtered List.
        selected: [], // Selected List.
        names: {
          title: 'DEVICES',
          available: 'Devices Available From ',
          selected: 'Devices Selected',
          minPrice: 0,
          maxPrice: 0,
        }
      },
      carriers: {
        list: [],
        selected: {
          id: 0,
        },
        isSelected: false,
        names: {
          available: 'Carriers Available',
        }
      },
      services: {
        itemInformation: {
          serviceitems: [],
        },
        isSelectedII: false,
        itemSelectedInformation: {
          serviceitems: [],
        },
        isSelectedISI: false,
        list: [
        {
          serviceitems: [],
        }
        ], // Complete List.
        filtered: [
        {
          serviceitems: [],
        }
        ], // Filtered List.
        selected: [
        {
          serviceitems: [],
        }
        ], // Selected List.
        names: {
          title: 'SERVICES',
          available: 'Services Available From ',
          selected: 'Services Selected',
          minPrice: 0,
          maxPrice: 0,
        }
      },
      address: {
        itemInformation: {},
        isSelectedII: false,
        itemSelectedInformation: {},
        isSelectedISI: false,
        list: [], // Complete List.
        filtered: [], // Filtered List.
        selected: [], // Selected List.
        names: {
          title: 'ADDRESS',
          available: 'Address Available',
          selected: 'Address Selected',
        }
      },
      information: {
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
      },
      swiperOption: {
        preset: presetOptions,
        devicevariationsFiltered: dvfilteredOptions,
        devicevariationsSelected: dvselectedOptions,
        carrier: carrierOptions,
        serviceFiltered: servicefilteredOptions,
        serviceSelected: serviceselectedOptions,
        addressFiltered: addressfilteredOptions,
        addressSelected: addressselectedOptions
      }
    }
  }
}
