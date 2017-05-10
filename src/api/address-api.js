import { http } from 'vue'

const API_BASE_URL = process.env.URL_API

export default {

  search (params, cb, errCb) {
    http.get(API_BASE_URL + '/address', params).then(res => cb(res), err => errCb(err))
  },

  update (id, params, cb, errCb) {
    http.patch(API_BASE_URL + '/address/' + id, params).then(res => cb(res), err => errCb(err))
  },
}
