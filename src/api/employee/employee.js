import Vue from 'vue';
import auth from './../auth.js';

var {
  Store,
} = require('yayson')();
var store = new Store();

export default {


  dataEmployee(context,id){


    context.$http.get(process.env.URL_API + '/users/' + id, {
      params: {
        include: 'udls'
      }
    }).then((response) => {

      event = store.sync(response.data);
      console.log(event);


    }, (response) => {});






  }







}
