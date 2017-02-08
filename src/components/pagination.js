module.exports = {
  template: `<ul class="pagination"  role="navigation" aria-label="Pagination">
    <li class="pagination-previous"><a @click="previusPage(pagination.current_page)">Previus</a></li>
    <li >Page <div class="current"  >{{pagination.current_page}}</div> of <div class="current" >{{pagination.total_pages}}</div>  Pages</li>
    <li class="pagination-next"    @click="next(pagination.current_page)"><a>Next</a></li></ul>`,
  props: {
    pagination: {
      type: Object,
      required: true
    },
    callback: {
      type: Function,
      required: true
    }
  },
  created() {
    this.init();

  },

  methods: {
    init() {
      this.callback();
    },

    next(page) {
      if (this.pagination.current_page == this.pagination.total_pages) {
        this.current_page = this.pagination.total_pages;

      } else {
        this.pagination.current_page = page + 1;
        this.callback();
      }
    },

    previusPage(page) {
      if (this.pagination.current_page == 1) {
        this.pagination.current_page = 1;
      } else {
        this.pagination.current_page = page - 1;
        this.callback();
      }
    }
  }
};
