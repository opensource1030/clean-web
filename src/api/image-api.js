import {http} from 'vue'


const API_BASE_URL = process.env.URL_API

export default {
  create (form, cb, errCb) {
      http.post(API_BASE_URL + '/images', form).then(res => cb(res), err => errCb(err))
  },
}
