export default {

  hasPerm(value)
  {
    let perms = process.env.FEATURES;
    let found = false;
    for (let [key,perm] of Object.entries(perms)) {
      //  console.log( Object.keys( perm),perm.users)
      this.checkUser(perm.users)
      if (this.checkUser(perm.users) == true) {

        found = true;

      } else if (perm.type == value.value && this.checkUser(perm.users) != true) {

        if (perm.enabled == true) {
          found = true

        }

      }
    }

    return found;

  },

  checkUser(perm) {

    for (let [key,user] of Object.entries(perm)) {
        console.log(user)
      if (user.username == localStorage.email) {
        if (user.enabled == true) {
          return true;
        }

      }

    }
    return false;

  }

}
