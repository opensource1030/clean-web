export default {
  getState (order) {
    switch (order.status) {
      case 'New':
        return 'new'
      case 'Pending Delivery':
        return 'pending'
      case 'Delivered':
        return 'delivered'
      case 'Denied':
        return 'denied'
      default:
        return 'draft'
    }
  },

  getNextState (order) {
    let state = this.getState(order)
    let stateDic = {
      'new': 'Pending Delivery',
      'pending': 'Delivered',
      'delivered': '',
      'denied': 'New',
      'draft': ''
    }
    return stateDic[state]
  },

  getButtonText (order) {
    let state = this.getState(order)
    let textDic = {
      'new': 'Approve Request',
      'pending': 'Mark Delivered',
      'delivered': '',
      'denied': 'Renew',
      'draft': ''
    }
    return textDic[state]
  },

  getButtonClass (order) {
    let state = this.getState(order)
    let classDic = {
      'new': 'warning',
      'pending': 'success',
      'delivered': '',
      'denied': 'alert',
      'draft': ''
    }
    return classDic[state]
  },
}