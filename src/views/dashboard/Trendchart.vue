<template>
    <div class="animated fadeIn">  
        <div class="chart-wrapper">
          <bar-example chartId="chart-bar-01"/>
        </div>
    </div>
</template>

<script>
import BarExample from '../charts/BarExample'

export default {
    components: {
    BarExample
    }
}
</script>
