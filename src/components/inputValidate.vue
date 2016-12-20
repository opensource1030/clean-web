<template>

        <input
          ref="input"
          class="validate"
          v-bind:value="value"
          v-on:input="updateValue($event.target.value)"
        />
</template>
<script>
export default {
      name:'input',
      props:['value'],
      methods:{
        updateValue: function (value) {
        
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
<style>
.validate {
display: block;
box-sizing: border-box;
width: 100%;
height: 2.21591rem;
padding: 0.45455rem;
border: 1px solid #cacaca;
font-family: inherit;
font-size: 0.90909rem;
color: #000000;
background-color: #FFFFFF;
box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
border-radius: 0;
transition: box-shadow 0.5s, border-color 0.25s ease-in-out;
-webkit-appearance: none;
}
</style>
