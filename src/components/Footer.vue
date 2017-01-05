<template>
<footer>
<div id="footer">Copyright &copy; <span>{{ new Date().getFullYear() }}</span> <a href="http://wirelessanalytics.com">Wireless Analytics, LLC</a> Made with <i class="fa fa-heart text-orange"></i> from Danvers, MA</div>
  </footer>
</template>
<script>

export default {
    name: "Footer",
    mounted(){
require('../modules/footer')

    }
}

</script>
