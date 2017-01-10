import Vue from 'vue';
import Pagination from './../../components/pagination';
import presets from './../../api/preset/presets';

export default {
  name:'Presets',
  components : {
    pagination: Pagination
  },
  beforeCreate() {

  },

  methods : {

    loadData() {
      presets.getPreset(this, this.pagination.current_page);

    },

    setActive: function(index) {
      this.active = index;
      console.log(this.presets[index]);
      this.presets[this.active].hide = !this.presets[this.active].hide;
      if (this.presets[this.active].show == true) {
        this.presets[this.active].show = false;
      } else {
        for (var i = 0; i < this.presets.length; i++) {
          if (this.presets[this.active] == this.presets[i]) {
            this.presets[this.active].show = true;
          } else {
            this.presets[i].show = false;
          }
        }
      }
    }
  },
  data() {
    return {
      active: 0,
      presets: [],
      pagination: {
        current_page: 1,
        total_pages: null,
        count: null,
        total: null,
        per_page: 25
      },
      loading: true,
      loadtable: false,
    };
  }
};
