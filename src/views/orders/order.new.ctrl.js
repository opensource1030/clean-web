export default {
  created () {
    // console.log('order.new/created', this.$store.state.placeOrder.currentOrderType)
    switch (this.$store.state.placeOrder.currentOrderType) {
      case 'Accessory':
        this.$router.push({path: '/orders/new/accessories'})
        break
      default:
        this.$router.push({path: '/orders/new/package'})
    }
  },

  mounted () {
    // console.log('order.new/mounted')
  }
}