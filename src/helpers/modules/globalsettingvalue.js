export default {
  getPayBySetting (value) {
    // pay_by_personal_credit_or_debit_card
    if (value === true || value === 'enabled' || value === 'Enabled') {
      return {
        type: 'globalsettingvalues',
        id: 7,
        name: 'enable',
        label: 'Enable',
        value: true,
        globalSettingId: 4
      }
    } else {
      return {
        type: 'globalsettingvalues',
        id: 8,
        name: 'disable',
        label: 'Disable',
        value: false,
        globalSettingId: 4
      }
    }
  },

  getBringOwnSetting (value) {
    // bring_your_own_device
    if (value === true || value === 'enabled' || value === 'Enabled') {
      return {
        type: 'globalsettingvalues',
        id: 9,
        name: 'enable',
        label: 'Enable',
        value: true,
        globalSettingId: 5
      }
    } else {
      return {
        type: 'globalsettingvalues',
        id: 10,
        name: 'disable',
        label: 'Disable',
        value: false,
        globalSettingId: 5
      }
    }
  },

  getMobilitySetting (value) {
    // mobility_central_login
    if (value === true || value === 'enabled' || value === 'Enabled') {
      return {
        type: 'globalsettingvalues',
        id: 11,
        name: 'enable',
        label: 'Enable',
        value: true,
        globalSettingId: 6
      }
    } else {
      return {
        type: 'globalsettingvalues',
        id: 12,
        name: 'disable',
        label: 'Disable',
        value: false,
        globalSettingId: 6
      }
    }
  },
}
