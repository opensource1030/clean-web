import Vue from 'vue';
import auth from './../auth.js';
import Employee from './../../models/Employee';

var {Store} = require('yayson')();
var store = new Store();
var result = JSON.parse(localStorage.getItem("userProfile"));
var employee = new Employee(result.id, result.firstName, result.lastName, result.email, result.alternateEmail, result.supervisorEmail)

export default {

  dataEmployee(context) {

    context.$http.get(process.env.URL_API + '/companies/' + result.companyId, {}).then((response) => {

      if (result.address != null) {
        employee.setShippingAdress(result.address[0], employee)
        employee.setActive(true, employee)
      }
      let event = store.sync(response.data);
      console.log(event);

      if (result.udlvalues != null && event.udls != null) {
        employee.setUdl(result.udlvalues, event.udls, employee);
      }

      context.uiemployee = employee;

    }, (response) => {});

  },
  updateProfile(context, employee) {

    if (employee.udls.lenght = !0){
      employee.setUdlValues(employee.udls, employee)
    }
 if (employee.active == true) {
      employee.setAddresUpdate(employee.shippingAddress, employee);
    }

    context.$http.patch(process.env.URL_API + '/users/' + employee.id, {"data": employee.toJSON()}).then((response) => {
      context.$router.push({name: 'profile'});

    }, (response) => {});

  }

}
