import {http} from 'vue';

const {Store} = require('yayson')();
const store = new Store();
import {filterByFilters, orderFilters} from './../components/filters.js';
export default {
  getCarriers(params, cb, errCb) {
    let data = params
    http.get(process.env.URL_API + '/carriers', params).then((res) => {
      cb(res.data)

    }, (err) => {
      errCb(err)

    });
  },
  getModifications(context) {

    http.get(process.env.URL_API + '/modifications').then((res) => {
      cb(res.data)

    }, (err) => {
      errCb(err)

    });

  },
  getDeviceTypes(context) {

    http.get(process.env.URL_API + '/deviceTypes').then((res) => {
      cb(res.data)
    }, (err) => {
      errCb(err)

    });

  }
}
