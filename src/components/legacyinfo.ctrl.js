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
    var topBarHeight = $('section.top-bar-section').height();
    var legacyHeaderHeight = $('.legacy-heading').height();
    var slicknavHeight = 0;
    if($('section.top-bar-section .slicknav_menu').css('display') != 'none')
      slicknavHeight = $('section.top-bar-section .slicknav_menu').height();

    $('.spent-info').css({height: $(window).height() - topBarHeight - slicknavHeight + 'px', position: 'fixed'});
    $('.spent-info .pop-overlay').css({width: $(window).width() + 'px'});

    var width = $('.spent-info').width();
    $('#legacy-info').css({height: $(window).height() - topBarHeight - slicknavHeight - legacyHeaderHeight - 15 + 'px', width: width - 40 + 'px'});
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
