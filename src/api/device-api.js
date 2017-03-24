import {http} from 'vue'


const API_BASE_URL = process.env.URL_API

export default {
  getOne (id, params, cb, errCb) {
    let data = {
      params: {
        include: 'modifications,devicevariations,devicevariations.companies,devicevariations.carriers,devicevariations.modifications,devicevariations.images,images'
      }
    };
  http.get(API_BASE_URL + '/devices/' + id, data).then(res => cb(res), err => errCb(err))
  },

  getAll (params, cb, errCb) {
    // let data = params
    // let data = {
    //   params: {
    //     include: 'modifications,devicevariations,devicevariations.companies,devicevariations.carriers,images,devicevariations.modifications,devicevariations.images',
    //     page: 0,
    //   }
    // };
    http.get(API_BASE_URL + '/devices', params).then(res => cb(res), err => errCb(err))
  },

  create (params, cb, errCb) {
    // let data = { data: params }
    http.post(API_BASE_URL + '/devices', params).then(res => cb(res), err => errCb(err))
  },

  update (id, params, cb, errCb) {
    // let data = { data: params }
    http.patch(API_BASE_URL + '/devices/' + id, params).then(res => cb(res), err => errCb(err))
  },

  remove (params, cb, errCb) {
  }
}
