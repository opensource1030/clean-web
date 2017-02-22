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
  computed: {
  },
  mounted() {},
  methods : {
    deleteRepeated,
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
    getUrlOfImage(object) {
      if (object.images.length > 0 ) {
        for (let i of object.images) {
          if (i.id > 0) {
            return process.env.URL_API + '/images/' + i.id;
          }
        }
      }
      return 'https://openclipart.org/download/213897/black-android-phone.svg';
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
    },
    devicevariationNoSelected(devvar, index) {
      this.packages.devicevariations.splice(index, 1);
      this.returnToThePresetAbove(devvar);
    },
    returnToThePresetAbove(devvar) {
      for (let dv of this.packages.presetSelected.devicevariations) {
        if(devvar.id == dv.id) {
          this.packages.devicevariationsList.splice(0, 0, devvar);
        }
      }
    },
/*
    retrieveTheNewDevicesSelectedList() {
      for (let dv of this.packages.devicevariations) {
        dv.preset = '';
        for (let pres of this.packages.presets) {
          for (let dvsel of pres.devicevariations) {
            if(dvsel.id == dv.id) {
              dv.preset = dv.preset + pres.name + ', ';
            }
          }
        }
        dv.preset = dv.preset.substring(0, dv.preset.length-2);
      }

      if (this.packages.devicevariations.length > 1) {
        this.packages.devicevariations = deleteRepeated(this.packages.devicevariations, 'id', 'name', 'number', 'asc');
      }
      this.retrieveTheValuesOfTheDevices(this.packages.devicevariations);
    },
*/








    carrierSelected(carrier) {
      this.packages.variablesShow.carrierSelected = true;
      this.packages.variablesShow.carrierSelectedName = carrier.presentation;
      for (let carr of this.packages.carriers) {
        carr.selected = false;
      }
      carrier.selected = true;
      this.servicesList();
    },

    serviceSelected(service, index) {
      this.packages.service = service;
      this.packages.service.show = true;
    },


    retrieveTheNewServicesSelectedList() {
      for (let serv of this.packages.services) {
        serv.carrier = '';
        for (let carr of this.packages.carriers) {
          for (let servsel of carr.services) {
            if(servsel.id == serv.id) {
              serv.carrier = serv.carrier + carr.presentation + ', ';
            }
          }
        }
        serv.carrier = serv.carrier.substring(0, serv.carrier.length-2);
      }

      if (this.packages.services.length > 1) {
        this.packages.services = deleteRepeated(this.packages.services, 'id', 'planCode', 'number', 'asc');
      }
      this.retrieveTheValuesOfTheDevices(this.packages.services);
    },
    servicesList(){
      this.packages.servicesList = [];
      for (let carr of this.packages.carriers) {
        if (carr.selected) {
          for (let serv of carr.services) {
            let ok = true;
            for (let servsel of this.packages.services) {
              if (serv.id == servsel.id) {
                ok = false;
              }
            }
            if(ok) {
              this.packages.servicesList.push(serv);
            }
          }
        }
      }
    },
    retrieveTheValuesOfTheDevices(devicevariations) {
      this.packages.names.devices.minPrice = 0;
      this.packages.names.devices.maxPrice = 0;

      for (let dv of devicevariations) {
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
        addressId: 0,
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
            minPrice: '28.10',
            maxPrice: '35.10',
          },
          devices:  {
            title: 'DEVICES',
            presetsAvailable: 'Presets Available',
            devicesAvailable: 'Devices Available From ',
            devicesSelected: 'Devices Selected',
            minPrice: 0,
            maxPrice: 0,
          },
          errors: {
            textError: 'Some Fields need to be filled! Please, check the conditions!'
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
          condition: '',
          value: '',
          typeCond: '',
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
        carriers : [],
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
        servicesList: [],
        noinformation: [
        {
          url: 'http://b9225bd1cc045e8ddfee-28c20014b7dd8678b4fc08c3466d5dd7.r99.cf2.rackcdn.com/product-hugerect-8124-379-1439234303-4d13a7e2d925af99e752b40b4491454a.jpg',
        }
        ],
        services: [
        {
          carrierId: 0,
          carriers: [
          {
            active: 1,
            id: 0,
            locationId: 0,
            name: '',
            presentation: '',
            shortName: '',
            type: 'carriers'
          }
          ],
          cost: 0,
          description: '',
          id: 0,
          planCode: 0,
          status: 'Enabled',
          title: '',
          type: 'services'
        }
        ],
        service: [
        {
          show: false,
          title: 'EXAMPLE TITLE',
          planCode: 0,
          cost: 0,
          description: '',
          currency: '',
          serviceitems: [],
        }
        ],
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
        paginationType: 'progress',
        pagination : '.swiper-pagination',
        paginationClickable :true,
        prevButton:'.swiper-button-prev',
        nextButton:'.swiper-button-next',
        slidesPerView: 5,
        spaceBetween: 10,
        breakpoints: {
          1024: {
            slidesPerView: 5,
          },
          768: {
            slidesPerView: 3,
          },
          640: {
            slidesPerView: 2,
          },
          320: {
            slidesPerView: 1,
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
          1024: {
            slidesPerView: 5,
          },
          768: {
            slidesPerView: 3,
          },
          640: {
            slidesPerView: 2,
          },
          320: {
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
            slidesPerView: 5,
          },
          768: {
            slidesPerView: 3,
          },
          640: {
            slidesPerView: 2,
          },
          320: {
            slidesPerView: 1,
          }
        }
      }
    }
  }
}
