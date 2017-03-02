<template>
<footer>
	<div id="footer">Copyright &copy; {{ new Date().getFullYear() }} <a href="http://wirelessanalytics.com">Wireless Analytics, LLC </a><span>Made with <i class="fa fa-heart text-orange"></i> from Danvers, MA</span></div>
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
