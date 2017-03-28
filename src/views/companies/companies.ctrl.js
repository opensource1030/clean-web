import modal from './../../components/modal.vue'
import paginate from './../../components/paginate.vue'
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
  }
}