import Pagination from '@/components/pagination'
import { mapGetters, mapActions } from 'vuex'
import swal from 'sweetalert2'

export default {
  name: 'packages',
  components: {
    Pagination
  },
  data () {
    return {
      searchQuery: '',
      activePackage: {},
      packageConditions: '',
      packageServices: '',
      packageDevices: '',
      packagesLoading: true
    }
  },
  filters: {
    truncate: function(str, value) {
      if(str.length < value)
        return str;
      else
        return str.substring(0, value) + '...';
    }
  },
  computed: {
    _ () {
      return _
    },

    ...mapGetters({
      packages: 'packages/allPackages'
    })
  },
  beforeCreate () {
    this.$store.dispatch('packages/getAll').then(
      res => {
        this.packagesLoading = false;
      }
    )
  },
  methods: {
    searchPackages: function() {
      this.$store.dispatch('packages/searchByName', this.searchQuery)
    },
    setActive: function(pack) {
      if(this.activePackage && this.activePackage.id == pack.id) {
        this.$set(this, 'activePackage', {});
      } else {
        this.$set(this, 'activePackage', pack);
        this.getPackageDetail(pack);
      }
    },
    getPackageDetail: function(pack) {
      let conditions = [];
      for (let condition of pack.conditions) {
        if(condition.condition == 'contains') {
          conditions.push(condition.nameCond + ' ' + condition.condition + ' "' + condition.value + '"');
        } else {
          conditions.push(condition.nameCond + ' ' + condition.condition + ' ' + condition.value);
        }
      }

      let services = [];
      for (let service of pack.services)
        services.push(service.title);

      let devices = [];
      for (let device of pack.devicevariations)
        devices.push(device.devices[0].name);

      this.packageConditions = conditions.join(", ");
      this.packageServices = services.join(", ");
      this.packageDevices = devices.join(', ');
    },
    nextPage() {
      this.$store.dispatch('packages/nextPage')
    },
    prevPage() {
      this.$store.dispatch('packages/prevPage')
    },
    removePackage(package_id) {
      var app = this;

      swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {

        if (result.value) {

          app.$store.dispatch('packages/deletePackage', package_id).then(() => {

            app.$store.dispatch('packages/searchByName', app.searchQuery)

            swal.fire({
              title: 'Deleted!',
              text: 'Requested Package has been removed',
              type: 'success',
              timer: 2000,
              showConfirmButton: false
            })
          })

        }
        
        if (result.dismiss === swal.DismissReason.cancel) {
          swal.fire(
            'Cancelled',
            'Selected package is safe.',
            'error'
          )
        }

      });
    }
  }
}
