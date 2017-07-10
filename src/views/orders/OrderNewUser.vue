<template>
<div>
  <modal class="submit-order-pay behalf-modal" >
    <div slot="header" class="credit-mark">
      <i class="fa fa-map-marker"></i>
    </div>
    <div slot="body">
      <!-- <label>
        Place my order
        <input type="radio" name="behalf-of-user" value="me" v-model="behalfOfUser">
      </label>
      <label>
        Place an order behalf of a user
        <input type="radio" name="behalf-of-user" value="other" v-model="behalfOfUser">
      </label> -->
      <!-- <div>{{ selectedEmployeeId }}</div> -->
      <div class="row">
        <div class="columns small-4">
          <p>ordering behalf of a user?</p>
        </div>
        <div class="columns small-8">
          <div class="switch large">
            <input class="switch-input" id="order-behalf-of-user" type="checkbox" name="behalf-of-user" v-model="behalfOfUser">
            <label class="switch-paddle" for="order-behalf-of-user">
              <span class="show-for-sr">Place an order behalf of a user?</span>
              <span class="switch-active" aria-hidden="true">Yes</span>
              <span class="switch-inactive" aria-hidden="true">No</span>
            </label>
          </div>
        </div>
      </div>

      <div class="row" v-if="behalfOfUser">
        <div class="columns small-4">
          <p>Select a User</p>
        </div>
        <div class="columns small-8">
          <multiselect
              id="ajax"

              v-model="selectedEmployee"
              placeholder="Employee Name - Email"
              track-by="id"
              label="username"
              :custom-label="customLabel"
              :options="employees"
              :multiple="false"
              :searchable="true"
              :show-labels="false"
              :select-label="''"
              :close-on-select="true"
              :clear-on-select="false"
              :hide-selected="false">
            <span slot="noResult" style="dispay: block;">
              No users found.
              <router-link to='/employees/new' style="width: auto; float: right;">Create User</router-link>
            </span>
          </multiselect>
        </div>
      </div>

      <button class="button button-primary" @click="cancel()">Cancel</button>
      <button class="button button-primary" @click="goNext()" :disabled="disabledNextButton">Next</button>
    </div>
  </modal>
</div>
</template>

<script>
import _ from 'lodash'
import multiselect from 'vue-multiselect'
import modal from './../../components/modal'
import employeeAPI from './../../api/employee-api'

const { Store } = require('yayson')()
const store = new Store()

export default {
  components: {
    modal,
    multiselect,
  },

  props: {
    next: {
      type: Function,
      required: true
    },

    cancel: {
      type: Function,
      required: true
    }
  },

  computed: {
    disabledNextButton () {
      return (!this.behalfOfUser || (this.behalfOfUser && this.selectedEmployee)) ? false : 'disabled'
    }
  },

  data () {
    return {
      behalfOfUser: 'me',
      selectedEmployee: null,
      employees: []
    }
  },

  created () {
    let _params = {}
    employeeAPI.search(_params, (res) => {
      this.employees = store.sync(res.data)
      _.remove(this.employees, (employee) => {
        return employee.id == this.$store.state.auth.userId
      })
      console.log('order.new.user/created', this.$store.state.auth.userId, this.employees)
    })
  },

  methods: {
    customLabel ({ firstName, lastName, email }) {
      return `${firstName} ${lastName} – ${email}`
    },

    goNext () {
      // console.log('order.new.user/next', this.$store.state.auth.userId, this.selectedEmployee.id)
      if (this.behalfOfUser) {
        this.$store.dispatch('placeOrder/setUserId', this.selectedEmployee.id)
      } else {
        this.$store.dispatch('placeOrder/setUserId', this.$store.state.auth.userId)
      }
      this.next()
    }
  }
}
</script>