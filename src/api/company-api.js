import {http} from 'vue'


const API_BASE_URL = process.env.URL_API

export default {
  getAll (params, cb, errCb) {
      http.get(API_BASE_URL + '/companies', params).then(res => cb(res), err => errCb(err))
  },
}
