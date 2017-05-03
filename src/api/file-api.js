import { http } from 'vue'

const API_BASE_URL = process.env.URL_API

export default {
  create (form, cb, errCb) {
    http.post(API_BASE_URL + '/files', form).then(res => cb(res), err => errCb(err))
    // // get data
    // .then(x => x.data)
    // // add url field
    // .then(x => x.map(img => Object.assign({}, img, { url: `${BASE_URL}/images/${img.id}` })));
  },
}