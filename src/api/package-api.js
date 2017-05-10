import { http } from 'vue'

const API_BASE_URL = process.env.URL_API

export default {
  getOne (id, params, cb, errCb) {
    http.get(API_BASE_URL + '/packages/' + id, params).then(res => cb(res), err => errCb(err))
  },

  search (params, cb, errCb) {
    // let data = params
    http.get(API_BASE_URL + '/packages', params).then(res => cb(res), err => errCb(err))
  },

  create (params, cb, errCb) {
    // let data = { data: params }
    http.post(API_BASE_URL + '/packages', params).then(res => cb(res), err => errCb(err))
  },

  update (id, params, cb, errCb) {
    // let data = { data: params }
    http.patch(API_BASE_URL + '/packages/' + id, params).then(res => cb(res), err => errCb(err))
  },

  remove (id, cb, errCb) {
    http.delete(API_BASE_URL + '/packages/' + id).then(res => cb(res), err => errCb(err))
  }
}
