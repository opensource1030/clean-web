var {Store} = require('yayson')()
var store = new Store()

export default {
  name: "LegacyInfo",
  computed:{
    iframeUrl : function (){
      return process.env.LEGACY_URL+"/app/wrf/default.asp?token="+JSON.parse(this.token)['access_token']+"&version=v4"
    }
  },
  mounted(){
    var height = $(window).height() - 72;
    $('.spent-info').css({height: height + 'px', position: 'fixed'});
    $('.spent-info .pop-overlay').css({width: $(window).width() + 'px'});

    var width = $('.spent-info').width();
    $('#legacy-info').css({height: height - 93 + 'px', width: width - 40 + 'px'});
    this.greet();
  },
  data(){
    return {
      isActive: true,
      popOver : true,
      token: localStorage.token
    }
  },
  methods: {
    goDashboard(){
      this.$router.push('/dashboard');
    },
    closePop(){
      history.back();
    },
    greet () {
      this.$ga.trackEvent('Click to Get Started');
    }
  }
}
