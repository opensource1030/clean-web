module.exports = {
    template: `
    <ul class="pagination" role="navigation" aria-label="Pagination">
      <li class="pagination-previous"><a @click="previusPage(pagination.current_page)">Previus</a></li>
      <li>Page <div class="current">{{ pagination.current_page }}</div> of <div class="current">{{ pagination.total_pages }}</div> Pages</li>
      <li class="pagination-next"><a @click="next(pagination.current_page)">Next</a></li>
    </ul>`,

    name: 'pagination',

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
        if (this.pagination.current_page < this.pagination.total_pages) {
        this.pagination.current_page = page + 1;
        this.callback();
      }
    },

    previusPage(page) {
        if (this.pagination.current_page > 1) {
        this.pagination.current_page = page - 1;
        this.callback();
      }
    }
  }
};
