import Vue from 'vue';
import packaging from './../../api/packages/packageid';
import modal from './../../components/modal.vue';
import inputValidate from './../../components/inputValidate.vue';
//import vueSlider from 'vue-slider-component';
import { swiper, swiperSlide } from 'vue-awesome-swiper';

Vue.directive('f-accordion', {
    bind: function(el) {
        Vue.nextTick(function() {
            $(el).foundation();
        });
    }
});

export default {
    name : 'package',
    //el: '#slider',
    components: {
        modal,
        inputValidate,
        //vueSlider,
        //Slider: window[ 'vue-easy-slider' ].Slider,
        //SliderItem: window[ 'vue-easy-slider' ].SliderItem,
        swiper,
        swiperSlide
    },

    beforeCreate() {
        if (this.$route.params.id != null) {
            packaging.getDataPackages(this, this.$route.params.id);
        } else {
            packaging.getUserInformation(this);    
        }
        
    },
    computed: {
        swiper() {
            if (this.$refs.mySwiperA) {
                return this.$refs.mySwiperA.swiper;
            }
        }
    },
    mounted() {
        // you can use current swiper object to do something(swiper methods)
        // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
        if (this.$refs.mySwiperA) {
            console.log('this is current swiper object', this.swiper)
            this.swiper.slideTo(3, 1000, false);
        }
    },
    methods : {
        // Function that changes the ConditionsOptions and ValuesOptions when the Name is changed.
        updatePackageCondition(index, value, type) {

            for (let aux of this.conditionsOptions) {
                if (aux.name == value) {
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
            this.packages.conditions.push({id: "0", name: '', value: '', condition: '', add: false, delete: false});
            this.reorderButtons();
        },
        // Function that deletes the selected element from the packages.conditions list.
        deleteCondition(index) {
            this.packages.conditions.splice(index, 1);
            if (this.packages.conditions.length == 0) {
                this.packages.conditions.push({id: "0", name: '', value: '', condition: '', add: false, delete: false});
            }

            this.reorderButtons();
        },
        // Retrieve from the packages.companies.udls all the information and add it to the conditionsOptions.
        addConditionsOptions() {
            for (let udl of this.packages.companies.udls) {
                //console.log(udl.inputType);

                let vals = [];
                if (udl.sections > 0) {
                    for (let values of udl.sections) {
                        vals.push(values.name);
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
                    name: udl.name,
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
                this.packages.conditions.push({id: "0", name: '', value: '', condition: '', add: false, delete: false});
            } else {
                for (let cond of this.packages.conditions) {
                    cond.id = cond.id;
                    cond.name = cond.name;
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
        },
        // Retrieve all the information of the condition retrieved checking it from the conditionsOptions array.
        retrieveInformation(condition) {
            for (let opt of this.conditionsOptions) {
                if (condition.name == opt.name) {
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

            if (aux.name != '' && aux.value != '' && aux.condition != '') {
                aux.add = true;
            } else if (aux.name == '' && aux.value == '' && aux.condition == '') {
                aux.delete = false;
            }
        },
        // Submit all the changes.
        submit() {

            let submitOk = true;

            submitOk = submitOk && this.checkTitle();
            submitOk = submitOk && this.checkConditions();
            //submitOk = submitOk && this.checkServices();
            //submitOk = submitOk && this.checkDevices();
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
        // Check if the conditions are not empty.
        checkConditions() {

            let submitOk = true;
            if(this.packages.conditions[0].name != '') {
                for (let cond of this.packages.conditions) {                
                    if (cond.name == '') {
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
        // This function allow to show/hide the different zones.
        showAndTell(type) {
            if (type == 'condition') {
                this.showZones.showConditions = !this.showZones.showConditions;
            }
            if (type == 'service') {
                this.showZones.showServices = !this.showZones.showServices;
            }
            if (type == 'device') {
                this.showZones.showDevices = !this.showZones.showDevices;
            }
            if (type == 'address') {
                this.showZones.showAddress = !this.showZones.showAddress;
            }
        }
    },

    data() {
        return {
            packages: {
                id: 0,
                name: '',
                nameError: false,
                type: 'packages',
                addressId: 0,            
                companyId: 0,
                values : {
                    usersConditions: 0,
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
                        name: 'Name (select a Name first)',
                        condition: 'Condition',
                        value: 'Value',
                        selectName: 'Select a Name',
                        selectCondition: 'Select a Condition',
                        selectValue: 'Select a Value',
                    },
                    services: {
                        title: 'SERVICES',
                        minPrice: '28.10',
                        maxPrice: '35.10',
                    },
                    devices:  {
                        title: 'DEVICES',
                        minPrice: '449.00',
                        maxPrice: '649.00',
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
                companies: [],
                conditions: [
                    {
                        id: 0,
                        type: 'conditions',
                        name: '',
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
                devicevariations: [
                    {
                        carrierId: 0,
                        companyId: 0,
                        deviceId: 0,
                        id: 0,
                        price1: 0,
                        price2: 0,
                        priceOwn: 0,
                        priceRetail: 0,
                        type: "devicevariations",
                        devices: [],
                        modifications: [],
                        carriers: [],
                        companies: []
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
            },
            allConditions: ['contains', 'greater than', 'greater or equal', 'less than', 'less or equal', 'equal', 'not equal'],
            allConditionsForBoolean: ['equal'],
            allConditionsForString: ['contains', 'equal', 'not equal'],
            allConditionsForNumber: ['greater than', 'greater or equal', 'less than', 'less or equal', 'equal', 'not equal'],
            conditionsOptions : [
                {
                    name: 'Supervisor?',
                    conditions: ['equal'],
                    values: ['Yes', 'No'],  //SELECT
                    inputType: 'boolean'
                },
                {
                    name: 'Hierarchy',
                    conditions: ['contains', 'greater than', 'greater or equal', 'less than', 'less or equal', 'equal', 'not equal'],
                    values: [], // INPUT
                    inputType: 'string'
                },
                {
                    name: 'Level',
                    conditions: ['greater than', 'greater or equal', 'less than', 'less or equal', 'equal', 'not equal'],
                    values: [],
                    inputType: 'number'
                },
                {
                    name: 'Country',
                    conditions: ['contains', 'equal', 'not equal'],
                    values: ['Spain', 'Catalonia', 'EEUU', 'Canada', 'Germany', 'United Kingdom'],
                    inputType: 'string'
                },
                {
                    name: 'State',
                    conditions: ['contains', 'equal', 'not equal'],
                    values: ['state1', 'state2', 'state3'],
                    inputType: 'string'
                },
                {
                    name: 'City',
                    conditions: ['contains', 'equal', 'not equal'],
                    values: ['Barcelona', 'New York', 'Berlin', 'London'],
                    inputType: 'string'
                }
            ],
            conditionsFieldsOptions: ['Supervisor?', 'Hierarchy', 'Level', 'Country', 'State', 'City'],
            showZones: {
                showConditions: true,
                showServices: false,
                showDevices: false,
                showAddress: false,
            },
            errors : {
                generalError : false,
            },
            //swiperOption: {
                // 所有配置均为可选（同Swiper配置）
                // NotNextTick is a component's own property, and if notNextTick is set to true, the component will not instantiate the swiper through NextTick, which means you can get the swiper object the first time (if you need to use the get swiper object to do what Things, then this property must be true)
                // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象（假如你需要使用获取swiper对象来做什么事，那么这个属性一定要是true）
                
                //scrollbar: '.swiper-scrollbar',
                //scrollbarHide: true,
                //slidesPerView: 4,
                //centeredSlides: true,
                //spaceBetween: 30,
                //paginationClickable: true,
                //grabCursor: true,
                //notNextTick: true,
                //autoplay: 3000,
                //direction : 'vertical',
                
                
                //setWrapperSize :true,
                //autoHeight: true,
                //pagination : '.swiper-pagination',
                //paginationClickable :true,
                //prevButton:'.swiper-button-prev',
                //nextButton:'.swiper-button-next',
                
                //mousewheelControl : true,
                //observeParents:true,
                // if you need use plugins in the swiper, you can config in here like this
                // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
                //debugger: true,
                // swiper callbacks
                // swiper的各种回调函数也可以出现在这个对象中，和swiper官方一样
                //onTransitionStart(swiper){
                    //console.log(swiper)
                //},
                // more Swiper config ...
                // ...
            //},
            swiperOption: {
                pagination: '.swiper-pagination',
                paginationClickable: true,
                slidesPerView: 5,
                spaceBetween: 50,
                breakpoints: {
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 40
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 30
                    },
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20
                    },
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 10
                    }
                }
            }
        }
    }
}