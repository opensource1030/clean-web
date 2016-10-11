<script>

export default {
  name:'Login',
data() {
  return {
    // We need to initialize the component with any
    // properties that will be used in it
    credentials: {
      email: 'mateo'

    },
    error: ''
  }
},


}



  </script>


<template>
<div>
{{this.credentials.email}}
</div>

</template>
