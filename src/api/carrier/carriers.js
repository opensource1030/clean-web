import Vue from 'vue';

const {Store} = require('yayson')();
const store = new Store();

export default {

    getCarriers(context, callback) {

        let params1 = {
            params: {
                'filter[active]':1,
            }
        };

        context.$http.get(process.env.URL_API + '/carriers', params1).then((response) =>
            {
                if(response.data.data.length == 0){
                    context.errorNotFound = true;
                } else {
                    let i = response.data.meta.pagination.current_page;
                    while (i <= response.data.meta.pagination.total_pages) {

                        let params2 = {
                            params: {
                                page: i
                            }
                        };

                        context.$http.get(process.env.URL_API + '/carriers', params2).then((response) =>
                            {
                                let event = store.sync(response.data);

                                for (let carr of event) {
                                    context.carriers.push(carr);
                                }

                                if (callback != null) {
                                    callback(response.data);
                                }
                            }, (response) => {}
                        );

                        i++;
                    }
                }
            }, (response) => {}
        );
    },
}
