import { http } from 'vue'

const API_BASE_URL = process.env.URL_API

export default {
  getPackages (userId, cb, errCb) {
    // let data = params
    http.get(API_BASE_URL + '/users/packages/' + userId).then(res => cb(res), err => errCb(err))
  },
}
