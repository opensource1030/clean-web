import Vue from 'vue';
import pagination from './../../components/pagination';
import {findByService, orderFilters} from './../../components/filters.js';
import services from './../../api/service/services';
import modal from './../../components/modal.vue';

export default {
    name : 'Services',
    components : {
        pagination: Pagination,
        modal: modal
    },
    methods : {
        filterByModificationsd,
        filterByModifications,
        findByService,

        loadData() {
            services.getServices(this, this.pagination.current_page);
        },
        filterByCarrier,
        setActive: function(index) {
            this.active = index;
            this.services[this.active].hide = !this.services[this.active].hide;
            if (this.services[this.active].show == true) {
                this.services[this.active].show = false;
            } else {
                this.services[this.active].show = true;
                for (let i = 0; i < this.services.length; i++) {
                    if (this.services[this.active].id != this.services[i].id) {
                        this.services[i].show = false;
                    }
                }
            }
        },
        onSelectColumn: function() {
            services.getServices(this, this.pagination.current_page);
        },
        setActiveCostOptions: function() {
            if(this.search.searchShow){
                this.search.searchShow = false;
            } else {
                this.search.searchShow = true;
            }
        },
        searchCost: function() {
            if(this.search.costMin <= this.search.costMax) {
                this.search.errorCost = false;
                this.search.searchShow = false;
                this.search.searchFilter = true;
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
            active: 0,
            firstTime: true,
            services: [],
            loading: true,
            showtable: false,
            showModal: false,
            loadpagination: false,
            errorNotFound:false,
            filter : {
                status: [],
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
                carrier: '',                
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
                domData: 'Data',
                domSms: 'SMS',
                intMinutes: 'International Minutes',
                intData: 'International Data',
                intSms: 'International SMS',
                managePlanButton: 'Manage Plan',
                noServiceFound: 'No Services provided. Please, click on "Add Plan" button to create the first service plan.'                
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
