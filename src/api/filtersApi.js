getCarriers (context) {

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

                let i = 1;
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
                                context.filter.carriers.push(carr);
                            }

                            context.filter.carriers = context.orderFilters(context.filter.carriers, 'presentation', 'string', 'asc');
                        }, (response) => {}
                    );

                    i++;
                }


            }

        }, (response) => {}
    );
},
getModifications(context) {



    context.$http.get(process.env.URL_API + '/modifications').then((response) =>
        {
            if(response.data.data.length == 0){
                context.errorNotFound = true;
            } else {

                let i = 1;
                while (i <= response.data.meta.pagination.total_pages) {

                    let params2 = {
                        params: {
                            page: i
                        }
                    };

                    context.$http.get(process.env.URL_API + '/modifications', params2).then((response) =>
                        {
                            let event = store.sync(response.data);

                            for (let carr of event) {
                                context.filter.carriers.push(carr);
                            }

                            context.filter.carriers = context.orderFilters(context.filter.carriers, 'presentation', 'string', 'asc');
                        }, (response) => {}
                    );

                    i++;
                }


            }

        }, (response) => {}
    );
}
