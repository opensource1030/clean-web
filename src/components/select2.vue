<template>
  <select
    :name="name"
    :multiple="multiple"
    class="form-control"
    required
  >
    <slot></slot>
  </select>
</template>

<script lang="babel">
import Select2 from 'select2'

export default {
  props: {
    name: '',
    options: {
      Object
    },
    value: null,
    multiple: {
      Boolean,
      default: false
    }
  },

  data() {
    return {
      select2data: []
    }
  },

  methods: {
    formatOptions() {
      // this.select2data.push({ id: '', text: 'Select' })
      // for (let key in this.options) {
      //   this.select2data.push({ id: key, text: this.options[key] })
      // }
      this.select2data = this.options
    }
  },

  mounted() {
    this.formatOptions()
    let vm = this
    let select = $(this.$el)
    select.select2({
      placeholder: 'Select',
      theme: 'bootstrap',
      width: '100%',
      allowClear: true,
      data: this.select2data
    }).on('change', function () {
      vm.$emit('input', select.val())
    })
    select.val(this.value).trigger('change')
  },

  destroyed: function () {
    $(this.$el).off().select2('destroy')
  }
}
</script>
