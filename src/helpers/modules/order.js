export default {
  getState (order) {
    switch (order.status) {
      case 'New':
        return 'new'
      case 'Approval':
        return 'approval'
      case 'Deliver':
        return 'deliver'
      case 'Delivered':
        return 'delivered'
      default:
        return 'denied'
    }
  },

  getNextState (order) {
    let state = this.getState(order)
    let stateDic = {
      'new': 'Approval',
      'approval': 'Deliver',
      'deliver': 'Delivered',
      'delivered': 'Denied',
      'denied': 'New'
    }
    return stateDic[state]
  },

  getButtonText (order) {
    let textDic = {
      'new': 'Approve Request',
      'approval': 'Deliver',
      'deliver': 'Mark Delivered',
      'delivered': 'Deny',
      'deny': 'Deny'
    }
    return textDic[order]
  },

  getButtonClass (order) {
    let state = this.getState(order)
    let classDic = {
      'new': 'primary',
      'approval': 'info',
      'deliver': 'success',
      'delivered': '',
      'denied': 'danger'
    }
    return classDic[state]
  },
}