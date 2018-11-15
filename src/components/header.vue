<template>
  <section class="top-bar-section clearfix">
    <div class="top-bar-holder">
      <div class="column large-8 medium-8 small-7">
        <div class="logo" v-if="company.object" @click="$router.push({name: 'dashboard'})">
          <div class="logo-holder">
            <img v-bind:src="_.get(company.object, 'metadata.logo.url', '')" alt="Company Logo" title="Client Logo">
          </div>
        </div>
        <!--<morphsearch></morphsearch>-->
      </div>
      <div class="column push-1 large-4 medium-4 small-5 profile">
        <div class="profile-holder">
          <a class="float-right" data-toggle="example-dropdown-1">
            <avatar :username="fullName()"></avatar>
            Hi, <span class="greeting">{{ firstName() }}</span></a>
        </div>
        <div class="HW-container"></div>
        <div class="dropdown-pane bottom" id="example-dropdown-1" data-dropdown>
          <ul>
            <li>
              <a @click="logout()" id="logout"><i class="fa fa-sign-out"></i> Logout</a>
              <a @click="profile()" class="float-right"><i class="fa fa-user"></i> Profile</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import _ from 'lodash'
  import Morphsearch from './Morphsearch.vue'
  import Avatar from 'vue-avatar'
  import employeeAPI from './../api/employee-api'
  import {Storage, Utils, Log} from './../helpers'

  const {Store} = require('yayson')()
  const store = new Store()

  export default {
    components: {
      Morphsearch,
      Avatar
    },

    props: {
      user: {
        required: true
      }
    },

    data () {
      return {
        company: {}
      }
    },

    computed: {
      _ () {
        return _
      },
    },

    created () {
      let profile = Utils.parseJsonString(Storage.get('profile'));
      if(profile.companies.length) {
        let cosmicdata = profile.companies[0].contents[0].content;
        // console.log('header cosmicdata', cosmicdata)

        this.$http.get(cosmicdata, {}).then((response) => {
          this.company = response.body;
          Log.put('header/created company', this.company);

          this.$root.$emit('company_content_loaded', response);
        });
      } else {
        this.$root.$emit('company_content_loaded', {});
      }
    },

    mounted () {
      $(document).foundation();
      let config = {
        selector: ".HW-container",
        account: "JPYPKy",
        enabled: true
      };
      Headway.init(config);
      heap.identify(this.$store.state.auth.profile.identification);

      (function () {
        let t, timeout = 7.2e+6;

        function resetTimer() {
          if (t) {
            window.clearTimeout(t);
          }
          t = window.setTimeout(logOut, timeout);
        }

        function logOut() {
          localStorage.clear('token');
          location.reload();
        }

        resetTimer();
        // And bind the events to call `resetTimer()`
        ["click", "mousemove", "keypress"].forEach(function (name) {
          document.addEventListener(name, resetTimer);
        });
      }());
    },

    methods: {
      firstName () {
        return this.$store.state.auth.profile.firstName
      },

      fullName () {
        return this.$store.state.auth.profile.firstName + ' ' + this.$store.state.auth.profile.lastName
      },

      logout () {
        document.cookie = "nav-item=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "nav-inner=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        heap.track('User logged out', {'clicked': 'yes'});

        this.$store.dispatch('auth/logout').then(res => {
          console.log('header logout');
          history.go(0);
          this.$router.push({ path: '/login' })
        })
      },

      profile () {
        this.$router.push({ path: `/employees/${this.$store.state.auth.userId}` })
      },
    },
  }
</script>
