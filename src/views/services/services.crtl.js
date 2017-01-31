import Vue from 'vue';
import pagination from './../../components/pagination';
import {findServiceItem, orderFilters} from './../../components/filters.js';
import services from './../../api/service/services';
import modal from './../../components/modal.vue';

export default {
    name : 'Services',
    components : {
        pagination,
        modal
    },
    methods : {
        findServiceItem,
        orderFilters,

        loadData() {
            services.getServicesPage(this, this.pagination.current_page);
        },
        setActive: function(index) {
            if(this.active == index) {
                this.services[index].show = !this.services[index].show;
            } else {
                if(this.active != -1) {
                    this.services[this.active].show = false;
                }
                this.services[index].show = true;
            }
            this.active = index;

            this.addons = [];
            for (let j = 0; j < this.services[index].serviceitems.length; j++) {
                if( this.services[index].serviceitems[j].category == 'addon') {
                    this.addons.push(this.services[index].serviceitems[j]);
                }
            }
        },
        showAddons: function() {
            this.addonsShow = !this.addonsShow;
        },
        onSelectColumn: function() {
            services.getServicesPage(this, this.pagination.current_page);
        },
        setActiveCostOptions: function() {
            this.search.searchShow = !this.search.searchShow;
        },
        searchCost: function() {
            if(this.search.costMin <= this.search.costMax) {
                this.search.errorCost = false;
                this.search.searchShow = false;
                if(this.search.costMin != 0 || this.search.costMax != 0) {
                    this.search.costFilterMessage = this.search.costMin + ' > ' + this.search.costMax;
                } else {
                    this.search.costFilterMessage = '';
                }

                this.onSelectColumn();
            } else {
                this.search.errorCost = true;
            }
            
        },
        resetValuesCost: function() {
            this.search.costMin = 0;
            this.search.costMax = 0;
            this.search.errorCost = false;
        }
    },
    data() {
        return {
            active: -1,
            firstTime: true,
            services: [],
            addons: [],
            addonsShow: false,
            retrieved: 0,
            loading: true,
            showtable: false,
            showModal: false,
            errorNotFound:false,
            filter : {
                status: ['Enabled', 'Disabled'],
                services: [],
                plans: [],
                details: [],
                codePlan: [],
                carriers: [],
                cost: [],
            },
            pagination: {
                current_page: 1,
                total_pages: null,
                count: null,
                total: null,
                per_page: 25
            },
            values: {
                status: '',
                plans: '',
                codePlan: '',
                carriers: '',
                cost: '',
                details: '',
                carrier: ''
            },
            names: {
                servicePlans: 'Service Plans',
                addPlan: 'Add Plan',
                status: 'Status',
                plans: 'Plans',
                details: 'Details',
                planCode: 'Plan Code',
                carrier: 'Carrier',
                cost: 'Cost',
                domMinutes: 'Minutes',
                domMinutesMessage: ' Domestic Minutes',
                domData: 'Data',
                domDataMessage: 'Domestic Data',
                domSms: 'SMS',
                domSmsMessage: 'Domestic SMS',
                intMinutes: 'International Minutes',
                intMinutesMessage: 'International Minutes',
                intData: 'International Data',
                intDataMessage: 'International Data',
                intSms: 'International SMS',
                intSmsMessage: 'International SMS',
                managePlanButton: 'Manage Plan',
                noServiceFound: 'No Services provided. Please, click on "Add Plan" button to create the first service plan or reset the Search.'                
            },
            search: {
                firstTime: true,
                errorCost: false,
                errorCostMessage: 'MIN > MAX',
                searchShow: false,
                searchName: 'Search',
                resetName: 'R',
                costMinName: 'MIN Cost',
                costMin: 0,
                costMaxName: 'MAX Cost',
                costMax: 0,
                searchFilter: false,
                costFilterMessage: '',
            },
            defaultServiceItems: [
                {
                    category: "voice",
                    domain: "domestic",
                    type: "service_items",
                    unit: "minutes",
                    value: 0,
                    description: '',
                    cost: 0,
                },
                {
                    category: "data",
                    domain: "domestic",
                    type: "service_items",
                    unit: "Gb",
                    value: 0,
                    description: '',
                    cost: 0,
                },
                {
                    category: "messaging",
                    domain: "domestic",
                    type: "service_items",
                    unit: "messages",
                    value: 0,
                    description: '',
                    cost: 0,
                },
                {
                    category: "voice",
                    domain: "international",
                    type: "service_items",
                    unit: "minutes",
                    value: 0,
                    description: '',
                    cost: 0,
                },
                {
                    category: "data",
                    domain: "international",
                    type: "service_items",
                    unit: "Gb",
                    value: 0,
                    description: '',
                    cost: 0,
                },
                {
                    category: "messaging",
                    domain: "international",
                    type: "service_items",
                    unit: "messages",
                    value: 0,
                    description: '',
                    cost: 0,
                }
            ]
        }
    }
}
