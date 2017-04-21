import { http } from 'vue'

const API_BASE_URL = process.env.URL_API

export default {
  getOne (id, params, cb, errCb) {
    let data = {
      params: {
        include: 'conditions,services,apps,address,companies,companies.udls,devicevariations,devicevariations.carriers,devicevariations.companies,devicevariations.devices,devicevariations.modifications,devicevariations.images,services.serviceitems'
      }
    };
    http.get(API_BASE_URL + '/packages/' + id, data).then(res => cb(res), err => errCb(err))
  },

  getAll (params, cb, errCb) {
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

  remove (params, cb, errCb) {
  }
}
