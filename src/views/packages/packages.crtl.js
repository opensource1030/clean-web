import Vue from 'vue';
import Pagination from './../../components/pagination';

export default {

    components : {
        pagination: Pagination,
    },
    beforeCreate() {

    },

    methods : {
    
    },
    data() {
        return {
            pagination: {
                current_page: 1,
                total_pages: null,
                count: null,
                total: null,
                per_page: 25
            }
        };
    }
};
