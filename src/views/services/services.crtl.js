import Vue from 'vue';
import pagination from './../../components/pagination';
import {findServiceItem, orderFilters} from './../../components/filters.js';
import services from './../../api/service/services';
import modal from './../../components/modal.vue';
import Multiselect from './../../components/Multiselect.vue';
import searchCost from './../../components/searchCost.vue';

import {
    mapGetters,
    mapActions
} from 'vuex'

export default {
  computed: {
   ...mapGetters({
       Service: 'services/getService',
       select:'services/getSelects',

       pagination:'services/getPagination',
   })



},
    components : {
        pagination,
        modal,
        Multiselect: Multiselect,
        searchCost
    },
    methods : {
        findServiceItem,
        orderFilters,
           ...mapActions([
               'services/Carriers',
               'services/Services'
           ]),

        loadData() {

                this.$store.dispatch('services/Carriers', this.pagination.current_page)


        this.$store.dispatch('services/Services',
        { pages:this.pagination.current_page,costMax:this.search.costMax,costMin:this.search.costMin,values:this.values})

            //services.getServicesPage(this, this.pagination.current_page);
        },
        setActive: function(index) {
            if(this.Service.active == index) {
                this.Service.servicesList[index].show = !this.Service.servicesList[index].show;
            } else {
                this.Service.servicesList[this.Service.active].show = false;
                this.Service.servicesList[index].show = true;
            }
            this.Service.active = index;

            this.addons = [];
            for (let j = 0; j < this.Service.servicesList[index].serviceitems.length; j++) {
                if( this.Service.servicesList[index].serviceitems[j].category == 'addon') {
                    this.addons.push(this.Service.servicesList[index].serviceitems[j]);
                }
            }
        },
        showAddons: function() {
            this.Service.addonsShow = !this.Service.addonsShow;
        },
        onSelectColumn: function(value,field) {
          this.$store.dispatch('services/Services',
          { pages:this.pagination.current_page,costMax:this.search.costMax,costMin:this.search.costMin,values:this.values})
        },
        setActiveCostOptions: function() {
            this.search.searchShow = !this.search.searchShow;
        },

    },
    data() {
        return {
          // Selected Values
          values: {
              status: '',
              plans: '', // service.title
              details: '', // service.descriptions
              codePlan: '', // service.codePlan
              carrier: [], // carriers.presentation
              cost: '', // service.cost
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
