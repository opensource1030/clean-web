var {Store} = require('yayson')()
var    store = new Store()
import Morphsearch from './Morphsearch.vue'
import auth from './../api/auth'
import Avatar from 'vue-avatar/dist/Avatar'
import supportRequest from './support-request';
module.exports = {
  template: `<section class="top-bar-section clearfix ">
<div class="top-bar-holder">
        <div class="column large-8 medium-8 small-7">
        <div class="logo" v-if="company.object">
            <div class="logo-holder">
                <img v-bind:src='company.object.metafields[0].url' alt="logo" title="Client Logo">
            </div>
        </div>
          <morphsearch> </morphsearch>
        </div>
        <div class="column push-1 large-4 medium-4 small-5 profile" >
          <div class="profile-holder"><a class="float-right" data-toggle="example-dropdown-1"> <avatar :username="fullName"></avatar> Hi, <span class="greeting"  > {{firstName}}</span></a></div>
          <div class="HW-container"></div>
          <div class="dropdown-pane bottom" id="example-dropdown-1" data-dropdown>
            <ul>
              <li><a @click="logout()"  href="/login"> <i class="fa fa-sign-out "> </i> Logout</a></li>
            </ul>
          </div>
        </div>
        </div>
      </section>`,
  props: {
    user: {
      required: true
    }
  },
  components: {
    Morphsearch,
    Avatar
  },
  created() {

    this.$http.get(process.env.URL_API + '/users/'+ localStorage.userId +'?include=companies.contents', {
    }).then((response) => {
      var event = store.sync(response.data);
      if(event.companies.length>0){
        var cosmicdata = event.companies[0].contents[1].content;

        this.$http.get(cosmicdata, {
        }).then((response) => {

          this.company =response.data;

        });
      }
    });
  },
  mounted() {

    $(document).foundation()
    var config = {
      selector: ".HW-container",
      account: "JPYPKy",
      enabled : true
    };
    Headway.init(config);
  },
  methods: {
    logout() {
      auth.logout()
    }
  },
  computed : {
    firstName  : function () {
      if(localStorage.userProfile){
        return JSON.parse(localStorage.getItem("userProfile")).firstName;
      }
      else{
        return "User";
      }

    },
    fullName  : function () {
      if(localStorage.userProfile)
      return JSON.parse(localStorage.getItem("userProfile")).firstName + " " + JSON.parse(localStorage.getItem("userProfile")).lastName;
      else
        return "User"
    }
  },
  data (){
    return {
      company: {}
    }
  }
};
