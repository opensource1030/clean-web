<template>
  <section class="top-bar-section clearfix ">
    <div class="top-bar-holder">
      <div class="column large-8 medium-8 small-7">
        <div class="logo" v-if="company.object" @click="$router.push({name: 'dashboard'})">
          <div class="logo-holder">
            <img v-bind:src='company.object.metadata.logo.url' alt="logo" title="Client Logo">
          </div>
        </div>
        <morphsearch></morphsearch>
      </div>
      <div class="column push-1 large-4 medium-4 small-5 profile">
        <div class="profile-holder">
          <a class="float-right" data-toggle="example-dropdown-1">
            <avatar :username="fullName"></avatar>
            Hi, <span class="greeting">{{ firstName }}</span></a>
        </div>
        <div class="HW-container"></div>
        <div class="dropdown-pane bottom" id="example-dropdown-1" data-dropdown>
          <ul>
            <li><a @click="logout()" id="logout" href="/login"><i class="fa fa-sign-out"></i> Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  const {Store} = require('yayson')()
  const store = new Store()
  import Morphsearch from './Morphsearch.vue'
  import Avatar from 'vue-avatar/dist/Avatar'
  
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


    data() {
      return {
        company: {}
      }
    },
    created() {
      this.$http.get(process.env.URL_API + '/users/' + localStorage.userId + '?include=companies.contents', {}).then((response) => {
          let event = store.sync(response.data)
        if (event.companies.length > 0) {
            let cosmicdata = event.companies[0].contents[0].content

          this.$http.get(cosmicdata, {}).then((response) => {
            this.company = response.body;
          })
        }
      });
        (function () {

            let t,
                timeout = 7.2e+6;

            function resetTimer() {
                if (t) {
                    window.clearTimeout(t);
                }
                t = window.setTimeout(logOut, timeout);
            }

            function logOut() {
                localStorage.clear('Token');
                location.reload();
            }

            resetTimer();
            //And bind the events to call `resetTimer()`
            ["click", "mousemove", "keypress"].forEach(function (name) {
                document.addEventListener(name, resetTimer);
            });

        }());
    },
    mounted() {
        $(document).foundation();
        let config = {
        selector: ".HW-container",
        account: "JPYPKy",
        enabled: true
      };
      Headway.init(config);

    },
    methods: {
      logout() {
        this.$store.dispatch('auth/logout').then(res => console.log('header logout'))
      }
    },


    computed: {
      firstName: function () {
        if (localStorage.userProfile) {
          return JSON.parse(localStorage.getItem("userProfile")).firstName
        } else {
          return "User"
        }
      },
      fullName: function () {
        if (localStorage.userProfile) {
          return JSON.parse(localStorage.getItem("userProfile")).firstName + " " + JSON.parse(localStorage.getItem("userProfile")).lastName
        } else {
          return "User"
        }
      }
    }
  }
</script>
