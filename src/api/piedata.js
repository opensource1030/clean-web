// import {
//   router
// } from 'vue-router'
import Vue from 'vue';
import auth from './auth.js';

var {
  Store,
} = require('yayson')();
var store = new Store();

export default {
  /*-------------------------------update device-----------------*/

  get(context,data){


    context.$http.get(process.env.URL_API+'/users/'+localStorage.userId,{
        params: {
            include: 'allocations',
        },
    }).then((response) => {
        var  test = store.sync(response.data);
        console.log(test);
        var allocation = test.allocations;

        var data = Object.keys(allocation).map( function (k) {return allocation[k];} );
        console.log(data);


    }, (response) => {

    });

  }

};
