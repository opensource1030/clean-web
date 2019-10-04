<template>
  <AppHeaderDropdown right no-caret class="mr-3">
    <template slot="header">
      <avatar :username="fullName" inline></avatar>
      Hi, <span class="greeting">{{ firstName }}</span>
    </template>
    <template slot="dropdown">
      <b-dropdown-header tag="div" class="text-center"><strong>Account</strong></b-dropdown-header>
      <!-- <b-dropdown-item @click="profile()"><i class="fa fa-user"/> Profile</b-dropdown-item> -->
      <a @click="logout()" id="logout"><b-dropdown-item><i class="fa fa-lock" /> Logout</b-dropdown-item></a>
    </template>
  </AppHeaderDropdown>
</template>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import Avatar from 'vue-avatar'
import { Storage, Utils, Log } from '@/helpers'
import employeeAPI from '@/api/employee-api'

import { HeaderDropdown as AppHeaderDropdown } from '@coreui/vue'

export default {
  name: 'DefaultHeaderDropdownAccnt',

  components: {
    Avatar,
    AppHeaderDropdown
  },

  data() {
    return {
    }
  },

  computed: {
    ...mapGetters({
      currentUser: "auth/getProfile",
    }),

    _() {
      return _
    },

    firstName() {
      return _.get(this.currentUser, 'firstName', '')
    },

    fullName() {
      return _.compact([
        _.get(this.currentUser, 'firstName', ''),
        _.get(this.currentUsere, 'lastName', '')
      ]).join(' ')
    },
  },

  methods: {
    logout() {
      document.cookie = "nav-item=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
      document.cookie = "nav-inner=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
      heap.track('User logged out', {'clicked': 'yes'})

      this.$store.dispatch('auth/logout').then(res => {
        console.log('header logout');
        history.go(0);
        this.$router.push({ path: '/login' })
      })
    },

    profile() {
      console.log('DefaultHeaderDropdownAccnt profile', this.$store.state.auth.userId)
      this.$router.push({ path: `/employees/${this.$store.state.auth.userId}` })
    },
  },

  created () {
  },

  mounted () {
    heap.identify(this.currentUser.identification);

    (function () {
      let t, timeout = 7.2e+6;

      function resetTimer() {
        if (t) {
          window.clearTimeout(t);
        }
        t = window.setTimeout(logOut, timeout);
      }

      function logOut() {
        // localStorage.clear('token');
        Storage.remove('token');
        location.reload();
      }

      resetTimer();
      // And bind the events to call `resetTimer()`
      ["click", "mousemove", "keypress"].forEach(function (name) {
        document.addEventListener(name, resetTimer);
      })
    }())
  }
}
</script>
