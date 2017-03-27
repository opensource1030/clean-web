<template>
  <ul class="pagination" role="navigation" aria-label="Pagination">
    <li class="pagination-previous"><a @click="prev()">Previus</a></li>
    <li>Page <div class="current">{{ pagination.current_page }}</div> of <div class="current">{{ pagination.total_pages }}</div> Pages</li>
    <li class="pagination-next"><a @click="next()">Next</a></li>
  </ul>
</template>

<script>
export default {
  name:'paginate',
  props: {
    pagination: {
      type: Object,
      required: true
    },
    next: {
      type: Function,
      required: true
    },
    prev: {
      type: Function,
      required: true
    }
  },
}
</script>
