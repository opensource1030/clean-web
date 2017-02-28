import Vue from 'vue';
import pagination from './../../components/pagination';
import {findServiceItem, orderFilters} from './../../components/filters.js';
import services from './../../api/service/services';
import modal from './../../components/modal.vue';
import Multiselect from './../../components/Multiselect.vue';
import searchCost from './../../components/searchCost.vue';

export default {
    components : {
        pagination,
        modal,
        Multiselect: Multiselect,
        searchCost
    },
    methods : {
        findServiceItem,
        orderFilters,
        loadData() {
            services.getServicesPage(this, this.pagination.current_page);
        },
        setActive: function(index) {
            if(this.active == index) {
                this.servicesList[index].show = !this.servicesList[index].show;
            } else {
                this.servicesList[this.active].show = false;
                this.servicesList[index].show = true;
            }
            this.active = index;

            this.addons = [];
            for (let j = 0; j < this.servicesList[index].serviceitems.length; j++) {
                if( this.servicesList[index].serviceitems[j].category == 'addon') {
                    this.addons.push(this.servicesList[index].serviceitems[j]);
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

    },
    data() {
        return {
            active: 0,
            firstTime: true,
            servicesList: [],
            addons: [],
            addonsShow: false,

            retrieved: 0,
            loading: true,
            showtable: false,
            showModal: false,
            errorNotFound:false,
            // Information Needed for the Selects
            status: ['Enabled', 'Disabled'],
            services: [],
            plans: [],
            details: [],
            codePlan: [],
            carriers: [],
            cost: [],
            // Selected Values
            values: {
                status: '',
                plans: '', // service.title
                details: '', // service.descriptions
                codePlan: '', // service.codePlan
                carrier: [], // carriers.presentation
                cost: '', // service.cost
            },
            // Pagination
            pagination: {
                current_page: 1,
                total_pages: null,
                count: null,
                total: null,
                per_page: 25
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
                searchFilter: false,
                costFilterMessage: '',
                searchShow: false,
                costMax: 0,
                costMin: 0,
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
