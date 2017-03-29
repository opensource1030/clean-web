import {http} from 'vue'

const API_BASE_URL = process.env.URL_API

export default {
  getAll(params, cb, errCb) {
    http.get(process.env.URL_API + '/carriers', params).then((response) => {
      let i = response.data.meta.pagination.current_page;
      while (i <= response.data.meta.pagination.total_pages) {

        let params2 = {
          params: {
            page: i
          }
        };

        http.get(process.env.URL_API + '/carriers', params2).then((res) => {
          cb(res)
        }, (err) => {
          errCb(err)
        });

        i++;
      }

    }, (response) => {});
  },
  getOnePage(params, cb, errCb) {

    http.get(API_BASE_URL + '/carriers', params).then(res => cb(res), err => errCb(err))

  }

}
