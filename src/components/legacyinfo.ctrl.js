var {Store} = require('yayson')()
var    store = new Store()
export default {
  name: "LegacyInfo",
  computed:{
    iframeUrl : function (){
      return process.env.LEGACY_URL+"/app/helpdesk/default.asp?token="+this.token+"&version=v4.0"
    }
  },
  mounted(){
    var height = $(window).height() - 72;
    $('.spent-info').css({height: height + 'px', position: 'fixed'});

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
    closePop(){
      document.getElementById('legacy-info').src = "http://dev.legacy.wirelessanalytics.com/platform/logout.asp";
      setTimeout(function(){
        history.back();
      },200)
    },
    greet () {
      this.$ga.trackEvent('Click to Get Started');
    }
  }
}
