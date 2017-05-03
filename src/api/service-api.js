import { http } from 'vue'


const { Store } = require('yayson')()
const store = new Store()

const API_BASE_URL = process.env.URL_API

export default {
  getOne (params,id ,cb, errCb) {
    let data = params
    http.get(API_BASE_URL + '/services/'+id, data).then(res => cb(store.sync(res.data)), (err) => errCb(err))
  },

  getAll (params, cb, errCb) {
    let data = params
    http.get(API_BASE_URL + '/services', data).then(res => cb(res.data), (err) => errCb(err))
  },

  add (params, cb, errCb) {
    let data = { data: params } // or data = params
    http.post(API_BASE_URL + '/services', data).then((res) => cb(store.sync(res.data)), (err) => errCb(err))
  },

  update (params, id,cb, errCb) {
    let data = { data: params } // or data = params
    http.patch(API_BASE_URL + '/services/'+id, data).then((res) => cb(store.sync(res.data)), (err) => errCb(err))
  },

    remove (params, id, cb, errCb) {
        http.delete(API_BASE_URL + '/services/' + id).then(res => cb(res), err => errCb(errCb))
  }
}
