import Vue from 'vue'
import VueResource from 'vue-resource'

const {Store} = require('yayson')()
const store = new Store()

const API_BASE_URL = process.env.URL_API

export default {
    getOne (params, cb, errCb) {
    },

    getAll (params, cb, errCb) {
        let data = params
        Vue.http.get(API_BASE_URL + '/services', data).then(res => cb(store.sync(res.data)), (err) => errCb(err))
    },

    add (params, cb, errCb) {
        let data = {data: params} // or data = params
        Vue.http.post(API_BASE_URL + '/services', data).then((res) => cb(store.sync(res.data)), (err) => errCb(err))
    },

    update (params, cb, errCb) {
    },

    remove (params, cb, errCb) {
    }
}