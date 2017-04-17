<template>
  <ul class="pagination" role="navigation" aria-label="Pagination">
      <li class="pagination-prev"><a @click="prev()" title="Previous"><i class="fa fa-caret-left"> </i></a></li>
      <li><span class="current">{{ pagination.current_page }}</span> of <span>{{ pagination.total_pages }}</span></li>
      <li class="pagination-next"><a @click="next()" title="Next"><i class="fa fa-caret-right"> </i></a></li>
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
