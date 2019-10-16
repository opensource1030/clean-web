import { mapGetters, mapActions } from 'vuex'
import _ from 'lodash'
import Avatar from 'vue-avatar'
import Drawer from '@/components/drawer'
import TicketTypeSelect from '@/components/ticket_type_select'
import OrderConfirmModal from '@/components/order_confirm_modal'
import ProfileForm from '@/components/profile_form'
import OnBehalfForm from '@/components/on_behalf_form'
import DeviceBillInfo from './components/device_bill_info'
import SpendChart from './components/spend_chart'
import TrendChart from './components/trend_chart'
import LegacyDashboard from './dashboard_legacy'
import { Storage } from '@/helpers'

export default {
  name: 'dashboard',

  components: {
    Avatar,
    TicketTypeSelect,
    DeviceBillInfo,
    Drawer,
    SpendChart,
    TrendChart,
    LegacyDashboard,
    OrderConfirmModal,
    ProfileForm,
    OnBehalfForm,
  },

  data() {
    return {
      onBehalfOfOther: false,
      activeAllocationForMe: null,
      activeAllocationForOther: null,
      issue: '',
      showUpgradeDrawer: false,
      fromLoginPage: false,
      welcome: {
        visible: false,
        do_not_show_again: false,
      },
      editingProfile: false,
    }
  },

  computed: {
    _() {
      return _
    },

    activeAllocation() {
      return this.onBehalfOfOther ? this.activeAllocationForOther : this.activeAllocationForMe
    },

    userInfo() {
      return this.$store.state.auth.userInfo
    },

    userId() {
      return this.$store.state.auth.userId
    },

    upgradeEnabled() {
      return this.$store.state.feature.enabled_upgrade_device
    },

    canUpgradeDeviceForOthers() {
      return (this.userRole === 'wta' || this.userRole === 'admin') && this.$store.state.feature.enabled_impersonate_upgrade
    },

    hasOrder() {
      return this.upgradeHasOrder || this.newlineHasOrder || this.transferHasOrder || this.accessoryHasOrder
    },

    allocationDeviceId() {
      return _.get(this.activeAllocation, 'device_esn_imei', '').replace(/'/g, '')
    },

    allocationDeviceSim() {
      return _.get(this.activeAllocation, 'device_sim', '').replace(/'/g, '')
    },

    ...mapGetters({
      userRole: 'auth/getRole',
      clientInfo: 'auth/getClientInfo',
      profile: 'auth/getProfile',
      // showWelcomeFlag: 'auth/getShowWelcomeFlag',
      upgradeHasOrder: 'placeOrder/upgradeHasOrder',
      newlineHasOrder: 'placeOrder/newlineHasOrder',
      transferHasOrder: 'placeOrder/transferHasOrder',
      accessoryHasOrder: 'placeOrder/accessoryHasOrder',
      selectedEmployee: 'placeOrder/upgradeSelectedEmployee',
    }),
  },

  watch: {
    $route(to, from) {
      // console.log('$route', toPath, fromPath)
      // if (fromPath.name == 'login' || fromPath.name == 'loginLocal') {
      //   this.fromLoginPage = true
      // }

      if (from.name === 'deviceUpgradeAdmin' && to.name === 'Dashboard') {
        this.onBehalfOfOther = false
      }
    },
  },

  methods: {
    ...mapActions({
      setShowWelcomeFlag: 'auth/setShowWelcomeFlag',
      updateProfile: 'auth/updateProfile',
      setUpgradeHasOrder: 'placeOrder/setUpgradeHasOrder',
      setNewlineHasOrder: 'placeOrder/setNewlineHasOrder',
      setTransferHasOrder: 'placeOrder/setTransferHasOrder',
      setAccessoryHasOrder: 'placeOrder/setAccessoryHasOrder',
      setEmployee: 'placeOrder/setUpgradeSelectedEmployee',
      resetUpgrade: 'placeOrder/resetUpgrade',
      getUserPackages: 'placeOrder/getUpgradeUserPackages',
    }),

    setAllocationForMe(allocation) {
      this.onBehalfOfOther = false
      this.activeAllocationForMe = allocation
      this.resetUpgrade(true)
    },

    setAllocationForOther(allocation) {
      this.onBehalfOfOther = true
      this.activeAllocationForOther = allocation
    },

    setEmployeeForUpgrade(employee) {
      this.onBehalfOfOther = false
      this.activeAllocationForOther = null
      this.setEmployee(employee)
    },

    selectOrderType(type) {
      this.$set(this, 'selectedOrderType', this.selectedOrderType === type ? '' : type)
    },

    checkIfOrderable() {
      const exceptionList = ['PRXL', 'BRKR']

      return exceptionList.indexOf(this.userInfo.data.companies[0].shortName) === -1
    },

    orderDisabled() {
      this.$swal({
        type: 'warning',
        title: 'Oops...',
        text: 'This feature is not enabled, please see your IT Admin',
      })
    },

    onChangeTicketIssue(event) {
      const { value } = event.target

      this.$store.commit('auth/setTicketIssue', value)
      this.$store.commit('auth/setShowTicket', true)
      this.$store.dispatch('auth/trackEventWithAnalytics', { type: 'contact_support', value })
      // console.log('onChangeTicketIssue', value, this.$store.state.auth.show_ticket, this.$store.state.auth.ticket_issue)
    },

    toggleWelcomeDrawer() {
      this.welcome.visible = !this.welcome.visible
      if (this.welcome.do_not_show_again) {
        this.setShowWelcomeFlag(false)
      }
    },

    closeConfirmModal() {
      if (this.upgradeHasOrder) {
        this.setUpgradeHasOrder(false)
      }

      if (this.transferHasOrder) {
        this.setTransferHasOrder(false)
      }

      if (this.newlineHasOrder) {
        this.setNewlineHasOrder(false)
      }

      if (this.accessoryHasOrder) {
        this.setAccessoryHasOrder(false)
      }
    },

    billDetails(allocation) {
      this.$router.push({ path: `/dashboard/${allocation.mobile_number}/details` })
      this.$store.dispatch('auth/trackEventWithAnalytics', { type: 'bill_details' })
    },

    closeProfileForm() {
      this.editingProfile = false
    },

    onEditProfile() {
      this.editingProfile = true
    },

    onUpgradeDevice() {
      if (!this.onBehalfOfOther) {
        this.getUserPackages(this.userId)
        this.setEmployee(this.profile)
      }

      this.$router.push({ path: this.onBehalfOfOther ? '/dashboard/device-upgrade-admin' : '/dashboard/device-upgrade' })
    },

    profileSubmit(values) {
      this.updateProfile(values).then(() => {
        this.editingProfile = false
      })
    },

    evaluateAllocation(allocation) {
      const plan =
        allocation.service_plan_charge + allocation.domestic_usage_charge + allocation.messaging_charge + allocation.intl_ld_usage_charge + allocation.intl_roam_usage_charge
      const usage = allocation.taxes_charge + allocation.other_carrier_charge + allocation.other_charge + allocation.equipment_charge + allocation.etf_charge
      const other = allocation.usage_charge
      const total = plan + usage + other

      return { total, plan, usage, other }
    },
  },

  beforeCreate() {},

  created() {
    this.$store
      .dispatch('auth/loadUserInfo')
      .then(
        res => {
          // console.log('dashboard/created res', this.$route.param)
          // this.activeAllocation = _.get(this.userInfo, 'data.allocations[0]', null)
          this.activeAllocationForMe = _.get(this.userInfo, 'lastAllocations[0]', null)
          // if (this.fromLoginPage) {
          //   this.welcome.visible = true
          // }
        },
        err => {
          console.log('dashboard/created err', err)
        },
      )
      .then(() => {
        this.$store.dispatch('auth/setCompanyAllowedDomains').then(() => {
          if (!Storage.get('show_welcome_flag') ? true : Storage.get('show_welcome_flag') == 'true') {
            this.welcome.visible = true
          }
        })
      })
  },
}
