import modal from './../../components/modal.vue'
import paginate from './../../components/paginate.vue'
import companyAPI from './../../api/company-api.js'
import { mapGetters, mapActions } from 'vuex'
import swal from 'sweetalert2'

const spliter = ', '
export default {
  components: {
    modal,
    paginate,
  },

  data () {
    return {
      activeCompany: null,
      query: '',
    }
  },

  computed: {
    ...mapGetters({
      companies: 'company/allCompanies',
    })
  },

  created () {
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
      swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(function () {
        companyAPI.remove(company_id, res => {
          this.$store.dispatch('company/search')
        }, err => console.log('company remove', err))

        swal('Deleted!', 'Requested company has been deleted.', 'success')
      }, function (dismiss) {
        // dismiss can be 'cancel', 'overlay',
        // 'close', and 'timer'
        if (dismiss === 'cancel') {
          swal('Cancelled', 'Selected company is safe :)', 'error')
        }
      });
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
      // console.log('setActive', this.activeCompany)
    },

    getCompanyImage (company) {
      return '/assets/clean-platform.png'
    },

    getUDLValue (udl) {
      // return _.map(udl.sections, (section) => (section.name)).join(spliter)
      return _.map(udl.udlvalues, (uv) => (uv.udlValue)).join(spliter)
    },

    searchCompanies() {
      // console.log(this.query, this.query.length)
      // if (this.query.length > 1)
      this.$store.dispatch('company/searchByName', {query: this.query})
    }
  }
}