import _ from "lodash";

export default {
  // group menas menu item on main menu which is a bundle of features
  hasPermissionOnGroup (role, group) {
    let allowed = false
    switch (role.name.toLowerCase()) {
      case 'superadmin':
        allowed = true
        break
      case 'admin':
        allowed = true
        break
      case 'wta':
        allowed = true
        break
      default:
        switch (group) {
          case 'inventory': 
            allowed = false
            break
          case 'product':
            allowed = false
            break
          case 'setting':
            allowed = false
            break
          default:
            allowed = true
            break
        }
    }
    return allowed
  },

  hasAdminRole (role) {
    let allowed = false
    switch (role.name.toLowerCase()) {
      case 'superadmin':
        allowed = true;
        break;
      case 'admin':
        allowed = true;
        break;
      default:
        allowed = false;
        break;
    }
    return allowed;
  },

  hasPermissionOnFeature (role, feature) {
    let scopes = _.map(role.permissions, 'name')
    // _.pull(scopes, 'manage_companies')
    // console.log('hasPermissionOnFeature', scopes)

    return _.indexOf(scopes, feature) > -1
  }
}
