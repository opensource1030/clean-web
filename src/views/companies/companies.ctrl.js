import modal from './../../components/modal.vue'
import paginate from './../../components/paginate.vue'
import companyAPI from './../../api/company-api.js'
import { mapGetters, mapActions } from 'vuex'

const spliter = ', '
export default {
  components: {
    modal,
    paginate,
  },

  data () {
    return {
      activeCompany: null,
    }
  },

  computed: {
    ...mapGetters({
      companies: 'company/allCompanies',
    })
  },

  beforeCreate () {
    this.$store.dispatch('company/search')
  },

  methods: {
    prevPage () {
      this.$store.dispatch('company/prevPage')
    },

    nextPage () {
      this.$store.dispatch('company/nextPage')
    },

    removeCompany (company_id) {
      if (confirm("Are you sure you want to remove this company?") == true) {
        companyAPI.remove(company_id, res => {
          this.$store.dispatch('company/search')
        }, err => console.log('company remove', err))
      }
    },

    onCompanyActiveChange (e, company_id) {
      let isChecked = $(e.srcElement).prop('checked')
      let params = {
        id: company_id,
        active: isChecked ? 1 : 0
      }
      this.$store.dispatch('company/update', params)//.then(res => console.log('company update', res), err => console.log('company update error', err))
    },

    setActive (company) {
      if (this.activeCompany && this.activeCompany.id == company.id) {
        this.$set(this, 'activeCompany', null)
      } else {
        this.$set(this, 'activeCompany', company)
      }
      console.log('setActive', this.activeCompany)
    },

    getCompanyImage (company) {
      return '/assets/clean-platform.png'
    },

    getUDLValue (udl) {
      return _.map(udl.sections, (section) => (section.name)).join(spliter)
    },
  }
}