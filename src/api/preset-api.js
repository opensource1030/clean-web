import {http} from "vue";
const {Store} = require('yayson')()
const store = new Store()

const API_BASE_URL = process.env.URL_API

export default {
  getOne (id, params, cb, errCb) {
    http.get(API_BASE_URL + '/presets/' + id, params).then(res => cb(res), err => errCb(err))
  },

  search (params, cb, errCb) {
    http.get(API_BASE_URL + '/presets', params).then(res => cb(res), err => errCb(err))
  },

  create (params, cb, errCb) {
    // let data = {data: params} // or data = params
    http.post(API_BASE_URL + '/presets', data).then(res => cb(res), err => errCb(err))
  },

  update (id, params, cb, errCb) {
    http.patch(API_BASE_URL + '/presets/' + id, data).then(res => cb(res), err => errCb(err))
  },

  remove (id, cb, errCb) {
    http.delete(API_BASE_URL + '/presets/' + id).then(res => cb(res), err => errCb(err))
  }

}
