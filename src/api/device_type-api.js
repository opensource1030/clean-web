import {http} from 'vue'


const API_BASE_URL = process.env.URL_API

export default {
  getAll (cb, errCb) {
    http.get(API_BASE_URL + '/devicetypes').then(res => cb(res), err => errCb(err))
  },
}
