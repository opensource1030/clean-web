import Morphsearch from './Morphsearch.vue'
import auth from './../api/auth'
import Avatar from 'vue-avatar/dist/Avatar'
import supportRequest from './support-request';
module.exports = {
  template: `<section class="top-bar-section clearfix ">
        <div class="column large-8 medium-8 small-6">
          <morphsearch> </morphsearch>
        </div>
        <div class="column push-1 large-4 medium-4 small-6 profile" >
          <div class="profile-holder"><a class="float-right" data-toggle="example-dropdown-1"> <avatar :username="user.firstname ? user.firstname : 'User' "></avatar> Hi, <span class="greeting"  v-text="user.firstname ? user.firstname : 'User' "></span></a></div>
          <div class="HW-container"></div>
          <div class="dropdown-pane bottom" id="example-dropdown-1" data-dropdown>
            <ul>
              <li><a @click="logout()"  href="/login"> <i class="fa fa-sign-out "> </i> Logout</a></li>
            </ul>
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
    supportRequest(this.user)
  },
  mounted() {
    $(document).foundation()
  },
  methods: {
    logout() {
      auth.logout()
    }
  }
};
