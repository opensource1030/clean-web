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

  hasPermissionOnFeature (role, feature) {
    let permissions = _.map(role.permissions, 'name')
    let required_permissions, difference_permissions
    switch (feature) {
      case 'manage_devices':
        required_permissions = [
          'get_devices',
          'create_device',
          'update_device',
          'delete_device',
          'get_carriers',
          'get_companies',
          'get_modifications',
          'create_modification',
        ]
        difference_permissions = _.difference(required_permissions, permissions)
        break
      case 'manage_presets':
        required_permissions = [
          'get_presets',
          'create_preset',
          'update_preset',
          'delete_preset',
          'get_devices',
          'get_carriers',
          'get_companies',
          'get_modifications',
        ]
        difference_permissions = _.difference(required_permissions, permissions)
      case 'manage_services':
        required_permissions = [
          'get_presets',
          'create_preset',
          'update_preset',
          'delete_preset',
          'get_devices',
          'get_carriers',
          'get_companies',
          'get_modifications',
        ]
        difference_permissions = _.difference(required_permissions, permissions)
        break
      case 'manage_employees':
        required_permissions = [
          'get_users',
          'create_user',
          'update_user',
          'delete_user',
          'get_companies',
          'get_addresses',
          'create_address',
          'update_address',
          'delete_address',
          // 'get_conditionsfields',
        ]
        difference_permissions = _.difference(required_permissions, permissions)
        break
      case 'manage_companies':
        required_permissions = [
          'get_companies',
          'create_company',
          'update_company',
          'delete_company',
          'get_addresses',
          'create_address',
          'update_address',
          'delete_address',
          // 'get_conditionsfields',
          // 'create_conditionsfield',
          // 'update_conditionsfield',
          // 'delete_conditionsfield',
        ]
        difference_permissions = _.difference(required_permissions, permissions)
        break
      default:
        difference_permissions = []
    }

    if (difference_permissions.length > 0) {
      console.log(feature, difference_permissions, required_permissions, permissions)
      return false
    } else {
      return true
    }
  },
}