import modal from './../../components/modal.vue'
import paginate from './../../components/paginate.vue'
import companyAPI from './../../api/company-api.js'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    modal,
    paginate,
  },

  data () {
    return {

    }
  },

  computed: {
    ...mapGetters({
      companies: 'company/allCompanies',
    })
  },

  beforeCreate () {
    this.$store.dispatch('company/getAll')
  },

  methods: {
    prevPage () {
      this.$store.dispatch('company/prevPage')
    },

    nextPage () {
      this.$store.dispatch('company/nextPage')
    },

    removeCompany (company_id) {
      companyAPI.remove(company_id, res => {
        this.$store.dispatch('company/getAll')
      }, err => console.log('company remove', err))
    },

    onCompanyActiveChange (e, company_id) {
      let isChecked = $(e.srcElement).prop('checked')
      let params = {
        id: company_id,
        active: isChecked ? 1 : 0
      }
      this.$store.dispatch('company/update', params)//.then(res => console.log('company update', res), err => console.log('company update error', err))
    },
  }
}