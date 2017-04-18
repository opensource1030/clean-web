<template>
    <input ref="input" v-bind:value="value" v-on:input="updateValue($event.target.value)" type="text"/>
</template>
<script>
export default {
  name: 'input',
  props: ['value'],
  methods: {
    updateValue: function(value) {

      var formattedValue = value
        // Remove whitespace on either side
        .trim()
        // Shorten to 4 decimal places
        .slice(0, value.indexOf('.') + 5)
      // If the value was not already normalized,
      // manually override it to conform
      if (formattedValue !== value) {
        this.$refs.input.value = formattedValue
      }
      // Emit the number value through the input event
      this.$emit('input', Number(formattedValue))
    }
  }
}
</script>
