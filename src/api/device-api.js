import Vue from 'vue'
import VueResource from 'vue-resource'

const API_BASE_URL = process.env.URL_API

export default {
    getOne (params, cb, errCb) {
    },

    getAll (params, cb, errCb) {
        // let data = params
        // let data = {
        //   params: {
        //     include: 'modifications,devicevariations,devicevariations.companies,devicevariations.carriers,images,devicevariations.modifications,devicevariations.images',
        //     page: 0, /*,filter[][like]:deviceType*/
        //   }
        // };
        Vue.http.get(API_BASE_URL + '/devices', params).then(res => cb(res), err => errCb(err))
    },

    add (params, cb, errCb) {
        let data = {data: params}
        Vue.http.post(API_BASE_URL + '/devices', data).then((res) => cb(store.sync(res.data)), (err) => errCb(err))
    },

    update (params, cb, errCb) {
    },

    remove (params, cb, errCb) {
    }
}