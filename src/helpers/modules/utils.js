export default {
  isEmptyArray (val) {
    if (val == null || val === void (0) || val.length == 0) {
      return true
    } else {
      return false
    }
  },

  isEmptyObject (val) {
    if (val == null || val === void (0) || val === '' || val === {}) {
      return true
    } else {
      return false
    }
  },

  isEmpty (val) {
    if (val == null || val === void (0) || val === '') {
      return true
    } else {
      return false
    }
  },

  parseJsonString (str) {
    let val
    try {
      val = JSON.parse(str);
    } catch (e) {
      // console.log('json parse error', e)
      val = {}
    }
    return val
  }
}