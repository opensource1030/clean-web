import {http} from "vue";

const API_BASE_URL = process.env.URL_API

export default {
  get (key, params, cb, errCb) {
    http.get(API_BASE_URL + '/oauth/personal-access-tokens', params).then(res => cb(res), err => errCb(err))
  },
}