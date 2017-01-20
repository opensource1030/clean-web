export default {

  hasPerm(value)
  {
    let perms = process.env.FEATURES;
    let found = false;

    for (let [k,
      v]of Object.entries(perms)) {
      var users = false;

      if (v.hasOwnProperty('users') == true) {
        if (k == value.value) {
          users = this.checkUser(v.users)
        }
        if (users == true) {

          found = true
        }
      }
      if (k == value.value && users != true) {

        if (v.enabled == true) {

          found = true
        }

      }
      //console.log(k,value.value ,users)

    }

    return found;

  },

  checkUser(perm) {

    for (let [key,
      enabled]of Object.entries(perm)) {

      if (key.startsWith("*") == true) {
        let emailApi = this.cutEmail(localStorage.email);
        let email = this.cutEmail(key)

        if (email == emailApi && enabled == true) {

          return true
        }

      } else {
        if (key == localStorage.email && enabled == true) {

          return true
        }

      }

    }
    return false;

  },
  cutEmail(email) {
    let first = email.search("@");
    let end = email.charAt(email.length - 1)
    let last = email.lastIndexOf(end);

    return email.slice(first, last + 1);
  }

}
