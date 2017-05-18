import paginate from "./../../components/paginate";
import Modal from "./../../components/modal";
import searchCost from "./../../components/searchCost.vue";
import {mapGetters} from "vuex";
import swal from "sweetalert2";
export default {
  name: 'Presets',

  components: {
    paginate,
    Modal,
    searchCost
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

  created () {
    this.$set(this, 'isReady', false)
    Promise.all([
      this.$store.dispatch('modification/search'),
      this.$store.dispatch('carrier/search'),
      this.$store.dispatch('device/search', { search: 0 }),
    ]).then((data) => {
      this.$store.dispatch('presets/search')
      this.$set(this, 'isReady', true)
    })
  },

  computed: {
    ...mapGetters({
      presets: 'presets/getPreset',
      pagination: 'presets/getPagination',
      variations: 'presets/getVariation',

      devices: 'device/allDevices',
      styles: 'modification/styleModifications',
      capacities: 'modification/capacityModifications',
    })
  },

  methods: {
    prevPage () {
      this.$store.dispatch('presets/prevPage')
    },

    nextPage () {
      this.$store.dispatch('presets/nextPage')
    },

    setActive (preset) {
      if (this.activePreset && this.activePreset.id == preset.id) {
        this.$set(this, 'activePreset', null)
      } else {
        this.$set(this, 'activePreset', preset)
      }
    },

    removePreset(preset_id) {
      var app = this;

      swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(function () {
        app.$store.dispatch('presets/deletePreset', preset_id).then(
          res => {
            swal({
              title: 'Deleted!',
              text: 'Requested Preset has been removed',
              type: 'success',
              timer: 2000,
              showConfirmButton: false
            }).then(
              function () {
              },
              // handling the promise rejection
              function (dismiss) {
                app.$store.dispatch('presets/getAll', app.searchQuery)
              }
            )
          }
        )
      }, function (dismiss) {
        // dismiss can be 'cancel', 'overlay',
        // 'close', and 'timer'
        if (dismiss === 'cancel') {
          swal(
            'Cancelled',
            'Selected preset is safe.',
            'error'
          )
        }
      });
    }
  },
}