import swal from 'sweetalert2'
import paginate from './../../components/paginate'
import Modal from './../../components/modal'
import { mapGetters } from 'vuex'
import { PresetHelper } from './../../helpers'
import presetAPI from './../../api/preset-api.js'

export default {
  name: 'Presets',

  components: {
    paginate,
    Modal,
  },

  data() {
    return {
      activePreset: null,
      isReady: false,
      filters: {
        names: {
          isLoading: false,
          options: [],
          values: [],
        },
        makers: {
          isLoading: false,
          options: [],
          values: [],
        },
        types: {
          isLoading: false,
          options: [],
        },
        carriers: {
          isLoading: false,
          options: [],
        },
      }
    }
  },

  computed: {
    ...mapGetters({
      presets: 'preset/sorted',
      // pagination: 'presets/getPagination',
      // variations: 'presets/getVariation',

      devices: 'device/allDevices',
      styles: 'modification/styleModifications',
      capacities: 'modification/capacityModifications',
    }),

    PresetHelper () {
      return PresetHelper
    },
  },

  created () {
    this.$set(this, 'isReady', false)
    Promise.all([
      this.$store.dispatch('modification/search'),
      this.$store.dispatch('carrier/search'),
      this.$store.dispatch('device/search', { search: 0 }),
    ]).then((data) => {
      this.$store.dispatch('preset/search')
      this.$set(this, 'isReady', true)
    })
  },

  methods: {
    prevPage () {
      this.$store.dispatch('preset/prevPage')
    },

    nextPage () {
      this.$store.dispatch('preset/nextPage')
    },

    setActive (preset) {
      if (this.activePreset && this.activePreset.id == preset.id) {
        this.$set(this, 'activePreset', null)
      } else {
        this.$set(this, 'activePreset', preset)
      }
    },

    searchPresets() {
      this.$store.dispatch('preset/searchByName', { query: this.query })
    },

    removePreset(preset_id) {
      const vm = this
      swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(() => {
        presetAPI.remove(preset_id, res => {
          vm.$store.dispatch('preset/search')
          swal({
            title: 'Deleted!',
            text: 'Requested Preset has been removed',
            type: 'success',
            timer: 2000,
            showConfirmButton: false
          }).then(() => {}, (dismiss) => { // vm.$store.dispatch('preset/search')
          })
        })
      }, (dismiss) => {
        // dismiss can be 'cancel', 'overlay',
        // 'close', and 'timer'
        if (dismiss === 'cancel') {
          swal(
            'Cancelled',
            'Selected preset is safe.',
            'error'
          )
        }
      })
    }
  },
}